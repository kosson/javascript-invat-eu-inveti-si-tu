# FUNCȚII

`function` este un subtip de obiecte numit tehnic „callable object”.

Funcțiile sunt obiecte first-class. Pot fi pasate ca argumente altor funcții și pot fi returnate din funcții.

Funcțiile în JavaScript sunt de ordin înalt, adică pot fi pasate ca valori și pot primi ca argumente alte funcții.

## Mantre

- Orice funcție poate fi apelată cu oricâte argumente de orice tip în orice moment.
- Toate funcțiile sunt de fapt obiecte instanțe ale tipului `Function` (obiecte interne).
- O funcție este declarată de o expresie care începe cu cuvânt rezervat limbajului: `function`.
- Când funcțiile sunt executate SCOPE-ul folosit este cel de la MOMENTUL DEFINIRII, nu cel de la momentul invocării (asta înseamnă LEXICAL SCOPE, de fapt).
- Funcțiile sunt „IDENTIFICATORI" așa cum sunt și variabilele.
- Funcțiile returnează o valoare prestabilită: `undefined`.
- Funcțiile sunt ele însele valori.
- Funcțiile pot fi pasate ca argumente altor funcții.
- Pentru o funcție poți vedea câți parametri au fost declarați (`nume_functie.length`) și câte argumente i-au fost pasate (`arguments.length`).
- Funcțiile sunt obiecte („first-class objects”). Asta înseamnă că au conectări [[Prototype]] - lanț prototipal.
- Toate funcțiile au la dispoziția lor un set de utilități preexistent, care poate fi apelat prin `[[Prototype]]`. Cele mai evidente sunt `call()` și `apply()`.
- `this` și `arguments` sunt pasate tacit la invocarea unei funcții.
- Când invoci funcția ca metodă a unui obiect, acel obiect devine **contextul** funcției și acesta devine disponibil în funcție prin intermediul parametrului `this`.
- `this` este un obiect-context: pentru funcții simple este `window`, pentru metode este obiectul în care se execută iar pentru noile obiecte create este chiar noul obiect generat.
- Funcțiile sincrone procedează la execuție fără a lăsa programul să execute altceva (comportament ce induce blocaje).
- Funcțiile asincrone returnează imediat iar rezultatul este pasat unui handler, adică un callback. În cazul eventloop-ului, pasarea rezultatului se face la un ciclu viitor (adică când stiva de execuție este liberă).
- O funcție are acces și poate performa operațiuni asupra obiectului în interiorul căruia a fost invocată.
- În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (`numeFunctie.prototype`), care se leagă automat la `Object.prototype`.
- Funcțiile sunt legate de obiectul prototip prin metoda `.constructor`.
- Funcțiile nu sunt cele care generează obiectul prototype.
- Fiecare funcție are un prototype object diferit.
- O funcție apelată cu `new` în fața sa este un constructor. De regulă, numele funcției care va fi constructor, se scrie cu literă mare.
- Funcțiile generează SCOPE-ul.
- Funcțiile care joacă rol de metode într-un obiect, de fapt nu aparțin obiectului, ci sunt doar invocate în contextul obiectului. Ceea ce „aparține” obiectului este, de fapt, referința către funcție. ATENȚIE! investighează mereu call-site-ul pentru a afla ce este în `this`.
- Atunci când funcția este un callback, ține minte că tot o referință către funcție este (implicit assignment), nu este valoarea sa.
- Dacă definești o funcție în interiorul altei funcții, atunci funcția internă trebuie să fie recreată de fiecare dată când funcția externă este executată (acest lucru se întâmplă pentru că funcțiile, de fapt, sunt obiecte). Acest comportament trebuie evitat. Definește funcția în afară și referențiaz-o sau execut-o în context local prin call / apply / bind.
- Orice funcție publică poate fi invocată cu `call()` sau `apply()` (vezi regulile de binding pentru `this`).

## Fat arrow

Este un nou mod de notație introdus odată cu EcmaScript 2015. Acest nou tip de notație urmărește concizia. ATENȚIE! aceste funcții sunt legate de scope-ul lexical, asta însemând că `this` va fi același ca și cel din blocul părintelui.

```js
// un singur argument pasat (util în callbackuri)
x => x + 1; // se face automat return

// niciun argument pasat
const numere = [234, 54, 101, 5, 34, 5045];
const pare = numere.filter( x => {
  if ( x%2 === 0 ) {
    console.log( x + ' e par, prietene!' );
    return true;
  }
});
/*
234 e par, prietene!
54 e par, prietene!
34 e par, prietene!
*/
```
