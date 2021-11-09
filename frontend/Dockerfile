FROM node:16

EXPOSE 4200

WORKDIR /home/node/app

ENTRYPOINT [ "/docker.sh" ]
CMD [ "run" ]

COPY docker.sh /docker.sh
RUN chmod +x /docker.sh
