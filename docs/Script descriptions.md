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

`install.sh` Builds and installs application using helm. Script has two optional arguments `reinstall` and `partial`. `reinstall` removes application before building and then install new version. `partial` Installs only central and Finland sites.

Examples:  
Build & install the application: `./scripts/install.sh`
Build & partially install the application: `./scripts/install.sh partial`
Remove & build & install the application: `./scripts/install.sh reinstall`
Remove & build & partially install the application: `./scripts/install.sh reinstall partial`

## uninstall.sh

`uninstall.sh` Uninstalls the application. Script does not accept any arguments.

Examples:  
Uninstall application: `./scripts/uninstall.sh`

## debug.sh

`debug.sh` is used for building debuging versions of the containers and initiating debuging bridges from Visual Studio Code to containers. Script has three mandotary arguments (four for react debuging).

1. Container that should be debuged
2. Namespace that should be used for debuging
3. Time that should be waited after container restart (used for making sure that container is ready before bridge is created)
4. Source code directory of the current frontend

Examples:  
Build & start gateway container in central using debug mode: `./scripts/debug.sh gateway central 20`
Build & start frontend container in central with source folder: `./scripts/debug.sh frontend central 20 ../src/frontend/`
