# Context de execuție

Contextul de execuție se leagă organic de **lexical environment**, adică de scope.

## Global Execution Context - contextul de execuție a codului

Tot codul JavaScript rulează în Global Execution Context (GEC). Este un wrapper pentru cod.
Este creat un **Global Object** și **this**, o variabilă specială. De regulă, pentru codul top-level este window.
Execution Context este inițiat la executarea codului și este unul per pagină web.

Conține:
- Global object
- this
- stiva variabilelor
- Outer environment (pentru cazul funcțiilor. Global env nu are outer env)
- codul js

ATENȚIE, toate acestea sunt create de motorul JavaScript.

## Mantre

- Pentru orice program există un **global execution context** (activat spre exemplu când declari `<script>`)
- Invocarea unei funcții generează un nou CONTEXT de EXECUȚIE. **Acesta nu este un obiect, ATENȚIE!**
- Un context de execuție are un „lexical environment” asociat, adică un scope, care conține toți identificatorii definiți în acel context.
- Contextul de execuție este parte a scope-ului.
- Contextul de execuție este constituit din TOT ce se întâmplă atunci când funcția se execută, adică toate variabilele și funcțiile. O variabilă este considerată a fi „în scope - in-scope", dacă este accesibilă în contextul de execuție curent.
- O metodă are drept **function context** însuși obiectul „în care” este invocată și poate fi accesat prin `this`.
- **Function context** nu este **execution context**.
- Pentru că JavaScript are un singur fir de execuție, trebuie reținut faptul că de fiecare dată când o funcție este invocată, contextul de execuție a celui care a invocat funcția la momentul acela este înghețat urmând să se creeze un altul pentru evaluarea noii funcții. După ce funcția invocată și-a încheiat execuția, contextul de execuție a funcției care a făcut apelul este restaurat. Evidența apelurilor și a operațiunilor privind înghețarea și restaurarea contextelor de execuție este făcută de **call stack**.
- Ori de câte ori este invocată o funcție, se creează un nou context execuție (TOT ce se întâmplă atunci când funcția se execută).
- Variabilele și funcțiile care fac parte din contextul de execuție, sunt memorate în EXECUTION CONTEXT OBJECT, care este un obiect al motorului JavaScript.
- contextul e execuție este parte a scope (format la faza de compilare).
- Context este valoarea lui `this`
- toate variabilele și funcțiile definite într-o funcție sunt considerate parte a contextului de execuție

## Cazul obiectelor

În cazul obiectelor, atunci când apelezi o funcție (care joacă rolul de metodă), folosind `.` sau `[]`, vei avea un obiect drept context, altfel, vei avea global environment.

Vorbim de faptul că funcțiile, atunci când sunt apelate, generează un context. `this` este legat la acest context iar acesta este setat după modul în care este apelată funcția. Reginald Braithwaite chiar exprima regretul că `this` nu a fost numit `context` direct.

Contextul unei funcții nu poate fi determinat examinând strict codul.

```js
var obiect = {
  getThis: function(){
    return this;
  }
};

obiect.getThis() === obiect; // true
```

Care ar fi contextul pentru funcția obiect.getThis()? Să investigăm:

```js
var getThis = obiect.getThis; // getThis este doar o referință către aceeași funcție

getThis === obiect.getThis; // true
getThis(); // window
```
