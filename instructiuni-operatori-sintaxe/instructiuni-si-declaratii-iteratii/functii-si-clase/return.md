# Comanda `return`

Orice funcție în JavaScript returnează o valoare. Folosind `return` obții rezultatul evaluării funcției.

## Mantre

- funcția va ieși din execuție când ajunge la return.
- return înseamnă returnarea unei valori codului care a invocat funcția.
- orice funcție returnează o valoare chiar dacă nu este folosit return.
- funcțiile care nu returnează o valoare, returnează `undefined`.
- valorile returnate pot fi stocate în variabile.

Termină execuția unei funcții și specifică ca o valoare care trebuie returnată apelantului funcției.

```javascript
function ex () {
  //... cod
  return oExpresie;
};
```
Dacă `oExpresie` nu are valoare, funcția returnează `undefined`.

Excepția apare în cazul constructorilor, care returnează valoarea presetată și anume pe `this`.

Atenție, poți încheia execuția unei funcții pur și simplu dând comanda simplă `return`. Ceea ce va fi returnat este `undefined`.

```javascript
function ex () {
  //... cod
  return;
};
```
