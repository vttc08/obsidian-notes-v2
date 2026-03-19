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

