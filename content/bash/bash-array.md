## Index Array (Lists)
This is similar to python lists, to declare a list
```bash
mylist=( str 2 3 text 3 "with space" 'more" space' )
```
```bash
declare -a mylist
```
- the syntax is using `()` and the delimiter is space, if there are spaces, it needs to be quoted

Getting value from list
- by default only the first item will be echoed, use `[@]` to get everything in the list as multiple variables
- the list index is obtained using `!mylist`
- the way to get item from list is same as Python using `[index]`
```bash
$mylist # first list item
${mylist[@]} # entire list
${!mylist[@]} # get all the index
${mylist[-1]} # last list item
```
Lists are mutable, items can be changed or added
```bash
mylist[0]="mystr"
```
To add item in list to the end, similar to append
```bash
mylist+=( "item" 2 )
```
Get the length of the list
```bash
echo ${#mylist[@]}
```
To remove a list, use `unset`, can remove items or entire array
```bash
unset mylist[1]
```
- when the item is unset, even the index is removed and it is not continuous
List splicing
Bash list splicing is different, it has a start index and length (not end index)
```bash
${newlist[@]:index:length}
```
- index is the starting index (inclusive)
- length indicate how many items from the starting index to include

## Bash Dictionary
This is similar to Python dictionaries, to declare a dictionary (associative array):

```bash
declare -A mydict
mydict=( [key1]="value1" [key2]="value2" [key3]="value3" )
```
- use `declare -A` for associative arrays
- keys and values are assigned using `[key]=value` syntax

Getting values from dictionary:
- access value by key: `${mydict[key1]}`
- get all keys: `${!mydict[@]}`
- get all values: `${mydict[@]}`

```bash
echo ${mydict[key1]}      # value for key1
echo ${!mydict[@]}        # all keys
echo ${mydict[@]}         # all values
```

Add or update key-value pairs:
```bash
mydict[newkey]="newvalue"
```

Remove a key-value pair:
```bash
unset mydict[key2]
```

Get the number of key-value pairs:
```bash
echo ${#mydict[@]}
```
