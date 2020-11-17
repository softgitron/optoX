FROM node:latest as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:latest

COPY --from=build-deps /app/build /usr/share/nginx/html