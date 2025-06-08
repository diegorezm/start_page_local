package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Printf("Error writing JSON response: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

func readJSON(r *http.Request, target any) error {
	decoder := json.NewDecoder(r.Body)
	// Ensure that only fields present in the struct are allowed
	decoder.DisallowUnknownFields()
	return decoder.Decode(target)
}

func sendError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

func idFromPath(r *http.Request) (int32, error) {
	idStr := r.PathValue("id")
	if idStr == "" {
		return 0, fmt.Errorf("ID missing from path")
	}
	id, err := strconv.ParseInt(idStr, 10, 32)
	if err != nil {
		return 0, fmt.Errorf("invalid ID format: %w", err)
	}
	return int32(id), nil
}
