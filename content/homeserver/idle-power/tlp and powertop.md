check configuration `/etc/tlp.conf` to change settings
The default config of Linux Mint
```
Bad           VM writeback timeout
Bad           Enable SATA link power management for host0-5
	cat /sys/class/scsi_host/host*/link_power_management_policy
	- max_performance, medium_power, med_power_with_dipm, min_power (could cause data loss)
	- powertop use "med_power_with_dipm"
Bad           NMI watchdog should be turned off
Bad           Autosuspend for USB device ...
	cat /sys/bus/usb/devices/1-7/power/control
	- by default it's on, powertop change it to auto
Bad           Runtime PM for I2C Adapter i2c-{1-3} (i915 gmbus dpd)
	 cat /sys/bus/i2c/devices/i2c-2/device/power/control
	 - by default it's on, powertop change it to auto
Bad           Runtime PM for PCI Device Intel B150 Chipset LPC/eSPI Controller
	/sys/bus/pci/devices/0000:00:1f.0/power/control
Bad           Runtime PM for disk sd{a-c}
	/sys/block/sdb/device/power/control
Bad           Runtime PM for port ata{1-6} of PCI device: Intel Chipsets Chipset
	/sys/bus/pci/devices/0000:00:17.0/ata{1-6}/power/control
Bad           Runtime PM for PCI Device Intel Chipset SATA Controll
	/sys/bus/pci/devices/0000:00:17.0/power/control
Bad           Runtime PM for PCI Device Chipset Family Power Management Co
	/sys/bus/pci/devices/0000:00:1f.2/power/control
Bad           Runtime PM for PCI Device Realtek PCI Express Gigabit Ether
	/sys/bus/pci/devices/0000:01:00.0/power/control
Bad           Runtime PM for PCI Device 8th Gen Host Bridge/DRAM Registers
Bad           Runtime PM for PCI Device CoffeeLake-H GT2 [UHD Graphics 630]
Bad           Runtime PM for PCI Device Chipset Family USB 3.0 xHCI Contro
Good          Enable Audio codec power management
Good          Autosuspend for USB device xHCI Host Controller [usb2]
Good          Autosuspend for USB device xHCI Host Controller [usb1]
Good          Autosuspend for USB device Ultra USB 3.0 [SanDisk]
Good          Runtime PM for PCI Device Samsung NVMe SSD Controller
Good          Runtime PM for PCI Device Chipset Family HD Audio Controller
Good          Runtime PM for PCI Device Chipset Family PCI Express Root Port 5
Good          Runtime PM for PCI Device Chipset Family PCI Express Root Port 9
Good          Runtime PM for PCI Device Chipset Family SMBus              
```
The default mode of tlp disabled these power management features (on more than the default configuration)
```
Good          Runtime PM for PCI Device Samsung NVMe SSD Controller
Good          Runtime PM for PCI Device Chipset Family HD Audio Controller
Good          Runtime PM for PCI Device Chipset Family PCI Express Root Port 5
Good          Runtime PM for PCI Device Chipset Family PCI Express Root Port 9
Good          Runtime PM for PCI Device Chipset Family SMBus     
```

The battery mode of tlp enabled all power management features except 
```
Bad           Runtime PM for disk sd{a-c}
Bad           Autosuspend for USB device ...
```