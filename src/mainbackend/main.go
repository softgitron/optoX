package main

import (
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/endpoints/endpoint"
)

func main() {
	endpoint.Initialize()

	//and finally setup the listening service
	var err = http.ListenAndServe(":8080", nil)

	if err != nil {
		panic("Port failed to bind")
	}
}
