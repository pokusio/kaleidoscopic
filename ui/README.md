# The Angular SPA Web UI

## Build n run

* build for dev :

```bash
npm run build
```

* build for prod :

```bash
npm run build --prod
```

* serve locally, with dynamic reload when ever you edit a file :

```bash
ng serve --watch
# Then go to http://localhost:4200
```

## Run Dockerized

A Docker Compose is at the root of this git repo for developement purpose :

* this allows to setup a dev environement without changing anything to the bare-metal machine you'reworking on.
* the `<REP ROOT FOLDER>/ui/Dockerfile.dev` is the `Dockerfile` used for development : the http server used there is the one spawned by angular cli with the `ng serve` command
  * the `<REP ROOT FOLDER>/ui/Dockerfile` is the `Dockerfile` used to release a production-ready docker image : the http server used there is the nginx http server. That's the docker image built and pushed to quay.io

## Respawning dev dependencies

* I started this Angular quick app from a sample app, whosedev cycle was broken : `npm run build` gave errors.
* How I re-installed all `devDependencies`, to upgrade them and get rid of the `node-sass` error that I had :

```bash
npmi --save-dev @angular-devkit/build-angular @angular/cli @angular/compiler-cli @angular/language-service @types/node @types/jasmine @types/jasminewd2 codelyzer  jasmine-core jasmine-spec-reporter karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter protractor ts-node tslint typescript

npm install --save bootstrap
npm install --save @fortawesome/fontawesome-free

npm install --save-dev bootstrap
npm install --save-dev @fortawesome/fontawesome-free
```
