## NPMPlus on VPS

- Bind mount:  
    `/var/www/html` → `docker/npmplus/var/www/html`
- Subscription files:  
    Located in `./subscription` (customized per client)

## Hardened Nginx Config with Fronting

```nginx
location / {
        alias /var/www/html/public/;
}
location /<path> {
        alias /var/www/html/subscription/;
        if ($request_method !~ ^(GET|HEAD)$) {
                return 404;
        }
        if ($http_x_worker_gateway != "") {
                return 404;
        }
        if ($http_user_agent ~* (curl|wget|python|perl|php|java|powershell|nmap|nikto|masscan|sqlmap|fuzzer|go-http-client|libwww|httpclient|http_request|ruby|scan|zgrab|mozilla|facebook|bot|spider|crawler|scrapy|httpx|axios|node\.js|pingdom|uptime|check|probe|monitor)) {
                return 404;
        }
        try_files $uri 404;
        add_header Content-Security-Policy "default-src 'self';" always;
        add_header Referrer-Policy no-referrer always;
        add_header X-Robots-Tag "noindex, nofollow, noarchive" always;
        limit_req zone=mylimit burst=5 delay=6;
}

error_page 403 404 405 410 /custom_404.html;

location = /custom_404.html {
        root /var/www/html/errors;
        internal;
}
```

### Key Points

- All files served from `/var/www/html/subscription`
- Website frontend at `/var/www/html/public`
- **404** for non-GET/HEAD methods
- **404** if `X-WORKER-GATEWAY` header is incorrect/missing
- User-Agent blacklist for common tools/bots
- CSP policy, referrer and robot indexing disabled
- Rate limiting enabled
- Custom error page: `/var/www/html/errors/custom_404.html`
## Cloudflare Workers Masking Code
```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Define the whitelist of known clients (case-insensitive match)
    const uaWhitelist = ["v2rayn", "v2rayng", "nekobox", "clash-verge", "shadowrocket"];

    const userAgent = request.headers.get("User-Agent") || "";

    if (pathname.startsWith("/<path>")) {
      const uaLower = userAgent.toLowerCase();
      const isWhitelisted = uaWhitelist.some(allowed => uaLower.includes(allowed));
      let newHeaderValue = ""
       
      if (isWhitelisted) {
        newHeaderValue = "my-value";
      }

      // Rewrite request to 
      url.hostname = "myddns.com";
      const modifiedRequest = new Request(url.toString(), request);

      // Add custom gateway header
      modifiedRequest.headers.set("X-Header", newHeaderValue);

      return fetch(modifiedRequest);
    }

    // All other requests → proxy to
    // TODO later
    url.hostname = "flask.myddns.org";
    return fetch(new Request(url.toString(), request));
  }
};

```
### Protection Mechanism Description
- Only proxies requests for allowed User-Agents (specific client apps).
- Adds a custom header for validated clients.
- Forwards requests to the backend only if User-Agent matches the whitelist.
- All other requests are proxied elsewhere, further isolating the subscription endpoint.

Together, these mechanisms ensure that only authorized client applications can access sensitive subscription files, while automated tools and unauthorized users are blocked at multiple points.
## Allowed User Agents

- `v2rayN/7.11.3`
- `v2rayNG/1.9.46`
- `NekoBox/Android/1.3.9` (Prefer ClashMeta Format)
- `clash-verge/v2.2.3`
- `Shadowrocket/2701 CFNetwork/3826.600.41 Darwin/24.6.0 iPad13,19`

## Clients (V2Ray Links)

- [windows-v2rayN](../programming/networking/clients/windows-v2rayN.md)
