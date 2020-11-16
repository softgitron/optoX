#!/bin/bash

cd "$(dirname "$0")"
BASE_DIR=$(pwd)
echo $BASE_DIR

function pods() {
    kubectl -n $NAMESPACE get pods --no-headers --field-selector=status.phase==Running -o custom-columns=":metadata.name" | grep -o "$1[^[:space:]]*"
}

function debug_go() {
    ./build.sh $1 .debug
    kubectl -n $NAMESPACE rollout restart deployment/$1
    sleep $ROLLOUT_LAG
    nohup kubectl -n $NAMESPACE port-forward $(pods "$1") $2:$2 >/dev/null 2>&1 &
    sleep 1
    exit 0
}

export NAMESPACE=$2
export ROLLOUT_LAG=$3

if [ "$1" = 'frontend' ]
then
  echo "Not yet supported"
elif [ "$1" = 'gateway' ]
then
  debug_go 'gateway' '40000'
elif [ "$1" = 'mainbackend' ]
then
  debug_go 'mainbackend' '40001'
elif [ "$1" = 'mediator' ]
then
  debug_go 'mediator' '40002'
elif [ "$1" = 'syncbackend' ]
then
  debug_go 'syncbackend' '40003'
fi