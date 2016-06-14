# Iterare

ECMAScript 2015 a introdus un nou mecanism de parcurgere a datelor numit **iterare**.

Iterarea trebuie văzută ca o bandă de asamblare robotizată ( TODO: ilustrează principiul ).

Sunt două concepte centrale:
- **iterable** este o structură de date care expune elementele pentru a fi accesate public. Face acest lucru implementând o metodă care returnează un obiect `iterator`
- **iterator** care este de fapt un pointer pentru traversarea elementelor unei structuri de date (ceva care se apropie ca și comparație cu un cursor într-o bază de date).

## Cazuri în care se folosește iterarea

- for...of
- Array.from()
- operatorul spread (...)
- constructorul pentru Map (`new Map([['varza',1],[2, true]])`)
- constructorul pentru Set (`new Set([1,'doi',false])`)
- Promise.all() și Promise.race()
- `yield* unIterabil`
