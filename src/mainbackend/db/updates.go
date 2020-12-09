package db

// UpdateInspectionApproval updates inspection approval by ophthalmologist
func (db *Database) UpdateInspectionApproval(inspectionID int, status string) error {
	results := db.connection.Model(&Inspection{}).Where("inspection_id = ?", inspectionID).
		Update("status", status)
	return results.Error
}
