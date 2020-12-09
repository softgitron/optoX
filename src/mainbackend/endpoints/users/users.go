package users

import (
	"encoding/json"
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"github.com/softgitron/optox/src/mainbackend/db"
	"golang.org/x/crypto/bcrypt"
)

// connection.LoginDetails ...

func login(h *connection.Handler, login connection.LoginDetails) bool {
	//we got customer login by token
	if login.Token != "" {
		_, err := h.DBHandler.GetInspectionByToken(login.Token)
		return err == nil
	}

	//check from database if email exists
	user, err := h.DBHandler.GetOpticianEmployeeByEmail(login.Email)

	if err != nil {
		return false
	}

	//check if password hash matches
	match := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(login.Password)) == nil

	if !match {
		return false
	}

	//return a token???
	return true
}

// Register ...
func Register(req *http.Request, h *connection.Handler) {
	var employee db.Employee

	failed := json.NewDecoder(req.Body).Decode(&employee)

	if failed != nil {
		return
	}

	//check if database already contains email
	_, err := h.DBHandler.GetOpticianEmployeeByEmail(employee.Email)

	//if we don't get any
	if err != nil {
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(employee.Password), bcrypt.MinCost)

	if err != nil {
		return
	}

	//save the hashed + salted password
	employee.Password = string(hash)

	//
	h.DBHandler.AddEmployee(&employee)
}

// Handler ...
func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	if login(h, h.Body.(connection.LoginDetails)) {
		connection.SendOKReponse(h.Body, res)
	} else {
		connection.SendHTTPError(http.StatusUnauthorized, "Couldn't log in, check email and password", res)
	}
}
