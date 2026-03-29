Takes the stdout of the object and pass it as stdin for the next object, similar to Bash
```powershel
Get-Service MySQL | Stop-Service
```
Pipes work on lists
```powershell
$services | Stop-Service # stop all services listed in the array
```