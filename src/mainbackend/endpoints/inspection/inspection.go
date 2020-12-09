package inspection

import (
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/connection"
)

/**
 * @api {get} /inspection Get inspection info from specific inspection
 * @apiVersion 1.0.0
 * @apiName getInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Number{0..}} CustomerId Personal id of the customer
 * @apiParam {Number{0..}} InspectionId selected inspection's ID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "CustomerId":81,
 *     	"FundusPhotoRef":52353534
 *		"OctScanRef":32323434
 *		"VisualFieldRef":22243334
 *		"Timestamp": "12.11.2011 10:22:01"
 *		"LoginToken": "XY2Z-2324-S422-0324"
 *
 *     }
 *
 */

/**
 * @api {post} /inspection Creates new inspection
 * @apiVersion 1.0.0
 * @apiName newInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Number{0..}} CustomerID ID of the customer
 * @apiParam {Date} TimeStamp Timestamp of the inspection
 * @apiParam {String{60}} FundusPhotoRef fundus Image ID
 * @apiParam {String{60}} OctScanRef oct Image ID
 * @apiParam {String{60}} VisualVieldRef visual Image ID
 * @apiParam {String} LoginToken Token for customer login
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       results: "New inspection created"
 *     }
 *
 */

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

/**
 * @api {post} /inspection/decision approve or reject inspection images
 * @apiVersion 1.0.0
 * @apiName decision
 * @apiGroup Inspection
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Number} InspectionID inspecion id
 * @apiParam {Number=0,1} Approval approval value, 0 for reject and 1 for approve.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       results: "Decision ok"
 *     }
 *
 *
 *
 */

func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {

}
