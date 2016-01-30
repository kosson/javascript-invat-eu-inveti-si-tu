# FUNCȚII
## Mantre
- O funcție este creată de o expresie care începe cu cuvânt rezervat limbajului: `function`.
- Când funcțiile sunt executate SCOPE-ul folosit este cel de la MOMENTUL DEFINIRII, nu cel de la momentul invocării (asta înseamnă LEXICAL SCOPE, de fapt).
- Funcțiile sunt „IDENTIFICATORI" așa cum sunt și variabilele.
- Funcțiile returnează o valoare prestabilită: undefined
- Funcțiile sunt ele însele valori.
- Funcțiile sunt obiecte. Asta înseamnă că au conectări [[Prototype]] - prototypal linkage.
- Funcțiile au o referință către contextul de execuție curent în timp ce se execută prin cuvântul cheie rezervat „this"
- În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (numeFunctie.prototype) care se leagă automat la Object.prototype.
- Funcțiile sunt legate de obiectul prototip prin metoda .constructor
- Funcțiile nu sunt cele care generează obiectul prototype.
- Fiecare funcție are un prototype object diferit.
- O funcție apelată cu ```new``` în fața sa este un constructor.
- Funcțiile generează SCOPE-ul.
- Unei funcții care este o metodă îi este pasat însăși obiectul în care a fost invocată.
- Dacă definești o funcție în interiorul altei funcții, atunci funcția internă trebuie să fie recreată de fiecare dată când funcția externă este executată (acest lucru se întâmplă petru că funcțiile, de fapt, sunt obiecte). Acest comportament trebuie evitat. Definește funcția în afară și referențiaz-o sau execut-o în contect local prin call/apply/bind 

--------------------------------------------------------------------------------

## Ce se întâmplă când o funcție este invocată?
1. se aplează funcția iar locul în care se întâmplă acest lucru se numește call-site
- Se stabilește **function context**
  1. vorbim de context de execuție global (obiectul **window**) când funcția este invocată ca funcție, nu ca metodă sau callback

- Se generează un obiect căruia îi sunt pasate automat ARGUMENTELE și **this**.

**arguments** este o colecție (seamănă dar NU ESTE UN ARRAY) a tuturor argumentelor pasate funcției și are proprietatea length pentru a afla numărul argumentelor pasate. Valorile pot fi obținute prin indecși arguments[i].

Invocarea funcțiilor se poate face în patru cazuri:
1. ca funcții
2. ca metode
3. ca și constructori cu `new`
4. indirect prin apelarea într-un context de execuție diferit folosind call() și apply()
