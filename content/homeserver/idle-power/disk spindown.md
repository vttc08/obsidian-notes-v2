https://yewtu.be/watch?v=IfFyHizCn6k
https://wiki.archlinux.org/title/hdparm
Spindown disk immediately (sleep mode)
```
sudo hdparm -Y /dev/sdb
```
Spindown disk while and be able to check idle state (standy)
```
sudo hdparm -y /dev/sdb
```

Check the status of disk standy/idle, not possible to check if disk is in full sleep mode
`sudo hdparm -C /dev/sdb`
Check the status without waking up the drive using smartctl
```sh
smartctl -i -n standby /dev/sdb
```

Set idle timer in terminal (no options to check the current)
`hdparm -S 5 /dev/sdb`
- 0-240 multiple of 5s
- 240-255 multiples of 30min

Hard Drive power saving mode APM
`hdparm -B 0-255 /dev/sdb`

Read the hard drive temperature
`hdparm -H`

Benchmark hard drive
`hdparm -t`

### hd-idle
In the case hdparm do not work correctly, this is the utility to use.
```bash
sudo apt install hd-idle
```

Edit the configuration options at `/etc/defaults/hd-idle`
```
HD_IDLE_OPTS="-i 0 -a sda -i 120 -a sdd -i 60 -a sdc -i 60 -l /var/log/hd-idle.log"
```
- the first `-i 0` sets the default spindown timer for all disks in the system
- `-a` is for which device to spindown if there are multiple, it has to be in the format of `sdx` without the `/dev`
	- try using `hd-idle -t disk-name`, if there is an error such as `No such devices /dev//dev/xxx` then add the disk name without the `/dev`
- `-i` sets the spindown time in seconds for the device to be spun down in `-a`
- `-l` set the log location, hd-idle will write to log every time a disk spinup
Check whether HDD's are really spun down
```shell
watch 'for i in a b c d; do sudo smartctl -i -n standby /dev/sd$i | grep -Ei "power|model"; done'
```
Refined scripts in `/var/scripts`
```bash
watch --color bash /var/scripts/hdd
```

systemd automation
```bash
sudo systemctl start hdd@data2 # hdd@mount start keepalive
sudo systemctl stop hdd@data2 # stop keepalive
```

