#!/bin/bash

#PRODUCTION
git reset --hard
git checkout master
git pull origin master

npm i yarn -g
yarn global add serve
yarn
yarn run build
pm2 start cmd --name SNKRS-REACT -- /c "yarn run start:prod"

