# Instrucțiunea `throw`

Indică faptul că există o excepție de la regulile sintactice ale limbajului, o stare de eroare, care trebuie să fie instrumentată de o funcție dedicată cu tratarea acestora (*exception handler*). Pe `throw` am putea să-l asimilăm următoarelor sensuri în limba română: a scoate erorile la lumină sau a semnaliza erorile când acestea apar sau chiar a raporta. Voi folosi interșanjabil acești termeni în această lucrare.

```javascript
function ix(condition){
  if(condition !== true){
    throw new Error('Este falsă valoarea');
  }
}; ix(false); // Error: Este falsă valoarea
```
