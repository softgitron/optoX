package contract

import (
	"encoding/json"
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/db"
	"github.com/softgitron/optox/src/mainbackend/templates"
)

//What data should we need?

/*
	Accepted parameters from GET
		- state (GET) 	| Get the state of the endpoint
		- id (GET) 		| Get the contract with given ID


	For POST the body should have the following format
	{
		id,

	}
*/

// State ...
type State struct {
	CurrentState string `json:"state"`
}

//Handler ...
func Handler(db *(db.Database), res http.ResponseWriter, req *http.Request) {
	//depending on whether we get a POST or GET
	//handle things differently

	//if we get POST we need to validate the received data packet
	//so that we are pushing garbage into the database

	//if we get GET try to acquire the data from the database1
	//probably based on the ID, if there's no ID

	if req.Method == "GET" {
		var params = req.URL.Query()

		//parse the query strings

		res.Header().Set("Content-Type", "application/json")

		//either we have malformed request or we are trying to request multiple things
		if len(params) == 0 || (params.Get("id") != "" && params.Get("state") != "") {
			http.Error(res, "Invalid query", http.StatusBadRequest)
			return
		}

		if params.Get("id") != "" {
			var result templates.Contract
			db.GetConnection().Table("Contracts").Get(params.Get("id"))

			output, err := json.Marshal(result)

			if err != nil {
				http.Error(res, err.Error(), http.StatusNoContent)
				return
			}

			res.Write(output)
		}

		if params.Get("state") != "" {
			var state = State{
				CurrentState: "OK",
			}

			output, err := json.Marshal(state)

			if err != nil {
				http.Error(res, err.Error(), http.StatusNoContent)
				return
			}

			res.Write(output)
		}
	}

	if req.Method == "POST" {
		var contract templates.Contract
		err := json.NewDecoder(req.Body).Decode(&contract)

		if err != nil {
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}
	}
}
