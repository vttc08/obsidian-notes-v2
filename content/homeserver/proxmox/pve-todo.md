**Change the repository and disable nag**
Automatically
`bash -c "$(wget -qLO - https://github.com/tteck/Proxmox/raw/main/misc/post-pve-install.sh)"`
Manually
Change the Proxmox repo to no-sub
- `/etc/apt/sources.list.d`
- backup (remove)  `pve-enterprise.list` and `ceph.list`
- make new list `pve-install-repo.list` and add the following content
- make sure the version 'e.g. bookworm' is correct
`deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription`
The correct setting
![[Pasted image 20230804233735.png]]
Update and upgrade system and reboot

**Change CPU scaling governor**
Check available
`cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors`
Check current
`cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor`
Set to powersave
`echo "powersave" | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor`
Make it persistent at reboot (crontab)
```sh
@reboot echo "powersave" | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor >/dev/null 2>&1
```
Also run `powertop --auto-tune`

Packages to install
`powertop htop iotop fio curl gnupg wget ntfs-3g neofetch`

Configure local storage so that it can also store other stuff

**HDD**
`lsblk` and `blkid` to get the ntfs hard drive /dev name and the /dev/by-uuid/...
Edit the fstab to mount the drive
In Datacenter view, not storage view, add directory so the ntfs hard drive can be used
Refer to [[disk spindown]] to optimize disk usage

Configure smartctl (on or off), make sure periodic smart check is not causing hard drives to spin up or preventing hard drives to spindown

Download VirtIO
Convert VM to template which can be cloned

In permissions in DC view, configure TOTP (2FA with Google authenticator)

If making a folder as a lxc mount point for jellyfin
```sh
mkdir -p /root/transcode
chmod -R a+rw /root/transcode
```
set the transcode folder in jellyfin mount point
