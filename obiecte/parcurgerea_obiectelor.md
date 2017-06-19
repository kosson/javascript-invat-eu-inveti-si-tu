# Parcurgerea și iterarea obiectelor

Obiectele pot fi considerate a fi colecții de date

```javascript
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

## Accesarea proprietăților și a metodelor din interiorul aceluiași obiect

Metodele se vor apela cu `this`.

```javascript
function Obi(){
  let obi = new Object();
  obi.mesaj = function(){
    console.log('Te salut, om bun!');
  };
  obi.numar = function(){
    this.mesaj();
  };
  obi.mesaj();
  obi.numar();
  return obi;
};
Obi();
// Te salut, om bun!
// Object { mesaj: Obi/obi.mesaj() }
```

Un alt aspect important este diferența dintre accesarea proprietăților folosind **operatorul punct și operatorul paranteze pătrate**.

## Dot operator - operatorul punct

Permite accesarea proprietăților prin chei fixe. Este o sintaxă simplă pentru accesarea proprietăților unui obiect. Cheile proprietăților trebuie să fie identificatori.

Acest operator permite citirea proprietăților. Încercarea de a citi o proprietate care nu există returnează `undefined`. Dacă o proprietate nu există, aceasta va fi creată: `obiect.oProprietate = 'ceva';`.

Tot cu operatorul punct se pot apela metode ale obiectelor: `obiect.oMetoda()`.

## Operatorul `[]` - accesarea proprietăților prin cheile deja calculate.

Operatorul punct lucrează cu proprietăți fixe. Operatorul paranteză pătrată permite să faci referință către o proprietate printr-o expresie.

```javascript
var obiect = { unu: "primul", doi: "al doilea" };
obiect['u' + 'nu']; // "primul"
// sau
var cheieProprietate = 'doi';
obiect[cheieProprietate]; // "al doilea"
```

Acest operator permite accesarea proprietăților a căror chei nu sunt și identificatori:

```javascript
var obiect = {'aceasta cheie nu este identificator': 10};
obiect['aceasta cheie nu este identificator']; // 10
```

Trebuie spus că operatorul paranteză dreaptă constrânge, transformă automat (coerce) ceea ce are în interior la string.

```javascript
var obiect = {23: 10};
obiect[20 + 3]; // se rezolvă adunarea și se face constrângere la string
```

Apelarea unei metode chiar se întâmplă:

```javascript
var obiect = {unu: 1, meto: function(){return 'ciao'}};
obiect['meto'](); // "ciao"
```

Se pot seta și proprietăți folosind notația paranteză pătrată la fel ca în cazul operatorului cu punct:

```javascript
var obiect = {unu: 1};
obiect['doi'] = 2;
obiect; // Object { unu: 1, doi: 2 }
```

Se pot și șterge exact ca și în cazul operatorului cu punct:

```javascript
delete obiect['doi']; // true
```

## Operatorul `delete`

Permite eliminarea unei proprietăți, adică a perechii cheie-valoare din obiect. `delete` are efect doar asupra proprietăților care aparțin obiectului (`own`). Prototipul nu este afectat. Delete returnează false dacă proprietatea nu poate fi ștearsă dar care este deținută de obiect, și va returna true dacă proprietatea a fost ștearsă cu succes.

```javascript
var obiect = {prima: 1, aDoua: 2};
delete obiect.prima; // true
console.log(obiect); // Object { aDoua: 2 }
```

Dacă o proprietate este ștearsă, atunci și cheia sa va fi ștearsă.

Dacă o bibliotecă de cod ar introduce o proprietate nouă în prototipul obiectului general `Object`, atunci la parcurgerea obiectului, vom avea o proprietate suplimentară care apare.

```javascript
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

```javascript
"use strict";
var noduriDOM = document.querySelectorAll("div"),   // se constituie o colecție array-like
    arrayLike = Array.prototype.slice.call(noduriDOM);    // transformarea într-un array-like

arrayLike.forEach(function(element){
  console.log(element);
});
```

