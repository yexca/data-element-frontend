# builder
FROM node:16.20.2-alpine3.18 AS builder
WORKDIR /builder
# install dependency
COPY package*.json ./
RUN npm install
# build project
COPY . .
RUN npm run build

# running
FROM nginx:1.20-alpine
# set TZ
ENV TZ=Asia/Tokyo
# copy resource
COPY --from=builder /builder/dist/ /usr/share/nginx/html/dist/
COPY nginx.conf /etc/nginx/nginx.conf

# docker build -t yexca/data-vue:v1.3 .
