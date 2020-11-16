# Kubernetes cheat sheet

## Helm cheats

#### Install application

`helm install optox ./`

#### Uninstall application

`helm uninstall optox`

#### Check chart correctness

`helm install optox ./ --dry-run`

## Kubectl cheats

#### Get default namespace pods (container)

`kubectl get pods`

#### Get terminal access to pod (container)

`kubectl exec --stdin --tty <POD_NAME> -- /bin/bash`

#### Get all ingress controllers

`kubectl get ingress --all-namespaces`

#### Get more pod information

`kubectl get pod -o wide`
