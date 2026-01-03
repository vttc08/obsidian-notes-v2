Javascript Class or **Function**
- follow PascalCasing, capitalize first letter
- same as normal function, uses `return` but with HTML
The recommended way of organizing components is to have a `components` subfolder
```tsx
function MyComponent() {
  return (
  // JSX
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}
```
- the code in return is not HTML, but JSX, which is complied to JS

JSX allows for variables in {}
```tsx
const name="name";
return <h1>Hello {name}</h1>
// or use any function, statement, operators
```
Everything needs to be exported
```js
export default MyComponent;
```
And imported when using another component
```js
import MyComponent from './path_to_tsx';
```
To use the component, similar to HTML element
```html
<MyComponent />
```
React uses `className` instead of `class` for CSS class
```html
<li className="list-group-item"></li>
```

Each react component can only return 1 element, but a fragment can be used
```tsx
<>
	<div>Multiple elements</div>
</>
```
JSX tags must be explicitly closed
```jsx
<img src="" alt=""/>
```