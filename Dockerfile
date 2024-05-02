# 基于nginx:1.20镜像
FROM nginx:1.20
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/ /usr/share/nginx/html/dist/
# 用本地的 nginx.conf 配置来替换nginx镜像里的默认配置
COPY nginx.conf /etc/nginx/nginx.conf

# 定义环境变量
# ARG VUE_APP_URL
# ENV VUE_APP_URL=$VUE_APP_URL

# 更改文件夹和文件的权限
# RUN chmod -R 755 /usr/share/nginx/html/dist

# docker build -t yexca/data-vue:v1.2 .

# FROM node:latest as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY ./ .
# RUN npm run build

# FROM nginx as production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf