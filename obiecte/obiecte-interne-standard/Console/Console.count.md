# Metoda `Console.count()`

Metoda numără de câte ori a fost apelat count(). Poate primi un argument care să joace rolul de etichetă.

```javascript
var x = 1;
function logUnu (x) {
  console.log(1);
  console.count('Nr. apeluri');
};
logUnu(); 1
/* Nr. apeluri: 1 */
logUnu(); 1
/* Nr. apeluri: 2 */
```
