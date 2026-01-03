Using Docker in LXC
during network setup 192.168.0.100/24
- the /24 is equivalent to 255.255.255.0 subnet
iGPU in LXC
```
lxc.cgroup2.devices.allow: c 226:0 rwm
lxc.cgroup2.devices.allow: c 226:128 rwm
lxc.mount.entry: /dev/dri/renderD128 dev/dri/renderD128 none bind,optional,create=file
```

Install docker and portainer