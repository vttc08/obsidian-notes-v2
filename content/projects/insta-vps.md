DigitalOcean create droplet
```json
{
  "name": "example.com",###
  "region": "sfo",$$$
  "size": "s-1vcpu-1gb",$$$
  "image": "debian-13-x64",$$$
  "ssh_keys": [
    "50508378" ##
    ],
  "backups": false,
  "ipv6": true,
  "monitoring": false,
  "tags": [
    "env:prod",
    "ivps" ###
  ],
  "user_data": "#cloud-config\nruncmd:\n  - touch /test.txt\n",$$$
}
```
User Inputs are
```
region(?computed), size[1gb,512mb], image?, userdata?
```

Vultr
```json
{
    "region": "<string>",$$$
    "plan": "<string>", $$$
    "os_id": "<integer>", $$$
    "ipxe_chain_url": "<string>",
    "iso_id": "<string>",
    "script_id": "<string>",
    "snapshot_id": "<string>",
    "enable_ipv6": true,
    "label": "<string>", ###
    "sshkey_id": [
        "<string>" ##

    ],
    "backups": false,
    "user_data": "<string>", $$$
    "ddos_protection": "<boolean>",
    "activation_email": "<boolean>",
    "hostname": "<string>", ###
    "tag": "<string>", ###
}
```

For both providers, the needed user inputs are
```
region, plan, os, user_data
```

Custom ISO
- cost money on DO
- free on Vultr but require a remote URL

Delete VPS
DigitalOcean
- by id

Pricing table titration
- 512MB actual - 0.006
- 1gb actual - 0.009

| Time | s-1-0.5 | s-1-1 |     |
| ---- | ------- | ----- | --- |
| 15   | 0.01    | 0.01  |     |
| 30   | 0.01    | 0.01  |     |
| 45   | 0.01    | 0.01  |     |
| 58   | 0.01    | 0.01  |     |
| 118  | 0.01    | 0.02  |     |
| 178  | 0.02    | 0.03  |     |
| 238  | 0.02    | 0.04  |     |
| 298  | 0.03    | 0.04  |     |
| 358  | 0.04    | 0.05  |     |
| 418  | 0.04    | 0.06  |     |
| 478  | 0.05    | 0.06  |     |

Pricing structure (time in minute)
```python
price = max(round(time/60*price,2),0.01)
```

Client sided ping
https://www.cloudping.info/

Location selection algorithm 
- closest to client
- on path preference
- closest to origin
- vpc hopping