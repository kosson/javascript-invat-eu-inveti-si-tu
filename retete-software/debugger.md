# enunțul `debugger`

Pentru a crea un punct de oprire pentru analiza codului care produce erori, se poate introduce înainte de zona care face probleme.

```javascript
function test(){
  a = 1;
  debugger;
  x();
};
```

Efectul introucerii enunțului este că se pornește automat instrumentul de debugging al browserului.
