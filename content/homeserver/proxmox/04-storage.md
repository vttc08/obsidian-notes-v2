When configuring storage, it's important to distinguish between **Datacenter view** and **host view**. For storage management, particularly for shared or external resources, the **Datacenter view** is the primary location.

Here are some key points regarding storage configuration within the Datacenter view:

* **Thin Provisioning**: This is a feature supported by `local-lvm` storage.
* **Linux Containers**: The `rootfs` for containers must reside on `local-lvm`.
* **Linux VMs**: For Linux VMs, ensure "discard" is enabled for their disks. You can manually trigger this with:
```bash
sudo fstrim -av
```
* **Windows VMs**: For Windows VMs, run the following command in an administrative PowerShell:
```powershell
defrag C: /o
```

### Storage Layout
For local storage, the default location is
```c
/var/lib/vz
```
These are the files
```bash
./dump # VM/CT full backup
./images # VM/CT disks (.raw/.qcow2)
./template/cache # container templates
./template/iso # VM images
```
## External Drives
Config file
```bash
/etc/pve/storage.cfg
```
### SMB
>[!note] Add `smb` to the ID when adding SMB/CIFS drives
>For example, instead of `laptopserver`, use `smb-laptopserver`, so that the location will be ranked later than `local` and `local-lvm

When creating a SMB/CIFS drive, add a subdirectory e.g. `/pve`
- such that PVE related folders will be placed in `./pve/dump|image` instead at the root folder of the SMB drive
## Resize VM Disk
### Increase
On the VM Hardware, `Disk Action` > `Resize`
- add the size increment
Shutdown and start the VM
On the guest machine (Linux)
```bash
sudo parted /dev/sda
```
- where `sda` is the physical disk
- use `print` to check partitions, e.g. `Number` and find the primary partition
```
resizepart 2 100%
```
- where `2` is the main primary partition number above
```bash
sudo resize2fs /dev/sda2
```

https://youtu.be/_u8qTN3cCnQ
If need to increase storage
- go to storage tab of datacenter
- delete the local-lvm
- `lvremove /dev/pve/data`
- `lvresize -l +100%FREE /dev/pve/root`
- `resize2fs /dev/mapper/pve-root

