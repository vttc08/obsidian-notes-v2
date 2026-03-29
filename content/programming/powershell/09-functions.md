Powershell function syntax
```powershell
function name() {
	param(
	  [string]$one,
	  [int]$num
	)
	return $something
}
```
- function parameters are defined in `param`
- comma separated values
Calling a function
```powershell
name $one $num
name -one $one -num $num
```
