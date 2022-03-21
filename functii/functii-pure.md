# Funcții pure

Sunt acele funcții care fiind aplicate pe aceiași parametri, vor produce același rezultat fără a avea *efecte secundare*. O trăsătură care se desprinde este aceea că prezintă același predictibil: pentru datele de intrare se va ști întotdeauna ce date sunt returnate.

Motivul care dorești să folosești funcții pure este acea că dorești să eviți orice dependență de starea programului (*shared state* în limba engleză). Uneori pare imposibil pentru că nu poți avea o aplicație care să nu producă efecte secundare. De exemplu, citește o bază de date sau datele de la user, ori actualizează datele afișate clientului.

Orice funcție care depinde de evenimente I/O, de variabile externe, de citirea/scrierea unor fișiere sau care fac apeluri http, nu este o funcție pură. Tot o funcție care nu este pură, este aceea care produce modificări unei variabile locale sau externe sau a valorilor a căror identificatori au fost pasați prin referință.

```javascript
let x = 10;
const verificareImpura = valoare => valoarea >= x; // impură pentru că are o dependență externă: `x`
const verificarePura = (valoare, ceaPrinReferinta) => valoare >= ceaPrinReferinta; // rezolvat prin dependency injection
```

O altă situație în care poți idenfica comportamentul impur al unei funcții este atunci când modifică un obiect extern la momentul în care prelucrează datele. Un posibil exemplu ar fi modificarea elementelor unui array într-o funcție. Soluția ar fi crearea unui structuri noi de date care să reflecte modificările. Astfel, pentru cazul unui array, vei căuta să prelucrezi datele cu un `map`, care va crea un array nou, fără a-l afecta pe cel original.

Pentru cazul unui obiect, ai fi tentat să lucrezi cu referințele către valori, dar acest lucru ar atrage modificarea imediată a obiectului sursă. Soluția ar fi crearea unui obiect nou care să reflecte modificările pe care le-ai adus.

```javascript
let unaPura = (obi1, obi2) => Object.assign({}, obi1, {obi2});
// sau
let prelucrarePuraObi = (obiOriginal, oProprietateNoua) => ({...obioriginal, oProprietateNoua});
// am folosit spread pentru a crea o copie shallow a obiectului original
```

## Deficiențele funcțiilor impure și avantajele celor pure

Funcțiile impure sunt în primul rând dependente de mediul/locul în care au fost apelate. De cele mai multe ori necesită din partea progamatorului o atenție sporită asupra stării aplicației. Mai mult, pot apărea condiții de rulare în concurență.

Câteva avantaje ale funcțiilor pure:
- posibilitatea de a le compune pentru că se prezintă ca unități independente de prelucrare a datelor;
- sunt predictibile, ceea ce le face ușor de testat;
- sunt pretabile cache-ability-ului (memoization) pentru faptul că sunt predictibile în ceea ce privește rezultatele și astfel pot fi cache-ate în funcție de input;
- pentru că sunt unități independente de prelucrare, pot fi rulate în scenarii de paralelizare;
-

## Resurse

- [Free Sample Lesson: Pure Functions, Eric Elliot](https://ericelliottjs.com/premium-content/lesson-pure-functions)
