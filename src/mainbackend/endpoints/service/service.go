package service

import (
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/db"
)

/*
This endpoint will accept these parameters
	service [name]	| If present only output that endpoints state
	db 0/1			| Check for database connection, if its working
	endpoints 0/1	| Check for rest of the endpoints if they are working properly
*/

//Data ...
type Data struct {
	status       string
	endpoints    []string
	dbconnection string
}

//Handler ... will just output that if everything is OK
func Handler(ep *(db.Database), res http.ResponseWriter, req *http.Request) {
	//get states for all
}
