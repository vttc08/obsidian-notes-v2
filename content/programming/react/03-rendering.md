Use map and dynamic data for list items
```jsx
const items = ["a", "b", "c", "d", "e"];
{items.map((item) => (
  <li key={item} className="list-group-item">
	{item}
  </li>
))}
```
- the `key` is needed so react can uniquely identify it

Conditional rendering
```jsx
{items.length === 0 && <p>No items found</p>}
```
-  if first statement is true, it will render `No Items Found`
- if the first statement is false, it will render nothing