package main

import (
	"fmt"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type database struct {
	connection *gorm.DB
}

// Err gorm template for causing errors on the database
type Err struct {
	ErrID int `gorm:"primaryKey"`
}

func (db *database) createConnection() {
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

func (db *database) gormCreateUser() *gorm.DB {
	newEmployee := Employee{
		Country:              "finland",
		SocialSecurityNumber: "125487-5687",
		Email:                "examle.mail",
		Password:             "Password",
		FirstName:            "Some name",
		LastName:             "Some last name",
		AccessLevel:          "administrator",
	}

	return db.connection.Create(&newEmployee)
}

func (db *database) gormCreateError() *gorm.DB {
	newError := Err{}

	return db.connection.Create(&newError)
}
