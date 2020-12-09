package employee

import (
	"encoding/json"
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"github.com/softgitron/optox/src/mainbackend/db"
)

type Results struct {
	Customers *[]db.Customer
}

func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	if req.Method == "GET" {
		//var query = req.URL.Query()
		//var results *[]db.Employee
		var err error

		//TODO:
		//if multiple

		/*
			if query.Get("customer") != "" {
				results, err = GetCustomerByID(query, h)
			} else {
				results, err = GetCustomers(query, h)
			}
		*/
		if err != nil {
			//TODO: Add proper HTTP error, or return the error in json
			return
		}

		connection.SendOKReponse(Results{
			Customers: nil,
		}, res)
	}

	if req.Method == "POST" {
		var contract db.Contract
		var _, err = json.Marshal(&contract)

		if err != nil {
			return
		}

		//db.AddContract(&contract)
	}
}
