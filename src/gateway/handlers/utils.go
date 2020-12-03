package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

func checkAllowedMethods(methods []string, response http.ResponseWriter, request *http.Request) error {
	var valid = false
	for _, method := range methods {
		valid = valid || (request.Method == method)
	}

	if !valid {
		var keyList string
		for _, method := range methods {
			keyList += method + ", "
		}
		keyList = keyList[:len(keyList)-1]
		response.Header().Set("Allow", keyList)
		response.WriteHeader(http.StatusMethodNotAllowed)
		return errors.New("Unsupported methods encountered")
	}
	return nil
}

func parseRequest(decoded interface{}, response http.ResponseWriter, request *http.Request) error {
	err := json.NewDecoder(request.Body).Decode(decoded)
	if err != nil {
		sendHTTPError(http.StatusBadRequest, err.Error(), response)
	}
	return err
}

func sendHTTPError(code int, errorMessage string, response http.ResponseWriter) {
	errorResponse := fmt.Sprintf("{\"error\": \"%s\"}", errorMessage)
	response.WriteHeader(code)
	response.Write([]byte(errorResponse))
}
