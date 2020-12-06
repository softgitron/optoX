package inspection

import (
	"encoding/json"
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/db"
	"github.com/softgitron/optox/src/mainbackend/templates"
)

func Handler(db *(db.Database), res http.ResponseWriter, req *http.Request) {
	if req.Method == "POST" {
		var contract templates.Inspection
		err := json.NewDecoder(req.Body).Decode(&contract)

		if err != nil {
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}

		db.GetConnection().Create(contract)
	}
}
