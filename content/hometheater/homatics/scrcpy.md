# Screen Copy Mirror Android Device
Homatic Box is buggy and may require hard reboot to be able to connect it.

Download Windows app executable
https://github.com/Genymobile/scrcpy/blob/master/doc/windows.md
https://github.com/Genymobile/scrcpy/releases/latest
Extract it to a folder and open a command prompt
```shell
adb connect 10.10.120.192
scrcpy --select-tcpip
```

### Navigation
Use the arrows to move around.
The `Enter` or `Space` equals to button middle click.
Mouse left click also works.
Right click is equivalent of back button.

Video Playback does not work.
Sound is not recommended although it works, it will break HDMI CEC
