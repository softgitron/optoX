package main

import (
	"net/http"
)

//Endpoint is ...
type Endpoint struct {
	url           string
	customHandler func(http.ResponseWriter, *http.Request)
	accepts       []string
	dbHandler     *database
}

var dbHandle = database{}
var endpoints = [...]Endpoint{
	{
		url:           "/api/service",
		customHandler: service,
		accepts:       []string{"GET"},
		dbHandler:     nil,
	},
	{
		url:           "/api/user", //will get the information from customers to employees, post will handle adding new employees/
		customHandler: user,
		accepts:       []string{"GET", "POST"},
		dbHandler:     nil,
	},
}

func main() {
	//connect to database
	dbHandle.createConnection()

	//implement the listeners
	for _, endpoint := range endpoints {
		endpoint.dbHandler = &dbHandle
		http.HandleFunc(endpoint.url, endpoint.handler)
	}

	//and finally setup the listening service
	var err = http.ListenAndServe(":8080", nil)

	if err != nil {
		panic("Port failed to bind")
	}
}

func (ep *Endpoint) handler(res http.ResponseWriter, req *http.Request) {
	//check if we have a valid method
	var valid = false
	for _, method := range ep.accepts {
		valid = valid || (req.Method == method)
	}

	if !valid {
		return
	}

	//run the custom handler
	ep.customHandler(res, req)
}

func user(res http.ResponseWriter, req *http.Request) {

}

func service(response http.ResponseWriter, request *http.Request) {

}
