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
Recently I've seen a tons of posts in this subreddit with the same topic, how can I connect to tailscale if network blocks it? I want to cut through the unhelpful noise and provide a simple, reputable guide and be the helping hand for beginners looking to selfhost and assist you with the ability to turn on your thermostat remotely (so you arrive home comfortable). So I and others no longer have to repeat my instruction for the 15th time and give them this Reddit post link.

Note. I will try to focus on Tailscale ecosystem of tools rather than other tools. 

Here's a reality check. Tailscale is not design for hostile regimes, it's trivial to get blocked within minutes. Which is why Amnezia or VLESS are preferred. I cannot guarantee connectivity in every network, you face the risks and consequences if you proceed.

Also the post will be primarily be about Android (some iOS), if you have a PC, unlike restricted dumbed down phones, you possibilities are endless.

What happens
You authenticate with controlplane.tailscale.com via HTTPS to get keys and network info. Then you contact STUN and DERP server so they know your public IP and port to relay on your other hosts. You'll also connect via HTTPS to DERP, which temporarily relays your traffic while you and other try UDP hole punching until you can establish a direct connection, UDP via Wireguard.

HTTPS is actually not entirely encrypted, you send SNI/ClientHello (typically the domain name) in plaintext. It's like a license plate on a box truck, camera can't see the cargo but it sees the plate in bold text, clearly. 

And in most public Wi-Fi (grocery store), the controlplane SNI gets poisoned, and tailscale is useless. There are other blockages too like DERP and STUN but these are rare. So your objective, is likely just to un-brick the controlplane.

Preparation 
On your home Wi-Fi, if you can (not CG-NAT), enable UPnP, NAT-PMP. Or port forward UDP WAN 41641 -> Tailscale device 41641. This basically puts you in No NAT (directly on internet). Even in CG-NAT, if your ISP uses Full-Cone NAT, you can still get direct connectivity. If you want best connectivity, you should assume every network other than yours is Hard NAT (symmetric) and you change your network around it, and Hard NAT only works with No NAT. I can get direct full speed connectivity on places that explicitly blocks tailscale and STUN (allegedly), Jellyfin 4K, HA, SSH, Arrs never drop a beat. 

Methods
Mobile Data Switch (iOS and Android)
Self explanatory. Connect to tailscale on your iPhone/Android via data. Then join the Wi-Fi, your tailscale connection will persist. And chances are even if you turn off mobile data, your connection still works. This is also why I emphasized port forwarding or having Full Cone. With FCN or No NAT, once a port is punched, anyone on the internet can send data. So your src switching between from data:12345 to regime:12345, your home internet will accept both. Whereas a traditional port-restricted cone, the IP is different hence new hole punching is required. And suppose the Wi-Fi blocks STUN or uses Hard NAT (common for firewalls), ggs. 

This is probably the quickest and most reliable method, and there are even automations for it on iOS. In addition to being cross-platform. However, the glaring downside of this is that: you must have mobile data to begin with. Which is not possible if you don't have a phone plan, limited coverage, international travel or cruise ship, which is why other methods are needed.

Other VPN (Android only)
Unlike PC where multiple VPN, proxies, DNS services can be chained, only 1 VPN connection can be active for mobile OS. And this method ONLY works on Android, I was unable to replicate the same behavior with iOS Shadowrocket + Tailscale..

You need to have another VPN ready. Based on my experience, I think most commercial VPNs like Proton, Nord, Surfshark, PIA etc.. are pre-much useless. The working one I tried is NekoBox. You'll need to self-host a V2Ray proxy (or ask your Chinese friend for an "airport"). The proxy simply need to connect to internet as we won't be using it for LAN access, so latency, location and speed won't matter. A free-tier Oracle Cloud, AWS, DigitalOcean will suffice. You can also try my project insta-v2ray which can use free tunnels like Cloudflare, Pinggy to host it.

Connect to Nekobox. Then open the Tailscale app, it will be stuck, now immediately, switch back to NekoBox, reconnect then switch back to Tailscale. You'll find Tailscale can connect. But this is finnicky, you can try to force-stop Tailscale, ensure TS is at stopped state, click connect, immediately connect to NekoBox and switch back. Once again, the benefit of FCN and NN is here, a single IP/port anyone can connect to. It can take 3 or 5 tries and Android only which is why I don't recommend this. If you use other VPN, it may or may not work.

ProxyT (Android and iOS)
This is a community project which simply forward all HTTPS/WSS requests to controlplane, and let you use your own domains to bypass the Tailscale one. But Tailscale uses a non-standard WebSocket POST, so compared to V2Ray/WS, you have zero flexibility or CDN friendliness (I wish Tailscale changes the ts2021 protocol but I can only dream). Only specific reverse proxies like your own Nginx will work. CloudFront, Cloudflare Tunnels, Workers, Railway all fails. Since I use DDNS, I rely on Tailscale funnel, which also works. 

To use it, you specify another coordination server and input your .ts.net domain there and watch Tailscale connects instantly. And it works on both Android and iOS. Also recommended you buy a dedicated domain (but domains can be blocked).

Safety
Now that you can turn off your thermostat (or turn it on) and you arrive home with AC on full tilt, now what. Here are some additional "stuff".

Setup a DNS server and add it to Tailscale MagicDNS (Pihole, Adguard, Technitium). Add A records for your externally hosted domains (Split-DNS) to a LAN address. You might already be doing this at home to fix Hairpin NAT or bypass your router. But it's esp useful for Tailscale, because if your domain is blocked, your client won't know, since it resolves it to a Tailscale/Local IP and traffic towards your LAN are routed through Tailscale, no exit node needed. While you may argue exit node on public Wi-Fi is necessary for privacy, but having slow (rural internet) or DERP relay will affect internet browsing.

If you don't use DNS, just IP. You can disable Tailscale DNS. settings > DNS settings. Now you'll use DNS server of your Wi-Fi. Terrible for privacy but helps you blend in more. One telltale sign of VPN is that DNS queries completely disappear. I am also exploring using DNS poisoning as a mechanism for automated split-tunneling rule.

Tailscale may bug you about [network require captive portal](https://tailscale.com/docs/integrations/captive-portals#how-tailscale-detects-captive-portals), you can safely ignore as long as your ping works and you don't need to re-login. 

The last tip is I encourage you to explore AI, especially when the adversaries may be adamant or against AI (not always true, but r/selfhosted seems to dislike AI/vibecoding). AI is extremely fast at processing, summarizing information. You can ask AI to generate one-shot CloudInit to deploy VPN server, run copy-pastable Python/Bash tester scripts you can run on your phone (Termux/iSH), or even dump entire public documentation of firewall configuration to figure out how it works. Overall, utilize AI to your advantage and move faster than the adversary, build a strong defense before they think about bullying you.