# Obiectul intern Reflect

Acest obiect intern introdus de curând oferă metode utile care simplifică lucrul cu metodele obiectelor în JavaScript. Acest obiect intern nu este un *obiect funcție* care să poată fi invocat direct sau care să fie folosit drept constructor pentru alte obiecte. Poți să-ți imaginezi `Reflect` ca pe un instrument de investigație și intervenție directă.

Cred că îți mai aduci aminte hărțile pe care le-am făcut la momentul în care explicam dualitatea obiect - funcție. Cu siguranță îți aduci bine aminte faptul că motorul JavaScript pune la bătaie o mulțime de *obiecte interne*, fiecare expunând propriile metode predefinite. Obiectul intern `Reflect` oferă o cale către aceste metodele acestora. Gândește-te la cazul în care un obiect are *tăiată* moștenirea, dar parcă ai avea nevoie de metodele pe care `Object` ți le pune la dispoziție prin prototipul său.

```javascript
var obi = Object.create(null); // un obiect cu moștenirea tăiată
```

Multe obiecte sunt construite înadins astfel. Nu ar fi supercool dacă am avea o cale directă către acele metode ale *obiectelor interne* despre care am vorbit de ne-am plictisit? Asta își propune să ofere `Reflect`: acces direct la utilitarele pe care altfel ar fi trebuit să le căutăm prin prototipul lui `Function` sau `Object`. Metodele pe care `Reflect` le pune la dispoziție sunt:

- `Reflect.apply()`
- `Reflect.construct()`
- `Reflect.get()`
- `Reflect.has()`
- `Reflect.ownKeys()`
- `Reflect.set()`
- `Reflect.setPrototypeOf()`
- `Reflect.defineProperty()`
- `Reflect.deleteProperty()`
- `Reflect.getOwnPropertyDescriptor()`
- `Reflect.getPrototypeOf()`
- `Reflect.isExtensible()`

## Reflect.apply(ținta, obiectulThis, listaArgumente)

Apelează o anumită funcție (să-i spunem țintă) cu un set de argumente. Pentru a reține mai ușor modul de lucru, ai putea spune așa: *aplică-mi funcția sau utilitarul cutare în obiectul context cutare, cu următoarele argumente pe care ți le dau*.

```javascript
var colectie = [1, 23, 43];
var celMaiMareFunct = Function.prototype.apply.call(Math.max, null, colectie);
var celMaiMareReflect = Reflect.apply(Math.max, null, colectie);
```

Anterior, în ES5, ai fi folosit `Function.prototype.apply()`. Este ușor de observat că varianta de utilizare cu `Reflect` reduce verbozitatea. Mai există o diferență legată de momentul execuției funcției. În cazul metodei `Function`, dacă lista argumentelor este `null` sau `undefined`, funcția va fi aplicată fără argumente. În cazul `Reflect.apply` un astfel de scenariu nu este posibil, fiind indicată o stare de eroare.

```javascript
function f () {
  return arguments.length;
}
f.apply(void 0, null);          // returnează 0
Reflect.apply(f, void 0, null); // Uncaught TypeError: CreateListFromArrayLike called on non-object
```

O altă diferență este faptul că în cazul lui `Function.prototype.apply`, te aștepți ca funcția pe care o aplici să moșteneasâ de la `Function.prototype` și astfel să aibă metoda `nume_funcție.apply`. Dar sunt cazuri în care acest lucru nu se întâmplă așa cum este cazul următor.

```javascript
let unObiect = document.createElement('object');
typeof unObiect; // returnează 'function'
// dar nu are metoda `apply` pentru că nu moștenește de la `Function.prototype`
unObiect.apply; // 'undefined'
// În schimb, `Reflect` nu are nicio problemă
Reflect.apply(unObiect, this_ul, lista_args); // totul OK!
```

Totuși, chiar și în acest caz poți folos o combinație de `call` cu `apply` și va funcționa: `Function.prototype.apply.call`. Câștigul este legat de simplitate.

## Reflect.construct(funcțiaTintă, listaArgumentelor)

Este echivalentul folosirii operatorului `new`, dar numai că vom folosi această funcție, acest utilitar. Pentru a reține mai ușor, ai putea spune: *invocă-mi funcția menționată ca prim argument ca pe un constructor și pasează-i argumentele menționate la al doilea argument*.

```javascript
var obi1 = new Ceva(colectieDeArgs);
var obi2 = Reflect.construct(Ceva, colectieDeArgs);
var exemplu = Reflect.construct(Date, [2004,10,9]);
// Date 2004-11-08T22:00:00.000Z
```

Dacă menționezi un al treilea parametru, acesta va fi un alt constructor, la care se va face legătura la prototip. Este ceea ce se înțelege prin sub-clasare.

```javascript
function UnConstructor () {};
function ConstructorExotic () {};
var obiectNou = Reflect.construct(UnConstructor, [], ConstructorExotic);
Reflect.getPrototypeOf(obiectNou);
```

## Reflect.defineProperty(obiectulȚintă, numeleProprietății, atributeleProprietății)

De această dată, metoda va returna o valoare `Boolean`, care indică dacă s-a modificat obiectul țintit sau nu. Îți poți imagina această metodă ca pe un instrument foarte precis și elegant pentru a aduce modificări unui obiect deja existent. Poți adăuga sau modifica proprietăți existente deja.

