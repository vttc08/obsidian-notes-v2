HTMX uses HTML attributes to control the behavior of the request. 

Setup
```html
<script src="https://unpkg.com/htmx.org@2.0.3"></script>
```
### GET
```html
<div hx-get="/endpoint">Get some HTML</div> 
```
- the server has to respond with the HTML content
- for json template a template needs to be defined
By default the response is inserted into the element that triggered the request. 

HTMX can be triggered by custom events
```html
<div hx-get="/endpoint" hx-trigger="mouseover">Get some HTML</div> 
```
### POST
```html
<form hx-post="/endpoint" hx-include="[name='email']">
    <input name="name" type="text">
    <button type="submit">Submit</button>
</form>
```
When the form is submitted, the server receives form data by default, not json. To send json, need to the `json-enc` extension.
```html
<script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
```
```html
<form hx-post="/endpoint" hx-include="[name='email']" hx-headers='{"Content-Type": "application/json"}' hx-vals='{"name": "myname"}' hx-ext="json-enc">
    <input name="other_option" type="text">
    <button type="submit">Submit</button>
</form>
```
- `hx-include`: include other form inputs with CSS selector
- `hx-vals`: include more key values pairs in the request
```json
{"name": "myname", "other_option": "value"}
```
With `json-enc` extension, the server receives json data. 
### Trigger
Triggers are [here](https://htmx.org/attributes/hx-trigger/), more examples include
- `delay:1s`: wait before sending the request
- `throttle:1s`: only allow one request for certain period
- `click[ctrlKey]`: or use any other javascript syntax such as `ctrlKey&&shiftKey`
    - `click[someFunction()]`: click only possible if the function returns true
- `load`: when the element is loaded
- `every 1s`: continuously send the request at interval

It is possible to use the `htmx-indicator` to show content while the request is being processed
```html
<div class="htmx-indicator">Content is loading, also can be an image</div> 
```
- the class must be nested in `hx` element
- the content with this class will disappear after the request is completed 
Alternatively
```html
<div hx-get="/endpoint" hx-indicator="#loading">Get some HTML</div>
<div id="loading">This is another loading element</div>
```
### Target
`hx-target` can be used to specify where elsewhere the response should be inserted
https://htmx.org/attributes/hx-target/
```html
<div hx-get="/endpoint" hx-target="#target">Get some HTML</div>
```
- `closest p`: target the closest html matching element `p, div` etc
### Swap
`hx-swap` can be used to specify how the response should be inserted
By default it is `innerHTML`, which means the response is inserted into the targeted element
https://htmx.org/attributes/hx-swap/
```html
<div> <!-- outerHTML beforebegin -->
    <!-- innerHTML afterbegin -->
     <div>Content</div> 
    <!-- innerHTML beforeend -->
</div> <!-- outerHTML afterend -->
```
- `none`: do not insert the response
- `delete`: remove the element
### Templating
Template allow json response to be rendered as HTML
https://v1.htmx.org/extensions/client-side-templates/
```html
<script src="https://unpkg.com/htmx.org@1.9.12/dist/ext/client-side-templates.js"></script>
<script src="https://unpkg.com/mustache@latest"></script>
```
The HTMX example uses Moustache templating.
```html
<div hx-ext="client-side-templates">
    <div id="mycontent">{% raw %}The car is {{model}} with {{specs.hp}} hp.{% endraw %}</div>
</div>
```
- the contents containing the template must be wrapped in a `hx-ext="client-side-templates"` element
- `{% raw %}` and `{% endraw %}` is needed because of Jinja2 templating
### Websocket
Using a valid websocket URL at `/ws`, uses the `hx-ext="ws"` extension. The server must respond HTML and with corresponding ID in websocket message.
https://blog.simonrw.com/posts/2021-10-24-htmx-websocket-append-example/
https://github.com/karolzlot/microwave
```html
<script src="https://unpkg.com/htmx.org@1.9.12/dist/ext/ws.js"></script>
```
```html
<div hx-ext="ws" ws-connect="/ws">
    <div id="wscontent" hx-swap-oob="beforeend">Content from websocket</div>
</div>
<!--Server response must be--> <span id="wscontent">Content</span>
```
Sending messages to the server
```html
    <form id="form" ws-send>
        <input name="chat_message">
    </form>
```