Support most of the common protocols, including new ones like ShadowTLS

ShadowTLS
- it will actually establish a connection to the SNI whitelisted website to fool the firewall before normal connection
- it's different than the fake or self signed certs

https://sing-box.sagernet.org/installation/package-manager/#repository-installation
```bash
/etc/sing-box/config.json # configuration
/usr/bin/sing-box # program
/etc/systemd/system/sing-box.service # systemd unit
```

Windows sing-box is only CLI
