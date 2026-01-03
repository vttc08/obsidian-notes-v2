Click
```jsx
<li onClick={{}=>function}>
```
- the function can be elsewhere if it's too much for the inline JSX
- when passing in a function, no need to call it like `()`
- but type annotation is needed for Typescript
```jsx
import { MouseEvent } from "react";
const handler = (event: MouseEvent)
```
The react event is called `Synthetic Base Event`