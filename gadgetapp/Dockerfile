FROM node:18.17.1-alpine3.18 as builder
COPY package.json package-lock.json ./
RUN npm install -q && mkdir /front_end && mv ./node_modules /front_end
WORKDIR /front_end
COPY . .
RUN npm run build -q

FROM nginx:1.23.1-alpine
COPY ./nginx.conf ./nginx-gadgetapp.conf /etc/nginx/

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /front_end/dist /usr/share/nginx/html
EXPOSE 80 443
ENV TZ=utc

COPY ./run.sh .

ENTRYPOINT ["./run.sh"]
