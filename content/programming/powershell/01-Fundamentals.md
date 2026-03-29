Installing Powershell 7 
https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.5
- Warning: the profile location of PS5 and PS7 is difference
Powershell use objects for input/output
```powershell
Get-Member
```
- get object properties of an object passed into it
```powershell
Get-Alias
Get-Command
```
- check command or alias
## Variables
```powershell
$variable="string"
```
Similar to Python, Powershell variables are like classes and it has attributes and methods
```powershell
$variables.GetType()
```
- get the type of variable similar to `type()`

Nulls are object without type or assigned value
- cannot be used with `Get-Member` or `GetType()`

Use `[]` to force a type
```powershell
[int]$myvalue=1.23
```
- force `$myvalue` to an integer, so it will be 1
- when using `int`, it will round the number
- `[]` is a useful function as `parseInt`

Powershell is weakly typed, when concat different types, the second value will be coerced into the type of the first
- except for int, where it will be treated as double even when adding string
```powershell
1 + "1" # 2
"1" + 1 # 11
"1.1" + 1.1 # 1.11.1
1.1 + "1.1" # 2.2
```
### Strings
String has the attribute
- `length`
String can be converted into [array](02-array.md) and be iterated over
```powershell
$mystr.ToCharArray()
```
### Integer
```powershell
[int]1
([int]1/2)
```
- it's useful to add `()` around the integer since 1/2 will result in 0.5 and will be a double
### Boolean
```powershell
$true $false
```
- these are automatic read-only variables and cannot be used as variable names
- `$false` and `$null` are not the same
## Other
Take a user input
```powershell
$inp = Read-Host -Prompt ""
```
Timeout for seconds
```powershell
Sleep 5
```
Benchmark functions
```powershell
Measure-Command { action }
```