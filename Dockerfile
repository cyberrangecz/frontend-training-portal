FROM node:12 as builder
RUN NG_CLI_ANALYTICS=false npm install -g @angular/cli
ARG PROPRIETARY_NPM_REGISTRY
COPY . /app
RUN cd /app && \
    npm set registry $PROPRIETARY_NPM_REGISTRY && \
    npm install && \
    ng build --prod

FROM alpine
RUN apk add lighttpd
COPY --from=builder /app/dist/trainings /app
COPY ./etc/lighttpd.conf /etc/lighttpd/lighttpd.conf
EXPOSE 80
CMD lighttpd -D -f /etc/lighttpd/lighttpd.conf
