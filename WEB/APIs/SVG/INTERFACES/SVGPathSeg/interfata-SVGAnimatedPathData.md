# SVGAnimatedPathData

Se aplică elementelor care au atributul `d`, care conține datele de `<path>`. Oferă posibilitatea de a anima acest atribut.

Această interfață oferă două liste pentru a **accesa** și **modifica** conținutul de bază (cel static, adică) al atributului `d`:
- `pathSegList` și 
- `normalizedPathSegList`.

Alte două liste oferă acces la valorile animate ale atributului `d`:
- `animatedPathSegList` și
- `animatedNormalizedPathSegList`.

Ambele perechi de liste sunt sincronizate între ele. Modificarea uneia, va declanșa modificarea celeilalte. Modificările aduse la `normalizedPathSegList` vor conduce la o fragmentare a path-ului în segmente normalizate.

## `pathSegList`

Atributul din DOM `pathSegList` oferă acces la conținutul de bază/static existent în atributul `d` într-o formă care se potrivește unu-la-unu cu sintaxa SVG-ului.

```javascript
var frame = svg.querySelector('#pathul'); // fă o referință la `frame` de care ai nevoie să redesenezi
var dataPath = frame.getAttribute('d');
//  M 266.6666666666667 210 L 373.33333333333337 210 L 373.33333333333337 270 L 266.6666666666667 270 Z 266.6666666666667 210
var segments = frame.pathSegList;
// var pathdata = frame.getPathData; // getPathData îl va înlocui pe pathSegList în SVG2
console.log(segments);  // Lista de elemente din lista atributului `d`.
/*
SVGPathSegList(5)
    0: SVGPathSegMovetoAbs { x: 266.6666564941406, y: 210, pathSegType: 2, … }
    1: SVGPathSegLinetoAbs { x: 373.3333435058594, y: 210, pathSegType: 4, … }
    2: SVGPathSegLinetoAbs { x: 373.3333435058594, y: 270, pathSegType: 4, … }
    3: SVGPathSegLinetoAbs { x: 266.6666564941406, y: 270, pathSegType: 4, … }
    4: SVGPathSegClosePath { pathSegType: 1, pathSegTypeAsLetter: "z" }
    length: 5
    numberOfItems: 5
    <prototype>: SVGPathSegListPrototype { getItem: getItem(), numberOfItems: Getter, length: Getter, … }

cu 

0: SVGPathSegMovetoAbs
    pathSegType: 2
    pathSegTypeAsLetter: "M"
    x: 266.6666564941406
    y: 210

1: SVGPathSegLinetoAbs
    ​​pathSegType: 4
    pathSegTypeAsLetter: "L"​​
    x: 373.3333435058594​​
    y: 210
...
4: SVGPathSegClosePath​​
    pathSegType: 1​​
    pathSegTypeAsLetter: "z"
*/
```

## `normalizedPathSegList`

Atributul din DOM `normalizedPathSegList` oferă o listă cu elemente prezentate într-o formă normalizată. Toate comenzile din `d` sunt prezentate sub forma `SVG_PATHSEG_MOVETO_ABS` (`M`), `SVG_PATHSEG_LINETO_ABS` (`L`), `SVG_PATHSEG_CURVETO_CUBIC_ABS` (`C`) și `SVG_PATHSEG_CLOSEPATH`(`z`).

## `animatedPathSegList`

Atributul din DOM `animatedPathSegList` oferă acces la conținutul animat din atributul `d` într-o formă care se potrivește unu-la-unu cu sintaxa SVG-ului.

```javascript
var frame = svg.querySelector('#marca'); // fă o referință la `frame` de care ai nevoie să redesenezi
    // console.log(frame);
    var dataPath = frame.getAttribute('d');
    //  M 266.6666666666667 210 L 373.33333333333337 210 L 373.33333333333337 270 L 266.6666666666667 270 Z 266.6666666666667 210

    // var segments = frame.pathSegList;
    var asegments = frame.animatedPathSegList;
    // var normalsegments = frame.normalizedPathSegList; // nu există suport pentru normalizedPathSegList în Firefox
        
    var len = asegments.numberOfItems;
    // var pathdata = frame.getPathData; // getPathData îl va înlocui pe pathSegList în SVG2
    
    for (var i = 0; i < len; ++i) {
        var segment = asegments.getItem(i);
        switch (segment.pathSegTypeAsLetter) {
            case 'M':
                // http://www.w3.org/TR/SVG/paths.html#InterfaceSVGPathSegMovetoAbs
                console.log("Move to", segment.x, segment.y);
            break;
            case 'L':
                // segment is a SVGPathSegLinetoAbs object
                console.log("Absolute Line To", segment.x, segment.y);
                break;
            case 'Z':
                console.log('Close');
                break;
                // see http://www.w3.org/TR/SVG11/paths.html#DOMInterfaces for constants
        }
    }
    /*
     Move to 266.6666564941406 210
     Absolute Line To 373.3333435058594 210
     Absolute Line To 373.3333435058594 270
     Absolute Line To 266.6666564941406 270
    */
```