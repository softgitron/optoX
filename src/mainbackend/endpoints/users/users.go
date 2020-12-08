package users

import (
	"log"
	"net/http"

	"github.com/softgitron/optox/src/mainbackend/connection"
	"golang.org/x/crypto/bcrypt"
)

// Login ...
type Login struct {
	Email    string
	Password string
	Token    string
}

func hash(content string) {

}

func salt(content string) {

}

func login(email string, pass string) {
	//check from database if email exists
	//check if password hash matches
	//user, err = h.DBHandler.GetUserByEmail(email)

	/*
		if user == nil {
			return
		}

		var match = bcrypt.CompareHashAndPassword(user.pass, pwd) == nil
	*/
}

func register(email string, pwd string) {
	//check if database already contains email
	//if db.GetUserByEmail(email) != nil

	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}

	//save the email and user to database
	//db.AddLoginDetails(email, hash)
}

func Handler(res http.ResponseWriter, req *http.Request, h *connection.Handler) {
	//only POST
	//parse request body
	//depending if we have token or email
	//utilise different method
}
