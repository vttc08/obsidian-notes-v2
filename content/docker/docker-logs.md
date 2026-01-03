- `--tail` or `-n` will show the last x lines of docker logs
- `-f` will let the docker logs output to follow terminal and see the logs in real-time
- `--since` will get logs after a time specified, e.g. `2h` give the logs from 2 hours ago to now
- `--until` will get the logs up until the point that is specified
- `docker logs --tail 1000 -f` what VSCode uses for logs
```bash
function dl-fn {
    docker logs -f -n 200 "$1"
}

alias dlog='dl-fn'

_dlog_autocomplete() {
    local cur=${COMP_WORDS[COMP_CWORD]}
    COMPREPLY=($(compgen -W "$(docker ps -a --format '{{.Names}}')" -- "$cur"))
}

complete -F _dlog_autocomplete dlog
```

The location where Docker store its logs are `/var/lib/docker/containers/<id>/*.json`
When a Docker container re-run or removed, the logs are removed. Logs are not removed if container is restarted.

By default the logging driver is json.

Local
Logs follow do not require large CPU usage, but looking at logs do have high usage as logs are decompressed.
Logs are stored in same directory but in a subfolder `./local-logs` and files are compressed in gzip after the limit is reached.
By default, compression is enabled, 5 max files and 20M per file. After one log file of 20M is reached, the log is compressed, and only 5 compress files are kept.

To remove or reduce size of logs, need to manually truncate or rm. 

To manually change logging
```bash
docker run --rm --log-driver local --log-opt max-size=10M other-opt=x ...
```
For Docker compose
```yaml
    logging:
      driver: local
      options:
        max-size: 20M
        max-file: 5
```

Change globally, require changing of `/etc/docker/daemon.json`
```json
{
  "log-driver": "local",
  "log-opts": {
    "max-size": "10m"
  }
}
```


