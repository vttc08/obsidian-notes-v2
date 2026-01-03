https://github.com/ZoeyVid/NPMplus
https://github.com/ZoeyVid/NPMplus?tab=readme-ov-file#quick-setup
https://raw.githubusercontent.com/ZoeyVid/NPMplus/refs/heads/develop/compose.yaml
admin@example.com

Must delete all data and recreate the container if the password is not visible

Fix permission denied
```bash
echo "net.ipv4.ip_unprivileged_port_start=0" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

Dynu
- use API Key, DNS challenge
- remember to use both the `*` and normal domain name

Serving Static Sites
```nginx
location / {
    alias /var/www/html/public/;
}
location /custom {
alias /var/www/html/custom/;
```
- place the html files and other static assets in that folder

Custom 404 page
```nginx
error_page 403 404 405 410 /custom_404.html;

location = /custom_404.html {
    root /var/www/html/errors;
    internal;
}
```
- the custom 404 pages needs to be placed in `/var/www/html/errors/custom_404.html`

Rate Limiting
Change this custom configuration
```
~/docker/npmplus/data/custom_nginx/http_top.conf
```
and add the following
```nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=3r/s;
```
- `mylimit` is the name of the zone, allocated 10m of memory
- `rate` is the requests per second
In custom configuration
```nginx
limit_req zone=mylimit burst=5 nodelay;
```
- set the zone to the name defined earlier
- `burst` allow number of requests to go over the limit in a short time
- `nodelay` do not delay the burst requests that goes above the limit

Logging
```yaml
      - "LOGROTATE=true" 
```



