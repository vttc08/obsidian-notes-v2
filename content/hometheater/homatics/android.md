# Homatics Box R 4K Android
By default the apps are installed
Clash
File Manager Plus (not cracked)
CoreElec one click switch
Emotn Store
Dangbei Market
Yei Cao helper

TV is already Android 12

## Basic-Navigation
![](assets/Screenshot_16.jpg)
- Up, Down, Left, Right  - The Wheel
- Enter - Center of the wheel
- Back, Home - Android back and home button
- Ch+ - change channel up; Ch- - change channel down

## Firmware Upgrade
Download: https://mega.nz/folder/YgMBSKCJ#xaZtYaJZ_HGKMRkGDmtMRw/folder/0o0VxAJa
To upgrade, hold the reset pin, replug the power to reboot to recovery mode.
Load the `.zip` firmware file onto a USB, only 1 zip file allowed, the filesystem of USB has to be `FAT32`

adb
Download
https://developer.android.com/tools/releases/platform-tools
Put the files in `C:\platform-tools` and add that to `$PATH`
Enable debugging in Android, find the IP address (preferably DHCP reserved).
```c
adb connect 10.10.120.192
```
When finished adb session use `adb disconnect`

Download Jellyfin, Just Player via Google Play

Install other packages
Install other launcher/packages
```c
adb install "path_to_android.apk"
```
The install path can be on local directory or SMB share

Detailed adb commands
[adb-shell](adb-shell.md)



To change launchers, use the app [Launcher Manager](https://xdaforums.com/t/app-firetv-noroot-launcher-manager-change-launcher-without-root.4176349/)

Remap Buttons
https://4pda.to/forum/index.php?showtopic=807930
3.34 does not work, the latest version is 3.22
Netflix button do not work in any apps.

Add Chinese input
- settings, keyboard, Gboard settings, Language
- uncheck "use system language" and add Simplified Chinese
## Projectivy Launcher
Go to Android's accessibility settings
- Enable Projectivy Launcher

Prior to Projectivy Launcher, there is option to edit categories and channels
![](assets/Pasted%20image%2020241105163544.png)
Red: categories, built-in by ProjectIvy Launcher
Blue: channels; offered by third-party apps
- for this launcher install, create a category `Favorites` and `Utils` and keep the TV apps (a full list of installed apps at the bottom)
#### General
Change Default Launcher -> Override Current Launcher
#### Appearance
**Left Headers**
![](assets/Pasted%20image%2020241105151129.png)
**Cards** - Changes the size, effect of cards (Android TV apps)
- Preview video -> Never
### Left Header
The left header consist of all the categories/channels that was added. In the main screen, each item's order can be rearranged.
- there are also additional settings to change each item's size or disable that card on the home screen

#### Individual Cards
The individual cards can be rearranged, hold down on an item and choose `reorder` if the sorting is to custom
![](assets/Pasted%20image%2020241105163925.png)
Backup and restore doesn't work