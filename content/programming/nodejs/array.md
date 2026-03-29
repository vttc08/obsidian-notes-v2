Declare an array:.
```js
arr = [1,2,3,4,1]
```

Add items into the array (directly modify)
```js
// Add to the end of the array
arr.push(5,6) // Number: new arr.length
// Add to the beginning of the array
arr.unshift(-1,0)
```
- modify directly and return new length

Remove an element from the array
```js
// Remove at the end
arr.pop() // Removed item
// Remove at beginning
arr.shift()
```

Slice (get array from start to end index), similar to Python `[:]`
```js
arr.slice(1,3) // Array [1,2]
arr.slice(-1) // Get the last item as arr[-1] won't work
arr.slice() // Make a shallow copy of the array
```
- does not modify the array
- start is inclusive, end is not

Sorting
```js
arr.sort() // Array: sorted array; sorted alphabetically
arr.sort((first, second) => first - second)
result > 0 // a after b
result < 0 // b after a
result == 0 // keep original order
```
- sort the array or with a function in place and return the sorted array
```js
[2,4,3]
a=2, b=4; a-b=-2; -2<0 // b after a [a,b]
b=4, c=3; b-c=1; 1>0 // b after c [a,c,b]
```

Reverse an array
```js
arr.reverse() // New Array [3,2,1]
```
- will modify the array in place

Find the first item in an array 
```js
arr.find(el => el === 2) // Array Item: 2
```
- takes a function and find the first one that matches
- to find all items in an array and return a new array use [filter](map-filter-reduce.md)
- if none is found -> `undefined`
Find the first index of item in an array
```js
arr.findIndex(el => el === 2) // Number: 1
```
- if not found -> `-1`
Alternative, using `indexOf` and pass the value in directly
```js
startIndex=0
arr.indexOf(2. startIndex) // Number: 1
```
- `startIndex` start the find only after that index
Find from end to beginning
```js
arr.lastIndexOf(1, startIndex) // Number: 4
```

Whether an array has some that matches
```js
arr.some(el => el === 2) // Bool: true
```
Alternative: use include to check if an array has a value, similar to Python  `x in mylist`
```js
arr.includes(2) // Bool: true
```

Check if every item in array matches
```js
arr.every(i=>i.isInteger) // Bool: true
```

Merge 2 arrays or array with another item
```js
arr.concat(value, anotherArray, moreValue)
// Array: [1,2,3,value,another,array,moreValue]
```
- it takes multiple arguments and concat all togethers, array or objects

Fill the array with some element at some index
```js
arr.fill(value, startIndex, endIndex) // New Array
```
- modify the existing array and have it all be the same value
- start index is inclusive, end index is not

Join array into string, similar to `"".join(arr)` in Python
```js
arr.join("|") // String 1|2|3
```

Splicing
```js
arr.splice(startIndex, deleteCount, itemToAdd,,) // Array: deleted items
```
- start from the index, and delete n numbers from that position
- if only start index is provided, it will remove everything
- at that index add item(s)

Array from string
```js
mystr = "123"
Array.from(mystr, el=>parseInt(el)) // New Array
```
- can take a map function, e.g. convert the string into an integer

Enumerate array, similar to `enumerate(mylist)`
```js
arr.entries() // Array Iterator Object
[...arr.entries()] // [[0,1],[1,2],[2,3]]
```
- return the index and value

Flatten a multidimensional array
```js
[1,2,[3,4,5]].flat(1) // New Array [1,2,3,4,5]
```
- create a new array, specify how deep it goes