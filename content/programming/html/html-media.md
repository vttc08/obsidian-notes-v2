## Images
```html
<img src="image.jpg" alt="Alt Text" width="100" height="100">
```
Images have many [attributes](html-attributes.md)
- `src` where the image is located
- `alt` text to display for the image when the image doesn't show
- `height` and `width` doesn't change the size of the image but change show it's displayed
	- it's good idea to always include it so browser will reserve space for it
	- setting the `width` or `max-width` to 100% is good idea to ensure the image is scaled to fit all screens 
Web support `svg, gif, jpg, png`

HTML `srcset` and `size` attribute allows different images to be shown based on screen width.
```html
<img src="image.jpg"
	 srcset="<list of images> 480w, <url2> 960w"
	 sizes="(max-width: 600px) 480px, 960px"
	 >
```
- the `480w` indicates the width in pixels
- the images in `srcset` is separate by comma
With the `sizes` attribute
- `max-width: 600px` indicates when the width of the screen is less than 600px, in the previous example the `480px` or `480w` image will be loaded
- anything else, the `960w/px` is loaded

The example above is not able to load completely different images, this needs the `<pictures>` element
```html
<picture>
<source media="(min-width: 600px)" srcset="image.jpg">
<source media="(min-width: 1280px)" srcset="lg-image.jpg">
<img src="small.jpg">
</picture>
```
*The above code shows `small.jpg` by default, but when the viewport is at least 600px it will show `image` and when it get to `1200px` it will then show the large image responsively.*
Use `source` element to specify list of images
- the element needs `srcset` for the path to image
- `media` is an attribute to define the rule for the image to show

**Audio**
```html
<audio controls src=".mp3"></audio>
```
- if `controls` is provided then the audio player will have controls when playing the file
- `loop`, make the audio file loop continuously
- `autoplay` will play the audio as soon as page loads
- `muted` used with autoplay, it will automatically play the media muted
Audio can also have `source` nested in it for providing multiple audio files of different format

**Video**
```html
<video src=".mp4"></video>
```
Same principle as audio, allows for `source` for multiple formats
`track` element can be used for `WebVTT` captions
```html
<track src=".vtt" kind="caption" label="english" srclang="em" default>
```

**iframe embed**
Can be used to embed other content from other webpages eg. a YouTube video
```html
<iframe src="" title=""></iframe>
```

[**Image Map**](https://www.w3schools.com/html/html_images_imagemap.asp)
Make some elements of an image clickable
```html
<map name="mymap">
<area shape="rect" coords="x,y,x,y" href="link.html">
</map>
<img src="image.png" usemap="#mymap">
```
- the shapes can be rectangle, circle or polygon
- for rectangle shape, the coordinate start with the x,y coordinate of the top-left and the x,y coordinate of the bottom-right
- the `usemap` attributed is used on `img`

**Background Image**
```html
<p style="backround-image: url('image.jpg');"> What is this image. </p>
```
By default, the background image will tile to the size of the content.
```css
background-size: cover; background-repeat: no-repeat;
```
This style will make the image cover the width of the content but not repeat.