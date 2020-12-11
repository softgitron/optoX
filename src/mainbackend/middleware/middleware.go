package middleware

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/softgitron/optox/src/mainbackend/connection"
)

// Middleware contains information that can be processed by the middlewares
type Middleware struct {
	URL                  string
	Accepts              []string
	AuthenticationTypes  []string
	AuthenticationLevels []string
	BodyType             int
}

// CheckRequestType cheks that request has acceptable HTTP verb
func CheckRequestType(res http.ResponseWriter, req *http.Request, mw *Middleware, h *connection.Handler) error {
	//check if we have a valid method
	var valid = false
	for _, method := range mw.Accepts {
		valid = valid || (req.Method == method)
	}

	if !valid {
		var keyList string
		for _, method := range mw.Accepts {
			keyList += method + ", "
		}
		keyList = keyList[:len(keyList)-1]
		res.Header().Set("Allow", keyList)
		res.WriteHeader(http.StatusMethodNotAllowed)
		return errors.New("Unsupported methods encountered")
	}
	return nil
}

// CheckAuthentication converts claims from the header into claims struct
// and call next middleware.
func CheckAuthentication(res http.ResponseWriter, req *http.Request, mw *Middleware, h *connection.Handler) error {
	claims := connection.Claims{}
	claims.Type = req.Header.Get("Type")
	claims.ID, _ = strconv.Atoi(req.Header.Get("ID"))
	claims.EmployerID, _ = strconv.Atoi(req.Header.Get("EmployerID"))
	claims.Email = req.Header.Get("Email")
	claims.Country = req.Header.Get("Country")
	claims.FirstName = req.Header.Get("FirstName")
	claims.LastName = req.Header.Get("LastName")
	claims.AccessLevel = req.Header.Get("AccessLevel")
	h.Claims = claims

	typeOK := false
	levelOK := false
	for _, authenticationType := range mw.AuthenticationTypes {
		typeOK = typeOK || (claims.Type == authenticationType)
	}
	for _, authenticationLevel := range mw.AuthenticationLevels {
		levelOK = levelOK || (claims.AccessLevel == authenticationLevel)
	}
	if typeOK == false || levelOK == false {
		connection.SendHTTPError(http.StatusUnauthorized, "Unauthorized or authorization type does not match.", res)
		return errors.New("unauthorized or authorization type does not match")
	}
	return nil
}

// DecodeBody decodes http body json to designated structure
func DecodeBody(res http.ResponseWriter, req *http.Request, mw *Middleware, h *connection.Handler) error {
	var err error

	//if same endpoint supports both GET and POST don't check body if we using GET
	if req.Method == "GET" {
		return nil
	}

	switch mw.BodyType {
	case connection.BodyTypeInspectionDecision:
		{
			body := connection.InspectionDecision{}
			err = json.NewDecoder(req.Body).Decode(&body)
			h.Body = body
		}
	case connection.BodyTypeLoginDetails:
		{
			body := connection.LoginDetails{}
			err = json.NewDecoder(req.Body).Decode(&body)
			h.Body = body
		}
	case connection.BodyTypeCustomer:
		{
			body := connection.CustomerDetails{}
			err = json.NewDecoder(req.Body).Decode(&body)
			h.Body = body
		}

	case connection.BodyTypeInspection:
		{
			body := connection.InspectionDetails{}
			err = json.NewDecoder(req.Body).Decode(&body)
			h.Body = body
		}
	}

	fmt.Fprintln(res, err)

	if err != nil {
		connection.SendHTTPError(http.StatusBadRequest, "Unable to unmarshal request", res)
		return err
	}
	return nil
}
