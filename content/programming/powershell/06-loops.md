Iterate over an array (for i in arr)
```powershell
foreach($i in $mylist){ action $i }
```
Range loop
```powershell
foreach ($i in 1..3) {$i}
```
For loop piping
- when passing an item into an pipe, reference the current object using `$_`
```powershell
$mylist | foreach { action $_ } # used for mapping a new array
$mylist.forEach( { action $_} )
```
For loop
```powershell
for ($i=0;$i -lt 10; i++) {$i}
for ($i=0;$i -lt $mylist.length;$i++) {$mylist[$i]} # iterate over array with index
```
- starting value, condition and post (increment)
While
```powershell
while($condition) { action }
```
Do while (useful for user input)
- do an action while a condition is met
```powershell
do { $input = read-host; action } while($input -ne 'q')
```
Do until 
- do an action until a condition is met, opposite of while
```powershell
do { action } until($condition)
```
