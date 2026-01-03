Jay Linux TV
choose EXT4 for disk filesystem
configure static IP address first, tutorial for using dhcp
https://weblog.lkiesow.de/20220223-proxmox-test-machine-self-servic/proxmox-server-dhcp.html
default username: root, use the password set before

By default Proxmox will use enterprise repo and have nag screen, use these to remove it [[pve-todo]]

Containers use less resources compared to VM
- container only use up to the amount of RAM (RAM limit)
- in VM migration occurs live, container requires restart and copy data (not relevant in use case)
- container may have less application compatibility, depends on the application

Creating a new user
- there are 2 realms, PAM (standard Linux) and PVE Auth Server
- PAM is for managing via SSH, PVE user is for managing Web GUI
- the users of different realms are different
`sudo adduser user`
by default the Linux PAM user does not have ability to do anything in PVE web console

Creating Groups
- after creating a group, need to go to permissions tab and choose which permissions to give
- choose a suitable role for that group (eg. admin, manage users)

qm (qemu management command)
`qm start/stop/shutdown/reboot {VM-ID}` 
- reset/stop: hard shutdown/reboot of VM 
`qm set` change configuration of virtual machine

pct (container command)
- command is similar to qm
`pct enter`  - get access to the container shell

