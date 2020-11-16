# Kubernetes networking

## General networking diagram

![optoX networking diagram](https://github.com/softgitron/optoX/tree/main/images/Kubernetes_networking.svg)

## Services availability

All the pods in the single namespace can connect with another pods directly using service names. For example _gateway_ pod can reach _frontend_ pod using DNS `frontend:80`. _database_ and _syncbackend_ pods are also available outside namespace using names like `syncbackend-finland:8080`. All available service names can be seen using command: `kubectl -n <YOUR NAMESPACE (central)> get services`.
