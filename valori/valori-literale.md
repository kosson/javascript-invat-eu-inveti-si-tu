# Valorile literale

Valorile literale sunt cele care sunt oferite în mod direct programului, fiind menționate prin reprezentarea lor literală mijlocită de caracterele aferente. Pe scurt, valoarea trei, ca să fie un număr pentru limbajul de programare, trebuie să fie introdusă folosind caracterul 3. Corect? De aici și denumirea lor. Literalele pur și simplu îți oferă mecanismul cel mai simplu pentru a crea valori.

```javascript
3;      // spuffff! iaca trei
'trei'; // zbang! iaca text
```

Știu la ce te gândești!
Te întrebi pe bună dreptate cum face diferența motorul JavaScript între **identificatori** și **valorile literale** de tip șir de caractere. Ambele sunt șiruri de caractere, nu? Da! Dar pentru ca un șir de caractere să devină un literal, acesta are nevoie să fie încadrat între ghilimele simple sau duble: `var ceva = 'ceva';`. Dacă ar fi menționat fără ghilimele, ar fi o legătură realizată de un identificator la un alt identificator; `var ceva = altceva;`.

Acum, o situație interesantă pe care sunt sigur că ai sesizat-o. De ce pentru literalele cifre, nu este nevoie de ghilimele. Răspunsul vine din limitele pentru scrierea identificatorilor. Aceștia nu pot fi scriși începând cu cifre. Cââât de simplu! Și de aici e opțiunea simplă a motorului care face diferența fără a fi necesare ghilimele. Atenție, dacă pui o cifră între ghilimele, ceea ce este posibil, aceasta nu mai este un număr și un simplu caracter.

Literalele următoare sunt rezervate de sistem pentru sine. Că să fiu mai clar, aceste cuvinte ale limbii engleze sunt rezervate de JavaScript pentru a le recunoaște și înțelege ca valori.

### Literal `null`

Avem unul singur și acesta este cuvântul rezervat `null`

### Literale `boolean`

Avem cele două variante `true` și `false`.

### Literale numerice

Sunt cifrele redactate ca atare, dar și punctul care delimitează fracțiile.
Mai sunt exponenții: `e` sau `E`.
Semnul plus și minus care să indice care valoare de pe axa numerelor: `-10` și `10`, de exemplu.
Întregii binari precum `0b`.
Digiții binari clasici: `0` și `1`.
Valori octale: `0o` sau `0O`.
Întregi hexazecimali precum `0x` sau `0X`.

### Literale rezervate pentru marcaje și delimitări în șirurile de caractere

Acestea sunt: `'` (ghilimele simple), '"' (ghilmele duble), `\b`, `\f`, `\r`, `\n`, `\t`, `\v`.
Pentru digiții zecimali este marcajul care indică că următoarea secvență de caractere este un număr zecimal: `x`, `u`. Pentru valorile hexazecimale este `x`.
Secvențe de escape pentru UNICODE: `u` sau `u{ }`

### Template Literal

Începând cu ECMAScript 2015 avem un mod suplimentar de a lucra cu fragmente de text și acesta este numit template literal - „șabloane literale”. Chestia extraordinară este că permite introducerea de valori variabile folosind secvența `${identificator}`. Fragmentul de text, să-l numim corect **sir de caractere** este pus între semnele backticks (\`text\`). Acestea spun motorului că se pot interpola rezultate ale evaluării unei expresii folosind dollar și acolade: `${oVariabilaSauExpresie}`.

```javascript
var ceva = `ceva text ${numeIdentificator}`;
```

Înainte să existe această opțiune, interpolarea se făcea prin plasarea fragmentelor de text între ghilimele fiind nevoie de o concatenare cu operatorul plus.

```javascript
var a = 5, b = 10;

console.log("Cinsprezece este suma " + (a + b) + " și\nnu " + (2 * a + b) + ".");
// este echivalent cu:
console.log(`Cinsprezece este suma ${a + b} și\nnu ${2 * a + b}.`);
```

O formă și mai avansată de șabloane literale este cea numită `tagged template literals` - literale șablon cu etichetă. Un simplu exemplu:

```javascript
var a = 0.5, b = 10;
var stranse = `Adunarea este: ${(a + b).toFixed(2)}, înmulțirea este: ${a * b}`;
console.log(stranse);
```

Se pot imbrica șabloane, precum în următorul exemplu:

```javascript
var oParte = 'o parte de text',
    altaParte = `Ce voi face este ${ `să unesc ${oParte}` }`;
console.log(altaParte);
```

### Tagged template literals - funcții de șablonare

În acest caz, se folosește o funcție care este apelată cu datele template-ului literal care este procesat. Funcția primește datele din template ca bucăți individuale și trebuie să le combine pentru a creea rezultatul.

```javascript
var atribut = 'foarte bun',
    procent = '100';

function inlocuieste (text, atrInput, procInput) {
  var sirPanaPrimaInlocuire = text[0];
  var sirDeDupaInlocuirePanaLaUrm = text[1];
  var ceAMaiRamas = text[2];

  // în funcție poți face anumite modificari valorilor
  // care vor fi interpolate
  if (procInput == 100) {
    procInput = 'sută la sută';
  };

  return sirPanaPrimaInlocuire + atrInput + sirDeDupaInlocuirePanaLaUrm + procInput + ceAMaiRamas;
};

var transmutare = inlocuieste`Un text ${atribut} cu ${procent} încântare.`;
console.log(transmutare);
```

Există și un exemplu mai elaborat care permite introducerea unui șablon ca argument al unei funcții cu fiecare loc de substituire numerotat, iar aceasta, la rândul ei returnează o alta care va accepta drept argumente valorile ce vor completa șablonul.

```javascript
function zetar (sablon, ...chei) {
  return (function (...valori) {
    var setValori = valori[valori.length - 1] || {};
    var rezultat = [sablon[0]];
    chei.forEach(function (cheie, i) {
      var valoare = Number.isInteger(cheie) ? valori[cheie] : setValori[cheie];
      rezultat.push(valoare, sablon[i + 1]);
    });
    return rezultat.join('');
  });
};
var sablon1 = zetar`Am un ${0} și ${1} bani`;
sablon1('leu', 10);
// "Am un leu și 10 bani"
```
