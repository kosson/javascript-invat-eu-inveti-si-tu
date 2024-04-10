### Set.prototype.forEach(callbackFn\[, thisArg])

Această metodă va executa o funcție cu rol de callback pentru fiecare element din `Set`. Opțional se poate trimite un al doilea argument și anume un obiect care să fie considerat a fi `this` de fiecare dată când funcția se execută.

Funcția callback se va apela cu următoarele argumente:

-   valoarea element din set,
-   cheia elementului și
-   setul care va fi traversat.

Într-un obiect `Set` nu există chei, dar pentru a fi asigurată compatibilitatea cu `forEach`, intern există un mecanism de evidență folosit în mod similar lui `Map` și lui `Array`.

Dacă nu este pasat un obiect care să fie folosit drept `this`, atunci este pasat automat `undefined`.