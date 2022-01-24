# WeakMap

Începând cu versiunea ES6 a standardului, au apărut obiecte dedicate realizării de colecții. Au apărut din necesitatea evitării diferitelor contrângeri impuse de obiectele obișnuite.

Este o colecție de perechi cheie-valoare care au o particularitate foarte utilă: toate cheile sunt obiecte spre deosebire de `Map`, unde pot fi și primitive. Nu sunt admise valori primitive, incluzând `Symbol`. `WeakMap` nu are o proprietate `length`.

De unde vine denumirea **weak**? În limba engleză *weak* înseamnă *slab*. În cazul obiectului nostru, această *slăbiciune* vine din faptul că, de îndată ce nu mai există vreo referință către obiectul care joacă rol de cheie, acesta fiind *colectat la gunoi*, nici `WeakMap`-ul nu va mai ține referința la acesta. Un `WeakMap` nu va menține o legătură la un obiect, dacă acest obiect a fost colectat la gunoi. Pentru a afla dacă un obiect există într-un `WeakMap`, mai întâi trebuie să ai o referință la acesta.

Amintește-ți că un obiect *trăiește* câtă vreme există o referință către acesta sau către una din proprietățile sale. Dacă am ține evidența unor obiecte folosind un `Map`, această structură ar ține o referință permanentă către obiectul ca proprietate a sa. Dacă nu mai este referit, va fi menținut în viață în continuare taxând resursele. Din necesitatea *colectarii la gunoi* a obiectelor care nu mai sunt referite, s-a născut această nouă structură pentru gestionarea obiectelor [efemere](https://en.wikipedia.org/wiki/Ephemeron).

În informatică, aceste date care au un caracter volatil sunt numite *ephemerons* - **efemeroni**. Aceste tipuri de date au caracteristica distinctă că semnalează mecanismul de colectare la gunoi atunci când un obiect nu mai are nicio referință.

În cazul în care nu mai există vreo referință către obiectul proprietate al unui `WeakMap`, sau respectivul obiect a fost setat la `undefined`, va fi *colectat la gunoi*.

În cazul în care valoarea membrului unui `WeakMap` este un obiect, acesta va fi colectat și el la gunoi.

Un `WeakMap` poate fi folosit pentru a extinde obiecte externe sau pentru a utiliza obiecte sigilate (*sealed*) cu beneficiul colectării la gunoi atunci când nu mai sunt utile.

`WeakMap`-ul este asemănător unui `Map` în sensul că are metode similare:

- `numeWeakMap.get(key)`,
- `numeWeakMap.set(key, value)`,
- `numeWeakMap.delete(key)`,
- `numeWeakMap.has(key)`.

Un `WeakMap` nu oferă suport pentru iterare prin metodele `keys()`, `values()`, `entries()`. Cheile unui `WeakMap` nu sunt enumerabile și nici nu putem afla câte chei sunt. În cazul lui `Map`, acest lucru este posibil. Spre deosebire de `Map`, pentru un `WeakMap` nu se poate determina dimensiunea.

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
let temporar = new WeakMap();
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

Urmând același principiu, poți merge mai departe folosind `WeakMap`-ul drept colecție de rezultate care au necesitat resurse considerabile pentru a fi computate. Mai concret, să presupunem că avem o intrare într-un `WeakMap` care este un obiect provenit dintr-o bibliotecă de cod. În cazul în care folosești metodele acestui obiect pentru a obține niște date, dar computația taxează resursele, cel mai bine ar fi ca aceste rezultate să fie cache-uite pentru a nu le mai calcula odată.

## Gestionarea obiectelor DOM

WeakMap-urile pot fi folosite și pentru a gestiona obiectele cărora le atașezi evenimente. Este cazul obiectelor DOM. Pentru a înțelege bine ceea ce se petrece, trebuie să-ți amintești mereu că o cheie a unui `WeakMap` este un obiect. Ai șters cheia?! Ai șters și valorile asociate acesteia. Aceasta este caracteristica „slabă” din denumirea obiectului intern `WeakMap`.

```javascript
const evCnxCuReceptori = new WeakMap();
function cnxCuReceptorul (obi, receptor) {
  // dacă cheia/obiectul nu există deja, creeaz-o!
  if(!evCnxCuReceptori.has(obi)){
    // valoarea este un Set pentru că unui obiect
    // i se pot atașa mai multe evenimente, care
    // sunt unice, deci fiecare fiind gestionabile de un Set
    evCnxCuReceptori.set(obi, new Set([receptor]));
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
  // obiectul cache (obi) în care sunt contorizate elementele (tinta) cu receptori
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

În cazul în care avem funcții cu rol de receptor care sunt atașate obiectelor din DOM, atunci când obiectul din DOM este șters, aceste funcții receptor rămân în memorie fiind legate de mediul de execuție al browserului, nepermițându-i acestuia să fie colectat la gunoi. Adu-ți mereu aminte că funcțiile tot obiecte sunt.

### Exemplu de manager de evenimente ale elementelor

Aceste manager este util pentru cazurile în care dorești un control mai bun asupra obiectelor din DOM cărora li se atașează evenimente. Scopul este de a crea o structură în baza unui `WeakMap` cu ajutorul căreia să ții o evidență a elementelor cu care lucrezi.

```javascript
/*
    <div id="container">
      <input type="button" id="a" value="A">
      <input type="button" id="b" value="B">
      <input type="button" id="c" value="C">
      <input type="button" id="dela" value="Delete A">
    </div>
*/

class EventedElementsMgmt {
    constructor () {
        this.elements = new WeakMap();
    }
    add (elem, eventname, listener) {
        let listeners = this.elements.get(elem); // încarcă cheia/obiectul element

        // inițializare cheie nouă în WeakMap dacă nu există
        if (listeners === undefined) {
            listeners = {}; // de ex: {click: Set[fnc1, fnc2]}
        }

        // accesează proprietatea cu numele evenimentului -> ref la Set
        let listenersSet4evt = listeners[eventname];

        // inițializarea primului eveniment cu listenerul său
        if (listenersSet4evt === undefined) {
            listenersSet4evt = new Set();
        }

        listenersSet4evt.add(listener); // ai grijă, că lucrezi pe ref!!!

        listeners[eventname] = listenersSet4evt; // actualizează cheia WeakMap-ului cu datele nou adăugate

        this.elements.set(elem, listeners); // actualizează valoarea cheii din `WeakMap`.
    }
    remove (elem, eventname, listener) {
        let listeners = this.elements.get(elem); // încarcă cheia/obiectul element
        if (!listeners) return false;
        // accesează proprietatea cu numele evenimentului -> ref la Set
        let listenersSet4evt = listeners[eventname]; // este Set-ul cu toți receptorii asociați unui eveniment

        // verifică dacă există un Set asociat tipului de eveniment.
        if (!listenersSet4evt) {
            return false;
        } else if (listenersSet4evt.delete(listener)) {
            // dacă ștergerea a returnat `true`, returnează `true`
            return true;
        }
    }

    /**
     * Metoda declanșează execuția tuturor funcțiilor receptor pentru un tip de eveniment
     * @param {Object} evt
     * @returns {Boolean} `false` în cazul în care nu există funcțiie receptor
     */
    fire (evt) {
        // console.log(this.elements.has(evt.currentTarget));
        let elem = evt.currentTarget, eventname = evt.type; //srcElement
        // console.log("dE LUCRU ", elem, eventname);
        let listeners = this.elements.get(elem); // încarcă cheia/obiectul element
        if (!listeners) return false;
        // accesează proprietatea cu numele evenimentului -> ref la `Set`
        let listenersSet4evt = listeners[eventname];
        if (!listenersSet4evt) return false;
        let listener;
        for (listener of listenersSet4evt) {
            setTimeout(listener, 0, evt); // execuția trebuie să fie asincronă.
        }
    }
}

const EVTM = new EventedElementsMgmt();

let container = document.querySelector('#container');


EVTM.add(document.querySelector('#a'), 'click', (evt) => {
  // codul listener-ului
  console.log(EVTM);
});

document.querySelector('#a').addEventListener('click', (evt) => {
  EVTM.fire(evt);
});

// Ștergerea unui element
let dela = document.querySelector('#dela');

EVTM.add(dela, 'click', () => {
  document.querySelector('#a').parentNode.removeChild(document.querySelector('#a'));
});

dela.addEventListener('click', (evt) => {
  EVTM.fire(evt);
});
```

Observă faptul că pentru posibilele elemente pe care la un moment dat le vei elimina, referința este construită dinamic (`document.querySelector('#a')`) fără legarea acesteia la vreun identificator. Astfel, referința va fi cheie în `WeakMap` și numai acolo. Acest lucru permite colectarea la gunoi de îndată ce ștergi elementul.

## Ascunderea proprietăților unei clase

Uneori este nevoie să *ascundem* datele gestionate folosind o clasă pentru a nu fi accesibile. Pentru acest lucru un `WeakMap` se pretează de minune. Să ne aducem aminte faptul că proprietățile `static` ale claselor sunt totuși enumerabile și configurabile, ceea ce uneori nu ne dorim, mai ales când dorim protejarea anumitor date.

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

- unele obiecte care sunt instanțiate în baza clasei, au nevoie de un mecanism în care să stocheze obiecte temporare;
- poate că unele obiecte instanțiază alte obiecte care vin din biblioteci externe, având o caracteristică temporară, dar care nu trebuie modificate.

Notă importantă: de îndată ce *câmpurile private* (**private fields**) vor fi parte a limbajului, o astfel de abordare trebuie abandonată din motive de performanță. Un `WeakMap` rămâne totuși un hashmap pe care se face o căutare (*lookup*). Acestea sunt disponibile deja în Node.js (12) și Chrome (74).

## Stocarea de obiecte cu metadate asociate

Poți să-ți imaginezi că este necesar să asociezi anumite date necesare unor obiecte pe care dorești să le creezi și să le administrezi până când nu mai este nevoie de ele. În acel moment ți-ai dori să fie colectate la gunoi pentru a cruța resursele.

```javascript
const FabricaDeObiecte = {
  metadate: new WeakMap(),
  creeazăObiect(){
    let obi = {};
    this.metadate.set(obi, {id: crypto.randomUUID()});
    return obi;
  },
  getMetadate(obi){
    return this.metadate.get(obi);
  }
}

let unObiect = FabricaDeObiecte.creeazăObiect();
console.log(FabricaDeObiecte.getMetadate(unObiect)); // {id: 'f65b4948-8637-4a42-896a-45835a93066f'}
// șterge obiectul
unObiect = undefined;
```

O altă posibilă utilitate ar fi de asociere a unor metadate suplimentare obiectelor DOM. De exemplu, pentru elemente `img`, ai putea să le asociezi structuri de date descriptive necesare utilizării pe toată durata de viață a obiectului respectiv.

## Utilizarea de obiecte externe

În momentul în care lucrezi cu API-uri, la accesarea acestuia vei avea la îndemână o referință.

```javascript
const ObiectDeLucru = InstanțiereObiectDinBibliotecaDeCod();
```

Apoi scrii o metodă pentru care dorești să ții un contor care să reprezinte de câte ori a fost apelată.

```javascript
function deCateOriApelez (ObiectDeLucru) {
  deExecutatInContextulObiectului(ObiectDeLucru); // execuția acestei metode e ținta unei contorizări.
};
```

Implementarea folosind `WeakMap`.

```javascript
let wm = new WeakMap();
function deCateOriApelez (ObiectDeLucru) {
  deExecutatInContextulObiectului(ObiectDeLucru);
  let numarApelari = wm.get(ObiectDeLucru) || 0;
  numarApelari++;
  if (numarApelari > 25) reactioneaza();
  wm.set(ObiectDeLucru, numarApelari);
};
```

## Reimplementare cu o metodă clear

În cazurile în care ai nevoie să cureți direct însuși obiectul `WeakMap`, poți augmenta precum în următoarea implementare exemplificată de Mozila MDN.

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
- [WeakMap and WeakSet | javascript.info](https://javascript.info/weakmap-weakset)
- [Keyed collections | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections#weakmap_object)
- [WeakMap | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [WeakMaps: Illustrated | javascript.plainenglish.io](https://javascript.plainenglish.io/weakmaps-illustrated-8169ce4764bb)
- [Weak references and finalizers | Published 09 July 2019 · Updated 19 June 2020](https://v8.dev/features/weak-references)
- [Create a Event System Using ES6 WeakMap | 12/7/2017 | YIOU CHEN](https://yiou.me/blog/posts/weakmap-event-system)
- [WeakMaps: Illustrated | Joo Hom | Aug 3, 2020](https://javascript.plainenglish.io/weakmaps-illustrated-8169ce4764bb)
- [How to detect if an object has been garbage collected in Javascript | Steve Hanov](http://stevehanov.ca/blog/?id=148)
