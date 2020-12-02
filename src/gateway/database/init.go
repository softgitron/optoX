package database

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const maximumTries = 10

// Database receiver struct for database functionalities
type Database struct {
	connection *gorm.DB
}

// InitializeConnection initialize database connection to distributed database
func (db *Database) InitializeConnection() {
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")
	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=mediator port=5432 sslmode=disable TimeZone=Europe/Helsinki", user, password, dbname)

	var connection *gorm.DB
	var pool *sql.DB
	for try := 1; try <= maximumTries; try++ {
		connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			println("Failed to connect to database:")
			println(err)
			fmt.Printf("Trying again, try: %d/%d", try, maximumTries)
			continue
		}
		pool, err = connection.DB()
		if err != nil {
			println("Failed to create a database pool:")
			println(err)
			fmt.Printf("Trying again, try: %d/%d", try, maximumTries)
		}
	}
	pool.SetMaxIdleConns(5)
	pool.SetMaxOpenConns(100)
	pool.SetConnMaxLifetime(time.Minute)
	db.connection = connection
}
