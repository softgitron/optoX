package main

import (
	"net/http"
	"os"

	"github.com/softgitron/optox/src/syncbackend/handlers"
	"github.com/softgitron/optox/src/syncbackend/syncengine"
)

func main() {
	se := syncengine.Syncengine{}
	se.Initialize()
	handler := handlers.Handler{Syncengine: &se}
	http.HandleFunc("/api/image/healtz", handlers.Healtz)
	http.HandleFunc("/api/image", handler.ImageHandler)

	// Host sync server, if central node
	if os.Getenv("REGION") == "central" {
		go se.StartSyncServer()
	} else {
		go se.StartSyncClient()
	}

	http.ListenAndServe(":8080", nil)
}
