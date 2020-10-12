#
# ---- Base Node ----
FROM node:14.9.0-alpine3.10 AS base
# -- add a few utils:
# the [PullRequestBot], among other
# CICD Stages, need the git
RUN apk update && apk add tree git
# --- Install TypeScript
RUN npm install -g typescript @types/node
# --- create and set working directory
RUN mkdir -p /kaleidoscopic/informer
WORKDIR /kaleidoscopic/informer
# --- add entrypoint
COPY oci/start.sh /kaleidoscopic/informer
# COPY oci/generate-dotenv.sh /kaleidoscopic/informer
RUN chmod +x /kaleidoscopic/informer/*.sh

# Set [start.sh] as entrypoint
ENTRYPOINT ["/kaleidoscopic/informer/start.sh", "--"]
# Copy project file
COPY package.json .
COPY tsconfig.json .
#
# ---- Resolve Dependencies and Build ----
FROM base AS dependencies
# --- Resolve project dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
# --- copy production node_modules aside
RUN cp -R node_modules prod_node_modules
RUN echo "Content [prod_node_modules/] in PWD=[$(pwd)/prod_node_modules]"
# --- Install ALL node_modules, including 'devDependencies'
RUN npm install
RUN mkdir -p /kaleidoscopic/informer/src
COPY src/ ./src
COPY tslint.json .
RUN npm run build
RUN echo "After npm run build, Is [dist/] in PWD=[$(pwd)] ? " && ls -allh && ls -allh dist/ && tree dist/

#
# ---- Test ----
# run linters, setup and tests
FROM dependencies AS test
COPY . .
# RUN  npm run lint && npm run setup && npm run test
# RUN  npm run lint && npm run setup && npm run test
RUN npm run test

#
# ---- Release ----
FROM base AS release
# --
# GIT COMMIT ID
ARG GIT_COMMIT=unspecified
LABEL git.commit.id=$GIT_COMMIT
LABEL vendor=pok-us.io
LABEL maintainer=jean-baptiste.lasselle@gmail.com
# Define General Docker environment
# ---
# --- copy production node_modules
COPY --from=dependencies /kaleidoscopic/informer/prod_node_modules ./node_modules
# --- Copy built TypeScript app
COPY --from=dependencies /kaleidoscopic/informer/dist ./dist
RUN echo "quick check peek [PWD=$(pwd)]" && ls -allh .
RUN echo "quick check peek [PWD/dist=$(pwd)/dist]" && ls -allh ./dist
RUN echo "Inside [FROM base AS release] npm run compile, Is [dist/] in PWD=[$(pwd)] ? (and what is its content ?)" && ls -allh && ls -allh dist/
RUN echo "Inside [FROM base AS release] npm run compile, Is [node_modules/] in PWD=[$(pwd)] ? (and what is its content ?)" && ls -allh && ls -allh node_modules/

# ---
# 
RUN mkdir -p /kaleidoscopic/informer/meta
VOLUME [ "/kaleidoscopic/informer/meta" ]
WORKDIR /kaleidoscopic/informer
# Set [start.sh] as entrypoint
# CMD ["/kaleidoscopic/informer/start.sh"]
