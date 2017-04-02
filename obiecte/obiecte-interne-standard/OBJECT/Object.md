# Object

Creează un wrapper (ambalează, îmbracă) pentru un obiect. Parafrazând o zicală românească, am putea spune că în acest moment „haina face pe om”. Acest wrapper spune că lucrăm cu un obiect.

## Mantre

- Object este un constructor.
- Object creează un wrapper pentru o anumită valoare. Dacă valoarea este `null` sau `undefined`, Object va crea și returna un obiect gol.
- Dacă valoarea pasată nu este null sau undefined, Object va returna un obiect de tipul care corespunde valorii oferite.
- Dacă valoarea este deja un obiect, va fi returnată valoarea.
- Obiectul window are o metodă numită Object [ function Object() ]. Motorul Javascript construiește automat metoda Obiect în obiectul window (window.Object returnează function Object()).
- Toate obiectele în JavaScript descind din Object, își au originea în Object. Toate obiectele moștenesc metode și proprietăți din Object.prototype. Acestea pot fi suprascrise.
- Object.prototype este un obiect în care poți adăuga propriile proprietăți și metode.
- Modificările aduce obiectului Object.prototype se propagă către toate obiectele. Singura excepție este atunci când proprietățile și metodele supuse modificărilor nu sunt ele la rândul lor modificate mai departe în lanțul prototipal.
- Proprietățile lui Object nu sunt `enumerable`. Deci, nu vor apărea în bucle `for...in` care nu ciclează doar proprietățile proprii.

## Spune standardul

Valoarea slotului intern [[Prototype]] a obiectului cu rol de prototype pentru Object este `null` iar valoarea slotului intern [[Extensible]] este `true`.

## Crearea obiectelor cu Object

A. Crearea de obiecte goale

```javascript
var obiect = new Object();
var object = new Object(null);
var object = new Object(undefined);
```

B. Crearea de obiecte de un anumit tip

```javascript
// crearea de obiecte Boolean
var obiect = new Object(true);
var object = new Object(Boolean());
```

## Object.prototype.constructor

Indică funcția care stă la baza prototipului.

## Object.create()

Va creea un obiect având un obiect prototip și proprietăți care sunt specificate.

### Comportament la instanțierea obiectelor noi

Să luăm un exemplu simplu care va descoperi anumite comportamente în cazul lui Object.

```javascript
var animal = {
  caracteristici: {}
};                                    // Object.getPrototypeOf(animale) returnează prototype-ul lui Object

var vrabie = Object.create(animal);  // Object.getPrototypeOf(vrabie) returnează prototype-ul lui Object căruia i se adaugă proprietatea picioare: 4
vrabie.caracteristici.picioare = '2';

var crocodil = Object.create(animal);
crocodil.caracteristici.picioare = '4';

animal.caracteristici.picioare // 4
// implicit
vrabie.caracteristici.picioare // 4
```

Ceea ce se întâmplă în acest caz este că obiectele nou create sunt la concurență în a modifica un membru al prototipului: `animal.caracteristici.picioare`.

Pentru a evita un astfel de comportament, ai putea gândi că pentru fiecare obiect nou creat să setezi un obiect nou care că reprezinte atributele specifice ale fiecărui animal.

```javascript
var animal = {
  caracteristici: {}
};

var cal = Object.create(animal);
cal.caracteristici = {picioare: 4};

var cangur = Object.create(animal);
cangur.caracteristici = {picioare: 2};
```

Acest exemplu este limitat, pentru că în cazul în care setezi obiectul caracteristici în acest mod, îl vei rescrie ori de câte ori vei folosi o nouă instanțiere, care vine. la rândul său cu propriile-i caracteristici.

Soluția este de a renunța la setarea completă a obiectului caracteristici și setarea specifică a fiecărei proprietăți a obiectului caracteristici pentru fiecare dintre posibilitățile contribuite de obiectele create.

```javascript
var animal = {
  caracteristici: {}
};

var cal = Object.create(animal);
cal.caracteristici = {insusiri: {picioare: 4}};

var cangur = Object.create(animal);
cangur.caracteristici = {insusiri: {picioare: 2}};
```

Astfel, nu se vor mai înregistra schimbări în obiectul care servește drept prototip. În schimb, obiectele create vor moșteni și vor accesa pe baza lanțului prototipal proprietăți ale obiectului care a oferit prototipul.

Plus de asta Object permite crearea unui obiect specificând în mod direct atributele fiecărui membru prin pasarea unui obiect de configurare.

```javascript
var animal = {
  caracteristici: {}
};

var cal    = Object.create(animal, {caracteristici: {writable: true, configurable: true, value: {picioare: 4}}});
var cangur = Object.create(animal, {caracteristici: {writable: true, configurable: true, value: {picioare: 2}}});
```

## Object.prototype.hasOwnProperty()

Pentru a testa doar cheile care aparțin obiectului contruit fără proprietățile moștenite prin prototip se va testa dacă obiectul are proprietăți ale sale folosind `Object.prototype.hasOwnProperty`.

```javascript
"use strict";
var obiect = { unu: "primul", doi: "al doilea" },
    cheie;
Object.prototype.trei = "al treilea";
for( cheie in obiect ){
  if(obiect.hasOwnProperty(cheie)){       // verificarea se face pentru fiecare cheie. Taxează performanța
    console.log( cheie, obiect[cheie] );
  }
};
/*
unu primul
doi al doilea
 */
```

## Object.keys()

Returnează un array care conține numele tuturor proprietăților `deținute` de un obiect. ATENȚIE! Aceste proprietăți trebuie să fie setate ca `enumerable`.

Metoda `Object.keys` extrage toate cheile proprii (nu cele moștenite) ale unui obiect iterabil.

Această metodă ne oferă un array de chei, care poate fi iterat prin metode așa cum este `Array.prototype.forEach`.
Performanțele folosind această metodă sunt net superioare lui `hasOwnProperty`.

```javascript
"use strict";
var obiect = { unu: "primul", doi: "al doilea" };

Object.keys(obiect).forEach(function(cheie){
  console.log( cheie, obiect[cheie] );
});
```

## Object.freeze()

Această funcție controlează o proprietate a obiectului care se referă la posibilitatea ca un obiect să-i fie suprascrise proprietățile. Astfel, folosind această funcție, se poate preveni modificarea stării unui obiect.

```javascript
var test = {
  prop1: 10,
  prop2: function() {
    return prop1;
  }
};

Object.freeze(test);
Object.isFrozen(test); // true
delete test.prop1; // false
Object.defineProperty(test, 'prop3', {value: 6000}); // TypeError: can't define property "prop3": Object is not extensible
```

Object.freeze() nu protejeaza obiectele care sunt proprietăți în obiectul înghețat.

Înghețarea totală a unui obiect se poate face prin intermediul unei funcții dedicate:

```javascript
function deepFreeze(obj){

  // Adu numele proprietăților care sunt definite numai de obiect
  var propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach( function(name) {
    var prop = obj[name];

    // îngheață recursiv pentru toate obiectele conținute
    if (typeof prop == 'object' && prop !== null){
      deepFreeze(prop);
    }

  });

  return Object.freeze(obj);
};
```
