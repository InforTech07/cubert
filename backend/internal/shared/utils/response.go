package utils

import (
	"encoding/json"
	"net/http"
)

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
	Code    int    `json:"code"`
}

type SuccessResponse struct {
	Data    interface{} `json:"data"`
	Message string      `json:"message,omitempty"`
	Code    int         `json:"code"`
}

// WriteJSONResponse writes a JSON response to the ResponseWriter
func WriteJSONResponse(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	response := SuccessResponse{
		Data: data,
		Code: statusCode,
	}

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

// WriteErrorResponse writes an error response to the ResponseWriter
func WriteErrorResponse(w http.ResponseWriter, statusCode int, message string, err error) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	errorResponse := ErrorResponse{
		Message: message,
		Code:    statusCode,
	}

	if err != nil {
		errorResponse.Error = err.Error()
	}

	if encodeErr := json.NewEncoder(w).Encode(errorResponse); encodeErr != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

// WriteMessageResponse writes a simple message response
func WriteMessageResponse(w http.ResponseWriter, statusCode int, message string) {
	WriteJSONResponse(w, statusCode, map[string]string{"message": message})
}
