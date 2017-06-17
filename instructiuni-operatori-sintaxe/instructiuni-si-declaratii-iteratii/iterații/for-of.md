# `for...of`

ES6 a introdus această nouă structură de iterare împreună cu două concepte importante: iterable și iterator.
Intenția a fost de a oferi un instrument superior de ciclare, superior celor oferite de ES5: `for...in` și `for...each`.

Ori de câte ori un obiect trebuie să fie iterat, metoda `@@iterator` este apelată fără argumente.
Iteratorul care este returnat este folosit pentru a obține valorile care trebuie iterate.

`for...of` poate parcurge și extrage valori din următoarele obiecte care respectă ***protocolul iterator***:
- Array
- Map
- Set
- String
- TypedArray
- arguments

```javascript
var colectie = [1, true, null, 'ceva'];
for (let i of colectie) {
  console.log(i);
};
```

Este un operator folosit pentru cicla array-uri, dar cel mai bine se aplică pe obiecte „iterable” precum `Array`, `Map`, `Set`.

```javascript
for (var x of arr){
  // x va primi o valoarea
  // fiecărui element parcurs
};
```

Cel mai potrivit ar fi să folosești `let` în ciclările cu `for...of` pentru că la fiecare iterare se va crea câte o variabilă nouă care stabilește o nouă legătură la valoarea din pasul respectiv al iterației.

Cu `for...of` poți parcurge chiar șirurile.

```javascript
for (let z of 'ceva') {
  console.log(z);
}; // c e v a
```

Începând cu ES6, se pot itera și fragmente constituite din `code-point`-uri UTF:

```javascript
for (let x of '\u{13165}\u{13189}\u{13197}'){
  console.log(x); // 𓅥 𓆉 𓆗
};
```

Te vei întreba de ce să folosești `for...of` dacă ai deja la îndemână `for...in`?
Construcția `for...in` ia în considerare toate proprietățile care au atributul `enumerable` activat. 
