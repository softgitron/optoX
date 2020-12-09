package handlers

import (
	"fmt"
	"net/http"
)

// Healtz responds with ok, if needed
func Healtz(response http.ResponseWriter, request *http.Request) {
	fmt.Fprint(response, "Sync backend health OK")
}
