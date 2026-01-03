```bash
my_func() {
	echo "my function is working"
}
myfunc
```
- the similar to python, with `()`, but there is no `;`, and the function need to start with `{}`
- it can also be defined as `function myfunc() {}`
- to call a function, write out the function, but without the `()`
Important: function name CANNOT be a built-in function eg. time, date, ls

**Function with Variables**
```bash
my_func() {
        echo "scale=4; $1/$2+($3-$4)" | bc
        for i in $*; do echo "$i-0.5" |bc ; done
}
my_func 1 4 1 0.667 5# 0.5830
# also echo out all the input and minux by -0.5
```
- `$1,2,3` indicates positional arguments and are ordered
- if there are more arguments in a function that parameters these arguments will be ignored
- however, `$*` consists of all the arguments that is passed into the function

**Function Return**
```bash
my_func() {
    echo $(( $1+10 ))
}
my_func 10 # returns 20
[ $(my_func 20) == 30 ] && echo "return 30" || echo "return not 30"
```
- using `echo` will return the output of the function for further testing
- for functions, it's different than variable, if it returns something, it needs to be enclosed in `$()` when trying to evaluate with test function
Another way using exit code
```bash
new_func() {
	return 20
}
new_func; echo $?
```
- return is only used for exit codes not returning values

**Command Line**
A bash function can be sourced
```bash
source myscript.sh
my_func args
./myscript.sh func1 args
```
- after it's sourced, the functions are available to use in command line
Using `"$@"` after a function allow the function to be called in the cli with arguments
**Using \*args and \*\*kwargs in Bash Functions**

Unlike Python, Bash does not have `*args` and `**kwargs` syntax. Instead, Bash functions receive all arguments as positional parameters (`$1`, `$2`, ..., `$N`). To access all arguments, use `$@` or `$*`. There is no direct equivalent to Python's keyword arguments (`**kwargs`), as Bash only supports positional arguments.

Example:
```bash
my_func() {
    echo "All arguments: $@"
    for arg in "$@"; do
        echo "Argument: $arg"
    done
}
my_func 1 2 3 "foo" "bar"
```
- `$@` expands to all arguments as separate words.
- `$*` expands to all arguments as a single word.

