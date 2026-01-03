https://youtu.be/y8s5UivMNcE
https://xtls.github.io/en/development/protocols/vmess.html#functions
Dependent on system time

Extra ID - generate another one other than UUID
AEAD, extra ID is 0
- either AEAD or ExtraID

>[!important] VMESS vs V2Ray
>There is a distinction between protocol (VMESS) and transport (tcp/ws in V2Ray). At its core, VMESS it's just a protocol that can be transported in many ways, WebSocket or TCP

> [!note] Transport vs Camoflouge
> Transport: TCP/UDP/WS. determine how the VMESS or other traffic protocol is being transported to destination
> Camouflage: add e.g. HTTP header to VMESS itself to hide it, it does not change how it's transported
## Install

```bash
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```
This will install v2ray in
```bash
/usr/local/bin # binary
/usr/local/etc/v2ray/config.json # main configuration
/etc/systemd/system/v2ray.service # systemd unit
```
Configuration change
```bash
sudo v2ray test /usr/local/etc/v2ray/config.json
```
The certificate installation is similar to Trojan, but for V2Ray, the path is
```bash
/usr/local/etc/v2ray/server.key # or server.crt
```
## Concept
![](assets/Pasted%20image%2020250412130801.png)
Client
VMESS append the hash value to the beginning of the message
- client randomly take a value that is within 30s to be hashed
Server
VMESS check the hash based on timestamp
- VMESS also append UUID to the timestamp
- take every time within +/- 30s and hash it to verify
## VMESS/TCP
The most basic of VMess. Configuration.
```bash
{
  "inbounds": [
    {
      "port": 8388, 
      "protocol": "vmess",    
      "settings": {
        "clients": [
          {
            "id": "GENERATE ONE USING uuidgen",  
            "alterId": 0
          }
        ]
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",  
      "settings": {}
    }
  ]
}
```
## +WS + TLS
![](assets/Pasted%20image%2020250411233109.png)
- these are optional,
- although WS with a path `/ws` is required if hiding behind a website
To make use of WS in cli, add/change the line
```json
      "streamSettings": {
        "network": "ws"
    }
```
- the `streamSettings` should be added under settings
- change the clients to use WS accordingly
### TLS
When configuring TLS, the encryption method is set to `zero`
This will encrypt the entire VMESS packet
`http/s -> VMESS -> WS (optional) -> TLS -> TCP -> IP`
Add the following after `streamSettings`
```json
	"security": "tls",
        "tlsSettings": {
          "certificates": [
            {
              "certificateFile": "/usr/local/etc/v2ray/server.crt", 
              "keyFile": "/usr/local/etc/v2ray/server.key" 
            }
          ]
        }
```
Follow [ACME](Trojan.md#ACME) to generate a certificate
If there are problems in the TLS process, edit the systemd unit file for v2ray and remove
```js
User=nobody
```
In v2ray client, change security to `tls` and add the SNI to match
![](assets/Pasted%20image%2020250412000947.png)
> [!warning] TLS SNI Name
> The SNI name is still the dynamic DNS and could be subject to SNI poisoning.
> ![](assets/Pasted%20image%2020250412001133.png)

The SNI can be changed to anything, however, the TLS certificate is only issued for the DDNS domain, hence unless `AllowInsecure` is used, it won't work.

Todo Later: understand certificate signing for a fake SNI
ChatGPT reference: https://chatgpt.com/share/67fa180a-4e28-800b-a7b4-8f379a9d0556
## +Web
![](assets/Pasted%20image%2020250412130638.png)
Hide VMESS with a website
Must use WS and reverse proxy (nginx)
- the advantage is that, normal web traffic is handled via Nginx rather than other software, making it genuine
Require a path, e.g. `/ray`
### Self-Built Site/Domain
*If the domain/DDNS is not subject to SSL inspection, it can be used.*
Upon configuring the website, the TLS termination is now handled by Nginx rather than V2Ray. Change the v2ray config
```json
      "streamSettings": {
        "network": "ws",
        "wsSettings": {
          "path": "/wp-content"
        }
      }
```
- remove all TLS related config in V2Ray

In the client setting
- change the port to what **Nginx** is listening on e.g. 443,444
- change the WS path to match
#### Nginx Configuration
Add the hosts in `/etc/nginx/site-enabled`
https://bulianglin.com/archives/guide.html
Change
- Line 2,3 - server listen port
- Line 5 - server name
- Line 6,7 - TLS certificate location (if different)
- Line 17,22 - reverse proxy to another website
- Line 32 - WS location
- Line 34 - port of V2Ray
#### Caddy
By default Caddy comes with automatic HTTPS, but also have ability to use own certificates
```nginx
diamond.loyobank.com { 
        tls /usr/local/etc/v2ray/fullchain.pem /usr/local/etc/v2ray/privkey.pem
        reverse_proxy http://localhost:12345 # or fake site
        handle /wp-content { # ws path
                reverse_proxy localhost:10081 # URL and listening port of VMESS
        }
}
```
- in Caddy, custom or self-signed certs can be declared with `tls cert key`

Turn off V2Ray listening on `0.0.0.0` for security, add this line before `port`
```json
"listen": "127.0.0.1"
```
- the VMESS/WS will still work even after disabling the port in firewall
### Fake SNI Name
![](assets/Pasted%20image%2020250412130453.png)
- the WS path can be anything as this part will be encrypted with TLS
## Conclusion
VMESS + pure TCP is faster but have problem of detection
- VMESS will encrypt the header no matter what
but with TLS, there's more work of encryption


