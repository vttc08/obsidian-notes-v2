### General Windows Apps
There will be notes to specific apps setup.

Setup [powershell](powershell.md) first
#### Obsidian
The vault specific settings are handled via syncthing. For application data (eg. what vaults are loaded into obsidian), it's stored in a separate folder at `%appdata%/obsidian`
#### Google Chrome
#### Extensions
**[Wayback Machine](https://chromewebstore.google.com/detail/wayback-machine/fpnmgdkabkmnadcjpehmlllkndpkmiak)**
Setting: General -> "Auto Save Page" if not archived "previously"

#### Firefox
**Backup profile [link](https://support.mozilla.org/en-US/kb/back-and-restore-information-firefox-profiles#w_locate-your-profile-folder)**
The profile location, go to `about:support`. It is under `Application Basics` and `Profile Folder`
`%APPDATA%\Mozilla\Firefox\Profiles`
Make sure to close Firefox before backup.
**Restore**
Copy the profile from the old machine to the new machine in the same location.
Go to the root folder and edit the file `profiles.ini`
```c
[Install308046B0AF4A39CB]
Default=Profiles/wdqvdbya.default-release
Locked=1

[Profile0]
Name=default-release
IsRelative=1
Path=Profiles/wdqvdbya.default-release

[General]
StartWithLastProfile=1
Version=2
```
- There should only be 1 profile `profile0`, delete all other profiles
- Under the `InstallXXX[Default]` and `Profile[Path]` it should reference to the profile name of the folder
To create a new profile shortcut, find the location of Firefox shortcut, then edit its target to `-p ProfileName`
Disable Auto Updates in `policies.json`

**Policies**
https://gist.github.com/vttc08/4b2dbf55157a61bb2f92de01c566bc19
```powershell
mkdir -Force "C:\Program Files\Mozilla Firefox\distribution\"
wget "https://gist.githubusercontent.com/vttc08/4b2dbf55157a61bb2f92de01c566bc19/raw/8bcebf591b3b4d90897a8c7c8cef5e0bd211a5e5/policies.json" -O "C:\Program Files\Mozilla Firefox\distribution\policies.json"
```
**Profiles**
https://gist.github.com/jooize/5636b9eb975bde30c38b753e9f301de4
Go to `about:profiles` to create a new profile. Sign in to Firefox account and everything should sync, there is also option to import from Chrome. Once everything is setup, the profile will be stored in `%APPDATA%\Mozilla\Firefox\Profiles`. Alternative it's possible to create it via `profile.ini`.
**TODO**: figure out what can be deleted in that profile folder for faster transfer
Once the new profile is created and setup. Go to `about:config` and change these settings
- `taskbar.grouping.useprofile` create and set to true
- `browser.startup.blankwindow` set to false
To create a desktop shortcut use the flag `--no-remote -P "Profile Name"`
- the icon can be changed, the `.ico` file is located in each of the profile folder
- there is a `Firefox Master.psd` located at the root profile folder
#### Microsoft Edge
**Fix your browser managed by organization**
```powershell
taskkill /im msedge.exe /f
reg delete "HKCU\Software\Policies\Microsoft\Edge" /f
reg delete "HKLM\Software\Policies\Microsoft\Edge" /f
```

#### VSCode
Most of the configuration will be synced if logging in via Microsoft account with exception of SSH settings.
SSH settings on stored in Windows at `C:\Users\hubcc\.ssh\config`, these settings are global
Once syncthing is setup, run the powershell script located in `Documents\ssh\ssh_config\configure.ps1` to restore SSH configs

#### Internet Download Manager
~~Make registry edit to prevent auto-update~~
```powershell
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\DownloadManager]
"LstCheck"="01/08/99"
```
~~May need to do it every login~~
Doesn't work, alternative method. When update popup, use `kidm` to force and process of opening and closing and minimizing the app. The `kidm` script is located in `$HOME\scripts\kidm.ps1`
IDM may place incomplete and uncancelled downloads in this folder
```c
%APPDATA%\IDM\DwnlData
```
#### ThioJoe Explorer App
Reference https://youtu.be/tTo_MSUIHf8
Download https://github.com/ThioJoe/AHK-Scripts/releases the exe file.
Place the exe file into `C:\Program Files` or any privileged dir.
Add the app to startup

**ShareX**
```powershell
winget install sharex.sharex
```
For all settings and configurations, ShareX