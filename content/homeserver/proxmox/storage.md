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
- run `fstrim -av` to reclaim space
