https://learn.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-arrays?view=powershell-7.6
## Array
**Array are fixed size**
Array stores the references, not the values, so when modifying items in a nested array, it will change everything
Basic syntax
```powershell
$mylist=@()
$mylist = 1,2,3,4,5
$mylist = echo 1 2 3 4 5
```
Get/Set
```powershell
$mylist[$i]
$mylist[$i..$j] # Slicing
$mylist[$i,$j,$i] # Slicing with custom
$mylist[$i] = $i
```
- if index out of range, no error will occur, it will be `$null`
- **PowerShell Slicing IS inclusive**
Count
```powershell
$mylist.Count # or Length
```
Add item into an array
```powershell
$mylist+="fruits"
$mylist+=@(1,2) # will be ...,1,2 not ...,[1,2]
```
- when using this method to add a list, it will unpack the list
Remove an item from an array
```powershell
$mylist=$mylist -ne 1
```
- `-ne` get all the items in that array that does not equal to that value, hence removing that item
Creating an array from string
```powershell
"1,2,3".split(";")
```
### Operators
Join the array into a string
```powershell
$mylist -join "-" # the delimiter can be empty
```
Checking membership
```powershell
$var -in $mylist
$mylist -contains $var
$mylist -ccontains $var
```
- the `ccontain` makes the match case sensitive
Filter
```powershell
$mylist | where {$_ -eq condition }
```
## ArrayList
It's a dynamic size
```powershell
$mylist = New-Object -TypeName System.Collections.ArrayList
```
Add
```powershell
$mylist.Add(1) # return the index
$mylist.AddRange(@()) # add a range from an array, similar to extend
```
- add will always echo into the termina, use void to 
```powershell
[void]$mylist.Add(1)
```
Remove
```powershell
$mylist.Remove(value)
$mylist.RemoveAt(index)
$mylist.RemoveRange(index, deleteCount)
```
- remove is not the same as pop
- it remove one instance where it matches the value **from the beginning**
- `RemoveRange` is similar to [JavaScript splice](../nodejs/array.md) 
