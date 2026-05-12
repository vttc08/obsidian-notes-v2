## Firewall
Firewall rule must be enabled on **Datacenter** and **Node** level for any container levle firewall rules to be active.

Here's the policy on datacenter level which enables everything.
![](assets/Pasted%20image%2020260428145408.png)

Here's a checklist for enabling firewall rule on a container/VM
- enable Firewall on datacenter and host
- enable Firewall on the container under Firewall and add a policy
- under Network > check Firewall on
	- for VM, it Hardware > Network Device

