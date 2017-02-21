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
NaN === NaN; // false
```

Există chiar și o metodă care verifică o valoare dacă este NaN.

```javascript
isNaN(NaN); // true
isNan(5); // false
isNaN('salut'); // true
```
