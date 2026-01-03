This will be moved to documentation later to windows.
## Sunshine
```powershell
winget install lizardbyte.sunshine
```
https://github.com/LizardByte/Sunshine/releases
Installation directory: `C:\Program Files\Sunshine`
**Basic Settings:**
Set admin password, default port 47790
Network -> enable UPnP (if router support it)
https://docs.lizardbyte.dev/projects/sunshine/en/latest/index.html ^93cc45
## Moonlight
#### Android 
Download on FDroid or Google Play
Input > Use touchscreen as a trackpad (this toggle switch between [modes](https://github.com/moonlight-stream/moonlight-docs/wiki/Setup-Guide#keyboardmousegamepad-input-options))
- using trackpad input on Android, drag and drop doesn't work, unlike rustdesk
Not possible to do on-screen keyboard control
#### Windows
```powershell
winget install MoonlightGameStreamingProject.Moonlight
```

### Custom Resolution
To implement custom resolution, need to download [QRes](https://www.majorgeeks.com/files/details/qres.html). and place the executable into sunshine [installation directory](#^93cc45).
Implement the custom resolution in Nvidia control panel. All the client resolutions must be implemented beforehand otherwise it will be stuck at 1920x1080. 
For support of over 4K120, this method does not work, would require a virtual display. This method requires Windows 11 for HDR support.
- `Display` -> `Change Resolution` -> `Customize`
- Turn on `Enable resolutions no exposed by the display` and create custom resolution
- Add the resolution and frame rate accordingly
![](assets/Pasted%20image%2020240906140901.png)
For each applications to be added for custom resolution: Go to `Edit` -> `Command Preparation`
Do command
```shell
cmd /C "C:\Program Files\Sunshine\QRes.exe" /x:%SUNSHINE_CLIENT_WIDTH% /y:%SUNSHINE_CLIENT_HEIGHT% /r:%SUNSHINE_CLIENT_FPS%
```
Undo command
```shell
cmd /C "C:\Program Files\Sunshine\QRes.exe" /x:2560 /y:1440 /r:165
```
Some games like CoD BOCW do not support automatically changing the resolution, will need to change it manually.
### HDR
Normal HDR Content (eg. YouTube demo)

| Host ^ Client > | HDR                               | SDR                   |
| --------------- | --------------------------------- | --------------------- |
| **HDR**         | Works. HDR content not as bright. | HDR colors blown out. |
| **SDR**         | HDR shown as SDR.                 | HDR shown as SDR.     |
If a game has HDR natively, it will work. 
### Surround Sound
Surround sound works as is on Sunshine Moonlight. Only need to set the client to 5.1 and the audio will be output as such.
## Steam Link
Can play on touchscreen, but only limited games can work.