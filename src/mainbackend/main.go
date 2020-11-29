package main

import (
	"fmt"
	"net/http"
)

type endpoint struct {
	db database
}

func main() {
	db := database{}
	db.createConnection()
	ep := endpoint{db: db}
	http.HandleFunc("/api/healtz", ep.healtz)
	http.HandleFunc("/api/createUser", ep.createUser)
	http.HandleFunc("/api/createError", ep.createError)
	http.ListenAndServe(":8080", nil)
}

func (ep *endpoint) healtz(response http.ResponseWriter, request *http.Request) {
	fmt.Fprint(response, "Main backend health OK")
}

func (ep *endpoint) createUser(response http.ResponseWriter, request *http.Request) {
	ep.db.gormCreateUser()
}

func (ep *endpoint) createError(response http.ResponseWriter, request *http.Request) {
	ep.db.gormCreateError()
}
