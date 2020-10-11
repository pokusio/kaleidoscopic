REST API POST and GET endpoint now both work with Error Handling ! :D :

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
export JSON_PAYLOAD="{ \
  \"description\" : \"Un petit exemple\", \
  \"red\" : \"255xx\", \
  \"green\" : \"15ab\", \
  \"blue\" : \"75\"
}"

curl -iv -X POST  -d "${JSON_PAYLOAD}" -H 'Content-Type: application/json' http://localhost:3000/api/v1/management/ui/theme/color | tail -n 1 | jq .

```
* Error Handling should give an HTTP response with `422` HTTP Code and a JSON response like :

```bash
$ curl -iv -X POST  -d "${JSON_PAYLOAD}" -H 'Content-Type: application/json' http://localhost:3000/api/v1/management/ui/theme/color | tail -n 1 | jq .
Note: Unnecessary use of -X or --request, POST is already inferred.
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying ::1:3000...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> POST /api/v1/management/ui/theme/color HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.68.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 96
>
} [96 bytes data]
* upload completely sent off: 96 out of 96 bytes
* Mark bundle as not supporting multiuse
< HTTP/1.1 422 Unprocessable Entity
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 254
< ETag: W/"fe-bh3jXpIjt2NkzNyuaNe2O8mrG8k"
< Date: Sun, 11 Oct 2020 17:24:45 GMT
< Connection: keep-alive
<
{ [254 bytes data]
100   350  100   254  100    96  36285  13714 --:--:-- --:--:-- --:--:-- 50000
* Connection #0 to host localhost left intact
{
  "message": "Received JSON Validation Failed",
  "details": {
    "requestBody.red": {
      "message": "invalid float number",
      "value": "255cc"
    },
    "requestBody.green": {
      "message": "invalid float number",
      "value": "15yy"
    },
    "requestBody.opacity": {
      "message": "'opacity' is required"
    }
  }
}

```


* Simple way to build and run REST API :

```bash
export WORKSPACE=~/kaleidoscopicus
git clone https://github.com/pokusio/kaleidoscopic ${WORKSPACE}
cd ${WORKSPACE}
git checkout 0.0.3
cd api/
npm install
tsoa routes -c tsoa.json
npm run build
npm run server
```

* env versions:

```bash
jbl@poste-devops-jbl-16gbram:~/kaleidoscopic/api$ node -v
v14.4.0
jbl@poste-devops-jbl-16gbram:~/kaleidoscopic/api$ npm --version
6.14.8
jbl@poste-devops-jbl-16gbram:~/kaleidoscopic/api$ tsc --version
Version 4.0.2
jbl@poste-devops-jbl-16gbram:~/kaleidoscopic/api$ tsoa --version
3.2.1

```
