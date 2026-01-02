#!/bin/bash

# Deploy the Obsidian Publish site
cd $(dirname ${BASH_SOURCE[0]})

docker compose run --rm --service-ports quartz-dev