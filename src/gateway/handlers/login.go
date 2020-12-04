package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type customerLogin struct {
	Token string
}

type employeeLogin struct {
	Email    string
	Password string
}

const generallErrorMessage = "Credentials didn't work"

// LoginHandler handles login requests for the platform
func (h *Handler) LoginHandler(response http.ResponseWriter, request *http.Request) {
	if checkAllowedMethods([]string{http.MethodPost}, response, request) != nil {
		return
	}

	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
		return
	}

	// Try customer login
	newCustomerLoginAttempt := customerLogin{}
	customerErr := json.Unmarshal(body, &newCustomerLoginAttempt)

	// Try employee login
	newEmployeeLoginAttempt := employeeLogin{}
	employeeErr := json.Unmarshal(body, &newEmployeeLoginAttempt)

	if newCustomerLoginAttempt.Token != "" && customerErr == nil {
		h.customerLoginHandler(newCustomerLoginAttempt, response, request)
	} else if newEmployeeLoginAttempt.Email != "" && employeeErr == nil {
		h.employeeLoginHandler(newEmployeeLoginAttempt, response, request)
	} else {
		sendHTTPError(http.StatusBadRequest, employeeErr.Error(), response)
	}
}

func (h *Handler) customerLoginHandler(newLoginAttempt customerLogin, response http.ResponseWriter, request *http.Request) {
	inspection, err := h.Db.GetInspectionByToken(newLoginAttempt.Token)
	if err == nil {
		// Get customer details based on inspection
		customer, err := h.Db.GetCustomerByID(inspection.CustomerID)
		if err != nil {
			sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
			return
		}
		claims := Claims{
			Type:        "Customer",
			ID:          customer.CustomerID,
			Email:       customer.Email,
			Country:     customer.CustomerCountry,
			FirstName:   customer.FirstName,
			LastName:    customer.LastName,
			AccessLevel: "normal",
		}
		h.sendToken(&claims, response)
		return
	}
	// If no matches, return error
	sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
}

func (h *Handler) employeeLoginHandler(newLoginAttempt employeeLogin, response http.ResponseWriter, request *http.Request) {
	// Check login against administrator database
	admin, err := h.Db.GetAdministratorByEmail(newLoginAttempt.Email)
	if err == nil {
		if admin.Password == newLoginAttempt.Password {
			claims := Claims{
				Type:        "Administrator",
				ID:          admin.AdminID,
				Email:       admin.Email,
				Country:     "",
				FirstName:   "",
				LastName:    "",
				AccessLevel: "administrator",
			}
			h.sendToken(&claims, response)
		} else {
			sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
		}
		return
	}

	// Check login against opthalmologist database
	opthalmologistEmployee, err := h.Db.GetOpthalmologistEmployeeByEmail(newLoginAttempt.Email)
	if err == nil {
		if opthalmologistEmployee.Password == newLoginAttempt.Password {
			claims := Claims{
				Type:        "Opthalmologist",
				ID:          opthalmologistEmployee.EmployeeID,
				Email:       opthalmologistEmployee.Email,
				Country:     opthalmologistEmployee.OpthalmologistEmployeeCountry,
				FirstName:   opthalmologistEmployee.FirstName,
				LastName:    opthalmologistEmployee.LastName,
				AccessLevel: opthalmologistEmployee.AccessLevel,
			}
			h.sendToken(&claims, response)
		} else {
			sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
		}
		return
	}

	// Check login against optician database
	opticianEmployee, err := h.Db.GetOpticianEmployeeByEmail(newLoginAttempt.Email)
	if err == nil {
		if opticianEmployee.Password == newLoginAttempt.Password {
			claims := Claims{
				Type:        "Optician",
				ID:          opticianEmployee.EmployeeID,
				Email:       opticianEmployee.Email,
				Country:     opticianEmployee.OpticianEmployeeCountry,
				FirstName:   opticianEmployee.FirstName,
				LastName:    opticianEmployee.LastName,
				AccessLevel: opticianEmployee.AccessLevel,
			}
			h.sendToken(&claims, response)
		} else {
			sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
		}
		return
	}

	// If no matches, return error
	sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
}

func setLoginCookie(name string, value string, maxAge int, response http.ResponseWriter) {
	cookie := http.Cookie{
		Name:   name,
		Value:  value,
		MaxAge: maxAge,
	}
	http.SetCookie(response, &cookie)
}

func sendLoginOK(jwt string, response http.ResponseWriter) {
	setLoginCookie("Authentication", jwt, 60*60*24, response)
	response.Header().Set("Authentication", jwt)
	response.Write([]byte(fmt.Sprintf("{\"Authentication\": \"%s\"}", jwt)))
}

func (h *Handler) sendToken(claims *Claims, response http.ResponseWriter) {
	token, err := h.JWTBuilder.Build(&claims)
	if err != nil {
		sendHTTPError(http.StatusInternalServerError, "Unable to create JWT token", response)
	} else {
		sendLoginOK(token.String(), response)
	}
}
