Not your typical dashboard Wednesday post, but I want to share my selfhosting story. 

TLDR: After struggling with WiFi when switching my home server from Windows to Linux Mint, my dad fixed the ethernet cable and I was able to hardwire it. It stopped me from giving up Linux servers and it shaped my selfhosting hobby.

Long Version with Context:
In Winter of 2022, I remember on a WAN Show, Linus was talking about Home Assistant. Then Linus said something like "not everyone has times and setup Docker and homelab, people have other hobbies, maybe some people want to spend more time cooking rather than messing about Docker/homelab and eating ramen". I was motivated, I thought Docker must be what I needed in my life. I want to be the guy that spend endless time messing about tech not cooking. So I entered the rabbit hole.

Summer 2022 I came home and upgraded my parents' HTPC (AMD A10-7800, 12GB RAM, 2TB HDD) with my old SSD. I installed Win 10, Jellyfin and with my primitive knowledge in Docker, I deployed Minecraft and the usual media stack. I also watched YouTubers to learn self-hosting.

Despite using 5GHz WiFi, I was able to get 12MB/s (100 Mbps) on Windows SMB to my laptop. One day at work, I was even able to stream a 10 Mbps movie in Jellyfin, with only 15 Mbps upload at home.

As time goes on. I've discovered many recommend Linux over Windows for home server. I had some exposure to Linux from YouTube. I also had problem with Nginx Proxy Manager in Windows with SSL certificate (I didn't know docker logs existed then). I wanted to give Linux a try, so I install Linux Mint in VirtualBox. Out of curiosity, I redeployed NPM, changed router port forward to my VM, it... just... works... I was also able to setup PiVPN Wireguard which allowed me to access everything on my LAN securely. Amazing. I want to deploy Linux for real.

It worked as expected, Docker apps run even better now. Then disaster struck. When I began transferring files via the SMB, only 2MB/s, same thing with SCP. I was getting 12 MB/s on WiFi in Windows. Well, 2MB/s is still faster than my upload of 15Mbps and my small movie collection's bitrate, so it's fine right? Next day at work, I tried streaming a 5Mbps file from Jellyfin, it'd constantly buffer, whereas in Windows even 10Mbps file plays fine. It even buffers on my LAN. I did try ethernet, but our long distance cable has a broken clip so it doesn't attach. After sleepless nights troubleshooting, trying random configs, tweaks online with no avail. I nearly gave up on Linux until I talked to my dad.

He borrow a crimper and RJ45 from a friend, we fixed the cable. I was in great relief when I saw my VLC debug information in six figures (>100Mbps). With that success, I deployed more Docker apps, got HTTPS and VPN working, by the time I left home, I had a fully functioning Linux server. Today, I have multiple home servers, cloud VPSes and a Proxmox playground, all using Linux. Looking back, if I had given up Linux for Windows, the outcome would be vastly different. That ethernet cable was a pivotal part of my selfhosting journey, leading to projects like bios modding, Proxmox, VPS Tunnel, NAS, cursed laptop server and HTPC KVM. It was an ethernet cable that started it all.
# PSA/Guide] If you're on public WiFi and you see red certificate errors when you're not supposed to, it's a sign you should turn on your VPN
TLDR: Many YouTubers, influencers who promote VPN claims you'll get hacked on public WiFi unless you use a VPN. This is oversimplified, VPNs are helpful in PW, but not for the reasons they say. Instead of fear-mongering, I will use examples and dive into technical details to help you understand 
- What is HTTPS and it's limitations? 
- What are certificate and certificate authorities? 
- What and how are Man in the Middle attack (MITM) performed?
- And how can a VPN protect you?
This will be a long post, but I'll simplify things for those with little technical backgrounds.

