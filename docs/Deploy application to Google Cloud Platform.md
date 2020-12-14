# Instructions for deploying Kubernetes cluster

## Initialize cluster

1. Got to [console.cloud.google.com/kubernetes](https://console.cloud.google.com/kubernetes)
2. Create cluster

- Cluster basics
  - Name: optox-cluster
  - Location type: Most appropriate for the deployment
  - Master version: Release channel, Rapid channel, 1.18.12
- Default-pool
  - Name: optox-pool
  - Size: 1
- Nodes
  - Image type: Container-Optimized OS (cos)
  - Series: N1
  - Machine type: g1-small
  - Boot disk type: Standard persistent disk
  - Boot disk size: 10 GB
- Security
  - Enable Shielded GKE Nodes: true

3. Configure kubectl access for GCP

- Follow the [official](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl) instructions
- Install [gcloud](https://cloud.google.com/sdk/docs/install) command
- Configure the project id (Found by clicking project selector on the uppear corner of the page): `gcloud config set project <project-id>`
- Configure compute/zone: `gcloud config set compute/zone europe-north1`
- Configure compute region: `gcloud config set compute/region europe-north1`
- Update gcloud command: `gcloud components update`
- Activate kubectl commands environment: `gcloud container clusters get-credentials optox-cluster`

4. Configure static IP

- Create new static IP `gcloud compute addresses create central-static-ip --global`
- Create new static IP `gcloud compute addresses create finland-static-ip --global`
- Create new static IP `gcloud compute addresses create sweden-static-ip --global`
- Create new static IP `gcloud compute addresses create norway-static-ip --global`

5. Build the application for the cloud

- Change project id `optox-298015` in _cloudbuild.yaml_ to your value
- Build application using `gcloud builds submit --config ./cloudbuild.yaml ./`

6. Deploy application to GCP

- Chnage project id `optox-298015` in _helm-values/\*-values-gcp_ to your value
- Chnage ingress domain `*.sopala.fi` in _helm-values/\*-values-gcp_ to your value
- Deploy application using `./scripts/install.sh deploy`
- Note GCP ingress configuration is extremely slow and it could take multiple minutes, before application can be accessed
- Configure your DNS to point to ingress routers
