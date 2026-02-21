- [ ] docker compose
Configuration
- `./conf` - the main configuration file
- `./work` - database, query logs
General Settings
- change statistics and query logs duration (also clear)
```yaml
http: 
 address: 0.0.0.0:3053
```
It appears there's no password.
Configured upstream DNS to 1.1.1.1
- [ ] PUID/PGID, data persistence
`AdguardHome.yaml` is the main configuration file, but it will get overridden by root
~~the `user:` fix works well so far~~
DHCP won't work without root
- may require persistent chown
- [ ] DNS server
- [x] whitelist YouTube history
- [ ] DHCP server
- [ ] DHCP reservation
Telus is the DHCP server
- uses conditional forwarding for `.lan` domains because DHCP search domain is lan
- [ ] local DNS
DNS rewrite
- [ ] DoH setup
It's not possible to enable DoH in the UI, must do it in the file
```yaml
tls:
  enabled: true
  allow_encrypted_doh: true
```
Enabled trusted proxies
Change url path and port
- [ ] DoH setup with Nginx
Test DoH and DoT with dig
```bash
dig +https @cloudflare-dns.com vttc.dpdns.org
dig +tls @one.one.one.one -p 853 vttc.dpdns.org
```
- [ ] home assistant 
Adguard generally use less CPU and similar speed compared to Pihole
- though during benchmark, adguard use more
- adguard slower for uncached responses (because of blocklist)
