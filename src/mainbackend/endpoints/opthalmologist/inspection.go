package opthalmologist

import (
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/connection"
)

/**
 * @api {get} /ophtalmologist/inspections Get own cases
 * @apiVersion 1.0.0
 * @apiName getOphtalmologistCases
 * @apiGroup Ophtalmologis
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *   	"inspections":[
 *      	{
 *         	    "CustomerId":11,
 *		        "InspectionId":24,
 *		        "Timestamp":"12.11.2020 11:12:31"
 *         	    "SocialSecurityNumber":"141195-511Y",
 *         	    "FirstName":"Osku",
 *         	    "LastName":"Väänänen"
 *      	},
 *      	{
 *        	    "CustomerId":45,
 *		        "InspectionId":266,
 * 		        "Timestamp":"12.11.2020 11:12:31"
 *         	    "SocialSecurityNumber":"120194-514H",
 *        	    "FirstName":"Kaisa",
 *        	    "LastName":"Kunnari"
 *      	}]
 *     }
 *
 *
 *
 */

func InspectionsHandler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	opthalmologistID := h.Claims.EmployerID
	inspections, err := h.DBHandler.GetInspectionsByOpthalmologistID(opthalmologistID)
	if err == nil {
		connection.SendOKReponse(inspections, res)
	} else {
		connection.SendHTTPError(http.StatusInternalServerError, "Database error occurred while receiving inspection information", res)
	}
}
