package customer

import (
	"encoding/json"
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/db"
	"github.com/softgitron/optox/src/mainbackend/templates"
)

func Handler(db *(db.Database), res http.ResponseWriter, req *http.Request) {
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
			var result templates.Customer
			db.GetConnection().Table("Contracts").Get(params.Get("id"))

			output, err := json.Marshal(result)

			if err != nil {
				http.Error(res, err.Error(), http.StatusNoContent)
				return
			}

			res.Write(output)
		}

		/*
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
		*/
	}

	if req.Method == "POST" {
		var contract templates.Customer
		err := json.NewDecoder(req.Body).Decode(&contract)

		if err != nil {
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}
	}
}
