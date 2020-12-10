package db

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

// AddCustomer ...
func (db *Database) AddCustomer(customer Customer) error {
	res := db.connection.Omit("CustomerID").Create(customer)
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
		Select("customers.customer_id, customers.customer_country, customers.social_security_number, customers.email, customers.first_name, customers.last_name").
		Joins("left join inspections on customers.customer_id = inspections.customer_id").
		Where("customers.customer_id = ?", customer).
		Find(&inspections)
	return inspections, results.Error
}
