package inspection

import (
	"net/http"
	"strconv"

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
	if req.Method == "GET" {
		idstr := req.Header.Get("InspectionID")

		if idstr == "" {
			connection.SendHTTPError(http.StatusBadRequest, "ID is not given", res)
			return
		}

		id, parseErr := strconv.ParseInt(req.Header.Get("InspectionID"), 10, 0)

		if parseErr != nil {
			connection.SendHTTPError(http.StatusBadRequest, "ID is not a number", res)
			return
		}

		ins, err := h.DBHandler.GetInspectionByID(int(id))

		if err != nil {
			connection.SendHTTPError(http.StatusInternalServerError, "Database fetch failed", res)
		} else {
			connection.SendOKReponse(ins, res)
		}

		return
	}
}

func DecisionHandler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	body := h.Body.(connection.InspectionDecision)
	// Check that opthalmologist employee ID macthes
	inspection, err := h.DBHandler.GetInspectionByID(body.InspectionID)
	if err != nil {
		connection.SendHTTPError(http.StatusBadRequest, "No such inspection ID", res)
		return
	}

	if inspection.OpthalmologistID != h.Claims.EmployerID {
		connection.SendHTTPError(http.StatusUnauthorized, "Ophthalmologist does not work for a company that own inspection", res)
		return
	}

	var status string
	if body.Approval == 0 {
		status = "Rejected"
	} else if body.Approval == 1 {
		status = "Approved"
	} else {
		connection.SendHTTPError(http.StatusBadRequest, "Unknown approval status", res)
		return
	}
	inspection.Status = status

	err = h.DBHandler.UpdateInspectionApproval(body.InspectionID, status)
	if err == nil {
		connection.SendOKReponse(inspection, res)
	} else {
		connection.SendHTTPError(http.StatusInternalServerError, "Database error while updating inspection status", res)
	}
}
