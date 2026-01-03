#### Powershell 
```
winget install gnu.nano
nano $profile
```
Add these lines into PowerShell profile
``` powershell
Set-PSReadlineKeyHandler -Key ctrl+d -Function ViExit
Set-Alias -Name current_video "$HOME\scripts\rmdir.ps1"
Set-Alias which where.exe
Set-Alias kidm "$HOME\scripts\kidm.ps1"
Import-Module 'gsudoModule' 
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