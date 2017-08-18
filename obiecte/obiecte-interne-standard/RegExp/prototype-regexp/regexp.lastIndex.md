# `regexp.lastIndex`

Această proprietate poate fi setată doar dacă se va face o căutare având fanionul global menționat. Setarea proprietății se face cu o valoare numerică care indică indexul din șirul de caractere de la care să se pornească căutarea.

Există câteva reguli pe care „lastIndex” le respectă atunci când este menționat.

- dacă numărul este mai mare decât valoarea actuală a indexului șirului de caractere, atunci căutările întreprinse cu metodele `test()` și `exec()` se vor solda cu un eșec.
- dacă valoarea lui `lastIndex` este egală cu cea a șirului, iar în regulile șablonului apare și cea că se va căuta și după un șir vid, atunci căutarea chiar începe de la valoarea lui `lastIndex`. În cazul în care nu avem regulă de potrivire cu șir vid, valoarea lui `lastIndex` va fi resetată la 0.
- în orice altă formulă valoarea lui `lastIndex` va fi cea a indexului imediat de după ultima potrivire din șirul de caractere. De aici îi vine și numele de „ultimulIndex” - ultimul index după ce a fost făcută ultima potrivire în acord cu regulile.

```javascript
var șablon = /(ac)?/g;
console.log(șablon.exec('acum'));
console.log(șablon.lastIndex);
/*
Array [ "ac", "ac" ]
2
*/
console.log(șablon.exec('acum'));
console.log(șablon.lastIndex);
/*
Array [ "", undefined ]
2
*/
```
