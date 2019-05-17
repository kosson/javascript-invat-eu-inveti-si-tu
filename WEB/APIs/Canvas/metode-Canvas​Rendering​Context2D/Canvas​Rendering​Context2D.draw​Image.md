# Canvas​Rendering​Context2D.draw​Image()

Oferă modalități de a desena o imagine în canvas.

**Sintaxa**: `void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);`

Această metodă folosește dimensiunile imaginii în pixeli (din perspectiva CSS) atunci când face afișarea.

Dacă încarci o imagine și specifici în constructor dimensiunile, atunci, va trebui să folosești proprietățile `naturalWidth` și `naturalHeight` ale instanței pentru a calcula corect valori precum cele ale tăierilor sau cele în momentul în care faci redimensionări. Folosește `naturalWidth` și `naturalHeight` și nu `element.width` and `element.height`. În cazul video-urilor (`<video>`) vei avea la dispoziție `videoWidth` și `videoHeight`.

## Exemplul MDN

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image(60, 45); // Using optional size for image
image.onload = drawImageActualSize; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';

function drawImageActualSize() {
  // Use the intrinsic size of image in CSS pixels for the canvas element
  canvas.width = this.naturalWidth;
  canvas.height = this.naturalHeight;

  // Will draw the image as 300x227, ignoring the custom size of 60x45
  // given in the constructor
  ctx.drawImage(this, 0, 0);

  // To use the custom size we'll have to specify the scale parameters
  // using the element's width and height properties - lets draw one
  // on top in the corner:
  ctx.drawImage(this, 0, 0, this.width, this.height);
}
```

## Parametrii

### `image`

Este un element care va fi afișat în contextul canvas-ului. Pentru a afișa imaginea ai nevoie de o sursă din care să preiei datele de imagine. Această sursă este un `Canvas​Image​Source`, la rândul său o interfață ce permite preluarea de date de imagine din următoarele posibile surse.

#### HTMLImageElement

[`HTMLImage​Element`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement) este interfața care oferă metodele și proprietățile necesarea manipulării elementelor `<img>`.
Constructorul este `Image()`. Constructorul poate avea opțional doi parametri care specifică width și height.

```javascript
var img1 = new Image(); // Image constructor
img1.src = 'image1.png';
img1.alt = 'alt';
document.body.appendChild(img1);

var img2 = document.createElement('img'); // Use DOM HTMLImageElement
img2.src = 'image2.jpg';
img2.alt = 'alt text';
document.body.appendChild(img2);

// using first image in the document
alert(document.images[0].src);
```

#### SVGImage​Element

#### HTMLVideo​Element

#### HTMLCanvasElement

#### Image​Bitmap

#### OffscreenCanvas

### `sx` și `sy`

Reprezintă coordonatele x, y calculate din colțul stânga sus a imaginii încărcate în canvas. Din acel punct se va face afișarea fragmentului de imagine în contextul de afișare setat ca destinație.

### `sWidth` și `sHeight`

Este lățimea și înălțimea fragmentului de imagine care va fi afișat în contextul destinație. Dacă nu este specificat, tot dreptunghiul până în dreapta jos, va fi noua imagine.

### `dx` și `dy`

Sunt coordonatele din canvas-ul destinație unde va fi plasat colțul stânga sus al imaginii sursă.

### `dWidth` și `dHeight`

Sunt dimensiunile specificate pentru imaginea care va fi desenată în canas-ul destinație. Aici, dacă specifici dimensiuni mai mari decât cele ale fragmentului de imagine, vei obține un efect de mărire.

## Excepții care pot apărea

### INDEX_SIZE_ERR

Dacă dreptunghiul sursei sau a canvas-ului au dimensiuni 0.

### INVALID_STATE_ERR

Imaginea nu are date de imagine.

### TYPE_MISMATCH_ERR

Elementul care este declarat a fi sursă nu are suport.

### NS_ERROR_NOT_AVAILABLE

Imaginea nu s-a încărcat încă. Pentru a avea confirmarea că s-a încărcat, folosește `.complete === true` sau `onload`.

## Exemplul MDN

```html
<canvas id="canvas"></canvas>
<div style="display:none;">
  <img id="source"
       src="https://mdn.mozillademos.org/files/5397/rhino.jpg"
       width="300" height="227">
</div>
```

și apoi transformarea

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = document.getElementById('source');

ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
```
