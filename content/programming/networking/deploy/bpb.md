Upload inconsistency problem (unknown)
- when testing speedtest upload, it will fail and site that upload large files will fail too
- likely due to exceed CPU time error
## Install
https://bia-pain-bache.github.io/BPB-Worker-Panel/installation/pages-manual/
The recommended BPB doesn't work due to default browsers.
- Worker & Pages > Pages > Use Direct Upload
https://github.com/bia-pain-bache/BPB-Worker-Panel/releases
- download the `worker.zip` from the releases
### Update
To do automation later. For now, just upload the code for every deployment.
![](assets/Pasted%20image%2020250523193503.png)
## Configuration
The panel is not ready to use yet as it needs environment variables.
Storage -> Database -> KV and then create a KV
Project -> Settings -> Variable and Secrets
- `SUB_PATH` - link for subscription
- `TR_PASS` - Trojan password
- `UUID` - used for VLESS and Trojan
~ -> Bindings
- `kv` - set to the newly created KV
![](assets/Pasted%20image%2020250523224426.png)
After everything is done, need to deploy.
## Usage
https://bia-pain-bache.github.io/BPB-Worker-Panel/configuration/vless-trojan/
The panel will be available at `/panel`
ProxyIP - https://www.nslookup.io/domains/bpb.yousef.isegaro.com/dns-records/
Things might be useful to change
- Proxy IP - IP used to visit CF websites
- Chain Proxy - `vless://` or similar links, could be selfhosted at home, it will automatically configure proxy chaining in the subscription
Remote/Local DNS functions not known yet.