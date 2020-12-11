package db

import "errors"

// GetCustomersByOpticianEmployeeID receives customer information by specific optician
func (db *Database) GetCustomersByOpticianEmployeeID(opticianEmployeeID int) (*[]Customer, error) {
	customers := []Customer{}
	results := db.connection.Model(&Customer{}).
		Select("customers.customer_id, customers.customer_country, customers.social_security_number, customers.email, customers.first_name, customers.last_name").
		Joins("left join inspections on customers.customer_id = inspections.customer_id").
		Joins("left join optician_employees on inspections.optician_id = optician_employees.optician_id").
		Where("optician_employees.employee_id = ?", opticianEmployeeID).
		Find(&customers)
	return &customers, results.Error
}

// GetContracts ...
func (db *Database) GetContracts() (*[]Contract, error) {
	contracts := []Contract{}
	results := db.connection.Model(&Contract{}).
		Find(&contracts)

	return &contracts, results.Error
}

// GetContractsByID ...
func (db *Database) GetContractsByID(id int) (*[]Contract, error) {
	contracts := []Contract{}
	results := db.connection.Model(&Contract{}).
		Where("contract_id = ?", id).
		Find(&contracts)

	return &contracts, results.Error
}

// GetCustomers ...
func (db *Database) GetCustomers() (*[]Customer, error) {
	customers := []Customer{}
	results := db.connection.Model(&Customer{}).
		Find(&customers)

	return &customers, results.Error
}

// GetCustomersByID ...
func (db *Database) GetCustomersByID(id int) (*[]Customer, error) {
	customers := []Customer{}
	results := db.connection.Model(&Contract{}).
		Where("contract_id = ?", id).
		Find(&customers)

	return &customers, results.Error
}

// GetCustomerByID ...
func (db *Database) GetCustomerByID(customerID int) (*Customer, error) {
	customer := Customer{}
	results := db.connection.Where("customer_id = ?", customerID).
		Find(&customer)

	return &customer, results.Error
}

// GetCustomerByEmail ...
func (db *Database) GetCustomerByEmail(email string) (*Customer, error) {
	customer := Customer{}
	results := db.connection.Where("email = ?", email).
		Find(&customer)

	return &customer, results.Error
}

func (db *Database) GetCustomerBySSN(ssn string) (*Customer, error) {
	customer := Customer{}
	results := db.connection.Where("social_security_number = ?", ssn).
		Find(&customer)

	return &customer, results.Error
}

// AddCustomer ...
func (db *Database) AddCustomer(customer Customer) error {
	cust, _ := db.GetCustomerBySSN(customer.SocialSecurityNumber)

	if cust != nil {
		return errors.New("Customer already exists")
	}

	res := db.connection.Exec(`
		INSERT INTO customers (customer_country, social_security_number, email, first_name, last_name)
		VALUES (?, ?, ?, ?, ?);
	`, customer.CustomerCountry, customer.SocialSecurityNumber, customer.Email, customer.FirstName, customer.LastName)

	return res.Error
}

func (db *Database) GetOpthalmologistByID(id int) (*Opthalmologist, error) {
	opthalmologist := Opthalmologist{}
	results := db.connection.
		Model(&Opthalmologist{}).
		Where("opthalmologist_id = ?", id).
		Find(&opthalmologist)

	return &opthalmologist, results.Error
}

func (db *Database) GetOpticianByID(id int) (*Optician, error) {
	optician := Optician{}
	results := db.connection.
		Model(&Optician{}).
		Where("optician_id = ?", id).
		Find(&optician)

	return &optician, results.Error
}

func (db *Database) AddInspection(ins Inspection) error {
	cust, _ := db.GetCustomerByID(ins.CustomerID)
	optc, _ := db.GetOpticianByID(ins.OpticianID)
	opth, _ := db.GetOpthalmologistByID(ins.OpthalmologistID)

	if cust == nil {
		return errors.New("Customer doesn't exist")
	}

	if optc == nil {
		return errors.New("Optician doesn't exist")
	}

	if opth == nil {
		return errors.New("Opthamologist doesn't exist")
	}

	res := db.connection.Exec(`
		INSERT INTO inspections (
			customer_id,
			customer_country,
			optician_id,
			optician_country,
			opthalmologist_id,
			opthalmologist_country,
			inspections_country,
			fundus_photo_ref,
			oct_scan_ref,
			visual_field_ref,
			inspection_time,
			login_token,
			status
		)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
	`, cust.CustomerID,
		cust.CustomerCountry,
		optc.OpticianID,
		optc.OpticianCountry,
		opth.OpthalmologistID,
		opth.OpthalmologistCountry,
		ins.InspectionsCountry,
		ins.FundusPhotoRef,
		ins.OctScanRef,
		ins.VisualFieldRef,
		ins.InspectionTime,
		ins.LoginToken,
		ins.Status,
	)

	return res.Error
}

// AddContract ...
func (db *Database) AddContract(contract *Contract) {
	db.connection.Create(contract)
}

// GetOpticianEmployeeByEmail ...
func (db *Database) GetOpticianEmployeeByEmail(email string) (Employee, error) {
	employee := Employee{}
	result := db.connection.Model(&Employee{}).
		Where("email = ?", email).
		First(&employee)

	return employee, result.Error
}

// AddEmployee ...
func (db *Database) AddEmployee(employee *Employee) {
	db.connection.Create(employee)
}

// GetInspectionByToken ...
func (db *Database) GetInspectionByToken(token string) (Inspection, error) {
	inspection := Inspection{}
	result := db.connection.Model(&Inspection{}).
		Where("login_token = ?", token).
		First(&inspection)

	return inspection, result.Error
}

// GetInspectionByID ...
func (db *Database) GetInspectionByID(inspectionID int) (Inspection, error) {
	inspection := Inspection{}
	result := db.connection.
		Where("inspection_id = ?", inspectionID).
		First(&inspection)

	return inspection, result.Error
}

// GetInspectionsByOpthalmologistID ...
func (db *Database) GetInspectionsByOpthalmologistID(opthalmologistID int) ([]Inspection, error) {
	inspections := []Inspection{}
	results := db.connection.
		Where("opthalmologist_id = ?", opthalmologistID).
		Find(&inspections)
	return inspections, results.Error
}

// GetInspectionByCustomerID ...
func (db *Database) GetInspectionByCustomerID(customer int) ([]Inspection, error) {
	inspections := []Inspection{}
	results := db.connection.
		Model(&Inspection{}).
		Where("customer_id = ?", customer).
		Find(&inspections)
	return inspections, results.Error
}

func (db *Database) GetOpthalmologists() ([]Opthalmologist, error) {
	opths := []Opthalmologist{}
	results := db.connection.Model(&Opthalmologist{}).
		Find(&opths)

	return opths, results.Error
}
