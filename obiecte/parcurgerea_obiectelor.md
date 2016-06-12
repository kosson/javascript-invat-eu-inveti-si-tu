# Parcurgere și iterare a obiectelor

Obiectele pot fi considerate a fi colecții de date

```js
"use strict";
var obiect = { unu: "primul", doi: "al doilea" },
    cheie;
for( cheie in obiect ){
  console.log( cheie, obiect[cheie] );
};
/*
unu primul
doi al doilea
 */
```

Este important de spus faptul că Object, ca și obiect intern standard JavaScript pune la dispoziție trei metode foarte importante pentru înțelegerea modurile prin care pot fi exploatate obiectele.
- `Object.create({prop: 1})` și cu a sa variantă `Object.create(null)`,
- `Object.hasOwnProperty(proprietate)`
- `Object.keys`

Un alt aspect important este diferența dintre accesarea proprietăților folosind operatorul punct și operatorul paranteze pătrate.

## Dot operator - operatorul punct

Permite accesarea proprietăților prin chei fixe. Este o sintaxă simplă pentru accesarea proprietăților unui obiect. Cheile proprietăților trebuie să fie identificatori.

Acest operator permite citirea proprietăților. Încercarea de a citi o proprietate care nu există returnează `undefined`. Dacă o proprietate nu există, aceasta va fi creată: `obiect.oProprietate = 'ceva';`.

Tot cu operatorul punct se pot apela metode ale obiectelor: `obiect.oMetoda()`.

## Operatorul `[]` - accesarea proprietăților prin cheile deja calculate.

Operatorul punct lucrează cu proprietăți fixe. Operatorul paranteză pătrată permite să faci referință către o proprietate printr-o expresie.

```js
var obiect = { unu: "primul", doi: "al doilea" };
obiect['u' + 'nu']; // "primul"
// sau
var cheieProprietate = 'doi';
obiect[cheieProprietate]; // "al doilea"
```

Acest operator permite accesarea proprietăților a căror chei nu sunt și identificatori:

```js
var obiect = {'aceasta cheie nu este identificator': 10};
obiect['aceasta cheie nu este identificator']; // 10
```

Trebuie spus că operatorul paranteză dreaptă constrânge (coerse) ceea ce are în interior la string.

```js
var obiect = {23: 10};
obiect[20 + 3]; // se rezolvă adunarea și se face constrângere la string
```

Apelarea unei metode chiar se întâmplă:

```js
var obiect = {unu: 1, meto: function(){return 'ciao'}};
obiect['meto'](); // "ciao"
```

Se pot seta și proprietăți folosind notația paranteză pătrată la fel ca în cazul operatorului cu punct:

```js
var obiect = {unu: 1};
obiect['doi'] = 2;
obiect; // Object { unu: 1, doi: 2 }
```

Se pot și șterge exact ca și în cazul operatorului cu punct:

```js
delete obiect['doi']; // true
```

## Operatorul `delete`

Permite eliminarea unei proprietăți, adică a perechii cheie-valoare din obiect. `delete` are efect doar asupra proprietăților care aparțin obiectului (`own`). Prototipul nu este afectat. Delete returnează false dacă proprietatea nu poate fi ștearsă dar care este deținută de obiect, și va returna true dacă proprietatea a fost ștearsă cu succes.

```js
var obiect = {prima: 1, aDoua: 2};
delete obiect.prima; // true
console.log(obiect); // Object { aDoua: 2 }
```

Dacă o proprietate este ștearsă, atunci și cheia sa va fi ștearsă.

Dacă o bibliotecă de cod ar introduce o proprietate nouă în prototipul obiectului general `Object`, atunci la parcurgerea obiectului, vom avea o proprietate suplimentară care apare.

```js
"use strict";
var obiect = { unu: "primul", doi: "al doilea" },
    cheie;
for( cheie in obiect ){
  console.log( cheie, obiect[cheie] );
};
Object.prototype.trei = "al treilea";
/*
unu primul
doi al doilea
 */
 for( cheie in obiect ){
   console.log( cheie, obiect[cheie] );
 };
 /*
 unu primul
 doi al doilea
 baz baz
  */
```

## Tratarea obiectelor care seamănă cu array-uri

Cel mai la îndemână exemplu sunt nodurile DOM. Parcurgerea (traversing) DOM-ului se numește „walking the DOM”.
DOM-ul este o colecție de noduri. Cel mai ades pentru accesarea informației din nodurile de interes, mai întâi acestea trebuie identificate. Se folosesc clasicele:
- document.getElementById("#idfolosit"),
- document.getElementsByTagName,
- document.querySelector (pot fi tag-uri, class, id-uri, attributes, pseudoclase, elemente).

```js
"use strict";
var noduriDOM = document.querySelectorAll("div"),   // se constituie o colecție array-like
    arrayLike = Array.prototype.slice.call(noduriDOM);    // transformarea într-un array-like

arrayLike.forEach(function(element){
  console.log(element);
});
```

Cu o simplificare:

```js
var noduriDOM = document.querySelectorAll("div"),   // se constituie o colecție array-like
    arrayLike = [].slice.call(noduriDOM);           // transformarea într-un array-like

arrayLike.forEach(function(element){
  console.log(element);
});
```
Atenție, pentru că o țintire a elementelor de interes cu ajutorul lui querySelector poate fi confuză uneori, cel mai bine este să fie folosit atributul de selecție „data-ceva="formular"”.

```html
<ul data-target="lista">
  <li data-target="element">unu</li>
  <li data-target="element">doi</li>
  <li data-target="element">trei</li>
</ul>
```

Țintele de selecție devin mult mai clare nefiind afectate de schimbările posibile aduse elementelor DOM sau CSS

