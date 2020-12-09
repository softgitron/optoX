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
	syncbackendReadHost := os.Getenv("SYNCBACKEND_SERVICE_HOST")
	syncbackendReadPort := os.Getenv("SYNCBACKEND_SERVICE_PORT")
	// Central uses same sync backend for both read and writes
	var syncbackendWriteHost string
	var syncbackendWritePort = "8080"
	if os.Getenv("REGION") == "central" {
		syncbackendWriteHost = syncbackendReadHost
		syncbackendWritePort = syncbackendReadPort
	} else {
		syncbackendWriteHost = "syncbackend-central"
	}
	services["frontend"], _ = url.Parse("http://" + frontendHost + ":" + frontendPort)
	services["mainbackend"], _ = url.Parse("http://" + mainbackendHost + ":" + mainbackendPort)
	services["syncbackendRead"], _ = url.Parse("http://" + syncbackendReadHost + ":" + syncbackendReadPort)
	services["syncbackendWrite"], _ = url.Parse("http://" + syncbackendWriteHost + ":" + syncbackendWritePort)
	fmt.Printf("Frontend service address: %s", services["frontend"].String())
	fmt.Printf("Main backend service address: %s", services["mainbackend"].String())
	fmt.Printf("Sync backend read service address: %s", services["syncbackendRead"].String())
	fmt.Printf("Sync backend write service address: %s", services["syncbackendWrite"].String())
	return services
}

func createProxys(services map[string]*url.URL, db database.Database) {
	frontendProxy := httputil.NewSingleHostReverseProxy(services["frontend"])
	mainbackendProxy := httputil.NewSingleHostReverseProxy(services["mainbackend"])
	syncbackendReadProxy := httputil.NewSingleHostReverseProxy(services["syncbackendRead"])
	syncbackendWriteProxy := httputil.NewSingleHostReverseProxy(services["syncbackendWrite"])

	handlersInstance := handlers.Handler{Db: db}
	handlersInstance.Init()

	http.HandleFunc("/api/image", handlersInstance.SyncbackendHandler(syncbackendReadProxy, syncbackendWriteProxy))
	http.HandleFunc("/api/image/healtz", handlersInstance.SyncbackendHandler(syncbackendReadProxy, syncbackendWriteProxy))
	http.HandleFunc("/api/authentication/customer", handlersInstance.CustomerLoginHandler)
	http.HandleFunc("/api/authentication/employee", handlersInstance.EmployeeLoginHandler)
	http.HandleFunc("/api/", handlersInstance.BackendHandler(mainbackendProxy))
	http.HandleFunc("/", handlers.FrontendHandler(frontendProxy))

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		println("Failed to start reverse proxy!")
		panic(err)
	}
}
