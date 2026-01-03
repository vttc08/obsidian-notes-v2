## MPV
Download MPV https://mpv.io/installation/
To configure MPV on Windows, the `mpv.conf` is located in `%appdata%/mpv`
### HDR
```
vo=gpu-next
gpu-api=vulkan #or gpu-api=d3d11
fullscreen=yes
target-colorspace-hint=yes
```
Native Jellyfin player has some oddities 
- `vo=gpu-next` doesn't work, when these configuration are added, everytime it plays, it spawns a new MPV window with no option to control it
### Jellyfin MPV Shim
``` powershell
winget install ianwalton.jellyfinmpvshim
```
The configuration files are located in `%appdata%\jellyfin-mpv-shim`
Change the following lines in `config.json`
```json
    "mpv_ext": true,
    "mpv_ext_ipc": "mpv",
    "mpv_ext_no_ovr": true,
    "mpv_ext_path": "C:\\Program Files (x86)\\mpv\\mpv.exe",
    "mpv_ext_start": true,
    "mpv_log_level": "info",
```
- this will use MPV installed in the system with HDR support
However, subtitle options in `mpv.conf` does not work, it has to be configured in Shim
```json
    "subtitle_color": "#FF808080",
    "subtitle_position": "bottom",
    "subtitle_size": 75,
```
```json
	"transcode_dolby_vision": false,
	"allow_transcode_to_h265": true,
	"prefer_transcode_to_h265": true,
```
- these will allow H265 transcoding to the client

## etlp
https://github.com/kjtsune/embyToLocalPlayer
https://greasyfork.org/en/scripts/448648-embytolocalplayer
This script allows playback of jellyfin content in any local players.