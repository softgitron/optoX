package database

// Administrator table for optox employees
type Administrator struct {
	EmployeeID  int `gorm:"primaryKey"`
	AccessLevel string
	Username    string
	Password    string
}

// GetAdministratorByEmail receives administrator information
func (db *Database) GetAdministratorByEmail(email string) (*Administrator, error) {
	admin := Administrator{}
	results := db.connection.Where("username = ?", email).First(&admin)
	if results.RowsAffected != 0 {
		return &admin, results.Error
	} else {
		return nil, results.Error
	}
}
