https://youtu.be/Azj8-1rdF-o
CDN accelerate web resources, such as web assets

## Cloudflare
> [!warning] REQUIRE A REAL CFable DOMAIN
> Fake SNI names or domain fronting are not possible with CloudFlare
- it's also possible to use a free one such as dpdns.org
the orange cloud on Cloudflare indicates CDN is used
![](assets/Pasted%20image%2020250418155736.png)

Must change SSL to Full (Strict) for the CF CDN to work
- go to `SSL/TLS`, then `Configure`
- under `Custom SSL/TLS`, select either `Full` or `Full (Strict)`
When using V2Ray, client is not directly connected to VPS, but to Cloudflare CDN. The endpoint is still usable even if the VPS IP is blocked.
### YX Cloudflare
To do later.
Use programs to select the best Cloudflare CDN IP.
https://github.com/XIU2/CloudflareSpeedTest/releases/tag/v2.2.5
## BBR
Traditionally, the congest control algorithm will reduce the packet sent if it detects packet loss
- however, not all packet loss is due to network congestion
Google BBR
- start at a constant speed and monitor latency
- if stable, try to increase it and measure again
	- if latency increase -> network congestion, fallback
	- if latency stable -> will keep increasing
- faster utilization of bandwidth
## Reverse CF
Servers that reverse proxy Cloudflare IPs. Usually, when we use a CDN, e.g. Cloudflare, it reverse proxy our request to the origin server.
## VPS Proxying
https://youtu.be/Vj4TGd9IaQc
From bulianglin, unlock Netflix.
Use V2Ray to redirect traffic from VPS to another one that support Netflix.
https://github.com/v2fly/domain-list-community
Domain list

Use Warp
https://developers.cloudflare.com/warp-client/get-started/linux/
- set WARP to proxy to prevent VPS disconnecting

DNS
https://github.com/myxuchangbin/dnsmasq_sniproxy_install

Netflix
Acrylic DNS (windows only)
`body="Backend not available` could likely be SNI proxy
- it should say backend not available
- on HTTPS, it's SSL protocol mismatch
REALITY
- maintain a real TLS connection to a real website
- connect to the real website every time for a connection
Why REALITY endpoint with dest of CF website become a open public reverse proxy
- when REALITY receives non REALITY traffic
- it forwards it to Cloudflare because of SNI
- which makes the REALITY endpoint reverse proxy anything that other people have used the Cloudflare CDN for
- `cdn-cgi/trace` indicate it's Cloudflare
## Accelerate VPS
Find reverse CF IP
```toml
国内反代IP：server=="cloudflare" && port=="80" && header="Forbidden" && country=="CN"
剔除CF：asn!="13335" && asn!="209242"
阿里云：server=="cloudflare" && asn=="45102"
甲骨文韩国：server=="cloudflare" && asn=="31898" && country=="KR"
搬瓦工：server=="cloudflare" && asn=="25820"
```
Bulianglin's v2ray conversion code
```
view-source:https://bulianglin.com/archives/cdn.html
```

Port Forwarding
- uses dokodemo-door
- forward all traffic incoming to the port into the destination port
GOST Tunnel
```bash
./gost -L tcp://:src-port/dest-ip:dest-port
```
Clash chain proxying
Proxy blocked API
```js
export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    url.hostname = 'api.openai.com'
    return fetch(new Request(url, request));
  },
};
```
Boilerplate code for proxying additional paths
```js
export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    if (pathname.startsWith("/path1")) {
      url.hostname = "reverseproxy.yourdomain.tld";
      return fetch(new Request(url.toString(), request));
    }
    url.hostname = 'api.openai.com'
    return fetch(new Request(url, request));
  },
};
```