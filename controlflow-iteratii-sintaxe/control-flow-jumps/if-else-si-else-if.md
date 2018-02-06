# Enunțurile `if`, `if..else` și `else if`

Este o decizie pe care trebuie să o iei în funcție de două posibile căi. Pentru enunțul `if` este luată decizia pentru calea de execuție dictată de evaluarea unui enunț care o condiționează. Adu-ți mereu aminte de faptul că toate expresiile în JavaScript se reduc la o valoare de adevăr. Este foarte important să-ți aduci aminte mereu de acest aspect pentru că uneori va fi nevoie să testezi dacă o expresie complexă se reduce la o valoare *truthy* sau la una *falsey*. Însăși posibilitatea de a modifica cursul de execuție a unui program prin evaluarea la valoarea de adevăr, face posibil visul lui Leibnitz pe baza algebrei lui Boole.

```javascript
if (true) {
  console.log('I love you!');
};
```

Mai sus este o situație puțin probabilă în practica de zi cu zi, dar ilustrează prin însăși valoarea `true`, ceea ce se petrece în cazul evaluării cu `if`. Observă faptul că am preferat să pun expresia care trebuie evaluată în urma evaluării la `true` între acolade, dar pe o linie nouă indentată. O astfel de redactare a codului asigură maximul de lizibilitate. Ceea ce se realizează optând pentru un model de redactare adoptat de mulți programatori ca fiind o normă comun acceptată, este că asiguri un nivel de comunicare, de reciprocitate și dialog curat cu alți programatori care se vor uita la codul tău mai târziu.

În practica zilnică și în mare parte a codul pe care-l vei scrie sau examina, vei evalua expresii.

```javascript
var gând = 'negativ';
if (gând === 'negativ') {
  console.log('Privește cerul! Citește o carte!');
};
```

Trebuie evitată atribuirea valorilor în expresia de evaluare și mai ales declararea lor.

Este clar că vom folosi acest enunț pentru a stabili un curs de acțiuni în funcție de anumite condiții. Ai putea să-ți închipui că apuci pe un drum dorind să te plimbi prin Brașov și în funcție de anumite condiții, de la București poți să mergi pe Cheia, pe Valea Prahovei sau pe Rucăr-Bran. Din nefericire, traficul și condițiile meteo decid. Dacă nimic nu este practicabil pentru că este foarte aglomerat, poți să încerci pe la Buzău. Toate aceste opțiuni pot fi modelate cu enunțul `if..else`, iar în cazul în care ai nevoie să mai faci un nivel suplimentar de decizii, vei folosi `else if`.

```javascript
var valeaPrahoveiAglomerat = true,
    cheiaLapovita = true;
if (valeaPrahoveiAglomerat == true) {
  console.log('ma opresc');
} else if (cheiaLapovita == true) {
  console.log('ma intorc');
} else {
  console.log('merg pe Rucăr-Bran');
};
```

După cum se observă, ceea ce am realizat este un arbore decizională, cu ramuri de execuție condiționate de evaluare. Dacă ai un arbore stufos al deciziilor, cel mai potrivit este să construiești o funcție pentru tratarea acelui *lanț* de evaluări. Încearcă pe cât posibil să te limitezi la maxim două niveluri, dacă este posibil.

Fii foarte atent că dacă vei declara o variabilă în corpul unei declarații `if`, această variabilă va fi disponibilă și în afara blocului, fie că blocul a fost executat sau nu. Aria de disponibilitate nu este restricționată doar la enunțul `if`.

Începând cu ES6, este posibilă și **declararea** funcțiilor în blocurile `if`.

```javascript
"use strict";
if (true) {
  function x () { console.log('bau') };
  x();
};
```

Dacă tot am lămurit povestea enunțurilor `if`, `if..else` și `else if`, am să mai adaug un lucru legat de redactarea codului în sine. Veți vedea atunci când veți investiga cod scris de alți programatori, faptul că uneori enunțurile (*statements*) nu sunt introduse într-un bloc delimitat de acoloade (*block statements*) așa cum am redactat în cazurile prezentate. Uneori veți vedea enunțurile redactate ca și cum ar atârna în gol, dar să știți că în diversitatea pe care o oferă JavaScript, acest mod de redactare a codului este permis.

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
