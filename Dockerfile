FROM node:12 as builder
RUN NG_CLI_ANALYTICS=false npm install -g @angular/cli
ARG PROPRIETARY_NPM_REGISTRY

COPY e2e /build/e2e
COPY src /build/src
COPY *.json /build/

RUN cd /build && \
    npm set registry $PROPRIETARY_NPM_REGISTRY && \
    npm install && \
    ng build --prod

FROM nginx:alpine
COPY --from=builder /build/dist/trainings /app
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
