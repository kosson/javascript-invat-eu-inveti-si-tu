# Valorile în JavaScript

Valorile sunt datele pe care un programator le poate manipula în JavaScript. Valorile sunt de anumite tipuri pentru că valorile ca tipologie sunt diferite.

Limbajul de programare ECMAScript, adică JavaScript-ul nostru are câteva valori care sunt **tipuri ale limbajului**, cum le spune standardul. Ce înseamnă că sunt tipuri ale limbajului? Simplu, sunt acele valori pe care un programator le poate manipula folosind limbajul de programare ECMAScript.

**Spune standardul**: *O valoare a limbajului ECMAScript este o valoare care este caracterizată de un tip al limbajului ECMAScript*.
Pe scurt, tipul indică valoarea.

Tipurile de valori disponibile sunt:

- `Undefined`,
- `Null`,
- `Boolean`,
- `String`,
- `Symbol`,
- `Number` și
- `Object`

## `Undefined`

Tipul de valori `Undefined` nu poate să conțină decât o singură valoare: `undefined`. `Null`, la fel.

## `Boolean`

Cu `Boolean` lucrurile se schimbă, acest tip putând avea două valori: `true` sau `false`.

## `String`

Tipul `String` este folosit pentru a reprezenta date textuale, fiind de fapt, un set de valori de numere întregi cu o reprezentare binară pe 16 biți. Fiecare valoare este considerată a fi „un element”. Un element este valoarea unui „code unit” din schema de codare a caracterelor UTF-16.

## `Symbol`

Tipul `Symbol` este un set de valori care nu sunt pot fi considerate șiruri, dar care pot fi folosite ca și chei ale unei proprietăți a unui obiect.

În cazul lui `Symbol`, fiecare valoare este unică și nu poate fi modificată („immutable”), dar fiecare valoare la rândul ei poate avea o valoare asociată folosită pentru a descrie simbolul, care este `undefined` sau un șir de caractere. Un `Symbol` cu care te vei întâlni foarte des este `@@iterator` și care este o referință către o metodă care returnează un obiect iterator pentru un obiect pe care-l folosești. Formula `for...of` face apel automat la această metodă.

## `Number`

Tipul `Number` țintește valori numerice cu dubă precizie pe 64 de biți.
`Number` nu poate avea valori mai multe decât 18437736874454810627 (standardul IEEE 754‐2008).
Alte valori de tip `Number` sunt `NaN` (Not-a-Number, care tot o implementare a standardului menționat este), `Infinity` pozitivă și negativă, zero și minus zero.

## `Object`

Tipul `Object` este o colecție de proprietăți.
Oricare proprietate a unui obiect este, fie o proprietate care conține date, fie un „accessor”.
O „proprietate de date” a unui obiect este o asociere dintre valoarea unei chei cu o valoare a limbajului (unul dintre tipuri), plus un set de atribute de tip Boolean (`writable`, `enumerable`, `configurable`).
O „proprietate accesor” (`get` și `set`), asociază o cheie cu una din cele două funcții accesor, plus un set de atribute tip Boolean.
Cheile unui obiect nu pot fi decât un șir de caractere sau o valoare `Symbol`. Atenție, chiar și un șir vid poate sta drept cheie. Numele cheii este întotdeauna un șir de caractere.

Proprietățile unui obiect accesate prin get și set, sunt cele ale obiectului, dar și cele moștenite.
Atenție, fiecare obiect trebuie să aibe seturi cheie - valoare care să fie unice. Duplicatele nu sunt acceptate.

## Datele: agregarea și prelucrarea lor

Pentru a oferi o perspectivă mai largă vom lărgi puțin perspectiva pentru a oferi un context tipurilor de valori.
Orice limbaj de programare are nevoie de structuri care să permită stocarea și manipularea facilă a datelor.
Javascript permite manipularea datelor la nivelul unor structuri stabilite formal în limbaj precum array-urile și obiectele. Însă cele mai simple structuri de date sunt însăși șirurile de caractere, care se supun metodelor de prelucrare a datelor specifice unui array.
Cele mai utile structuri de prelucrare a datelor sunt funcțiile. Pe acestea vă veți sprijini atunci când veți porni la manipularea valorilor. Din punct de vedere al preluării, imaginați-vă că sunteți în poziția unei funcții care produce niște rezultate. Dacă acele rezultate nu ar fi „salvate” într-o structură capabilă să le preia, acestea s-ar pierde.

Obiectele pot fi transformate în array-uri dacă acest lucru servește procesării datelor conținute. De cele mai multe ori, varietatea și flexibilitatea metodelor obiectelor interne limbajului, vă vor oferi și soluțiile de prelucrare.

Cel mai des vor fi folosite array-urile și obiectele, care seamănă cu array-urile (adică care oferă suport parțial metodelor care pot fi aplicate în mod tradițional asupra array-urilor).
Aceste structuri vor folosi datele ca valori prezentate deja.
