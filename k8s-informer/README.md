# The Typescript Kubernetes Informer

Inspired by examples in https://github.com/kubernetes-client/javascript

## Build n run

* build for dev :

```bash
npm install
npm run build
```

* To run the informer :

```bash
export KUBECONFIG=~/.qube/config
export KUBECONFIG=~/.kube/config
npm run start
# Then the informertries to connect to the Kubernetes API
```

At start up, the Kubernetes Infromer tries to connect to the Kubernetes API, and for that, it loads the KUBECONFIG :
* located at default path `~/.kube/config`,
* if the `KUBECONFIG` env. variable is defined, it is picked up


## Run in Kubernetes

TODO

Must
