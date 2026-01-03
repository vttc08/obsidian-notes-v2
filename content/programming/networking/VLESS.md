https://youtu.be/7GHh91AYAmM
Lightweight VMESS without extra encryption
XTLS
Developed by RPRX
![](assets/Pasted%20image%2020250416214627.png)
Due to open source drama, RPRX developed Xray core with support for XTLS. Xray is similar to V2Ray.
- use XTLS, only possible with Xray

The encryption used for VLESS is handled via TLS.

When VLESS+XTLS arrives at server
- XTLS decrypt the VLESS header and send it to VLESS
- XTLS can also decrypt normal TLS (useful for Trojan)
- if the decrypted is not VLESS, it will falback to another endpoint, e.g. [Trojan](Trojan.md) or another website
VLESS fallback allow multiple services running on same port

Because some website still use TLS 1.2, while VLESS uses TLS 1.3, if a 1.3 packet has 1.2 characteristics, it can be detected
- TLS encrypted application data could have many 0's in the beginning which are serials, while in 1.3 it's all randomized

Installation
Xray one-click install script
https://github.com/XTLS/Xray-install
```bash
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
```
Install location
```bash
Binary: /usr/local/bin/xray                     
GeoIP/Site: /usr/local/share/xray/
systemd: /etc/systemd/system/xray.service 
configuration: /usr/local/etc/xray/config.json
```
- remove user=nobody to prevent permission issue with certs

Usage is similar to V2Ray and VMESS
When adding clients, VLESS or trojan, put the port of VLESS not trojan because of fallback

Using VLESS must use an encryption, WS or TCP

The steps for WS/TLS/Fake SNI is the same as for VMESS, using Caddy/Nginx as reverse proxy. This is possible for both V2Ray and Xray. 
Except for VLESS, this configuration is needed
```js
inbounds.settings.decryption = "none"
```

However, to use XTLS, require Xray.
If running on 443 is required, XTLS/Xray has to listen on 443 and not the reverse proxy
The tutorial from bulianglin is outdated as XTLS-direct is deprecated and now it's vision.
- Vision also don't encrypt original TLS and it mimic browser like fingerprint and `alpn` to evade DPI
https://github.com/seakfind/examples/blob/main/xtls-vision/README.md
- is using TLS 1.3, simply copy the data packet
- if not (HTTP or TLS 1.2), still encrypt via TLS
Configuration adapted here
https://github.com/XTLS/Xray-examples/blob/fc906aef5358933a613c5ea4829e52a54a2a6acd/VLESS-TCP-XTLS-Vision/config_server.jsonc
Important notes
Settings
```json
{
  "settings": {
    "clients": [
      {
        "id": "",
        "flow": "xtls-rprx-vision" // use vision
      }
    ],
    "decryption": "none",
    "fallbacks": [ //
      {
        "dest": "8080", // inproper VLESS go to 8080
      }
    ]
  }
}
```
Stream Settings
```json
"streamSettings": {
    "network": "tcp",
    "security": "tls",
    "tlsSettings": {
      "certificates": [
        {
          "certificateFile": "",
          "keyFile": ""
        }
      ],
      "alpn": [
        "http/1.1",
        "h2"
      ]
    }
  }
```
- security is TLS
- provide a list of `alpn`, in this case, support both h1 and h2