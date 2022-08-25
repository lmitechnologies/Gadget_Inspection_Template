ARG DOCKER_PLATFORM=${DOCKER_PLATFORM}
FROM --platform=${DOCKER_PLATFORM} nginx:1.21-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d