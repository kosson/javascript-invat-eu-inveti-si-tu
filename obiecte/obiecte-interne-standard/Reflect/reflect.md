# Obiectul intern Reflect

Este un obiect intern introdus de curând de noua versiune a standardului.

Oferă metode utile operațiunilor supuse interceptării în JavaScript. Acest obiect nu este un obiect funcție care să poată fi invocat direct sau care să fie folosit drept constructor pentru alte obiecte.
Poți să-ți imaginezi Reflect ca pe un instrument de investigare a diferitelor „lucruri” în JavaScript.

Cred că îți mai aduci aminte hărțile pe care le-am făcut la momentul în care explicam dualitatea obiect - funcție. Cu siguranță îți aduci bine aminte faptul că motorul JavaScript pune la bătaie o mulțime de „metode interne” care acționează ori de câte ori folosim câte-o metodă predefinită a vreunui obiect JavaScript.

Reflect oferă o cale către aceste metode „de adâncime” ale motorului JavaScript. Gândește-te la cazul util în care un obiect are „tăiată” moștenirea, dar parcă ai avea nevoie de metodele pe care `Object` ți le pune la dispoziție în prototipul său.

```javascript
var obi = Object.create(null); // un obiect cu moștenirea tăiată
```

Multe obiecte sunt construite înadins astfel.

Nu ar fi supercool dacă am avea o cale directă către utilitarele motorului JavaScript, chiar la acele „metode interne” despre care am vorbit de ne-am plictisit?

Asta își propune să ofere `Reflect`: acces direct la utilitare superutile, pe care altfel ar fi trebuit să le căutăm prin prototipul lui `Function` sau `Object`.

Hai să le vedem.

## Reflect.apply(ținta, obiectulThis, listaArgumente)

Apelează o anumită funcție (să-i spunem țintă) cu un set de argumente. Pentru a reține mai ușor modul de lucru, ai putea spune așa: Aplică-mi funcția sau utilitarul cutare în obiectul context cutare, aplicând-o pe următoarele argumente pe care ți le dau.

```javascript
var colectie = [1, 23, 43];
var celMaiMareFunct = Function.prototype.apply.call(Math.max, null, colectie);
var celMaiMareReflect = Reflect.apply(Math.max, null, colectie);
```

Anterior, în ES5, ai fi folosit `Function.prototype.apply()`. Este ușor de observat că varianta de utilizare cu Reflect reduce verbozitatea.

## Reflect.construct(funcțiaTintă, listaArgumentelor)

Este echivalentul folosirii operatorului `new`, dar numai că vom folosi această funcție, acest utilitar. Pentru a reține mai ușor, ai putea spune: Invocă-mi funcția menționată ca prim argument ca pe un constructor și pasează-i argumentele menționate la al doilea argument.

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

De această dată, metoda va returna o valoare Boolean, care indică dacă s-a modificat obiectul țintit sau nu. Îți poți imagina această metodă ca pe un instrument foarte precis și elegant pentru a aduce modificări unui obiect deja existent. Poți adăuga sau modifica proprietăți existente deja.

```javascript
var obi = {a: true};
Reflect.defineProperty(obi, 'b', {value: false}); // true
```

Care-i aventajul asupra clasicului `Object.defineProperty`? Faptul că ai un răspuns imediat privind rezultatul modificării. Poți testa direct pentru true sau false, fără să fii nevoit să împachetezi într-un `try..catch` pentru a vedea dacă au apărut erori.

## Reflect.deleteProperty(obiectȚintă, cheiaProprietății)

Este echivalentul folosirii operatorului `delete` pe care-l știm deja. Returnează un Boolean care indică dacă ștergerea proprietății a fost cu succes sau contrariul.

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

Returnează o valoare Boolean prin care afli dacă proprietate există sau nu. Poți să-i asemuiești funcționalitatea cu cea a operatorului `in`.

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

## Reflect.preventExtensions(obiectulȚintă)

Este o metodă prin care se blochează posibilitatea de a mai extinde un obiect. Această metodă este similară lui `Object.preventExtensions`. Metoda returnează o valaore Boolean, care indică faptul că s-a reușit blocarea sau nu.

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

Această metodă poate modifica obiectul prototip pentru un obiect și este echivalentul lui `Object.setPrototypeOf()`. Apelarea metodei va returna un Boolean ce indică setara cu succes sau eșecul operațiunii.

Unul din avantajele utilizării `Reflect` este siguranța că nu folosești versiuni modificate ale algoritmilor originali. Există cod care modifică metodele originale, iar Reflect este singura metodă pentru a te asigura că folosești algoritmii curați.

## Referințe

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-2-reflect/
