package connection

import "time"

const (
	BodyTypeInspectionDecision = iota
	BodyTypeLoginDetails       = iota
	BodyTypeCustomer           = iota
	BodyTypeInspection         = iota
)

type Success struct {
	Result string `json:"results"`
}

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

type CustomerDetails struct {
	CustomerCountry      string
	SocialSecurityNumber string
	Email                string
	FirstName            string
	LastName             string
}

type InspectionDetails struct {
	CustomerID        int
	InspectionCountry string
	FundusPhotoRef    int
	OctScanRef        int
	VisualFieldRef    int
	TimeStamp         time.Time
	LoginToken        string
}
