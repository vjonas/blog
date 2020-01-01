# !/bin/bash
echo start hook
cd ~/git/blog
git pull
echo running npm install
npm install
echo building angular
ng build --prod
echo build finished
