# `Promise.race(obiectIterabil)`

Se aseamănă cu `Promise.all()` rezolvând toate elementele (promisiunile) din obiectul iterabil. Dacă iterabilul este gol sau dacă nu este încheiată una din promisiunile din iterabil, nici `race` nu va fi *încheiată* (**settled**).
Este așteptat ca obiectul `this` al lui race să ofere o metodă `resolve`.
