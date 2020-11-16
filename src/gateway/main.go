package main

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

func main() {
	services := getServiceAddresses()
	createProxys(services)

}

func getServiceAddresses() map[string]*url.URL {
	services := make(map[string]*url.URL)
	frontendHost := os.Getenv("OPTOX_FRONTEND_SERVICE_HOST")
	frontendPort := os.Getenv("OPTOX_FRONTEND_SERVICE_PORT")
	mainbackendHost := os.Getenv("OPTOX_MAINBACKEND_SERVICE_HOST")
	mainbackendPort := os.Getenv("OPTOX_MAINBACKEND_SERVICE_PORT")
	syncbackendHost := os.Getenv("OPTOX_SYNCBACKEND_SERVICE_HOST")
	syncbackendPort := os.Getenv("OPTOX_SYNCBACKEND_SERVICE_PORT")
	services["frontend"], _ = url.Parse("http://" + frontendHost + ":" + frontendPort)
	services["mainbackend"], _ = url.Parse("http://" + mainbackendHost + ":" + mainbackendPort)
	services["syncbackend"], _ = url.Parse("http://" + syncbackendHost + ":" + syncbackendPort)
	fmt.Printf("Frontend service address: %s", services["frontend"].String())
	fmt.Printf("Main backend service address: %s", services["mainbackend"].String())
	fmt.Printf("Sync backend service address: %s", services["syncbackend"].String())
	return services
}

func createProxys(services map[string]*url.URL) {
	frontendProxy := httputil.NewSingleHostReverseProxy(services["frontend"])
	mainbackendProxy := httputil.NewSingleHostReverseProxy(services["mainbackend"])
	syncbackendProxy := httputil.NewSingleHostReverseProxy(services["syncbackend"])

	http.HandleFunc("/api/images/", frontendhandler(syncbackendProxy))
	http.HandleFunc("/api/", frontendhandler(mainbackendProxy))
	http.HandleFunc("/", frontendhandler(frontendProxy))

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		println("Failed to start reverse proxy!")
		panic(err)
	}
}

// https://gist.github.com/JalfResi/6287706
func frontendhandler(proxy *httputil.ReverseProxy) func(http.ResponseWriter, *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		println(request.RemoteAddr)
		// println(request.URL.Host)
		proxy.ServeHTTP(response, request)
	}
}
