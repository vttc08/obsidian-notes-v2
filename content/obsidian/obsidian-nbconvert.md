This is to be used with jupyter nbconvert to convert jupyter notebook notes to obsidian markdown files. It uses Docker and crontab. All the project files are located at `~/docker/nbconvert`

Docker command
```sh
docker run --name nbconvert --rm -v ~/Documents/notes/python:/app nbconvert
```
- the container uses the bind mount to the note directory containing the Python notes
The workflow uses a local Dockerfile for building rather than CICD, the container name must be `nbconvert`
```sh
docker build -t nbconvert .
```

The workflow uses nbconvert to convert the notebook to both Python and Markdown and squash the lines in between.
