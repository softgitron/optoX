#!/bin/bash
cd "$(dirname "$0")"
BASE_DIR=$(pwd)
echo $BASE_DIR

cd ../
# Start all sites
helm install optox ./ --create-namespace --namespace=central
helm install optox ./ --create-namespace --namespace=finland
helm install optox ./ --create-namespace --namespace=sweden
helm install optox ./ --create-namespace --namespace=norway