Powershell function syntax
```powershell
function name() {
	param(
	  [Parameter(Mandatory)]
	  [string]$one = "default,
	  [int]$num
	)
	return $something
}
```
- function parameters are defined in `param`
- comma separated values
- option to make a parameter mandatory
Calling a function
```powershell
name $one $num
name -one $one -num $num
```

The function/param syntax also works for global arguments when executing a Powershell script.
