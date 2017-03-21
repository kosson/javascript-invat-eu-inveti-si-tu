# Operatorul `in`

Prin acest operator testezi dacă o valoare există într-un obiect. În cazul array-urilor vorbim despre căutarea dacă un index cu valoarea specificată există.

```javascript
2 in [1,2,3,4]; // true
```

Interesant este că și `length` va returna `true`. De ce? Pentru că este o proprietate directă a obiectului `Array` la care ai acces prin moștenire.

```javascript
'length' in [1,2,3,4]; // true
```
