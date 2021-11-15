#!/usr/bin/env bash
set -e

if [ "$COMMAND" == "deploy" ]; then
  echo Building Docker image
  docker build -t registry.heroku.com/np-szakdolgozat/web -f Dockerfile-prod .
  echo Logging in to Heroku
  heroku login
  echo Logging in to Container Registry
  heroku container:login
  echo Pushing image
  docker push registry.heroku.com/np-szakdolgozat/web
  echo Releasing new version
  heroku container:release web -a np-szakdolgozat
  exit 0
fi

echo "Installing packages"
npm install
echo "Running application"
npm run rebuild
npm run start:watch
