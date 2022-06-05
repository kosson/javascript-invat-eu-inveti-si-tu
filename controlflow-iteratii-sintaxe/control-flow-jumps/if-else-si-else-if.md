# Instrucțiunile if, if...else și else if

Aceast enunț este folosit pentru a crea mai multe posibile căi pe care să o apuce execuția codului în funcție de valoarea de adevăr obținută în urma evaluării unei expresii.

Adu-ți mereu aminte de faptul că toate expresiile în JavaScript se reduc la o valoare de adevăr. Este foarte important să-ți aduci aminte mereu de acest aspect pentru că uneori va fi nevoie să testezi dacă o expresie complexă se reduce la o valoare *truthy* sau la una *falsey*. Însăși posibilitatea de a modifica cursul de execuție al unui program determinând valoarea de adevăr, face posibil visul lui Leibnitz pe baza algebrei lui Boole (vezi introducerea).

```javascript
if (true) {
  console.log('I love you!');
};
```

Mai sus este o situație puțin probabilă în practica de zi cu zi, dar ilustrează prin însăși valoarea `true`, ceea ce se petrece în cazul evaluării cu `if`. Observă faptul că am preferat să pun expresia care trebuie evaluată în urma evaluării la `true` între acolade, dar pe o linie nouă indentată. O astfel de redactare a codului asigură maximul de lizibilitate. Ceea ce se realizează optând pentru un model de redactare adoptat de mulți programatori ca fiind o normă comun acceptată, este că asiguri un nivel de comunicare, de reciprocitate și dialog curat cu alți programatori care se vor uita la codul tău mai târziu.

În practica zilnică și în mare parte a codul pe care-l vei scrie sau examina, vei evalua expresii.

```javascript
let gând = 'negativ';
if (gând === 'negativ') {
  console.log('Privește cerul! Citește o carte!');
};
```

Este clar că vom folosi această instrucțiune pentru a stabili un curs de evaluare în funcție de anumite condiții. Ai putea să-ți închipui că apuci pe un drum dorind să te plimbi prin Brașov și în funcție de anumite condiții, de la București poți să mergi pe Cheia, pe Valea Prahovei sau pe Rucăr-Bran. Din nefericire, traficul și condițiile meteo decid. Dacă nimic nu este practicabil pentru că este foarte aglomerat, poți să încerci pe la Buzău. Toate aceste opțiuni pot fi modelate cu enunțul `if...else`, dar în cazul în care ai nevoie să mai faci un nivel suplimentar de decizii, vei folosi `else if`.

```javascript
let valeaPrahoveiAglomerat = true,
    cheiaLapovita = true;
if (valeaPrahoveiAglomerat == true) {
  console.log('ma opresc');
} else if (cheiaLapovita == true) {
  console.log('ma intorc');
} else {
  console.log('merg pe Rucăr-Bran');
};
```

După cum se observă, ceea ce am realizat este un arbore decizional, cu ramuri de execuție condiționate de evaluare. Dacă ai un arbore stufos al deciziilor, cel mai potrivit este să construiești o funcție pentru tratarea acelui *lanț* de evaluări. Încearcă pe cât posibil să te limitezi la maxim două niveluri, dacă este posibil.

Dacă vei declara o variabilă în corpul unei declarații `if`, această variabilă va fi disponibilă și în afara blocului, fie că blocul a fost executat sau nu. Aria de disponibilitate nu este restricționată doar la instrucțiunea `if`.

Începând cu ES6, este posibilă și **declararea** funcțiilor în blocurile `if`, iar declararea variabilelor este limitată la nivelul blocului respectiv.

```javascript
"use strict";
if (true) {
  function x () { console.log('bau') };
  x();
};
```

Dacă tot am lămurit povestea instrucțiunilor `if`, `if...else` și `else if`, am să mai adaug un lucru legat de redactarea codului în sine. Atunci când veți parcurge fragmente de cod scrise de alți programatori, veți vedea că uneori instrucțiunile (*statements*), nu sunt introduse într-un bloc delimitat de acoloade (*block statements*) așa cum am redactat în cazurile prezentate. Uneori veți vedea instrucțiuni redactate ca și cum ar atârna în gol. Acest mod de redactare a codului este permis.

```javascript
if (true) console.log('e adevarat');
// sau
if (true)
  console.log('e bine și așa');
// sau
let a = false;
if (a === true) {
  console.log('și așa');
} else
  console.log('e false');
// sau
let b = true;
if (b === true)
  console.log('și așa');
else {
  console.log('e false');
};
```

Toate acestea sunt variante acceptate de redactare, dar nu sunt indicate pentru că nu ajută la înțelegerea codului dintr-o privire și pot îngreuna semnificativ procesul de detectare a unor erori.

## Microcircuite logice

Blocurile decizionale pot fi interpretate precum circuite logice care au capacitatea de a orienta execuția codului pe o anumită ramură. De exemplu, putem testa dacă o valoare există. În cazul unui răspuns pozitiv, putem inițializa o valoare sau putem alege să executăm o funcție, dacă dorim.

```javascript
let martor = 1;
if (martor) {
  console.log('Apare acest mesaj');
}
```

Folosirea operatorilor Boolean implică o evaluare apropiată de cea condițională și pot fi utilizați pentru inițializarea unor variabile cu valori din oficiu în cazul în care nu sunt primite cele așteptate.

```javascript
let martor = 1; // dacă martor este truthy,
let rezultat = martor && 100; // rezultat va fi inițializat cu valoarea implicită
console.log(rezultat);
```

Dacă `martor` va fi evaluat la o valoare *truthy*, atunci `rezultat` va fi inițializat cu valoarea `100`. În caz contrar, `rezultat` va avea valoarea `0`. Acesta este cazul condiționării unei inițializări de rezultatul unei evaluări.

În codul pe care îl vei scrie sau cel pe care-l vei întâlni, de cele mai multe ori vei vedea că `if` este pus să evalueze nu numai o valoare în sine, ci să evalueze expresii construite cu operatori logici.

```javascript
const ceva = 10;
if (ceva === 1 || ceva === 10 } || ceva === 100) {
  // execută codul
}
// fiind perfect echivalent cu
if ([1, 10, 100].include(ceva)) {
  // execută codul
}
```

## Modificarea mediului exterior

Cel mai adesea veți vedea că `if` este folosit pentru a executa cod în funcție de rezultatul unei evaluări. Acest lucru se traduce într-o modificare dorită a stării anumitor obiecte sau valori din afară.

Totuși, pentru a preîntâmpina efecte nedorite, putem adopta un stil de utilizare a `if`-urilor ceva mai sigur. De exemplu, prima decizie se poate rezolva cu un `return` care *taie* restul arborelui decizional.

```javascript
if(true){
  return executLaTrue();
}
```

## Folosirea unei liste în locul testării repetate

```javascript

```

## Resurse

- [Replace multiple if statements with a lookup table](https://getfrontend.tips/replace-multiple-if-statements-with-a-lookup-table/)
