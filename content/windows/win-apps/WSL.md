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
Start `portproxy`
```powershell
gsudo Set-Service iphlpsvc -StartupType Automatic
gsudo Start-Service iphlpsvc
```
Port forwarding rule
```powershell
gsudo netsh interface portproxy delete v4tov4 listenport=2022
$WSL_IP = (wsl hostname -I).Trim().Split(" ")[0]
gsudo netsh interface portproxy add v4tov4 listenport=2022 listenaddress=0.0.0.0 connectport=2022 connectaddress=$WSL_IP
```