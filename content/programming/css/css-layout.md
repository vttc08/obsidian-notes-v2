## Float
Similar to MS Word Wrap.
With the float property, all the content (not the background) such as text will wrap around the content.
```css
img { float: left; }
```
![](assets/Pasted%20image%2020241113232011.png)
To clear a float, select the paragraph which the float should not apply to and the class to it.
```css
.clear { clear: both; } /* can be also left, right float specifically */ 
```

**Overflow**
When the size of content is larger than the container.
- `hidden` cut off any elements not in the container
- `auto` add a scrollbar
![](assets/Pasted%20image%2020241115171150.png)

## Position
Position can be moved by offset properties (top, bottom, right, left)
- a value in top will move the element down and right will move it left etc..
Relative Position - the position is moved from the location of the original box
Absolute - the positive is moved using relative to the entire viewport
Fixed - always stay in same spot (in absolute values) even on page scroll
Sticky - the element will stay in its original position until scrolling past a point where position of element is equal to its absolute position, at that point it will stay on the screen like fixed

## Layer (Z-axis)
The element before it will be on the bottom and other elements will stack on top of it.
The stacking can be changed via z-index, but a position property must be applied.
```css
.block {
	position: relative;
	z-index:1;
}
```
- any z-index will be higher than element without 
- a higher z-index will be on top of lower z-index
