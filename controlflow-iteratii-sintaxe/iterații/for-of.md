# Enunțul for...of

ES6 a introdus această nouă structură de iterare împreună cu două concepte importante: **iterable** și **iterator**. Intenția a fost de a oferi un instrument superior celor oferite de ES5 deja: `for...in` și `forEach`. De fapt, intenția este să avem un instrument universal de iterare a unor structuri de date.

Poți folosi enunțul `for...of` dacă nu ai nevoie să lucrezi și cu indexurile elementelor componente ale colecției. Dacă ai nevoie de accesarea după index a unui element, vei folosi un clasic `for`.

## Mică anatomie

Este numit de standard un **enunț de iterare**.

Formele canonice ale enunțurilor `for...of` sunt:

-   `for ( expresieManaStângă of expresieDeAtribuire ) enunț`,
-   `for ( var expresieLegatăDeIndentificator of expresieDeAtribuire ) enunț`,
-   `for ( declarațieDeExpresie of expresieDeAtribuire ) enunț`.

`DeclarațiaDeExpresie` poate fi un `let` sau un `const`.

Forma canonică a enunțului este: `for ( expresieManaStângă of expresieDeAtribuire ) enunț`.

Când se face o iterare se invocă o metodă internă pe care orice obiect iterabil o are: `obiectIterabil[Symbol.iterator]()`. Această metodă returnează un obiect din care se vor accesa valorile. Dacă ești curios cum funcționează, poți face același lucru.

```javascript
const colecție = ['ceva', 'altceva', 'undeva'];
const iterator = colecție[Symbol.iterator]();
iterator.next(); // Object { value: "ceva", done: false }
iterator.next(); // Object { value: "altceva", done: false }
iterator.next(); // Object { value: "undeva", done: false }
iterator.next(); // Object { value: undefined, done: true }
```

Ceea ce putem face manual apelând metoda `next()` pe obiectul iterator, face `for...of` automat pentru noi. Structurile iterabile, la momentul în care sunt supuse unor prelucrări folosind `for...of` vor genera un obiect iterator, pe care îl vor parcurge. Și aici gândurile mele mă duc către funcțiile generator, care nu sunt nimic altceva decât un mecanism de creare de iteratori. Dacă ești curios, aruncă repede un ochi.

## Elemente practice

Ori de câte ori un obiect trebuie să fie iterat, metoda `@@iterator` este apelată fără argumente. Apelarea metodei se va solda cu returnarea unui obiect iterator. Acesta va fi folosit pentru a obține valorile.

Enunțul `for...of` poate parcurge și extrage valori din următoarele obiecte care respectă **protocolul iterator**: `Array`, `Map`, `Set`, `String`, `TypedArray` și `arguments`.

Dacă în cazul lui `for` era nevoie să introduci expresiile opționale în blocul de inițializare, în cazul utilizării enunțului `for...of` lucrurile stau ceva mai simplu atunci când dorești parcurgerea unui array.

```javascript
var colectie = [1, true, null, 'ceva'];
for (let element of colectie) {
  console.log(element);
};
```

Domeniul de aplicare pentru care a apărut acest nou enunț este cel al obiectelor *iterable*. Cel mai des folosite sunt `Array`, `Map` și `Set`.

În iterările cu `for...of`, cel mai potrivit ar fi să declari variabila de lucru pentru element cu `let` pentru a avea acces la valorile de etapă în iterare. Declararea cu `var` ar suprascrie valoarea identificatorului respectând comportamentele de bază a unei variabile declarate cu `var`.

Cu `for...of` poți parcurge și valorile de tip șir.

```javascript
for (let caracter of 'ceva') {
  console.log(caracter);
}; // c e v a
```

Începând cu ES6, se pot itera și fragmente constituite din `code-point`-uri UTF:

```javascript
for (let x of '\u{13165}\u{13189}\u{13197}'){
  console.log(x); // 𓅥 𓆉 𓆗
};
```

Te vei întreba de ce să folosești `for...of` dacă ai deja la îndemână `for...in`? Răspunsul e vizibil în cazul enunțului `for...in`, unde sunt luate în considerare toate proprietățile care au atributul `enumerable` activat.

### Iterarea obiectelor neiterabile

Obiectele care nu au implementare protocolul iterable nu pot fi parcurse cu bucle `for...of`. Acesta este și cazul obiectelor simple care au fost utilizate drept dicționare. Pentru a exemplifica, vom lucra cu un obiect comun.

```javascript
let obi = {
  a: 10,
  b: 'ceva'
};
for (let elem of obi) {
  console.log(elem);
}
```

O astfel de încercare se va solda cu o eroare: `TypeError: obi is not iterable`. Ce-i de făcut? Cum am putea parcurge totuși o astfel de structură? Ne vom folosi de destructurare și de capacitatea metodei `Object.entries(obiect))` de a genera array-uri de array-uri (în Python *tuples*), care vor putea fi iterate. Array-urile permit iterarea. Cu ajutorul destructurării (*destructuring assignment*), care este un mod de lucru specific pentru array-uri cu scopul de a obține valori din acestea și a le atribui unor variabile, vom obține perechi de variabile cu valorile fiecărui array generat de `Object.entries`.

```javascript
for(let [cheie, valoare] of Object.entries(obi)){
  console.log(cheie, valoare);
};
// a 10
// b ceva
```

La nevoie, poți destructura doar prima valoare a fiecărui array menționând `let [cheie]`, iar atunci când ai nevoie doar de valori, poți omite pe prima prin expresia `let [,valoare]`.

Fii foarte atent căci metodele vor fi reduse la `null` prin acțiunea lui `Object.entries(obi)`. Pentru că ești un om curios, te invit să faci un salt la destructurare pentru a citi măcar partea introductivă, apoi la obiectul `Array`, unde este tratată destructurarea acestora, dar și la `Object`. Pe lângă destructurare ar trebui să mai faci un salt la obiectul intern `Object`, unde să arunci un ochi la metoda `entries()`.

Folosind destructurarea într-un `for...of`, putem extrage informații rapid dintr-un set de date.

```javascript
const colecție = [
  {titlu: 'Amusements in Mathematics', autor: 'Dudeney, Henry Ernest', id: 'amusementsinmath16713gut'},
  {titlu: 'A History of Mathematics', autor: 'Florian, Cajori', id: 'historyofmathema001062mbp'},
  {titlu: 'The Absorbent Mind ', autor: 'Montessori, Maria', id: 'absorbentmind031961mbp'}
];
let titluri = [];
for ({titlu, autor} of colecție) titluri.push([titlu,autor])
console.log(titluri);
/*
[ [ 'Amusements in Mathematics', 'Dudeney, Henry Ernest' ],
  [ 'A History of Mathematics', 'Florian, Cajori' ],
  [ 'The Absorbent Mind ', 'Montessori, Maria' ] ]
 */
```

#### Cheile și a valorile obiectelor simple

Uneori ai nevoie să accesezi cheile obiectului pe care-l iterezi. Soluția vine prin folosirea metodei `Array.prototype.keys()`.

```javascript
const colecție = [1, 2, 3];
for (let idx of colecție.keys()) {
  console.log(idx);
}; // 0, 1, 2
```

Dar pentru a putea să te desprinzi complet de folosirea lui `for`, ai nevoie să folosești și valorile. Pentru a rezolva această problemă, vei putea apela la metoda `Array.prototype.entries()`.

```javascript
const colecție = [1, 2, 3];
for (let [idx, val] of colecție.entries()) {
  console.log(idx, val);
};
```
