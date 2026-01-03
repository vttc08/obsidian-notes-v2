## Pseudo-Classes
Target a specific state (eg. hover)
```css
a:hover {} /* hover */
a:visited {} /* visited link */
```

## Pseudo-Element
Target a part of a element (eg. first letter)
```css
p::first-letter {}
```
Example is to make the first paragraph of something different style
```css
p:first-of-type {}
```
- the first paragraph and only the first will have the style applied
```css
p:first-child {}
```
- the first element in a section and has to be a `p` tag
These pseudo classes and elements can be combined
```css
p:first-of-type::first-letter {}
```