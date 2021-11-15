# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim AS development

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

EXPOSE 4200

# Install Docker
RUN apt-get update
RUN apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
RUN echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update
RUN apt-get install -y docker-ce docker-ce-cli containerd.io
# Install Heroku CLI
RUN curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

ENTRYPOINT [ "/docker.sh" ]
CMD [ "run" ]

COPY docker.sh /docker.sh
RUN chmod +x /docker.sh
