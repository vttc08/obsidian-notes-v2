Integrate obsidian notes with [tldr](../linux/tealdeer.md) command line cheat tool.

Uses python files and python containers that runs on crontab

Docker compose
```yaml
services:
  obsidian2tldr:
    container_name: obsidian2tldr
    build:
      context: .
      dockerfile: Dockerfile
    network_mode: bridge
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - OBSIDIAN_PATH=/obsidian
      - TLDR_CUSTOM_PATH=/tldr
      - TLDR_PAGE_PATH=/tldr-pages/pages
    volumes:
      - ~/.cache/tealdeer/tldr-pages/pages:/tldr-pages/pages:ro
      - ~/Documents/notes/linux:/obsidian:ro
      - ~/docker/obsidian2tldr/app:/app
      - ~/.local/share/tealdeer/pages:/tldr
```
- `PUID` and `PGID` are environment variables that's loaded from `.bashrc`
- takes files from obsidian into tldr which can be customized by volume binds
- network set to default docker bridge network which will survive docker network prune
The crontab uses docker compose

Uses `parallel` command and copy it to multiple locations via rsync
```bash
parallel -j4 rsync -ahP ~/.local/share/tealdeer/pages/ {}:~/.local/share/tealdeer/pages/ ::: mediaserver oracle-arm-x oracle-yyc oracle-yul
```
