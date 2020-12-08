package optician

import (
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/connection"
)

func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {

}

/**
 * @api {get} api/optician/customers Get optician customers
 * @apiVersion 1.0.0
 * @apiName getOptician customers
 * @apiGroup Optician
 *
 * @apiHeader {String} [authenticationtoken] authentication token of the session. (Can be supplied via cookie too.)
 *
 * @apiSuccessExample Success-Response:
 *     	HTTP/1.1 200 OK
 *    	{
 *   	"customers":[
 *      	{
 *         	"customerId":81,
 *         	"socialSecurityNumber":"141195-511Y",
 *         	"firstName":"Osku",
 *         	"lastName":"Väänänen"
 *      	},
 *      	{
 *        	 "customerId":85,
 *         	"socialSecurityNumber":"120194-514H",
 *        	 "firstName":"Kaisa",
 *        	 "lastName":"Kunnari"
 *      	}]
 *     	}
 *
 *
 * @apiError UnknownError Unknown error
 * @apiError Unauthorized You don't have access to this customer data
 *
 */

// GetOpticianCustomers handles HTTP request that provides list of optician customers
func GetOpticianCustomers(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	opticianEmployeeID := h.Claims.ID
	customers, err := h.DBHandler.GetCustomersByOpticianEmployeeID(opticianEmployeeID)
	if err == nil {
		connection.SendOKReponse(customers, res)
	} else {
		connection.SendHTTPError(http.StatusInternalServerError, "Database error occurred while receiving customers information", res)
	}
}
