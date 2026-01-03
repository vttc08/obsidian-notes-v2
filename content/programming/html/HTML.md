https://developer.mozilla.org/en-US/docs/Web/HTML

Tags
```html
<p>This is a paragaph.</p>
```
- tags consists of opening `<>` and closing `</>`

Comments
```html
<!-- This is a comment -->
```
HTML comments start with `<!--` and end with `-->`

DOM (Document Object Model)
- elements are nested in HTML which creates a tree 
- hierarchy and structure of HTML (like a tree)

**Inline vs Block-Level**
[Inline and block have different response when CSS is applied](../css/css-box-model.md#^402f91)
==Inline== tags that wrap around other words, eg. italic, bold, quote
==Block Level== tags that is entire block, eg. blockquote, headings

**HTML File**
Each HTML file must have a `doctype` declaration
```html
<!doctype html>
```
All the HTML content is enclosed in `html` element
```html
<html lang="en-US" dir="ltr"></html>
```
- that element can also have attributes that indicate the language and direction

**head body** (header and body element)
```html
<head></head>
<body></body>
```
The head is about the metadata and won't be displayed on the page.
Body is for the content which will be displayed on page.
More information about html [head](html-head.md)
More information about html [body](html-body.md)

**Paragraph**
```html
<p> </p>
```
Without marking these, the browser by default renders everything in a single paragraph.

**Headings**
```html
<h1> </h1>
```
The headlines consists of 6 sizes from h1 to h6. Similar to markdown `#`
- h1 is the largest title hence the most important

**Styling**
```html
<i> </i>  <!-- Italic -->
<b> </b> <!-- Bold -->
<u> </u> <!-- Underline -->
<mark></mark> <!-- Highlighted -->
<del></del> <!-- Strikethrough -->
```
- it the closing tag is not used, everything after the starting tag will have the styles applied
- you can also use `<em>` and `<strong>` but sometimes these render the same as `<b>`
![](assets/Pasted%20image%2020241008230700.png)

**Lists**
Lists starts with `<ul>` or `<ol>` and each individual items in a list are `<li>`
```html
<ul>  <li></li> </ul> <!-- List item -->
```
![](assets/Pasted%20image%2020240917220254.png)
Unordered List `<ul>`
- group of list items that is not sorted
Ordered List `<ol>`
```html
<ol start="10" type="A">  <li>List</li>  </ol>
```
- group of list item that can be counted like 123
- ordered list have `type` attribute with support for numbers, letters, Roman numerals
- the `start` attribute will start list counting from another number
Definition List `<dl>`
```html
<dl>
<dt>Term</dt> <dd> Description </dd>
<dl>
```
![](assets/Pasted%20image%2020240917220519.png)
- definition lists start as `<dl>` and it can contain list of dictionaries with a term and its definition
Lists can be nested within a list (eg. list in a list)

**Quotes**
```html
<blockquote>Entire Block of quote.</blockquote>
<q>inline quote</q>
```
Add quotation to entire some text in a paragraph or entire block of text.
![](assets/Pasted%20image%2020241008230830.png)

**Time**
```html
<time>on some dates</time>
```
Time tag is a human readable text that can have a [datetime attribute](html-attributes.md#^270b7d) applied to it (which must be machine-readable)

**Code**
```html
<code>some code</code>
```
![](assets/Pasted%20image%2020240917222010.png)
Code can be inline and will change the font to monospace.
Code can also be used to represent HTML entities so it doesn't get rendered as HTML
- `<` = `%lt;`
- `>` = `%gt;`
- `&` = `&amp;`
[List of many HTML entities](https://www.w3schools.com/html/html_entities.asp)
[Symbols](https://www.w3schools.com/html/html_symbols.asp)
[Emojis](https://www.w3schools.com/html/html_emojis.asp)


**Smalltext**
![](assets/Pasted%20image%2020240917223019.png)
```html
<small></small>
```
Text that are smaller, good for copyright information or fine print.

**Break**
![](assets/Pasted%20image%2020240917222403.png)
```html
<br>
<hr>
```
`br` add spacer in between content, while `hr` is also a break but add a line in between the break.

**Pre**
![](assets/Pasted%20image%2020240917222631.png)
```html
<pre> Already formatted text </pre>
```
Pre stands for already formatted text, everything in the pre will have the spacing exactly as is; whereas in normal paragraph it will render as long line of text.

**Sub/Superscript**
```html
<sub></sub>
<sup></sup>
```
Subscripts and superscripts, eg. math and chemistry formulas and foornotes.

**None Breaking Space**
![](assets/Pasted%20image%2020240918214339.png)
```html
This is some&nbsp;text.
```
Add `&nbsp;` between some texts and these will not break even where other characters will be on a new line.

**Button**
```html
<button>Button Text</button>
```
![](assets/Pasted%20image%2020241007231507.png)

**Navbar**
```html
<nav>
<ul>
<li><a href="/home">Home</a></li>
</ul>
</nav>
```
Element that is used for website navigation. Consists of an unordered list of links.

**Div**
```html
<div></div>
```
Generic block level element, captures everything inside the div in its block.
Div can be centered
```css
div {width: 100px; margin:auto;}
```

**span**
```html
<span>
```
Generic inline element.
Both div and span can be targeted via CSS.
