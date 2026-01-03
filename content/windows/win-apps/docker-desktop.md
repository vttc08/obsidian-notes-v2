### Optimize Space used up by Docker in Windows
The same also applies for WSL.
Check WSL usage
```bash
sudo ncdu / --exclude /mnt
```
WSL Disk Location
```c
%LOCALAPPDATA%\Packages\TheDebianProject.DebianGNULinux_76v4gfsz19hv4\LocalState\ext4.vhdx
```
Docker Disk Location
```c
%LOCALAPPDATA%\Docker\wsl\data\ext4.vhdx
```
Shrink VHD size
- first shutdown wsl first
```c
diskpart
select vdisk file="%LOCALAPPDATA%\Docker\wsl\data\ext4.vhdx"
attach vdisk readonly
compact vdisk
detach vdisk
```

