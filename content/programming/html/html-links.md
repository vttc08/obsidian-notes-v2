Referencing to other pages, images, files. Using the `<a>` tag or anchor element.
```html
<a href="link.html">Link Text</a>
```
- use the [href](html-attributes.md#^36e9fb) attribute
- **Absolute URL**: URL that goes to a another website, the full name is needed `https://google.com`
- **Relative URL**: links to resources on the same URL `/google`
	- to link to another directory use `dir/path.html`
	- when pointing to a folder, the browser will automatically find `index.html`
Links can also be referenced from an image, not just text.

**target** attribute
The default is `_self` which opens the link content in the same tab
Use `_blank` to open in a new tab

**ID Link**
Any html element tagged with the attribute [ID](#^c21050) can be used in a link with `#`, clicking on the link will jump to that element.  ^a063e9
```html
<h1 id="title">Title</h1>
<a href="#title">Return to Title</a>
```


