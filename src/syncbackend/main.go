package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/api/images/healtz", healtz)
	http.ListenAndServe(":8080", nil)
}

func healtz(response http.ResponseWriter, request *http.Request) {
	fmt.Fprint(response, "Sync backend health OK")
}
