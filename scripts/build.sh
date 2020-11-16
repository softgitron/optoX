#!/bin/bash
cd "$(dirname "$0")"
BASE_DIR=$(pwd)
echo $BASE_DIR

# Change to Minikube's docker environment
eval $(minikube docker-env)

function build_frontend() {
  cd "../src/frontend"
  docker image build -f "Dockerfile$DOCKER_EXTENSION" . \
    -t "frontend:latest" \
    -t "frontend:${COMMIT}"
  cd $BASE_DIR
}

function build_gateway() {
  cd "../src/gateway"
  docker image build -f "Dockerfile$DOCKER_EXTENSION" . \
    -t "gateway:latest" \
    -t "gateway:${COMMIT}"
  cd $BASE_DIR
}

function build_mainbackend() {
  cd "../src/mainbackend"
  docker image build -f "Dockerfile$DOCKER_EXTENSION" . \
    -t "mainbackend:latest" \
    -t "mainbackend:${COMMIT}"
  cd $BASE_DIR
}

function build_mediator() {
  cd "../src/mediator"
  docker image build -f "Dockerfile$DOCKER_EXTENSION" . \
    -t "mediator:latest" \
    -t "mediator:${COMMIT}"
  cd $BASE_DIR
}

function build_syncbackend() {
  cd "../src/syncbackend"
  docker image build -f "Dockerfile$DOCKER_EXTENSION" . \
    -t "syncbackend:latest" \
    -t "syncbackend:${COMMIT}"
  cd $BASE_DIR
}

export DOCKER_EXTENSION="$2"
export COMMIT=$(git rev-parse --verify HEAD)
if [ "$1" = 'frontend' ]
then
  build_frontend
elif [ "$1" = 'gateway' ]
then
  build_gateway
elif [ "$1" = 'mainbackend' ]
then
  build_mainbackend
elif [ "$1" = 'mediator' ]
then
  build_mediator
elif [ "$1" = 'syncbackend' ]
then
  build_syncbackend
else
  build_frontend
  build_gateway
  build_mainbackend
  build_mediator
  build_syncbackend
fi