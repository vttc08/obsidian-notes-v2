Adding CSS to html to header
```html
<link rel="stylesheet" href="style.css">
```

CSS are made of decoration blocks
```css
body {
	background: blue;
}
```
- selector -`body`
- declaration - CSS style rules - `backtround: blue;`
	- declaration use property-value pairs
	- property (the characteristics) - `background`
	- value - `blue`
CSS declaration can be shorthand or long
- shorthand - `padding 1 2 3 4`
- longhand - `padding-left; padding right`

CSS comments uses `/*`
```css
/* CSS comments */
```

If conflicting rules are present, the last CSS rule will take precedence.

**CSS Colors**
It can use keywords such as `red, black`
https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
RGB Functions `rgb(1 2 3 / 0.5)`
- R, G, B followed by transparency in %
Hex value `#ffffff`

**CSS Specificity**
This determine the precedence of rules. The more specific styles will override lesser ones. The specificity orders from highest to lowest is 
- id
- class
- type `p ul li`
- universal
If there are multiple types of elements in a CSS rules, the specificity will be higher
The `!important` rule override everything