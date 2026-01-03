HTML attribute can be applied to a tag or element. Some attribute only work on certain elements (eg. datetime only work on time)
It is recommended for HTML attributed to be in [lower case and enclosed in quotes](https://www.w3schools.com/html/html_attributes.asp).
- **Global** works on any element
```html
<time attribute=123></time>
```

**Date Time** ^270b7d
Attribute that give a machine readable time format.
- `yyyy-mm-dd`, `hh:mm:ss`
- `hh-mm-ss(+/-)hh:mm` eg `12:30+3:00` means 12:30 in +3 timezone

**Class**
Global attribute that makes it easier for CSS and JS to select
*Lang/Dir* specify which language and which direction to read
There can be multiple classes applied for the same element
```html
<p class="class classtwo">myclass</p>
```
- CSS use `.class { styles: x;}` (dot) to get class name
- JS use `getElementsByClassName(class)`

**ID**
Similar to class, but unique. Only can be used once.
[ID can be referenced in a link to jump to a specific part of a page](html-links.md#^a063e9)
```html
<p id="uniqueid">ID</p>
```
- CSS use `#id` and JS use `getElementByID(id)`

**Content Editable**
```html
<p contenteditable="true">Anyone can edit this.</p>
```

**Aria**
Aria makes it easier for accessibility readers.
```html
<p aria-label="Aria Text">Aria Text</p>
<p aria-hidden="true">Do not show to accessibility</p>
```
Use `aria-label` to show accessibility readers, use `aria-hidden` to hide the part to accessibility readers.

**href**
Hypertext references. Link to another page, image. ^36e9fb

**Style**
Style attribute used to add CSS to the specific element.
```html
<p style="color:red;">Red</p>
```
Advanced styling is covered in CSS, here are some basics
```html
<p style="text-align: center; color:red; font-size:200%; background-color:blue;">Paragraph</p>
```
![](assets/Pasted%20image%2020241008225931.png)
- the above has blue background, red text color, 2x the font size and aligned to center
There are the common [HTML colors](https://www.w3schools.com/html/html_colors.asp)
![](assets/Pasted%20image%2020241008231019.png)The colors can also be represented as RGB `rgb(0,0,0)`
HEX `#ff0000`
HSL `hsl(%,%,%)`

