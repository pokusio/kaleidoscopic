### STAGE 1: Build ###
FROM node:14.13.1-alpine3.12 AS build
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
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:1.19.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/kaleidoscopic /usr/share/nginx/html
