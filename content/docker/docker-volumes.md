## Commands
**Create** - create a new volume
- additional configuration is required for created volumes to be used in [docker compose](docker-compose.md#[Volumes](docker-volumes.md))
**ls** - list the available volumes names and its corresponding drivers
**rm** - remove a volume that is not used by a container
**Prune** - remove volumes that are not used by at least 1 container
Find what container is using what volume 
```bash
docker ps -a --filter volume=VOLUME_NAME_OR_MOUNT_POINT
```
## Overview
Docker Volumes are stored in `/var/lib/docker/volumes/[named or random[/_data` and all the files are owned by `root` regardless of user ID. For every `VOLUME` in [dockerfile](dockerfile.md) a volume will be created and the user will have an option to bind mount or named volume; if none are chosen, a default named volume with random letters will be created automatically by docker.

## Types of Volumes
### Bind
```shell
docker run -v /path/to/folder:/folder
```
- the files are managed by the system and retain the permissions
> [!important]+ Folder Contents
> ⚠ If a folder does not exist -> Docker will create a folder under `root` user
> If a folder already exists or it contains content -> The prescence/content of that folder will override existing files already in the container (not the case with named volumes)
- `:rw/ro` makes a container read-only
### Named Volume
```bash
docker run -v myvol:/app
```
- the files and permissions are managed by Docker, useful if the container itself do not respect `PUID/PGID` for file permissions, also good for databases
### tmpfs
```yaml
services:
  app:
    tmpfs:
	  - /unused
```
Using `tmpfs` prevents Docker from creating a anonymous volume when spinning up a container with `VOLUME` in the Dockerfile.
## Filesystem
### Storage
```bash
docker ps -s
```
- gets the size/virtual size of docker container
- size - container size
- virtual size - size of image/shared
Docker uses a union filesystem (similar to MergerFS) that combine the data into all layers. The files within containers are stored in `/var/lib/docker/overlay2`
![](assets/Pasted%20image%2020240723152323.png)
- **Writable Layer** - all the writes of a Docker container goes to this layer and will be deleted when container is gone
- **upper layer** - the writable layer or container layer
- **lower layer** - the read only layer or image layer
- **merged** - the layer consist of merged files from upper and lower dirs
This storage setup have different file operations
- Reading files that exists in both upper/lower dir - Docker will read the dir that is layered on top
- Overwriting file - rather than overwriting the file directly which is read only, it will create a new file
- Deleting file - since Docker cannot delete on the read-only layer, a whiteout file is written on upper layer and thus increasing image size