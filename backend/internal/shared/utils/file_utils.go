package utils

import (
	"crypto/md5"
	"fmt"
	"io"
	"mime"
	"path/filepath"
	"strings"
)

// CalculateFileMD5 calculates MD5 hash of a file
func CalculateFileMD5(reader io.Reader) (string, error) {
	hash := md5.New()
	if _, err := io.Copy(hash, reader); err != nil {
		return "", err
	}
	return fmt.Sprintf("%x", hash.Sum(nil)), nil
}

// GetContentType returns the MIME type based on file extension
func GetContentType(filename string) string {
	ext := strings.ToLower(filepath.Ext(filename))

	// Common content types
	contentTypes := map[string]string{
		".jpg":  "image/jpeg",
		".jpeg": "image/jpeg",
		".png":  "image/png",
		".gif":  "image/gif",
		".webp": "image/webp",
		".svg":  "image/svg+xml",
		".pdf":  "application/pdf",
		".txt":  "text/plain",
		".md":   "text/markdown",
		".html": "text/html",
		".css":  "text/css",
		".js":   "application/javascript",
		".json": "application/json",
		".xml":  "application/xml",
		".doc":  "application/msword",
		".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		".xls":  "application/vnd.ms-excel",
		".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		".ppt":  "application/vnd.ms-powerpoint",
		".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		".mp4":  "video/mp4",
		".avi":  "video/x-msvideo",
		".mov":  "video/quicktime",
		".wmv":  "video/x-ms-wmv",
		".flv":  "video/x-flv",
		".webm": "video/webm",
		".mp3":  "audio/mpeg",
		".wav":  "audio/wav",
		".flac": "audio/flac",
		".aac":  "audio/aac",
		".ogg":  "audio/ogg",
		".zip":  "application/zip",
		".rar":  "application/x-rar-compressed",
		".7z":   "application/x-7z-compressed",
		".tar":  "application/x-tar",
		".gz":   "application/gzip",
	}

	if contentType, exists := contentTypes[ext]; exists {
		return contentType
	}

	// Try to detect using mime package
	if contentType := mime.TypeByExtension(ext); contentType != "" {
		return contentType
	}

	return "application/octet-stream"
}

// SanitizeFilename removes dangerous characters from filename
func SanitizeFilename(filename string) string {
	// Remove path traversal attempts
	filename = strings.ReplaceAll(filename, "..", "")
	filename = strings.ReplaceAll(filename, "/", "_")
	filename = strings.ReplaceAll(filename, "\\", "_")

	// Remove other potentially dangerous characters
	filename = strings.ReplaceAll(filename, ":", "_")
	filename = strings.ReplaceAll(filename, "*", "_")
	filename = strings.ReplaceAll(filename, "?", "_")
	filename = strings.ReplaceAll(filename, "\"", "_")
	filename = strings.ReplaceAll(filename, "<", "_")
	filename = strings.ReplaceAll(filename, ">", "_")
	filename = strings.ReplaceAll(filename, "|", "_")

	return strings.TrimSpace(filename)
}

// FormatFileSize formats file size in human readable format
func FormatFileSize(bytes int64) string {
	const unit = 1024
	if bytes < unit {
		return fmt.Sprintf("%d B", bytes)
	}

	div, exp := int64(unit), 0
	for n := bytes / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}

	return fmt.Sprintf("%.1f %cB", float64(bytes)/float64(div), "KMGTPE"[exp])
}

// IsImageFile checks if the file is an image based on content type
func IsImageFile(contentType string) bool {
	return strings.HasPrefix(contentType, "image/")
}

// IsVideoFile checks if the file is a video based on content type
func IsVideoFile(contentType string) bool {
	return strings.HasPrefix(contentType, "video/")
}

// IsAudioFile checks if the file is an audio file based on content type
func IsAudioFile(contentType string) bool {
	return strings.HasPrefix(contentType, "audio/")
}

// IsDocumentFile checks if the file is a document based on content type
func IsDocumentFile(contentType string) bool {
	documentTypes := []string{
		"application/pdf",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"text/plain",
		"text/markdown",
		"text/html",
	}

	for _, docType := range documentTypes {
		if contentType == docType {
			return true
		}
	}
	return false
}
