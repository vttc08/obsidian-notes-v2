https://youtu.be/3ivwonJuqyI
https://shadowsocks.org/
## Install
The package is already in repo as `shadowsocks-libev`
Configuration is located at `/etc/shadowsocks-libev/config.json`
## SS
Uses symmetric encryption with a password
The recommended encryption is `AES-GCM`
Just SS may not be as safe as GFW can easily detect it
- firewall cannot decrypt it but it can send a "detection" packet to confirm SS exists
## SS Plugin
V2Ray Plugin
Shadowsocks with plugins that fake it as **normal HTTP** over WebSocket traffic.
- or HTTPS/QUIC
The plugins is `shadowsocks-v2ray-plugin`
```shell
sudo apt install shadowsocks-libev shadowsocks-v2ray-plugin
```