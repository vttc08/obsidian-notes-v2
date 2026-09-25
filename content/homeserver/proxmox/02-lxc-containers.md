LXC container are more like VM (state is preserved and files are still present)
Unprivileged vs Privileged container
- Unprivileged container is mapped to unprivileged user outside the container and it's more secure
Default username: root
Pass: during setup
- if not provided, it's not possible to login via WebUI, even if a SSH key is provided
Root autologin (snippets)
https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/misc/install.func

When trimming, it will not work within the container, do it on the host itself
```bash
pct fstrim $ID
```

Running docker inside LXC requires nesting and keyctl
NFS/SMB doesn't work in LXC without a privileged container

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
## LXC from scratch
Follow the WebUI
- be sure to provide a password and SSH public key (use homelab.pub)

SSH into the LXC and disable root login
```bash
GETTY_OVERRIDE="/etc/systemd/system/container-getty@1.service.d/override.conf"
mkdir -p "$(dirname "$GETTY_OVERRIDE")"
cat <<EOF >"$GETTY_OVERRIDE"
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin root --noclear --keep-baud tty%I 115200,38400,9600 \$TERM
EOF
systemctl daemon-reload
systemctl restart "$(basename "$(dirname "$GETTY_OVERRIDE")" | sed 's/\.d//')"
```

Install chezmoi and dependencies

### Prep for Cloning
```bash
sudo truncate -s 0 /etc/machine-id
sudo rm /etc/ssh/ssh_host_*
```
Use Full Clone for LXC (depending on the task)
Start the machine and configure SSH
```bash
sudo dpkg-reconfiure openssh-server
```

