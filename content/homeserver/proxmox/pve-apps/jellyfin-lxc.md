[Intel GPU | Jellyfin](https://jellyfin.org/docs/general/administration/hardware-acceleration/intel/#configure-with-linux-virtualization)
Documentation specific for UHD630 on Debian based system
Enable LP Encoding in host
`sudo apt update && sudo apt install -y firmware-linux-nonfree`
install `firmware-linux` if on Ubuntu

```sh
sudo mkdir -p /etc/modprobe.d
pu
```
reboot PVE host and check for error
```sh
sudo dmesg | grep i915  
sudo cat /sys/kernel/debug/dri/0/gt/uc/guc_info  
sudo cat /sys/kernel/debug/dri/0/gt/uc/huc_info
```

Create a LXC container privileged
install sudo first to easily copy commands
install jellyfin
```sh
sudo apt install curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
Types: deb
URIs: https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )
Suites: $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )
Components: main
Architectures: $( dpkg --print-architecture )
Signed-By: /etc/apt/keyrings/jellyfin.gpg
EOF

```
```sh
sudo apt update
sudo apt install -y jellyfin
sudo apt install -y intel-opencl-icd
```

**Configure LXC**
go to `/etc/pve/lxc/xxx.conf` add these lines
```sh
lxc.cgroup2.devices.allow: c 226:0 rwm
lxc.cgroup2.devices.allow: c 226:128 rwm
lxc.mount.entry: /dev/dri/renderD128 dev/dri/renderD128 none bind,optional,create=file
```
give access to jellyfin user
```sh
sudo usermod -aG video jellyfin
sudo usermod -aG input jellyfin
```
and give access to whatever the user output of `ls -l /dev/dri` shows
restart the container

**Add Storage**
`pct set [id] -mp0 mp=/host/path,/container/path`
if mp0 is occupied use mp1, mp2

**Verify**
`sudo apt update && sudo apt install -y intel-gpu-tools`
`intel_gpu_top` for monitoring
Check these commands in container
```sh
sudo /usr/lib/jellyfin-ffmpeg/vainfo --display drm --device /dev/dri/renderD128
```
```sh
sudo /usr/lib/jellyfin-ffmpeg/ffmpeg -v verbose -init_hw_device vaapi=va:/dev/dri/renderD128 -init_hw_device opencl@va
```