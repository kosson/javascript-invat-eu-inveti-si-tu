# Folosirea lui `var` și `let`

Identificatorii declarați cu `var` beneficiază de mecanismul de hoisting prin care sunt aduși în „capul codului” (scope-ului).

`let` oferă scoping la nivel de bloc de cod - `{}`.

În cazul declarațiilor `let`, acestea nu sunt ridicate (`hoisted`) la vârful blocului. Din acest motiv, cel mai bine este ca declarațiile let să fie puse în capul blocului în mod voluntar pentru a fi disponibile în întreg blocul. O atenție deosebită trebuie dată blocurilor de decizie sau cele de ciclare a unor array-uri.

Un exemplu foarte simplu pentru a face diferența dintre modul cum acționează `var` și cum acționează `let`.

```javascript
function teste(){
  var x = 1;
  if(x === 1){
    console.log(x);
    var x = 10;
    console.log(x);
  }
  console.log(x);
}; teste(); // 1 10 10
```
În cazul lui `let`, valorile vor fi disponibile la nivel de bloc:

```javascript
function teste(){
  let x = 1;
  if(x === 1){
    // console.log(x); // ReferenceError: can't access lexical declaration `x' before initialization
    let x = 10;
    console.log(x);
  }
  console.log(x);
}; teste(); // 10 1
```

## Block-scoping în cazul buclelor

Unul din efectele directe ale hoisting-ului este efectul produs în cazul buclelor. Ceea ce se întâmplă este că variabila folosită drept contor, este ridicată prin hoisting iar efectul este că la finalul fiecărei iterații, valoarea variabilei contor este incrementată. Dar, atenție, nu este memorată separat pentru fiecare iterare. Execuția lui for s-a încheiat cu efectul că x încă există, memorând ultima valoare.

```javascript
// var x, y = [];
var x, y = [];

for(x = 0; x < 5; x++){
  console.log(x); // 0,1,2,3,4,5
  y.push(x);
};
console.log(x); // 5
console.log(y); // Array [ 0, 1, 2, 3, 4 ]
```

În cazul folosirii lui `let`

```javascript
// var x, y = [];
var y = [];

for(let x = 0; x < 5; x++){
  y.push(x);
};
console.log(x); // ReferenceError: x is not defined
console.log(y); // Array [ 0, 1, 2, 3, 4 ]
```

Pentru a exemplifica mai adânc (se va folosi closure-ul) efectele hostingului folosim o funcție care are drept scop încărcarea unui array cu funcții (nu uita, o funcție este o valoare care poate fi pasată drept argument). Acest array va fi `mapat` pentru a executa fiecare dintre ele. Se dorește obținerea unei serii de numere naturale.

```javascript
var apeluri = [];

for (var x = 0; x < 5; x++){
  apeluri.push(function(){
    return x;
  });
};

console.log(apeluri.map(function(callback){
  return callback();
})); // Array [ 5, 5, 5, 5, 5 ]
```

Ceea ce s-a întâmplat este că înainte de a se rula mappingul, variabila x a fost supusă deja mecanismului de hoisting însemnând că este în scope-ul format de funcție, nu cel al lui `for`. Ceea ce trebuie înțeles suplimentar este că încărcând array-ul cu funcții, se face un closure pe valorile din „mediul lexical” din care au fost declarate.
Dar ceea ce este de sesizat, este că rulând oricare dintre funcțiile din array sau la rând folosind `map`, accesul este făcut prin identificatorul x la valoarea ultimă ca efect al ultimei iterații ale lui for, adică 5.

Folosind în locul lui `var`, `let`, vom limita variabila la scope-ul blocului de cod în care a fost declarată.

```javascript
var apeluri = [];

for (let x = 0; x < 5; x++){
  apeluri.push(function(){
    return x;
  });
};

console.log(apeluri.map(function(callback){
  return callback();
})); // Array [ 0, 1, 2, 3, 4 ]
```

În cazul folosirii lui `let`, variabila va fi accesibilă la nivelul buclei, ceea ce înseamnă, de fapt că pentru fiecare iterație se va face un nou binding la câte o nouă variabilă x pentru fiecare dintre funcțiile încărcate în array. Fiecare dintre aceste nou create variabile va avea valaorea de la finalizarea iterației anterioare. Nu se va mai rescrie cu fiecare iterație valoarea lui x.

Mecanismul este valabil și pentru `for-in` și `for-of`.

```javascript
var apeluri = [],
    obi = {
      unu: 1,
      doi: 2
    };

for(let cheie in obi){      // funcționează bine și cu const pentru că modifici obiectul
  apeluri.push(function(){
    console.log(cheie);
  });
};

apeluri.forEach(function(functia){
  functia();
});
```

Înainte de ES6, care pune la dispoziție `let`, „fixarea” variabilei la valoarea iterației, se făcea printr-un IIFE:

```javascript
var apeluri = [];

for(var x = 0; x < 5; x++){
  apeluri.push((function(valoare){
      return function(){
        console.log(valoare);
      }
    }(x)));
};

apeluri.forEach(function(callback){
  callback();
});
```

La fiecare iterare bucla creează o nouă variabilă și o inițializează cu valoarea variabilei cu același nume de identificator din iterarea precedentă.

## Erori la redeclarare

Dacă un identificator a fost definit deja în scope, dacă se va declara o variabilă cu let folosindu-se același nume pentru identificator, va fi emisă o eroare.

## Bune practici

Folosește `const` pentru toate valorile pentru care nu se așteaptă nicio modificare și `let` în cazul în care știi clar că vor surveni modificări. Folosește `var` când ai nevoie de mecanismul de hoisting.

Declară toate variabilele necesare în capul codului / funcției în ordinea necesităților de accesare a valorilor.

În bucle folosește întotdeauna `let` ori `const` pentru a crea pentru fiecare iterație propria legătură identificator - valoare. În cazul lui `var`, vei avea acces mereu doar la ultima valoare dată de ultima iterare.
