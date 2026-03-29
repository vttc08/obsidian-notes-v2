https://learn.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-hashtable?view=powershell-7.6
```powershell
$mydict = @{
	k1="123"
	k2=123
}
$mydict = @{k1="123";k2=123}
```
Key value
```powershell
$mydict.Keys
$mydict.Values
$mydict.ContainsKey("k1") # check if key exist
```
Get/Set
```powershell
$mydict.keyName
$mydict.keyName = 123
```
- if a key is not found, no errors
Add new
```powershell
$mydict.Add("key","value")
```
### Custom Objects
```powershell
$dog1 = [PSCustomObject]@{"name"="dog";"age"=21}
$dog1.name
$dog1.age
```
