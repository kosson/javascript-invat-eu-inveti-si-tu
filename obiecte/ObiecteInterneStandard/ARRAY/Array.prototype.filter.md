# Array.prototype.filter()

Returnează un array care conține valori ce au trecut de verificările unei funcții callback.
Face parte integrantă din paradigma „programării funcționale” alături de `map()` și `reduce()`.

```js
var data = [ "bar", "foo", "", 0 ],
    filtered = data.filter(function( item ){
      return !!item;
    });
console.log( filtered ); // ["bar", "foo"]
```

Și o filtrare a valorilor unui array cu obiecte.

```js
var colectie = [
  {nume: "ISS", tip: "statie"},
  {nume: "Soyuz", tip: "vehicul"},
  {nume: "Atlantis", tip: "vehicul"},
  {nume: "Ariane", tip: "propulsor"}
];

var existaElementul = function(element, obiect){
  return obiect.tip === element;
};

var elementeComune = colectie.filter(function(obiect){
  return existaElementul('vehicul', obiect);
});

console.log(JSON.stringify(elementeComune, null, 2));
```

Poate fi folosit cu mare succes și în funcții recursive.
