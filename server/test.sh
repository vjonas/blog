# !/bin/bash
echo start hook
cd ~/git/blog
git pull
echo running npm install
npm install
echo building angular
ng build --prod &
echo build done
lsof -i tcp:3000 -t | xargs kill -9
NODE_ENV=production node ./server/index.js &
echo started node server
