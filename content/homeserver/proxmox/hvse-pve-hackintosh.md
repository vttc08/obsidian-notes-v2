**Monterey**
https://github.com/HarveysVE/tutorials/tree/main/How%20to%20Install%20Hackintosh%20The%20New%20Way%20Using%20Proxmox%20In%20Depth%20Guide
IOMMU, set video off, iommu=pt [[pve-passthrough]]
Add modules

**Ventura**
Same step but download the Ventura ISO from Archive.org
https://github.com/thenickdude/KVM-Opencore/releases
Download the new OpenCore ISO from this page
Same installation step as Monterey but if during the installation it errors, force stop the VM

Download OpenCore ISO from Github of HVSE

For VM configuration refer to [[spoto-pve-hackintosh]], the difference is that HVSE did not use 'pre-enroll keys', he also chosen host for CPU type instead of Penryn, and chosen 'VMWare network'.

https://archive.org/details/macos-collection
Download MacOS 12.6.1 Monterey
Add the OpenCore and Monterey ISO. Change the cdrom to cache=unsafe

The command to put in `/etc/pve/qemu-server/[].conf`
```
args: -device isa-applesmc,osk="ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc" -smbios type=2 -device usb-kbd,bus=ehci.0,port=2 -cpu host,kvm=on,vendor=GenuineIntel,+kvm_pv_unhalt,+kvm_pv_eoi,+hypervisor,+invtsc
```

`fs0:\System\Library\CoreServices\boot.efi` 
use this command once in the terminal
 
Follow the same installation step in [[spoto-pve-hackintosh]]

OpenCore Configuration 
https://mackie100projects.altervista.org/opencore-configurator/
- mount the QEMU Harddisk media EFI first (not the VirtIO Block)
- mount the VirtIO disk
- Drag the EFI folder from QEMU Hard Disk to VirtIO Block

Under `/EFI/OC/config.plist`
Open with OC Configuration, under Platform Info
- he has chosen Mac Mini Late 2018

**Fixing RAM**
On proxmox host use
`dmidecode --type 17` to get the ram information (bits, speed)
Form Factor: 0x09 - DIMM
BankLocator: BANK 0 and BANK 1
DeviceLocator: DIMM_A1 and DIMM_B1
Manufacturer: Corsair
Check *custom memory*
Set the size and speed accordingly

In Misc, under timeout, 5s

https://github.com/dortania/OpenCore-Legacy-Patcher/releases
Download OC Legacy Patcher
- choose the Patcher GUI app
Post-install root patch -> Start root patching

**Fix iMessage/AppleID**
Using OpenCore Configuration and edit the config.plist
PlatformInfo, Select Mac Mini Late 2018
https://www.youtube.com/watch?v=0RW52aledCE
Go to System Settings -> General -> System Report -> Ethernet
- make sure BSD Device Name is en0

Find the MAC Addr of the Ethernet device and paste it into ROM of "DataHub - Generic - PlatformNVRAM", remove all the : 
`12:34:56:AB` to `12 34 56 AB`
Paste Serial Number of the System from SMBIOS into MLB (DataHub) and add 5 random letters.
Now copy the MLB (the one with 5 random letters) to SMBIOS Serial Number under Board
Use terminal `uuidgen` to generate a UUID and copy it to UUID of SMBIOS under System
Save config and reboot

Checking the Serial Number
https://checkcoverage/apple.com
Copy the generated serial number 
it should display *we're unable to check coverage for this serial number ...* NOT *valid purchase date*

https://dortania.github.io/OpenCore-Post-Install/universal/iservices.html#clean-out-old-attempts
Alternative ROM
`00:16:CB	Apple	Apple, Inc.`
make up the last 3 octet and convert to lowercase without : 
eg `00:16:CB:11:22:33` `0016cb112233`
Remember to clean out old NVRAM





