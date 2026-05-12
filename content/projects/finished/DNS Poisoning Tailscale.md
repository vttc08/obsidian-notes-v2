This is the continuation of [DNS poisoning](../DNS%20poisoning.md) but using Tailscale instead of 

Docker custom/bridge networking is only possible with these args
```yaml
      TS_ROUTES: 208.91.112.55/32
      TS_TAILSCALED_EXTRA_ARGS: "--port=41641"
```

Gotcha
Must advertise `208.91.112.0/24` on both Tailscale node if these are both advertising subnet routes, because `/32` is more specific than `/24` and that will be preferred 

Requires custom firewall rules
```bash
nft insert rule ip raw PREROUTING iifname "tailscale0" ip daddr 208.91.112.0/24 accept
```
Make nftables persistent

NAT rules (for entire subnet)
```bash
iptables -t nat -A PREROUTING -d 208.91.112.55 -j RETURN

iptables -t nat -A PREROUTING -d 208.91.112.0/24 \
  -j DNAT --to-destination 208.91.112.55
```
- must execute in Tailscale container