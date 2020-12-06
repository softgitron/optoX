package templates

import "time"

/*
This file will contain all database templates
*/

// Employee gorm template
type Employee struct {
	EmployeeID           int `gorm:"primaryKey"`
	Country              string
	SocialSecurityNumber string
	Email                string
	Password             string
	FirstName            string
	LastName             string
	AccessLevel          string
}

//Customer gorm template
type Customer struct {
	CustomerID           int `gorm:"primaryKey"`
	CustomerCountry      string
	SocialSecurityNumber string
	Email                string
	FirstName            string
	LastName             string
}

//BankAccount gorm template
type BankAccount struct {
	BankAccountID int `gorm:"primaryKey"`
	Balance       int
}

//Optician gorm template
type Optician struct {
	OpticianID      int `gorm:"primaryKey"`
	BankAccountID   int
	OpticianCountry string
	Name            string
}

type Opthalmologist struct {
	OpthalmologistID      int `gorm:"primaryKey"`
	BankAccountID         int
	OpthalmologistCountry string
	Name                  string
	Price                 int
}

type Inspection struct {
	InspectionID      int `gorm:"primaryKey"`
	CustomerID        int
	OpticianID        int
	OpthalmologistID  int
	InspectionCountry string
	FundusPhotoRef    int
	OctScanRef        int
	VisualFieldRef    int
	InspectionTime    time.Time
	LoginToken        string
	Status            string
}

type Contract struct {
	ContractID       int `gorm:"primaryKey"`
	OpticianID       int
	OpthalmologistID int
	ContractCountry  string
}
