First I apologize if the post is very long because it's complex topic with many options. If your Wireguard/OpenVPN works great, you don't need this.

This is a post about inspired by this [post](https://www.reddit.com/r/selfhosted/comments/1pmmbl4/i_need_to_switch_from_wireguardany_recommendations/) and countless other posts in r/Tailscale and I hope to provide a guide that can help others and be the guide to be referenced in future posts when others have the same question. By the end, you'll end up with a self-hosted remote access solution that is
- resistant to DPI and accessible regardless which shopping mall you visit
- coexist with existing reverse proxy setups (Traefik, Nginx, Caddy), you don't need to free up port 443
- split routing (Tailscale-like) configuration that works on iOS and Android clients

Note: **you must port forward a TCP port (443) on your router**. Hence, it's incompatible with CG-NAT, But people are interested, I can make a part two guide which will work with CGNAT, if requested.

When it comes to remote access, VPNs like Wireguard, OpenVPN and Tailscale are everyone's "default" choice. While functional, they're easily detected and blocked by Deep Packet Inspection (DPI), rendering your homelab useless. Tailscale faces different blocking mechanisms (SNI poisoning) not covered here. PCAP analysis shows Wireguard traffic is clearly identified rather than appearing as UDP, with obvious handshake signatures trivial for DPI. While obfuscation exists, it adds overhead, increases battery drain, and has limited mobile support.

**What not to do** when Wireguard fails and **why** these are futile: "jUsT uSe PoRt 443"" makes things worse—Wireguard uses UDP, and UDP443 differs from TCP443 (HTTPS). UDP443 or QUIC or HTTP3, the "most hated" protocol, especially in Canada [1]. Your VPN that failed L7 now gets dropped at L4, before DPI even activates. Port 53? DNS poisoning is standard on public Wi-Fi. Since DNS is plaintext, adversaries can redirect it to middleboxes that return poisoned results.

We will use V2Ray for remote access. This is used in China to circumvent the trivial GFW. Most westerners probably aren't aware of this. (Which is also why I'm skeptical posting it, if you are currently using V2Ray at school, work or and you have concerns about your long-term viability, you can let me know). Even in China, using proxy to access homelab resource is rarely talked because they only use it to access western content. Also Wireguard/OpenVPN is freely usable within China. As we go deeper to documentation and configuration, we can see selfhosters aren't relevant and the configurations are all tailored to Chinese use.

Brief introduction to V2Ray. The details and its histories are complex. You'll commonly hear configuration like (A+B+C). Protocol, transport and encryption. 
- **Protocol**: How client/server communicate (VLESS, VMess, Shadowsocks)
- **Transport**: Data delivery method (TCP, UDP, WebSocket)  
- **Encryption**: Obfuscation layer (TLS, built-in encryption)

This modularity lets you mix components. Unlike traditional VPNs, you customize based on your needs.

I'll use **VLESS+WS+TLS**: VLESS is a lightweight plaintext protocol requiring TLS for encryption and obfuscation, making traffic appear as normal HTTPS browsing. While V2Ray typically uses TCP (requiring the entire port 443), WebSocket (WS) enables path-specific routing. Your reverse proxy handles both WS and TLS, routing port 443 requests to V2Ray by domain/path like any web service.

The setup and the corresponding images are long so I'll post it on a Github Gist. The setup uses Nginx Proxy Manager and 3X-UI.

You'll need a domain or DDNS that has a DNS record pointing to your home's public IP. It's possible to use a self-signed certs which makes it better, but that's more setup and there are nuances with certs, CA, Android vs Windows and `allowInsecure`, not relevant to this guide. I will only explain more when asked.

