# Kaleidoscopic : A simple Web SPA and its backend


Kaleidoscopic a basic application, designed to work on architectural POCs (Proof of Concepts).

Kaleidoscopic a basic application, with :

* a Web SPA as basic UI, made with Angular 10 / Material Design.
* and a backend, made of 2 REST API Endpoints:
  * The first Endpoint, is consumed by the Web SPA : The SPA queries this REST API Edpoint to find out what is the main color UI should use for its UI Theme. It's a pure READ/Retrieve operation
  * The Second endpoint, is a utility someone can use, to change the above mentioned color. It's a pure WRITE/Update operation


## The REST endpoints specsandimplementations

To implement the REST Endpointys, I will use :
* pure NodeJS / Typescript
* and a framework named [`TSOA`](https://github.com/lukeautry/tsoa) (Stands for "TypeScript Open API")  :
  * I love this framework, because it's MDA (Model Driven Architecture)
  * Its principle is very simple : you create / edit your `tsoa.json` file, and then you run the `tsoa routes -c tsoa.json`, andthat's it all your REST Endpoint are generated (all you ahve to do,is toad code in REST Controller, for the REST Endpoint todo "what you want it to do"). It can even generate for you the Open API spec, `openapi.json` ! End of story. _"Don't implement REST Controllers anymore"_



### The READ/Retrieve Endpoint spec

* How the Endpoint willbe consumed, using `curl` :

```bash
curl -X GET http://$KALEIDOSCOPIC_API_HOSTNAME:$KALEIDOSCOPIC_API_PORT_NO/api/v1/ui/theme/maincolor | jq .
```

### The WRITE/Update Endpoint spec

* How the Endpoint willbe consumed, using `curl` :

```bash
export JSON_PAYLOAD="{ \
  \"red\" : \"<0 to 255>\", \
  \"green\" : \"<0 to 255>\", \
  \"blue\" : \"<0 to 255>\", \
  \"opacity\" : \"<decimal from 0 to 1>\" \
}"

echo "${JSON_PAYLOAD}" | jq .

curl -d  "${JSON_PAYLOAD}" -X POST http://$POKUS_API_HOSTNAME:$POKUS_API_PORT_NO/api/v1/files/management/ui/theme/maincolor | jq .

```
