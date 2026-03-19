https://youtu.be/_u8qTN3cCnQ
If need to increase storage
- go to storage tab of datacenter
- delete the local-lvm
- `lvremove /dev/pve/data`
- `lvresize -l +100%FREE /dev/pve/root`
- `resize2fs /dev/mapper/pve-root

Add storage in Datacenter view

Thin Provisioning
- possible on local-lvm storage
Containers
- if the rootfs is on lvm-thin run `fstrim -av` it will reclaim unused space
Linux VM
- set "discard" on
- run `sudo fstrim -av` to reclaim space

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