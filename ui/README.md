# The Angular SPA Web UI

A Docker Compose is here for developement purpose :

* this allows to setup a dev environement without changing anything to the bare-metal machine you'reworking on.
* the `<REP ROOT FOLDER>/ui/Dockerfile.dev` is the `Dockerfile` used for development : the http server used there is the one spawned by angular cli with the `ǹg serve` command
* the `<REP ROOT FOLDER>/ui/Dockerfile` is the `Dockerfile` used to release a production-ready docker image : the http server used there is the nginx http server




# Respawning dev dependencies

* How I re-installed all `devDependencies`, to upgrade them and get rid of the `node-sass` error that I had :

```bash
npmi --save-dev @angular-devkit/build-angular @angular/cli @angular/compiler-cli @angular/language-service @types/node @types/jasmine @types/jasminewd2 codelyzer  jasmine-core jasmine-spec-reporter karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter protractor ts-node tslint typescript

npm install --save bootstrap
npm install --save @fortawesome/fontawesome-free

npm install --save-dev bootstrap
npm install --save-dev @fortawesome/fontawesome-free
```
