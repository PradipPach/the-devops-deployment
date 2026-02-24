# Jenkins with Docker support
FROM jenkins/jenkins:lts-alpine

USER root

# Install Docker CLI
RUN apk add --no-cache docker docker-compose

# Install additional tools
RUN apk add --no-cache \
    git \
    curl \
    bash \
    wget \
    zip \
    unzip

USER jenkins

# Install Jenkins plugins
COPY jenkins-plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli -f /usr/share/jenkins/ref/plugins.txt

EXPOSE 8080 50000
