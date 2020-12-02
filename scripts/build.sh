#!/bin/bash
cd "$(dirname "$0")"
BASE_DIR=$(pwd)

# Change to Minikube's docker environment
eval $(minikube docker-env)

# Enable experimental docker build mode for faster builds
export DOCKER_BUILDKIT=1

# Create build cache directory
mkdir -p /tmp/optox_gocache

function build() {
  cd "../src/$1"
  docker image build -f "Dockerfile$DOCKER_EXTENSION" . \
    -t "$1:latest" \
    -t "$1:${COMMIT}"\
    $ADDITIONAL_ARGS
  cd $BASE_DIR
}

export DOCKER_EXTENSION="$2"
export ADDITIONAL_ARGS="$3"
export COMMIT=$(git rev-parse --verify HEAD)
if [ "$1" = 'database' ]
then
  build "database"
elif [ "$1" = 'frontend' ]
then
  build "frontend"
elif [ "$1" = 'gateway' ]
then
  build "gateway"
elif [ "$1" = 'mainbackend' ]
then
  build "mainbackend"
elif [ "$1" = 'mediator' ]
then
  build "mediator"
elif [ "$1" = 'syncbackend' ]
then
  build "syncbackend"
else
  build "database"
  build "frontend"
  build "gateway"
  build "mainbackend"
  build "mediator"
  build "syncbackend"
fi