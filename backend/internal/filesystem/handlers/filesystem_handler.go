package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/infortech07/cubert/internal/filesystem/services"
	"github.com/infortech07/cubert/internal/shared/utils"
)

type FilesystemHandler struct {
	scannerService  *services.ScannerService
	explorerService *services.ExplorerService
}

func NewFilesystemHandler(
	scannerService *services.ScannerService,
	explorerService *services.ExplorerService,
) *FilesystemHandler {
	return &FilesystemHandler{
		scannerService:  scannerService,
		explorerService: explorerService,
	}
}

func (h *FilesystemHandler) ScanDirectory(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Query().Get("path")
	if path == "" {
		utils.WriteErrorResponse(w, http.StatusBadRequest, "Path parameter is required", nil)
		return
	}

	// Configurar opciones de escaneo
	if maxDepthStr := r.URL.Query().Get("max_depth"); maxDepthStr != "" {
		if maxDepth, err := strconv.Atoi(maxDepthStr); err == nil && maxDepth > 0 {
			h.scannerService.SetMaxDepth(maxDepth)
		}
	}

	if skipHiddenStr := r.URL.Query().Get("skip_hidden"); skipHiddenStr != "" {
		if skipHidden, err := strconv.ParseBool(skipHiddenStr); err == nil {
			h.scannerService.SetSkipHidden(skipHidden)
		}
	}

	result, err := h.scannerService.ScanDirectory(r.Context(), path)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusInternalServerError, "Failed to scan directory", err)
		return
	}

	utils.WriteJSONResponse(w, http.StatusOK, result)
}

func (h *FilesystemHandler) ListDirectory(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Query().Get("path")
	if path == "" {
		utils.WriteErrorResponse(w, http.StatusBadRequest, "Path parameter is required", nil)
		return
	}

	files, err := h.explorerService.ListDirectory(r.Context(), path)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusInternalServerError, "Failed to list directory", err)
		return
	}

	response := map[string]interface{}{
		"path":  path,
		"files": files,
		"count": len(files),
	}

	utils.WriteJSONResponse(w, http.StatusOK, response)
}

func (h *FilesystemHandler) GetFileInfo(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Query().Get("path")
	if path == "" {
		utils.WriteErrorResponse(w, http.StatusBadRequest, "Path parameter is required", nil)
		return
	}

	fileInfo, err := h.explorerService.GetFileInfo(r.Context(), path)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusNotFound, "File not found", err)
		return
	}

	utils.WriteJSONResponse(w, http.StatusOK, fileInfo)
}

func (h *FilesystemHandler) GetDirectoryStats(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Query().Get("path")
	if path == "" {
		utils.WriteErrorResponse(w, http.StatusBadRequest, "Path parameter is required", nil)
		return
	}

	stats, err := h.scannerService.GetDirectoryStats(r.Context(), path)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusInternalServerError, "Failed to get directory stats", err)
		return
	}

	utils.WriteJSONResponse(w, http.StatusOK, stats)
}

func (h *FilesystemHandler) SearchFiles(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Query().Get("path")
	query := r.URL.Query().Get("q")

	if path == "" {
		utils.WriteErrorResponse(w, http.StatusBadRequest, "Path parameter is required", nil)
		return
	}

	if query == "" {
		utils.WriteErrorResponse(w, http.StatusBadRequest, "Query parameter is required", nil)
		return
	}

	results, err := h.explorerService.SearchFiles(r.Context(), path, query)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusInternalServerError, "Search failed", err)
		return
	}

	response := map[string]interface{}{
		"path":    path,
		"query":   query,
		"results": results,
		"count":   len(results),
	}

	utils.WriteJSONResponse(w, http.StatusOK, response)
}

func (h *FilesystemHandler) GetSystemRoots(w http.ResponseWriter, r *http.Request) {
	roots, err := h.explorerService.GetSystemRoots()
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusInternalServerError, "Failed to get system roots", err)
		return
	}

	response := map[string]interface{}{
		"roots": roots,
		"count": len(roots),
	}

	utils.WriteJSONResponse(w, http.StatusOK, response)
}

func (h *FilesystemHandler) ValidatePath(w http.ResponseWriter, r *http.Request) {
	var request struct {
		Path string `json:"path"`
	}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	if err := h.explorerService.ValidatePath(request.Path); err != nil {
		utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid path", err)
		return
	}

	utils.WriteJSONResponse(w, http.StatusOK, map[string]interface{}{
		"path":  request.Path,
		"valid": true,
	})
}
