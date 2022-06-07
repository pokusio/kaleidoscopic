# The Angular SPA Web UI

## Build n run

* build for dev :

```bash
npm install
tsoa routes -c tsoa.json
npm run build
```

* serve locally, with dynamic reload when ever you edit a file :

```bash
npm run server
# Then go to http://localhost:3000/api/v1/ui/theme/color or and :
#
# curl -X GET http://localhost:3000/api/v1/ui/theme/color
```

* REST API `POST /api/v1/management/ui/theme/color` Endpoint with JSON Paylaod, successful invocation :

```bash
export JSON_PAYLOAD="{ \
  \"description\" : \"Un petit exemple\", \
  \"red\" : \"255\", \
  \"green\" : \"15\", \
  \"blue\" : \"75\", \
  \"opacity\" : \"0.56\" \
}"

curl -iv -X POST  -d "${JSON_PAYLOAD}" -H 'Content-Type: application/json' http://localhost:3000/api/v1/management/ui/theme/color | tail -n 1 | jq .

```

* To Test Error Handling from TSOA  on REST API `POST /api/v1/management/ui/theme/color` Endpoint with on purpose malformed JSon Payload :

```bash
// missing opacity,  red and green specified values are not numbers
export JSON_PAYLOAD="{ \"description\" : \"Un petit exemple\", \
  \"red\" : \"255ab\",  \
  \"green\" : \"15yy\", \
  \"blue\" : \"75\" \
}"

curl -iv -X POST  -d "${JSON_PAYLOAD}" -H 'Content-Type: application/json' http://localhost:3000/api/v1/management/ui/theme/color | tail -n 1 | jq .

// red specified value is not a number
export JSON_PAYLOAD="{ \"description\" : \"Un petit exemple\", \
  \"red\" : \"255\",  \
  \"green\" : \"15yy\", \
  \"blue\" : \"75\", \
  \"opacity\" : \"0.56\" \
}"

curl -iv -X POST  -d "${JSON_PAYLOAD}" -H 'Content-Type: application/json' http://localhost:3000/api/v1/management/ui/theme/color | tail -n 1 | jq .

// malformed JSON HTTP Error
export JSON_PAYLOAD="{ \"description\" : \"Un petit exemple\", \
  red : \"255\",  \
  \"green\" : \"15\", \
  \"blue\" : \"75\", \
  \"opacity\" : \"0.56\" \
}"


curl -iv -X POST  -d "${JSON_PAYLOAD}" -H 'Content-Type: application/json' http://localhost:3000/api/v1/management/ui/theme/color | tail -n 1 | jq .

```

* here are a few tests that I ran :

```bash
jbl@poste-devops-jbl-16gbram:~/kaleidoscopic/api$ curl -X GET http://localhost:3000/api/v1/ui/theme/color | jq .
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    84  100    84    0     0  42000      0 --:--:-- --:--:-- --:--:-- 42000
{
  "red": "<0 to 255>",
  "green": "<0 to 255>",
  "blue": "<0 to 255>",
  "opacity": "<0 to 255>"
}
jbl@poste-devops-jbl-16gbram:~/kaleidoscopic/api$ curl -X POST http://localhost:3000/api/v1/management/ui/theme/color | jq .
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    35  100    35    0     0  11666      0 --:--:-- --:--:-- --:--:-- 11666
{
  "message": "Internal Server Error"
}
jbl@poste-devops-jbl-16gbram:~/kaleidoscopic/api$
```
*

## Run Dockerized

A Docker Compose is at the root of this git repo for development purpose :

* this allows to setup a dev environment without changing anything to the bare-metal machine you're working on.
* the `<REP ROOT FOLDER>/api/Dockerfile.dev` is the `Dockerfile` used for development : the http server used there is the one spawned by angular cli with the `ng serve` command
* the `<REP ROOT FOLDER>/aoi/Dockerfile` is the `Dockerfile` used to release a production-ready docker image : the http server used there is the nginx http server. That's the docker image built and pushed to `quay.io`
