---
quickshare-date: 2023-07-28 23:43:48
quickshare-url: "https://noteshare.space/note/clknncgnn829401mwiktrflc6#HBHZB3XbqYU1N8YNYNHTrk49jkf/Rk8k523Xd83cZbk"
---
VMID: a unique number between 100 - 999 (will be documented later)
Name: hostname

**System**
![[Pasted image 20230722173056.png]]
- Qemu agent allows guest actions (shutdown, snapshot) to complete better
BIOS
- use OVMF if PCIe passthrough is needed
- OVMF is UEFI compatible
- EFI disk is needed to save the boot order
Type - hardware layout of virtual motherboard
- i440fx or Q35 (required for PCIe PT)
Controller - best to use VirtIO SCSI

Hard Disk
https://blog.joeplaa.com/benchmark-proxmox-virtual-disk-settings/
![[Pasted image 20230722194002.png]]
Bus device (SATA, VirtIO SCSI, VirtIO-blk)
Image Format (raw vs qcow2)
- QEMU qcow2, allow snapshot, file based storage
- RAW, preallocate entire space, better performance
Trim/Discard
- use discard if using SSD (enable TRIM support)
- only available on thin provisioning, delete unused block after deleted in VM

Cache
![[Pasted image 20230722202738.png]]
- set to no backup to skip disk backup of this VM

CPU
- it is possible to have combined number of cores in all VM exceed the total core on the VM
- eg. 4 VM with 4 cores each is possible on 8 core
- setting the CPU type of host allow CPU type passthrough (more performance)

Memory
![[Pasted image 20230722212243.png]]
using PCI passthrough the RAM will be pre-allocated 
- leave ballooning on

Network
![[Pasted image 20230722212436.png]]
- set as vmbr0 (bridged) VM have direct access to Ethernet LAN
- The Realtek and E1000 are virtualized, VirtIO is the best performing

**Window VM**
https://pve.proxmox.com/wiki/Windows_10_guest_best_practices
Require the use of VirtIO drivers
https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso
Check the qemu agent to enable it
VHD: choose SCSI controller and VirtIO SCSI
Cache = writeback
To search for the VirtIO drivers /vioscsi/w10/amd64
Driver install (msi file located directly on the CD)
Memory ballooning
Qemu quest agent /quest-agent/{executable}

**Template** (Linux Cloud-Init)
1. Check if Cloud-Init is installed, if not install it
2. `/etc/cloud/cloud.cfg`
3. install whois in order to create a password hash `mkpasswd`
4. `mkpasswd -m sha-512` to create a password hash

```cfg
users:
	- default # create the default user
	- name_of_user
	  loca_passwd: False
	  passwd: {the has of the password}
	  gecos: Name
	  groups:
	  sudo: ["AL=(ALL) NOPASSWD:ALL"]
	  shell: /bin/bash

- timezone "America/Vancouver"

package:
- the packages need to be installed
```
1. remove ssh host keys
2. cd /etc/ssh, `sudo rm ssh_host_*`
3. `trunate -s 0 /etc/machine-id` empty the machine-id file completely
4. make sure /var/lib/dbus/machine-id is a symlink to /etc/machine-id
5. `ln -s /etc/machine-id /var/lub...' 
6. apt clean and autoremove to remove packages and apt cache
7. add config file and packages
Convert VM to template
- remove attachment to iso
- add CloudInit drive and choose a location
- Under cloudinit, change username and password or ssh key
Clone the template into another VM
- Full Clone: complete copy of original VM
- Linked Clone: require less space but require the base template to run