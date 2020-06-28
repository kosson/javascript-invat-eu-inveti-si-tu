# WeakSet

Acest obiect permite introducerea de obiecte într-o colecție.

Un obiect apare o singură dată într-un `WeakSet`. Toate obiectele din `WeakSet` sunt unice. Spre deosebire de colecțiile realizate cu `Set`, un `WeakSet` este o colecție care admite doar obiecte.

Atributul de slab vine din faptul că în cazul în care nu mai sunt referințe către obiectele din set, acestea vor fi colectate la gunoi. Acest lucru mai implică și faptul că nu există o listă a obiectelor aflate în colecție.

Fiți foarte atenți pentru că obiectele `WeakSet` nu sunt enumerabile.

## Constructorul

Pentru a genera un `WeakSet` rapid, se poate pasa constructorului `WeakSet` un obiect iterabil, care va transforma elementele acelui iterabil în membri ai `WeakSet`-ului.

```javascript
 const WS = new WeakSet([{a: 1}, {b: 2}]);
```

## Metode

### `WeakSet.prototype.add(obiect)`

Adaugi un obiect în `WeakSet`.

### `WeakSet.prototype.delete(obiect)`

Elimini un obiect din `WeakSet`.

### `WeakSet.prototype.has(obiect)`

Investighezi dacă un obiect se află deja în `WeakSet`.
