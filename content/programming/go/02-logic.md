If-Else statement
```go
package main

import "fmt"

func main() {
	a := 75

	if a < 50 {
		fmt.Println("a is less than 50")
	} else if a > 50 && a < 100 { // Corrected condition
		fmt.Println("a is between 50 and 100")
	} else {
		fmt.Println("a is 100 or greater")
	}
}
```
 - for Golang, `50 < a < 100` is not possible, it has to be 2 and statements
 - `&&` AND, `||` OR
### Switch Statement

Here's how you might use `switch` for the same logic, though it's less common for this specific use case:

```go
package main

import "fmt"

func main() {
	a := 75

	switch { // This is a "tagless" switch, evaluating boolean expressions in cases
	case a < 50:
		fmt.Println("a is less than 50")
	case a > 50 && a < 100:
		fmt.Println("a is between 50 and 100")
	default:
		fmt.Println("a is 100 or greater")
	}
}
```

