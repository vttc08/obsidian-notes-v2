This is the default template for pushing to Dockerhub via Github Actions.

```yaml
env:
  DOCKER_IMAGE_NAME: vttc08/docker-duckdns-dynu
  PLATFORMS: linux/amd64,linux/arm64/v8
```
- `Platforms` specify which architecture, only `amd64` and `armv8` are needed ^7bda2c

```yaml
jobs:
    build:
        name: Build Image
        runs-on: ubuntu-latest
        steps:
```

Tagging
```yaml
- name: Docker meta
              id: meta
              uses: docker/metadata-action@v5
              with:
                # list of Docker images to use as base name for tags
                images: |
                  vttc08/docker-duckdns-dynu        
                # generate Docker tags based on the following events/attributes
                tags: |
                  type=schedule
                  type=ref,event=branch
                  type=ref,event=pr
                  type=semver,pattern={{version}}
                  type=semver,pattern={{major}}.{{minor}}
                  type=semver,pattern={{major}}
                  type=sha
                flavor: |
                  latest=true
```

^4f9c3f

- `image` are the base images which tags need applied
- `flavor: | latest=true` this make sure it also tag a latest when push to docker

**Template for Docker Buildx and building multi-arch images**
```yaml
            - name: Setup QEMU
              uses: docker/setup-qemu-action@v2
              with:
                platforms: arm,arm64,ppc64le,mips64,s390x
            - name: Setup Docker Buildx
              uses: docker/setup-buildx-action@v2
            - name: Login to DockerHub
              uses: docker/login-action@v2
              with:
                username: ${{ secrets.DOCKERHUB_USERNAME }}
                password: ${{ secrets.DOCKERHUB_TOKEN }}
```

```yaml
            - name: Build and push
              uses: docker/build-push-action@v4
              with:
                platforms: ${{ env.PLATFORMS }}
                tags: ${{ steps.meta.outputs.tags }}
                push: true
                build-args: |
                    BUILD_DATE=${{ env.NOW }}
                    OR Other Arguments = xxx
```
- [platforms](#^7bda2c) refers to the previous environment variable
- [tag=steps.meta.output.tags](#^4f9c3f) refers to the previous tag

Sync Dockerhub description with Github
https://github.com/peter-evans/dockerhub-description
- to use this action, remember to checkout the repo first
- also need to specify the repository (eg. vttc08/my-repo)
```yaml
            - name: checkout
              uses: actions/checkout@v2

            - name: Dockerhub description
              uses: peter-evans/dockerhub-description@v3
              with:
                username: ${{ secrets.DOCKERHUB_USERNAME }}
                password: ${{ secrets.DOCKERHUB_TOKEN }}
                repository: ${{ env.DOCKER_IMAGE_NAME }}
```

### jlesage Image
jlesage's image is mostly consistent with above.
The only part needs to be modified is the tags and also `env: DOCKER_IMAGE_NAME` 
It's also good idea to remove free disk space for the action to run faster.
```yaml
on:
  push:
    branches: '*'
    tags:
      - v[0-9]+.[0-9]+.[0-9]+
      - v[0-9]+.[0-9]+.[0-9]+-pre.[0-9]+
  pull_request:
```
- this allow the use of any combination of 3 numbers for tags
The workflow require Github tags to be added, if there are no tags pushed, the Github action will not publish the image to Dockerhub. 
1. Make changes and commit it
2. Add tags using `git tag`
3. Push to tags to Github and then push the changes
```bash
git tag v1.0.0 && git push origin v1.0.0 && git push
```