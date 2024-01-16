# Stage: Build project

FROM node:16-alpine as builder

ARG BASE_API=https://deploy.nskm.xyz

WORKDIR /usr/src

COPY package*.json ./

RUN ls /usr/src


RUN npm install

COPY . ./

RUN npm run build

# Stage: Copy project dist folder to nginx server

FROM nginx:alpine as production-build

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/dist/ddsi-labs-apps /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]