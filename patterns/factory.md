# Factory

Este o funcție care creează și returnează un obiect.

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
