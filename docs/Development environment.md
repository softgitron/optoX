# Installation of the development environment

Necessary steps for setting up development environment

## Installing necessary packages

1. Install screen, docker, minikube, kubectl and helm using distributions recommended methods (Arch Linux: pacman `pacman screen docker minikube kubectl helm`)
2. Start and enable docker `systemctl enable --now docker`
3. Create docker group and add your user to it `groupadd docker && usermod -aG docker <YOUR USERNAME HERE>`
4. Log out and log in for changes to take effect
5. Start minkiube `minikube start`
6. Test kubernetes installation by running `kubectl version` (Should show both client and server version)
7. Enable ingress controller `minikube addons enable ingress`

## Installing VScode plugins

- Go
- Kubernetes

## Startting and accessing application

1. Run `./scripts/intall.sh`
2. Note cluster ip using `kubectl get ingress -n central`
3. Add cluster ip to hosts using `/etc/hosts << echo '<CLUSTER IP HERE> optox.net'`

## Steps that must be repeated after computer restart

- Start minkiube `minikube start`
