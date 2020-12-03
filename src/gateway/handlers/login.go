package handlers

import (
	"fmt"
	"net/http"
)

type login struct {
	Email    string
	Password string
}

// LoginHandler handles login requests for the platform
func (h *Handler) LoginHandler(response http.ResponseWriter, request *http.Request) {
	if checkAllowedMethods([]string{http.MethodPost}, response, request) != nil {
		return
	}

	newLoginAttempt := login{}
	if parseRequest(&newLoginAttempt, response, request) != nil {
		return
	}

	// Check login against administrator database
	admin, err := h.Db.GetAdministratorByEmail(newLoginAttempt.Email)
	if admin != nil && err == nil {
		if admin.Password == newLoginAttempt.Password {
			claims := Claims{
				Type:  "Administrator",
				ID:    admin.EmployeeID,
				Email: admin.Username,
			}
			token, err := h.JWTBuilder.Build(&claims)
			if err != nil {
				sendHTTPError(http.StatusInternalServerError, "Unable to create JWT token", response)
			} else {
				sendLoginOK(token.String(), response)
			}
		} else {
			sendHTTPError(http.StatusUnauthorized, "Password did not match", response)
		}
		return
	}
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
