package contract

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strconv"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"github.com/softgitron/optox/src/mainbackend/db"
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

type Results struct {
	Contracts *[]db.Contract
}

var validQueries = []string{"contract", "optician", "opthtamologist"}
var handlers = map[string]func(url.Values, *connection.Handler) (*[]db.Contract, error){
	"contract":      GetContractByID,
	"optician":      GetContractsByOpticianID,
	"opthamologist": GetContractsByOpthamologistID,
}

// GetContractByID ...
func GetContractByID(query url.Values, h *connection.Handler) (*[]db.Contract, error) {
	var id, converr = strconv.ParseInt(query.Get("id"), 10, 32)

	if converr != nil {
		return nil, converr
	}

	var results, err = h.DBHandler.GetContractsByID(int(id))
	return results, err
}

func GetContracts(query url.Values, h *connection.Handler) (*[]db.Contract, error) {
	//
	return GetAllContracts(query, h)
}

func GetContractsByOpticianID(query url.Values, h *connection.Handler) (*[]db.Contract, error) {
	return GetAllContracts(query, h)
}

func GetContractsByOpthamologistID(query url.Values, h *connection.Handler) (*[]db.Contract, error) {
	return GetAllContracts(query, h)
}

func GetAllContracts(query url.Values, h *connection.Handler) (*[]db.Contract, error) {
	return h.DBHandler.GetContracts()
}

func AddContract() {

}

//Handler ...
func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	//depending on whether we get a POST or GET
	//handle things differently

	//if we get POST we need to validate the received data packet
	//so that we are pushing garbage into the database

	//if we get GET try to acquire the data from the database1
	//probably based on the ID, if there's no ID

	if req.Method == "GET" {
		var query = req.URL.Query()
		var results *[]db.Contract
		var err error

		//TODO:
		//if multiple query parts are present, show not implemented

		if query.Get("contract") != "" {
			results, err = GetAllContracts(query, h)
		} else {
			results, err = GetContractByID(query, h)
		}

		if err != nil {
			//TODO: Add proper HTTP error, or return the error in json
			return
		}

		json.NewEncoder(res).Encode(Results{
			Contracts: results,
		})
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
