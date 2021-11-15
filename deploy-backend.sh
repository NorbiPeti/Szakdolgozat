#!/bin/bash

cd backend || exit
docker-compose build backend
USERNAME="0" docker-compose run -e COMMAND=deploy -v /var/run/docker.sock:/var/run/docker.sock backend
