# Symbol.iterator

Acest simbol specifică iteratorul din oficiu pentru un obiect. Este folosit de `for...of`.

Când este nevoie de o iterare în cazul folosirii `for...of` este apelată metoda `@@iterator` fără niciun argument. Este returnat un `iterator` din care se pot extrage valorile necesare. 
