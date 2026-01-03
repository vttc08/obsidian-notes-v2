LXC container are more like VM (state is preserved and files are still present)
Unprivileged vs Privileged container
- Unprivileged container is mapped to unprivileged user outside the container and it's more secure
Default username: root
Pass: during setup

To SSH into container need to add another user and set the password (or permit root login)
`usermod -aG sudo user`

![[Pasted image 20230725141754.png]]
CPU units: the larger the number the more CPU weight this container will get (default is 100), balanace CPU time between different containers

![[Pasted image 20230725141923.png]]
Root Disk (the size the container have access to for application)
Bind Mount: allow access to directory from PVE host inside a container
`mp0: /mnt/snapraid/disk1, mp=/path/in/container` should be similar to Docker mount
- cannot contain symlinks
Device mount allow block devices to be mounted into the container

![[Pasted image 20230725142509.png]]
Network
- name is the interface name for the container
- can set static IP or DHCP
- use /24 as its equivalent to 255.255.255.0

**Template**
Same as VM [[virtual-machine]], remove apt cache and package, delete ssh host keys, purge machine-id
After logging into the container, delete the ssh host keys
`sudo dpkg-reconfigure openssh-server` this will reconfigure the ssh keys

