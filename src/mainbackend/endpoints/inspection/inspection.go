package inspection

import (
	"net/http"
	"strconv"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"github.com/softgitron/optox/src/mainbackend/db"
)

/**
 * @api {get} /inspection Get inspection info from specific inspection
 * @apiVersion 1.0.0
 * @apiName getInspection
 * @apiGroup Inspection
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Number{0..}} InspectionID selected inspection's ID
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

/*
type InspectionDetails struct {
	CustomerID        int
	InspectionCountry string
	FundusPhotoRef    int
	OctScanRef        int
	VisualFieldRef    int
	TimeStamp         time.Time
	LoginToken        string
	OpthalmologistID  int
}*/

func InspectionFromInspectionDetails(details connection.InspectionDetails) db.Inspection {
	return db.Inspection{
		CustomerID:         details.CustomerID,
		InspectionTime:     details.TimeStamp,
		InspectionsCountry: details.InspectionCountry,
		Status:             "Waiting",
		FundusPhotoRef:     details.FundusPhotoRef,
		OctScanRef:         details.OctScanRef,
		VisualFieldRef:     details.VisualFieldRef,
		LoginToken:         details.LoginToken,
		OpthalmologistID:	details.OpthalmologistID,
	}
}

func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	if req.Method == "GET" {
		inspectionIDstr := req.URL.Query().Get("InspectionID")

		if inspectionIDstr == "" {
			connection.SendHTTPError(http.StatusBadRequest, "ID is not given", res)
			return
		}

		inspectionID, parseErr := strconv.Atoi(inspectionIDstr)

		if parseErr != nil {
			connection.SendHTTPError(http.StatusBadRequest, "ID is not a number", res)
			return
		}

		ins, err := h.DBHandler.GetInspectionByID(inspectionID)

		// Check that optician or opthalmologist is authorized to view inspection data
		if h.Claims.EmployerID != ins.OpticianID && h.Claims.Type == "Optician" ||
			h.Claims.EmployerID != ins.OpthalmologistID && h.Claims.Type == "Opthalmologist" {
			connection.SendHTTPError(http.StatusUnauthorized, "Employee id does not match", res)
			return
		}

		if h.Claims.ID != ins.CustomerID && h.Claims.Type == "Customer" {
			connection.SendHTTPError(http.StatusUnauthorized, "Inspection is not related to the customer", res)
			return
		}

		if err != nil {
			connection.SendHTTPError(http.StatusInternalServerError, "Database fetch failed", res)
		} else {
			connection.SendOKReponse(ins, res)
		}

		return
	}

	if req.Method == "POST" {
		if h.Claims.Type == "Customer" {
			connection.SendHTTPError(http.StatusUnauthorized, "Customer can't make inspections", res)
			return
		}

		if h.Body == nil {
			connection.SendHTTPError(http.StatusInternalServerError, "No body given", res)
			return
		}

		insp := h.Body.(connection.InspectionDetails)
		body := InspectionFromInspectionDetails(insp)
		body.Status = "InProgress"
		err := h.DBHandler.AddInspection(body)

		if err != nil {
			connection.SendHTTPError(http.StatusInternalServerError, "Couldn't create a new inspection", res)
			return
		}

		connection.SendOKReponse(connection.Success{Result: "New customer created"}, res)
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
