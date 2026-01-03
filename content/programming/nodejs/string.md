```js
str="mynewstr123"
```
Indexing, includes and slicing strings is the same as [array](array.md). Other similar methods
- `indexOf`, `lastIndexOf` -> get the index of a character
	- the index of can be more than one character and it will give the index of the first character matching that word
	- same with starting index`

Split string into an array
```js
str.split("t", limit) // array ["mynews", "r123"]
```
- can limit the length of the array

Search for start and ends with
```js
str.startsWith("my", position) // true
str.endsWith("R123") // false, it's case sensitive
```
- the position check whether the string start with that substring at a given position

Repeat a string some times, similar to Python `*`
```js
"123".repeat(3) // "123123123"
```
- count must be a valid integer >= 0

Manipulate casing
```js
"stR".toLowerCase() // str
"stR".toUpperCase() // STR
"stR"[0].toUpperCase() + "stR".slice(1) // StR
```

Remove white spaces
```js
" my str ".trimStart() // "my str " 
" my str ".trim() // "my str"
" my str ".trimeEnd() // " my str"
```

Add whitespace padding to string to reach some length
```js
"mystr".padStart(10)
'     mystr'
"mystr".padEnd(10,"pad")
'mystrpadpa'
```
 - the pad will repeat the pad string until that length

Replace strings
```js
"mystr123123".replace(123, 456) // mystr456123
str.replace(123,match => "**"+match+"**" ) // 'mynewstr**123**123'
"mystr123123".replaceAll(123, 456) // mystr456456
```
- create a new string object of replaced 
- replace without replace all will only replace the first occurence
- it can also take a function for replacing

Search the string with regular expression
```js
str.search(/\d+/) // Number: index
```
- use `//` to enclose regexp
- returns the index where the first found, or -1

Match string using regular expression
```js
str.match(/123/g) // Array ['123', '123']
[...str.matchAll(/123/g)] // Array [ [match, index, input] , [] ]
```
- return a list of matches or details about the match in an array

