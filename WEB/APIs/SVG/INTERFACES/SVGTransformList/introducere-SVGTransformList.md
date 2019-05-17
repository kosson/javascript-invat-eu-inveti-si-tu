# SVGTransformList

SVGTransformList definește o listă de obiecte SVGTransform.
SVGTransformList este un obiect care poate fi făcut read-only.

## Proprietăți

### `numberOfItems`

Indică numărul de elemente ale listei.

## Metode

### `clear()`

Returnează `void`. Pur și simplu elimină toate elementele din listă.

## Utilizarea mai multor obiecte SVGTransform

Exemplul este preluat de la Mozilla MDN și este creată o funcție care aplică trei transformări diferite (translate, rotate și scale) unui element SVG pe care a fost dat clic. Multiplele transformări se fac prin adăugarea repetată a oiectului care a suferit transformarea listei SVGTransformList asociată acelui element SVG.

```javascript
<svg id="my-svg" viewBox="0 0 300 280"
     xmlns="http://www.w3.org/2000/svg" version="1.1">
  <desc>Example showing how to transform svg elements that using SVGTransform objects</desc>
  <script type="application/ecmascript">
    <![CDATA[
        function transformMe(evt) {
        // svg root element to access the createSVGTransform() function
        var svgroot = evt.target.parentNode;

        // SVGTransformList of the element that has been clicked on
        var tfmList = evt.target.transform.baseVal;

        // Create a seperate transform object for each transform
        var translate = svgroot.createSVGTransform();
        translate.setTranslate(50,5);
        
        var rotate = svgroot.createSVGTransform();
        rotate.setRotate(10,0,0);

        var scale = svgroot.createSVGTransform();
        scale.setScale(0.8,0.8);

        // apply the transformations by appending the SVGTranform objects to the SVGTransformList associated with the element
        tfmList.appendItem(translate);
        tfmList.appendItem(rotate);
        tfmList.appendItem(scale);
        }
    ]]>
  </script>

  <polygon fill="orange" stroke="black" stroke-width="5"
           points="100,225 100,115 130,115 70,15 70,15 10,115 40,115 40,225" 
           onclick="transformMe(evt)"/>
  <rect x="200" y="100" width="100" height="100" 
        fill="yellow" stroke="black" stroke-width="5"  
        onclick="transformMe(evt)"/>
  <text x="40" y="250"
        font-family="Verdana" font-size="16" fill="green" >
    Click on a shape to transform it
  </text>
</svg>
```


## Resurse

-   [SVGTransformList | Mozilla MDN](https://developer.mozilla.org/en-US/docs/Web/API/SVGTransformList)
-   [SVGTransformList | SVG 1.1 (2nd Edition)](https://www.w3.org/TR/SVG/coords.html#InterfaceSVGTransformList)