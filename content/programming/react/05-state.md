`useState` tell react components can have states that change over time
```jsx
  const [sIndex, setIndex] = useState(-1);
  // sIndex is the index of the selected item
  // setIndex(0) is the first item in the list
onClick={() => setIndex(index)}
```
- the function `setIndex` change the state of `sIndex` to the value

