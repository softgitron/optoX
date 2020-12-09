package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const maximumTries = 10
const reconnectTime = 10 * time.Second

// Database stuff
type Database struct {
	connection *gorm.DB
}

// CreateConnection initializes the connection to the database
func (db *Database) CreateConnection() {
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")
	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=mediator port=5432 sslmode=disable TimeZone=Europe/Helsinki", user, password, dbname)

	var connection *gorm.DB
	var pool *sql.DB
	var err error
	for try := 1; try <= maximumTries; try++ {
		err = nil
		connection, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			println("Failed to connect to database:")
		}
		pool, err = connection.DB()
		if err != nil {
			println("Failed to create a database pool:")
		}

		if err == nil {
			break
		} else {
			println(err)
			fmt.Printf("Trying again, try: %d/%d", try, maximumTries)
			time.Sleep(reconnectTime)
		}
	}
	pool.SetMaxIdleConns(5)
	pool.SetMaxOpenConns(100)
	pool.SetConnMaxLifetime(time.Minute)
	db.connection = connection
}
