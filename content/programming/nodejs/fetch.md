```js
fetch("url")
	.then(response => response.json()) // Response object
	.then (data => data ...) // should be JSON data
	.catch(error => error ...)
```
This is a promise that resolve a `Response` object
- body, headers, ok, status, etc.
- the object has methods such as blob, text, json
Even if there are status code error, the promise will still resolve
```js
fetch("404")
	.then(response => {
			if(!response.ok) {
				throw new Error("") // this error will be catched
			}
		}
	)
```

POST requests
```js
fetch("api", {method: 'POST',
headers {
	'Content-Type': "application/json"
},
	body: JSON.stringify({
		field: "Value"
	})
})
```