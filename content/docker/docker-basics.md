Docker containers are made of layers
- if the layers of image are same, then not all layers will be downloaded
- ![](assets/Pasted%20image%2020240129180816.png)

Docker create creates the container while docker run is combination of creating and starting container. Docker run creates a new container while docker start starts the existing one.
- `-d` runs the container in the background
By default docker run attach to the running container and it's not interactive.
To build a image, use `docker build -t the-image-name:tag .` and . is the folder where the Dockerfile is.
To access a terminal from running container use `docker exec -it name bash` to interactively access the terminal.
During docker volume bind mount, docker will default to creating a directory in bind mount, this is true if bind mounting a file that does not exist on the host
`docker tag` command rename docker images, when pushing to dockerhub, if user says latest, it will default to the newest version

**Docker Logs**
Moved to [docker-logs](docker-logs.md)

Use `docker inspect | jq .[].Keys` to parse the json data of a given container
- `.[].HostConfig` general configuration of container
- `.[].HostConfig.Binds` to check volume bindings
- `.[].Mounts` shows all the volumes
- `.[].NetworkSettings` check the network settings for example port map
- `.[].NetworkSettings.Ports` shows the exposed ports
- `.[].Config.Env` shows all the environment variables
- `.[].State.Status` get the status of running container eg. `exited` `running`
**Docker ps**
 - `-q` will only show the ID of a image which is useful to pipe into xargs
 - `--filter` can filter based on conditions, such as names, status=exited
 - `expose=1000-2000/tcp` filter shows all the containers with port 1000-2000 exposed
 - `-s` get the size a container takes on disk
 
 **Docker Stats**
	 - `docker stats` give the CPU usage statistics
	 - `docker top` give list of running processes of a given container

**Docker Exec**
- `-i` makes the session interactive
- `-t` TTY terminal from container in this host
- this is similar to docker attach, which attach to the running process of the docker container

## Pushing to DockerHub
- login to dockerhub first
- use `docker tag` to rename the image with docker username
- `vttc08/my-image:0.0.0`
- `docker push`
