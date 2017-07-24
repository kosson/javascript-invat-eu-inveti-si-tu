# `Array.from()`

Este o metodă introdusă de versiunea standardului ECMAScript 2015 și creează o instanță `new Array` din orice obiect care arată ca un array sau care este iterabil. Obiectele din care se creează array-urile trebuie să aibe o lungime și elementele să fie indexate. Obiectul `arguments` are deja implementat protocolul de iterare și poate fi exploatat cu `Array.from()`.

## Aplicarea pe `arguments`

Această metodă este un ajutor foarte util în lucrul cu obiectul asemănător unui array care este `arguments`. Înainte de această actualizare a standardului singura metodă de a transforma argumentele într-un array era aplicarea funcției slice astfel: `[].slice.call(arguments)`.

```javascript
function transforma(){
  return [].slice.call(arguments);
};
```

Acum avem o viață mult mai ușoară, dar am prezentat metoda „veche” pentru că este posibil să o întâlniți destul de des în codul scris anterior și pe care este nevoie să-l înțelegeți.

```javascript
function sparge() {
  return Array.from(arguments);
};
sparge(1, 2, 3); // [1, 2, 3]
```

## Congruiență cu operatorul spread

Un operator nou introdus de ECMAScript 2015 care face același lucru. Este vorba despre operatorul spread. Acest operator folosește protocolul de iterare ceea ce înseamnă că obiectele pe care dorim să le transformăm, trebuie să aibe implementat @@iterator prin intermediul lui `Symbol.iterator`. `arguments` are deja implementat protocolul de iterare în ECMAScript 2015. ATENȚIE! Operatorul spread se bazează pe existența implementării protocolului de iterare, pe când `Array.from()`, nu se bazează doar pe acesta. Această metodă are capacitatea de a procesa și structuri de date „array-like”.


```javascript
function transforma(){
  return [...arguments];
};
transforma("unu","doi",3); // Array [ "unu", "doi", 3 ]
```

## Aplicarea pe șirurile de caractere.

```javascript
Array.from("foo");
// ["f", "o", "o"]
```

# Constituirea unei colecții de elemente DOM

Acest lucru este posibil pentru că `NodeList` permite protocolul de iterare. Efectul este convertirea unui `NodeList` într-un Array.

```javascript
var divuri = Array.from(document.querySelectorAll('div'));

// ca alternativă folosim operatorul spread
function colectDivs(){
  return [...document.querySelectorAll('div')];
};

// sau:
var divuri = [...document.querySelectorAll('div')];
```

## Nu poți aplica `slice` pe array-ul rezultat

Cu `Array.from()` nu se poate face `slice()`, dar poți să indici ce sunt părțile.

```javascript
function ceEste(){
  return Array.from(arguments, valoare => typeof valoare);
};
ceEste("ceva", null, true, undefined, NaN, 23);
```

Polyfill-ul pentru ES5 arată astfel:

```javascript
function transforma (){
  return Array.prototype.slice.call(arguments);
}
transforma('a', 'b'); // <- ['a', 'b']
```

## Mapping pe fiecare element

`Array.from()` poate avea trei argumente:

- obiectul iterabil pe care vrei să-l transformi
- o funcție de mapping, care să fie apelată pentru fiecare dintre elementele din input
- `this` necesar la apelarea funcției de mapare.
