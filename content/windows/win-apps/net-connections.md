For connecting to and from networked resources, eg. SMB, SSH, Wireguard
## SSH
Remember to not use strict host checking for automating ssh login.
```powershell
ssh -o StrictHostKeyChecking=no $target
```
- every subsequent logins will be immediate
### SSH Server
https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui&pivots=windows-11
Install 
```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server
```
- this takes a very long time
Enable --now
```powershell
Set-Service -Name sshd -StartupType 'Automatic'
Start-Service sshd
```
SSH Authorized Keys
```powershell
gsudo vim 'C:\ProgramData\ssh\sshd_config'
```
Ensure these lines are deleted
```powershell
Match Group administrators
    AuthorizedKeysFile **PROGRAMDATA**/ssh/administrators_authorized_keys
```
Use PowerShell as default shell (must run everything as admin)
https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh-server-configuration
```powershell
$NewItemPropertyParams = @{
    Path         = "HKLM:\SOFTWARE\OpenSSH"
    Name         = "DefaultShell"
    Value        = "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"
    PropertyType = "String"
    Force        = $true
}
New-ItemProperty @NewItemPropertyParams
```
## SMB
### Server
```powershell
New-SmbShare -Name Exports -Path "C:\Users\hubcc\Desktop\Exports" -FullAccess "hubcc"
```
- Name
- Path (preferably absolute path or resolved path)
- FullAccess can provide the username of the computer (or use `$(whoami)`)
```powershell
Remove-SmbShare -Name ""
```
### Client
Must run this on non-admin.
```powershell
New-PSDrive -Name "R" -Root \\10.10.120.16\data_share -Persist -Scope Global -PSProvider FileSystem
```
- `Name`: the drive letter
- `Root`: the IP address and path of SMB share
- `Persist`: required to make it show up in Windows Explorer
- `-Scope Global -PSProvider Filesystem`
You may need to use `cmdkey` to add SMB credential into Windows Credential
```powershell
cmdkey /add:"10.10.120.67" /user:"username" /pass:'passw0rd'
```
- the `/add` puts it into Windows Credential
Remove
```powershell
Remove-PSDrive -Name ""
```
```powershell
cmdkey /delete:"10.10.120.67"
```
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
## RustDesk (Incoming)
https://github.com/auchavez/Rust-Desk-Client-Deployment
Specific script https://raw.githubusercontent.com/auchavez/Rust-Desk-Client-Deployment/refs/heads/main/Client-Deployment.ps1

Changes is required for the it to work
Remove these lines
```powershell
# === Custom Configuration ===
$rendezvousAddress = "your.domain.com"
$relayPort         = "21116"
$publicKey         = "REPLACE_ME_PUBLIC_KEY"
===
$tomlContent = @"
rendezvous_server = '$rendezvousAddress:$relayPort'
nat_type = 1
serial = 0
===
custom-rendezvous-server = '$rendezvousAddress'
key = '$publicKey'
whitelist = '192.168.1.1,10.0.0.1,172.16.0.0/16'
```
Change the password
```powershell
$passwordPlain     = "REPLACE_ME_PASSWORD"
```