# WeakMap

Începând cu versiunea ES6 a standardului, au apărut obiecte dedicate realizării de colecții. Au apărut din necesitatea evitării diferitelor contrângeri impuse de obiectele obișnuite.

Este o colecție de perechi cheie-valoare care au o particularitate foarte utilă: toate cheile sunt obiecte spre deosebire de `Map`, unde pot fi și primitive. Nu sunt admise valori primitive, incluzând `Sympbol`. `WeakMap`-ul este asemănător unui `Map` în sensul că are metode similare:

- `numeWeakMap.get(key)`,
- `numeWeakMap.set(key, value)`,
- `numeWeakMap.delete(key)`,
- `numeWeakMap.has(key)`.

Un `WeakMap` nu oferă suport pentru iterare prin metodele `keys()`, `values()`, `entries()`.

De unde vine denumirea **weak**? În limba engleză *weak* înseamnă *slab*. În cazul obiectului nostru, această *slăbiciune* vine din faptul că, de îndată ce nu mai există vreo referință către obiectul care joacă rol de cheie, acesta va putea fi *colectat la gunoi*, ceea ce este echivalentul unei ștergeri din structura internă a obiectului însuși.

Amintește-ți că un obiect *trăiește* câtă vreme există o referință către acesta sau către una din proprietățile sale. Dacă am ține evidența unor obiecte folosind un `Map`, această structură ar ține o referință permanentă către obiectul ca proprietate a sa. Dacă nu mai este referit, va fi menținut în viață în continuare taxând resursele. Din necesitatea *colectarii la gunoi* a obiectelor care nu mai sunt referite, s-a născut această nouă structură pentru gestionarea obiectelor *efemere*. În cazul în care nu mai există vreo referință către obiectul proprietate al unui `WeakMap`, sau respectivul obiect a fost setat la `undefined`, va fi *colectat la gunoi*. În cazul în care valoarea membrului unui `WeakMap` este un obiect, acesta va fi colectat și el la gunoi.

Pentru a crea un `WeakMap` se va folosi constructorul `WeakMap([iterabil])`.

```javascript
const OBI_SLAB = new WeakMap();
let obiProp = {ceva: 1};
let obiVal = {undeva: 'Cugir'};
OBI_SLAB.set(obiProp, obiVal);
// verificări:
OBI_SLAB.has(obiProp); // true
obiProp = undefined;
OBI_SLAB.has(obiProp); // false
OBI_SLAB.get(obiProp); // undefined
```

Acest comportament oferă posibilitatea folosirii lui `WeakMap` ca o structură temporară (*cache temporar*) în care poți asocia informație utilă anumitor obiecte, fie acestea elemente DOM, de exemplu, sau chiar obiecte din biblioteci de cod pe care le folosești.

```javascript
let temporar = new WeakMap;
function introduInTemporar (obi) {
  if(!temporar.has(obi)){
    let rezultat = obi.a + obi.b; // aici poți performa operațiuni intermediare înainte de stocare
    temporar.set(obi, rezultat);
  }
  return temporat.get(obi);
}
```

În acest moment poți crea un obiect, pe care să-l introduci în obiectul temporar, dar de îndată ce-l vei seta la `null`, toate referințele și datele asociate fiecăreia, vor dispărea, fiind *colectate la gunoi*.

**Moment ZEN**: Cheia ține valoarea în viață.

## Cache de obiecte

Să ne gândim că în urma unor evaluări obținem niște rezultate pe care dorim să le accesăm dintr-o zonă intermediară unde stau gata de lucru fără să le mai generăm o dată - un cache de date.

```javascript
const tamponDate = new WeakMap();
function serveșteObiecte (obiect) {
  if(tamponDate.has(obiect)){
    console.log('obiectul este deja în tampon');
    return tamponDate.get(obiect);
  } else {
    console.log('Nu este în tampon, îl bag!');
    let id = obiect.id;
    tamponDate.set(obiect, id);
  };
};
const obi1 = {id: 1, a: 2};
serveșteObiecte(obi1);
```

## Gestionarea obiectelor DOM

WeakMap-urile pot fi folosite și pentru a gestiona obiectele cărora le atașezi evenimente. Este cazul obiectelor DOM.

```javascript
const evCnxCuReceptori = new WeakMap();
function cnxCuReceptorul (obi, receptor) {
  // dacă obiectul există deja
  if(!evCnxCuReceptori.has(obi)){
    // valoarea este un set pentru că unui obiect
    // i se pot atașa mai multe evenimente, care
    // sunt unice, deci pretabile la un Set
    evCnxCuReceptori.set(obi, new Set());
  }
  // în acest moment putem atașa evenimentele
  evCnxCuReceptori.get(obi).add(receptor);
};

/*Simularea atașării de evenimente unui obiect*/
const obiW = {a: 1};
cnxCuReceptorul(obiW, function prim () {
  console.log(`Sunt evenimentul prim`);
});
cnxCuReceptorul(obiW, function secund () {
  console.log(`Sunt evenimentul secund`);
});

function declanșezEv (obi, tinta) {           // obiectul cache (obi) în care sunt contorizate elementele (tinta) cu receptori
  if (obi.get(tinta)) {
    for (const receptor of obi.get(tinta)) {
      receptor();
    }
  }
};
declanșezEv(evCnxCuReceptori, obiW);
// Sunt evenimentul prim
// Sunt evenimentul secund
```

