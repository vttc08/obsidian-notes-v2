First I apologize the post is very long because it's complex topic with many options. If your Wireguard/OpenVPN works great, you don't need this.

This is a post about inspired by this [post](https://www.reddit.com/r/selfhosted/comments/1pmmbl4/i_need_to_switch_from_wireguardany_recommendations/) and countless other posts in r/Tailscale and I hope to provide a guide that can help others and be the guide to be referenced in future posts when others have the same question.

When it comes to remote access, VPNs like Wireguard, OpenVPN and Tailscale are everyone's "default" choice. While functional, they're easily detected and blocked by Deep Packet Inspection (DPI), rendering your homelab inaccessible. Tailscale faces different blocking mechanisms (SNI poisoning) not covered here. PCAP analysis shows Wireguard traffic is clearly identified rather than appearing as UDP, with obvious handshake signatures trivial for DPI. While obfuscation exists, it adds overhead, increases battery drain, and has limited mobile client support.

**What not to do** when Wireguard fails and **why** these are futile: "jUsT uSe PoRt 443"" makes things worse—Wireguard uses UDP, and UDP443 differs from TCP443 (HTTPS). UDP443 is for QUIC/HTTP3, the "most hated" protocol, especially in Canada [1]. Your VPN that failed L7 now gets dropped at L4, before DPI even activates. Port 53? DNS poisoning is standard on public Wi-Fi. Since DNS is plaintext, adversaries can redirect it to middleboxes that return poisoned results. DPI operates at application level—port changes won't work for any protocol including OpenVPN without obfuscation.

The prereq is that **you must port forward a TCP port on your router**. Hence, it's incompatible with CG-NAT, But people are more interested, I can make a part two guide which will work with CGNAT, if requested.

We will use V2Ray for remote access. This is used in China to circumvent the GFW. Most westerners probably aren't aware of this. (Which is also why I'm skeptical posting it, if you are currently using V2Ray at school, work or simply accessing your homelab and you have concerns about your long-term viability, you can DM me to remove this). Even in China, using proxy to access homelab resource is rarely talked because they only use it to access western content. Also Wireguard/OpenVPN is freely usable within China. As we go deeper to documentation and configuration, we can see selfhosters aren't relevant and the configurations are all tailored to Chinese use

Brief introduction to V2Ray. The details and its histories are complex. You'll commonly hear configuration like (A+B+C).Protocol, transport and encryption.
- **Protocol**: How client/server communicate (VLESS, VMess, Shadowsocks)
- **Transport**: Data delivery method (TCP, UDP, WebSocket)  
- **Encryption**: Obfuscation layer (TLS, built-in encryption)

This modularity lets you mix components. Unlike traditional VPNs, you customize based on your bypass needs.

I'll use **VLESS+WS+TLS**: VLESS is a lightweight plaintext protocol requiring TLS for encryption and obfuscation, making traffic appear as normal HTTPS browsing. While V2Ray typically uses TCP (requiring the entire port 443), WebSocket (WS) enables path-specific routing. Your reverse proxy handles both WS and TLS, routing port 443 requests to V2Ray by domain/path like any web service.

