package connection

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// SendHTTPError with specific code and message
func SendHTTPError(code int, errorMessage string, res http.ResponseWriter) {
	errorResponse := fmt.Sprintf("{\"error\": \"%s\"}", errorMessage)
	res.WriteHeader(code)
	res.Write([]byte(errorResponse))
}

// SendOKReponse with json data
func SendOKReponse(data interface{}, res http.ResponseWriter) {
	newResponse, err := json.Marshal(data)
	if err != nil {
		SendHTTPError(http.StatusInternalServerError, "Unknown error occured while marshaling response", res)
	} else {
		res.WriteHeader(http.StatusOK)
		res.Write(newResponse)
	}
}
