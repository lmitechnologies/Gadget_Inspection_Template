ARG DOCKER_PLATFORM=${DOCKER_PLATFORM}
FROM --platform=${DOCKER_PLATFORM} nginx:1.21-alpine
RUN rm /etc/nginx/conf.d/default.conf

RUN echo "upstream gadgetapp {"                                                     >> /etc/nginx/conf.d/nginx.conf
RUN echo "    server gadgetapp:8000;"                                               >> /etc/nginx/conf.d/nginx.conf
RUN echo "}"                                                                        >> /etc/nginx/conf.d/nginx.conf
RUN echo "server {"                                                                 >> /etc/nginx/conf.d/nginx.conf
RUN echo ""                                                                         >> /etc/nginx/conf.d/nginx.conf
RUN echo "    listen 80;"                                                           >> /etc/nginx/conf.d/nginx.conf
RUN echo ""                                                                         >> /etc/nginx/conf.d/nginx.conf
RUN echo "    location / {"                                                         >> /etc/nginx/conf.d/nginx.conf
RUN echo "        proxy_pass http://gadgetapp;"                                     >> /etc/nginx/conf.d/nginx.conf
RUN echo "        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;"    >> /etc/nginx/conf.d/nginx.conf
RUN echo "        proxy_set_header Host \$host;"                                    >> /etc/nginx/conf.d/nginx.conf
RUN echo "        proxy_redirect off;"                                              >> /etc/nginx/conf.d/nginx.conf
RUN echo "    }"                                                                    >> /etc/nginx/conf.d/nginx.conf
RUN echo ""                                                                         >> /etc/nginx/conf.d/nginx.conf
RUN echo "    location /static/ {"                                                  >> /etc/nginx/conf.d/nginx.conf
RUN echo "        alias /gadgetapp/staticfiles/;"                                   >> /etc/nginx/conf.d/nginx.conf
RUN echo "    }"                                                                    >> /etc/nginx/conf.d/nginx.conf
RUN echo ""                                                                         >> /etc/nginx/conf.d/nginx.conf
RUN echo "}"                                                                        >> /etc/nginx/conf.d/nginx.conf

HEALTHCHECK --interval=10s --timeout=10s --retries=5 --start-period=15s \
    CMD wget -O /dev/null http://localhost || exit 1