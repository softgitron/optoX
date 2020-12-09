package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func sendHTTPError(code int, errorMessage string, response http.ResponseWriter) {
	errorResponse := fmt.Sprintf("{\"error\": \"%s\"}", errorMessage)
	response.WriteHeader(code)
	response.Write([]byte(errorResponse))
}

func sendOKReponse(data interface{}, res http.ResponseWriter) {
	newResponse, err := json.Marshal(data)
	if err != nil {
		sendHTTPError(http.StatusInternalServerError, "Unknown error occured while marshaling response", res)
	} else {
		res.WriteHeader(http.StatusOK)
		res.Write(newResponse)
	}
}
