## Math & Comparison
Supported
- +, -, `*`, /, %
Powershell do not use `==` or `!=`, `<=`
```powershell
(1 -eq 2)
```
- `-ge/le/gt/lt` - common comparison, greater/less than or equal to
- by adding `c` into `eq` will make the search case sensitive
File based operation with `Test-Path
```powershell
Test-Path $filePath
```
- whether a folder or file exist
## If/Else
```powershell
if(condition){ action } elseif(){} else {}
```
- uses `()` for condition and `{}` for action
```powershell
(-not $true) # negate a condition
($true -and -or $false) # multiple conditions
```
### Switch
Where there are many conditions
```powershell
switch($variable){
	"value" {action; break}
	"value2" {action2; break}
	default {defaultAction}
}
```
- similar to dictionary, the lines can be shortened with `;`
- best practice to put `break` so only 1 case executes
If the switch statement need a conditional with `$variable`, use `{$_}`
```powershell
switch($variable){
	{$_ -eq 123} {action}
}
```

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
- the latest error is stored in the first index `$Error[0]