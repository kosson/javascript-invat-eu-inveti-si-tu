# Factory

Este un șablon folosit pentru a simplifica crearea obiectelor.
Folosit și la crearea de obiecte în baza unor necesități.
Este o funcție care creează și returnează un obiect.

## Mantre

 - creează și returnează un obiect
 - datorită closure-urilor, un factory poate fi folosit ca un mecanism de încapsulare.

```js
var persoana = function(nume, prenume){
  return {
    nume: nume,
    prenume: prenume,
    salutare: function(nume){
      return "Salut sunt " + this.nume;
    }
  }
};
```

Este util pentru că se comportă ca o interfață. Poți genera o sumedenie de obiecte care să folosească același „tipar”.
