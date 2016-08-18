# Execuție secvențială

Felul în care rulează un program se numește „control flow”.
Execuția secvențială este un șablon de execuție asincronă.
Șablonul este folosit doar atunci când se știu exact sarcinile și cum vor fi executate. 

Executarea secvențială înseamnă că fiecare sarcină este executată o singură dată, iar toate sarcinile stau într-o anumită ordine. Rezultatul unei sarcine devine inputul următoarei.

Un posibil model este:

```js
function sarcina1(cb){
  opAsync(function(){
    sarcina2(cb);
  });
};

function sarcina2(cb){
  opAsync(function(){
    sarcina3(cb);
  });
};

function sarcina3(cb){
  opAsync(function(){
    cb(); // execuția callback-ului.
  });
};

sarcina1(
  console.log(S-a executat sarcina 1, 2 și 3);
  // este callback-ul  final, care se va executa după ce toate celelate se vor executa.
);
```

Șablonul pune accent pe modularizarea sarcinilor. Acest șablon de lucru arată și faptul că nu este nevoie de a gestiona codul prin closure-uri. Atenție fiecare closure taxează memoria.
