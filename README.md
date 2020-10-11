# Kaleidoscopic : A simple Web SPA and its backend

[![Web UI Docker Repository on Quay](https://quay.io/repository/pok-us-io/kaleidoscopic/status "Web UI Docker Repository on Quay")](https://quay.io/repository/pok-us-io/kaleidoscopic)

Kaleidoscopic a basic application, designed to work on architectural POCs (Proof of Concepts).

Kaleidoscopic a basic application, with :

* a Web SPA as basic UI, made with Angular 10 / Material Design.
* and a backend, made of 2 REST API Endpoints:
  * The first Endpoint, is consumed by the Web SPA : The SPA queries this REST API Edpoint to find out what is the main color UI should use for its UI Theme. It's a pure READ/Retrieve operation
  * The Second endpoint, is a utility someone can use, to change the above mentioned color. It's a pure WRITE/Update operation

Folder structure of this repo:

* In `./ui/` : The Angular 10 SPA Web UI
* In `./rest-api/` : The source code for the `ExpressJS` Server and REST API Endpoints


## Run Dockerized


A Docker Compose will be completed at the root of this git repo for development purpose. This allows to setup a dev environment without changing anything to the bare-metal machine you're working on.

But the `Kaleidoscopic` experimental App is `Kubernetes`-first designed : It is especially meant to build POCs /conduct  experiments in the `Kubernetes` context.

### The Docker images

* For the UI :
  * the `<REP ROOT FOLDER>/ui/Dockerfile.dev` is the `Dockerfile` used for development : the http server used there is the one spawned by angular cli with the `ng serve` command
  * the `<REP ROOT FOLDER>/ui/Dockerfile` is the `Dockerfile` used to release a production-ready docker image : the http server used there is the nginx http server. That's the docker image built and pushed to `quay.io`
* For the REST API :
  * the `<REP ROOT FOLDER>/api/Dockerfile.dev` is the `Dockerfile` used for development : the http server used there is the one spawned by angular cli with the `ng serve` command
  * the `<REP ROOT FOLDER>/api/Dockerfile` is the `Dockerfile` used to release a production-ready docker image : the http server used there is the ExpressJS http server as well, but only the compile from `TypeScript` JavaScript is included in this image. Plus, this imageis multi-stage built, in order to strip off to its minimal, the OCI image deployed. That's the docker image built and pushed to `quay.io`


## Design

### The REST endpoints : Specs and Implementation




#### The READ/Retrieve Endpoint spec

* How the Endpoint willbe consumed, using `curl` :

  * The request :

```bash
curl -X GET http://$KALEIDOSCOPIC_API_HOSTNAME:$KALEIDOSCOPIC_API_PORT_NO/api/v1/ui/theme/color | jq .
```
  * will return a JSON object of the following form :

```JSon
{
  "red": "<0 to 255>",
  "green": "<0 to 255>",
  "blue": "<0 to 255>",
  "opacity": "<0 to 255>"
}
```

The angular 10 Web UI SPA will :
* use an `RxJS` timer and `RxJS` `Axios` call to request the REST API every second, and
* then update `ngModel` with `rgb` and `opacity` values to Update the entire page color


### The WRITE/Update Endpoint spec

* How the Endpoint willbe consumed, using `curl` :

```bash
export JSON_PAYLOAD="{ \
  \"description\" : \"Un petit exemple\", \
  \"red\" : \"<0 to 255>\", \
  \"green\" : \"<0 to 255>\", \
  \"blue\" : \"<0 to 255>\", \
  \"opacity\" : \"<decimal from 0 to 1>\" \
}"

echo "${JSON_PAYLOAD}" | jq .

curl -d  "$JSON_PAYLOAD" -X POST http://$KALEIDOSCOPIC_API_HOSTNAME:$KALEIDOSCOPIC_API_PORT_NO/api/v1/files/management/ui/theme/color | jq .

```

### Implementation

To implement the REST Endpoints, I will use :

* pure NodeJS / Typescript
* and a framework named [`TSOA`](https://github.com/lukeautry/tsoa) (Stands for "TypeScript Open API")  :
* I love this framework, because it's MDA (Model Driven Architecture)
* Its principle is very simple :
  * you create / edit your `tsoa.json` file,
  * you implement a `Model` and a `Controller`, using annotations (tsoa uses `Models` and `Controllers` as **singlesource of truth**)
  * and then you run the `tsoa routes -c tsoa.json`, and that's it all your REST Endpoint `routes` are generated (all you have to do, is to add code in REST Controller, for the REST Endpoint todo "what you want it to do").
  * It can even generate for you the Open API spec, `openapi.json` ! End of story.



# Dev Guide

## Git workflow

I use the git flow with pure default config.

* Resume work on a feature, from scratch  :

```bash
export WORKSPACE=~/kaleidoscopic.dev
export REPO_GIT_SSH_URI=git@github.com:pokusio/kaleidoscopic.git
export FEATURE_ALIAS='cleaning_code_and_doc'
export COMMIT_MESSAGE="feat.(${FEATURE_ALIAS}) : cleaning root [README.md] and api src code"
## --- GIT GLOBAL CONFIG
##
git config --global commit.gpgsign true
git config --global user.name "Jean-Baptiste-Lasselle"
git config --global user.email jean.baptiste.lasselle.pegasus@gmail.com
git config --global user.signingkey 7B19A8E1574C2883

git config --global --list

# will re-define the default identity in use
# https://docstore.mik.ua/orelly/networking_2ndEd/ssh/ch06_04.htm
ssh-add ~/.ssh.perso.backed/id_rsa

export GIT_SSH_COMMAND='ssh -i ~/.ssh.perso.backed/id_rsa'
ssh -Ti ~/.ssh.perso.backed/id_rsa git@github.com

## --- RETRIEVE CODE IN WORKSPACE
##

git clone "${REPO_GIT_SSH_URI}" "${WORKSPACE}"
cd "${WORKSPACE}"
## --- GIT WORKFLOW
##
# --- GIT FLOW CONFIG
git flow init --defaults
# now on 'develop' branch
# --- switch to feature branch
# git flow feature start "${FEATURE_ALIAS}"
git checkout "feature/${FEATURE_ALIAS}"
export FEATURE_ALIAS='cleaning_code_and_doc'
export COMMIT_MESSAGE="feat.(${FEATURE_ALIAS}) : cleaning root [README.md] and api src code"
git add --all && git commit -m "${COMMIT_MESSAGE}" && git push -u origin HEAD
