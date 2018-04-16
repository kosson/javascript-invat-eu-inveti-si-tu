# Enunțul `for..of`

ES6 a introdus această nouă structură de iterare împreună cu două concepte importante: **iterable** și **iterator**. Intenția a fost de a oferi un instrument superior celor oferite de ES5 deja: `for..in` și `forEach`.

Poți folosi enunțul `for..of` dacă nu ai nevoie să lucrezi și cu indexurile elementelor componente ale colecției. Dacă ai nevoie de accesarea după index a unui element, vei folosi un clasic `for`.

## Mică anatomie

Este numit de standard un **enunț de iterare**.

Formele canonice ale enunțurilor `for..of` sunt:

-   `for ( expresieManaStângă of expresieDeAtribuire ) enunț`,
-   `for ( var expresieLegatăDeIndentificator of expresieDeAtribuire ) enunț`,
-   `for ( declarațieDeExpresie of expresieDeAtribuire ) enunț`.

`DeclarațiaDeExpresie` poate fi un `let` sau un `const`.

Forma canonică a enunțului este: `for ( expresieManaStângă of expresieDeAtribuire ) enunț`.

Ce se întâmplă atunci când se face o iterare este invocarea unei metode interne pe care orice obiect iterabil o are: `obiectIterabil[Symbol.iterator]()`. Această metodă returnează un obiect din care se vor accesa valorile. Dacă ești curios cum funcționează, poți face același lucru.

```javascript
const colecție = ['ceva', 'altceva', 'undeva'];
const iterator = colecție[Symbol.iterator]();
iterator.next(); // Object { value: "ceva", done: false }
iterator.next(); // Object { value: "altceva", done: false }
iterator.next(); // Object { value: "undeva", done: false }
iterator.next(); // Object { value: undefined, done: true }
```

## Lucru cu for..of

Ori de câte ori un obiect trebuie să fie iterat, metoda `@@iterator` este apelată fără argumente. Apelarea metodei se va solda cu returnarea unui obiect iterator. Acesta va fi folosit pentru a obține valorile.

Enunțul `for..of` poate parcurge și extrage valori din următoarele obiecte care respectă **protocolul iterator**:

-   `Array`
-   `Map`
-   `Set`
-   `String`
-   `TypedArray`
-   `arguments`

Dacă în cazul lui `for` era nevoie să introduci expresiile opționale în blocul de inițializare, în cazul utilizării enunțului `for..of` lucrurile stau ceva mai simplu atunci când dorești parcurgerea unui array.

```javascript
var colectie = [1, true, null, 'ceva'];
for (let elemetn of colectie) {
  console.log(element);
};
```

Domeniul de aplicativitate pentru care a apărut acest nou enunț este acela al obiectelor „iterable”, iar cel mai des folosite sunt `Array`, `Map` și `Set`.

În iterările cu `for..of`, cel mai potrivit ar fi să declari variabila de lucru pentru element cu `let` pentru a avea acces la valorile de etapă în iterare. Declararea cu `var` ar suprascrie valoarea identificatorului respectând comportamentele de vază a unei variabile declarate cu `var`.

Cu `for..of` poți parcurge și valorile de tip șir.

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

Te vei întreba de ce să folosești `for..of` dacă ai deja la îndemână `for..in`? Răspunsul e vizibil în cazul enunțului `for..in`, unde sunt luate în considerare toate proprietățile care au atributul `enumerable` activat.

### Iterarea obiectelor

Obiectele care nu au implementare protocolul iterable nu pot fi parcurse cu bucle `for..of`. Pentru a exemplifica, vom lucra cu un obiect comun.

```javascript
let obi = {
  a: 10,
  b: 'ceva'
};
for (let elem of obi) {
  console.log(elem);
}
```

O astfel de încercare se va solda cu o eroare: `TypeError: obi is not iterable`. Ce-i de făcut? Cum am putea parcurge totuși o astfel de structură?

```javascript
for(let [cheie, valoare] of Object.entries(obi)){
  console.log(cheie, valoare);
};
// a 10
// b ceva
```

După cum se observă am folosit **destructurarea** pentru a face declararea variabilelor. Fii foarte atent căci metodele vor fi reduse la `null` prin acțiunea lui `Object.entries(obi)`. Pentru că ești un om curios, te invit să faci un salt la destructurare pentru a citi măcar partea introductivă. Pe lângă destructurare ar trebui să mai faci un salt la obiectul intern `Object`, metoda `entries`.
