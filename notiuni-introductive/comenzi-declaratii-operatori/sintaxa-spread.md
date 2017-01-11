# Sintaxa spread `...`

Permite expandarea unei anumite expresii într-un array.

Această sintaxă poate fi folosită în cazul argumentelor funcțiilor, dar și pentru array-uri.

```javascript
// simplu
function faCeva(...x){
  console.log(x); // Array [ 1, 2, 3, "unu" ]
}; faCeva(1,2,3,'unu');
// împreună cu alte argumente, spread-ul trebuie să fie ultimul
function faAltceva(x, ...y){
  console.log(x, y);  // 1 și apoi este afișat Array [ 2, 3, "unu" ]
}; faAltceva(1,2,3,'unu');
```

În cazul array-urilor următorul exemplu vorbește de la sine. Atenție, aici este folosită sintaxa spread.

```javascript
var culorileLipsa = ['oranj', 'galben'];
var curcubeu = ['rosu', ...culorileLipsa, 'verde', 'albastru', 'indigo', 'violet'];
console.log(curcubeu); // Array [ "rosu", "oranj", "galben", "verde", "albastru", "indigo", "violet" ]
curcubeu.push('?');    // chiar poți să introduci valori noi în array-ul creat
console.log(curcubeu); // Array [ "rosu", "oranj", "galben", "verde", "albastru", "indigo", "violet", "?" ]
```

O aplicație utilă este completarea unui array existent.

```javascript
var arr1 = ['a','b'],
    arr2 = ['c','d'];
arr1.push(...arr2); // returnează automat numărul elementelor (length)
arr1; // Array [ "a", "b", "c", "d" ]
```

Operatorul spread `...` nu se poate utilizare decât pentru obiectele care sunt iterabile (vezi obiectul intern Symbol).
