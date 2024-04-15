# Stage: Build project

FROM node:18.19-alpine as builder

WORKDIR /usr/src

COPY package*.json ./

RUN ls /usr/src

RUN npm install

COPY . ./

RUN nx reset && npm run build --skip-nx-cache --verbose

# Stage: Copy project dist folder to nginx server

FROM nginx:alpine as production-build

ENV BASE_URL=https://deploy.nskm.xyz

COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY docker/entrypoint.sh /entrypoint.sh

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/dist/ddsi-labs-apps /usr/share/nginx/html

EXPOSE 8080


ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]