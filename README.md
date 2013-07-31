Pixelator
=========

**Version 1.0**

Pixelator is an open source library that allows you to generate a HTML-only image (a collection of pixels) from an image format (PNG, JPEG etc).


How to
------

&bull; Add the Raw version of one of the scripts (<a href="https://raw.github.com/g3x0/pixelator/master/pixelator.min.js" target="_blank">min</a> or <a href="https://raw.github.com/g3x0/pixelator/master/pixelator.js" target="_blank">normal</a>) into your source code via the `<script>` HTML tag.<br />
`<script src="https://raw.github.com/g3x0/pixelator/master/pixelator.min.js"></script>`

&bull; You will need a `<div>` with a specific `id` to use the script with and the actual implementation of the script.<br />
`<div id="image"></div>`


Usage
-----

<h3>Pixelate a photo</h3>

```
var use = new Pixelator();

use.pixelate({
    image: 'mountain.png',
    target: '#image',
    res: 20
});
```

This will pixelate a photo with blocks 20 by 20 pixels in size.

<img src="http://imageshack.us/a/img138/1529/gcij.png" />

<h3>Uneven pixels</h3>

```
var use = new Pixelator();

use.pixelate({
    image: 'mountain.png',
    target: '#image',
    width: 20,
    height: 40
});
```

<img src="http://imageshack.us/a/img836/4286/7fv2.png" />


<h3>Horizontally streching a photo</h3>

```
var use = new Pixelator();

use.pixelate({
    image: 'mountain.png',
    target: '#image',
    height: 30,
    type: 'horizontal',
    offset: 150
});
```

This will stretch (copy) the 150th vertical pixel row all over the image, giving the impression of a horizontally stretched image.
Similarlly, you can vertically strech an image.

<img src="http://imageshack.us/a/img822/2623/uquc.png" />

<h3>Vertically streching a photo</h3>

```
var use = new Pixelator();

use.pixelate({
    image: 'mountain.png',
    target: '#image',
    width: 20,
    type: 'vertical'
});
```

<img src="http://imageshack.us/a/img268/6330/pl28.png" />

<h3>Save the source</h3>

Additionally, if you decided to use the source code in your project, you can append the `source: true` option to see the source code of the modified image.

```
var use = new Pixelator();

use.pixelate({
    image: 'mountain.png',
    target: '#image',
    res: 20,
    source: true
});
```
