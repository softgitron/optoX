package db

import (
	"fmt"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Database stuff
type Database struct {
	connection *gorm.DB
}

func (db *Database) CreateConnection() {
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")

	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=mediator port=5432 sslmode=disable TimeZone=Europe/Helsinki", user, password, dbname)
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	pool, err := connection.DB()
	if err != nil {
		panic("failed to create connection pool")
	}
	pool.SetMaxIdleConns(5)
	pool.SetMaxOpenConns(100)
	pool.SetConnMaxLifetime(time.Minute)
	db.connection = connection
}
