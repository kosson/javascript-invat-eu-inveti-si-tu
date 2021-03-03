# Instrucțiunea `throw`

Indică faptul că există o excepție de la regulile sintactice ale limbajului, o stare de eroare, care trebuie să fie instrumentată de o funcție dedicată tratării acestora (*exception handler*). Când este întâlnit un `throw`, execuția funcției se va întrerupe, iar dacă nu există un `catch`, întregul program se va opri. În primul `catch` întâlnit, se va face `throw`-ul.

```javascript
if (true) throw "E de rău, prietene!";
```

Pe `throw` am putea să-l asimilăm următoarelor sensuri în limba română: *a scoate erorile la lumină* sau *a semnaliza erorile* când acestea apar sau chiar *a raporta*. Voi folosi interșanjabil acești termeni în această lucrare.

```javascript
function ix (condition) {
  if (condition !== true) {
    throw new Error('Este falsă valoarea');
  };
  console.log('Mesaj că e adevărată condiția');
};
ix(false); // Error: Este falsă valoarea
```

Trebuie remarcat faptul că vom folosi `throw` pentru a raporta o excepție definită de noi. Ca și în cazul `return`, execuția funcției se va opri și nu se vor mai executa instrucțiunile rămase. Controlul va fi pasat unui bloc `catch` dacă acesta există pentru a fi prelucrate erorile. Dacă nu există un astfel de bloc de tratare a erorilor, execuția întregului program se va încheia.

```javascript
function ix (condition) {
  if (condition !== true) {
    throw new Error('Este falsă valoarea');
  };
  console.log('Mesaj că e adevărată condiția');
};

try {
  ix(false);
} catch (e) {
  console.log(e.message);
}; //  Este falsă valoarea
```

În cazul lui Node.js, dacă nu este găsit un `try/catch` în al cărui catch să fie tratată excepția, excepția apărută, va fi semnalată acolo unde a apărut, iar executarea întregului program este oprită, iar serverul repornit.
