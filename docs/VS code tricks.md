# VS code tricks

This document documents some tricks that can be done in Visual Studio Code

## Available tasks

Available tasks that can be executed can be bring up using keyboard shortcut `Ctrl P` and writin `tasks` with space in the end. VS code should suggest available tasks. Tasks are used mainly for building and installing the application and should be self descriptive. There is also one special task called `Destroy redirects` that force closes old debuging bridges.

## Available launch options

There are several launch options that can be used mainly for the debuging purposes. Every debuging launch task will do the following:

1. Build container in debuging mode
2. Push new container to the minikube environment
3. Create debug bridge
4. Activate VS code live debug
5. Close debug bridge
6. Rebuild container in normal mode
7. Push normal container back to minkube

Starting of the debug bridge may sometimes fail. If this happens, try again and the problem should go away. This happens because debug bridge is created too early. Problem can be fixed in the future by creating better heuristic for detecting, when the container is again up.

## Available settings

There are couple of setting that should be noted in `.vscode/settings.json`. Important options are:

- `kubernetesNamespace`
- `redeployWait`

`kubernetesNamespace` option is used for selecting namespace that will be debuged. Central is normally good, but this option will propably need adjustments from time to time. `redeployWait` is used for postponing creation of the debuging bridge. This value is machine specific and needs likely adjustment. Increase the value if you encounter problems with the debug bridge functionalities.
