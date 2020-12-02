package handlers

import "github.com/softgitron/optox/src/gateway/database"

// Handler receiver struct for handler functions
type Handler struct {
	Db database.Database
}
