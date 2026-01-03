Pinggy
```bash
ssh -p 443 -R0:localhost:56789 -o StrictHostKeyChecking=no -o ServerAliveInterval=30 6Eyd7skanEB@free.pinggy.io
```
Tailscale funnel
set it to work without sudo
```bash
sudo tailscale set --operator=$USER
```
https://tailscale.com/kb/1223/funnel
must be localhost
```bash
sudo tailscale funnel localhost:port
```
Devtunnel
localhost only
```bash
devtunnel host -a -p 56789 
```
use `platform.machine()` to prevent ARM processor
~~Serveo~~ (stopped working)
```bash
ssh -R 80:localhost:3000 serveo.net
```
localxpose.io (require Node)
- require confirming visit otherwise won't work
- scraping might be needed
```bash
loclx tunnel http --to 10.10.120.16:56789
```
- must run this in client side 
```bash
curl -v -X POST https://cfyoklhhsq.loclx.io/vlc -L   -H "User-Agent: Mozilla/5.0"   -H "Referer: https://cfyoklhhsq.loclx.io/vlc"
```
zrok
```
zrok enable SiwzTf06nRL9
```
```bash
./zrok share public 10.10.120.16:56789
```
l~~ocalhost.run~~
```bash
ssh -R 80:10.10.120.16:56789 nokey@localhost.run
```
- ~~free almost useless~~
- ~~won't implement~~
~~Horizon Tunnel (require node)~~
Localtunnel
- localhost only
```bash
npm -g localtunnel
lt --port 56789
```
- require SSH forwarding
```bash
ssh -L 0.0.0.0:56789:localhost:56789 karis@10.10.120.16
```
Client behavior
V2RayNG, Nekobox do not have subscription tracking
Only hiddify does
It is done via appending 
```
#reality-18mwh38z-204.80MB%F0%9F%93%8A-23H%E2%8F%B3
```

New Todos
- enabled tunnels (disable if pre-req not met)
- serveo, devtunnel support
- complex loclx support
- auto respin tunnels (e.g. Pinggy)
- custom frontend callback
- QRCode
- explore docker

English Promo
I have a NodeJS server - terminal `npm start` and hello world todo page shows up
Scratch that
I have 16 million NodeJS servers - showing a /24 subnet with a network of computers
And I want to access it outside my home - phone NodeJS app transitioning from grocery, like Costco, Save On, Ikea
But I don't want to port forward dangerous - router login interface page for a dangerous looking page
Or worse, my ISP is behind a CGNAT - green line to router but red line outside
/ Tailscale app shows but with Fortinet message, and the NodeJS app turned to Chrome can't load
No, Like. I actually wants to access it - poop sound effect
Securely expose your - server monitor screen
- router login - shows router login
- sensitive webpage - website showing large text with passwords
- critical dashboard - page with buttons with destroy server, `rm -rf all`
Multiple provider support - scrolling down of Cloudflare, Tailscale, Microsoft, as it scroll down
Redundant Frontends - discord, Telegram, Slack, Trello scrolling as one gets blocked, the operation status is still green
TLS 443 Encryption - padlock icon and firewall allow traffic through
Implement your own - ChatGPT prompt, how do I make a custom Python for for this tunnel provider ...
Insta-V2Ray, puts the A (accessible) in CIA - text animation
Always. Everywhere you go - transition from IKEA, Costco, Save-On Foods, phone screen with NodeJS app and other interfaces in the dead center, as scene moves and other phones show, VPN detected, website blocked, TCP reset, chrome error, no internet
Accessing all your sites, safely - terminal and code example of Python, Node, Go, Nginx webpage
One more thing
Your Home IP, is clean - side by side comparison of VPS left you're not a robot, right home IP no problem
Unfettered - showing millions of websites load without webpage blocks
Remote access, scientific access, all in one place. Copyright Insta-V2Ray

Chinese Promo
公共网络 (public WiFi) - logo of Costco, IKEA, Save On, T&T and WiFi
恶意行为 (malicious behavior) - some dark TCP reset, maybe AI generated
Insta V2Ray
/ transition to 2 panel
保护安全 (protect safety) - without insta-v2ray, certificate error/warning, with, page loaded
轻松秒连 (instant connect) - stop watch with V2Ray
我们科技 (our solution) - animate our competitors vs insta-v2ray
遥遥领先 (far advanced) - show normal internet usage while ProtonVPN loads infinitely
/ 15 minutes later with fast forward and animated x on ProtonVPN, the text
竞争对手 (our competitor)，差之千里 (far behind) on ProtonVPN
/ text in 3 rows
科学上网 (science access), 没有边境 (without borders), 秒开网站 (instant open) - show other
支持暗网 (darkweb support) - show our competitor Tor Browser struggling, but V2Ray, onion site loads
异地组网 (remote access), 不开端口 (no port forward) - show Tailscale and web browser already
真的能用 (really works) - show 10.10.120.16 loaded while Tailscale can't connect
一个网站 (one website), 你能实现 (you can do) - show competitor remotely access one NodeJS server
千百万个 (16 million), 我照样行 (I can also) - show animation of NodeJS terminal opening up
Insta-V2Ray, 在没有公望的情况下实现外安全外网访问


