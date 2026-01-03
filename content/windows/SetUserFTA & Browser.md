Change default browser and extensions. The newest one comes with ads. The one located in this folder is older version but could still work. The version 1.8.2 appears to not have ads.

Get
```powershell
./SetUserFTA.exe get | sls ext_name
```
Set
```powershell
./SetUserFTA.exe .zip WinRAR
```
- the extension name must include `.ext` except for `http(s)`

~~Using config file (provided in the subfolder)~~
No longer works in new version, may need to do manually. Below are the list of common applications and its associated app name as of 2025.
```python
.zip, WinRAR # or it could be WinRAR.zip?
.rar, WinRAR
.mp4, VLC.mp4
.any_video_file, VLC.any_video_file
http, Applications\firefox.exe
https, Applications\firefox.exe
```
Setting default browser and related documents will only work with newer version of SetUserFTA due to UCPD drivers.

**Problems**
Some time even after setting the correct extension. When trying to open a file, it will still ask for a prompt. To fix this, set it to another app for that extension and reset it back. E.g. suppose problem occurs with `.webp` and fixing it by setting it to `Firefox`
```powershell
./SetUserFTA.exe .webp Applications\firefox.exe
./SetUserFTA.exe .webp AppX43hnxtbyyps62jhe9sqpdzxn1790zetc
```



**Archived, todo later.**
Find the program that you want to associate
```powershell
cmd /c assoc | findstr vlc
```
`.vlc=VLC.vlc`
For VLC, set it as such `.mp4, VLC.mp4`

Set Default Browser
`SetDefaultBrowser.exe` get list of available browser
`SetDefaultBrowser.exe chrome` sets it to Chrome
`SetDefaultBrowser.exe HKLM Firefox-308046B0AF4A39CB` Firefox
`SetDefaultBrowser.exe HKCU Brave.TK7WPWN46KGTJCOQ43VH7JWCPM` Brave browser with adblocking