Cu o simplificare:

```javascript
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

```javascript
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

Singura modalitate este aceea de a folosi un obiect. În acest caz sunt anumite probleme care trebuie luate în considerare:

### Moștenirea - o problemă

Adică lanțul prototipal care se stabilește, poate afecta citirea proprietăților. Unele operațiuni, se uită la tot lanțul prototipal și „văd” proprietăți moștenite.
Alte operațiuni accesează doar proprietățile pe care obiectul le are fără a se uita la cele moștenite.

Atunci când folosești un obiect drept colecție (`map`), trebuie operat asupra lui cu mare atenție.

```javascript
var matrita = {proprietate: 'ceva'};
var obiect = Object.create(matrita);

obiect.altaProprietate = 'altceva';
```

### Verificări
#### Testare cu `in`

Pentru a testa dacă o proprietate există se poate folosi operatorul `in`. Problema cu `in` este aceea că ia în calcul și ceea ce este în prototip, în cazul nostru în matrita.

```javascript
'altaProprietate' in obiect; // true
// din nefericire in se uită și în prototip
'toString' in obiect; // true -> e foarte rău
// pentru că se uită și în Object.prototype.
'proprietate' in obiect; // true
```

#### Testare cu `hasOwnProperty()`

Pentru a verifica dacă o proprietate aparține obiectului se va folosi `hasOwnProperty()`:

```javascript
obiect.hasOwnProperty('altaProprietate'); // true
obiect.hasOwnProperty('proprietate'); // false
obiect.hasOwnProperty('toString'); // false
```

#### Radiografierea obiectelor cu `getOwnPropertyNames()`

Această metodă poate fi utilizată pentru a extrage informațiile care descriu un obiect. Mă refer la faptul că uneori avem nevoie să aflăm tot ce se poate afla despre un obiect pentru a ne face o idee generală despre ce oferă.

Să vedem cum am putea obține toate informațiile despre un obiect.

```javascript
console.log(Object.getOwnPropertyNames(window));
```

La momentul redactării acestui material, o astfel de interogare a returnat un array cu 904 chei reprezentând toate proprietățile și metodele obiectului `window` al browserului.

Putem merge mai departe pentru a separa care sunt metodele. Această procedură nu poate fi aplicată pe obiectul global `window`, dar funcționează pe oricare obiect, fie el global sau nu.

```javascript
console.log(Object.getOwnPropertyNames(String).filter(function(p){
  return typeof String[p] === 'function';
}));
```

Pentru obiecte care nu sunt foarte stufoase, se poate folosi cu succes și `console.dir(nume_obiect)`.

#### Testare cu `for...in`

Dacă folosești un `for...in` vei obține toate cheile, adică și pe cele din prototip. Deci, nu funcționează corect.
De ce se întâmplă acest lucru? Pentru că sunt luate în considerare și proprietățile moștenite prin prototip, care sunt setate ca `enumerable`. Motivul pentru care proprietățile lui `Object` nu apar este că acestea nu sunt `enumerable`.

```javascript
for (key in obiect) console.log(key);
// altaProprietate
// proprietate
```

### Accesează și citește cheile obiectului

Pentru a avea acces la cheile unui obiect și numai la cheile pe care respectivul obiect le deține, se va folosi `Object.keys`.

```javascript
Object.keys(obiect); // Array [ "altaProprietate" ]
```

### Obținerea unui array cu numele tuturor proprietăților

Dacă vrei să obții numele tuturor proprietăților, se va folosi `Object.getOwnPropertyNames(obiect)`;

```javascript
obiect.artefact = ['vază', 'statuetă'];
Object.keys(obiect); // Array [ "altaProprietate", "artefact" ]
```

### Obținerea valorii asociate unei proprietăți

Se poate opta pentru una din două modalități posibile de a face acest lucru:
- folosind **operatorul cu punct**
- folosind **operatorul cu paranteză pătrată**

