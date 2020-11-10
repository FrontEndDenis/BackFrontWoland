FROM ubuntu

RUN groupadd --gid 1000 me \
  && useradd --uid 1000 --gid me --shell /bin/bash --create-home me

RUN apt update && apt install -y wget build-essential zlib1g-dev libpcre3-dev uuid-dev unzip sudo git

WORKDIR /tmp
#RUN wget https://github.com/apache/incubator-pagespeed-ngx/archive/latest-stable.zip && unzip latest-stable.zip

#WORKDIR /tmp/incubator-pagespeed-ngx-latest-stable
#RUN /tmp/incubator-pagespeed-ngx-latest-stable/scripts/build_ngx_pagespeed.sh

WORKDIR /tmp
RUN git clone https://github.com/google/ngx_brotli.git
WORKDIR /tmp/ngx_brotli
RUN git submodule update --init

WORKDIR /tmp
RUN wget -O- https://nginx.org/download/nginx-1.19.3.tar.gz | tar -xz

WORKDIR /tmp/nginx-1.19.3
RUN ./configure --add-module=/tmp/ngx_brotli && make build && make install
COPY docker/nginx/app.conf /usr/local/nginx/conf/nginx.conf
RUN chown -R 1000:1000 /usr/local/nginx
USER me

RUN mkdir /tmp/logs

CMD ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]
