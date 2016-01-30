# Global Execution Context - contextul de execuție a codului
Tot codul JavaScript rulează în Global Execution Context (GEC). Este un wrapper pentru cod.

Este creat un **Global Object** și **this**, o variabilă specială. De regulă, este window.

Execution Context este inițiat la executarea codului.

Conține:
- Global object
- this
- stiva variabilelor
- Outer environment (pentru cazul funcțiilor. Global env nu are outer env)
- codul js

ATENȚIE, toate acestea sunt create de Enginul JavaScript.

## Acumulări rapide
- Motorul JavaScript creează un obiect al contextului de execuție: EXECUTION CONTEXT OBJECT.
- Invocarea unei funcții generează un nou CONTEXT de EXECUȚIE. **Acesta nu este un obiect, ATENȚIE!**
- Contextul de execuție este parte a scope (perimetru).
- Contextul de execuție este constituit din TOT ce se întâmplă atunci când funcția se execută, adică in toate variabilele și funcțiile. O variabilă este considerată a fi „în scope", dacă este accesibilă în contextul de execuție curent.
- Variabilele și funcțiile care fac parte din contextul de execuție sunt stocate în OBIECTUL CONTEXTULUI DE EXECUȚIE - Execution Context Object.
- Pentru orice program există un **global execution context** (activat spre exemplu când declari `<script>`)

## Mantre
- Ori de câte ori este invocată o funcție, se creează un nou context execuție (TOT ce se întâmplă atunci când funcția se execută).
- Variabilele și funcțiile care fac parte din contextul de execuție, sunt memorate în EXECUTION CONTEXT OBJECT, care este un obiect al motorului JavaScript.
- contextul e execuție este parte a scope (format la faza de compilare).
- Context este valoarea lui ```this```
- toate variabilele și funcțiile definite într-o funcție sunt considerate parte a contextului de execuție
