Use an interface to define a prop type
```ts
interface ListGroupProps {
  items: string[];
  heading: string;
}
```
- this behaves similarly to a Python dataclass with attributes
The interface is only needed for Typescript, not Javascript

Props can have a default value
First set the property to be optional
```tsx
color?: string
```
Add the default value in the function
```tsx
const Button = ({ label, color = "primary", press }: ButtonProps) => {
```

Using the `ListGroupProps`
```tsx
function ListGroup({ items, heading }: ListGroupProps) {
```
- `{}` destructure the prop

The properties are used as HTML attributes
```tsx
<ListGroup items={items} heading="Cities" />
```

Functions
Properties that can notify the parent element
```tsx
interface ListGroupProps {
  onSelectItem: (item: string) => void;
}
```
Call the function when element is clicked
```ts
onClick={() => {
  onSelectItem(item);
}}
```
The component in the parent can have `onSelectItem`, which calls `handleSelectItem`
```tsx
const handleSelectItem = () => {};
onSelectItem={handleSelectItem}
```

When the item is clicked in the child, it triggers `onSelectItem`, which notify the parent to call `handlSelectItem`

It's recommended to have the props, immutable
- it should not be change within the function

Children
Pass HTML content as a children
```tsx
interface Props {
	children: ReactNode;
}
```