Avantajul gestionării obiectelor cărora li se atașează evenimente prin `WeakMap`-uri este acela că în momentul în care se face o colectare a gunoiului pe obiect, se face automat și pe receptori (în limba engleză *listeners* sau *event handlers*).

Cheile unui `WeakMap` nu sunt enumerabile și nici nu putem afla câte chei sunt. În cazul lui `Map`, acest lucru este posibil. Spre deosebire de `Map`, pentru un `WeakMap` nu se poate determina dimensiunea.

## Ascunderea proprietăților unei clase

Uneori este nevoie să *ascundem* anumite părți ale unei clase pentru a nu fi accesibile și pentru acest lucru un `WeakMap` se pretează de minune. Să ne aducem aminte faptul că propritățile `static` ale claselor sunt totuși enumerabile și configurabile, ceea ce uneori nu ne dorim, mai ales când dorim protejarea anumitor date.

```javascript
const datePrivate = new WeakMap();
class Ceva {
  constructor (autor, titlu) {
    datePrivate.set(this, {autor: autor, titlu: titlu});
  }
  scotInfoAutor () {
    return datePrivate.get(this).autor;
  }
  scotInfoTitlu () {
    return datePrivate.get(this).titlu;
  }
};
const unCeva = new Ceva('Gib I. Mihăiescu', 'La Grandiflora');
unCeva.scotInfoAutor(); // "Gib I. Mihăiescu"
unCeva.scotInfoTitlu(); // "La Grandiflora"
```

Această implementare permite o asociere a oricâtor obiecte vor fi generate în baza clasei `Ceva` cu datele private fiecărei instanțe. `WeakMap`-ul se comportă ca o tabelă secundară ce menține asocierile. În cazul în care un obiect instanțiat nu mai are nicio referință care să-l țină viu, acesta va fi *colectat la gunoi*, iar cheia din `WeakMap` va fi ștearsă.

Cazurile în care ai folosi o astfel de modelare a unei clase sunt legate de:

- unele obiecte care sunt instanțiate în baza clasei, au nevoie de un mecanism în care să stocheze obiecte tempoarare;
- unele obiecte poate instanțiază alte obiecte care vin din biblioteci externe, având o caracteristică temporară, dar care nu trebuie modificate.

Notă importantă: de îndată ce *câmpurile private* (**private fields**) vor fi parte a limbajului, o astfel de abordare trebuie abandonată din motive de performanță. Un `WeakMap` rămâne totuși un hashmap pe care se face o căutare (*lookup*). Acestea sunt disponibile deja în Node.js (12) și Chrome (74).

## Reimplementare cu o metodă clear

În cazurile în care ai nevoie să cureți direct obiectul `WeakMap`, poți augmenta precum în următoarea implementare exemplificată de Mozila MDN.

```javascript
class ClearableWeakMap {
  constructor(init) {
    this._wm = new WeakMap(init);
  }
  clear() {
    this._wm = new WeakMap();
  }
  delete(k) {
    return this._wm.delete(k);
  }
  get(k) {
    return this._wm.get(k);
  }
  has(k) {
    return this._wm.has(k);
  }
  set(k, v) {
    this._wm.set(k, v);
    return this;
  }
}
```

## Resurse

- [What are the actual uses of ES6 WeakMap?.stackoverflow.com](https://stackoverflow.com/questions/29413222/what-are-the-actual-uses-of-es6-weakmap)
- [ES6 Collections: Using Map, Set, WeakMap, WeakSet](https://www.sitepoint.com/es6-collections-map-set-weakmap-weakset/)
- [Dwayne Charrington. What Are Weakmaps In ES6?](https://ilikekillnerds.com/2015/02/what-are-weakmaps-in-es6/)
- [ECMAScript 6 — New Features: Overview & Comparison. Map/Set & WeakMap/WeakSet](http://es6-features.org/#WeakLinkDataStructures)
- [Inside V8: weak collections, ephemerons, and private fields by Sigurd Schneider | JSCAMP 2019](https://www.youtube.com/watch?v=MQsUiqVCJMc&fbclid=IwAR3ybYMW2jDnNTA39t9qVph6HELfbguoynnLP9FOSnsDw5tTVHZ43pjC1Z8)
- [Public and private class fields](https://v8.dev/features/class-fields)
- [WeakMap and WeakSet](https://javascript.info/weakmap-weakset)
- [Keyed collections | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections#weakmap_object)
- [WeakMap | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
