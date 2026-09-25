#### Powershell 
The profile folder may not always be available on new computer, make it first
```powershell
mkdir -Force ($profile | split-path)
```
Add these lines into PowerShell profile
``` powershell
Set-PSReadlineKeyHandler -Key ctrl+d -Function ViExit
Set-Alias -Name current_video "$HOME\scripts\rmdir.ps1"
Set-Alias kidm "$HOME\scripts\kidm.ps1"
Set-Alias curl curl.exe -Option AllScope

function ll { Get-ChildItem -Force | Format-Table -AutoSize }

function rmrf($dir) { Remove-Item -Recurse -Force $dir }

function which($name) {
    Get-Command $name | Select-Object -ExpandProperty Definition
}

Import-Module 'gsudoModule'
Set-Alias sudo gsudo

Invoke-Expression (& { (zoxide init powershell --cmd cd | Out-String) })
Set-Alias z cd
```
- these will make terminal window exit on ctrl-d
- use the `which` command as if on Linux
Ensure the scripts folder are located at `$HOME\scripts`
- the scripts in these folder are quick scripts also used in task scheduler
- the folder contains the `.ps1` files as well as `.xml` file which is used for importing tasks in the scheduler
The scripts in that folder can also be added in powershell alias
```powershell
new-alias the-alias $env:USERPROFILE/scripts/thescript.ps1
```

### Packages
Winget installation doesn't work over SSH, use choco install
```powershell
choco install fzf zoxide -y
```
Zoxide uses different init command for Powershell
```powershell
Invoke-Expression (& { (zoxide init powershell --cmd cd | Out-String) })
```

### Vim
The Windows version of Vim is gVim
```powershell
winget install vim.vim
```
Additional steps is required to add Vim into system path
- must run with Admin
```powershell
$CurrentPath=[System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::Machine)
$updatedPath="$currentPath;C:\Program Files\Vim"
[System.Environment]::SetEnvironmentVariable("Path", $UpdatedPath, [System.EnvironmentVariableTarget]::Machine)
```
### Reload Path
Afterward, need to manually refresh the path so it's available in the current session
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```
