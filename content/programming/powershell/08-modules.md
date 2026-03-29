```powershell
$env:PSModulePath
```
- directories where PS look for modules
Get modules
```powershell
Get-Module $moduleName
```
Import/Remove module
```powershell
Import-Module -Name $moduleName
Remove-Module -Name $moduleName
```
Install module (from other repositories)
https://www.powershellgallery.com/
```powershell
Install-Module $name
```
