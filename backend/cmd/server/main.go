package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	httpSwagger "github.com/swaggo/http-swagger"

	"github.com/infortech07/cubert/api/routes"
	"github.com/infortech07/cubert/internal/filesystem/handlers"
	"github.com/infortech07/cubert/internal/filesystem/services"
	"github.com/infortech07/cubert/internal/shared/utils"
)

func main() {
	// Cargar variables de entorno
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	} // Puerto del servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Configurar servicios
	scannerService := services.NewScannerService()
	explorerService := services.NewExplorerService(scannerService)

	// Configurar handlers
	filesystemHandler := handlers.NewFilesystemHandler(scannerService, explorerService)

	// Configurar router
	router := setupRouter(filesystemHandler, port)

	// Crear servidor HTTP
	server := &http.Server{
		Addr:           ":" + port,
		Handler:        router,
		ReadTimeout:    30 * time.Second,
		WriteTimeout:   30 * time.Second,
		IdleTimeout:    60 * time.Second,
		MaxHeaderBytes: 1 << 20, // 1MB
	}

	// Iniciar servidor en goroutine
	go func() {
		log.Printf("🚀 Cubert File Manager Server starting on port %s", port)
		log.Printf("📁 Filesystem API available at: http://localhost:%s/api/v1/filesystem", port)
		log.Printf("🔍 Health check: http://localhost:%s/health", port)

		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	// Esperar señal de interrupción
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("🛑 Server shutting down...")

	// Graceful shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("✅ Server exited")
}

func setupRouter(filesystemHandler *handlers.FilesystemHandler, port string) chi.Router {
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(corsMiddleware)

	// Health check
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		health := map[string]interface{}{
			"status":    "healthy",
			"service":   "cubert-filesystem-api",
			"version":   "1.0.0",
			"timestamp": time.Now(),
		}
		utils.WriteJSONResponse(w, http.StatusOK, health)
	})

	// API info
	r.Get("/api", func(w http.ResponseWriter, r *http.Request) {
		info := map[string]interface{}{
			"name":        "Cubert Filesystem API",
			"version":     "1.0.0",
			"description": "Local filesystem exploration and management API",
			"endpoints": map[string]string{
				"scan":     "/api/v1/filesystem/scan?path=/your/path",
				"list":     "/api/v1/filesystem/list?path=/your/path",
				"info":     "/api/v1/filesystem/info?path=/your/path",
				"stats":    "/api/v1/filesystem/stats?path=/your/path",
				"search":   "/api/v1/filesystem/search?path=/your/path&q=query",
				"roots":    "/api/v1/filesystem/roots",
				"validate": "/api/v1/filesystem/validate",
			},
		}
		utils.WriteJSONResponse(w, http.StatusOK, info)
	})

	// Registrar rutas del filesystem
	routes.RegisterFilesystemRoutes(r, filesystemHandler)

	// Swagger documentation
	r.Get("/docs/swagger.yaml", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./api/docs/swagger.yaml")
	})
	r.Get("/docs/*", httpSwagger.Handler(httpSwagger.URL("http://localhost:"+port+"/docs/swagger.yaml")))

	return r
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
