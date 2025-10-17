FROM node:20 AS builder
RUN NG_CLI_ANALYTICS=false npm install -g @angular/cli
ARG PROD=false

COPY src /build/src
COPY *.json /build/
COPY .npmrc /build/

RUN cd /build && \
    npm i --ignore-scripts && \
    if [ "$PROD" = true ] ; then \
      ng build --configuration production; \
    else \
      ng build --configuration development; \
    fi && \
    rm -rf /build/.npmrc

FROM nginx:alpine
COPY --from=builder /build/dist/training-portal /app
RUN chmod o-rwx -R /app && chgrp nginx -R /app
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
