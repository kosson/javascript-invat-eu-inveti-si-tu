# FUNCȚII

`function` este un subtip de obiecte numit tehnic „callable object”.

Funcțiile sunt obiecte first-class. Pot fi pasate ca argumente altor funcții și pot fi returnate din funcții.

## Mantre
- O funcție este declarată de o expresie care începe cu cuvânt rezervat limbajului: `function`.
- Când funcțiile sunt executate SCOPE-ul folosit este cel de la MOMENTUL DEFINIRII, nu cel de la momentul invocării (asta înseamnă LEXICAL SCOPE, de fapt).
- Funcțiile sunt „IDENTIFICATORI" așa cum sunt și variabilele.
- Funcțiile returnează o valoare prestabilită: undefined
- Funcțiile sunt ele însele valori.
- Funcțiile sunt obiecte. Asta înseamnă că au conectări [[Prototype]] - lanț prototipal.
- Toate funcțiile au la dispoziția lor un set de utilități preexistent, care poate fi apelat prin `[[Prototype]]`. Cele mai evidente sunt call(), apply().
- Funcțiile au o referință către contextul de execuție curent în timp ce se execută prin cuvântul cheie rezervat „this".
- În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (numeFunctie.prototype) care se leagă automat la Object.prototype.
- Funcțiile sunt legate de obiectul prototip prin metoda .constructor
- Funcțiile nu sunt cele care generează obiectul prototype.
- Fiecare funcție are un prototype object diferit.
- O funcție apelată cu ```new``` în fața sa este un constructor. De regulă, numele funcției care va fi constructor, se scrie cu literă mare.
- Funcțiile generează SCOPE-ul.
- Funcțiile care joacă rol de metode într-un obiect, de fapt nu aparțin obiectului, ci sunt doar invocare în contextul obiectului. Ceea ce „aparține” obiectului este, de fapt, referința către funcție. ATENȚIE! investighează mereu call-site-ul pentru a afla ce este în 'this'.
- Atunci când funcția este un callback, ține minte că tot o referință către funcție este (implicit assignment), nu este valoarea sa.
- Dacă definești o funcție în interiorul altei funcții, atunci funcția internă trebuie să fie recreată de fiecare dată când funcția externă este executată (acest lucru se întâmplă pentru că funcțiile, de fapt, sunt obiecte). Acest comportament trebuie evitat. Definește funcția în afară și referențiaz-o sau execut-o în context local prin call/apply/bind
- Orice funcție publică poate fi invocată cu `call()` sau 'apply()' (vezi regulile de binding pentru `this`).
