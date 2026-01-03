Turn on IOMMU
`/etc/default/grub`
add `"intel_iommu=on, iommu=pt"` in `GRUB_CMDLINE_LINUX_DEFAULT`
`update-grub`
For [[spoto-pve-hackintosh]] use this command
`GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream,multifunction nofb textonly nomodeset video=efifb:off"`

For [[hvse-pve-hackintosh]], use 
`dmesg | grep -e DMAR -e IOMMU`
to check for errors

Interrupt remapping
```sh
echo "options vfio_iommu_type1 allow_unsafe_interrupts=1" > /etc/modprobe.d/iommu_unsafe_interrupts.conf
echo "options kvm ignore_msrs=1" > /etc/modprobe.d/kvm.conf
```
Add modules in /etc/modules
```
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

Check the ID
`lspci -n -s 01:00`
find the ID (01:00) with `lspci -v`
`echo "options vfio-pci ids=10de:1b81,10de:10f0 disable_vga=1"> /etc/modprobe.d/vfio.conf`
enter the ID (all of it in `ids=`)
`update-initramfs -u`
reboot the host

Prevent PVE host from using the GPU
```
echo "blacklist radeon" >> /etc/modprobe.d/blacklist.conf 
echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf 
echo "blacklist nvidia" >> /etc/modprobe.d/blacklist.conf
```
When using PCI passthrough, all the RAM is pre-allocated, no ballooning.

When choosing all function when selecting a GPU for passthrough, all the subgroup of a devices with function (eg. both VGA and audio for a GPU)

To start a system with iGPU only when dGPU is plugged in, enable iGPU Multi-Monitor and Primary Display to iGPU in the BIOS.

If GPU require a rom file, edit the configuration of VM
`hostpci0: ...., romfile=file.rom` file.rom is placed in /usr/share/kvm
