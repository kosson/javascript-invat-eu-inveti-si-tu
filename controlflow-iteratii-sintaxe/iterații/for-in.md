# for... in

Declarația iterează proprietățile unui obiect, cele care sunt setate ca `enumerabile`, iar pentru fiecare dintre valorile proprietăților iterate, se poate aplica o funcție sau se poate executa cod.

## Iterarea cheilor proprii, dar și cele din constructor

Trebuie reținut faptul că iterarea folosind `for...in` ia în calcul și cheile contructorului. Pentru izolarea iterării doar pe cheile proprii ale obiectului fără cele moștenite, se va folosi verificarea cu metoda `hasOwnProperty`.

```javascript
let prop;

function Puf(){
  let intern = 100;
  this.spuf = 1000;
};

let ceva = new Puf();
ceva.proprietate = 10;
ceva.proprietate2 = 11;

for(prop in ceva){
  if(ceva.hasOwnProperty(prop)){
    console.log(prop + ': ' + ceva[prop]);
  };
};
```

În cazul instanțierii cu `new`, tot ce este declarat în `this`, va fi inclus în iterațiile cu `for...in`.

## Parcurgerea cheilor care aparțin strict obiectului.

```javascript
var obj = {name: 'Ionel', varsta: 23, meserie: 'zugrav', creativ: true};
// var obj = ['Valeriu', 43, 'arhitect', true];

for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(obj[prop]);
  }
};
/**
 * Ionel
 * 23
 * zugrav
 * true
 */

```

Funcționează și cu array-urile pentru că, de fapt și array-urile sunt tratate ca niște obiecte.

## Gestionarea variabilei contor

Atunci când se folosește `var`, dar care a fost declarat în afara blocului de inițializare. Această variabilă va trimite la final către ultima valoare generată din ciclare.

```javascript
var i;
var colectie = {
  unu: 'unu',
  doi: function(){console.log(this.unu);}
};

for(i in colectie){
  console.log(colectie[i]);
};
```

Folosirea lui `let` va avea ca efect creare variabilei pentru toate iterațiile. Asta înseamnă că pentru toate iterațiile se creează câte o variabilă care ține minte propria valoare generată per iterație.

```javascript
var colectie = {
  unu: 'unu',
  doi: function(){console.log(this.unu);}
};

for(let i in colectie){
  console.log(colectie[i]);
};
```

## Bune practici

Nu folosi `for...in` pentru array-uri. Un motiv foarte bun este acela că ai putea avea de-a face cu array-uri sparte.

```javascript
var arr = [];

arr[8] = 'o valoare';
console.log(arr); // Array [ <8 empty slots>, "o valoare" ]

for(var elem in arr){
  console.log(elem);
}; // 8
```

Acest rezultat este datorat faptului că array-ul este tratat precum un obiect pentru care doar cheia 8 are o valoare. Această cheie este returnată.
