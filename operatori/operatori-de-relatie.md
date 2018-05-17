# Operatorii de relație

Acești operatori investighează caracteristici importante ale obiectelor și returnează o valoare Boolean în funcție de rezultat.

## Operatorul in

Dacă ești la început și încă nu știi nimic despre obiecte, poți le percepi precum colecții de date care pot fi accesate prin sintaxa cu punct. Prin acest operator testezi dacă o valoare există într-un obiect. Încă nu am ajuns la obiecte, dar vom parcurge acești operatori pentru a-i avea tratați unitar. Poți reveni în momentul în care deslușind tainele obiectelor vei găsi exemple îi utilizează.

Revenind, în cazul array-urilor vorbim despre căutarea unui index cu valoarea specificată. Reține următoarea nuanță aici: căutăm dacă există indexul, nu căutăm valoarea asociată acestuia.

```javascript
2 in ['ceva', true, 3, 4]; // true
'length' in ['a', 1, true]; // true
```

Interesant este că și `length` va returna `true`. De ce? Pentru că este o proprietate a obiectului intern `Array` la care ți s-a oferit acces prin mecanismul moștenirii. Trebuie precizat că de îndată ce declari un array, valoarea acestuia este „învelită” în obiectul asociat, ceea ce are ca efect lucrul cu un obiect array, care moștenește toate proprietățile obiectului intern `Array`, printre acestea fiind și `length`. Da, acesta va testa dacă există și îl va detecta pentru că, de fapt, a fost moștenit.

În cazul obiectelor declarate, folosirea lui `in` are sens pentru cazul în care cauți după numele cheii unei proprietăți.

```javascript
var obi = {a: 1, b: 2};
'b' in obi; // true
```

În cazul în care o proprietate este eliminată prin folosirea operatorului `delete`, operatorul returnează `false`, în rest orice valoare ar avea, chiar și `undefined`, am avea un răspuns `true`.

În momentul în care vei descoperi importanța simbolurilor, vei putea investiga dacă un anumit obiect are implementat protocolul de iterare. Operatorul `in` permite verificarea existenței unui simbol.

```javascript
let colectie = ['1', 1, true];
Symbol.iterator in colectie; // true
```

Mai devreme menționam faptul că investigarea unui obiect folosind acest operator, va merge pe lanțul prototipal pentru a căuta proprietăți. De exemplu, metoda `toSource()` este moștenită de la obiectul intern `Object`, ceea ce va conduce la returnarea valorii true, dacă va fi căutată.

## Operatorul instanceof

Acest operator testează dacă în lanțul prototipal al unui obiect se află proprietatea `prototype` a unui constructor. Începând cu ECMAScript 6, operatorul `instanceof` este o prescurtare care apelează metoda `hasInstance` a constructorului `Symbol`. Toate funcțiile au o metodă `Symbol.hasInstance` cu ajutorul căreia se poate verifica dacă un anume obiect este sau nu o instanță a acelei funcții.

```javascript
function EX () {};
var obiX = new EX();

Object.getPrototypeOf(obiX); // prototype este Object
console.log(EX.prototype); // prototype este tot Object

Object.getPrototypeOf(obiX) === EX.prototype; // true

obiX instanceof EX;     // true
obiX instanceof Object; // true

EX.prototype instanceof Object; // true
EX.prototype; // răspunde cu Object, dar, atenție, nu este Object.prototype
EX.prototype instanceof Object.prototype; // false
```

Dacă este nevoie poți seta proprietatea `prototype` la un obiect diferit de cel implicit care este `Object` ce conține doar constructorul.

```javascript
EX.prototype = {};
```

Adu-ți mereu aminte că prototipul unui obiect se mai poate seta și cu `Object.setPrototypeOf(obiectul)`.

## Mantre

-   Un obiect literal are prototype `undefined`. Cu toate acestea la interogare cu instanceof trimite la Object.
-   `instanceof` este o prescurtare care apelează metoda `hasInstance` a constructorului `Symbol`.
