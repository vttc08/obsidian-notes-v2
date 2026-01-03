### Go Package

```go
package main
```

*   All files in a directory must belong to the same package.

### Variable Declaration

Go is statically and strongly typed. Each variable has a specific type that cannot be changed, and every variable must have a declared type.

```go
var message string = "Hello, Go!"
var myInt int = 42
var myUint uint = 100
var myFloat float64 = 3.14
var myBool bool = true
```

Variables have default values. If the type is not declared, Go will infer it.

The shorthand for variable declaration is `:=`:

```go
myString := ""
myInt := 0 // Defaults to int64
myBool := false
```

Multiple variables can be declared simultaneously:

```go
a, b, c := 1, 2, 3
```

Constants are values that cannot be changed:

```go
const MyConst = 123
```

### Formatting and Imports

Imports are grouped using parentheses. For multiple imports, place each on a new line:

```go
import (
	"fmt"
	"errors" // Example of another import
)
```

To print a string to the terminal:

```go
fmt.Println("Hello World.")
```

Or use `Printf` for formatted output:

```go
fmt.Printf("My variable is: %v\n", variable)
fmt.Printf("Rounding it to 2 decimals: %.2f\n", myFloat) // Assuming myFloat is declared
```

### Functions

Go functions follow the `name(parameterName parameterType, ...) (returnType, ...)` signature.

```go
func add(a int, b int) (int, int) {
	return a + 1, b + 2
}

// Example usage:
sum1, sum2 := add(1, 2)
// sum1 will be 2, sum2 will be 4
```

### Error Handling

*   Requires the `errors` package to be imported.
*   By default, errors have a `nil` value.
*   The convention is for functions to return an `error` object as their last return value.

```go
import "errors" // Make sure this is imported

func div(a int, b int) (int, error) {
	if b == 0 {
		// Create a new error message
		err := errors.New("division by zero")
		return 0, err
	} else {
		// Return the result and nil for the error
		return a / b, nil
	}
}

// Example usage:
result, err := div(10, 0)
if err != nil {
	// Handle the error, e.g., log it or return it further
	fmt.Println("Error:", err)
} else {
	fmt.Println("Result:", result)
}

result, err = div(10, 2)
if err != nil {
	fmt.Println("Error:", err)
} else {
	fmt.Println("Result:", result) // Output: Result: 5
}
```


