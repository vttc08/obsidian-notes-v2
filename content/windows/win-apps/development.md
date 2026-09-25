### VSCode
Most of the configuration will be synced if logging in via Microsoft account with exception of SSH settings.
SSH settings on stored in Windows at `C:\Users\hubcc\.ssh\config`, these settings are global
Once syncthing is setup, run the powershell script located in `Documents\ssh\ssh_config\configure.ps1` to restore SSH configs
### Python
```powershell
winget install astral-sh.uv Python.Python.3.13
```
### Node
```powershell
winget install openjs.nodejs
```

Make sure to reload path after installing
[Reload Path](powershell/powershell.md#Reload%20Path)
