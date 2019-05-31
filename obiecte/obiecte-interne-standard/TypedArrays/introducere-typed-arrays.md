# Typed arrays

Sunt un tip special de array-uri menite să lucreze doar cu array-uri numerice. Pentru a folosi aceste array-uri ai nevoie de un *array buffer* pentru a stoca datele. Un *array buffer* este o alocare de memorie în care se pot introduce un anumit număr de bytes.

Dacă veți căuta un constructor `TypedArray`, nu va exista unul pentru că acesta este un termen umbrelă pentru o serie de constructori dedicați manipulării datelor la nivel de bytes. Constructorii care pot fi considerați `TypedArray` sunt:

- `Int8Array()`;
- `Uint8Array()`;
- `Uint8ClampedArray()`;
- `Int16Array()`;
- `Uint16Array()`;
- `Int32Array()`;
- `Uint32Array()`;
- `Float32Array()`;
- `Float64Array()`;
- `BigInt64Array()`;
- `BigUint64Array()`.

Își are originile în necesitatea de a avea o structură de date care să poată fi computată rapid. A venit ca o solicitare a WebGL, o adaptare pentru reprezentări 3D într-un element `canvas`.

A fost gândit ca o depășire a limitărilor pe care le impune reprezentarea numerelor pe 64 de biți în JavaScript. Pentru calculele rapide de care are nevoie mediul 3D, era nevoie de o îmbunătățire a calculelor algebrice și cea mai rapidă este cea pe biți direct: *bitwise*. Conceptul este simplu: un număr poate fi reprezentat ca un array de biți cu posibilitatea de a folosi metodele aferente oricărui array.

**Spune standardul**:

> Obiectele TypedArray oferă o perspectivă asemănătoare unui array pentru un buffer de date binar.

Typed arrays permit stocarea și manipularea mai multor tipuri numerice:

- număr întreg pe 8 biți cu semn (**Int8**) - constructor `Int8Array`,
- număr întreg pe 8 biți fără semn (**Uint8**) - constructor `Uint8Array`,
- număr întreg pe 8 biți fără semn (**Uint8C**) - constructor `Uint8ClampedArray`,
- număr pe 16 biți cu semn (**Int16**) - constructor `Int16Array`,
- număr pe 16 biți fără semn (**Uint16**) - constructor `Uint16Array`,
- număr pe 32 de biți cu semn (**Int32**) - constructor `Int32Array`,
- număr pe 32 de biți fără semn (**Uint32**) - constructor `Uint32Array `,
- număr cu virgulă mobilă pe 32 de biți (**Float32**) - constructor `Float32Array`,
- număr cu virgulă mobilă pe 64 de biți (**Float64**) - constructor `Float64Array`.

Logica este următoarea. Știm că orice număr în JavaScript are o reprezentare pe 64 de biți. În cazul în care avem un număr de doar 8 biți, restul de 56 ar sta neocupați și astfel, o mare risipă.
Typed arrays sunt instrumentul care adresează această problemă.

Pentru a crea un *array buffer* se va folosi constructorul `ArrayBuffer`.

```javascript
var tampon = new ArrayBuffer(4);
// alocă-mi un spațiu de 4 bytes în memorie
```

Un lucru care trebuie ținut mereu minte este acela că un array buffer va fi exact de dimeniunea specificată în bytes inițial. Nu poate fi extins.

Pentru a verifica câți bytes sunt în alocarea de memorie constituită cu `ArrayBuffer`, se va folosi proprietatea `byteLength`.

```javascript
console.log(tampon.byteLength); // 4
```

Pentru că vorbim despre un array, pentru prelucrarea datelor din buffer, se pot folosi metodele array. De exemplu, `slice()`. Metoda funcționează exact la fel ca și în cazul array-urilor clasice.

```javascript
var tampon2 = tampon.slice(2, 3);
console.log(tampon2.byteLength); // 1
```

## Metode

### TypedArray.from()

Creează un `TypedArray` din orice obiect array-like sau care implementează protocolul iterable (vezi `Array.from()`). 

## Manipularea datelor din `ArrayBuffer`

Singura metodă de a lucra cu datele din zonele tampon create în memorie este de a crea așa-numitele *views* (perspective). Am putea să le spunem foarte frumos și ferestre pentru că oferă chiar un comportament de fereastră. Te uiți pe ea și vezi datele din zona tampon.

```javascript
let tampon = new ArrayBuffer(5),
    fereastra = new DataView(tampon);
// { buffer: ArrayBuffer, byteLength: 5, byteOffset: 0 }
```

Poți mișca *fereastra* pentru a investiga doar o parte a zonei tampon. Să spunem că dorim să *investigăm* bytes de la poziția 4 la 6.

```javascript
let fereastra = new DataView(tampon, 4, 6);
```

La momentul în care am aruncat o privire peste datele din zona tampon am găsit câteva proprietăți ale *ferestrei*.

- `buffer`: indică bufferul la care este atașată *fereastra*
- `byteOffset`: este implicit setat la valoarea `0`.
- `byteLength`: dacă este oferită vreo valoare acestei proprietăți pentru constructorul `DataView`, va seta dimensiunea buffer-ului.

Atenție, investigarea unui buffer folosind o fereastră inițiată prin constructorul `DataView` va fi una limitată doar la acea fereastră cu toate setările sale. Asupra aceluiași buffer poți iniția mai multe ferestre.

Pentru datele numerice care pot fi scrise într-un tampon de date, constructorul `DataView` are metode get și set cu ajutorul cărora se pot citi și scrie la nevoie date. Numele metodelor sunt construite atașând la get și la set prescurtarea tipului de date cu care se operează:

- getInt8(byteOffset, littleEndian): citește un număr întreg reprezentat pe 8 biți începând de unde specifică `byteOffset`.
- setInt8(byteOffset, value, littleEndian): scrie un număr pe 8 biți de la poziția specificată de `byteOffset`.
- getUInt8(byteOffset, littleEndian): citește un număr pe 8 biți de la poziția byteOffset, dar care este unsigned.
- setUInt8(byteOffset, value, littleEndian): scrie un număr.

## Referințe

- [22.2 TypedArray Objects, ECMAScript 2018](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-typedarray-objects)
- [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
