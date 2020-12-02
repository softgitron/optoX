package endpoint

import (
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/db"
)

//Endpoint is ...
type Endpoint struct {
	url           string
	customHandler func(http.ResponseWriter, *http.Request)
	accepts       []string
	dbHandler     *db.Database
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

	if ep.customHandler != nil {
		ep.customHandler(res, req)
	}
}

//Endpoints ...
var Endpoints = map[string]Endpoint{
	"customer": {url: "/api/customer", customHandler: nil, accepts: []string{"GET", "POST"}, dbHandler: nil},
	"employee": {url: "/api/employee", customHandler: nil, accepts: []string{"GET", "POST"}, dbHandler: nil},
	"optician": {url: "/api/optician", customHandler: nil, accepts: []string{"GET", "POST"}, dbHandler: nil},
}

func Initialize() {

}

func (ep *Endpoint) GetAcceptedMethods() []string {
	return ep.accepts
}

func (ep *Endpoint) SetCustomHandler(f func(http.ResponseWriter, *http.Request)) {
	ep.customHandler = f
}

func (ep *Endpoint) GetURL() string {
	return ep.url
}
