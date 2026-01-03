HTML form uses the `form` element
- `action` attribute determines how the information will be processed
Forms have an input box using `input` which user can input text, radio button or submit
```html
<form>  <input type="text">  </form>
```

To match a label to an input, the `for` attribute of a label must match the `id` of the input
```html
<label for="email">Email</label> <!-- for="email" -->
<input type="email" name="email" id="email"> <!-- id="email"-->
```
![](assets/Pasted%20image%2020241007233754.png)
When it's matched, when clicking the corresponding label, the input will be highlighted.

Forms contains a **submit** button, when a user presses enter, that button is clicked and all the form is submitted.
```html
<button type="submit">Submit</button>
```
- for a form to be submit button, the `type="submit"` is included as an attribute

**Type**
The complete type of input can be found https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
Here are the commonly used input types
Email - validate real email before submitting
![](assets/Pasted%20image%2020241007235809.png)
Number - only numbers can be entered, like `tel`, on some devices a numeric keyboard appear
![](assets/Pasted%20image%2020241007235906.png)
Password - the text content is obscured, also bring up the password manager
![](assets/Pasted%20image%2020241008000013.png)
Datetime-local - browser will display and date-time selector
![](assets/Pasted%20image%2020241009234906.png)
File - show and file picker menu
Reset - a button that clear all the information of the form to default value
Radio - select only one button in a fieldset
```html
  <fieldset>
    <legend>Choose one</legend>
    <input id="one" type="radio" name="choose">
    <label for="one">One</label><br>
    <input id="two" type="radio" name="choose">
    <label for="two">Two</label>
  </fieldset>
```
- All the options are enclosed with `fieldset`, the title of selection is defined by `legend`
- all the options in the fieldset must have matching `name` so a unique choice can be selected
![](assets/Pasted%20image%2020241008001440.png)
Checkbox - similar to radio but `type=radio`, can select multiple

Dropdown list - select one or more from a list of items
```html
<select id="choose" name="choose">  
  <option value="one">One</option>  
  <option value="two">Two</option>   
</select>
```
![](assets/Pasted%20image%2020241008002148.png)
- when the select has attribute `multple`, multiple items can be selected via Ctrl
- select can also have the attribute `size` which determine how many items to show in that dropdown list

Datalist - text input box with a list of pre-defined options to choose.
```html
  <input list="browsers" name="browser">
  <datalist id="browsers">
    <option value="Edge">
</datalist>
```
![](assets/Pasted%20image%2020241009234619.png)
- datalist uses `list` and `id` for matching

**Input Attributes**
Full list is https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
Here are some common ones

Placeholder
```html
<input placeholder="12345 St" type="name" name="" id="address">
```
![](assets/Pasted%20image%2020241007234141.png)
Using the placeholder attribute, the form will have suggested text when the user enters anything, the placeholder text will disappear.

Value
```html
<input value="12345 St" type="name" name="" id="address">
```
![](assets/Pasted%20image%2020241007234413.png)
The value attribute will pre-populate the field for an user rather than giving suggestions.

Size
```html
<input size="20">
```
Changes how long the input field is.

Minmax/step
```html
<input min="123" max="1980-12-11" maxlength="10" step="3">
```
- min max defines the range of value that can be input (can also be date, week etc.)
- maxlength defines the number of characters in a box
- step is intervals allowed, in this case only multiple of 3 are okay

Pattern
regular expression code that validate against a input

Required
```html
<input type="text" required>
```
![](assets/Pasted%20image%2020241008000322.png)

Checked
When the page load, the checkbox or radio will be checked by default

Autofocus
When the page load, the focus goes to that input box.

**Form Attributes**
Autocomplete
```html
<form action="" autocomplete="on"></form>
```
With autocomplete on, the form will autofill based on what the user entered before.

Readonly
```html
<input readonly value="can't change">
```
The input will have the pre-defined value and can't be changed.

Disabled
![](assets/Pasted%20image%2020241009235208.png)
Similar to readonly, but also makes it unclickable.