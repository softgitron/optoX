package handlers

import (
	"fmt"
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

// CustomerLoginHandler handles customer based logins
func (h *Handler) CustomerLoginHandler(response http.ResponseWriter, request *http.Request) {
	if checkAllowedMethods([]string{http.MethodPost}, response, request) != nil {
		return
	}

	newLoginAttempt := customerLogin{}
	if parseRequest(&newLoginAttempt, response, request) != nil {
		return
	}

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

// EmployeeLoginHandler handles employee based logins
func (h *Handler) EmployeeLoginHandler(response http.ResponseWriter, request *http.Request) {
	if checkAllowedMethods([]string{http.MethodPost}, response, request) != nil {
		return
	}

	newLoginAttempt := employeeLogin{}
	if parseRequest(&newLoginAttempt, response, request) != nil {
		return
	}

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
