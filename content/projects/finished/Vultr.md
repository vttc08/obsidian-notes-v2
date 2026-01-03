Benchmarks
Geekbench
iperf3
Speedtest-cli
Deployment time

| Plan ID      | Type             | RAM    | Disk       | Bandwidth | Price  | Hourly Price | Location          |
| ------------ | ---------------- | ------ | ---------- | --------- | ------ | ------------ | ----------------- |
| vc2-1c-0.5gb | Standard         | 0.5 GB | 10 GB SSD  | 0.5 TB    | $3.50  | $0.005       | New York only     |
| vc2-1c-1gb   | Standard         | 1 GB   | 25 GB SSD  | 1 TB      | $5.00  | $0.007       | Seattle available |
| vhf-1c-1gb   | High Frequency   | 1 GB   | 32 GB NVMe | 1 TB      | $6.00  | $0.008       | Seattle available |
| vhp-1c-1gb   | High Performance | 1 GB   | 25 GB NVMe | 2 TB      | $6.00  | $0.008       | Seattle available |
| vc2-1c-2gb   | Standard         | 2 GB   | 55 GB SSD  | 2 TB      | $10.00 | $0.014       | Seattle available |
| vc2-2c-2gb   | Standard x2      | 2GB    |            | 3TB       | $15.00 | $0.021       | Seattle           |

## Misc
Time to deploy from API (Ubuntu and Debian)
- time between API request to successful SSH with `whoami` printed
On GUI only Debian is available for vc2-1c-0.5

ewr + deb 12 + lowest tier = 139.23s
~~ + deb 11 = 157.02s
sea + ub22 + 1/1 = 128.38s
sea + ub24 + 1/1 = 101.10s
sea + deb11 + 1/1 = 115.19s
sea + deb12 + 1/1 = 132.33s
vc2-1c-0.5gb-ewr-2136 = 110.21s
1hf/1 + ubuntu = 70s
1hf/1 + debian = 78.30s
1hp/1 + ubuntu = 195.32s
1hp/1 + debian = 127.23s
vhf-1c-1gb-sea-2284 = 79.28s
vhf-1c-1gb-sea-2136 = 79.30s
vc2-1c-1gb-sea-2284 = 123.22s
vc2-1c-1gb-sea-2284 = 136.28s
vc2-1c-1gb-sea-2136 = 93.17s
vc2-1c-1gb-sea-2136 = 125.45s
vc2-1c-1gb-sea-2136 = 82.05s

Setup 
```bash
apt update && apt install htop wireguard wireguard-tools iperf3 p7zip-full -y && ufw disable && 7z b && df -h && echo -e "alias dc='docker compose'\nalias ll='ls -alh'" >> ~/.bashrc && . ~/.bashrc
```
## Network
Normal iperf
Normal speedtest
Wireguard bare metal server
- speedtest from home
- iperf wg, htop
- client: Windows 10 PC, WG app
Tailscale bare metal
```bash
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up --auth-key revoked --advertise-exit-node --accept-routes --accept-dns=false
```
- iperf3
- wget Jellyfin speedtest, htop, network monitoring
```bash
wget http://10.10.120.16:8096/Items//Download?api_key= --output-document=/dev/null      
```
Outline VPN server, 3x-ui VLESS + WS + TLS (Caddy lego and cloudflare) and VMESS + WS
- speedtest, CPU monitoring
Wireguard
```bash
curl -fsSL http://207.148.29.65:8080/api/public/dl/nt0tW1mm | bash
```
Xray
```bash
curl -fsSL http://207.148.29.65:8080/api/public/dl/bkegbtmd | bash
```
Caddy - is AES enabled on CPU?
Take note of disk usage

**1c0.5g - 2.5G disk, 125M**
Speedtest 7Gbps
Wireguard
- speedtest 303/57, 299/67, 40%
- iperf 30/347 56/339 36% (highly fluctuating), iperf performing worse on Windows
Normal iperf3 from Linux 86/264 102/711
Tailscale
- iperf 120/254 60%
- jellyfin 16MB/s, somehow faster than normal, 80%
- speedtest 191/136 80%
V2ray
- vmess+ws 595/110 65%
- +tls 192/80 80%
210MB RAM, 3.7G used, idle 2%

