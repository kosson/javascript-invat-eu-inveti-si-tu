# Enunțul `return`

Orice funcție în JavaScript returnează o valoare. Folosind `return` obții rezultatul evaluării funcției.
Poate fi utilizat și pentru a ieși din execuția unei funcții dacă o anumită condiție a fost întrunită.

Return poate fi folosit simplu sau urmat de o expresie.

## Spune standardul

„Un enunț return are ca efect întreruperea execuției și returnarea unei valori apelantului (doar dacă nu intervine un gestionar finally). Dacă nu există o expresie, valoarea returnată este undefined, în celălalt caz, fiind valoarea expresiei”.

## Mantre

- funcția va ieși din execuție când ajunge la return.
- return înseamnă returnarea unei valori codului care a invocat funcția.
- orice funcție returnează o valoare chiar dacă nu este folosit return.
- funcțiile care nu returnează o valoare în urma evaluării unei expresii, returnează `undefined`.

## Cazuistică

Acesta este cazul cel mai des întâlnit, atunci când se dorește ca funcția să returneze ceva util.

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
