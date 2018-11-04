# `NaN` - Not a Number

În cazul în care se încearcă o operațiune, dar operatorii sunt incompatibili cu ceea ce se dorește prin operatorul folosit, se va returna `NaN`.

```javascript
'x' * 2; // NaN
```

JavaScript are o ciudățenie. Dacă încerci să afli ce tip de dată este `NaN` folosind operatorul `typeof`, va fi returnat că este număr, ceea ce este absurd.

```javascript
typeof NaN; // number
```

Și ceva foarte simpatic la verificarea egalității lui `NaN` cu el însuși.

```javascript
NaN == NaN; // false
NaN === NaN; // false
```

Pentru că nu ne putem baza pe stabilirea adevărului folosind operatorii `==` și `===`, este nevoie de o funcție care să stabilească exact dacă o valoare este `NaN` sau nu.
Există chiar și o metodă membră a obiectului `Number`, care verifică o valoare dacă este `NaN`. Această metodă poate fi accesată direct sau folosind operatorul de adresare cu punct `Number.isNaN`.

```javascript
isNaN(NaN); // true
Number.isNaN(NaN); // true
isNan(5); // false
isNaN('salut'); // true - ciudat, nu?
Number.isNaN('salut'); // false - acum corect
'salut' == NaN; // false - ciudat, nu?
```

Metoda `isNaN` este membră și a obiectului `Number` începând cu ECMAScript 2015.
Metoda este utilă și pentru a verifica dacă este returnat `NaN` în cazul în care lucrezi cu expresii aritmetice.
