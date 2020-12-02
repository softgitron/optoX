# Kubernetes cheat sheet

## Helm cheats

#### Install application

`helm install optox ./`

#### Uninstall application

`helm uninstall optox`

#### Check chart correctness

`helm install optox ./ --dry-run -f central-values.yaml`

## Kubectl cheats

#### Set default namespace for subsequent commands

`kubectl config set-context --current --namespace=<insert-namespace-name-here>`

#### Get default namespace pods (container)

`kubectl get pods`

#### Get terminal access to pod (container)

`kubectl exec --stdin --tty <POD_NAME> -- /bin/bash`

#### Get all ingress controllers

`kubectl get ingress --all-namespaces`

#### Get more pod information

`kubectl get pod -o wide`

##### Portforward to local environment

`kubectl port-forward <POD_NAME> <PORT>:<PORT>`
