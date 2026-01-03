#!/bin/bash

# Deploy the Obsidian Publish site
cd $(dirname ${BASH_SOURCE[0]})

rsync -ahP --delete ~/Documents/notes/ ./content/

docker compose run --rm quartz-builder

git add ./content
git commit -m "Page updated in Obsidian $(date +"%Y-%m-%dT%H:%M:%S%Z")"
git push origin