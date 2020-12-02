package main

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"

	"github.com/softgitron/optox/src/gateway/database"
	"github.com/softgitron/optox/src/gateway/handlers"
)

func main() {
	db := database.Database{}
	db.InitializeConnection()
	services := getServiceAddresses()
	createProxys(services, db)

}

func getServiceAddresses() map[string]*url.URL {
	services := make(map[string]*url.URL)
	frontendHost := os.Getenv("FRONTEND_SERVICE_HOST")
	frontendPort := os.Getenv("FRONTEND_SERVICE_PORT")
	mainbackendHost := os.Getenv("MAINBACKEND_SERVICE_HOST")
	mainbackendPort := os.Getenv("MAINBACKEND_SERVICE_PORT")
	syncbackendHost := os.Getenv("SYNCBACKEND_SERVICE_HOST")
	syncbackendPort := os.Getenv("SYNCBACKEND_SERVICE_PORT")
	services["frontend"], _ = url.Parse("http://" + frontendHost + ":" + frontendPort)
	services["mainbackend"], _ = url.Parse("http://" + mainbackendHost + ":" + mainbackendPort)
	services["syncbackend"], _ = url.Parse("http://" + syncbackendHost + ":" + syncbackendPort)
	fmt.Printf("Frontend service address: %s", services["frontend"].String())
	fmt.Printf("Main backend service address: %s", services["mainbackend"].String())
	fmt.Printf("Sync backend service address: %s", services["syncbackend"].String())
	return services
}

func createProxys(services map[string]*url.URL, db database.Database) {
	frontendProxy := httputil.NewSingleHostReverseProxy(services["frontend"])
	mainbackendProxy := httputil.NewSingleHostReverseProxy(services["mainbackend"])
	syncbackendProxy := httputil.NewSingleHostReverseProxy(services["syncbackend"])

	login := handlers.Handler{Db: db}

	http.HandleFunc("/api/images/", handlers.FrontendHandler(syncbackendProxy))
	http.HandleFunc("/api/users/login", login.LoginHandler)
	http.HandleFunc("/api/", handlers.FrontendHandler(mainbackendProxy))
	http.HandleFunc("/", handlers.FrontendHandler(frontendProxy))

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		println("Failed to start reverse proxy!")
		panic(err)
	}
}
