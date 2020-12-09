package handlers

import (
	"os"

	"github.com/cristalhq/jwt/v3"
	"github.com/softgitron/optox/src/gateway/database"
)

// Handler receiver struct for handler functions
type Handler struct {
	Db          database.Database
	JWTSigner   *jwt.Signer
	JWTVerifier *jwt.Verifier
	JWTBuilder  *jwt.Builder
}

// Claims used inside JWT tokens
type Claims struct {
	Type        string
	ID          int
	EmployerID  int
	Email       string
	Country     string
	FirstName   string
	LastName    string
	AccessLevel string
}

// Init initializes JWT generation
func (h *Handler) Init() {
	JWTSecret := []byte(os.Getenv("JWT_SECRET"))
	JWTSigner, err := jwt.NewSignerHS(jwt.HS256, JWTSecret)
	if err != nil {
		panic("JWT Signer initialization failed!")
	}
	h.JWTSigner = &JWTSigner

	JWTVerifier, err := jwt.NewVerifierHS(jwt.HS256, JWTSecret)
	if err != nil {
		panic("JWT Verifier initialization failed!")
	}
	h.JWTVerifier = &JWTVerifier

	h.JWTBuilder = jwt.NewBuilder(JWTSigner)
}
