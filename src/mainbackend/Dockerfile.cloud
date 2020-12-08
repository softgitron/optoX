FROM golang:latest
WORKDIR /app

Copy go.mod .
Run go mod download
COPY . .
RUN go build

CMD ["./mainbackend"]