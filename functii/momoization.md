# Memoization

Construirea unei funcții care să țină minte valorile computate anterior. Ori de câte ori o funcție ajunge la un rezultat îl introduce în argumente. Astfel, ori de câte ori apare o invocare cu un același set de argumente, se va returna rezultatul fără a se mai face computația.

```js
function cautaCeva(valoare){
  if(!cautaCeva.rezultate){
    cautaCeva.rezultate = {}; // construiești o „memorie” a rezultatelor
  }
  if(cautaCeva.rezultate[valoare] !== undefined){
    return cautaCeva.rezultate[valoare];  // daca stringul căutat se află în „memorie”, va fi returnat
  }
  return cautaCeva.rezultate[valoare] = valoare;
};
cautaCeva("ceva"); // "ceva"
cautaCeva("altceva") // "altceva"
cautaCeva.rezultate; // Object { ceva: "ceva", altceva: "altceva" }
```
