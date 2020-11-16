#!/bin/bash
cd "$(dirname "$0")"
BASE_DIR=$(pwd)
echo $BASE_DIR

cd ../
# Start all sites
helm uninstall optox --namespace=central
helm uninstall optox --namespace=finland
helm uninstall optox --namespace=sweden
helm uninstall optox --namespace=norway