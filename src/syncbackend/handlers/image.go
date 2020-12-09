package handlers

import (
	"net/http"
	"os"
)

// ImageData is used for sending image file information
type ImageData struct {
	ImageID string
}

// Maximum upload size 10 MB
const maxFileSize = 10 << 20

var region = os.Getenv("REGION")

// ImageHandler provides post and get functionality for the endpoint
func (h *Handler) ImageHandler(res http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodPost {
		h.imagePostHandler(res, req)
	} else if req.Method == http.MethodGet {
		h.imageGetHandler(res, req)
	} else {
		res.Header().Set("Allow", "Get, Post")
		res.WriteHeader(http.StatusMethodNotAllowed)
	}
}

/**
 * @api {post} /image Uploads new image and returns ImageID
 * @apiVersion 1.0.0
 * @apiName newImage
 * @apiGroup Image
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Binary} Fileupload Image data that should be stored
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ImageID": "75156"
 *     }
 *
 * @apiError New data can be uploaded only to the central node
 * @apiError Access level is not sufficient
 * @apiError File could not be received
 * @apiError File could not be read
 * @apiError File contains wrong type, should be jpeg
 * @apiError Could not save file to disk
 *
 */

func (h *Handler) imagePostHandler(res http.ResponseWriter, req *http.Request) {
	if region != "central" {
		sendHTTPError(http.StatusNotImplemented, "New data can be uploaded only to the central node", res)
		return
	}

	authenticationType := req.Header.Get("Type")
	if authenticationType == "Unauthorized" || authenticationType == "Customer" {
		sendHTTPError(http.StatusUnauthorized, "Access level is not sufficient", res)
		return
	}

	req.ParseMultipartForm(maxFileSize)

	file, _, err := req.FormFile("Fileupload")
	if err != nil {
		sendHTTPError(http.StatusBadRequest, "File could not be received", res)
		return
	}
	defer file.Close()

	buffer := make([]byte, 512)
	_, err = file.Read(buffer)
	if err != nil {
		sendHTTPError(http.StatusBadRequest, "File could not be read", res)
		return
	}
	file.Seek(0, 0)

	fileType := http.DetectContentType(buffer)
	if fileType != "image/jpeg" {
		sendHTTPError(http.StatusBadRequest, "File contains wrong type, should be jpeg", res)
		return
	}

	imageID, err := h.Syncengine.Store(file)
	if err != nil {
		sendHTTPError(http.StatusInternalServerError, "Could not save file to disk", res)
	}
	response := ImageData{
		ImageID: imageID,
	}
	sendOKReponse(response, res)
}

/**
 * @api {get} /image Receives image using ImageID
 * @apiVersion 1.0.0
 * @apiName getImage
 * @apiGroup Image
 *
 * @apiHeader {String} Authentication authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Integer} ImageID ID of the image that should be received URL encoded
 *
 *
 * @apiError Access level is not sufficient
 * @apiError ImageID was not supplied
 * @apiError Image couldn't be loaded with the image id
 *
 */

func (h *Handler) imageGetHandler(res http.ResponseWriter, req *http.Request) {
	authenticationType := req.Header.Get("Type")
	if authenticationType == "Unauthorized" {
		sendHTTPError(http.StatusUnauthorized, "Access level is not sufficient", res)
		return
	}

	parameters := req.URL.Query()
	imageID := parameters.Get("ImageID")
	if imageID == "" {
		sendHTTPError(http.StatusBadRequest, "ImageID was not supplied", res)
		return
	}

	data, err := h.Syncengine.Load(imageID)
	if err != nil {
		sendHTTPError(http.StatusBadRequest, "Image couldn't be loaded with the image id", res)
		return
	}

	res.Write(data)
}
