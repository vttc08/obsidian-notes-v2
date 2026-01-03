Javascript `map`
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(numbers); // [1, 2, 3, 4, 5]
``` 
- `map` create a new array and doesn't modify the original array.
- uses a callback function that is applied to each element of the array.
```javascript
const doubled = numbers.map((num) => {
    return num * 2;
});
```
- The callback function takes three arguments: the current element, the index of the current element
- for multi-line arrow functions, you need to use the `return` statement to return a value.

`forEach` works differently compared to `map` and it will not return anything but used to modify the existing array
```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num, index, arr) => {
    arr[index] = num * 2;
});
console.log(numbers); // [2, 4, 6, 8, 10]
```
Javascript `filter`
```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
```
- the callback function should return a boolean value.
  - `true` => keep the element
- similar to `map`, `filter` also creates a new array and must use `return` statement for multi-line arrow functions.

Javascript `reduce`
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15
```
- `reduce` takes a callback function and an initial value as arguments.
- The callback function takes the accumulator and the current element as arguments.
- The initial value is optional, if not provided, the first element of the array will be used as the initial value and the iteration will start from the second element.
- The callback function should return the updated accumulator.

In practice
```
numbers = [1,2,3];
Round 1: acc = 0, curr = 1 => return 0 + 1 = 1; acc = 1
Round 2: acc = 1, curr = 2 => return 1 + 2 = 3; acc = 3
Round 3: acc = 3, curr = 3 => return 3 + 3 = 6; acc = 6
Final result: 6
```