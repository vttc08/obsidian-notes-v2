- [x] ~~not working solution~~
- [x] completed but untested
- [ ] future todos

Todos
- [x] ~~gso tso off~~ 
- [x] Disable C-state in grub `intel_idle` (fixed)
```bash
intel_idle.max_cstates=2 # try 2 if 1 works
```
- [ ] Disable ASPM in grub
https://wiki.pulsedmedia.com/wiki/BKHD-1264-NAS_Intel_N100_NAS_Motherboard
```bash
pcie_aspm=off nvme_core.default_ps_max_latency_us=0 pcie_port_pm=off
```
- [ ] Disable C-state and ASPM in BIOS
- [ ] Disable EEE and offloading
```bash
post-up /usr/sbin/ethtool -K <interface_name> tso off gso off gro off
post-up /usr/sbin/ethtool --set-eee <interface_name> eee off
```
- [ ] update intel-microcode
- [ ] additional grub settings
```bash
i915.enable_psr=0 intel_iommu=off
```
- [ ] downgrade PVE to 6.14
```bash
proxmox-boot-tool kernel list
```
- [ ] downgrade PVE to 8 and 6.5 or 6.8
- [ ] debug using netconsole https://www.apalrd.net/posts/2024/pve_netconsole/
- [ ] check BIOS and power supply

