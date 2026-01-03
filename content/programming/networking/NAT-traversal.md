STUN is only possible for full-cone NAT

APD - address and port dependent
AD - address dependent
F - filtering; M - mapping
### Firewall
By default, router firewall will allow only outgoing or incoming traffic that has established connection.
Address & Port Dependent (APDF) - both the address and port of the incoming source must match
Endpoint-Independent (EIF)- once a hole has been punched, anyone can use that port
### NAT
EIM - it doesn't matter which dest ip/port, as long as it comes from the same src ip/port, the NAT device will use the same port
Address/Port Dependent (EDM) - when any of the dest ip/port are different, the NAT device will use a different port

| Type | NAT | Firewall | Type            |         |
| ---- | --- | -------- | --------------- | ------- |
| 1    | EIM | EIM      | Full-Cone       | No/Easy |
| 2    | EIM | Address  | Restricted      | Easy    |
| 3    | EIM | APDF     | Port Restricted | Easy    |
| 4    | EDM | APDF     | Symmetric       | Hard    |

#### Type 1 & 1
Client: Local:1234 -> CWAN:5678
Server: Local:9012 -> SWAN:3456
Client and server both try to reach Tailscale server, e.g. TS:1111
Both client and server receive the other's WAN IP and Port
Because both side NAT is EIM, despite client's destination is different than the original intent (Tailscale), NAT still uses the same port
- client request SWAN:3456, despite for the server, the address/port isn't TS, firewall allows it
#### Type 1/3 & 3 (Still EIM)
The NAT behavior is still EIM.
One: Local:1234 -> CWAN:5678
Three: Local:9012 -> SWAN:3456
One knows Three has SWAN:3456, tries to connect
- but firewall on Three's side, the srcip isn't Tailscale anymore, so it will drop it
- however, Three send a packet CWAN:5678, the connection state is present and firewall on Three will allow traffic from CWAN:5678
In full-cone, One would accept Three's packet regardless. 
#### Type 1 & 4
One: Local:1234 -> CWAN:5678
Four: Local:9012 -> SWAN:3456/SWAN:4567
Both machine receive other's public IP via Tailscale.
- One attempt to connect SWAN:3456
- Three tries CWAN:5678, however since it dest ip is different than Tailscale, the NAT device will use another source port (4567) to connect One
- One acknowledge Four's source port is 4567 and it tries that instead
