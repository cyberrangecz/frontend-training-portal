FROM node:12 as builder
RUN NG_CLI_ANALYTICS=false npm install -g @angular/cli
ARG SENTINEL_REGISTRY_HOST_NO_PROTO
ARG SENTINEL_REGISTRY_ACCESS_TOKEN
ARG KYPO_REGISTRY_HOST_NO_PROTO
ARG KYPO_REGISTRY_ACCESS_TOKEN
ARG PROD=true

COPY e2e /build/e2e
COPY src /build/src
COPY *.json /build/

RUN cd /build && \
    npm config set @sentinel:registry https://$SENTINEL_REGISTRY_HOST_NO_PROTO && \
    npm config set //$SENTINEL_REGISTRY_HOST_NO_PROTO:_authToken $SENTINEL_REGISTRY_ACCESS_TOKEN && \
    npm config set @muni-kypo-crp:registry https://$KYPO_REGISTRY_HOST_NO_PROTO && \
    npm config set //$KYPO_REGISTRY_HOST_NO_PROTO:_authToken $KYPO_REGISTRY_ACCESS_TOKEN && \
    npm install && \
    if [ "$PROD" = true ] ; then \
      ng build --configuration production; \
    else \
      ng build --configuration development; \
    fi

FROM nginx:alpine
COPY --from=builder /build/dist/trainings /app
RUN chmod o-rwx -R /app && chgrp nginx -R /app
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
