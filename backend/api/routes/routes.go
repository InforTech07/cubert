package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/infortech07/cubert/internal/filesystem/handlers"
)

func RegisterFilesystemRoutes(r chi.Router, handler *handlers.FilesystemHandler) {
	r.Route("/api/v1/filesystem", func(r chi.Router) {
		r.Get("/scan", handler.ScanDirectory)
		r.Get("/list", handler.ListDirectory)
		r.Get("/info", handler.GetFileInfo)
		r.Get("/stats", handler.GetDirectoryStats)
		r.Get("/search", handler.SearchFiles)
		r.Get("/roots", handler.GetSystemRoots)
		r.Post("/validate", handler.ValidatePath)
	})
}
