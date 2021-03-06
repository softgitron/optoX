package endpoint

import (
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"github.com/softgitron/optox/src/mainbackend/db"
	"github.com/softgitron/optox/src/mainbackend/endpoints/contract"
	"github.com/softgitron/optox/src/mainbackend/endpoints/customer"
	"github.com/softgitron/optox/src/mainbackend/endpoints/employee"
	"github.com/softgitron/optox/src/mainbackend/endpoints/image"
	"github.com/softgitron/optox/src/mainbackend/endpoints/inspection"
	"github.com/softgitron/optox/src/mainbackend/endpoints/opthalmologist"
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
	bodyType             int
	dbHandler            *db.Database
}

var basicMiddlewares = mwHandlers{middleware.CheckRequestType, middleware.CheckAuthentication}
var basicBodyMiddlewares = mwHandlers{middleware.CheckRequestType, middleware.CheckAuthentication, middleware.DecodeBody}
var allAccessLevels = []string{"Normal", "Moderator", "Administrator"}

//Endpoints ...
var Endpoints = map[string]Endpoint{
	"/api/customer": {
		URL:                  "/api/customer",
		middlewares:          basicBodyMiddlewares,
		customHandler:        customer.Handler,
		Accepts:              []string{"GET", "POST"},
		AuthenticationTypes:  []string{"Customer", "Optician", "Opthalmologist"},
		AuthenticationLevels: allAccessLevels,
		bodyType:             connection.BodyTypeCustomer,
		dbHandler:            &dbConnection,
	},
	"/api/customer/inspections": {
		URL:                  "/api/customer/inspections",
		middlewares:          basicMiddlewares,
		customHandler:        customer.GetCustomerInspections,
		Accepts:              []string{"GET", "POST"},
		AuthenticationTypes:  []string{"Customer", "Optician"},
		AuthenticationLevels: allAccessLevels,
		dbHandler:            &dbConnection,
	},
	"/api/employee": {
		URL:                  "/api/employee",
		middlewares:          basicMiddlewares,
		customHandler:        employee.Handler,
		Accepts:              []string{"GET", "POST"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
		dbHandler:            &dbConnection,
	},
	"/api/optician/customers": {
		URL:                  "/api/optician/customers",
		middlewares:          basicMiddlewares,
		customHandler:        optician.GetOpticianCustomers,
		Accepts:              []string{"GET"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
		dbHandler:            &dbConnection,
	},
	"/api/optician": {
		URL:                  "/api/optician",
		middlewares:          basicMiddlewares,
		customHandler:        optician.Handler,
		Accepts:              []string{"GET", "POST"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
		dbHandler:            &dbConnection,
	},
	"/api/image": {
		URL:                  "/api/image",
		middlewares:          basicMiddlewares,
		customHandler:        image.Handler,
		Accepts:              []string{"GET", "POST"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
		dbHandler:            &dbConnection,
	},
	"/api/service": {
		URL:                  "/api/service",
		middlewares:          basicMiddlewares,
		customHandler:        service.Handler,
		Accepts:              []string{"GET"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
		dbHandler:            &dbConnection,
	},
	"/api/inspection": {
		URL:                  "/api/inspection",
		middlewares:          basicBodyMiddlewares,
		customHandler:        inspection.Handler,
		Accepts:              []string{"GET", "POST"},
		AuthenticationTypes:  []string{"Customer", "Optician", "Opthalmologist"},
		AuthenticationLevels: allAccessLevels,
		bodyType:             connection.BodyTypeInspection,
		dbHandler:            &dbConnection,
	},
	"/api/inspection/decision": {
		URL:                  "/api/inspection/decision",
		middlewares:          basicBodyMiddlewares,
		customHandler:        inspection.DecisionHandler,
		Accepts:              []string{"POST"},
		AuthenticationTypes:  []string{"Opthalmologist"},
		AuthenticationLevels: allAccessLevels,
		bodyType:             connection.BodyTypeInspectionDecision,
		dbHandler:            &dbConnection,
	},
	"/api/opthalmologist/inspections": {
		URL:                  "/api/opthalmologist/inspections",
		middlewares:          basicMiddlewares,
		customHandler:        opthalmologist.InspectionsHandler,
		Accepts:              []string{"GET"},
		AuthenticationTypes:  []string{"Opthalmologist"},
		AuthenticationLevels: allAccessLevels,
		bodyType:             connection.BodyTypeInspectionDecision,
		dbHandler:            &dbConnection,
	},
	"/api/contract": {
		URL:                  "/api/contract",
		middlewares:          basicMiddlewares,
		customHandler:        contract.Handler,
		Accepts:              []string{"GET", "POST"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
		dbHandler:            &dbConnection,
	},
	"/api/users": {
		URL:                  "/api/users",
		middlewares:          basicMiddlewares,
		customHandler:        users.Handler,
		Accepts:              []string{"POST"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
		dbHandler:            &dbConnection,
	},
	"/api/opthalmologist": {
		URL:                  "/api/opthalmologist",
		middlewares:          basicMiddlewares,
		customHandler:        opthalmologist.Handler,
		Accepts:              []string{"GET"},
		AuthenticationTypes:  []string{"Optician"},
		AuthenticationLevels: allAccessLevels,
		dbHandler:            &dbConnection,
	},
}

var dbConnection db.Database

// Initialize initializes endpoints
func Initialize() {
	dbConnection = db.Database{}
	dbConnection.CreateConnection()

	http.HandleFunc("/api/", func(res http.ResponseWriter, req *http.Request) {
		var path = req.URL.Path

		if endpoint, ok := Endpoints[path]; ok {
			endpoint.dbHandler = &dbConnection
			endpoint.HandleRequest(res, req)
		} else {
			connection.SendHTTPError(http.StatusNotFound, "Not acceptable api endpoint", res)
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
		BodyType:             ep.bodyType,
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
