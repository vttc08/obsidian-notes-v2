Windows subsystem for Android
Install dnsutils termux-api python
IPv6 doesn't work
https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h
Chromium Code
CONNECTION_RESET -> TCP Reset -> ConnectionResetError
CONNECTION_CLOSED -> TCP FIN -> ??
CONNECTION_REFUSED  -> Generic -> ConnectionRefusedError
CONNECTION_ABORTED -> TCP FIN without ACK -> ConnectionAbortedError

Oracle Cloud testing
UFW open port, but no services running/listening, SYN -> RST -> REFUSED
UFW port closed, service is running SYN -> retransmission -> Timeout
- packet silently dropped by DENY, which is to DROP
- when set to `REJECT, it doesn't drop the packet, same symptom as open port but no service

General
- MAC address of WiFi, use API to lookup vendor
- lookup public IP address, city, ISP, ASN
- `os.get_terminal_size()` for formatting

DNS Resolver
Verify if the UDP 53 resolver or DoH is reachable

Real DNS lookup resolver
https://nslookup.techweirdo.net/api/lookup?domain=doubleclick.net
- uses URL parameter domain= for lookup
- `NXDOMAIN` returns nothing
https://networkcalc.com/api/dns/lookup/yycdn.vttc.dpdns.org
- uses `api/dns/lookup`
- `NXDOMAIN` returns `status: `
https://d53.co/cloudflare/a/langleyhome.mywire.org
- uses `/a/site`
- require HTML parsing
https://dnsviahttp.com/
- url parameter 
- require HTML parsing
```python
payload = 'qname=langleyhome.mywire.org&qtype=A'
```
Cloudflare DoH
```bash
curl -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=example.com&type=A'
```
Other resolvers
- UDP 53 plaintext (nslookup)
- DNS Over HTTPS (using cURL or dig)

DNS
Grab configured DNS from `dumpsys`, if cannot get then uses default which is `8.8.8.8`
Using `nslookup`
Using `curl` DNS lookup
Check against real API DNS providers and see if it poisoned
- or `NXDOMAIN`
- if its `::1`, `0.0.0.0` or `127.0.0.1` will return poisoned by default
- using `ipaddress`, if `is_loopback` and not `is_global`