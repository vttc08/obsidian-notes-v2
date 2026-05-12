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
## NFS
```powershell
Enable-WindowsOptionalFeature -FeatureName ServicesForNFS-ClientOnly, ClientForNFS-Infrastructure -Online -NoRestart
```
## Iperf3
Iperf used for network testing, for instruction on how to use instead of installation refer to [iperf3](../../linux/iperf3.md)
```powershell
winget install ar51an.iperf3
```
## Proxmox
Spice connection uses this software
The connection files/shortcut will be placed in 
```powershell
%APPDATA%\Microsoft\Windows\Start Menu\Programs\spice
```
Virt viewer must be installed, see [Proxmox VM](../../homeserver/proxmox/03-virtual-machine.md#VM%20Todo#Remote%20Access)
### cv4pve
https://github.com/Corsinvest/cv4pve-pepper
```powershell
winget install Corsinvest.cv4pve.pepper
```
Basic usage
```powershell
cv4pve-pepper.exe --host $env:PVE_HOST --api-token $env:PVE_TOKEN --vmid 670 --viewer `C:\Program Files\VirtViewer v11.0-256\bin\remote-viewer.exe`
```
- `PVE_HOST`
- `API_TOKEN` or username and password
- `VMID`
- Virt Viewer Location

Setting environment variables
```powershell
[System.Environment]::SetEnvironmentVariable("PVE_HOST", "10.10.120.8", [System.EnvironmentVariableTarget]::User)
```
Using shortcuts
- create a shortcut using the following script 
```powershell
$shortcutPath = "C:\Users\hubcc\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\spice\devbox.lnk"

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)

$shortcut.TargetPath = "cv4pve-pepper.exe"
$shortcut.Arguments = '--host %PVE_HOST% --api-token %PVE_TOKEN% --vmid 670 --viewer "C:\Program Files\VirtViewer v11.0-256\bin\remote-viewer.exe"'
$shortcut.Description = "This is a modified shortcut"
$shortcut.WorkingDirectory = "C:\Windows\System32"

$shortcut.Save()

Write-Host "Shortcut updated and saved."
```