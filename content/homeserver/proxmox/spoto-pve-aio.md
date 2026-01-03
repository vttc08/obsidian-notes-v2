https://youtu.be/Mg4v5trSM9A?list=PL1yJe5g-wSuG6bytTYnwQXcXTPJSc5aMY

![[Pasted image 20230727223412.png]]
![](assets/Pasted%20image%2020240419231638.png)

After installing PVE, the ETH3 (enp4s0) is bridged to vmbr0
*ethtool enp...* and check link detected status (which is helpful to check which port is mapped)
Assigning VirtIO network for the OpenWRT VM bridges the vETH (in the Router) with vmbr0 (which is the PVE interface)
- In the video there will be 4 if in OpenWRT, 1 will be the VirtIO bridged network, and the other 3 are from PCI passthrough

Change the `local:iso.... media=cdrom` to `cache=unsafe` will convert ISO image to disk image

After connecting the computer to ETH3 on the PC, there are no DHCP, so need to set static IP
- 192.168.1.x to access PVE
- 192.168.the-default-subnet-of-openwrt.x to access router
- although PVE and router is connected with bridge, static IP of specific subnet is needed
In owrt, he changed the network range to 192.168.1.x (same subnet as PVE) and enabled DHCP, now setting DHCP on Windows network setting will work, and PVE access is restored.

Using Docker in LXC
[[pve-apps/docker-lxc]]

Filesharing between LXC via Samba
[[pve-apps/smb-share]]

![[Pasted image 20230727233548.png]]

PCI passthrough allows for full utilization with additional CPU usage but the host cannot use it.

**VM Storage**
File (qcow2) and block (raw) are type of virtual disks, file disks can only be stored on local and not local-lvm

RDM passthrough
- can pt a single disk not the entire controller
- but unable to spindown disk or get smart info
1. get the UUID of the disk
2. `qm set {vmid} -scsi[x] /dev/disk/by-id/id...`

Controller: pt to VM as if the VM has full access to disks