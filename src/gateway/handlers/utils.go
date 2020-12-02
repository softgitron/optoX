package handlers

import (
	"errors"
	"fmt"
	"net/http"
)

func checkAllowedMethods(methods map[string]bool, response http.ResponseWriter, request *http.Request) error {
	if !methods[request.Method] {
		var keyList string
		for method := range methods {
			keyList += method + ", "
		}
		keyList = keyList[:len(keyList)-1]
		response.Header().Set("Allow", keyList)
		response.WriteHeader(http.StatusMethodNotAllowed)
		return errors.New("Unsupported methods encountered")
	}
	return nil
}

func sendHTTPError(code int, errorMessage string, response http.ResponseWriter) {
	errorResponse := fmt.Sprintf("{\"error\": \"%s\"}", errorMessage)
	response.WriteHeader(code)
	response.Write([]byte(errorResponse))
}
