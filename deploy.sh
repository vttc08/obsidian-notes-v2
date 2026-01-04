#!/bin/bash

# Deploy the Obsidian Publish site

set -e

cd $(dirname ${BASH_SOURCE[0]})

rsync -ahP --delete ~/Documents/notes/ ./content/

echo "Deploy script | Note content copied "

docker compose run --rm quartz-builder

echo "Deploy script | Docker build completed "

uv run ghp-import public/ -p

echo "Deploy script | Uploaded public HTML onto gh-pages branch "

rsync -ahP --delete --remove-source-files ./public/ ../quartz-web/site/

echo "Deploy script | New version of site deployed "

git add ./content
git commit -m "Page updated in Obsidian $(date +"%Y-%m-%dT%H:%M:%S%Z")"
git push origin

echo "Deploy script | Published to Github "

