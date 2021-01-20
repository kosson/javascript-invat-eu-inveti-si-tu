# Obiectul intern Date

Obiectele `Date` măsoară timpul scurs de la 1 ianuarie 1970 UTC în milisecunde.

Apelarea ca funcție `Date()`, va returna un string cu valoarea timpului. Instanțierea cu `new`, va crea un obiect `Date` ale cărui proprietăți pot fi folosite.

## Mantre

-   Dacă `Date` nu are argumente, din poziția sa de constructor, va creea un obiect pentru data și ora curentă obținute de la sistem.
-   Dacă sunt introduse cel puțin două argumente, cele lipsă sunt setate la `1` (pentru zi) sau la `0` pentru restul argumentelor.
-   Limitele lui `Date` sunt între 100.000.000 zile și 100.000.000 zile cu 1 ian. 1970 la centru.
-   Numărul de argumente gestionate de constructor este 7 și poate fi aflat prin invocarea `Date.length`.

Când `Date` joacă rol de constructor, poate primi diferite valori ca argumente:

-   o **valoare**, numărul de milisecunde scurs de la 1 ianuarie 1970
-   un **șir** care reprezintă o dată. Acest șir de caractere trebuie să poată fi interpretat de `Date.parse()`, adică să fie conforme cu RFC 2822 sau ISO 8601
-   și opțional: an, lună, zi, oră, minut, secundă, milisecundă

Pentru an, valorile de la 0 la 99 se potrivește intervalului de ani de la 1900 la 1999.

Proprietăți:

-   `Date.prototype`
-   `Date.length`

## Resurse

- [Date Manipulation in JavaScript - A Complete Guide](https://livecodestream.dev/post/date-manipulation-in-javascript-a-complete-guide/)
- [Date | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
