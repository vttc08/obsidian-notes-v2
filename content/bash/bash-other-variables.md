##### Default Arguments
```bash
echo ${var_or_text:-$default_value}
```
Default args use the syntax `:-` in between the variables ^ccaace
- if `var_or_text` is empty or unset, it will use the variable `default_value` instead
- the first part can also be `1,2,3` as in arguments
- the second part (or default value) must contain `$` if it's a variable

**Bash Script Location**
```bash
${BASH_SOURCE[0]}
```
- this gets the absolute path of where the bash script is located, not the directory it's being executed from
```bash
"$(dirname ${BASH_SOURCE[0]})"
```
- to access the folder containing the bash script (in case the script depends on another file in the same folder)
