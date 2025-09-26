package services

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/infortech07/cubert/internal/filesystem/domain"
	"github.com/infortech07/cubert/internal/shared/utils"
)

type ExplorerService struct {
	scannerService *ScannerService
}

func NewExplorerService(scannerService *ScannerService) *ExplorerService {
	return &ExplorerService{
		scannerService: scannerService,
	}
}

func (e *ExplorerService) GetFileInfo(ctx context.Context, path string) (*domain.FileInfo, error) {
	info, err := os.Stat(path)
	if err != nil {
		return nil, fmt.Errorf("failed to get file info: %w", err)
	}

	fileInfo := &domain.FileInfo{
		Path:        path,
		Name:        filepath.Base(path),
		Size:        info.Size(),
		ModTime:     info.ModTime(),
		IsDirectory: info.IsDir(),
		ContentType: utils.GetContentType(path),
		Permissions: info.Mode().String(),
		Extension:   filepath.Ext(path),
		Parent:      filepath.Dir(path),
		Metadata:    make(map[string]string),
	}

	// Agregar metadatos adicionales
	fileInfo.Metadata["readable"] = fmt.Sprintf("%t", info.Mode().Perm()&0400 != 0)
	fileInfo.Metadata["writable"] = fmt.Sprintf("%t", info.Mode().Perm()&0200 != 0)
	fileInfo.Metadata["executable"] = fmt.Sprintf("%t", info.Mode().Perm()&0100 != 0)

	return fileInfo, nil
}

func (e *ExplorerService) ListDirectory(ctx context.Context, path string) ([]domain.LocalFile, error) {
	return e.scannerService.GetDirectoryListing(ctx, path)
}

func (e *ExplorerService) SearchFiles(ctx context.Context, rootPath, query string) ([]domain.LocalFile, error) {
	var results []domain.LocalFile

	err := filepath.Walk(rootPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return nil // Continuar con otros archivos
		}

		// Saltar archivos ocultos
		if strings.HasPrefix(info.Name(), ".") {
			return nil
		}

		// Buscar por nombre
		if strings.Contains(strings.ToLower(info.Name()), strings.ToLower(query)) {
			localFile := domain.LocalFile{
				Path:        path,
				Name:        info.Name(),
				Size:        info.Size(),
				ModTime:     info.ModTime(),
				IsDirectory: info.IsDir(),
				ContentType: utils.GetContentType(info.Name()),
				Permissions: info.Mode().String(),
			}
			results = append(results, localFile)
		}

		return nil
	})

	if err != nil {
		return nil, fmt.Errorf("failed to search in directory %s: %w", rootPath, err)
	}

	return results, nil
}

func (e *ExplorerService) GetParentDirectory(path string) string {
	return filepath.Dir(path)
}

func (e *ExplorerService) ValidatePath(path string) error {
	// Verificar que el path existe
	_, err := os.Stat(path)
	if err != nil {
		return fmt.Errorf("path does not exist: %s", path)
	}

	// Verificar que es accesible
	file, err := os.Open(path)
	if err != nil {
		return fmt.Errorf("path is not accessible: %s", path)
	}
	file.Close()

	return nil
}

func (e *ExplorerService) GetSystemRoots() ([]string, error) {
	// En sistemas Unix, típicamente solo hay "/"
	// En Windows serían las unidades C:, D:, etc.
	roots := []string{"/"}

	// Verificar algunos directorios comunes
	commonDirs := []string{"/home", "/usr", "/var", "/tmp"}
	for _, dir := range commonDirs {
		if _, err := os.Stat(dir); err == nil {
			roots = append(roots, dir)
		}
	}

	return roots, nil
}
