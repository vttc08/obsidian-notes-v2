V2RayN - Windows
Install, portable application
https://github.com/2dust/v2rayN/releases
Everything is extracted in a folder
The geoIP and site data are located in `/bin`

Subscriptions: list of supported endpoints

Server Side
[3x-ui](3x-ui.md)
V2Ray core
https://github.com/v2fly/v2ray-examples
XRay core
https://github.com/XTLS/Xray-examples
v2ray and xray configs are compatible as long as ports as not conflicting

Proxy
Pass web browsing application data into the proxy
Not all apps use proxy, only browser use it

TUN/TAP (default on mobile)
Virtual network interface
Every packet is sent to the virtual interface
- has the source IP of the virtual interface
Different compared to VPN, does not encapsulate network level traffic
- therefore ping would result in 0ms

DNS
DNS leak occurs in system proxy mode
- need DNS resolution to decide direct or proxy
TUN mode leak
- due to windows DNS sending DNS request via multiple network cards

In proxy mode, if the app sends the hostname to the proxy server, then on the remote side, the proxy will resolve it accordingly.

FakeIP and FakeDNS is essentially the same thing. Where it returns a fake address during DNS resolution.
- some application like windows when they encounter a fake IP will think it's poisoned and think there's no internet connection
- add MSFTconnect into FakeIP filter
- UDP protocol must require real IP


V2Ray Windows
Routing -> bypass mainland

Clash rule matching is based on IP address, sometimes it needs to resolve DNS
Redir-Host
- always return an IP
- will use configured upstream to get the IP
- DNS leak
Fake-IP
- Clash assign a random private IP to browser
- browser sent request to that private IP and to Clash
- Clash check the IP in its table and match that accordingly
- fake-ip filter on Windows so it doesn't error

V2Ray
FakeDNS, similar to Clash 
AsIs
- skip IP matching rules, only domain rules
IPOnDemand
- get the IP via DNS request (usually through the system)
- attempt to get the IP immediately via DNS request
IPIfNonMatch
- if no rules are matched, check if there are previous IP rules skipped, then resolve the DNS name and try again

With AsIs or IPOnDemand, will use the inbound
Every DNS rule it's for routing only, the real domain is managed via inbounds

UDP
require local proxy tool config and remote node config to both support UDP
UoT (UDP over TCP)
- sending UDP traffic for TCP proxy protocols (VLESS/VMess/Trojan)
- in the payload it would indicate it's UDP and send it to the remote node over TCP
UoT vs UDP
- even for protocols supporting UDP (SS), some ISP will QoS UDP traffic

QUIC
- if a web browser has SOCKS5 proxy configured, UDP/QUIC will not work