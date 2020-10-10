# The Angular SPA Web UI

A Docker Compose is here for developement purpose :

* this allows to setup a dev environement without changing anything to the bare-metal machine you'reworking on.
* the `<REP ROOT FOLDER>/ui/Dockerfile.dev` is the `Dockerfile` used for development : the http server used there is the one spawned by angular cli with the `ǹg serve` command
* the `<REP ROOT FOLDER>/ui/Dockerfile`  is the `Dockerfile` used to release a production-ready docker image : the http server used there is the nginx http server