**1c1g - 5..7G 137M** (require retesting?)
Wireguard
- speedtest 190/80, 299/67, 25%
- speedtest retest 345/122, 35%
- iperf 65/197 30%
- iperf retest 71/385
Normal iperf 130/740
Tailscale
- iperf 85/221 70%
- iperf retest 145/456 70%
- iperf retest
- jellyfin 13MB/s, 70%
- speedtest 152/151 75%
- speedtest retest 265/148 60%
V2Ray
- vmess+ws 628/131 80%
- +tls 598/130 100%

**1c1ghf**
Wireguard
- speedtest 695/122 55%
- iperf3 63/769
Normal iperf3 130/726 40%
Tailscale
- iperf3 150/642 60%
- jellyfin consistent 16MB/s
- speedtest 563/148 85%
V2Ray
- vmess+ws 696/130
- +tls 793/131 100%
## Performance
Geekbench
Unrar, 7z benchmark
## Docker
https://github.com/dominikhoebert/docker-projects
`apt update && apt upgrade` time taken, take note of storage usage
```bash
time apt update && apt upgrade
```
Time to install docker, note storage
```bash
time apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```
Docker data
```http
http://207.148.29.65:8080/api/public/dl/E_s0-8JA
```
~1min 282MB 4.4G after install
1m22s pull everything
2s uptime kuma 
6s backrest
1m11s filebrowser
5+ min for dante to start up
5s portainer
memos might crash 
Uptime Kuma seems to use too much RAM and cause docker unusable
360M used
Tailscale internal same, exit node run into slight issue
Even with xray killed, uptime-kuma still can't startup
No difference in speed/CPU of VPN software, but instability
300-350M 7.4G used 5%

```
| CONTAINER ID | NAME               | CPU % | MEM USAGE / LIMIT     | MEM % | NET I/O           | BLOCK I/O         | PIDS |
|--------------|--------------------|-------|-------------------------|--------|--------------------|--------------------|------|
| 19395ea12871 | memos              | 0.00% | 22.14MiB / 451.7MiB    | 4.90%  | 9.86kB / 14.1kB    | 96.6MB / 32.8kB    | 7    |
| 36700fb301be | gatus              | 0.02% | 13.39MiB / 451.7MiB    | 2.96%  | 5.47MB / 1.03MB    | 6.96GB / 0B        | 7    |
| a5b4e1db57a3 | docker-portainer-1 | 0.00% | 12.23MiB / 451.7MiB    | 2.71%  | 5.85kB / 126B      | 8.97GB / 799kB     | 4    |
| 7693d81c65b2 | dante              | 0.00% | 8.02MiB / 451.7MiB     | 1.77%  | 5.97kB / 538B      | 3.93MB / 16.4kB    | 20   |
| 43918afae091 | filebrowser        | 0.00% | 3.57MiB / 451.7MiB     | 0.79%  | 6.77kB / 7.64kB    | 57.1MB / 16.4kB    | 5    |
| c3db5601793c | backrest           | 0.01% | 7.89MiB / 451.7MiB     | 1.75%  | 6.22kB / 126B      | 1.92GB / 77.8kB    | 7    |

```


35s
280M 6.5G
360M after everything
500M after uptime-kuma
Added homepage, adguard-home, stirlingpdf, mealie, kavita, dozzle, nextcloud
650MB 18GB Used 15-30% CPU
tailscale exit node 126/100, CPU usage full
VMESS 500/120 +TLS 425/116 full CPU

```
1c72580969df   uptime-kuma          1.06%     143.3MiB / 954.9MiB   15.01%    405kB / 968kB
```