```javascript
var obi = {a: true};
Reflect.defineProperty(obi, 'b', {value: false}); // true
```

Care-i avantajul asupra clasicului `Object.defineProperty()`? Faptul că ai un răspuns imediat privind rezultatul modificării. Poți testa direct pentru `true` sau `false`, fără să fii nevoit să împachetezi într-un `try...catch` pentru a vedea dacă au apărut erori.

```javascript
try {
  Object.defineProperty(obi, 'b', {value: false});
} catch (e) {
  // dacă a apărut o eroare, trateaz-o aici!
}
```

## Reflect.deleteProperty(obiectȚintă, cheiaProprietății)

Este echivalentul folosirii operatorului `delete` pe care-l știm deja. Returnează un `Boolean` care indică dacă ștergerea proprietății a fost cu succes sau nu.

```javascript
var obi = {a: 19, b: true};
Reflect.deleteProperty(obi, 'b'); // true
```

## Reflect.get(obiectulȚintă, numeProprietate, obiectulThis)

Această metodă va returna valoarea existentă pentru o anumită proprietate a unui obiect.

```javascript
var obi = {a: 10, b: true};
Reflect.get(obi, 'b'); // true
// Merge și pe array-uri
Reflect.get([1,34,23], 2);
// returnează valoarea indexului 2
```

## Reflect.getOwnPropertyDescriptor(obiectȚintă, numeProprietate)

Această metodă este similară cu `Object.getOwnPropertyDescriptor()`. Returnează un obiect descriptiv pentru o anumită proprietate, dacă acea proprietate există. În caz contrar, va fi returnat `undefined`.

```javascript
var obi = {a: 10, b: true};
Reflect.getOwnPropertyDescriptor(obi, 'b');
// Object { value: true, writable: true, enumerable: true, configurable: true }
Reflect.getOwnPropertyDescriptor([1,3], 1);
// Object { value: 3, writable: true, enumerable: true, configurable: true }
```

## Reflect.getPrototypeOf(obiectulȚintă)

Această metodă returnează prototipul pentru un obiect specificat.

```javascript
var obi = {x: 'ceva', y: {a: true}};
Reflect.getPrototypeOf(obi);
```

## Reflect.has(obiectulȚintă, numeProprietate)

Returnează o valoare Boolean prin care afli dacă proprietate există sau nu. Poți să-i asemuiești funcționalitatea cu cea a operatorului `in` (`proprietate in obj`).

```javascript
Reflect.has({a: 0}, 'a'); // true
```

## Reflect.isExtensible(obiectȚintă)

Folosind această metodă, vei afla dacă un obiect poate fi extins sau nu. Returnează o valoare Boolean. Este același comportament ca în cazul lui `Object.isExtensible()`.

## Reflect.ownKeys(obiectulȚintă)

Metoda returnează un array cu toate cheile care aparțin strict obiectului pentru care se face extragerea acestora.

```javascript
var obi = {a: 10, b: true};
Reflect.ownKeys(obi);
// Array [ "a", "b" ]
Reflect.ownKeys([]); // ["length"]
```

Pentru o bună raportare la metoda corespondentă a lui `Object`, vezi `Object.getOwnPropertyNames`.

## Reflect.preventExtensions(obiectulȚintă)

Este o metodă prin care se blochează posibilitatea de a mai extinde un obiect. Această metodă este similară lui `Object.preventExtensions`. Metoda returnează o valoare `Boolean`, care indică dacă s-a reușit blocarea sau nu.

## Reflect.set(obiectulȚintă, numeProprietate, valoarea, obiectulThis)

Această metodă permite setarea unei proprietăți într-un obiect. Returnează o valoare Boolean, care indică dacă adăugarea proprietății s-a făcut sau a eșuat.

```javascript
var obi = {};
Reflect.set(obi, 'a', true);
```

Poți folosi metoda și în cazul array-urilor.

```javascript
var colectie = ['ceva', 'altceva', 'ura'];
Reflect.set(colectie, 1, 'paf');
```

Poți modifica valoarea proprietății `length` a unui array și astfel vei reuși o trunchiere a acestuia.

```javascript
var colectie = ['ceva', 'altceva', 'ura'];
Reflect.set(colectie, 'length', 1); // [ "ceva" ]
```

## Reflect.setPrototypeOf(obiectȚintă, obiectulCaPrototipNou)

Această metodă poate modifica obiectul prototip pentru un obiect și este echivalentul lui `Object.setPrototypeOf()`. Apelarea metodei va returna un Boolean ce indică setarea cu succes sau eșecul operațiunii.

Unul din avantajele utilizării `Reflect` este siguranța că nu folosești versiuni modificate ale algoritmilor originali. Există cod care modifică metodele originale, iar `Reflect` este singura metodă pentru a te asigura că folosești algoritmii curați.

## Resurse

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
- https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-2-reflect/
- [What is Metaprogramming in JavaScript? In English, please.](https://www.freecodecamp.org/news/what-is-metaprogramming-in-javascript-in-english-please/)
- [Is there any benefit to call Reflect.apply() over Function.prototype.apply() in ECMAScript 2015? | stack overflow](https://stackoverflow.com/questions/34707306/is-there-any-benefit-to-call-reflect-apply-over-function-prototype-apply-in)
