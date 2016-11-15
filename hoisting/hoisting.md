# HOISTING

Ridicarea la vârful scope-ului a declarațiilor de variabile și funcții.

Există un mic truc care trebuie stăpânit pentru a înțelege hoising. Declararea variabilelor folosind `var` trebuie detașată de asignarea valorii.
Declarația variabilei este **hoisted** în capul funcției gazdă, dar locul unde se face asignare rămâne nemodificat. Deci, variabila se va afla în scope-ul funcției, dar atribuirea, asignarea valorii se face la momentul în care apare enunțul var. Pentru a lămuri și mai bine ce se întâmplă, consultă și documentația care explică compilarea și execuția codului JavaScript.

```js
function faCeva(){
  // cod al funcției și deodată trebuie să declari o nouă valoare
  var oValoare = 0;
};
```

Ceea ce se întâmplă poate fi ilustrat printr-o nouă reformulare a codului:

```js
function faCeva(){
  var oValoare;
  // cod al funcției
  oValoare = 0;
};
```

Din acest motive este cel mai bine ca variabilele să fie declarate în capul funcției de la bun început.

## Mantre

- JavaScript creează un **scope lexical**.
- Hoistingul este o conceptualizare menită a înțelege felul în care JavaScript funcționează. ATENȚIE! este doar un model, nu trebuie a se înțelege că este mecanica reală a limbajului.
- Declararea variabilelor și funcțiilor este „săltată" - hoisted la vârful scope-ului funcțional indiferent de poziția lor în cod.
- Funcțiile sunt săltate înaintea variabilelor.
- Hoistingul se face la momentul compilării, nu la faza de execuție.
- Variabila primește valoarea `undefined`. Pentru că se întâmplă acest lucru, cel mai bine este să declari variabilele în capul funcției și de preferat într-o singură declarație var.
- Hoistingul are un rol funamental în cazurile de recursiviate și recursivitate mutuală (o funcție o cheamă pe alta până când o condiție rupe lanțul).
- Folosirea noului cuvânt cheie `let` pentru a declara variabilele, are ca efect limitarea scope-ului la nivelul blocului `{}` (block scoping).
- Excepția pentru care JavaScript face block scopeing este contructul try... catch

```js
unu(1);

function unu(ceva){
    if(ceva > 20) return ceva;  // verifica valoarea sa nu fie mai mare de 20
    return doi(ceva + 2);       // 7+2
};

function doi(ceva){
    return trei(ceva) + 1;      // 7
};

function trei(ceva){
    return unu(ceva*2);         // 6
};
```

- unu este invocat cu valoarea 1
- f unu testeaza daca parametrul este mai mare decat 2; nu este
- doi este invocat trei cu valoarea 1+2 = 3
- trei este invocat cu valoarea 3 ; se adaugă în stivă 1 pentru această iterație
- f trei invoca unu cu valoarea 3*2 = 6
- unu verifica daca voaloarea param este mai mare de 20; nu este
- unu invoca doi cu valoarea 6+2 = 8
- doi invoca trei cu valoarea 8 ; se adaugă în stivă 1 pentru această iterație
- trei invoc unu cu valoarea 16
- unu evalueaza daca param este mai mare de 20; nu este
- unu invoca doi cu valoarea 16+2 = 18
- doi invocă trei cu valoarea 18 ; se adaugă în stivă 1 pentru această iterație
- trei invocă unu cu valoarea 18*2 = 36
- la 36 se adaugă valoarea din stivă 3
- Rezultat returnat: 39.
