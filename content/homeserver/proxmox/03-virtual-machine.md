# Proxmox VM

## Quick Info
- VMID: unique number between 100 and 999999999 (3-9 digits)
	- this can be renamed in `/etc/pve/qemu-server/<VMID>.conf`
- Name: use hostname
- After creation tasks: see [VM Todo](#vm-todo)

## VM Creation Checklist
### 1) System
![[Pasted image 20230722173056.png]]
- Enable QEMU Agent so guest actions (shutdown, snapshot) work more reliably
- BIOS:
	- Use OVMF when PCIe passthrough is needed
	- OVMF is UEFI compatible
	- Add EFI disk to preserve boot order
- Machine Type:
	- i440fx or Q35 (Q35 required for PCIe passthrough)
- SCSI Controller:
	- Prefer VirtIO SCSI

### 2) Hard Disk
Reference: https://blog.joeplaa.com/benchmark-proxmox-virtual-disk-settings/

![[Pasted image 20230722194002.png]]
- Bus Device: SATA, VirtIO SCSI, or VirtIO-blk
- Image Format:
	- qcow2: file-based, supports snapshots
	- raw: pre-allocated, better performance
- Trim/Discard:
	- Keep ON so disk space can be reclaimed
	- Use discard on SSD storage (TRIM support)
	- Works with thin provisioning (unused blocks reclaimed after file deletion in guest)

### 3) Cache / Backup
![[Pasted image 20230722202738.png]]
- Set disk to no backup if this VM disk should be excluded from VM backups

### 4) CPU
- Total allocated vCPU across all VMs can exceed host physical cores (oversubscription)
- Example: 4 VMs x 4 cores on an 8-core host is possible
- Use CPU type host for passthrough and better performance

### 5) Memory
![[Pasted image 20230722212243.png]]
- With PCI passthrough, RAM may be pre-allocated
- Keep memory ballooning enabled unless there is a specific reason to disable it

### 6) Network
![[Pasted image 20230722212436.png]]
- Bridge to vmbr0 for direct LAN access
- Prefer VirtIO NIC for best performance (better than Realtek/E1000 emulation)

## Windows VM Notes
Reference: https://pve.proxmox.com/wiki/Windows_10_guest_best_practices

- Use VirtIO drivers
- Driver ISO: https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso
- Enable QEMU Agent
- Disk: use SCSI controller + VirtIO SCSI
- Cache: writeback
- VirtIO SCSI driver path during install: /vioscsi/w10/amd64
- Install additional drivers via MSI on the VirtIO ISO
- Keep memory ballooning enabled
- QEMU guest agent installer path: /guest-agent/{executable}

## VM Todo

### Linux
#### Install QEMU Guest Agent
Restart the VM after installation.

```bash
sudo apt update
sudo apt install qemu-guest-agent
```

### Remote Access (Linux GUI)
SSH or Proxmox WebUI shell is usually enough for terminal access. For GUI workloads, SPICE is often better than the default console.

#### Client (Windows)
Install Virt-Viewer:
https://gitlab.com/virt-viewer/virt-viewer/-/releases/v11.0/downloads/virt-viewer-x64-11.0-1.0.msi

#### Guest VM (Linux)
- Change Display to SPICE
- Shut down and start the VM
- Open Console to download the .vv file
- Open the .vv file with Virt-Viewer

>[!error] Frozen Display on Ubuntu 24.04
>If SPICE display freezes, change Display to VirtIO-GPU.

#### Guest VM (Windows)
Download SPICE client: https://www.spice-space.org/download/windows/spice-guest-tools/spice-guest-tools-latest.exe

>[!error] Fix Code 53 on Windows Server
>https://askubuntu.com/questions/1508638/qemu-kvm-windows-11-code-52-error-with-display-driver
>Download the third file.
>In windows, uninstall the QXL driver (may need to switch to default display) and manually load the driver from folder.
## Cloud-Init Templates

### Prepare Linux Cloud-Init Template
1. Verify cloud-init is installed
2. Edit /etc/cloud/cloud.cfg
3. Install whois to use mkpasswd
4. Generate password hash with mkpasswd -m sha-512

Example cloud-init snippet:

```cfg
users:
  - default
  - name: name_of_user
    lock_passwd: false
    passwd: {password_hash}
    gecos: Name
    groups: sudo
    sudo: ["ALL=(ALL) NOPASSWD:ALL"]
    shell: /bin/bash

timezone: "America/Vancouver"

packages:
  - package_name
```

### Clean VM Before Converting to Template
1. Remove SSH host keys: cd /etc/ssh && sudo rm ssh_host_*
2. Reset machine ID: sudo truncate -s 0 /etc/machine-id
3. Ensure /var/lib/dbus/machine-id links to /etc/machine-id
4. If needed, recreate symlink: sudo ln -sf /etc/machine-id /var/lib/dbus/machine-id
5. Clean package cache: sudo apt clean && sudo apt autoremove -y
6. Confirm cloud-init config and package list

### Convert VM to Template
- Detach ISO
- Add CloudInit drive and choose storage location
- In Cloud-Init settings, define username/password or SSH key

### Clone from Template
- Full Clone: full copy of template (independent)
- Linked Clone: lower storage use, depends on base template