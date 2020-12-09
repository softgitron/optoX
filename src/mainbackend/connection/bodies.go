package connection

const (
	BodyTypeInspectionDecision = iota
	BodyTypeLoginDetails       = iota
	BodyTypeCustomer           = iota
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
