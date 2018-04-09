# WeakMap

Începând cu versiunea ES6 a standardului, au apărut obiecte dedicate colecțiilor de date. Au apărut din necesitatea evitării diferitelor contrângeri aplicate obiectelor obișnuite pentru a le adapta necesităților de gestiune a datelor.

Este o colecție de perechi cheie/valoare care au o particularitate foarte utilă: toate cheile sunt obiecte. Nu sunt admise valori primitive. WeakMap-ul este asemănător unui `Map` în sensul că are metode similare.

De unde vine denumirea **weak**? În limba engleză *weak* înseamnă slab. În cazul obiectului nostru, această *slăbiciune* vine din faptul că de îndată ce nu mai este nevoie de obiectul care joacă rol de cheie, acesta va putea fi colectat la gunoi, ceea ce este echivalentul unei ștergeri din structura internă a obiectului însuși. Vă mai aduceți aminte de faptul că un obiect *trăiește* câtă vreme există o referință către acesta sau către una din proprietățile sale. Dacă am ține evidența unor obiecte folosind un `Map`, această structură ar ține o referință permanentă către un obiect, dacă acel obiect a devenit o proprietate a sa. Tocmai din necesitatea de a fi permisă colectarea la gunoi a obiectelor care nu mai sunt referențiate în altă parte, s-a născut această nouă structură de gestiune special pentru obiecte.
Putem trage concluzia că vom folosi `WeakMap`-uri pentru a gestiona obiecte asupra cărora nu ai niciun control sau nu dorești acest lucru. Concluzia conduce către posibilele aplicații pentru un `WeakMap`.

## Cache de obiecte

Să ne gândim că în urma unor evaluări obținem niște rezultate pe care dorim să le accesăm dintr-o zonă intermediară unde stau gata de lucru fără să le mai generăm o dată - un cache de date.

```javascript
const tamponDate = new WeakMap();
function serveșteObiecte (obiect) {
  if(tamponDate.has(obiect)){
    console.log('obiectul este deja în tampon');
    return tamponDate.get(obiect);
  }else{
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

function declanșezEv (obi, tinta) {
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

Avantajul gestionării obiectelor cărora li se atașează evenimente prin `WeakMap`-uri este acela că în momentul în care se face o colectare a gunoiului pe obiect, se face automat și pe receptori (în limba engleză *listners* sau *event handlers*).

Cheile unui `WeakMap` nu sunt enumerabile și nici nu putem afla câte chei sunt. În cazul lui Map, acest lucru este posibil. Spre deosebire de `Map`, pentru un `WeakMap` nu se poate determina dimensiunea.

## Ascunderea proprietăților unei clase

Uneori este nevoie să ascundem anumite părți ale unei clase și pentru acest lucru un WeakMap se pretează de minune.

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

## Metode WeakMap

### WeakMap.prototype.delete(key)

Șterge o cheie din WeakMap.

```javascript
const obiW = new WeakMap();
const o1 = {a: 1, b: 2},
      o2 = {c: 3, d: 4};
obiW.set(o1, 1);
obiW.set(o2, 2);
obiW.get(o1); // 1
obiW.get(o2); // 2
obiW.delete(o1);
obiW.has(o1); // false
```

## Resurse

-   [What are the actual uses of ES6 WeakMap?.stackoverflow.com](https://stackoverflow.com/questions/29413222/what-are-the-actual-uses-of-es6-weakmap)
-   [ES6 Collections: Using Map, Set, WeakMap, WeakSet](https://www.sitepoint.com/es6-collections-map-set-weakmap-weakset/)
-   [Dwayne Charrington. What Are Weakmaps In ES6?](https://ilikekillnerds.com/2015/02/what-are-weakmaps-in-es6/)
-   [ECMAScript 6 — New Features: Overview & Comparison. Map/Set & WeakMap/WeakSet](http://es6-features.org/#WeakLinkDataStructures)
