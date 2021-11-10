#!/usr/bin/env bash

if [ "$COMMAND" == "deploy" ]; then
    echo TODO
    exit 0
fi

echo "Installing packages"
npm install
echo "Running application"
npm run rebuild
npm run start:watch
