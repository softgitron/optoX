package handlers

import (
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type customerLogin struct {
	Token string
}

type employeeLogin struct {
	Email    string
	Password string
}

// Response that will be generated for the login request
type Response struct {
	Authentication string
	Type           string
	Person         interface{}
}

const generallErrorMessage = "Credentials didn't work"

/**
 * @api {post} /authentication/customer Customer authenticates with token
 * @apiVersion 1.0.0
 * @apiName authenticateCustomer
 * @apiGroup User
 *
 * @apiParam {String} Token
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "Authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQ3VzdG9tZXIiLCJJRCI6MCwiRW1haWwiOiJ1c2VyQG1haWwuY29tIiwiQ291bnRyeSI6IkZpbmxhbmQiLCJGaXJzdE5hbWUiOiJGaXJzdCIsIkxhc3ROYW1lIjoiTGFzdCIsIkFjY2Vzc0xldmVsIjoibm9ybWFsIn0.QW2gPnygQngIQ29M1zRI6iyNAQAomgIhFfYfodwHkwU",
 *     "Type": "Customer",
 *     "Person": {
 *         "CustomerID": 0,
 *         "CustomerCountry": "Finland",
 *         "Email": "user@mail.com",
 *         "FirstName": "First",
 *         "LastName": "Last"
 *     }
 * }
 *
 * @apiError TokenIncorrect Token was incorrect
 * @apiError UnknownError Unknown error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Bad request
 *     {
 *       error: "Token is incorrect"
 *     }
 */

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
		h.sendLoginOK(&claims, customer, response)
		return
	}
	// If no matches, return error
	sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
}

/**
 * @api {post} /authentication/employee Authenticates with email address and password
 * @apiVersion 1.0.0
 * @apiName authenticateUser
 * @apiGroup User
 *
 * @apiParam {String{5..100}} Email User email address
 * @apiParam {String{4..72}} Password User personal password.
 *
 *
 * @apiHeaderExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "Authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.ygChtosY43j4rJWXQXSR08a2VL8giwIBgMH7ZFQPikY",
 *     "Type": "Optician",
 *     "Person": {
 *         "EmployeeID": 0,
 *         "OpticianID": 0,
 *         "OpticianCountry": "Finland",
 *         "OpticianEmployeeCountry": "Finland",
 *         "Email": "optician@mail.com",
 *         "FirstName": "First",
 *         "LastName": "Last",
 *         "AccessLevel": "Normal"
 *     }
 * }
 *
 *
 * @apiError EmailIncorrect Unknown email address
 * @apiError PasswordIncorrect Password was incorrect
 * @apiError UnknownError Unknown error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       error: "Password is incorrect"
 *     }
 */

// UpdatePassword ...
func (h *Handler) UpdatePassword(id int, group string, password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	pass := ""

	if err == nil {
		switch group {
		case "admin":
			pass, err = h.Db.UpdateAdminPassword(id, string(hash))
		case "opthalmologist":
			pass, err = h.Db.UpdateOpthalmologistPassword(id, string(hash))
		case "optician":
			pass, err = h.Db.UpdateOpticianPassword(id, string(hash))
		}
	}

	return pass, err
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
		//if the password matches the old in plain text
		if admin.Password == newLoginAttempt.Password {
			pass, err := h.UpdatePassword(admin.AdminID, "admin", admin.Password)

			if err != nil || pass == "" {
				return
			}

			admin.Password = pass
		}

		if bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(newLoginAttempt.Password)) == nil {
			claims := Claims{
				Type:        "Administrator",
				ID:          admin.AdminID,
				Email:       admin.Email,
				Country:     "",
				FirstName:   "",
				LastName:    "",
				AccessLevel: "administrator",
			}
			h.sendLoginOK(&claims, admin, response)
		} else {
			sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
		}
		return
	}

	// Check login against opthalmologist database
	opthalmologistEmployee, err := h.Db.GetOpthalmologistEmployeeByEmail(newLoginAttempt.Email)
	if err == nil {

		if opthalmologistEmployee.Password == newLoginAttempt.Password {
			pass, err := h.UpdatePassword(opthalmologistEmployee.EmployeeID, "ophtalmologist", opthalmologistEmployee.Password)

			if err != nil || pass == "" {
				return
			}

			opthalmologistEmployee.Password = pass
		}

		if bcrypt.CompareHashAndPassword([]byte(opthalmologistEmployee.Password), []byte(newLoginAttempt.Password)) == nil {
			claims := Claims{
				Type:        "Opthalmologist",
				ID:          opthalmologistEmployee.EmployeeID,
				EmployerID:  opthalmologistEmployee.OpthalmologistID,
				Email:       opthalmologistEmployee.Email,
				Country:     opthalmologistEmployee.OpthalmologistEmployeeCountry,
				FirstName:   opthalmologistEmployee.FirstName,
				LastName:    opthalmologistEmployee.LastName,
				AccessLevel: opthalmologistEmployee.AccessLevel,
			}
			h.sendLoginOK(&claims, opthalmologistEmployee, response)
		} else {
			sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
		}
		return
	}

	// Check login against optician database
	opticianEmployee, err := h.Db.GetOpticianEmployeeByEmail(newLoginAttempt.Email)
	if err == nil {
		if opticianEmployee.Password == newLoginAttempt.Password {
			pass, err := h.UpdatePassword(opticianEmployee.EmployeeID, "ophtalmologist", opticianEmployee.Password)

			if err != nil || pass == "" {
				return
			}

			opticianEmployee.Password = pass
		}

		if bcrypt.CompareHashAndPassword([]byte(opticianEmployee.Password), []byte(newLoginAttempt.Password)) == nil {
			claims := Claims{
				Type:        "Optician",
				ID:          opticianEmployee.EmployeeID,
				EmployerID:  opticianEmployee.OpticianID,
				Email:       opticianEmployee.Email,
				Country:     opticianEmployee.OpticianEmployeeCountry,
				FirstName:   opticianEmployee.FirstName,
				LastName:    opticianEmployee.LastName,
				AccessLevel: opticianEmployee.AccessLevel,
			}
			h.sendLoginOK(&claims, opticianEmployee, response)
		} else {
			sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
		}
		return
	}

	// If no matches, return error
	sendHTTPError(http.StatusUnauthorized, generallErrorMessage, response)
}

func (h *Handler) sendLoginOK(claims *Claims, person interface{}, res http.ResponseWriter) {
	response, err := h.constructResponse(claims, person)
	if err == nil {
		setLoginCookie("Authentication", response.Authentication, 60*60*24, res)
		res.Header().Set("Authentication", response.Authentication)
		sendOKReponse(response, res)
	} else {
		sendHTTPError(http.StatusInternalServerError, "Unable to create JWT token", res)
	}
}

func (h *Handler) constructResponse(claims *Claims, person interface{}) (*Response, error) {
	token, err := h.JWTBuilder.Build(&claims)
	if err != nil {
		return nil, err
	}

	response := Response{
		Authentication: token.String(),
		Type:           claims.Type,
		Person:         person,
	}
	return &response, nil
}

func setLoginCookie(name string, value string, maxAge int, response http.ResponseWriter) {
	cookie := http.Cookie{
		Name:   name,
		Value:  value,
		MaxAge: maxAge,
	}
	http.SetCookie(response, &cookie)
}
