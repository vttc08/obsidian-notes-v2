Bonds: used for link aggregation for failover
- after bonding change the vmbr bridge port to bond0 interface
- active-backup: sets the failover with 2 or more interface

**Integrated Firewall**
Firewall rule in PVE can be applied to the entire node or for virtual machine. Do not enable firewall until it's properly configured.
By default, the firewall reject all traffic

![[Pasted image 20230726215116.png]]
Source: the IP range for allowed access
Dest. Port: the port on the Proxmox PC

Adding firewall rules in a host will only apply to that host, not the specific CT/VM