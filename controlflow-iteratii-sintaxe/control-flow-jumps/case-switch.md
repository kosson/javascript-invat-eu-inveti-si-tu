# Instrucțiunea switch...case

Dacă în cazul folosirii instrucțiunii `if...else` ai de ales între două sau mai multe opțiuni folosind `else if`, în cazul lui `switch` lucrurile stau diferit, fiind permisă o ramificare mult mai largă. Dar există o limitare. În cazul instrucțiunii `case`, evaluarea se va face pentru o valoare clară.

Pentru a înțelege mai bine `switch`-ul, poți să-ți imaginezi că te afli într-o mașină care rulând pe o autostradă se apropie de un nod care permite schimbarea destinației. Șoferul (expresia din `switch`) se uită cu atenție la toate indicațiile panourilor aflate deasupra fiecărei porți (porțile sunt `case`-urile). O poartă indică accesul către Pitești, o alta indică accesul către Câmpina, iar alta indică accesul către Buzău și Brăila. Dacă nu se optează pentru o anume direcție, șoferul nostru poate continua drumul său tot înainte (`default`). Șoferul poate opta pentru una dintre porți (`case`-uri) sau să continue pe direcția sa (`default`). Este cazul în care valoarea primită de `switch` nu se potrivește cu nicio variantă posibilă. Opțiunea `default` este opțională. Odată ce a fost făcută o opțiune, parcursul se încheie prin atingerea destinației (`break`).

În cazul lui `switch` condiția este o expresie, care trebuie să fie evaluată obținându-se o valoare. De îndată ce evaluarea s-a încheiat, valoarea va avea un caz corespondent în opțiunile definite prin `case`. Mai simplu, pentru tot ce ar putea ieși ca valoare în urma evaluării din `switch`, începe execuția unui set de expresii în primul `case` corespondent. Atenție, `case` nu poate evalua o expresie, ci doar o valoare. Execuția expresiilor este încheiată printr-un `break`, un `return`, un `continue`, `throw` sau chiar prin încheierea lor fără să întâlnească comenzi de salt.

```javascript
let oValoare = ~~(Math.random() * 10);
switch (oValoare) {
  case 7 :
    console.log(`Am ${oValoare}`);
    break;
  case 8 :
  case 5 :
    console.log(`Am ${~~oValoare}`);
    break;
  default:
    console.log(`Alta: ${~~oValoare}`);
};
```

Dacă nu menționezi comanda `break` în cazul unui `case`, codul următorului va fi executat în continuare, ceea ce, de regulă nu este ceea ce îți dorești.

## O alternativă prin multi-methods

Un multi-method este o funcție capabilă să aleagă cea mai bună implementare în baza parametrilor pe care îi primește ceea ce ar conduce la concluzia că vorbim despre introducerea unui `switch` într-o funcție care ascunde implementarea.

```javascript
const serialSTM = {tip: 'revistă științifică', denumire: 'Chemical Abstracts'}; // folosit drept parametru
const monografie = {tip: 'roman de ficțiune', denumire: 'Copiii omului'}; // folosit drept parametru

// Funcțiile care preiau logica case
function prelucrareSerial (serial) {
  console.log(`Voi prelucra ${serialSTM?.denumire}`); // reprezintă codul din fiecare case statement
};

function prelucrareMonografie (params) {
  console.log(`Voi prelucra ${monografie?.denumire}`);
}

/**
 * Funcția are rolul de a cupla valoarea cu logica ce va fi executată
 * @param value {String} valoarea în baza căreia se va invoca execuția funcției ce ține logic
 * @param fn {Function} este funcția care conține logica de executat
 * @returns {Object}
 */
function method (value, fn) {
  return {value, fn};
};

/**
 * 
 * @param dispatcher {Function} este o funcție anonimă care primește drept argument obiectul produs de `method`
 * @param methods {Array} obiecte generate prin execuția lui `method`
 * @returns {Function} funcție anonimă
 */
function multiFunction (dispatcher, ...methods) {
  // funcția care este returnată este anonimă
  return (originalFn) => {
    // `originalFn` este primul argument cu care este invocat `multiFunction` este chiar multiFunction?

    return (elem) => {
      // `elem` este obiectul produs de `method`
      let key = dispatcher(elem); // `dispatcher` este `publication => publication.tip`; retunează valoarea lui `tip`
      let method = methods.find(m => m.value === key); // caută în arrayul de obiecte dacă există unui cu `value` corespondent lui `tip`

      // dacă nu a găsit
      if (!method) {
        
        if(originalFn) {
          return originalFn(elem);
        } else {
          throw new Error("Nu am cum că prelucrez opțiunea")
        }
      }
      return method.fn(elem);
    };
  };
}

let procesator = null;

/**
* Funcția procesator primește trei atribute
* @params {Function} este o funcție cu rol de dispatcher care returnează valoarea în baza căreia se alege fragmentul de logică ce trebuie executat
* @params {Function} rezultatul procesării folosind o funcție `method` pentru fiecare posibilă cale. În funcție de primul parametru al lui method, se execută al doilea
*/
procesator = multiFunction(
  publication => publication.tip, 
  method('revistă științifică', prelucrareSerial),
  method('roman de ficțiune', prelucrareMonografie)
)(procesator);

procesator(serialSTM); //?
procesator(monografie); //?
```

După cum se observă, codul pentru fiecare `case` este executat de o funcție.

## Resurse

- [Drop the Switch Statement for this Functional Programming Technique | Fernando Doglio | 24 mai 2022 | Bits and Pieces](https://blog.bitsrc.io/drop-the-switch-statement-for-this-functional-programming-technique-faa193d903ae)
- [multimethod.js - Clojure-like Multimethods in JavaScript | Kris Jordan | 15 decembrie 2011](https://krisjordan.com/blog/2011/12/15/multimethods-in-javascript)