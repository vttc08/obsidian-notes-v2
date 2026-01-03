https://youtu.be/CXj-ID33MhU
https://github.com/apernet/hysteria

```bash
hysteria2://password@ip:port?sni=bchydro.com&insecure=1#remark
```

Hysteria2
Installation
```bash
bash <(curl -fsSL https://get.hy2.sh/)
```
or use the binary
```bash
/etc/hysteria/config.yaml # configuration
/etc/systemd/system/hysteria-server/service # systemd unit
/etc/systemd/system/multi-user.target.wants/hysteria-server.service  # systemd unit symlinked
```

Configuration
config.yaml in the folder of hysteria
To manually configure Hysteria and start the server
```bash
sudo ./hysteria-linux-arm server -c config.yaml 
```

```yaml
listen: :443

tls:
  cert: /etc/hysteria/certs/selfsigned.crt
  key: /etc/hysteria/certs/selfsigned.key

auth:
  type: password
  password: any-password

masquerade:
  type: proxy
  proxy:
    url: https://news.ycombinator.com/
    rewriteHost: true
    
bandwidth:
  up: 1 gbps
  down: 1 gbps
```
- use ChatGPT reference: https://chatgpt.com/share/67fa180a-4e28-800b-a7b4-8f379a9d0556 to generate key
- the key content must be readable by Hysteria user or the user running the Hysteria server or use `sudo` to run the server

Obfs
```yaml
obfs:
  type: salamander
  salamander:
    password: cry_me_a_r1ver
```

It's possible to run different hysteria servers (on different ports)

Docker
```yaml
services:
  hysteria:
    image: tobyxdd/hysteria
    container_name: hysteria
    restart: unless-stopped
    network_mode: "host"
    volumes:
      - hy-acme:/acme
      - ./hysteria.yaml:/etc/hysteria.yaml
      - ./certs:/etc/hysteria/certs
    command: ["server", "-c", "/etc/hysteria.yaml"]
volumes:
  hy-acme:
```
Adapted from official documentation. `hy2` runs under root in Docker.
- `hy-acme` is named volume to prevent permission issues
- `certs` is a folder for https certs, must be created for the container to use
```bash
touch hysteria.yaml && mkdir certs
```
- this makes the necessary assets with right permission before container starts

`systemd` configuration
Symlink (additional hy2 servers) or use systemd
```bash
systemctl enable hysteria-obfs --now
```
```bash
 ln -s /etc/systemd/system/hysteria-obfs.service /etc/systemd/system/multi-user.target.wants/hysteria-obfs.service
```
Just copy the hysteria service file to duplicate it
Example `systemd` service file
```bash
ExecStart=/usr/local/bin/hysteria server --config /etc/hysteria/config-obfs.yaml
```
- change the config location

CLI usage (with downloaded binary)
```bash
./hysteria-linux-amd64-avx server -c whatever.yaml
```
Use `nohup` to run it background
```bash
sudo nohup ./hysteria -c config.yaml 2>&1 > whateverlogfile.txt
```


TLS certificates (for both Docker and systemctl)
```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout /etc/hysteria/certs/selfsigned.key -out /etc/hysteria/certs/selfsigned.crt -days 365 -subj "/CN=your.domain.net"
```
- change the output location
Fix key permission (if not running as root)
```bash
# Make sure the directory is traversable and owned by the service user
sudo chown -R hysteria:hysteria /etc/hysteria/certs
sudo chmod 750 /etc/hysteria/certs

# Key should not be world-readable
sudo chmod 640 /etc/hysteria/certs/selfsigned.key
sudo chmod 644 /etc/hysteria/certs/selfsigned.crt
```

ACL configuration (this might not work)
```yaml
acl:
  inline:
  - warp(geosite:netflix)
  - home(geosite:reddit)
  - direct(all)
outbounds:
  - name: direct
    type: direct
  - name: warp
    type: socks5
    socks5:
      addr: 127.0.0.1:40000
```
- uses inline configuration
- matched with outbounds
- make sure the put the `direct` outbound at last
ACL with file
```python
warp(geosite:reddit)
warp(geosite:speedtest)
direct(all)
```
```yaml
acl:
  file: /etc/hysteria/acl.txt
```
https://v2.hysteria.network/docs/advanced/ACL/

Coexistence with webserver
Caddy (systemd)
```json
{
    email @gmail.com
    servers {
        protocols h1 h2
    }
}
```
- put the `protocols` block in `servers` after the email
Nginx Proxy Manager Plus
```yaml
- "DISABLE_H3_QUIC=true"
```

Client
V2RayN Windows
- need hy2 binary on Windows
- place the binary into `$V2RayInstall/bin/hysteria`
Sing-box2 support hy2 out of box, both Android and Windows
> for V2RayN, the hysteria bandwidth is configured via client master settings
> `Settings` > `Options` > `Core` > `Hysteria Max Bandwidth`

Android
- V2RayNG doesn't work with default hy2, maybe obfs works

Uses UDP rather than TCP
- no congestion control
- ignore any congestion control

Bandwidth
- Client up = server down
- Client down = server up
- take the lowest
If either no bandwidth is provided by the client or `ignoreClientBandwidth: true` on server, will use BBR.