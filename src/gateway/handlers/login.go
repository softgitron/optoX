package handlers

import (
	"net/http"
)

type login struct {
	email    string
	password string
}

// LoginHandler handles login requests for the platform
func (h *Handler) LoginHandler(response http.ResponseWriter, request *http.Request) {
	if checkAllowedMethods(map[string]bool{http.MethodPost: true}, response, request) != nil {
	}
}
