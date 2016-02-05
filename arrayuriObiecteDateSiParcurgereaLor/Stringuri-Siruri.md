# Stringuri / șiruri de caractere

## Mantre

- Stringurile sunt obiecte

## Crearea obiectelor String

### Folosind constructorul: ```new String()```
```js
var str = new String("test");
```

### Cu declararea simplă prin paranteze drepte: string literal

Metodele indexOf() și lastIndexOf() pot fi utilizate pentru căutarea unui substing într-un string. ```indexOf("substring")``` returnează valoarea indexului de la care începe substringul pasat ca argument.
`indexOf()` și `lastIndexOf()` pot primi un al doilea parametru care indică indexul de la care să pornească căutarea. Dacă al doilea parametru nu este menționat, căutarea se va face de la index 0. Dacă nu este este găsit substringul, va fi returnată valoarea -1.

### Extragerea substringurilor

| t | e | s | t | e |   | d | e |   | s | t | r | i | n | g | u | r | i |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|  
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |


```js
var str = "teste de stringuri";

str.substr(11, 3); // => "rin"

str.substring(11, 14); // => "rin"

str.slice(11, 14); // => "rin"

str.substring(11, 3); // => "te de st"

```

Lista metodelor disponibile stringurilor

| obiectul în sine      | to                 | formatare    | identificare  | extragere     | evenimente    | manipulare    |
| :------------         | :------------      | :------------| :-------------| :-------------| :-------------| :-------------|
| constructor()         | toLocalLowerCase() | anchor()     | charAt()      | slice()       | watch()       | concat()      |
| isPrototypeOf()       | toLocalString()    | * big()      | charCodeAt()  | substr()      | unwatch()     | repeat()      |
| propertyIsEnumerable()| toLocalUppperCase()| * bold()     | codePointAt() | substring()   |               | replace()     |
| hasOwnProperty()      | toLowerCase()      | * fontsize() | indexOf()     | trim()        |               | split()       |
|                       | toSource()         | textcolor()  | lastIndexOf() | trimLeft()    |               | localCompare()|
|                       | toString()         | italics()    | length()      | trimRight()   |
|                       | toUpperCase()      | link()       | search()      |    
|                       |                    | * small()    | endsWith()    |
|                       |                    | * strike()   | startsWith()  |
|                       |                    | * sup()      | valueof()     |
|                       |                    | * blink()    | contains()    |
|                       |                    | * sub()      | inludes()     |
|                       |                    | * fixed()    | match()       |
|                       |                    | * normalize()|

( * nu mai sunt suportate de standard )

O combinație între substr și lastIndexOf.

```js
var fileName = window.location.href;
fileName = fileName.substr(fileName.lastIndexOf("/") + 1);
document.write("The file name of this page is " + fileName);
```
