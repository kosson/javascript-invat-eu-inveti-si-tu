# Noțiuni legate de cronometrare și întârziere

Atenție! Timerele/cronometrele lucrează și ele în același fir de execuție a JavaScriptului. Astfel, intervalele de întârziere nu sunt garantate. Pentru a înțelege acest lucru, vezi secțiunea dedicată event loop-ului.

```js
let identificator = setTimeout(callback, 2000);
```

`setTimeout` inițiază un singur cronometru, care după ce intervalul s-a scurs, va invoca funcția. Funcția în sine returnează un identificator. Datorită identificatorului, vom putea întrerupe ciclul de măsurare a cronometrului.
Timpul se măsoară în milisecunde, astfel că 2000 de milisecunde = 2 secunde.
Pentru a opri, se folosește `clearTimeout(identificator)`.

```js
let identificator = setInterval(callback, 2000);
```

Diferența dintre setTimeout și set Interval este că `setInterval` apelează funcția la nesfârșit odată la intervalul de timp specificat, dacă nu este întreruptă execuția.
Pentru a opri, se folosește `clearInterval(identificator)`.
