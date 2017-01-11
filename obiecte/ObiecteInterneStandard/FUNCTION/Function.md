# Function

Este un constructor pentru funcții.

În exemplul alăturat, ultimul argument specifică codul executabil.

```js
var adunare = new Function("primulNr", "alDoileaNr", "return primulNr + alDoileaNr");
adunare(1, 2); // 3
```

Metode:

- Function.prototype.apply()
- Function.prototype.bind()
- Function.prototype.call()
- Function.prototype.toString()

## Function.prototype.apply()

Apelează o funcție căreia îi setează bindingul pentru `this` la valoarea care a fost introdusă. Argumentele pot fi pasate ca obiect Array.

Funcția este pur și simplu invocată în contextul indicat de primul argument al lui apply și îi sunt pasate argumentele care sunt elementele array-ului din al doilea argument al lui apply `functie.apply(this, ['prima', 'a doua'])`.

Primește două argumente:
- o referință către un obiect, care devine și `this` pentru funcția apelată cu apply().
- o listă de argumente organizată ca array sau ceva ce seamănă cu un array (`array-like`).

Dacă nu este invocat `strict mode` (`"use strict";`), `null` și `undefined` în cazul primului argument, acesta va fi înlocuit cu obiectul global iar primitivele vor fi „învelite” în obiectul corespunzător (`boxing`).

Pentru parametrul listei de argumente se poate folosi și array-like-ul `arguments`, care este o variabilă locală a unei funcții. Astfel, poți pasa toate argumentele în obiectul apelat, care trebuie să gestioneze aceste argumente.

Începând cu ECMAScript 5 se poate folosi orice obiect care este array-like pentru al doilea argument. Cazul cel mai util ar fi aplicațiile practice în lucrul cu API-ul DOM-ului. Aici ne gândim la obiectele `NodeList` ( [referința MDN](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) ) returnate de `Node.childNodes` și `document.querySelectorAll`. ATENȚIE! NodeList nu sunt array-uri și nu se pot invoca metodele din prototipul lui Array.

### Mecanisme oferite de `apply()`.

Obiectul pasat ca și context, în fapt cel care constituie `this`, este, de fapt **apelantul** funcției. Ceea ce permite acest mecanism, de fapt este posibilitatea de a scrie o funcție cu rol de metodă, care să poată fi folosită în alt obiect fără a fi necesară rescrierea metodei pentru un nou obiect.

Începând cu ECMAScript 5, array-ul argumentelor pasate este un obiect care are caracteristicile unui array: `arguments`.

#### Mecanism de operare a funcțiilor interne limbajului

Ține minte că și funcțiile interne (metode ale obiectelor interne), se pot bucura de avantajele folosirii lui apply().

**În cazul obiectului intern Math**

```js
var numere = [12, 43, 32, 3];

var max = Math.max.apply(null, numere); // 43
// null setează la global scope this.
var min = Math.min.apply(null, numere); // 3
```

**În cazul obiectului intern Array**

Putem crea un array „dens” (adică populat cu valori):

```js
Array.apply(null, Array(5)); // Array [ undefined, undefined, undefined, undefined, undefined ]
```

## `Function.prototype.bind()`

Creează o funcție nouă a cărui `this` este setat la valoarea oferită. Secvența de argumente introdusă are precedență asupra celor existente la momentul apelării funcției.

Standardul spune că funcțiile obiecte create folosind `Function.prototype.bind()` sunt obiecte exotice. Nu au proprietatea `prototype`.

## `Function.prototype.call()`

Apelează (`call`) o funcție. Setează `this` la obiectul pasat și argumentele pot fi pasate așa cum sunt.

## `Function.prototype.toString()`

Returnează un șir de caractere, care, de fapt este chiar codul sursă al acelei funcții.
