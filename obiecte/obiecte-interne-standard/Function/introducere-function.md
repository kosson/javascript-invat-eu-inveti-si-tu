# `Function()`

Este un constructor pentru funcții. Primele argumente introduse constituie parametrii formali ai viitoarei funcții iar ultimul argument va fi codul executabil.

## Spune standardul

Atunci când `Function` este apelat ca funcție și nu ca un constructor, este creat și inițializat un nou obiect Function. Astfel, apelul `Function()` este echivalent cu expresia care generează obiectul Function: `new Function()`.

Constructorul lui Function este în sine un obiect funcție built-in.

**Obiectul prototype al lui `Function` este în sine un obiect-funcție intern**. Acest lucru este încă acceptat pentru că trebuie asigurată compatibilitatea cu restul codului scris înainte de ECMAScript 2015.

`Function` nu poate fi constructor (nu are metoda internă [\[Construct]]). Acest obiect nu are la rândul său o proprietate `property`.

## Spune standardul

Funcțiile create folosind `Function.prototype.bind()` au următoarele sloturi interne:
- [\[BoundTargetFunction]] care este obiectul funcție împachetat,
- [\[BoundThis]] fiind valoarea care este pasată întotdeauna ca this atunci când este apelată funcția împachetată.
- [\[BoundArguments]] este o listă de valori a cărei valori sunt folosite ca prime argumente pentru funcția împachetată apelată.

Nu au proprietatea `prototype` obiectele funcții care sunt create prin `Function.prototype.bind` sau care au fost create prin evaluarea definirii unei simple metode (care nu este `Generator`) sau funcțiile arrow.

## Pe larg

În exemplul alăturat, ultimul argument specifică codul executabil.

```javascript
var adunare = new Function("primulNr", "alDoileaNr", "return primulNr + alDoileaNr");
adunare(1, 2); // 3
```

Începând cu ES6 argumentele pasate constructorului pot fi manipulate astfel încât un argument să existe în funcție de existența unuia anterior.

```javascript
var functieNoua = new Function("unu", "doi = unu", "return unu + doi");
functieNoua(5); // 10
functieNoua(5, 4);  // 9
```

Pot fi folosiți și parametrii rest:

```javascript
var functieNoua = new Function('...intrari', 'return intrari[0]');
functieNoua('a','b','c','d'); // "a"
```

## Metode:

- `Function.prototype.apply()`
- `Function.prototype.bind()`
- `Function.prototype.call()`
- `Function.prototype.toString()`

### `Function.prototype.apply()`

Apelează o funcție căreia îi setează bindingul pentru `this` la valoarea care a fost introdusă. Argumentele pot fi pasate ca obiect Array.

Funcția este pur și simplu invocată în contextul indicat de primul argument al lui apply și îi sunt pasate argumentele care sunt elementele array-ului din al doilea argument al lui apply `functie.apply(this, ['prima', 'a doua'])`.

Metoda primește două argumente:

- o referință către un obiect, care devine și `this` pentru funcția apelată cu apply().
- o listă de argumente organizată ca array sau ceva ce seamănă cu un array (`array-like`).

Dacă nu este invocat `strict mode` (`"use strict";`), `null` și `undefined` în cazul primului argument, acesta va fi înlocuit cu obiectul global, iar primitivele vor fi „învelite” în obiectul corespunzător (în limba engleză se zice `boxing`).

Pentru parametrul listei de argumente se poate folosi și obiectul care seamănă ca un array: `arguments`, care este o variabilă locală a unei funcții. Astfel, poți pasa toate argumentele în obiectul apelat, care trebuie să gestioneze aceste argumente.

Începând cu ECMAScript 5 se poate folosi orice obiect care este array-like pentru al doilea argument. Cazul cel mai util ar fi aplicațiile practice în lucrul cu API-ul DOM-ului. Aici ne gândim la obiectele `NodeList` ( [referința MDN](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) ) returnate de `Node.childNodes` și `document.querySelectorAll`. ATENȚIE! NodeList nu sunt array-uri și nu se pot invoca metodele din prototipul lui Array.

#### Mecanisme oferite de `apply()`.

Obiectul pasat ca și context, în fapt cel care constituie `this`, este, de fapt **apelantul** funcției. Ceea ce permite acest mecanism, de fapt, este posibilitatea de a scrie o funcție cu rol de metodă, care să poată fi folosită în alt obiect fără a fi necesară rescrierea metodei pentru respectivul obiect dorit ca și context.

Începând cu ECMAScript 5, array-ul argumentelor pasate este un obiect care are caracteristicile unui array: `arguments`.

##### Mecanism de operare a funcțiilor interne ale limbajului

Ține minte că și funcțiile interne (metode ale obiectelor interne), se pot bucura de avantajele folosirii lui apply().

**În cazul obiectului intern Math**

```javascript
var numere = [12, 43, 32, 3];

var max = Math.max.apply(null, numere); // 43
// null setează la global scope this.
var min = Math.min.apply(null, numere); // 3
```

**În cazul obiectului intern Array**

Putem crea un array „dens” (adică populat cu valori):

```javascript
Array.apply(null, Array(5)); // Array [ undefined, undefined, undefined, undefined, undefined ]
```

### `Function.prototype.bind()`

Creează o funcție nouă a cărui `this` este setat la un obiect care trebuie să-l oferi. Secvența de argumente introdusă de `bind()` are precedență asupra celor introduse la momentul apelării funcției.

```javascript
function incrementare(arg){
  console.log(arg);;
  console.log(arguments); //  { 0: 12, 1: 10, 2: 5, callee: incrementare(), length: 3, __proto__: Object }
  return arg + 1;
};
var adauga = incrementare.bind(null, 12, 10); // 12 suprascrie pe 5
console.log(adauga(5)); // 13
```

Standardul spune că funcțiile obiecte create folosind `Function.prototype.bind()` sunt obiecte exotice. Nu au proprietatea `prototype`.

Un exemplu cu aplicatibilitate directă este manipularea DOM-ului. Spre exemplu să te asiguri că vei referenția mereu obiectul `document`.

```javascript
var extrage = document.getElementById.bind(document, 'elementulX');
var elemX = extrage();
```

### `Function.prototype.call()`

Apelează (`call`) o funcție. Setează `this` la obiectul pasat și argumentele pot fi pasate așa cum sunt.

Argumentele de după specificarea lui `this` sunt pasate funcției apelată cu call.

```javascript
function faCeva (arg){
  console.log('Am primit ' + arg);
};
faCeva.call(null, ['o banană', ' și un măr']);
// Am primit o banană, și un măr
```

### `Function.prototype.toString()`

Returnează un șir de caractere, care, de fapt este chiar codul sursă al acelei funcții.
