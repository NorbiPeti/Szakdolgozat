#!/usr/bin/env bash
set -e

if [ "$COMMAND" == "deploy" ]; then
    npm run buildProd
    npm install -g firebase-tools
    firebase login --no-localhost
    firebase deploy
    exit 0
fi

echo "Installing packages"
npm install
echo "Running application"
npm start
