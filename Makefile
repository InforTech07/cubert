# Cubert - Makefile para desarrollo y producción

.PHONY: help dev build clean install run-backend run-frontend test

# Colores para output
GREEN := \033[32m
BLUE := \033[34m
YELLOW := \033[33m
RED := \033[31m
RESET := \033[0m

# Directorios
CLIENT_DIR := client
BACKEND_DIR := backend
STATIC_DIR := $(BACKEND_DIR)/cmd/server/static
RELEASES_DIR := releases

help: ## Mostrar ayuda
	@echo "$(BLUE)🚀 Cubert - Sistema de Archivos Futurista$(RESET)"
	@echo ""
	@echo "$(GREEN)Comandos disponibles:$(RESET)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(YELLOW)%-15s$(RESET) %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""

install: ## Instalar dependencias
	@echo "$(BLUE)📦 Instalando dependencias...$(RESET)"
	cd $(CLIENT_DIR) && pnpm install
	cd $(BACKEND_DIR) && go mod download
	@echo "$(GREEN)✅ Dependencias instaladas$(RESET)"

dev: ## Ejecutar en modo desarrollo (solo frontend)
	@echo "$(BLUE)🔧 Iniciando modo desarrollo...$(RESET)"
	cd $(CLIENT_DIR) && pnpm dev

build: clean ## Construir para producción
	@echo "$(BLUE)🏗️  Construyendo aplicación...$(RESET)"
	@echo "$(YELLOW)📦 Building frontend...$(RESET)"
	cd $(CLIENT_DIR) && pnpm build:prod
	@echo "$(GREEN)✅ Frontend build completo$(RESET)"
	@echo "$(YELLOW)📄 Verificando archivos generados...$(RESET)"
	@ls -la $(STATIC_DIR) 2>/dev/null || echo "$(RED)⚠️  No se encontraron archivos en $(STATIC_DIR)$(RESET)"
	@echo "$(GREEN)✅ Build completo - Backend listo para servir archivos estáticos$(RESET)"

build-embedded: clean ## Construir binario embebido
	@echo "$(BLUE)🚀 Construyendo binario embebido...$(RESET)"
	./build.sh
	@echo "$(GREEN)✅ Binario embebido listo: releases/cubert-embedded$(RESET)"

build-embedded-compressed: clean ## Construir binario embebido comprimido
	@echo "$(BLUE)🗜️  Construyendo binario embebido comprimido...$(RESET)"
	./build.sh --compress
	@echo "$(GREEN)✅ Binario embebido comprimido listo$(RESET)"

release: clean ## Generar release multiplataforma
	@echo "$(BLUE)🌍 Generando releases para múltiples plataformas...$(RESET)"
	./scripts/build-releases.sh $(VERSION)
	@echo "$(GREEN)🎉 Releases generados en carpeta releases/$(RESET)"

release-github: release ## Crear release en GitHub (requiere gh cli)
	@echo "$(BLUE)🚀 Creando release en GitHub...$(RESET)"
	@if ! command -v gh &> /dev/null; then \
		echo "$(RED)❌ GitHub CLI no está instalado. Instálalo con: curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg$(RESET)"; \
		exit 1; \
	fi
	@VERSION=$${VERSION:-v1.0.0}; \
	gh release create $$VERSION releases/* --title "Cubert $$VERSION" --notes-file DEPLOYMENT.md || true

clean: ## Limpiar archivos de build
	@echo "$(BLUE)🧹 Limpiando archivos de build...$(RESET)"
	rm -rf $(CLIENT_DIR)/dist
	rm -rf $(STATIC_DIR)/*
	rm -f $(RELEASES_DIR)/cubert-embedded*
	mkdir -p $(STATIC_DIR)
	mkdir -p $(RELEASES_DIR)
	@echo "$(GREEN)✅ Limpieza completa$(RESET)"

run-backend: ## Ejecutar solo el backend
	@echo "$(BLUE)🔗 Iniciando backend server...$(RESET)"
	cd $(BACKEND_DIR) && go run cmd/server/main.go

run-frontend: ## Ejecutar solo el frontend en dev
	@echo "$(BLUE)⚡ Iniciando frontend en desarrollo...$(RESET)"
	cd $(CLIENT_DIR) && pnpm dev

run: build ## Construir y ejecutar aplicación completa
	@echo "$(BLUE)🚀 Iniciando Cubert (Producción)...$(RESET)"
	@echo "$(YELLOW)📱 Frontend: Archivos estáticos servidos por Go$(RESET)"
	@echo "$(YELLOW)🔗 Backend: API en Go$(RESET)"
	@echo "$(YELLOW)🌐 URL: http://localhost:8080$(RESET)"
	@echo ""
	cd $(BACKEND_DIR) && go run cmd/server/main.go

run-embedded: build-embedded ## Construir y ejecutar binario embebido
	@echo "$(BLUE)🚀 Ejecutando binario embebido...$(RESET)"
	@echo "$(YELLOW)📦 Aplicación completa en un solo archivo$(RESET)"
	@echo "$(YELLOW)🌐 URL: http://localhost:8080$(RESET)"
	@echo ""
	./$(RELEASES_DIR)/cubert-embedded

dev-full: ## Desarrollo completo (backend + frontend build)
	@echo "$(BLUE)🔧 Modo desarrollo completo...$(RESET)"
	$(MAKE) build
	$(MAKE) run-backend

test: ## Ejecutar tests
	@echo "$(BLUE)🧪 Ejecutando tests...$(RESET)"
	cd $(CLIENT_DIR) && pnpm test 2>/dev/null || echo "$(YELLOW)⚠️  No hay tests configurados en frontend$(RESET)"
	cd $(BACKEND_DIR) && go test ./... || echo "$(YELLOW)⚠️  No hay tests en backend$(RESET)"

prod: clean build ## Build completo para producción
	@echo "$(GREEN)🎉 Aplicación lista para producción!$(RESET)"
	@echo ""
	@echo "$(BLUE)Para ejecutar en producción:$(RESET)"
	@echo "  cd $(BACKEND_DIR) && go run cmd/server/main.go"
	@echo ""
	@echo "$(BLUE)O compilar binario:$(RESET)"
	@echo "  cd $(BACKEND_DIR) && go build -o cubert cmd/server/main.go"
	@echo "  ./cubert"

# Información del proyecto
info: ## Mostrar información del proyecto
	@echo "$(BLUE)📊 Información del Proyecto$(RESET)"
	@echo "$(YELLOW)Frontend:$(RESET) React + TypeScript + Tailwind CSS 4"
	@echo "$(YELLOW)Backend:$(RESET) Go + Chi Router"
	@echo "$(YELLOW)Arquitectura:$(RESET) Hexagonal + Clean Architecture"
	@echo "$(YELLOW)Estilo:$(RESET) Futurista inspirado en Passengers"
	@echo ""
	@echo "$(BLUE)Estructura:$(RESET)"
	@echo "  $(CLIENT_DIR)/     - Frontend React"
	@echo "  $(BACKEND_DIR)/    - Backend Go API"
	@echo "  $(STATIC_DIR)/ - Archivos estáticos generados"