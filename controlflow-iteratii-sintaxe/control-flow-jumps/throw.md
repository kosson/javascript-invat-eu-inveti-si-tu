# Instrucțiunea throw

Indică faptul că există o excepție de la regulile sintactice ale limbajului, o stare de eroare, care trebuie să fie instrumentată de o funcție dedicată cu tratarea acestora (*exception handler*). Pe `throw` am putea să-l asimilăm următoarelor sensuri în limba română: *a scoate erorile la lumină* sau *a semnaliza erorile* când acestea apar sau chiar *a raporta*. Voi folosi interșanjabil acești termeni în această lucrare.

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