Operatorul cu punct nu poate fi folosit pentru că avem de a face cu diverse chei care ar putea avea asociate diferite tipuri de date.

Din nefericire, operatorul cu paranteză dreaptă ia în considerare și proprietățile moștenite.

```javascript
obiect['toString']; // function toString()
```

Pentru că nu există o operațiune built-in pentru a citi doar proprietățile proprii. Este nevoie de a scrie o funcție care să facă chiar asta:
This is not what we want. There is no built-in operation for reading only own properties, but you can easily implement one yourself:

```javascript
function accesProprietatiProprii(obiectul, proprietatea){
  return (obiectul.hasOwnProperty(proprietatea)) ? obiectul[proprietatea] : undefined;
};

accesProprietatiProprii(obiect, 'altaProprietate'); // "altceva"
accesProprietatiProprii(obiect, 'artefact');        // Array [ "vază", "statuetă" ]
accesProprietatiProprii(obiect, 'toString');        // undefined
```

Varianta de mai sus are o problemă atunci când o proprietate a obiectului se numește exact `hasOwnProperty`. Atunci aceasta va înceta să mai lucreze și este recomandabil să se facă un call().

```javascript
function accesProprietatiProprii(obiectul, proprietatea){
  return (Object.prototype.hasOwnProperty.call(obiectul, proprietatea)) ? obiectul[proprietatea] : undefined;
};
```

## Crearea unui obiect fără a folosi un prototip

Acest mod de a crea un obiect este net superior celui normal și este cunoscut ca fiind „dict pattern”, adică șablonul de creare a unui dicționar.

```javascript
var obiect = Object.create(null); // asta înseamnă că Object.prototype este null
obiect.__proto__ // undefined
```

În acest moment nu vom mai avea legătură la Object.prototype, ceea ce elimină problemele pe care legătura prototipală le pune unui obiect care se dorește a fi un `map` sau un „dicționar”.

Acest șablon poate fi folosit pentru a crea biblioteci de cod fără a avea problema `prototype`.

## Parcurgerea și manipularea datelor din obiecte

Obiectele care sunt array-like pot fi transformate în array-uri prin folosirea unor metode ale obiectului intern `Array` și prin folosirea operatorului spread `[...identificatorArrayLike]`

```javascript
var colectieDeP = document.body.getElementsByTagName('a');

var arrColectie = Array.prototype.slice.call(colectieDeP, 0);
var arrColectie2 = [].slice.call(colectieDeP, 0);
var arrColectie3 = Array.from(colectieDeP);
var arrColectie4 = [...colectieDeP];
```

## Destructurarea obiectelor

Destructurarea a fost introdusă în ES6.

Similar destructurării array-urilor, se poate face același lucru în cazul obiectelor.

Cel mai simplu caz este cel de potrivire unu la unu prin asignarea directă a valorilor.

```javascript
var obi = {unu: 1, doi: 2};
var {unu, doi} = obi;
console.log(unu, doi); // 1 2
```

Trebuie ca numele identificatorilor să fie identic cu cel al proprietăților obiectului din care se face „transferul” valorilor, dar se poate face și cu modificarea numelor variabilelor.

```javascript
var obi = {unu: 1, doi: 2};
var {unu: prima, doi: aDoua} = obi;
console.log(prima, aDoua); 1 2
```

Valori implicite

```javascript
var {unu = 10, doi = 100} = {unu: 1000};
console.log(unu); // 1000
```

Se pot suprascrie valorile unor variable cu valorile proprietăților unui obiect prin mecanismul de destructurare (*destructuring assignment*).

```javascript
var obi = {
  unu: 1,
  doi: 2
};
var unu = 10,
    doi = 20;
// si acum destructurezi folosind operatorul ()
({unu, doi} = obi); console.log(unu, doi); // 1 2
// () este nevoie pentru a indica ca {} nu sunt un bloc de cod, ci o expresie
```
