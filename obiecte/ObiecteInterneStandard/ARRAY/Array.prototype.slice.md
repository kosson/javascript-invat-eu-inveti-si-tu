# Array.prototype.slice() - nu afectează array-ul

Slice în limba engleză se referă la a tăia, la a decupa, la a extrage o bucată. Pentru a înțelege slice, cel mai bine este să vă imaginați un croitor care măsoară stofa cu un centimetru, face semne pentru bucata pe care o dorește și apoi taie materialul.

Slice pentru array-uri este o metodă care returnează un nou array. Acesta este o copie a unei porțiuni delimitate prin argumentele pasate. Slice nu alterează array-ul original în niciun fel.

Ca parametri acceptă:
- indexul de la care să pornească.
- indexul la care să se oprească

Dacă indexul de pornire este o valoare negativă, atunci se va porni de la finalul array-ului spre indexul 0. Dacă nu este menționat indexul (`undefined`), atunci `slice` pornește de la 0. Dacă nu se menționează capătul, atunci va „tăia” până la capăt.

ATENȚIE! Slice se duce până la limita menționată, dar nu include și valoarea de la indexul menționat.

Menționarea unui index negativ indică limita către coada listei. De exemplu, un slice(2, -1), va extrage începând cu al treilea element până la penultimul element.

Această metodă este folosită și pentru a converti obiecte care seamănă cu array-urile în Array-uri noi. Pur și simplu se face un binding al metodei la obiect. Cel mai folosit exemplu este cel al folosirii lui slice() pentru a transforma `arguments` într-un array:

```js
var converteste = function(){
  return Array.prototype.slice.call(arguments);
};
var unArrayNou = converteste(1, "ceva", 23); // Array [ 1, "ceva", 23 ]
```

În loc de `Array.prototype.slice.call(arguments)` se poate folosi pur și simplu `[].slice.call(arguments)`.

```js
var converteste = function(){
  return [].slice.call(arguments);
};
var unArrayNou = converteste(1, "ceva", 23); // Array [ 1, "ceva", 23 ]
```

![](slicingArrayuri.svg)
