package database

import (
	"strconv"
	"time"
)

// Customer table for optox customers
type Customer struct {
	CustomerID           int    `gorm:"primaryKey"`
	CustomerCountry      string `gorm:"primaryKey"`
	SocialSecurityNumber string `json:"-"`
	Email                string
	FirstName            string
	LastName             string
}

// Inspection table for optox inspections
type Inspection struct {
	InspectionID          int
	CustomerID            int
	CustomerCountry       string
	OpticianID            int
	OpticianCountry       string
	OpthalmologistID      int
	OpthalmologistCountry string
	FundusPhotoRef        int
	OctScanRef            int
	VisualFieldRef        int
	InspectionTime        time.Time
	LoginToken            string
}

// Administrator table for optox employees
type Administrator struct {
	AdminID     int `gorm:"primaryKey"`
	AccessLevel string
	Email       string
	Password    string `json:"-"`
}

// OpthalmologistEmployee table for optox opthalmologists
type OpthalmologistEmployee struct {
	EmployeeID                    int `gorm:"primaryKey"`
	OpthalmologistID              int
	OpthalmologistCountry         string `gorm:"primaryKey"`
	OpthalmologistEmployeeCountry string
	SocialSecurityNumber          string `json:"-"`
	Email                         string
	Password                      string `json:"-"`
	FirstName                     string
	LastName                      string
	AccessLevel                   string
}

// OpticianEmployee table for optox optician
type OpticianEmployee struct {
	EmployeeID              int `gorm:"primaryKey"`
	OpticianID              int
	OpticianCountry         string `gorm:"primaryKey"`
	OpticianEmployeeCountry string
	SocialSecurityNumber    string `json:"-"`
	Email                   string
	Password                string `json:"-"`
	FirstName               string
	LastName                string
	AccessLevel             string
}

// GetCustomerByID receives customer information
func (db *Database) GetCustomerByID(id int) (*Customer, error) {
	customer := Customer{}
	results := db.connection.Where("customer_id = ?", strconv.Itoa(id)).First(&customer)
	return &customer, results.Error
}

// GetInspectionByToken receives inspection information
func (db *Database) GetInspectionByToken(email string) (*Inspection, error) {
	inspection := Inspection{}
	results := db.connection.Where("login_token = ?", email).First(&inspection)
	return &inspection, results.Error
}

// GetAdministratorByEmail receives administrator information
func (db *Database) GetAdministratorByEmail(email string) (*Administrator, error) {
	admin := Administrator{}
	results := db.connection.Where("email = ?", email).First(&admin)
	return &admin, results.Error
}

// GetOpthalmologistEmployeeByEmail receives opthalmologist employee details
func (db *Database) GetOpthalmologistEmployeeByEmail(email string) (*OpthalmologistEmployee, error) {
	opthalmologist := OpthalmologistEmployee{}
	results := db.connection.Where("email = ?", email).First(&opthalmologist)
	return &opthalmologist, results.Error
}

// GetOpticianEmployeeByEmail receives optician employee details
func (db *Database) GetOpticianEmployeeByEmail(email string) (*OpticianEmployee, error) {
	optician := OpticianEmployee{}
	results := db.connection.Where("email = ?", email).First(&optician)
	return &optician, results.Error
}