Pull the images first, before  `docker compose up -d`
Use existing data to make sure the app is running state rather than initializing
- UptimeKuma
- Backrest
- FileBrowser
- ~~Tailscale~~
- Portainer
- Wordpress + MySQL
Lower priority
- ~~Syncthing~~
- ~~Fireshare~~
- ~~JDownloader~~
- ~~OpenWebUI~~

Measure time to deploy, afterward, measure CPU usage.
## Results
### Performance
| Plan              | Compression Speed | Decompression Speed | MIPS |
| ----------------- | ----------------- | ------------------- | ---- |
| 1c0.5g            | 2.6 MB/s          | 31 MB/s             | 2600 |
| 1c1g (Broadwell)  | 2.3 MB/s          | 33 MB/s             | 3000 |
| 1c1g HF (Skylake) | 3.6 MB/s          | 40 MB/s             | 3500 |
### Networking

| Plan   | WG (D/U Mbps, CPU%)   | Tailscale Exit (D/U, CPU%) | Tailscale iperf (To/From, CPU%) | VMESS+WS (D/U, CPU%) | VMESS+WS+TLS (D/U, CPU%) | Jellyfin (MB/s) |
|--------|------------------------|-----------------------------|----------------------------------|-----------------------|---------------------------|-----------------|
| 1c0.5g | 303/67 @ 40%           | 191/136 @ 80%               | 120/254 @ 60%                    | 595/110 @ 65%         | 192/80 @ 80%              | 13              |
| 1c1g   | 345/122 @ 25–35%       | 265/148 @ 60–75%            | 145/456 @ 70%                    | 628/131 @ 80%         | 598/130 @ 100%            | 13              |
| 1c1ghf | 695/122 @ 55%          | 563/148 @ 85%               | 150/642 @ 60%                    | 696/130 @ —           | 793/131 @ 100%            | 16              |

The lowest tier in `ewr` shows usable performance in both Wireguard and tailscale exit node. Despite the distance, it can access local Tailscale resources at good speed possibly good for 4K remux. V2ray (Xray core) shines here providing the fastest bandwidth, however with using Caddy as TLS, the performance suffered, the same is not observed in Seattle machines even with comparable specs, it could due to distance or routes.
The basic `sea` tier offers better speed across the board, except Jellyfin, but it's still quite good. The proximity to home contribute to the increase. The deficit in V2ray Caddy TLS is not observed here. 
The high frequency `sea` tier a bit expensive but offers consistent and speedy performance. It could be due to hf CPU or premium product from Vultr uses better routes? All 3 machines are suitable for VPN and bandwidth heavy tasks.
*while V2Ray offers the best speed, it uses considerable CPU on the client compared to others, when using V2RayN tun mode (not proxy mode) which is comparable to traditional VPNs, it uses 35%+ on i7 12700K compared to ~15% on Wireguard based apps, if the network is not hostile, Tailscale is preferred, especially on battery powered devices or if electricity cost money; this is not relevant to VPS performance but something to note*
### Applications
The 1c0.5g plan was able to deploy basic Docker apps after the previous testing, such as backrest, filebrowser, portainer, gatus, memos and dante. I tried uptime kuma but it came to memory issues. When trying to deploy it, the system reached 400/450MB RAM and even commands like `docker stats; docker stop` hangs and `htop` refreshes line by line slowly. Upon stopping uptime kuma, the memory issue was resolved. Even when removing tailscale and Xray, uptime kuma could not be deployed smoothly, making it unsuitable. Even without it, under normal operation of other web apps, OOM may still occur, which affect tailscale/V2ray stability, constant RAM management may be required. However, gatus runs fine which means the VPS is still capable for monitoring.
The 1c1g plan does not have such issues. Not only the existing apps are deployed, uptime kuma deployed without problem. Additionally, dozzle, wordpress+mysql, nextcloud, mealie, dozzle, stirlingpdf, kavita, adguard-home are successfully deployed without memory issues. This shows with 1G of RAM, the VPS is way more capable, for users that wants to run applications, this plan is recommended. After these apps are running, the CPU usage went to 15-30%, tailscale/V2ray performance are affected.
