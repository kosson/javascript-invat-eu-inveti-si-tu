# Declararea funcțiilor:
function declaration statement și function definition expression

## Concepte tratate:
### A. declararea funcțiilor cu nume (named function declaration).
Ex.: function ceva(){}  
### B. funcție exprimată, (function expression).
Ex.: function ceva(){}  
### C. funcție exprimată anonimă, (anonymous function expression).
Ex.: var anonima = function(){};  
### D. funcție exprimată cu identificator (named function expression). Ex.: ```var test = function ceva(){};```

## Mantre
- O declarație de funcție începe cu `function` ca și cuvânt cheie. Orice altceva este o expresie de funcție.
- Invocarea unei funcții generează un nou CONTEXT de EXECUȚIE (TOT ce se întâmplă atunci când funcția se execută).
- Toate variabilele și funcțiile definite în funcție sunt considerate parte a contextului de execuție.
- fiecare argument al unei funcții este de fapt o variabilă locală.
- Variabilele și funcțiile care fac parte din contextul de execuție, sunt memorate în EXECUTION CONTEXT OBJECT, care este un obiect al motorului JavaScript.
- Când este definită o funcție, aceasta stochează scope chain-ul care era în efect în acel moment.
- Când o funcție este invocată creează un obiect în care stochează propriile variabile și adaugă acel obiect la scope chain.
- Funcțiile anonime nu permit ***recursivitatea***

--------------------------------------------------------------------------------

## Crearea funcțiilor

### A. DECLARAREA unei funcții cu nume (named function declaration)

#### Q&A
**Întrebare**: Cum DECLARI o funcție în scope (perimetru)?
**Răspuns**:

```js
  function ceva(){};

  // funcției i se dă un identificator în perimetrul (scope) în care există, cu numele ceva
```
*Orice altceva ce nu începe cu ```function``` este o expresie.*

--------------------------------------------------------------------------------
**Întrebare**: Cum INVOCI o funcție?
**Răspuns**:

```js
  ceva();
```
--------------------------------------------------------------------------------
### B. Funcție EXPRIMATĂ (function expression):

```js
  function ceva(){};
```
În acest caz funcția este declarată perimetrului (scope)

#### Q&A
**Întrebare**: De ce se numește exprimată?
**Răspuns**: Pentru că invocând-o ajungi la un rezultat, la o valoare (fie aceasta un boolean, număr, șir, obiect).

```js
  function ceva(){ return "o valoare" };
```
--------------------------------------------------------------------------------
### C. Funcție EXPRIMATĂ ANONIMĂ (anonymous function expression)

```js
  var anonima = function(){};
```

- Nu permite recursivitate

--------------------------------------------------------------------------------

### D. Funcție EXPRIMATĂ CU IDENTIFICATOR (named function expression):

```js
  var test = function ceva(){};
```

În acest caz este declarată o variabilă test în scope.

Numele „ceva" este declarat în perimetrul propriu al funcției, ATENȚIE, nu în scope-ul în care a fost declarat test.

De exemplu:

```js
  var test = function ceva(){
      console.log(typeof(ceva));
      return "merge";
  };
  test(); // function merge
  ceva(); // ReferenceError: ceva is not defined
```

- Permite recursivitatea pentru că putem face referință la funcție chiar din interiorul ei.
- Global scope nu este poluat
- Autodocumentează codul în cel mai simplu mod posibil.

--------------------------------------------------------------------------------

### Alonje:
1. Atunci când o funcție va fi folosită ca proprietate a unui obiect, atunci funcția va fi una exprimată cu indentificator (named function expression) întotdeauna.
