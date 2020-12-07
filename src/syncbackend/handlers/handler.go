package handlers

import "github.com/softgitron/optox/src/syncbackend/syncengine"

// Handler receiver struct for handler functions
type Handler struct {
	Syncengine *syncengine.Syncengine
}
