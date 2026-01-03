https://www.nicksherlock.com/2021/10/installing-macos-12-monterey-on-proxmox-7/
https://github.com/thenickdude/OSX-KVM 
UEFI and CSM USB
- UEFI better for hardware pt

Download Ubuntu container
Install pre-req `qemu-utils make git`
Clone the osxkvm repo from github
Make the Monterey recovery image
`cd /scripts/monterey`
`make Monterey-recovery.img`
Pull the image from CT to host
`pct pull 100 /file/in/the/CT /var/lib/vz/template/iso/xxx.img` make it available as ISO

Use wget to pull OpenCore from the git repo
gzip OpenCore

For system
Graphic Card: VMWare Compatible
Machine: q35
BIOS: OVMF
EFI Storage: local-lvm
Make sure *pre-enroll keys* and qemu agent is checked

Hard Disks
VirtIO Block
Cache=unsafe

CPU
CPU Core has to be multiple of 2 (if using 6 cores, try 3 sockets of 2 CPU)
Type: Penryn
Enable *NUMA*

`echo "options kvm ignore_msrs=Y" >> /etc/modprobe.d/kvm.conf && update-initramfs -k all -u`
avoid bootloop during macOS

Add these lines in `/etc/pve/qemu-server/ID.conf`
```
args: -device isa-applesmc,osk="ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc" -smbios type=2 -device usb-kbd,bus=ehci.0,port=2 -global nec-usb-xhci.msi=off -global ICH9-LPC.acpi-pci-hotplug-with-bridge-support=off
```

```
-cpu host,kvm=on,vendor=GenuineIntel,+kvm_pv_unhalt,+kvm_pv_eoi,+hypervisor,+invtsc
```

Change both the CD rom into `cache=unsafe`

Erase the VirtIO Block media and create a APFS partition
Reinstall MacOS into the blk media

Under MacOS, open terminal
`diskutil list`
One of the disk contains EFI from OpenCore and 1 disk contains EFI of vdisk
`sudo dd if=/dev/disk-of-open-core-efi of=/dev/disk-of-macos-efi`

USB Passthrough
By device
- not hot-pluggable
By port
- hot-plug
- in order to pt a port, need to plug in something first to select it
- other devices can be plugged into same port
- need to passthrough both usb 3 and usb 2 (plug in usb 3 device and select, then plug in usb 2 device and select again but uncheck usb3)

In MacOS
Setting -> Sharing -> Enable Screen Share
Use VNC Viewer to connect
Download python3.10 and ProperTree
Open `buildapp-select.command`

`sudo diskutil mount disk-the-efi-partition`
`/EFI/OC/config.plist`
Use Ctrl/Cmd-F
showpicker: False
- upon booting no need to select disk
For Navi GPU (RX 5xxx, 6xxx)
- add boot-args `agdpmod=pikera`

Fixing network problem after plugging in a GPU
- the network interface enp[x]s0 may change
- edit the interface in `/etc/network/interfaces`




