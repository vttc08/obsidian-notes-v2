Array - fixed sized, cannot be expanded, default initialized to `[0,...]`
```go
var arr [3]int // default [0,0,0]
arr[0] // 0
arr[0] = 1 // [1,0,0]
```
Slicing the array
```go
oneTwo := arr[0:2]
```

Slice - similar to array, more flexible, can be expanded
```go
slice := []int{1,2,3}
slice = append(slice, 4) // adding an element
```

Map - similar to dictionary
```go
myMap = make(map[string]int) // declare a map with key of string and value of int
```
Setting and indexing map
```go
myMap['exist'] // get the value
myMap['exist'] = 10 // setting the value (only int allowed)
myMap['notexist'] // still returns the default value
```
Checking if something is found
```go
value, ok := myMap['notexist']
if ok {} // only if the value exists
```
*   **Zero value for map:** If you don't initialize a map, its zero value is `nil`. You cannot add elements to a `nil` map. You must use `make` or a map literal to initialize it.
```go
    var nilMap map[string]int // nilMap is nil
    // nilMap["key"] = 10 // This would panic!

    initializedMap := make(map[string]int)
    initializedMap["key"] = 10 // This is fine.
```

Iterating over array, slices, map
For loop syntax
```go
for i := 0; i<len(arr); i++ {}
```
Consists of initialization, condition, post
- init, the starting value
- condition, will continue if met
- post: after the loop (increment by 1)
Iterating keys of the map
```go
for k, v := range(myMap) {}
```

Strings
- in Go, strings are UTF-8, and indexed characters may be different
```go
myStr := "Hello World"
myStr[0] // return the UTF-8 value of H
```
Runes - like characters, but represent a Unicode code point
```go
var r rune = 'a'
[]rune('Hello World')[0] // H
```
String Builder, requires the `strings` import
```go
sb := strings.Builder
sb.WriteString("a")
sb.String() // a
```

