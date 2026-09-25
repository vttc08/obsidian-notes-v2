WSL Disk Location
```c
%LOCALAPPDATA%\Packages\TheDebianProject.DebianGNULinux_76v4gfsz19hv4\LocalState\ext4.vhdx
```
[Cleanup WSL Data](docker-desktop.md)
### SSH
```bash
sudo apt install openssh-server
sudo sed -i -E 's,^#?Port.*$,Port 2022,' /etc/ssh/sshd_config
sudo service ssh reload
```
Enable with `systemctl`
```bash
sudo systemctl enable --now ssh
```
#### Windows Setup
Switch to mirrored networking mode and use experimental flag in `~/.wslconfig`. Then restart WSL.
```
[wsl2]
networkingMode=mirrored
dnsTunneling=true

[experimental]
hostAddressLoopback=true
```
Add in Windows Firewall
```powershell
gsudo New-NetFirewallRule -DisplayName "WSL SSH 2022" -Direction Inbound -Protocol TCP -LocalPort 2022 -Action Allow
```

The rules below are used for NAT setup.
~~Start `portproxy`~~
```powershell
gsudo Set-Service iphlpsvc -StartupType Automatic
gsudo Start-Service iphlpsvc
```
~~Port forwarding rule~~
```powershell
gsudo netsh interface portproxy delete v4tov4 listenport=2022
$WSL_IP = (wsl hostname -I).Trim().Split(" ")[0]
gsudo netsh interface portproxy add v4tov4 listenport=2022 listenaddress=0.0.0.0 connectport=2022 connectaddress=$WSL_IP
```