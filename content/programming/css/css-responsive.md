Responsive design uses media queries to apply different styles based on the device's screen size or other criteria.
```css
@media type and (feature: value) {
  /* styles */
}
```
The type can be `screen`, `print`, `speech`, or `all`. 
- `screen` is for screens, `print` is for printer previews
The feature can be `width`, `height`, `orientation`, `aspect-ratio`, `resolution`, `color`, `monochrome`, `grid`, `scan`, `update`, or `overflow-block`.
- the `max-width` indicates the CSS will only be applied if the screen is less than or equal to the specified width.
	- `max-width` is often used when designing a desktop first website and adding mobile design via query
The media type and feature are combined with `and` operator.

Media query can also be a separated file and linked to the HTML file using the `link` tag.
```html
<link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css">
``` 