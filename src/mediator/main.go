package main

import (
	"math"
	"time"
)

func main() {
	println("Mediator service started!")
	<-time.After(time.Duration(math.MaxInt64))
}
