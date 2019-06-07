# HTMLImageElement

Este o interfață care permite manipularea layout-ului și a prezentării elementelor `<img>`.

Moștenește proprietățile lui `HTMLElement`.

```javascript
// varianta clasică cu callback
function incarcImagine (url, callback) {
  let imagine = new Image();
  imagine.onload = function(){
    callback(null, image);
  };
  imagine.onerror = function(){
    let mesaj = "Încărcare eșuată de la " + url;
    callback(new Error(msg));
  };
  imagine.src = url;
};
export default incarcImagine;

/*În alt fișier*/
import incarcaImagine from './loader-imagine';

incarcaImagine('img/globul.jpeg', (error, img) => {
  let elemImg = document.createElement('img');
  elemImg.src = img.src;
  document.body.appenChild(elemImg);
});
```
