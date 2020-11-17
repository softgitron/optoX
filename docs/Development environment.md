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

## Startting and accessing application for the first time

1. Run `./scripts/install.sh`
2. Note cluster ip using `kubectl get ingress -n central`
3. Add cluster ip to hosts using `/etc/hosts << echo '<CLUSTER IP HERE> optox.net optox.fi optox.se optox.no'`
4. Test that application has started successfully by going to _optox.net_ using web browser

## Reinstalling application

Run `./scripts/install.sh reinstall` command to build and reinstall the application. Alternatively run Visual Studio code task using `Ctrl P` and write `task` with the space at the end and select _Build and reinstall_

## Steps that must be repeated after computer restart

- Start minkiube `minikube start`
