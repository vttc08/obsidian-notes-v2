For connecting to networked resources, eg. SMB, SSH, Wireguard
## SSH
Remember to not use strict host checking for automating ssh login.
```powershell
ssh -o StrictHostKeyChecking=no $target
```
- every subsequent logins will be immediate
### Tabby Terminal
```powershell
winget install eugeny.tabby
```
By default it will import SSH config are `config` file.. But for complete configuration and settings, it stores config file at
```
%appdata%/tabby/config.yaml
```
Copying all the content to the computer will restore operation.
### SSH Server
https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui&pivots=windows-11
Install 
```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server
```
Enable --now
```powershell
Set-Service -Name sshd -StartupType 'Automatic'
Start-Service sshd
```
## SMB
## Iperf3
Iperf used for network testing, for instruction on how to use instead of installation refer to [iperf3](../../linux/iperf3.md)
```powershell
winget install ar51an.iperf3
```