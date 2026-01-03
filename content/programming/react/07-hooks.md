`useEffect`
```js
useEffect(() => {
	console.log("")
},[type])
```
- `type` or anything else in the array change it will run the code
- will not run if its not changed
To prevent it from constantly running, `return` will stop it once it's unmounted
```js
useEffect(() => {
	console.log("")
	return ()=>{function}
},[type])
```
