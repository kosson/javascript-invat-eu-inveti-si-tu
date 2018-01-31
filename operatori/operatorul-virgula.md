# Operatorul virgulă - comma

Folosirea acestui operator pentru acțiunea sa asupra operanzilor este rară și se poate apela la el atunci când se dorește forțarea evaluării tuturor expresiilor delimitate de acesta.

Evaluarea se face de la stânga la dreapta. Vorbim despre asociativitate stângă. Evaluează operandul dinainte și cel de după. Va returna valoarea celui din RHS (***right hand side***), a celui din dreapta.

```javascript
// Aceste expresii returnează erori la evaluarea cu `use strict`
1, 2, 3; // 3
x = y = 5, z = 10; // 10
x = (z += 1, z); // 11
```
Se remarcă faptul că înainte să fie returnată valoarea celui mai din dreapta operator, expresiile anterioare din înșiruire sunt evaluate și ele.

Evaluează operanzii de la stânga la dreapta.
Returnează valoarea ultimului de la dreapta.

```javascript
1,2; // 2
(15 - 1, 10 + 3); // 13
(1 + 3, 4 - 2, 5 + 5); // 10
(() => (2 + 2, 4 - 3))(); // 1; am folosit un fat arrow pentru a evalua
```

Operatorul virgulă permite evaluarea multiplelor expresii într-o singură afirmație și este returnat rezultatul ultimei expresii.

Un alt scenariu interesant ar fi în combinație cu operatorul de grupare.

```javascript
var ceva = 0;
var ramanCuCeva = (ceva = '100', console.log('Interesant!'), 'a meu!');
// console.log a fost executat la momentul inițializării
console.log(ceva, ramanCuCeva);
// 100 a meu!
```

Acest operand face posibilă declararea mai multor variabile separate prin virgulă în aceeași expresie.

```javascript
var test = 10, ceva = true, obi = {};
```

Un alt loc în care vei mai întâlni operatorul, fiind foarte util este în blocul de inițializare a enunțului `for` atunci când este nevoie de mai multe expresii opționale, fie pentru contor, fie pentru incrementor/decrementor.

```javascript
var colecție = [];
for(var i = 0, j = 5; i <= 5; i++, j--){
  colecție[i] = j;
};
console.log(colecție); // [ 5, 4, 3, 2, 1, 0 ]
```

Și mai are o aplicativitate legată de argumentele pasate unei funcții. Acest operator, delimitează argumentele.

## Referințe

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](Operatorul virgulă)
