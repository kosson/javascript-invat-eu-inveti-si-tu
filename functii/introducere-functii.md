# Funcții în ECMAScript

Funcțiile sunt unitățile de execuție a codului JavaScript.
Funcțiile sunt obiecte. Standardul le numește chiar `function objects`.
Spre deosebire de restul obiectelor, funcțiile pot fi invocate.
`function` este un subtip de obiecte numit tehnic „callable object” iar acest lucru înseamnă că pentru acea funcție, motorul care implementează standardul ECMAScript are o metodă `[[Call]]`, care permite apelarea funcției. Funcțiile care pot deveni constructori prin apelarea cu `new`, au, de fapt, o metodă internă `[[Construct]]`.

Funcțiile sunt obiecte first-class. Pot fi pasate ca argumente altor funcții și pot fi returnate din funcții.

Funcțiile în JavaScript sunt de ordin înalt, adică pot fi pasate ca valori și pot primi ca argumente alte funcții.

Funcțiile pot fi stricte, atunci când se folosește `use strict` sau non-strict.

## Spune standardul

Funcțiile obiecte încapsulează cod parametrizat care ține minte mediul lexical („closed over”) și care permite evaluarea dinamică a codului.

O funcție obiect este un obiect comun care are aceleași sloturi interne și aceleași metode interne ca orice alte obiecte comune.

Codul dintr-o funcție obiect poate fi în „strict mode” sau nu. O funcție care rulează codul în strict mode se numește „strict function”. Cele care nu rulează în „strict function” se cheamă că sunt „non‐strict function”.

Funcțiile obiecte au sloturi interne și merită menționat `Realm`, care este o înregistrare a tărâmului în care a fost creată funcția și care oferă un obiectele interne care au fost accesate la momentul evaluării funcției.

## Mantre

- Funcțiile sunt obiecte care incapsulează cod parametrizat care este beneficiarul întregului scope în care a fost declarată funcția („closed over a lexical environment”).
- Funcțiile permit evaluarea dinamică a codului pe care îl conțin.
- Constructorul lui Function este chiar o funcție. În schimb, Function este constructor pentru Object. Cele două sunt contructorii pentru restul obiectelor interne.
- Orice funcție poate fi apelată cu oricâte argumente de orice tip în orice moment.
- Toate funcțiile sunt de fapt obiecte instanțe ale tipului `Function` (obiecte interne).
- O funcție este declarată de o expresie care începe cu cuvânt rezervat limbajului: `function`.
- Când funcțiile sunt executate SCOPE-ul folosit este cel de la MOMENTUL DEFINIRII, nu cel de la momentul invocării (asta înseamnă LEXICAL SCOPE, de fapt).
- La momentul declarării, funcțiile sunt doar trecute în inventarul scope-ului existent printr-un identificator cu care se face o referință. În spate, se creează obiectul funcție care va conține codul intern al său și alte proprietăți între care chiar o referință către scope-ul existent la momentul declarării - **lexical scope**. La invocarea funcției se creează un nou obiect scope care moștenește proprietăți din cel la care s-a făcut referință la momentul declarării.
- `this` și `arguments` sunt pasate tacit la invocarea unei funcții.
- Când invoci funcția ca metodă a unui obiect, acel obiect devine **contextul** funcției și acesta devine disponibil în funcție prin intermediul parametrului `this`.
- `this` este un obiect-context: pentru funcții simple este `window`, pentru metode este obiectul în care se execută iar pentru noile obiecte create este chiar noul obiect generat.
- Funcția pe lângă proprietățile sale, va primi tacit `this`, `arguments` și o altă proprietate internă care este scope-ul preexistent la momentul declarării. Dacă declarăm o funcție în Global Object, scope va fi chiar Global Object.
- Funcțiile care nu sunt invocate ca metode, vor avea `this` setat la global object.
- Funcțiile sunt „IDENTIFICATORI" așa cum sunt și variabilele.
- Funcțiile returnează o valoare prestabilită: `undefined`.
- Funcțiile sunt ele însele valori.
  - Funcțiile pot fi pasate ca argumente altor funcții (function expression).
  - Funcțiile pot returna alte funcții (function expression).
- Pentru o funcție poți vedea câți parametri au fost declarați (`nume_functie.length`) și câte argumente i-au fost pasate (apelând din interiorul ei: `arguments.length`).
- Funcțiile sunt obiecte („first-class objects”). Asta înseamnă că au conectări [[Prototype]] - lanț prototipal.
- Toate funcțiile au la dispoziția lor un set de utilități preexistent, care poate fi apelat prin `[[Prototype]]`. Cele mai evidente sunt `call()` și `apply()`.
- Funcțiile sincrone procedează la execuție fără a lăsa programul să execute altceva (comportament ce induce blocaje).
- Funcțiile asincrone returnează imediat iar rezultatul este pasat unui handler, adică un callback. În cazul event-loop-ului, pasarea rezultatului se face la un ciclu viitor (adică când stiva de execuție este liberă).
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

## Parametri și argumente - parameters and arguments

Parametrii sunt variabile care fac parte din definirea funcției.
Argumentele sunt valori pe care le trimitem funcției atunci când o invocăm.

Începând cu EcmaScript 2015 (ES6), unui parametru îi poți atribui direct o valoare la momentul definirii:

```js
function facCeva(a, b = "o valoare"){
  return b;
};
facCeva(); // "o valoare"
```

Parametrii pot fi mai mulți față de ceea ce o funcție poate primi. Fiecare valoare primită va fi introdusă și asignată parametrilor precizați în ordine.

La invocarea unei funcții sunt primiți tacit `this`, care formează contextul de execuție și `arguments`, care este un obiect. `arguments` seamănă cu array-urile prin faptul că pot fi accesate valorile în mod similar, dar nu este un array.

```js
(function adunare(){
  var cumulator = 0, i;
  for(i = 0; i < arguments.length; i++){
    cumulator += arguments[i];
  };
  return cumulator;
})(2, 3);
// 5
```

ES6 introduce un nou parametru: `rest` care permite reprezentarea unui număr nedefinit de argumente ca un array.

```js
function operatiune(...argumente){
  console.log(argumente.length);
};
operatiune(23,145,83); // 3
```

```js
function operatiune(a, b, ...valori){
  console.log(a, b, valori.length);
};
operatiune(2, 4, 20, 32, 110); // 2 4 3
```

Diferențe dintre `arguments` și `rest`

- parametrii rest sunt un array al celor cărora nu li s-a dat un nume.
- array-ul rest poate fi folosit cu metode precum `forEach`, `sort`, `map` ori `sort`.
- `arguments` este un obiect care are proprietatea `callee`

```js
// emularea lui rest - exemplu oferit de Mozilla Developer Network
function f(a, b){
  var args = Array.prototype.slice.call(arguments, f.length);
  // ...codul funcției mai departe
}
// este echivalent cu
function f(a, b, ...args){
  // cod funcție.
};
```

Valorile primelor două argumente pasate vor fi potrivite cu cei doi parametri menționați: a și b

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
