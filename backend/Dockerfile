# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

EXPOSE 4200

ENTRYPOINT [ "/docker.sh" ]
CMD [ "run" ]

COPY docker.sh /docker.sh
RUN chmod +x /docker.sh
