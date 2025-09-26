package domain

import (
	"time"
)

type LocalFile struct {
	Path        string    `json:"path"`
	Name        string    `json:"name"`
	Size        int64     `json:"size"`
	ModTime     time.Time `json:"mod_time"`
	IsDirectory bool      `json:"is_directory"`
	ContentType string    `json:"content_type"`
	Permissions string    `json:"permissions"`
}
