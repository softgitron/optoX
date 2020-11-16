#!/bin/bash
cd "$(dirname "$0")"
BASE_DIR=$(pwd)

if [ "$1" = 'reinstall' ]
then
  ./uninstall.sh
  # Small sleep to make sure that
  # persistent volumes are destroyed in time
  sleep 10
fi

# Build application
./build.sh

cd ../
# Start all sites
helm install optox ./ --create-namespace --namespace=central -f central-values.yaml
helm install optox ./ --create-namespace --namespace=finland -f finland-values.yaml
helm install optox ./ --create-namespace --namespace=sweden -f sweden-values.yaml
helm install optox ./ --create-namespace --namespace=norway -f norway-values.yaml