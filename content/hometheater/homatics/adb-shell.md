All the commands listed here assumes it's in a adb shell, to execute the command without a shell, add `adb shell` to the front of each commands
Go to adb shell via `adb shell` and use this to list all the package names
```c
pm list packages | grep -Ei "app1|app2"
```
```c
pm uninstall -k --user 0 <package-name>
```

List of problematic apps
```c
com.google.android.youtube.tv
com.google.android.youtube.tvmusic
com.netflix.ninja
com.amazon.amazonvideo.livingroom
```

Disable Default Launcher
```c
pm disable-user --user 0 com.google.android.tvlauncher
```

Disable Google Play Protect (untested), this is needed to install SmartTube and other Chinese apps
```c
settings put global package_verifier_user_consent -1
```

Launch an app
- first query the app and find out its package name
```c
monkey -p com.app.package 1
```
- this command will open the app on Android device by package name

Force kill an app
```c
am force-stop com.app.package
```

Input Text
```c
input text "abc\ dcf\ "
```
- spaces needs to be escaped via `\`
Input Tap
```c
input tap x y
```
It also work with [keyevent](https://gist.github.com/arjunv/2bbcca9a1a1c127749f8dcb6d36fb0bc)
```c
input keyevent 30
```
- up: 19
- down: 20
- left: 21
- right: 22
- enter: 23
- home: 3
- back: 4

Record screen
```c
screenrecord "/sdcard/rec.mp4"
```

Open Image using MiXplorer
```python
am start -a android.intent.action.VIEW -d file:///sdcard/Pictures/icon.png -timage/* com.mixplorer.silver/com.mixplorer.activities.ImageViewerActivity
```

Enable/Disable Pointer Location
```c
settings put system pointer_location 0
```

Tested boilerplate code for automating HDR auto
```bash
input keyevent 3 && sleep 1 && am start -n com.android.tv.settings/.device.displaysound.DisplaySoundActivity && sleep 1 && input tap 1330 598 && sleep 1 && input tap 1300 570 && input keyevent 3
```
UI Automator
```c
uiautomator dump
```
- this dumps a XML file to `/sdcard/window_dump.xml`

Network Settings
First in adb shell
```c
pm grant com.termux android.permission.DUMP
```
Then in Termux
```c
/system/bin/dumpsys connectivity | grep NetworkAgentInfo
```