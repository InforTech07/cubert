package services

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/infortech07/cubert/internal/filesystem/domain"
	"github.com/infortech07/cubert/internal/shared/utils"
)

type ScannerService struct {
	maxDepth   int
	skipHidden bool
}

func NewScannerService() *ScannerService {
	return &ScannerService{
		maxDepth:   10,
		skipHidden: true,
	}
}

func (s *ScannerService) ScanDirectory(ctx context.Context, path string) (*domain.ScanResult, error) {
	startTime := time.Now()

	result := &domain.ScanResult{
		Path:        path,
		Files:       []domain.LocalFile{},
		Directories: []domain.LocalFile{},
		ScanTime:    startTime,
		Errors:      []string{},
	}

	// Verificar que el path existe
	info, err := os.Stat(path)
	if err != nil {
		return nil, fmt.Errorf("failed to access path %s: %w", path, err)
	}

	if !info.IsDir() {
		return nil, fmt.Errorf("path %s is not a directory", path)
	}

	// Escanear el directorio
	err = s.scanDirectoryRecursive(path, result, 0)
	if err != nil {
		result.Errors = append(result.Errors, err.Error())
		result.ErrorCount++
	}

	// Calcular estadísticas finales
	result.TotalFiles = len(result.Files)
	for _, file := range result.Files {
		result.TotalSize += file.Size
	}

	return result, nil
}

func (s *ScannerService) scanDirectoryRecursive(dirPath string, result *domain.ScanResult, depth int) error {
	if depth > s.maxDepth {
		return fmt.Errorf("maximum depth exceeded: %d", s.maxDepth)
	}

	entries, err := os.ReadDir(dirPath)
	if err != nil {
		return fmt.Errorf("failed to read directory %s: %w", dirPath, err)
	}

	for _, entry := range entries {
		// Saltar archivos ocultos si está configurado
		if s.skipHidden && strings.HasPrefix(entry.Name(), ".") {
			continue
		}

		entryPath := filepath.Join(dirPath, entry.Name())

		info, err := entry.Info()
		if err != nil {
			result.Errors = append(result.Errors, fmt.Sprintf("failed to get info for %s: %v", entryPath, err))
			result.ErrorCount++
			continue
		}

		localFile := domain.LocalFile{
			Path:        entryPath,
			Name:        entry.Name(),
			Size:        info.Size(),
			ModTime:     info.ModTime(),
			IsDirectory: entry.IsDir(),
			ContentType: utils.GetContentType(entry.Name()),
			Permissions: info.Mode().String(),
		}

		if entry.IsDir() {
			result.Directories = append(result.Directories, localFile)

			// Escanear subdirectorio recursivamente
			if err := s.scanDirectoryRecursive(entryPath, result, depth+1); err != nil {
				result.Errors = append(result.Errors, err.Error())
				result.ErrorCount++
			}
		} else {
			result.Files = append(result.Files, localFile)
		}
	}

	return nil
}

func (s *ScannerService) GetDirectoryListing(ctx context.Context, path string) ([]domain.LocalFile, error) {
	entries, err := os.ReadDir(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read directory %s: %w", path, err)
	}

	var files []domain.LocalFile

	for _, entry := range entries {
		// Saltar archivos ocultos
		if s.skipHidden && strings.HasPrefix(entry.Name(), ".") {
			continue
		}

		entryPath := filepath.Join(path, entry.Name())

		info, err := entry.Info()
		if err != nil {
			continue // Saltar archivos que no se pueden leer
		}

		localFile := domain.LocalFile{
			Path:        entryPath,
			Name:        entry.Name(),
			Size:        info.Size(),
			ModTime:     info.ModTime(),
			IsDirectory: entry.IsDir(),
			ContentType: utils.GetContentType(entry.Name()),
			Permissions: info.Mode().String(),
		}

		files = append(files, localFile)
	}

	return files, nil
}

func (s *ScannerService) GetDirectoryStats(ctx context.Context, path string) (*domain.DirectoryStats, error) {
	var totalFiles, totalDirectories int64
	var totalSize int64
	var lastModified time.Time

	err := filepath.Walk(path, func(filePath string, info os.FileInfo, err error) error {
		if err != nil {
			return nil // Continuar con otros archivos
		}

		// Saltar archivos ocultos
		if s.skipHidden && strings.HasPrefix(info.Name(), ".") {
			return nil
		}

		if info.IsDir() {
			totalDirectories++
		} else {
			totalFiles++
			totalSize += info.Size()
		}

		if info.ModTime().After(lastModified) {
			lastModified = info.ModTime()
		}

		return nil
	})

	if err != nil {
		return nil, fmt.Errorf("failed to walk directory %s: %w", path, err)
	}

	return &domain.DirectoryStats{
		Path:             path,
		TotalFiles:       totalFiles,
		TotalDirectories: totalDirectories,
		TotalSize:        totalSize,
		LastModified:     lastModified,
	}, nil
}

func (s *ScannerService) SetMaxDepth(depth int) {
	s.maxDepth = depth
}

func (s *ScannerService) SetSkipHidden(skip bool) {
	s.skipHidden = skip
}
