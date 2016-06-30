# Array.from() - ECMAScript 2015

Creează o instanță ``new Array`` din orice obiect care arată ca un array sau care iterabil.
Obiectele din care se creează array-urile trebuie să aibe o lungime și elemente indexate.

```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);
// [1, 2, 3]

// String
Array.from("foo");
// ["f", "o", "o"]
```

`Array.from()` are trei argumente:

- obiectul iterabil pe care vrei să-l transformi
- o funcție de mapping, care să fie apelată pentru fiecare dintre elementele din input
- `this` necesar la apelarea funcției de mapare.

Cu Array.from() nu se poate face slice(), dar poți să indici ce sunt părțile: dice!

```js
function ceEste(){
  return Array.from(arguments, valoare => typeof valoare);
};
ceEste("ceva", null, true, undefined, NaN, 23);
```

Polyfill - ul pentru ES5 arată astfel:

```js
function transforma (){
  return Array.prototype.slice.call(arguments);
}
transforma('a', 'b'); // <- ['a', 'b']
```

###  [].slice.call(arguments)

iar forma și mai scurtă:

```js
function transforma(){
  return [].slice.call(arguments);
};
```

Un operator nou introdus de ECMAScript 2015 care face același lucru. Este vorba despre operatorul spread. Acest operator folosește protocolul de iterare ceea ce înseamnă că obiectele pe care dorim să le transformăm, trebuie să aibe implementat @@iterator prin intermediul lui Symbol.iterator. `arguments` are deja implementat protocolul de iterare în ECMAScript 2015.

```js
function transforma(){
  return [...arguments];
};
transforma("unu","doi",3); // Array [ "unu", "doi", 3 ]
```

ATENȚIE! Operatorul spread se bazează pe existența implementării protocolului de iterare, pe când `Array.from()`, nu se bazează doar pe acesta. Această metodă are capacitatea de a procesa și structuri de date „array-like”.

De exemplu, jQuery la momentul redactării acestui material, nu are implementat protocolul de iterare, dar produce o structură „array-like”:

```js
Array.from($('div')); // în unele cazuri: Array.from(jQuery('div'));
```
