package handlers

import (
	"net/http"
	"net/http/httputil"
)

// SyncbackendHandler separates get and post requests between read and write syncbackend nodes
// Only central sync backend can handle post requests
func (h *Handler) SyncbackendHandler(readProxy *httputil.ReverseProxy, writeProxy *httputil.ReverseProxy) func(http.ResponseWriter, *http.Request) {
	readHandler := h.BackendHandler(readProxy)
	writeHandler := h.BackendHandler(writeProxy)
	return func(response http.ResponseWriter, request *http.Request) {
		if request.Method == http.MethodGet {
			readHandler(response, request)
		} else {
			writeHandler(response, request)
		}
	}
}