For setup, I will use Nginx Proxy Manager, but as long as your reverse proxy support WebSocket, it will work. For the VLESS+WS part, I will use [3X-UI](https://github.com/MHSanaei/3x-ui), a simple click GUI; but if you prefer copy paste, I have ChatGPT based config. 

The settings on 3x-UI is outlined in Github. The panel will warn you it's insecure, but that's fine since we only access it in our local network.

**Important: You must change `Xray Configs` > `Basics` > `Basic Routing` > `Blocked IPs` and uncheck LAN** . As we are specifically configuring V2Ray to access LAN resources.

Once done, head into inbounds. Click `Add Inbound`
- Remark: easy to remember name
- Protocol: VLESS
- Port: anything you want, just remember it later
- Transmission: WebSocket
- Path: choose anything you want
- External Proxy: enable (this is only for convenience, you can edit this later)
	- The host is the domain you plan on using and port should be 443
- Leave everything default

Since we are using TLS443, you'll need to use a domain and have DNS record point to your home IP.  It's possible to use a self-signed certs which makes it even better, but that's more setup and there are nuances with certs, CA, Android vs Windows and `allowInsecure`, not relevant to this guide. I will only explain in comments when asked.

Onto Nginx Proxy Manager (or Caddy/Traefik). This is the same as proxying any other web services, and there are plenty of YouTube tutorial on this topic. For NPM
- you must add `Websockets Support`
- Forward Hostname/IP and Port: you can set this to any existing services (e.g. Jellyfin) you want, this will serve as a fronting page against active probing
- Custom Location > `Add Location`
	- put the location and the forward port to what you defined in 3x-UI
By now, your server will run on port 80, HTTP, and it already capable of most public Wi-Fi evasion. If you don't want to go further, I suggest changing V2Ray protocol to VMess or SS, since both VLESS and HTTP/WS are plaintext. Now onto TLS.
- under SSL, choose a certificate you already have (e.g. a wildcard one through DNS challenge) or request a new one from LetsEncrypt

The server is setup, now onto the client. On iOS, there is ShadowRocket (SR) (paid), there should be free one available but I haven't used these. On Android, plenty of options. It can get overwhelming, so I will only explain SR and V2RayNG

V2RayNG (Android) - require sideloading
On the main interface, click the + icon, and `Import from QRcode`
On your 3x-UI inbounds, click the + icon on your newly created endpoint to expand it, the click the QR Code icon. Use your camera to scan it.
If you skipped the external proxy step in 3X-UI
- click the triple circle icon next to your imported endpoint then Edit
- the address is probably your private IP, change it to your domain and change the port to 443
- add `ws host` as your domain
- scroll down to TLS, select `tls` from the dropdown
- set the `SNI` as your domain
You'll also need to configure routing. Click the hamburger menu to expand it and select `Routing settings`
By default, there are already many rules populated and these are in Chinese. Click the edit icon, then the recycle bin icon to delete all of these. There are many ways you can configure routing and it gets deeps, I'll show you a Tailscale like experience.
- Set default routing to direct, so it does not go through VPN
	- click the plus icon, add a remark
	- leave everything the same and for port, enter 0-65535, set `outboundTag` to direct
- Proxy LAN traffic 
	- `ip`: enter your LAN subnet range, e.g. `192.168.0.1/24`
	- `outboundTag`: proxy
- Unlike L3 VPN, since V2Ray is a proxy, the split tunneling can be based on domains
	- under `domain`, you can enter list of domains, or even `geosite:category-ddns`, this will proxy all dynamic DNS websites, for other categories [here](https://github.com/v2fly/domain-list-community)
Rules on the bottom of the screen will be evaluated last, so your proxy rules must be above the final direct rule to overwrite it.
- Optional: I like to have a rule that proxy everything that's on top of all direct all, but have it disable, and only enable it when a site is blocked, this is similar to Tailscale Exit Node
	- same as direct, but set `outboundTag` to proxy

iOS SR - paid
Follows similar principle to Android
On the top-left corner, click the scan icon to import your config.
Similarly, you can click the info icon to edit it.
SR require additional setup for route LAN traffic
- on the bottom bar, click `Config`, then  `default.conf`, `Edit Config`
- Under General
	- `Skip Proxy`: remove the part where it's your subnet e.g. 192,,172,10
	- do the same for `Tun Excluded Routes`
- Under Rule, this is where you declare routing
	- click the add button on the top right
		- Type: `IP-CIDR`, enter your LAN subnet range
		- Policy: Proxy
	- by default, everything is proxied, so you can use whitelist mode, where popular sites like Google, YouTube, Amazon to have direct policy
		- unfortunately, SR don't support geosite, so the config can be tedious

Now on both clients, you can connect to your proxy and access your local network privately from any hotel, malls where Tailscale/Wireguard fail. To adversaries, traffic appears as regular HTTPS to your Jellyfin domain. However, compared to Tailscale, there are trade-offs:

**Disadvantages:**
- **Battery drain**: V2Ray TUN mode processes every packet and performs DPI/DNS hijacking for split routing, even for direct traffic. Despite V2Ray's efficiency operating above the network layer, this overhead negates potential gains. Additionally, Tailscale put heavy efficiency optimization on their clients. In my devices, battery usage is similar to Tailscale.
- **DNS**: Unlike Tailscale MagicDNS, local DNS through PiHole doesn't work—you must use hardcoded LAN IP.
- **Documentation complexity**: Tailscale has beginner-friendly English docs. V2Ray's ecosystem (cores, panels, clients) are independent projects with inconsistent, often poorly translated documentation. Sometimes you may wonder what an option do or why it doesn't work, only to find nothing.
- **Advanced configuration difficulty**: While this basic setup may seem complex, it represents ~5% of V2Ray's capabilities. Further optimization for resiliency and routing becomes exponentially more challenging.

You may also criticize why bother so much with public Wi-Fi, "iT's ThEiR nEtWoRk, ThEiR rUlEs", just use your data. Firstly, you must have data, which isn't always the case (e.g. international travel, cruise ship, airplane, zero coverage, or simply limited plan). Secondly, public Wi-Fi can be faster, more stable, especially in poor coverage areas. And responses like that is why random Canadian malls have internet policy that makes the authoritarian Chinese GFW looks like complete internet freedom*, and it'll continue to get worse, because "just use data", 99% of people just use Google anyway, Immich is overrated /s.

Overall, after almost a year of usage, I would still prefer Tailscale over it (thank you proxyt), but V2Ray never failed me (except the time when my mom accidentally bumped router WAN cable which will kill Tailscale too). I hope this guide helps others who wants resilient remote access that's actually available everywhere.

