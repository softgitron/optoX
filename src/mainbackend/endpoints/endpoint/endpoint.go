package endpoint

import (
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"github.com/softgitron/optox/src/mainbackend/db"
	"github.com/softgitron/optox/src/mainbackend/endpoints/optician"
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
var Endpoints = []Endpoint{
	{URL: "/api/customer", middlewares: basicMiddlewares, customHandler: nil, Accepts: []string{"GET", "POST"}},
	{URL: "/api/employee", middlewares: basicMiddlewares, customHandler: nil, Accepts: []string{"GET", "POST"}},
	{
		URL:                  "/api/optician/customers",
		middlewares:          basicMiddlewares,
		customHandler:        optician.GetOpticianCustomers,
		Accepts:              []string{"GET"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
	},
	{URL: "/api/optician", middlewares: basicMiddlewares, customHandler: nil, Accepts: []string{"GET", "POST"}},
	{URL: "/api/image", middlewares: basicMiddlewares, customHandler: nil, Accepts: []string{"GET", "POST"}},
	{URL: "/api/service", middlewares: basicMiddlewares, customHandler: nil, Accepts: []string{"GET"}},
	{URL: "/api/inspection", middlewares: basicMiddlewares, customHandler: nil, Accepts: []string{"GET", "POST"}},
	{URL: "/api/contract", middlewares: basicMiddlewares, customHandler: nil, Accepts: []string{"GET", "POST"}},
}

var dbConnection db.Database

// Initialize initializes endpoints
func Initialize() {
	dbConnection = db.Database{}
	dbConnection.CreateConnection()

	//implement the listeners
	for index, endpoint := range Endpoints {
		Endpoints[index].dbHandler = &dbConnection
		http.HandleFunc(endpoint.URL, Endpoints[index].HandleRequest)
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
	ep.customHandler(res, req, &extra)
}
