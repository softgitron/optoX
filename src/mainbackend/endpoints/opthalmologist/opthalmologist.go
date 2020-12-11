package opthalmologist

import (
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/connection"
)

// Handler ...
func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	opthalmologists, err := h.DBHandler.GetOpthalmologists()
	if err == nil {
		connection.SendOKReponse(opthalmologists, res)
	} else {
		connection.SendHTTPError(http.StatusInternalServerError, "Database error occurred while receiving inspection information", res)
	}
}
