## Nginx Proxy Manager
To reverse proxy HASS, special configuration is needed. Add these lines in the `configuration.yaml`
```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 10.10.120.12
    - 10.10.120.16      # Add the IP address of the proxy server
    - 172.80.0.0/24
```
- add the URL of the server running the reverse proxy (eg. `10.10.120.12`)
- also add the docker subnet of the reverse proxy (eg. `172.x.x.x`)
Home assistant needs to be restarted for reverse proxy to work again.