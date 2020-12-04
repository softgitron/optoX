# syntax = docker/dockerfile:experimental
FROM golang:latest
WORKDIR /app

Copy go.mod .
Run go mod download
COPY . .
RUN --mount=type=cache,target=/root/.cache/go-build go build

CMD ["./gateway"]