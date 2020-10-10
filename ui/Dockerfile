### STAGE 1: Build ###
FROM node:12.19.0-alpine-3.9 AS build
ARG GIT_COMMIT=unspecified
LABEL git.commit.id=$GIT_COMMIT
LABEL vendor=pokusio.io
LABEL maintainer=jean.baptiste.lasselle@gmail.com
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
# RUN npm i -g node-sass@4.12.0
# RUN npm i -g node-sass@4.12.0

RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/kaleidoscopic /usr/share/nginx/html
