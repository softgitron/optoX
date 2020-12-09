package connection

const (
	BodyTypeInspectionDecision = iota
	BodyTypeLoginDetails       = iota
	BodyTypeCustomerRequest    = iota
)

// InspectionDecision provided by gateway
type InspectionDecision struct {
	InspectionID int
	Approval     int
}

type LoginDetails struct {
	Email    string
	Password string
	Token    string
}

type CustomerRequest struct {
	OpticianID      int
	OpthamologistID int
}
