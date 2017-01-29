# Comanda `return`

Orice funcție în JavaScript returnează o valoare.

Termină execuția unei funcții și specifică ca o valoare care trebuie returnată apelantului funcției.

```javascript
function ex(){
  //... cod
  return oExpresie;
};
```
Dacă oExpresie nu are valoare, funcția returnează `undefined`.

Excepția apare în cazul constructorilor, care returnează valoarea presetată și anume pe `this`.

Atenție, poți încheia execuția unei funcții pur și simplu dând comanda simplă `return`. Ceea ce va fi returnat este `undefined`.

```javascript
function ex(){
  //... cod
  return;
};
```
