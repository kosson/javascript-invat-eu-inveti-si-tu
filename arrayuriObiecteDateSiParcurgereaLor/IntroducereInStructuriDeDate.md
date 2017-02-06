# Datele: stocarea și prelucrarea lor

Orice limbaj de programare are nevoie de structuri care să permită stocarea și manipularea facilă a datelor.
Javascript permite manipularea datelor la nivelul unor structuri stabilite formal în limbaj precum array-urile și obiectele. Cele mai simple structuri de date sunt însăși șirurile de caractere, care se supun metodelor de prelucrare a datelor specifice unui array.
Pentru a înțelege mai bine, imaginați-vă că sunteți în poziția unei funcții care produce niște rezultate. Dacă acele rezultate nu ar fi „încărcate” într-o structură capabilă să le preia, acestea s-ar pierde.

Obiectele pot fi transformate în array-uri dacă acest lucru servește procesării datelor conținute. De cele mai multe ori, varietatea și flexibilitatea metodelor obiectelor interne limbajului vă vor oferi și soluțiile de prelucrare.

Cel mai des vor fi folosite array-urile și obiecte care seamănă cu array-urile (adică care oferă suport parțial metodelor care pot fi aplicate în mod tradițional asupra array-urilor).

## Array-uri și obiecte array-like

Array-urile sunt o bornă centrală a programării indiferent de limbaj. Acestea permit stocarea temporară a unor valori într-o formă ușor accesibilă folosind indecși, dar cel mai important aspect este bogăția metodelor puse la dispoziție de obiectul intern Array pentru a prelucra, aranja, rearanja, filtra elementele conținute de array-uri.

Ori de câte ori veți lucra cu valori simple (scalare), veți folosi cu siguranță array-urile.

Array-urile mai pot fi folosite și ca structuri de „depozitare” a obiectelor. Spre exemplu, poți constitui un registru pentru elemente DOM cărora le asociezi câte un API.

## Map

Este un obiect introdus de ECMAScript 2015 care introduce o structură simplă de chei - valori care permite iterarea elementelor dar în ordinea în care acestea au fost introduse.

Înainte de introducerea lui Map, obiectele Object erau folosite pentru a stoca chei - valori. Pentru lucrul cu o structură simplă de date în care unei chei reprezentate de un string îi corespundea o valoare sau o metodă, obiectele simple se pretează cu succes.

Lucrurile începeau să se complice atunci când era nevoie să introduci structuri mai complexe ca valori așa cum sunt obiectele (așa-numitele hash-map-uri).

Un exemplu de folosire cu forțarea la limită a obiectelor.

```javascript
var obi = {};

function adauga(numeCheie, valoare){
  obi[numeCheie] = valoare;
};

function scoate(numeCheie){
  return obi[numeCheie];
};

adauga('primul', {a: 'element', b: true});
adauga('alDoilea', {x: 10, y: function(){return this.a}});
console.log(obi);   // Object { primul: Object, alDoilea: Object }
scoate('alDoilea'); // Object { x: 10, y: .y() }
```

Problema aici este că obiectul va avea și proprietățile care nu-i aparțin în mod direct, dar care sunt moștenite prototipal. O simplă verificare cu `obi.__proto__` va indica acest lucru.
O posibilă soluție pe genunchi ar fi crearea unui obiect căruia să-i fie tăiată moștenirea.

```javascript
let obi = Object.create(null); // lanțul prototipal este întrerupt
```

Dar chiar și așa, un alt neajuns este că toate cheile obiectului vor fi mereu stringuri.

Folosirea lui `Map` rezolvă aceste probleme oferind și metodele necesare pentru a gestiona datele din colecție.

```javascript
var obi = new Map();
obi.set('unobj', {a: 'element', b: true});
obi.set('alDoilea', {x: 10, y: function(){return this.a}});
obi.set(new Date(), 'data la această proprietate a fost accesată');
```
