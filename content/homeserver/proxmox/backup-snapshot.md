**Backup**: separate from the virtual machine, full clone
- Snapshot - PVE will live backup, guest agent will try to freeze filesystem
- Suspend - not recommended, more downtime
- Stop - stop the VM then create a backup
In datacenter view backup, there is ability to create a backup on schedule
![[Pasted image 20230725234829.png]]


**Snapshot**: part of the VM disk not migrated
- used for testing a new software
- can be used to include RAM states