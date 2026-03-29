Try catch will only catch terminating error
```powershell
try{ failed } catch { echo failed }
```
To adjust error types of some commands
```powershell
command -ErrorAction $
```
- continue - will keep executing and show error
- ignore - continue and not show anything
- inquire - ask the user what to do
- silentlycontinue - store into error variable and continue
- stop - stop executing the script
- break - enter debug mode (VSCode)
Get Exception message
```powershell
$_.Exception.Message
```
Raise an error
```powershell
throw "custom error"
```
Change default error action (similar to `set -e)
```powershell
$ErrorActionPreference = "Stop"
```
Errors are stored in a variable `$Error`
- the latest error is stored in the first index `$Error[0]`