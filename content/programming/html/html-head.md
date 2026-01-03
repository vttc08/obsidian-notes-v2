Metadata about the page and what assets to load.
Define using `meta` element 
```html
<meta charset="utf-8">
<meta name="description" content="what it will show in the search result.">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Title</title>
```
HTML title
![](assets/Pasted%20image%2020241007224654.png)
The example shows various meta tags, such as charset and description
Other `meta` elements could include
- author, keywords, description

`link` Element
- used to link to css, js, favicon and other assets
```html
<link rel="stylesheet" href="style.css">
```
- the `rel` tells the browser which kind of asset is it and `href` is link to that asset
- other types of rel could include icon, preload

favicon
```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

script element
```html
<script src="script.js"></script>
```

`base` element
```html
<base href="https://www.w3schools.com" target="_blank">
```
Base sets the base url or default link behavior on all the site