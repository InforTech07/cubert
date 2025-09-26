package domain

import (
	"time"
)

type ScanResult struct {
	Path        string      `json:"path"`
	Files       []LocalFile `json:"files"`
	Directories []LocalFile `json:"directories"`
	TotalFiles  int         `json:"total_files"`
	TotalSize   int64       `json:"total_size"`
	ScanTime    time.Time   `json:"scan_time"`
	ErrorCount  int         `json:"error_count"`
	Errors      []string    `json:"errors,omitempty"`
}

type IndexRequest struct {
	LocalPath   string `json:"local_path"`
	VirtualPath string `json:"virtual_path"`
	UserID      string `json:"user_id"`
	Recursive   bool   `json:"recursive"`
}

type FileInfo struct {
	Path        string            `json:"path"`
	Name        string            `json:"name"`
	Size        int64             `json:"size"`
	ModTime     time.Time         `json:"mod_time"`
	IsDirectory bool              `json:"is_directory"`
	ContentType string            `json:"content_type"`
	Permissions string            `json:"permissions"`
	Extension   string            `json:"extension"`
	Parent      string            `json:"parent"`
	Metadata    map[string]string `json:"metadata,omitempty"`
}

type DirectoryStats struct {
	Path             string    `json:"path"`
	TotalFiles       int64     `json:"total_files"`
	TotalDirectories int64     `json:"total_directories"`
	TotalSize        int64     `json:"total_size"`
	LastModified     time.Time `json:"last_modified"`
}
