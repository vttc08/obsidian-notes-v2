[Context Menu Manager](https://github.com/BluePointLilac/ContextMenuManager)
https://www.videohelp.com/software/Icaros
Icaros help speedup of video context menu extension.

Registry Locations
|All Files|`HKEY_CURRENT_USER\Software\Classes\*\shell\`|
|By File Extension [[1]](https://mrlixm.github.io/blog/windows-explorer-context-menu/#footnote-1)|`HKEY_CURRENT_USER\Software\Classes\SystemFileAssociations\{EXTENSION}\shell`|
|Directories|`HKEY_CURRENT_USER\Software\Classes\Directory\shell`|
|Directories Background|`HKEY_CURRENT_USER\Software\Classes\Directory\Background\shell`|
|Drive|`HKEY_CURRENT_USER\Software\Classes\Drive\shell`|

### Fireshare Real Example
https://github.com/vttc08/fireshare-import
To execute a powershell script a `.bat` is likely needed to change dir and process inputs
```bat
pushd %USERPROFILE%\Documents\Projects\fireshare-import
powershell -File fireshare.ps1 "%~1"
```
- `cd` into the directory storing the powershell script
- `%~1` instead of `%1` so all the input gets send without spaces
Edit Registry, the command to execute the batch file
```batch
cmd /k pushd "%%USERPROFILE%%\Documents\Projects\fireshare-import" && fireshare.bat "%1"
```
- this is also the command to put into any context menu managers
- choose either `/k` or `/c` whether to keep open or close terminal after executing

