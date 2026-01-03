Hard drives have many power modes available known as EPC settings.
**Idle_A** - disable processor, disk is still rotating at full speed
**Idle_B** - same as A, but the head is unloaded
**Idle_C** - likely SAS only

### File System
`fdisk` is a Debian command line utility that initialize disks and partition tables (if not using gparted)
- `m` for help
- `g` to create a new GPT partition table
- `n` to create a new partition such as `/dev/sda1`
- `w` to write the change to disk
After a partition is created, use `mkfs` to create a filesystem
```shell
sudo mkfs.ext4 -m 0 -T largefile4 -E lazy_itable_init=0,lazy_journal_init=0 /dev/sda1
```
- `-m 0` leaves no reserved space
- `largefile4` makes each inode larger, these option and `-m 0` is most recommended for [snapraid](snapraid.md) parity drive
- `-E` additional options include no lazy init, this option will fully finish initialization process after creating the filesystem

### openseachest
Tool by Seagate that is used to change EPC settings of hard drives.
[Install](https://github.com/Seagate/openSeaChest/releases)
```bash
sudo ./openSeaChest_PowerControl --scan # get list of device
```
```bash
sudo ./openSeaChest_PowerControl -d /dev/sg0 --showEPCSettings
```
- use `-d` to select the device to show the EPC settings
