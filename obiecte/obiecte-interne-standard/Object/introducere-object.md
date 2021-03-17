# Object

Este un obiect intern al Javascript caracterizat de standard ca fiind unul dintre cele fundamentale. Poate fi folosit pentru crearea de obiecte atunci când este nevoie de setarea unor detalii fine ale proprietăților acestora.
Creează un *wrapper*, un *ambalaj* unui obiect atunci când este instanțiat prin apelarea cu `new` a constructorului `Object`. Parafrazând o zicală românească, am putea spune că în acest moment *haina face omul*. Acest wrapper spune că lucrăm cu un obiect.

## Mantre

-   `Object` este un constructor.
-   `Object` creează un *wrapper* pentru o anumită valoare. Dacă valoarea este `null` sau `undefined`, `Object` va crea și returna un obiect gol.
-   Dacă valoarea pasată nu este `null` sau `undefined`, `Object` va returna un obiect de tipul care corespunde valorii oferite.
-   Dacă valoarea este deja un obiect, va fi returnată valoarea.
-   Obiectul window are o metodă numită Object \[ function Object() ]. Motorul Javascript construiește automat metoda Obiect în obiectul window (`window.Object` returnează function Object()).
-   Toate obiectele în JavaScript descind din `Object`, își au originea în `Object`. Toate obiectele moștenesc metode și proprietăți din `Object.prototype`. Acestea pot fi suprascrise.
-   `Object.prototype` este un obiect în care poți adăuga propriile proprietăți și metode.
-   Modificările aduce obiectului `Object.prototype` se propagă către toate obiectele. Singura excepție este atunci când proprietățile și metodele supuse modificărilor nu sunt ele la rândul lor modificate mai departe în lanțul prototipal.
-   Proprietățile lui `Object` nu sunt `enumerable`. Deci, nu vor apărea în bucle `for...in` care nu ciclează doar proprietățile proprii.

## Spune standardul

Valoarea slotului intern `[[Prototype]]` a obiectului cu rol de prototype pentru Object este `null`, iar valoarea slotului intern `[[Extensible]]` este `true`.

## Crearea obiectelor folosind constructorul `Object`

A. Crearea de obiecte goale

```javascript
const obiect = new Object();
const object = new Object(null);
const object = new Object(undefined);
```

B. Crearea de obiecte de un anumit tip

```javascript
// crearea de obiecte Boolean
const obiect = new Object(true);
const object = new Object(Boolean());
```

![](ObjectMap.png)

## Constructorul Object

Constructorul `Object` creează un *ambalaj* peste o valoare dată drept argument. În cazul în care valoarea pasată este `null` sau `undefined`, creează un obiect gol. În caz contrar, va returna un obiect pentru tipul valorii pasate. Dacă-i pasezi un obiect, pur și simplu îl va returna.

```javascript
Object(null);      // {}
Object(undefined); // {}
Object({a: 1});    // {a: 1}
Object();          // {}
Object([]);        // []
```

După cum se observă, atunci când acest constructor este apelat fără `new` are același comportament precum `new Object()`. Acest lucru permite folosirea constructorului nu numai pentru a genera obiecte, dar și pentru a verifica valorile pentru a ne asigura că sunt de tip obiect.

```javascript
function test (obi = {}) {
  if (Object(obi) === obi) {
    console.log('E ok!');
  }
}
```


## Object.prototype.constructor

Indică funcția care stă la baza prototipului.

## Object.create()

Metoda va crea un obiect având un obiect prototip și proprietăți care sunt specificate. Pentru mai multe detalii poți să faci un salt la materialul care tratează în profunzime.

### Comportament la instanțierea obiectelor noi

Să luăm un exemplu simplu care va descoperi anumite comportamente în cazul lui `Object`.

```javascript
const animal = {
  caracteristici: {}
}; // Object.getPrototypeOf(animale) returnează prototype-ul lui Object
const vrabie = Object.create(animal);
// Object.getPrototypeOf(vrabie) returnează
// prototype-ul lui Object căruia i se adaugă
// proprietatea picioare: 4
vrabie.caracteristici.picioare = '2';
const crocodil = Object.create(animal);
crocodil.caracteristici.picioare = '4';
animal.caracteristici.picioare // 4
// implicit
vrabie.caracteristici.picioare // 4
```

Ceea ce se întâmplă în acest caz este că obiectele nou create sunt la concurență în a modifica un membru al prototipului: `animal.caracteristici.picioare`. Pentru a evita un astfel de comportament, ai putea gândi ca pentru fiecare obiect nou creat, să setezi un obiect nou care că reprezinte atributele specifice ale fiecărui animal.

```javascript
const animal = {
  caracteristici: {}
};
const cal = Object.create(animal);
cal.caracteristici = {picioare: 4};
const cangur = Object.create(animal);
cangur.caracteristici = {picioare: 2};
```

Acest exemplu este limitat, pentru că în cazul în care setezi obiectul caracteristici în acest mod, îl vei rescrie ori de câte ori vei folosi o nouă instanțiere, care vine. La rândul său cu propriile-i caracteristici.

Soluția este de a renunța la setarea completă a obiectului `caracteristici` și setarea specifică a fiecărei proprietăți a obiectului `caracteristici` pentru fiecare dintre posibilitățile contribuite de obiectele create.

```javascript
const animal = {
  caracteristici: {}
};
const cal = Object.create(animal);
cal.caracteristici = {insusiri: {picioare: 4}};
const cangur = Object.create(animal);
cangur.caracteristici = {insusiri: {picioare: 2}};
```

Astfel, nu se vor mai înregistra schimbări în obiectul care servește drept prototip. În schimb, obiectele create vor moșteni și vor accesa pe baza lanțului prototipal proprietăți ale obiectului care a oferit prototipul.

Plus de asta `Object` permite crearea unui obiect specificând în mod direct atributele fiecărui membru prin pasarea unui obiect de configurare.

```javascript
const animal = {
  caracteristici: {}
};
const cal    = Object.create(animal, {caracteristici: {writable: true, configurable: true, value: {picioare: 4}}});
const cangur = Object.create(animal, {caracteristici: {writable: true, configurable: true, value: {picioare: 2}}});
```
