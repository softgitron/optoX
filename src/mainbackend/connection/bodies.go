package connection

const (
	BodyTypeInspectionDecision = iota
)

// InspectionDecision provided by gateway
type InspectionDecision struct {
	InspectionID int
	Approval     int
}
