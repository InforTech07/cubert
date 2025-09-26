package utils

import (
	"fmt"
	"path/filepath"
	"strings"
)

// NormalizePath normalizes a file path
func NormalizePath(path string) string {
	// Clean the path
	path = filepath.Clean(path)

	// Ensure it starts with /
	if !strings.HasPrefix(path, "/") {
		path = "/" + path
	}

	return path
}

// JoinPaths safely joins two paths
func JoinPaths(base, relative string) string {
	base = NormalizePath(base)
	relative = strings.TrimPrefix(relative, "/")

	if relative == "" {
		return base
	}

	if base == "/" {
		return "/" + relative
	}

	return base + "/" + relative
}

// GetParentPath returns the parent directory of a path
func GetParentPath(path string) string {
	path = NormalizePath(path)

	if path == "/" {
		return "/"
	}

	parent := filepath.Dir(path)
	return NormalizePath(parent)
}

// GetFileName returns the filename from a path
func GetFileName(path string) string {
	return filepath.Base(path)
}

// GetFileExtension returns the file extension
func GetFileExtension(filename string) string {
	ext := filepath.Ext(filename)
	return strings.ToLower(ext)
}

// IsValidPath checks if the path is valid and safe
func IsValidPath(path string) bool {
	// Check for path traversal attempts
	if strings.Contains(path, "..") {
		return false
	}

	// Check for null bytes
	if strings.Contains(path, "\x00") {
		return false
	}

	// Must start with /
	if !strings.HasPrefix(path, "/") {
		return false
	}

	return true
}

// GenerateUniquePath generates a unique path if the original exists
func GenerateUniquePath(basePath string, counter int) string {
	if counter == 0 {
		return basePath
	}

	dir := filepath.Dir(basePath)
	filename := filepath.Base(basePath)
	ext := filepath.Ext(filename)
	nameWithoutExt := strings.TrimSuffix(filename, ext)

	newFilename := fmt.Sprintf("%s_%d%s", nameWithoutExt, counter, ext)
	return filepath.Join(dir, newFilename)
}