[image]
When you visit a mall, grocery, big-box store, and connect to public WiFi (PW), you may see a scary red warning on your browser even when you're not supposed to. Many people including me are conditioned to click "Advanced" and "Continue"; since I self-host, I used to think I've messed up Nginx again, but that's not the case, and you **should not click continue**.
### HTTPS
Most sites are secured using **HTTPS** which encrypts your sensitive data. But nowadays, people host many sites on a single server, but how does the web server know which one I want to visit if its encrypted? **Server Name Indicator (SNI)**, this is sent as a **Client Hello**, which consists of the domain you want to request. This happens in **plaintext**, before any encryption. SNI allows PW operators to precisely track what site you visits, and makes it trivial for MITM attacks.
### Certificates and CAs
In short terms, the server respond with a **certificate** to prove who they claim to be, like a driver license. Certificates are usually signed by **certificate authority (CA)**, like DMV. However, anyone can self-host a CA and use self-signed certificate for e.g. `bank.com`, this is like me making a Fake ID in MS Word. It's why we need **Trusted CAs**. These are CAs that are preloaded by Microsoft, Google, Apple to your respective OSes certificate store. The common ones we use are Let's Encrypt and ZeroSSL. The trust is what allows us to verify the authenticity of `bank.com`, as anyone else pretending to be `bank.com` won't have their certificate signed by a Trusted CA; e.g. the police will accept your DL from the DMV but not your fake ID because DMV is trusted by everyone.
#### Certificate Warnings
There are common certificate errors
1. Self-signed certificate, A.K.A the certificate belong to an untrusted CA
2. Expired certificates
3. Mismatched domains, when you receive certificate of `netflix.com` when you visit  `bank.com`
For a public website, 1 and 2 are almost non-existent, because of free and accessible certificates provided by Let's Encrypt and ZeroSSL, not to mention there are countless tools for certificate automation. Overall, in a secured network like home, you should almost never encounter certificate warnings normally, so if you received one in PW, something is wrong.
### Real Example
The screenshot I posted above is when I was at a PW. The error was `ERR_CERT_AUTHORITY_INVALID`, what does it mean? The certificate was not signed by a Trusted CA (back to my fake ID). The certificate did not expire and it matches `dynu.com` (the * means wildcard, or match everything), but the issuer `FG100` is not a trusted by Android, the browser stopped me from a MITM attack.
#### What Happened
A device on the PW intercepted my connection and performed a MITM attack. Instead of connecting directly to `dynu.com`, my traffic was rerouted to the one pretending to be `dynu.com`.
How did they do it? Because the Server Name Indication (SNI) in HTTPS is unencrypted, others can see I was trying to visit `dynu.com` and forged a fake certificate. They couldn’t generate a valid one, only the real `dynu.com` can do that.
#### What if I continue
The following things may happen
- A webpage completely unrelated to `dynu` will show up, it could be a fake one, random HTML or anything the adversary wants us to see
- "attacker may steal … from `dynu.com`" in the browser warning says it all, the 3rd party can now decrypt all your data sent to the site
While #2 is technically possible, but I believe Hanlon's razor and it should not occur on any PW.
#### What if I already clicked continue
That' is unfortunate, you just temporarily trusted that certificate and the browser won't warn you again. This could be due to convenience, since devs who tried to fix errors don't need to bypass the warning repeatedly. Maybe if you close your browser, or private tab it will reset it. But I almost never click continue on those warnings, so I wouldn't know and it differs by browser and privacy settings.
### How would a VPN protect you
In any world, it shouldn't be acceptable when you visit `bank.com`, a Netflix login page shows up, no one can check their statements with movie catalogs. While VPN can't stop you from being hacked like influencers claim, it does resolve the warning. Generally, VPN encrypts your traffic with "military grade encryption", or a marketing term for AES256. You connect to your VPS/VPN, your data including the plaintext SNI and DNS are encrypted; your VPN will connect to your site on your behalf, on the open internet absence of MITM, and return everything back, encrypted. When I enabled my VPN , the scary warning was gone and the real site loaded with a padlock icon, I have the assurance the site I'm connecting is the real, untampered, verified by a Trusted CA and everything I send is only viewable by them. This is the peace of mind you deserve when you use {pls sponsor me} VPN.
### Closing/What to Recommend
In summary, when you encounter certificate error on public WiFi, **don't blindly accept and continue**, this is not normal, many websites today use free, auto-renewing certificate by trusted CAs. When that happens, start your VPN and relax. I cannot recommend any VPN since I self-host my own, but you'll find resources on this subreddit. If your VPN have trouble connecting, it's complex topic for another day and you should message their support. Hope everyone learned something about the internet!