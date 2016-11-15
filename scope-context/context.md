# Global Execution Context - contextul de execuție a codului

Tot codul JavaScript rulează în Global Execution Context (GEC). Este un wrapper pentru cod.

Este creat un **Global Object** și **this**, o variabilă specială. De regulă, pentru codul top-level este window.

Execution Context este inițiat la executarea codului.

Conține:
- Global object
- this
- stiva variabilelor
- Outer environment (pentru cazul funcțiilor. Global env nu are outer env)
- codul js

ATENȚIE, toate acestea sunt create de motorul JavaScript.

## Acumulări rapide
- Motorul JavaScript creează un obiect al contextului de execuție: EXECUTION CONTEXT OBJECT.
- Invocarea unei funcții generează un nou CONTEXT de EXECUȚIE. **Acesta nu este un obiect, ATENȚIE!**
- Contextul de execuție este parte a scope (perimetru).
- Contextul de execuție este constituit din TOT ce se întâmplă atunci când funcția se execută, adică in toate variabilele și funcțiile. O variabilă este considerată a fi „în scope - in-scope", dacă este accesibilă în contextul de execuție curent.
- Variabilele și funcțiile care fac parte din contextul de execuție sunt stocate în OBIECTUL CONTEXTULUI DE EXECUȚIE - Execution Context Object.
- Pentru orice program există un **global execution context** (activat spre exemplu când declari `<script>`)

## Mantre
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
