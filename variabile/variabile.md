# Variabile

TODO: Ilustrează referința și copia

Variabilele sunt identificatori pentru valori.
Javascript folosește trei cuvinte cheie specifice limbajului: `var`, `let` și `const`. `let` și `const` au fost adăugate în ES6 și sunt legate strict de blocul de cod delimitat prin acolade.

Cele trei moduri de a declara variabile au efect și asupra scope-ului.

## var

Prin folosirea lui `var`, declararea variabilei se face în global scope sau în cea mai apropiată funcție. Nu este localizată la nivel de bloc de cod `{}`. De exemplu, pentru o ciclare cu for, variabila definită ca și condiție și poate o variabilă în blocul său, de fapt sunt „înregistrate” în scope-ul funcției care găzduiește `for` și nu în cel al lui `for`. Din nevoia de a localiza la nivel de bloc variabilele, au fost introduce de ES6 `let` și `const`.

### Standardul spune

Un enunț `var` declară variabile care au drept `scope` contextul de execuție curent. Variabilele `var` sunt create atunci când este instanțiat mediul lexical care le conține dar la momentul în care sunt create li se asignează valoarea `undefined`. Asignarea valorii se face la momentul execuției, nu la momentul creării.

## `let` și `const`

Numele de `let` vine din matematică însemnând: `fie`: fie x un număr cu valoarea 1.
Definesc variabile în cel mai apropiat „mediu lexical” (scope), care poate fi global scope, un block `{}` sau o buclă precum `for`.
Rolul lor este de a localiza la nivel de înregistrare în scope la nivel de `global`, `function` și block `{}`.

### Standardul spune

Declarațiile `let` și `const` definesc variabilele care sunt în mediul lexical, adică scope-ul contextului de execuție curent (running execution context).
Variabilele sunt create atunci când mediul lexical este instanțiat, dar nu vor fi accesate nicicum până când  ***lexical binding*** este evaluat. Valorea este asignată atunci când este evaluat acest **lexical binding**, nu la momentul declarării lor. Dacă o declarație cu `let` nu are o valoare de inițializare, este asignat `undefined` la momentul în care este evaluat, adică la momentul când se face `lexical binding` și se completează așa-numitul „Registru de mediu”.

## Mantre

- La momentul evaluării variabilele sunt create la momentul în care se constituie `lexical environment` (scope), dar nu poate fi accesată până nu se face legătura la valoare. La momentul creării variabile declarate cu var, vor fi inițializate automat cu valoarea `undefined`.
- Variabilele și funcțiile beneficiază de un proces al motorului JavaScript numit ***identifier lookup***. Este necesar pentru a discrimina între variabilele din local scope dintr-o funcție și una din global scope.
- La executarea codului JavaScript este nevoie de un loc unde să fie stocate variabilele locale. Acest loc este **obiectul scope** cunoscut și sub numele de **lexical environment**. Se poate percepe ca un obiect la a cărui membri ai acces, dar nu poți referenția obiectul în sine.
- Dacă declari o variabilă în corpul unei declarații if, această variabilă va fi disponibilă și în afara blocului funcțional, fie că blocul a fost executat sau nu. Se întâmplă pentru că se face hoisting. Folosirea cuvântului cheie `let` atașează variabila de blocul funcțional.
- Scope-ul unei variabile poate fi înțeles setul de linii de cod sursă pentru care este definit un identificator.
- Variabilele locale sunt disponibile funcției în care au fost declarate și tuturor funcțiilor interne.
- Variabilele locale sunt reatribuite cu valori de fiecare dată când o funcție este invocată.
- Parametrii unei funcții sunt la rândul lor variabile locale.
- Declarațiile de variabile se află în scope de la momentul în care au fost declarate, până la închiderea blocului funcției în care au fost declarate indiferent de imbricarea altor blocuri `{}`.

## Evaluarea unei expresii care conține valori delimitate prin virgulă

```js
var x = 1;
var y = 2;
var z = x + y; // 3

console.log( y = (x = y,z) ); // evaluează la 3
```

// x va fi 2 pentru că va primi valoarea pe care o are y
// y va fi 3 pentru că evaluarea unei înșiruiri delimitate de virgulă returnează ultima valoare din înșiruire.

Am menționat faptul că variabilele locale sunt stocate în scope, care poate fi perceput ca un obiect la al cărui membri ai access. Atunci când în execuție interpretorul caută o proprietate în obiectul scope curent. Dacă nu o găsește, atunci interpretorul va văuta mai sus în obiectul scope părinte și tot așa până când nu mai există un alt obiect părinte. Această secvență de obiecte scope se numește **scope chain**. Atenție, scope-ul se formează la momentul declarări, nu la momentul execuției.

## Resurse

[Wikipedia, Name binding](https://en.wikipedia.org/wiki/Name_binding)
