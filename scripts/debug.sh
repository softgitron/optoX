#!/bin/bash

cd "$(dirname "$0")"
BASE_DIR=$(pwd)
echo $BASE_DIR

function pods() {
    kubectl -n $NAMESPACE get pods --no-headers --field-selector=status.phase==Running -o custom-columns=":metadata.name" | grep -o "$1[^[:space:]]*"
}

function debug_react_classic() {
    echo "./build.sh $1 .classic --build-arg DOCKER_SRC=$DOCKER_SRC"
    ./build.sh $1 .classic "--build-arg DOCKER_SRC=$DOCKER_SRC"
    kubectl -n $NAMESPACE rollout restart deployment/$1
    sleep 7
    exit 0
}

function debug_react() {
    # Patch deployment for live debug
    kubectl -n $NAMESPACE patch deployment frontend -p \
    "{\"spec\":{\"template\":{\"spec\":{\"volumes\":[{\"name\":\"debug-src\",\"hostPath\":{\"path\":\"$DOCKER_SRC/src\",\"type\":\"DirectoryOrCreate\"}}]}}}}"
    kubectl -n $NAMESPACE patch deployment frontend --type=json -p="[{\"op\":\"add\",\"path\":\"/spec/template/spec/containers/0/volumeMounts\",\"value\":[{\"name\":\"debug-src\",\"mountPath\":\"$DOCKER_SRC/src\"}]}]"

    # Start minikube mount bridge
    echo "nohup minikube mount $BASE_DIR/..:$BASE_DIR/.. >/dev/null 2>&1 &"
    nohup minikube mount $BASE_DIR/..:$BASE_DIR/.. >/dev/null 2>&1 &

    ./build.sh $1 .debug "--build-arg DOCKER_SRC=$DOCKER_SRC"

    kubectl -n $NAMESPACE rollout restart deployment/$1
    sleep 7
    exit 0
}

function debug_go() {
    ./build.sh $1 .debug "--build-arg DOCKER_SRC=$DOCKER_SRC"
    kubectl -n $NAMESPACE rollout restart deployment/$1
    sleep $ROLLOUT_LAG
    echo "kubectl -n $NAMESPACE --pod-running-timeout=1m0s port-forward $(pods $1) $2:$2"
    nohup kubectl -n $NAMESPACE --pod-running-timeout=1m0s port-forward $(pods "$1") $2:$2 >/dev/null 2>&1 &
    sleep 1
    exit 0
}

function debug_database() {
    nohup kubectl -n $NAMESPACE --pod-running-timeout=1m0s port-forward $(pods "$1") $2:$2 >/dev/null 2>&1 &
    sleep 1
    exit 0
}

export NAMESPACE=$2
export ROLLOUT_LAG=$3
export DOCKER_SRC=$4

if [ "$1" = 'frontend' ]
then
  debug_react 'frontend'
elif [ "$1" = 'frontend-classic' ]
then
  debug_react_classic 'frontend'
elif [ "$1" = 'gateway' ]
then
  debug_go 'gateway' '40000'
elif [ "$1" = 'mainbackend' ]
then
  debug_go 'mainbackend' '40001'
elif [ "$1" = 'syncbackend' ]
then
  debug_go 'syncbackend' '40003'
elif [ "$1" = 'database' ]
then
  debug_database 'syncbackend' '5432'
fi