# Mecanisme de cache pentru elemente DOM

Când ai nevoie să atașezi uni element DOM anumite funcționalități pe care le oferă o colecție de metode sau chiar un adevărat API, se va construi un registru dedicat stocării elementelor cu API-urile asociate. Acesta este un șablon des întâlnit.

```javascript
var registru = [];

function introdu(elemDOM, functionalitati){
  registru.push({element: elemDOM, prelucrari: functionalitati});
};

function cauta(elemDOM){
  for(var i = 0; i < registru.length; i++){
    if(registru[i].element === elemDOM){
      return registru[i].functionalitati;
    };
  };
};

function sterge(elemDOM){
  for(var i = 0; i < registru.length; i++){
    if(registru[i].element === elemDOM){
      registru.splice(i, 1);
      return;
    };
  };
};

function combinaElemCuFunctionalitati(elementDOM){
  // verifică dacă pentru elementul DOM există deja funcționalități
  var existent = cauta(elementDOM);
  if(existent){
    return existent;
  };
  // definești funcționalitățile pentru un anume element DOM
  functionalitati = {
    faCeva: function(){console.log('fac ceva');},
    stergeElem: sterge.bind(null, elementDOM)
  };
  // introduci în registru
  introdu(elementDOM, functionalitati);
  // și returnezi combinația curentă
  return functionalitati;
};
```

Acest șablon poate fi contras grație lui Map după cum urmează:

```javascript
function combinaElemCuFunctionalitati(elementDOM){
  var existent = registru.get(elementDOM);
  if(existent) {return existent};
  functionalitati = {
    faCeva: function(){console.log('fac ceva');},
    stergeElem: registru.delete(elementDOM);
  };
  registru.set(elementDOM, functionalitati);
};
```

E foarte eficient `Map` pentru colecții.
