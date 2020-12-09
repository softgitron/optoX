#!/bin/bash
cd "$(dirname "$0")"
BASE_DIR=$(pwd)

if [ "$1" = 'reinstall' ] || [ "$2" = 'reinstall' ]
then
  ./uninstall.sh
  # Small sleep to make sure that
  # persistent volumes are destroyed in time
  sleep 15
fi

# Build application
if [ "$1" != 'deploy' ] && [ "$2" != 'deploy' ]
then
  ./build.sh
fi

cd ../

if [ "$1" = 'deploy' ] || [ "$2" = 'deploy' ]
then
  helm install optox ./ --create-namespace --namespace=central -f helm-values/central-values-gcp.yaml
  helm install optox ./ --create-namespace --namespace=finland -f helm-values/finland-values-gcp.yaml
  helm install optox ./ --create-namespace --namespace=sweden -f helm-values/sweden-values-gcp.yaml
  helm install optox ./ --create-namespace --namespace=norway -f helm-values/norway-values-gcp.yaml
elif [ "$1" = 'partial' ] || [ "$2" = 'partial' ]
then
  helm install optox ./ --create-namespace --namespace=central -f helm-values/central-values.yaml
  helm install optox ./ --create-namespace --namespace=finland -f helm-values/finland-values.yaml
else
  # Start all sites
  helm install optox ./ --create-namespace --namespace=central -f helm-values/central-values.yaml
  helm install optox ./ --create-namespace --namespace=finland -f helm-values/finland-values.yaml
  helm install optox ./ --create-namespace --namespace=sweden -f helm-values/sweden-values.yaml
  helm install optox ./ --create-namespace --namespace=norway -f helm-values/norway-values.yaml
fi