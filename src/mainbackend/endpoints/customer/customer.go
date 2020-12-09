package customer

import (
	"net/http"
	"net/url"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"github.com/softgitron/optox/src/mainbackend/db"
)

type Results struct {
	Customers *[]db.Customer
}

func GetCustomers(query url.Values, h *connection.Handler) (*[]db.Customer, error) {
	return h.DBHandler.GetCustomers()
}

/**
 * @api {get} /customer Searches for customer using ID
 * @apiVersion 1.0.0
 * @apiName searchCustomer
 * @apiGroup Customer
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {String} Email email of the customer
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "CustomerId": 100,
 *       "InspectionID":41,
 *       "Email": "example@mail.com",
 * 	     "SocialSecurityNumber": "051255-153T",
 *       "FirstName": "John",
 * 	     "LastName": "Doe"
 *     }
 *
 */

func GetCustomerByID(query url.Values, h *connection.Handler) (*[]db.Customer, error) {
	return h.DBHandler.GetCustomers()
}

/**
 * @api {post} /customer Creates new customer
 * @apiVersion 1.0.0
 * @apiName newCustomer
 * @apiGroup Customer
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Number{0...}} CustomerID
 * @apiParam {String} SosialSecurityNumber
 * @apiParam {String} Email
 * @apiParam {String} FirstName
 * @apiParam {String} LastName
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       results: "New customer created"
 *     }
 *
 */

// GetCustomerInspections ...
func GetCustomerInspections(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	customerID := h.Claims.ID
	inspections, err := h.DBHandler.GetInspectionByCustomerID(customerID)
	if err == nil {
		connection.SendOKReponse(inspections, res)
	} else {
		connection.SendHTTPError(http.StatusInternalServerError, "Database error occurred while receiving inspection information", res)
	}
}

// Handler ...
func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	if req.Method == "GET" {
		var query = req.URL.Query()
		var results *[]db.Customer
		var err error

		//TODO:
		//if multiple

		if query.Get("customer") != "" {
			results, err = GetCustomerByID(query, h)
		} else {
			results, err = GetCustomers(query, h)
		}

		if err != nil {
			connection.SendHTTPError(http.StatusInternalServerError, "Something failed with database fetch", res)
			return
		}

		connection.SendOKReponse(results, res)
	}

	if req.Method == "POST" {
		err := h.DBHandler.AddCustomer(h.Body.(db.Customer))

		if err != nil {
			connection.SendHTTPError(http.StatusInternalServerError, "Couldn't parse the body", res)
			return
		}

		connection.SendOKReponse(h.Body, res)
	}
}

/**
 * @api {get} /customers/inspections Get customer inspections based on customerID
 * @apiVersion 1.0.0
 * @apiName getInspectionImages
 * @apiGroup Optician
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Number} CustomerID customers ID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      inspections: [
 *	{
 *		"InspectionID":23,
 *         	"Timestamp": "13.12.2010 09:22:01"
 *     	},
 *	{
 *		"InspectionID":27,
 *         	"Timestamp": "15.11.2011 10:22:01"
 *     	},
 *
 *
 *
 */
