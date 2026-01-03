Setup Playnite for multiple computer or user accounts.

This command may be helpful
```cmd
subst G:\ C:\path\to\game
```
This convert `C:\path\to\game` folder into a dedicated `G:\` drive
```cmd
subst /D G:\
```
Undo the changes

Might require a restart, more reliable option
```powershell
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\DOS Devices" /v G: /t REG_SZ /d "\??\C:\Partitions\G" /f
```


