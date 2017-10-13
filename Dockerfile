FROM ubuntu:14.04

# System requirements installation

RUN apt-get update && \
	apt-get install -y nginx 


# Encoding fix for correct UTF handling in python packages

RUN sudo locale-gen "en_US.UTF-8"
ENV LC_CTYPE "en_US.UTF-8"
ENV LC_NUMERIC "en_US.UTF-8"
ENV LC_TIME "en_US.UTF-8"
ENV LC_COLLATE "en_US.UTF-8"
ENV LC_MONETARY "en_US.UTF-8"
ENV LC_MESSAGES "en_US.UTF-8"
ENV LC_PAPER "en_US.UTF-8"
ENV LC_NAME "en_US.UTF-8"
ENV LC_ADDRESS "en_US.UTF-8"
ENV LC_TELEPHONE "en_US.UTF-8"
ENV LC_MEASUREMENT "en_US.UTF-8"
ENV LC_IDENTIFICATION "en_US.UTF-8"
RUN locale


# Copying application code into container

COPY . /opt/app

VOLUME ["/opt/app/media"]

WORKDIR /opt/app

# Nginx setup

RUN rm /etc/nginx/sites-enabled/default;
RUN ln -s /opt/app/Deploy/nginx.conf /etc/nginx/sites-enabled/;

EXPOSE 80
