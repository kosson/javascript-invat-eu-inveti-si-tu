# `String.prototype.repeat()`

Construiește și returnează un string nou făcut din concatenarea a câte ori a fost specificat prin parametru

```js
'abc'.repeat(-1);   // RangeError
'abc'.repeat(0);    // ''
'abc'.repeat(1);    // 'abc'
'abc'.repeat(2);    // 'abcabc'
'abc'.repeat(3.5);  // 'abcabcabc' (se va converti la integer)
'abc'.repeat(1/0);  // RangeError
```
