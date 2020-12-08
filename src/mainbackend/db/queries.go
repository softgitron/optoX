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

func (db *Database) GetContracts() (*[]Contract, error) {
	contracts := []Contract{}
	results := db.connection.Model(&Contract{}).
		Select("* from Contract").
		Find(&contracts)

	return &contracts, results.Error
}

func (db *Database) GetContractsByID(id int) (*[]Contract, error) {
	contracts := []Contract{}
	results := db.connection.Model(&Contract{}).
		Select("* from Contract").
		Where("ContractID = ?", id).
		Find(&contracts)

	return &contracts, results.Error
}

func (db *Database) GetCustomers() (*[]Customer, error) {
	customers := []Customer{}
	results := db.connection.Model(&Customer{}).
		Select("* from Contract").
		Find(&customers)

	return &customers, results.Error
}

func (db *Database) GetCustomersByID(id int) (*[]Customer, error) {
	customers := []Customer{}
	results := db.connection.Model(&Contract{}).
		Select("* from Contract").
		Where("ContractID = ?", id).
		Find(&customers)

	return &customers, results.Error
}

func (db *Database) AddCustomer(customer *Customer) {
	db.connection.Create(customer)
}
