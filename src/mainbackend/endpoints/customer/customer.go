package customer

import (
	"encoding/json"
	"net/http"
	"net/url"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"github.com/softgitron/optox/src/mainbackend/db"
)

type Results struct {
	Customers *[]db.Customer
}

func GetCustomers(query url.Values, h *connection.Handler) (*[]db.Customer, error) {
	return h.DBHandler.GetCustomers()
}

func GetCustomerByID(query url.Values, h *connection.Handler) (*[]db.Customer, error) {
	return h.DBHandler.GetCustomers()
}

func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	if req.Method == "GET" {
		var query = req.URL.Query()
		var results *[]db.Customer
		var err error

		//TODO:
		//if multiple

		if query.Get("customer") != "" {
			results, err = GetCustomerByID(query, h)
		} else {
			results, err = GetCustomers(query, h)
		}

		if err != nil {
			//TODO: Add proper HTTP error, or return the error in json
			return
		}

		json.NewEncoder(res).Encode(Results{
			Customers: results,
		})
	}

	if req.Method == "POST" {
		var customer db.Customer
		var _, err = json.Marshal(&customer)

		if err != nil {
			return
		}

		h.DBHandler.AddCustomer(&customer)
	}
}