**Disadvantages:**
- **Battery drain**: V2Ray TUN mode processes every packet and performs DPI/DNS hijacking for split routing, even for direct traffic. Despite operating above the network layer, this overhead negates potential gains. Additionally, Tailscale put heavy efficiency optimization on their clients. In my devices, battery usage is similar.
- **Gaming/Latency**: The overhead of TCP/TLS proxy adds latency which can adversely affect gaming or real-time traffic, especially with more hops. A Chinese YouTuber found [Wireguard results 30ms in games while VLESS has 300ms](https://www.youtube.com/watch?v=xTxCdOrwYXU). In my testing, using mobile data in poor reception, Moonlight constantly stutters at 5 Mbps, despite Speedtest shows 20M+, while TS/WG have no issues; however, gamestreaming over V2Ray in good WiFi is fine.
- **DNS**: Unlike Tailscale MagicDNS, local DNS through PiHole/Adguard doesn't work—you must use hardcoded LAN IP.
- **Documentation complexity**: Tailscale has beginner-friendly English docs. V2Ray's ecosystem (cores, panels, clients) are independent projects with inconsistent, often poorly translated documentation.
- **Advanced configuration difficulty**: While this basic setup may seem complex, it represents ~5% of V2Ray's capabilities. Further optimization for resiliency and routing becomes exponentially more challenging.

You may also criticize why bother so much with public Wi-Fi, "iT's ThEiR nEtWoRk, ThEiR rUlEs", just use your data. Firstly, you must have data, which isn't always the case (e.g. international travel, cruise ship, airplane, zero coverage, or simply limited plan). Secondly, public Wi-Fi can be faster, more stable, especially in poor coverage areas. And responses like that is why random Canadian malls have internet policy that makes the Chinese GFW looks like complete internet freedom*, and it'll continue to get worse, because "just use data", 99% of people use Google anyway, Immich is overrated /s.

Overall, after almost a year of usage, I would still prefer Tailscale over it, sadly [proxyt](https://github.com/jaxxstorm/proxyt) doesn't work anymore, but V2Ray never failed me (except the time when my mom accidentally bumped router WAN cable which will kill Tailscale too). I hope this guide helps others who wants resilient remote access that's actually available everywhere.

# Part 2
Here's the part 2 of hosting a resilient remote access VPN protocol, so you can access your self-hosted streaming, photos, files wherever you go, without issues. And this time, I'll tailor to those who are behind a CG-NAT, the prime use case for Tailscale (which isn't censorship resilient).

> Note: You'll need to spend some money on a VPS server, it can be around $1-5/month. If you're lucky, Oracle Cloud free tier is permanently free and I've used it for years without issues, you can upgrade to a Pay-as-you-go account for up to 4c 24GB RAM instance.

I would've said CloudFlare tunnel is the golden solution, it's advantages cannot be understated
- it's free (only credit card required) and seemingly unlimited
- CloudFlare has the fastest connectivity to basically everything, while VPS depends on location and ISP routing; CF has datacenter around the world and best peering with ISPs
- [ECH](https://developers.cloudflare.com/ssl/edge-certificates/ech/) (encrypted client hello) supported by default, basically if working, adversaries will see you're visiting `cloudflare-ech.com`, and you can use any cfable domains (even the free `dpdns.org`)
It seems to good to be true, but doing this is against their TOS. They've already started cracking down on streaming over tunnels, so this will probably result in account termination. Use at your own risk. Which is why I will use a VPS, it's slower, higher latency, but you can rest easy without account termination.

When using a VPS, we just move the entrypoint (Nginx on port 443) from home to VPS because it has a public IP and connect your VPS to your home LAN. You should also harden your VPS, e.g. SSH keys auth only and firewalls. You'll only need to allow 3 ports, leave everything closed
- `22/tcp` - SSH management (configure to accept key only)
- `443/tcp` - HTTPS port for Nginx/V2Ray (you can optionally enable 80)
- `41641/udp` - Tailscale Wireguard (if you use other mesh networking, consult their docs)

First we will use Tailscale to connect your CG-NATTED home to the VPS. You'll wonder why not use Tailscale directly, the obvious answer is Tailscale can be blocked, whereas your home internet (Telus, Shaw) has unfettered access to the internet where Tailscale can run. Like mentioned in part 1, if Tailscale works great for you, you don't need this guide.

Installation (one-line script): https://tailscale.com/download/linux

You'll install on both the VPS and your home server. An nice-to-have on your home Tailscale instance is [subnet router](https://tailscale.com/docs/features/subnet-routers). Explained simply, when you connect to Tailscale in a mall, instead of typing `100.x.y.z`, you type `192.168.x.y` just like how you'd access your services at home, and you can access your entire LAN subnet, so you only install Tailscale on your server, but you can access your PC, smart fridge and everything. It might also be helpful to mark your home as an [exit node](https://tailscale.com/kb/1103/exit-nodes) (for Tailscale use). Here is the command I'd run. You'll also need to enable [IP forwarding](https://tailscale.com/docs/features/subnet-routers#enable-ip-forwarding)

```bash
sudo tailscale up --advertise-exit-node --advertise-subnet-routes=10.10.120.0/24
```

On the VPS, you'll need to accept the advertised routes. Note: you might also need to accept it in the admin console. Lastly, forward the port 41641, to ensure there's no NAT or firewall that prevent our VPS making a direct and fastest connection to your home server without relay.
```bash
sudo tailscale up --advertise-exit-node --accept-routes
```
- this makes your VPS an exit node too, which you can use as a personal VPN (albeit not a good one)

To verify, just ping a host in your LAN subnet from your VPS, if that works, you'll basically done, just follow the same steps in part 1 regarding Nginx Proxy Manager (or other reverse proxy) setup and everything should work. But there are some nuances and there are several ways you can approach the VPS setup all with different outcomes. To understand everything, I will use a network topology.

## Tailscale Bypass
Recently I've seen a tons of posts in this subreddit with the same topic, how can I connect to tailscale if network blocks it? I want to cut through the unhelpful noise and provide a simple, reputable guide to help beginners looking to selfhost and assist  with the ability to turn on your thermostat remotely (so you arrive home comfortable). So I and others no longer have to repeat my instruction for the 15th time and I can give them this Reddit link. I believe this is important because Tailscale seems to be the "default" solution people recommend for remote access without second thoughts.

Note. I will try to focus on Tailscale ecosystem of tools rather than other tools. 

Here's a reality check. Tailscale is not design for hostile regimes, it's trivial to get blocked within minutes. Which is why Amnezia or VLESS are preferred. I cannot guarantee connectivity in every network, you're on your own and needs how to troubleshoot.

Also the post will be primarily be about Android (some iOS), if you have a PC, unlike restricted dumbed down phones, your possibilities are endless.

What happens
You authenticate with controlplane.tailscale.com via HTTPS to get keys and peer info. Then you contact STUN and DERP server so they know your public IP and port to relay on your other hosts. You'll also connect via HTTPS to DERP, which temporarily relays your traffic while you and other try UDP hole punching until you can establish a direct connection.

HTTPS is actually not entirely encrypted, you send SNI/ClientHello (typically the domain name) in plaintext. It's like a license plate on a box truck, camera can't see the cargo but it sees the plate clearly. And in most public Wi-Fi (grocery store), the controlplane SNI gets poisoned, and tailscale is useless. There are other blockages too like DERP and STUN but these are rare. So your objective, is likely just to un-brick the controlplane.

Preparation 
On your home Wi-Fi, if you can, ~~enable UPnP/NAT-PMP~~ or forward UDP `41641` (Edit: just port forward, UPnP can be unreliable especially your house has multiple Tailscale devices). This can improve direct connectivity. Even if you are behind CG-NAT, direct paths may still work on some Full-Cone ISP networks. For best results, assume all other networks are symmetric/Hard NAT and optimize for that. Direct connections give full speed and works even when Tailscale or STUN are blocked, SSH, HA, Jellyfin, Arrs never drop a beat. 

Methods
Mobile Data Switch (iOS and Android)
Connect to Tailscale on your iPhone or Android over mobile data, then switch to Wi-Fi. In many cases, the connection will persist even if you later turn off mobile data. This is why port forwarding helps: once a hole is punched, the home network can accept traffic anywhere. With a port-restricted cone (Easy) NAT, a change in source IP usually requires new hole punching; if the Wi-Fi blocks STUN or uses a hard NAT (common for firewalls), GGs.

This is usually the fastest and most reliable method, and [iOS automations](https://www.reddit.com/r/Tailscale/comments/1oj5j4c/creates_a_siri_shortcut_on_my_iphone_to_bypass_my/) exist for it. The main drawback is that it requires mobile data, so it is not usable without a phone plan, in poor coverage, or in situations like international travel or [cruises](https://www.reddit.com/r/Tailscale/comments/1i6wjfn/ncl_cruise_ship_with_starlink_blocking_tailscale/).

ProxyT (Android and iOS)
This[ community project](https://proxyt.io/#/) forwards HTTPS/WSS traffic to the Tailscale control plane so you can use your own domain instead of Tailscale's.

But Tailscale `/ts2021` uses a [non-standard WebSocket `POST`](https://proxyt.io/#/?id=deployment-note), basically zero CDN flexibility: self-hosted reverse proxies like Nginx work, but CloudFront, Cloudflare Tunnel/Workers, and Railway generally do not. Tailscale Funnel can will also work. I wish Tailscale uses standard WebSocket for CDN compatibility but I can only dream.

Setup is simple:  add a custom coordination server, enter your `.ts.net` domain, and connect. It works on both Android and iOS. A dedicated domain is recommended, but domains can be blocked.

Basic setup with Tailscale Funnels: https://proxyt.io/#/hosting?id=behind-tailscale-funnel
Here's also a [full copy-paste Docker compose](https://gist.github.com/vttc08/8f5b3bda901da2c7adaee88c2551f498) with uses Tailscale as a sidecar, since if you run Tailscale funnel on the host, you're limited to 1 funnel per host.

Other VPN (Android only)
Unlike PCs (where VPNs/proxies/DNS can be chained), mobile OSes allow only one active VPN at a time. This method is **Android-only**, I could not reproduce it on iOS (Shadowrocket + Tailscale).

You need a second VPN. In my opinion, most commercial VPNs (Proton, Nord, Surfshark, PIA, etc.) are useless. [**NekoBox**](https://github.com/MatsuriDayo/NekoBoxForAndroid) works. You’ll need a **V2Ray** proxy (self-hosted or ask your Chinese friend for an "airport"). It does not need LAN access, so latency/location/speed are less important. A free-tier VPS (Oracle/AWS/DigitalOcean) is enough. You can also use my [`insta-v2ray`](https://github.com/vttc08/insta-v2ray) project with free tunnels (Cloudflare, Pinggy).

Flow:
1. Connect NekoBox.
2. Open Tailscale (it will usually get stuck).
3. Immediately switch back to NekoBox, reconnect, then return to Tailscale.

If needed: force-stop Tailscale, re-open so it doesn't auto connect, tap **Connect**, immediately connect NekoBox, then switch back to Tailscale.

This is finicky (often 3–5 tries), Android-only, I don't recommend it. Other VPN apps may or may not work. With a borked controlplane, many odd behaviors occur, such as unable to get direct connection (unless port-forwarded), constant captive portal warning, out of sync with tailnet.

Safety
You can turn off your thermostat (or turn it on) and you arrive home with AC on full tilt, now what. 

Run a DNS server (Pi-hole, AdGuard, or Technitium) and plug it into Tailscale MagicDNS. Add Split-DNS so your public domains resolve to LAN/Tailscale IPs. You might already do this for hairpin issues or bypass router on LAN. Now in Tailscale, this keeps your services working if your external domain gets blocked, without forcing exit node. You may argue exit node is necessary for public Wi-Fi privacy, but with weak home uplink and high latency (rural internet or DERP relay), normal browsing can suffer.

If you prefer IP-only access, disable Tailscale DNS (Settings > DNS). You’ll then use the Wi-Fi network DNS, which blends in better but is worse for privacy. A telltale sign of VPN usage is DNS traffic suddenly disappearing. I'm also exploring utilizing DNS poisoning to automate proxy rule creation (which was a success) by disabling MagicDNS.

## Tailscale Part 2
You may have seen my previous guide on how to use Tailscale when the network blocks it. I wanted the follow-up to be about utilizing DNS poisoning from hostile networks to automate split tunneling, but there are still some rough edges, and it's already September. So instead, I'll provide some optional enhancements and updates to my previous post.

Given even popular YouTuber TechQuickie LTT mentioned Tailscale, it is the "default" solution for easy remote access, but it's also important to highlights its limitations and workarounds to ensure reliability. And since not everyone search Reddit and many response are unhelpful, users will continue to ask the same, and I will provide updated information.

Disclaimer: I'm only making this post because I want to help others and provide the right resources, I might not be actually using/maintaining these setups, given my network situation differs from yours, I cannot help everyone.

iOS Automations
After re-reading my previous post, the post I linked to iOS automation was deleted. So I created my own automation to Wi-Fi cycle. I've also added captive portal detection and optional sleep, since iOS do not wait for Wi-Fi or Tailscale to connect successfully before next step.

To use it, you can create an automation, trigger: when your iPad joins a list of Wi-Fi network, action: run the shortcut Tailscale. I daily an Android phone so I'm not familiar with iOS stuff, feel free to tweak and reshare it.

Controlplane and DERP
Last time I mentioned the controlplane gets blocked by SNI poisoning, but there are other moving pieces such as DERP (relaying traffic), STUN (getting your IP/port) and the individual Wireguard connections. My method focuses on the controlplane only as that's the only problem I faced in my situation. Suggestions like "just use Headscale" might be exactly what you need, or useless. Headscale is just the controlplane, you'll still be using Tailscale's DERP/STUN servers. I didn't need to selfhost Headscale or DERP but I found [this excellent tutorial](https://pcmike.net/oci_ts) about DERP. There is also [tailscale-awg](https://github.com/LiuTangLei/AwgScale) which uses AmneziaWG obfuscation with Tailscale controlplane, however, only possible on Android.

Ports and Port Forwarding
It's common knowledge Tailscale runs on port 41641 by default, but you can change by editing the file `/etc/default/tailscaled` and restarting the `tailscaled` service.

I mentioned port forward instead of using NAT-PMP (NP), but in my case with Telus, it seems NP rules takes higher precedence than manual port forwards, if I set Tailscale on a UDP port that I already use, the router would invalidate my port forward and break my existing service until Tailscale is stopped. So my advice to port forward is useless and my setup is held together by NP duct tapes. But if you have a **real** router, port forwarding is the way. 

I haven't verified whether port forwarding or DMZ helps behind CG-NAT since I'm not behind one. A friend was recently placed behind CG-NAT, so maybe I can test it. My knowledge comes from this video where Bulianglin was able to host web service behind CG-NAT, granted his ISP uses full-cone NAT. If you're on mobile/5G home internet, this wouldn't work as they usually use the symmetric/hard NAT.

ProxyT Deployment
I've used Tailscale funnel to deploy ProxyT last time. Since the controlplane uses non-standard POST WebSocket which eliminates many CDN options. Proxyt developer recommended Railway which stopped working, a user found render.com works, I've tried it and successfully deployed it. So this could be a free option.

But cold start is real, taking around 15-20s, higher than Railway. So you could be waiting for long time even in normal network. You might have to consider some keepalive solution, like Uptime Kuma with scheduled maintenance window, keep in mind render.com only give 750 free hours a month. 

NekoBox
Last time I mentioned on Android, you can use 3rd party VPN to rescue Tailscale controlplane.

[NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid[NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid) is an Android client using the sing-box core. You need to sideload the APK from GitHub, so it might not be suitable for Chromebooks. Technically NekoBox uses an older sing-box core and isn't updated, but **it works** and provides a GUI. All you need is any V2Ray node even random free ones you found on internet. I'm using my old project insta-v2ray, the node does not need access to your home network (it probably shouldn't) or fast with low latency, it's sole purpose is to access the Tailscale controlplane.

For Nekobox related configuration, requirements and a screencast of the flow, I'm posting it on a separate Gist.

Sing-box alternative Tailscale client
One of the changes in proxy tool landscape after I posted the last guide is sing-box now supports Tailscale, allowing you to scientifically access internet and your homelab simultaneously, bypassing mobile limitation of one active VPN. In addition, offering detour for Tailscale, which connects to the controlplane via a proxy, it's like sing-box devs know exactly what we need.

Sing-box app is available for both iOS and Android, but it's configuration is entirely JSON, the GUI is only for adding the configuration, either a local file or remote URL. The configuration is long so I'm posting it in a separate Gist.

I've configured it everything do not go through the proxy except for tailscale related domains and DNS is intentionally not proxied, you can adjust your routing/DNS rules. Sing-box rules are powerful and complex, I cannot cover everything.

Sing-box is far from flawless, there are many bugs and complex documentation which changes quickly. Some issues like randomly unable to connect to Tailscale or failing to establish direct connection is just there with no fixes. I wouldn't count this as production-ready, but at least sing-box+TS works when TS itself doesn't.

Shadowrocket on iOS also added Tailscale support. Unfortunately, it doesn't support proxying the control plane, so it fails. If the developer adds control-plane detouring in the future, it could be a good GUI alternative.

Suggestion for Tailscale
Tailscale doesn't need to maintain/rotate controlplane domains or obfuscate the Wireguard connection (DERP sort of do by encapsulating WG over TLS). Community projects like sing-box or tailscale-awg helps in some way. But if the `/ts2021` protocol use standard GET instead of POST for WS upgrade, this makes it possible for users to deploy on many free CDNs, serverless/PaaS platforms rather than specific ones or a paid VPS.

Similarly if DERP (or selfhosted DERP) can run over WebSocket, this makes it CDN friendly as well, decreasing the barrier to hosting. 

