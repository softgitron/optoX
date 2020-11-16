#!/bin/bash
cd "$(dirname "$0")"
BASE_DIR=$(pwd)

cd ../
# Uninstall all sites
helm uninstall optox --namespace=central
helm uninstall optox --namespace=finland
helm uninstall optox --namespace=sweden
helm uninstall optox --namespace=norway