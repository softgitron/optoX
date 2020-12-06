package connection

import "github.com/softgitron/optox/src/mainbackend/db"

// Claims provided by gateway
type Claims struct {
	Type        string
	ID          int
	Email       string
	Country     string
	FirstName   string
	LastName    string
	AccessLevel string
}

// Handler provides decoded version of the request and database access
type Handler struct {
	Claims    Claims
	DBHandler *db.Database
}
