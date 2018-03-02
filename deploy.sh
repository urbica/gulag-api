#!/bin/bash
set -e

if [ -d /mnt/storage/urbica/device25/gulag-workshop ]; then
    cd /mnt/storage/urbica/device25/gulag-workshop
    git pull
else
    cd /mnt/storage/urbica
    mkdir -p /mnt/storage/urbica/device25
    cd device25
    ssh-keyscan -p 2222 gitlab.urbica.co >> ~/.ssh/known_hosts
    git clone ssh://git@gitlab.urbica.co:2222/device25/gulag-workshop.git
    cd gulag-workshop
fi

docker-compose pull
docker-compose up -d --force-recreate
docker-compose restart
