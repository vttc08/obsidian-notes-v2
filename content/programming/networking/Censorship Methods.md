https://youtu.be/Etd6Sm3SaKM
## DNS
DNS Poisoning
GFW can modify the return DNS packet and change the IP address to something non-existent
- using host files (Windows) and preventing DNS request
## IP
Blacklisting the IP address
[TCP Reset Attack](https://en.wikipedia.org/wiki/TCP_reset_attack)
- utilize the RST flag of TCP
- when the client receive such packet, the connection is closed immediately
	- when a computer crash while receiving packets, when it reboot, it will send TCP RST flag and others will stop sending packets to them that serves no context
## Application
When sending encrypted HTTP GET request, GFW can also see the application data and stop the connection.
## VPN
OpenVPN/IPSec can encrypt data, **but the characteristics of VPN are obvious** and can be blocked
- GFW will also monitor VPN connections based on bandwidth used or time of access and potentially block the VPN IP