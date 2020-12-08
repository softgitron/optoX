package endpoint

import (
	"net/http"
	"path"
	"strings"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"github.com/softgitron/optox/src/mainbackend/db"
	"github.com/softgitron/optox/src/mainbackend/endpoints/contract"
	"github.com/softgitron/optox/src/mainbackend/endpoints/image"
	"github.com/softgitron/optox/src/mainbackend/endpoints/inspection"
	"github.com/softgitron/optox/src/mainbackend/endpoints/optician"
	"github.com/softgitron/optox/src/mainbackend/endpoints/service"
	"github.com/softgitron/optox/src/mainbackend/endpoints/users"
	"github.com/softgitron/optox/src/mainbackend/middleware"
)

type mwHandlers []func(http.ResponseWriter, *http.Request, *middleware.Middleware, *connection.Handler) error

//Endpoint is ...
type Endpoint struct {
	URL                  string
	middlewares          mwHandlers
	customHandler        func(http.ResponseWriter, *http.Request, *connection.Handler)
	Accepts              []string
	AuthenticationTypes  []string
	AuthenticationLevels []string
	dbHandler            *db.Database
}

var basicMiddlewares = mwHandlers{middleware.CheckRequestType, middleware.CheckAuthentication}
var allAccessLevels = []string{"Normal", "Moderator", "Administrator"}

//Endpoints ...
var Endpoints = map[string]Endpoint{
	"customer": {URL: "/api/customer", middlewares: basicMiddlewares, customHandler: nil, Accepts: []string{"GET", "POST"}},
	"employee": {URL: "/api/employee", middlewares: basicMiddlewares, customHandler: nil, Accepts: []string{"GET", "POST"}},
	"customers": {
		URL:                  "/api/optician/customers",
		middlewares:          basicMiddlewares,
		customHandler:        optician.GetOpticianCustomers,
		Accepts:              []string{"GET"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
	},
	"optician":   {URL: "/api/optician", middlewares: basicMiddlewares, customHandler: optician.Handler, Accepts: []string{"GET", "POST"}},
	"image":      {URL: "/api/image", middlewares: basicMiddlewares, customHandler: image.Handler, Accepts: []string{"GET", "POST"}},
	"service":    {URL: "/api/service", middlewares: basicMiddlewares, customHandler: service.Handler, Accepts: []string{"GET"}},
	"inspection": {URL: "/api/inspection", middlewares: basicMiddlewares, customHandler: inspection.Handler, Accepts: []string{"GET", "POST"}},
	"contract":   {URL: "/api/contract", middlewares: basicMiddlewares, customHandler: contract.Handler, Accepts: []string{"GET", "POST"}},
	"users":      {URL: "/api/users", middlewares: basicMiddlewares, customHandler: users.Handler, Accepts: []string{"POST"}},
}

var dbConnection db.Database

//Initialize ...
func Initialize() {
	dbConnection = db.Database{}
	dbConnection.CreateConnection()

	http.HandleFunc("/api/", func(res http.ResponseWriter, req *http.Request) {
		var base = path.Base(req.RequestURI)

		if strings.Contains(base, "?") {
			base = strings.Split(base, "?")[0]
		}

		if endpoint, ok := Endpoints[base]; ok {
			endpoint.HandleRequest(res, req)
		}
	})

	//and finally setup the listening service
	var err = http.ListenAndServe(":8080", nil)

	if err != nil {
		panic("Could not bind to given address/port")
	}
}

// GetAcceptedMethods receives all the methods from the endpoints that are accepted
func (ep *Endpoint) GetAcceptedMethods() []string {
	return ep.Accepts
}

// SetCustomHandler sets custom handler for the endpoint
func (ep *Endpoint) SetCustomHandler(f func(http.ResponseWriter, *http.Request, *connection.Handler)) {
	ep.customHandler = f
}

// GetURL gets URL of the endpoint
func (ep *Endpoint) GetURL() string {
	return ep.URL
}

// HandleRequest handles endpoint request generically
func (ep *Endpoint) HandleRequest(res http.ResponseWriter, req *http.Request) {
	// Create middleware struct for processing
	mwParameters := middleware.Middleware{
		URL:                  ep.URL,
		Accepts:              ep.Accepts,
		AuthenticationTypes:  ep.AuthenticationTypes,
		AuthenticationLevels: ep.AuthenticationLevels,
	}
	extra := connection.Handler{DBHandler: ep.dbHandler}
	for _, mw := range ep.middlewares {
		// Execute all attached middlewares
		if mw(res, req, &mwParameters, &extra) != nil {
			// Return if middleware causes error
			return
		}
	}
	// Finally execute custom handler

	res.Header().Set("Content-Type", "application/json")
	ep.customHandler(res, req, &extra)
}
