package utils

import (
	"path/filepath"
	"regexp"
	"strings"
	"unicode/utf8"
)

// IsValidEmail validates email format
func IsValidEmail(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

// IsValidUsername validates username format
func IsValidUsername(username string) bool {
	if len(username) < 3 || len(username) > 32 {
		return false
	}

	usernameRegex := regexp.MustCompile(`^[a-zA-Z0-9_-]+$`)
	return usernameRegex.MatchString(username)
}

// IsValidPassword validates password strength
func IsValidPassword(password string) bool {
	if len(password) < 8 {
		return false
	}

	// At least one uppercase letter
	hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
	// At least one lowercase letter
	hasLower := regexp.MustCompile(`[a-z]`).MatchString(password)
	// At least one digit
	hasDigit := regexp.MustCompile(`[0-9]`).MatchString(password)
	// At least one special character
	hasSpecial := regexp.MustCompile(`[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]`).MatchString(password)

	return hasUpper && hasLower && hasDigit && hasSpecial
}

// IsValidFilename validates filename
func IsValidFilename(filename string) bool {
	if filename == "" || len(filename) > 255 {
		return false
	}

	// Check for invalid characters
	invalidChars := []string{"/", "\\", ":", "*", "?", "\"", "<", ">", "|", "\x00"}
	for _, char := range invalidChars {
		if strings.Contains(filename, char) {
			return false
		}
	}

	// Check if valid UTF-8
	if !utf8.ValidString(filename) {
		return false
	}

	// Reserved names on Windows
	reservedNames := []string{
		"CON", "PRN", "AUX", "NUL",
		"COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
		"LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9",
	}

	nameWithoutExt := strings.TrimSuffix(filename, filepath.Ext(filename))
	for _, reserved := range reservedNames {
		if strings.EqualFold(nameWithoutExt, reserved) {
			return false
		}
	}

	return true
}

// SanitizeInput sanitizes user input
func SanitizeInput(input string) string {
	// Remove leading/trailing whitespace
	input = strings.TrimSpace(input)

	// Remove null bytes
	input = strings.ReplaceAll(input, "\x00", "")

	return input
}

// ValidateFileSize checks if file size is within limits
func ValidateFileSize(size int64, maxSize int64) bool {
	return size > 0 && size <= maxSize
}

// IsAllowedFileType checks if file type is allowed
func IsAllowedFileType(contentType string, allowedTypes []string) bool {
	if len(allowedTypes) == 0 {
		return true // No restrictions
	}

	for _, allowedType := range allowedTypes {
		if contentType == allowedType {
			return true
		}

		// Check for wildcard matches (e.g., "image/*")
		if strings.HasSuffix(allowedType, "/*") {
			prefix := strings.TrimSuffix(allowedType, "/*")
			if strings.HasPrefix(contentType, prefix+"/") {
				return true
			}
		}
	}

	return false
}
