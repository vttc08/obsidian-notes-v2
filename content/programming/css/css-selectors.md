**Type Selector**
Element selector, select based on HTML elements
```css
p { }
h1,h2,h3 {} /* Multiple tags can be selected */
h1 + p {} /* This will only target paragraph that come after h1 */
```
Universal selector
``` css
* {}
```
- select everything in a page
- could be use to create seamless header/footer by setting margin to 0
```css
* {margin: 0 0;}
```

**ID Selector**
```css
#id {}
```
- select based on HTML id

**Class Selector**
```css
.class {}
```
- select based on HTML class, class can be reused
Classes in CSS can be combined
```css
.class.class2 {}
```
- the style will only be applied if the HTML has both classes

**Descendent Combination Select**
```html
<section><p></p></section> 
<p></p>
```
```css
section p {}
```
The paragraph is nested in sections, known as a descendant.
In the CSS selector example, the selection is separated by space
- this example will only select paragraph that is within a section, not the paragraph elsewhere
This CSS selection also allow for class
```css
.class p {}
```
- style will only be applied paragraph in something with class `class`
To select for a class that is nested in generic element, the syntax is different from above
```css
p.class {}
```

More detailed selectors at [css-pseudo](css-pseudo.md)