In the Windows installer, choose Language "English (world)", this disable all the bloatware and MS Store
- to re-enable, search for region in the settings, change back from world to US/Canada
**Win 11 Only**
Bypass network and account requirement, `Shift-F10` for command prompt
```
oobe\BypassNRO
```

Powershell
- these allow Powershell execution and Winget
```powershell
Set-ExecutionPolicy Unrestricted -Force
echo Y | winget search anything
```
First install gsudo
```powershell
winget install gsudo
```

Uninstall McAfee and other bloatware
Uninstall OneDrive (require agree ToS)
```powershell
echo y | winget uninstall microsoft.onedrive
```

`HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders`
Use RegEdit to edit the location of Documents, Download, Desktop, Pictures, Music, Videos folder to %USERPROFILE%\folder

https://support.microsoft.com/en-gb/topic/operation-to-change-a-personal-folder-location-fails-in-windows-ffb95139-6dbb-821d-27ec-62c9aaccd720
https://www.tenforums.com/tutorials/16278-enable-disable-onedrive-integration.html
[Download](https://www.tenforums.com/attachments/tutorials/31326d1439576957-onedrive-integration-enable-disable-windows-10-a-disable_onedrive_integration.reg)
Disable OneDrive using regedit to have custom location for user profile folders
```powershell
Windows Registry Editor Version 5.00  
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\OneDrive]  
"DisableFileSyncNGSC"=dword:00000001
```

Enable Full Context Menu
https://www.elevenforum.com/attachments/disable_show_more_options_context_menu-reg.8879/?hash=4dc0214cd4038aad11031d926f1884b5
```powershell
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}]
@=""

[HKEY_CURRENT_USER\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32]
@=""
```

Change the three finger tap to middle mouse button
```powershell
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\PrecisionTouchPad]
"ThreeFingerTapEnabled"=dword:00000004
```
- laptop only

Disable UAC (Win 10 Only)
> [!danger]+ Windows 11 Drag and Drop
> If `EnableLUA` is enabled, then everything runs as admin and drag and drop does not work on Windows 11. The same effect is not observed when disabling UAC manually. The effect on Windows 10 is unknown.
```powershell
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
"EnableLUA"=dword:00000000
```

Set dark theme
```powershell
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize]
"AppsUseLightTheme"=dword:00000000
"SystemUsesLightTheme"=dword:00000000
```

**Customizing Explorer**
Show file extensions and hidden files and remove recommended files
```powershell
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced]
"HideFileExt"=dword:00000000
"Hidden"=dword:00000001


[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer]
"ShowRecommendations"=dword:00000000
"ShowFrequent"=dword:00000000
```
Pin home folder to quick access
```powershell
$o = New-Object -com shell.application
$o.NameSpace($env:USERPROFILE).Self.InvokeVerb("pintohome")
```
Remove Gallery Folder (Win 11 only)
```powershell
echo yes | reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace_41040327\{e88865ea-0e1c-4e20-9aa6-edcd0212c87c}"
```
#### Installing Apps
[!general](win-apps/!general.md)
Install Syncthing tray and Obsidian
```powershell
winget install Martchus.syncthingtray
winget install Obsidian.Obsidian
```
- restore ssh keys, music, obsidian notes with Syncthing
- default port 8384

Folders to add to Syncthing
`~\Documents\ssh`
`~\Documents\Projects`

WinRAR (basic tool needed for others)
Configure Winrar (in the future upload to own git repo)
```powershell
winget install WinRAR
wget https://gist.githubusercontent.com/MuhammadSaim/de84d1ca59952cf1efaa8c061aab81a1/raw/ca31cbda01412e85949810d52d03573af281f826/rarreg.key -O "C:\Program Files\Winrar\rarreg.key"
```

HEVC
https://store.rg-adguard.net/ and enter https://www.microsoft.com/store/productId/9nmzlz57r3t7 and select `Retail`, alternatively use an existing appx. To install it
```powershell
add-appxpackage $path_to_hevc
```
Software to be configured
Install QuickLook (Microsoft app)
- to install MS apps using winget, a stdin input of Y is required
```powershell
echo Y | winget install 9NV4BS3L1H4S # QuickLook example
```
Configure QuickLook to start at login (cannot be automated), it is also possible QuickLook will add itself on first startup.

PuTTY and other SSH settings
[net-connections](win-apps/net-connections.md)

#### Web Browsers
[Firefox](win-apps/!general.md#Firefox)
[Chrome](win-apps/!general.md#Google%20Chrome)
Chrome
- change default browser to chrome
- [[SetUserFTA & Browser]]
- Copy the chrome data `%LOCALAPPDATA%\Google\Chrome\User Data\`
Restore Taskbar Items
Backup chrome taskbar items
`%APPDATA%\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar`
Export registry
`Computer\HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Taskband`

**Debloat**
OOShutUp
MSEdge
- disable tracking in the web
- disable personalizing advertising
Cortana
- disable and reset Cortant
Misc
- disable automatic installation of recommended Windows Store Apps
- disable meet now button
- disable sync of windows design settings
OOS has ability to export config file, settings apply need restart

BloatyNosy
Removing MS Store apps
`Get-AppxPackage -allusers SpotifyAB.SpotifyMusic | Remove-AppxPackage`
this command remove Spotify 

List of apps classified as bloatware in Windows 10 and 11
`* means wildcard*`
AD2F1837* are HP bloatware
B9ECED6F* are Asus bloatware
Microsoft.549981C3F5F10 is Cortana
Wildcard uninstallation by powershell is supported


The list of bloatware is found at `./windows/bloatware.txt`
```powershell
$apps = Get-Content -Path .\bloatware.txt

foreach ($app in $apps) {
    Get-AppxPackage -AllUsers $app | Remove-AppxPackage
}
```

Unpin all the apps from start menu (Windows 11)
Option 1:  remove/backup all the files from this location 
`%LocalAppData%\Packages\Microsoft.Windows.StartMenuExperienceHost_cw5n1h2txyewy\LocalState`
Option 2: use a fresh start2.bin located in `./windows` folder

Useful snippet for debloating
https://superuser.com/a/1791352
https://github.com/andrew-s-taylor/public/blob/main/De-Bloat/RemoveBloat.ps1

Disable Windows Feature Update
https://github.com/ChrisTitusTech/winutil/blob/8e138c38d396955570a564537b55f9ea17645ff9/functions/public/Invoke-WPFUpdatessecurity.ps1#L4

Remove startup apps
These are the locations that taskmgr query for apps
```
 HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
```

```
 HKLM\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Run
```

```
 C:\Users\\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
 HKCU\Software\Microsoft\Windows\CurrentVersion\Run
```
These are the entries for which startup can be set as disabled or enabled
```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\RunHKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run
```
If an item in that location is enabled, it should have binary value of `02 00 00 00 00 00 00 00 00 00 00 00`
Change it to any value other than that to disable it.

Find a way to disable all notification for `Suggested`