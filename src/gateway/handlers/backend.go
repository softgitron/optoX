package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httputil"
	"strconv"

	"github.com/cristalhq/jwt/v3"
)

// BackendHandler provides generic reverse proxy for backend calls
func (h *Handler) BackendHandler(proxy *httputil.ReverseProxy) func(http.ResponseWriter, *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		resetHeaderClaims(request)
		// Check does the request contain claims
		authenticationHeader := request.Header.Get("Authentication")
		authenticationCookie, err := request.Cookie("Authentication")
		var token string
		if authenticationHeader != "" {
			// Header contains token
			token = authenticationHeader
		} else if err == nil {
			// Cookie contains token
			token = authenticationCookie.Value
		} else {
			// If authentication token is not found, add empty claims with unauthorized type
			sendUnauthorizedHeaders(proxy, response, request)
			return
		}

		// Decode token and add its data to the header
		tokenString, err := jwt.ParseAndVerifyString(token, *h.JWTVerifier)
		if err != nil {
			sendUnauthorizedHeaders(proxy, response, request)
			return
		}

		claims := Claims{}
		err = json.Unmarshal(tokenString.RawClaims(), &claims)
		if err != nil {
			sendUnauthorizedHeaders(proxy, response, request)
			return
		}

		setHeaderClaims(&claims, request)
		proxy.ServeHTTP(response, request)
	}
}

// Delete claims comming from outside, so security can't be by passed
func resetHeaderClaims(request *http.Request) {
	request.Header.Del("Type")
	request.Header.Del("ID")
	request.Header.Del("EmployerID")
	request.Header.Del("Email")
	request.Header.Del("Country")
	request.Header.Del("FirstName")
	request.Header.Del("LastName")
	request.Header.Del("AccessLevel")
}

func setHeaderClaims(claims *Claims, request *http.Request) {
	request.Header.Set("Type", claims.Type)
	request.Header.Set("ID", strconv.Itoa(claims.ID))
	request.Header.Set("EmployerID", strconv.Itoa(claims.EmployerID))
	request.Header.Set("Email", claims.Email)
	request.Header.Set("Country", claims.Country)
	request.Header.Set("FirstName", claims.FirstName)
	request.Header.Set("LastName", claims.LastName)
	request.Header.Set("AccessLevel", claims.AccessLevel)
}

func sendUnauthorizedHeaders(proxy *httputil.ReverseProxy, response http.ResponseWriter, request *http.Request) {
	claims := Claims{Type: "Unauthorized"}
	setHeaderClaims(&claims, request)
	proxy.ServeHTTP(response, request)
}
