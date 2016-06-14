Este o funcție care se apelează pe sine însăși până când lovește o limită.

Exemplu simplu:

```js
var scad = function(numar){
  if(numar === 0) return;
  console.log(numar);
  scad(numar - 1);
}

scad(10);
```

Varianta ECMAScript 2015

```js
var scad = (numar) => {
  if(numar === 0) return;
  console.log(numar);
  scad(numar - 1);
};

scad(10);
```

Un exemplu ceva mai complex, care construiește un arbore de categorii și subcategorii dintr-o structură liniară. Exemplu a fost adaptat după cel oferit de mpj (Mattias Petter Johansson) în al său mic tutorial video: [Recursion - Part 7 of Functional Programming in JavaScript](https://www.youtube.com/watch?v=k7-N8R0-KY4)

```js
var colectie = [
  {cat: 'trunchi', parinte: null},
  {cat: 'ramura1', parinte: 'trunchi'},
  {cat: 'ramura2', parinte: 'trunchi'},
  {cat: 'frunza', parinte: 'ramura1'}
];

// #1 definirea unei funcții care are rolul de a construi o structura arborescentă care este returnată
var generator = function(colectie, parinte){
  // #2 declara obiectul care va fi returnat
  var nod = {};

  // #3 filtram colectia și căutăm elementul rădăcină mai întâi
  colectie
    .filter(function(obi){            // argumentul obi reprezintă un rând, un obiect din array-ul de obiecte
      return obi.parinte === parinte; // daca parinte este null, (true)
    })                                // returnează obiectul cu parinte: null
    .forEach(function(obi){           // pe obiectul returnat {cat: 'trunchi', parinte: null} fă un forEach
      return nod[obi.cat] = generator(colectie, obi.cat); // introdu în obiectul nod numele categoriei și aplică din nou funcție
    });                               // de aceasta dată pasand originea, adica parintele, numele categoriei din obiectul provenit prin filter

  return nod;
};

console.log(JSON.stringify(generator(colectie, null), null,2)); // apeleaza generatorul pasand colectia si elementul radacina, cel care are părintele null
```
