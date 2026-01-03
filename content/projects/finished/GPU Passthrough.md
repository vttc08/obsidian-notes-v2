```bash
lspci -nn | grep -E "NVIDIA"
```
- find the 4:4 ID for the audio and VGA and USB

Edit Grub `/etc/default/grub`
```bash
CMD_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt vfio-pci.ids={comma,separated}"
```

Then update-grub
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

Reboot

Create vfio file `/etc/modprobe.d/vfio.conf`
```
options vfio-pci ids={comma,separated,ids}
softdep nvidia pre: vfio-pci
softdep nouveau pre: vfio-pci
```

Update initramfs
```bash
sudo update-initramfs -u
```

Reboot
- after reboot, run `lspci -k` and verify the kernel driver in use is `vfio-pci`

Virtual Machine Manager
```bash
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager
sudo adduser $USER libvirt
sudo adduser $USER kvm
sudo systemctl enable --now libvirtd
```
start libvirt on boot `sudo systemctl enable --now libvirtd`
Launch 
When creating a virtual machine at first time and choosing machine type and firmware, need to select `q35` and `UEFI` as this can't be changed later
q35+UEFI
Add Hardware -> PCI Host Device -> add both Audio and VGA