Many people worry when their entertainment sources shut down. With the recent news about Real Debrid, here's a guide to help you start self-hosting your media server, and do so frugally. We won't be that guy that spend on fortune on overkill setup with countless subscriptions to VPN, Usenet and paid software. After all, we pirate because we don't want to spend money. This guide is very long but won't cover everything, as self-hosting is a vast topic.

**What is Local Media Hoarding and Why?**
Most people rely on web streaming or premium torrent services like RD, sometimes paying fees for continuous access. If a site shuts down, you lose access and must find alternatives by playing the cat/mouse game. By self-hosting, you download and store media locally, ensuring permanent access without ongoing fees. Some enthusiasts even hoard and seed terabytes of data.

Note
For people in some part of USA and Germany, you might be better off using AllDebrid or Torbox for cost. Since you'll likely need to purchase a VPN to download torrent which could cost more than these services. For people whose ISP do not care about torrents, enjoy the guide, be free.
As for prerequisites, it's preferable your internet upload speed is fast which may be useful if you want to share your media with friends.

**The Basics**
To self-host your media, we will use media software stacks that manage, download and allow your devices to stream your media on your home network or remotely. All the software listed are completely free or open source. These are the software you can use, there are many ways to run and install these, for example, Windows, Linux, VM or Docker, I won't get to the specific into these
- **Media Streaming**: Jellyfin - Organizes and streams your media with a user-friendly dashboard.
- **Media Management**: Radarr, Sonarr, Prowlarr - Automates media addition and quality control.
- **Media Download**: Qbittorrent, Deluge, Transmission - Torrent downloaders.
- **VPN** (if necessary): Gluetun with your favorite OpenVPN/Wireguard provider
- **DDL Tools**: JDownloader, MegaBasterd, Webtop - Optimized for direct downloads and file sharing sites if torrenting is not your thing.
That's the gist of it, many self-hosters who started with media also end up deeper in the rabbit hole and selfhost Home Automation, Backup, Photos and anything you can imagine. Now for the hard part.

**Servers look expensive, I cannot afford it.**
A server doesn't need to be a Xeon, ECC, or a name-brand NAS. Your old or current desktop can serve as a media server. For purchases, consider the used market for a cheap desktop. Intel is preferred for its iGPU with QuickSync and low idle power. Key features to look for:
- Intel iGPU 7th gen or better for 4K transcoding
- Multiple SATA ports (internal SATA is faster and more reliable than USB docks)
- SFF Business PCs like Optiplex, optimized for power efficiency
You'll find many affordable options meeting these criteria in the used market.

Another costly part is hard drives. Check serverpartdeals for refurbished options. They offer 12TB drives for $100. I bought a 14TB drive for $140 (in Canada, with double tax and duties), still cheaper than a new $200 HDD. As a beginner who do not plan to hoard full Blu-ray rips, you may not need a huge drive. Start with a used 1/2TB for $20 and upgrade as needed.

**My electricity is expensive to run the server**
Firstly, you don't have to run a server 24/7. However, most people do b/c they are hosting other services or it's their hobby. Intel CPU with iGPU or a used SFF PC provide better idle power, Wolfgang, a reputable YouTuber also have many tips or optimizing for power consumption like CPU C-states.
HDDs will consume the most power in a modern system. Consider spinning them down. Constant power cycle will cause wear and tear, but HDDs are rated for 100,000s of cycles, it will handle the occasional spindown fine.

**What if my HDD dies**
Backing up Linux ISOs is not practical. If you only have a single drive in your system, then RIP. However, if you have 2+ disks, you can setup parity. When a disk fails, you'll have the option to rebuild parity and recover the data. With a 3 disk setup, you set aside 1 disk of space for parity to recover from a drive failure. 66% of your money spent can be used to stored your media, it's gets even more efficient once your array grows. Whereas with a backup, only 50% goes to your media. There are many choices such as UNRAID, ZFS RAIDz1/2, RAID5/6/10 and SnapRAID. SnapRAID makes the most sense for Linux ISOs. I can explain more if requested.

**My upload speed is slow, can't stream 4K HDR, it buffers**
Hosting your media come with the benefit of being able to streaming it remotely and allowing many friends to stream it (not possible with RD because of IP limit). But that requires high-speed upload. However, if your upload is slow, transcoding could help. It the process which the media server Jellyfin will convert the original video to a lower bitrate 1080p file in real-time so it can be streamed over slow connections. It's not perfect, but it helps.

**I can't forward port 8096 or any ports at all or I don't want to because I'll get hacked**
That's fine. You can use a mesh VPN like Tailscale, to put it simply, if your server and client both have tailscale installed, it'll be able to connect like if it's on the same network, with no complex configurations. If installing apps on your client/friend's devices is not okay, then consider tunneling your traffic to a always free VPS. 

**This is too complicated, impossible to setup**
If you have good technical skills, it's manageable. Many people have successfully set up Kodi and Stremio despite their complexities. There are numerous communities to help with issues, and resources like YouTube and ChatGPT can assist with learning Linux, Docker, and other IT concepts. If you setup correctly, you'll be enjoying the best quality media while others complain about their favorite streaming site shutting down.

**I have X but my internet is Y with Z computer and Q budget but wants C N F L B feature**
Feel free to post your questions and I'm sure many will be able to help and give good suggestion for your use case.



**SnapRAID/MergerFS Storage Setup**
SnapRAID uses 1 or more drives for data and a dedicated parity drive, unlike convention RAID setup where the parity is striped across all disks.  
- in traditional RAID, when you want to access any file, your entire array has to spin up, whereas in SR, only the drive that needs access spin up; since the parity calculation is manually, you only need to spin up the parity drive when you want to sync the data, you can even spin down your data disk if you don't anticipate a lot of access, saving even more power
- SnapRAID works with NTFS drive and do not need format, to use a RAID array all drives needs to be formatted to create a new array
- RAID require all your drives to be the same size, if not, some spaces on your drive will be unavailable, SHR (Synology Hybrid) could mitigate it to some extent but it's not perfect. In SR, all your mixed drives can be used, as long as the largest drive in the array is parity, or does it? Consider a 4,6,6,8 TB setup, in RAID5, you'll have (usable/parity/wasted) 12/4/8TB, SHR-1 does it better at 16/2/2TB, but with SnapRAID 16/6/2, which is same as SR. But you can partition the 8TB to 6+2 TB and use a 6TB as parity, this gives you 16TB of protected data + 2TB of unprotected data for files, further maximizing storage