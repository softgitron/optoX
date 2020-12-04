package handlers

import (
	"net/http"
	"net/http/httputil"
)

// https://gist.github.com/JalfResi/6287706

// FrontendHandler provides generic reverse proxy for static frontend content
func FrontendHandler(proxy *httputil.ReverseProxy) func(http.ResponseWriter, *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		proxy.ServeHTTP(response, request)
	}
}
