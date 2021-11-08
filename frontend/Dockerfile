FROM node:16

EXPOSE 4200

COPY docker.sh /docker.sh
RUN chmod +x docker.sh
WORKDIR /home/node/app

ENTRYPOINT /docker.sh
