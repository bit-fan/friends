#! /bin/bash
export LC_ALL=C
scriptDir=$(dirname $0)
cd ${scriptDir}/
sudo npm install
sudo npm test
sudo npm start