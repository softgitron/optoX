# Script description

This file describes usage of the development scripts

## build.sh

`build.sh` can be used to build the application. Script accept two arguments:

1. Container that should be build
2. Postfix for dockerfile
   Both arguments are optional. Without any arguments every container is build and uploaded to the minikube.

Examples:  
Builds all containers: `./scripts/build.sh`  
Builds gateway with debugging enabled: `./scripts/build.sh gateway .debug`

## install.sh

`install.sh` Builds and installs application using helm. Script has one optional argument `reinstall` that removes application before building and installation.

Examples:  
Build & install the application: `./scripts/install.sh`  
Remove & build & install the application: `./scripts/install.sh reinstall`

## uninstall.sh

`uninstall.sh` Uninstalls the application. Script does not accept any arguments.

Examples:  
Uninstall application: `./scripts/uninstall.sh`

## debug.sh

`debug.sh` is used for building debuging versions of the containers and initiating debuging bridges from Visual Studio Code to containers. Script has three mandotary arguments.

1. Container that should be debuged
2. Namespace that should be used for debuging
3. Time that should be waited after container restart (used for making sure that container is ready before bridge is created)

Examples:  
Build & start gateway container in central using debug mode: `./scripts/debug.sh gateway central 20`