```js
var lista = document.querySelector('[data-target=\"lista\"]');
var colectia = document.querySelectorAll('[data-target=\"element\"]');

var caAr = [].slice.call(colectia);
console.log(caAr);            // Array[li, li, li]
caAr.forEach(function(elem){
  console.log(elem);          // <li data-target="element">
});
```

Elementele găsite sunt de fapt o colecție de noduri, care este dinamică în sensul că de fiecare dată când DOM-ul va suferi o modificare, se va actualiza și aceasta.

În ES6 există o aceeași abordare: `arrayLike = Array.from(nodes)`. ES6 introduce un nou tip de obiecte iterabile - obiecte ale căror elemente pot fi extrase rând pe rând.

## Folosirea unui obiect ca un dicționar de valori (`map`)

JavaScript nu are structuri de date specifice unei „hărți” de valori - ceea ce se înțelege în alte limbaje de programare a fi un `map`.

Singura modalitate este aceea de a folosi un obiect. În aces caz sunt anumite probleme care trebuie luate în considerare:

### Moștenirea - o problemă

Adică lanțul prototipal care se stabilește, poate afecta citirea proprietăților. Unele operațiuni, se uită la tot lanțul prototipal și „văd” proprietăți moștenite.
Alte operațiuni accesează doar proprietățile pe care obiectul le are fără a se uita la cele moștenite.

Atunci când folosești un obiect drept colecție (`map`), trebuie operat asupra lui cu mare atenție.

```js
var matrita = {proprietate: 'ceva'};
var obiect = Object.create(matrita);

obiect.altaProprietate = 'altceva';
```

### Testare cu `in`

Pentru a testa dacă o proprietate există se poate folosi operatorul `in`. Problema cu `in` este aceea că ia în calcul și ceea ce este în prototip, în cazul nostru în matrita.

```js
'altaProprietate' in obiect; // true
// din nefericire in se uită și în prototip
'toString' in obiect; // true -> e foarte rău pentru că se uită și în Object.prototype.
'proprietate' in obiect; // true
```

### Testare cu `hasOwnProperty()`

Pentru a verifica dacă o proprietate aparține obiectului se va folosi `hasOwnProperty()`:

```js
obiect.hasOwnProperty('altaProprietate'); // true
obiect.hasOwnProperty('proprietate'); // false
obiect.hasOwnProperty('toString'); // false
```

### Testare cu `for...in`

Dacă folosești un `for...in` vei obține toate cheile, adică și pe cele din matrita. Deci, nu funcționează.
De ce se întâmplă acest lucru? Pentru că sunt luate în considerare și proprietățile moștenite prin prototip, care sunt setate ca `enumerable`. Motivul pentru care proprietățile lui Object nu apar este că acestea nu sunt `enumerable`.

```js
for (key in obiect) console.log(key);
// altaProprietate
// proprietate
```

### Accesează și citește cheile obiectului

Pentru a avea acces la cheile unui obiect și numai la cheile pe care respectivul obiect le deține, se va folosi `Object.keys`.

```js
Object.keys(obiect); // Array [ "altaProprietate" ]
```

### Obținerea unui array cu numele tuturor proprietăților

Dacă vrei să obții numele tuturor proprietăților, se va folosi `Object.getOwnPropertyNames(obiect)`;

```js
obiect.artefact = ['vază', 'statuietă'];
Object.keys(obiect); // Array [ "altaProprietate", "artefact" ]
```

### Obținerea valorii asociate unei proprietăți

Se poate opta pentru una din două modalități posibile de a face acest lucru:
- folosind operatorul cu punct
- folosind operatorul cu paranteză pătrată

Operatorul cu punct nu poate fi folosit pentru că avem de a face cu diverse chei care ar putea avea asociate diferite tipuri de date.

Din nefericire, operatorul cu paranteză dreaptă ia în considerare și proprietățile moștenite.

```js
obiect['toString']; // function toString()
```

Pentru că nu există o operațiune built-in pentru a citi doar proprietățile proprii. Este nevoie de a scrie o funcție care să facă chiar asta:
This is not what we want. There is no built-in operation for reading only own properties, but you can easily implement one yourself:

```js
function accesProprietatiProprii(obiectul, proprietatea){
  return (obiectul.hasOwnProperty(proprietatea)) ? obiectul[proprietatea] : undefined;
};

accesProprietatiProprii(obiect, 'altaProprietate'); // "altceva"
accesProprietatiProprii(obiect, 'artefact');        // Array [ "vază", "statuietă" ]
accesProprietatiProprii(obiect, 'toString');        // undefined
```

Varianta de mai sus are o problemă atunci când o proprietate a obiectului se numește exact `hasOwnProperty`. Atunci aceasta va înceta să mai lucreze și este recomandabil să se facă un call().

```js
function accesProprietatiProprii(obiectul, proprietatea){
  return (Object.prototype.hasOwnProperty.call(obiectul, proprietatea)) ? obiectul[proprietatea] : undefined;
};
```

## Crearea unui obiect fără a folosi un prototip

Acest mod de a crea un obiect este net superior celui normal și este cunoscut ca fiind „dict pattern”, adică șablonul de creare a unui dicționar.

```js
var obiect = Object.create(null); // asta înseamnă că Object.prototype este null
obiect.__proto__ // undefined
```

În acest moment nu vom mai avea legătură la Object.prototype, ceea ce elimină problemele pe care legătura prototipală le pune unui obiect care se dorește a fi un `map` sau un
„dicționar”.

Acest șablon poate fi folosit pentru a crea biblioteci de cod fără a avea problema `prototype`.
