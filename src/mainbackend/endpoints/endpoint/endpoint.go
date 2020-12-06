package endpoint

import (
	"fmt"
	"net/http"
	"path"
	"strings"

	"github.com/softgitron/optox/src/mainbackend/db"
	"github.com/softgitron/optox/src/mainbackend/endpoints/contract"
	"github.com/softgitron/optox/src/mainbackend/endpoints/customer"
	"github.com/softgitron/optox/src/mainbackend/endpoints/employee"
	"github.com/softgitron/optox/src/mainbackend/endpoints/image"
	"github.com/softgitron/optox/src/mainbackend/endpoints/inspection"
	"github.com/softgitron/optox/src/mainbackend/endpoints/login"
	"github.com/softgitron/optox/src/mainbackend/endpoints/optician"
	"github.com/softgitron/optox/src/mainbackend/endpoints/service"
)

//Endpoint is ...
type Endpoint struct {
	url           string
	customHandler func(*db.Database, http.ResponseWriter, *http.Request)
	accepts       []string
	dbHandler     *db.Database
}

//Handle the calls, mainly prevent invalid request methods before moving to custom endpoint handler
func (ep *Endpoint) handler(res http.ResponseWriter, req *http.Request) {
	//check if we have a valid method
	var valid = false
	for _, method := range ep.accepts {
		valid = valid || (req.Method == method)
	}

	if !valid {
		http.Error(res, "Invalid request", http.StatusBadRequest)
		return
	}

	if ep.customHandler != nil {
		//fmt.Fprint(res, "Custom handler")
		ep.customHandler(ep.dbHandler, res, req)
	} else {
		fmt.Fprint(res, "No custom handler")
	}
}

//Endpoints ...
var Endpoints = map[string]Endpoint{
	"customer":   {url: "/api/customer", customHandler: customer.Handler, accepts: []string{"GET", "POST"}, dbHandler: nil},
	"employee":   {url: "/api/employee", customHandler: employee.Handler, accepts: []string{"GET", "POST"}, dbHandler: nil},
	"optician":   {url: "/api/optician", customHandler: optician.Handler, accepts: []string{"GET", "POST"}, dbHandler: nil},
	"image":      {url: "/api/image", customHandler: image.Handler, accepts: []string{"GET", "POST"}, dbHandler: nil},
	"service":    {url: "/api/service", customHandler: service.Handler, accepts: []string{"GET"}, dbHandler: nil},
	"inspection": {url: "/api/inspection", customHandler: inspection.Handler, accepts: []string{"GET", "POST"}, dbHandler: nil},
	"contract":   {url: "/api/contract", customHandler: contract.Handler, accepts: []string{"GET", "POST"}, dbHandler: nil},
	"user":       {url: "/api/user", customHandler: login.Handler, accepts: []string{"GET"}, dbHandler: nil},
}

var dbConnection db.Database

func handle(res http.ResponseWriter, req *http.Request) {
	//get the endpoint from the url
	var base = path.Base(req.RequestURI)
	if strings.Contains(base, "?") {
		base = strings.Split(base, "?")[0]
	}

	var endpoint = Endpoints[base]

	endpoint.handler(res, req)
}

//Initialize ...
func Initialize() {
	//dbConnection = db.Database{}
	//dbConnection.CreateConnection()

	http.HandleFunc("/api/", handle)

	//and finally setup the listening service
	var err = http.ListenAndServe(":8080", nil)

	if err != nil {
		panic("Could not bind to given address/port")
	}
}

func (ep *Endpoint) GetAcceptedMethods() []string {
	return ep.accepts
}

func (ep *Endpoint) SetCustomHandler(f func(*db.Database, http.ResponseWriter, *http.Request)) {
	ep.customHandler = f
}

func (ep *Endpoint) GetURL() string {
	return ep.url
}

func (ep *Endpoint) GetDatabase() *db.Database {
	return ep.dbHandler
}
