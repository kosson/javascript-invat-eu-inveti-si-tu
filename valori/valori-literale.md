# Literale

Valorile literale sunt valorile oferite în mod direct programului, fiind declarate prin însuși caracterul(ele) corespondent(e). Pe scurt, valoarea trei, ca să fie înțeleasă ca număr pentru computer, trebuie să fie introdusă folosind caracterul `3` a setului de caractere latin. Corect? De aici și denumirea lor de literale. Literalele oferă mecanismul cel mai simplu pentru a crea valori.

```javascript
3;      // spuf! iaca trei
'trei'; // zbang! iaca text
```

Te întrebi pe bună dreptate cum face diferența motorul JavaScript între **identificatori** și **valorile literale** de tip șir de caractere. Ambele sunt șiruri de caractere, nu? Pentru ca un șir de caractere să devină un literal, acesta are nevoie să fie încadrat între ghilimele simple sau duble: `var ceva = 'ceva';`. Dacă ar fi menționat fără ghilimele, ar fi o legătură realizată de un identificator la un alt identificator: `var ceva = altceva;`.

Acum, o situație interesantă pe care sunt sigur că ai sesizat-o. De ce pentru literalele cifre, nu este nevoie de ghilimele. Răspunsul vine din limitele pentru scrierea identificatorilor. Aceștia nu au voie să înceapă cu o cifră. Logic, nu? Și de aici e opțiunea simplă a motorului care face diferența fără a fi necesare ghilimele. Atenție, dacă pui o cifră între ghilimele, ceea ce este perfect ok, aceasta nu mai este un număr, ci un simplu caracter dintr-un șir text.

În continuare, vom trata valorile indicând acolo unde este necesar faptul că valoarea este precizată printr-un literal.

### Literal `null`

Avem unul singur și acesta este cuvântul rezervat `null`.

### Literale `boolean`

Avem cele două variante `true` și `false`.

Acum, vom purcede la a împușca doi iepuri deodată. Mă refer la faptul că în afară de a declara valori literale, valorile pot fi create prin instanțierea obiectul corespondent tipului de valoare. Ești în ceață? Hai să o lămurim. JavaScript este un limbaj orientat pe obiecte. Am lămurit treaba asta mai demult, dar este necesar să o repetăm pentru argumentație. Din start sunt disponibile niște obiecte interne, niște constructori de fapt.

**Moment Zen**: Constructorii sunt funcții-obiect interne limbajului, care prin invocare creează obiecte de tipul numelui funcției respective.

Printre aceste obiecte, se află și cele care permit crearea de valori la momentul în care le instanțiezi folosind operatorul `new`. Un exemplu scurt și trecem mai departe. Dacă dorim să introducem valoarea trei, valoarea literală pur și simplu permite să declari caracterul `3;`. Dar pentru că există un obiect intern corespondent, ai putea să generezi aceeași valoare instanțiind obiectul intern cu ajutorul cuvântului cheie `new` după cum urmează: `new Number('3');`.

Complicat? Nu cred. Dacă ești amețit nițel, reține acum că pentru fiecare valoare literală numerică, există un obiect intern pe care-l poți folosi pentru a obține același lucru. Este vorba despre *împachetarea* despre care am vorbit.

Iată, pentru valorile boolean, există un constructor, de fapt o funcție, care invocată prin operatorul `new` creează un obiect. Există o eroare teribilă în a cărei plasă poți cădea dacă nu ești atent. Aceea ar fi confundarea valorilor generate prin folosirea constructorilor, acestea fiind obiecte, cu valorile literale. Nu uita, folosirea unui constructor, adică instanțierea sa cu operatorul `new` rezultă în crearea unui obiect, nu a unei valori literale. Poți testa acest lucru evaluând identificatorul cu operatorul `typeof`.

```javascript
var bool = new Boolean(true); // true
typeof bool; // "object"
```

### Literale numerice

Valorile numerice sunt caracterele a căror interpretare conduce la înțelegerea de către computer a faptului că introduci o valoare numerică. O valoare numerică exprimată printr-un literal va fi întotdeauna rotunjită atunci când este evaluată.

În cazul în care avem valori zecimale, acestea pot fi reprezentate și dacă încep cu 0. Important este că cifra care urmează să nu fie sub 8 pentru căci în acest caz este interpretat ca fiind un octal.

Care sunt numerele pe care le poți introduce ca literale.

-   Întregii binari precum `0b` (litera `b` poate fi introdusă și ca majusculă).
-   Digiții binari clasici: `0` și `1`.
-   Valorile octale scrise ca zero urmat de `o` - `0o` sau zero urmat de `O` - `0O`. Valorile numerice care urmează secvenței `0o` nu trebuie să fie mai mari de 7.
-   Întregi hexazecimali precum `0x` sau `0X`.

```javascript
var unBinar = 0b0010000011000000111100001100000;
console.log(unBinar); //274757728
var unOctal = 0o644; console.log(unOctal); //420
var unHexa = 0x24443AD; console.log(unHexa); //38028205
```

Odată cu valorile numerice poți menționa și exponenții: `e` sau `E`.
Poți scrie semnul minus care să indice cu care valoare de pe axa numerelor se operează: `-10` și `10`, de exemplu.

## Literale șir de caractere

Standardul spune că un șir de caractere literal este „șirul constituit din zero sau mai multe puncte de cod Unicode cuprinse între ghilimele simple sau duble”.

Sunt pur și simplu siruri de caractere care pot fi introduse în mod direct cu ajutorul ghilimelelor.

```javascript
'ceva';
"altceva";
'\u221E'; //"∞" o secvență Unicode
```

## Literalul obiect

Inițializarea unui obiect este o sarcină simplă folosind literalul corespunzător. Pur și simplu folosești acoladele între care pui perechile de chei-valori și cam asta e.

```javascript
var obi = {unu: 1, este: true};
```

Începând cu ECMAScript 2015 se poate folosi și notația prescurtată dacă numele identificatorilor sunt aceleași cu cele ale proprietăților.

```javascript
var unu = 1, este = true;
var obi = {unu, este};
console.log(obi); // {"unu":1,"este":true}
```

Obiectele au și ele obiectul de împachetare corespondent care poate fi instanțiat prin apelarea cu `new` a constructorului `Object`.

```javascript
new Object();
```

## Literalul array

În cazul array-urilor, forma literală pentru constituire este lista elementelor introdusă între paranteze pătrate.

```javascript
var arr = ['unu', 2, true];
```

Obiectul de împachetare este `Array` iar instanțierea acestuia cu `new` crează un array.

```javascript
new Array('unu', 2, true);
```

## Literal RegExp

Ca să nu fii confuză, RegExp este o parte importantă a rutinelor de lucru cu șiruri în oricare limbaj de programare. RegExp înseamnă regular expressions iar utilitatea sa este dovedită prin capacitatea de a face regăsiri într-un șir de caractere, care poate fi de orice dimensiuni (o carte, de exemplu). După cum intuiești, RexExp este foarte puternic ca și capacitate de a căuta după cuvinte cheie, expresii, succesiuni de caracteer, ce să mai, șabloane aranjate și construite după cele mai fanteziste reguli. Dar și aceste șabloane, trebuie specificate cumva. Uneori le poți introduce într-o variabilă iar în cazul literalelor, le putem specifica direct.

```javascript
/a+b/g; //sau
/^a+b$/g;
```

Obiectul de împachetare este `RegExp` și instanțierea sa cu `new` produce un obiect.

```javascript
new RegExp('^a+b$', 'g');
```

## Literalul funcțiilor

Pentru a înțelege faptul că funcțiile au literalul lor, trebuie să înțelegem un lucru foarte simplu. În JavaScript, funcțile sunt valori.

```javascript
function () { return true };
```

O funcție are și ea la rândul ei un obiect de împachetare și poate fi creată prin invocarea cu `new`.

```javascript
new Function('return true');
```

### Marcaje și delimitări în șiruri

Acestea sunt: `'` (ghilimele simple), `"` (ghilmele duble), `\b`, `\f`, `\r`, `\n`, `\t`, `\v`. Pentru digiții zecimali este marcajul care indică că următoarea secvență de caractere este un număr zecimal: `x`, `u`. Pentru valorile hexazecimale este `x`. Secvențe de escape pentru Unicode: `u` sau `u{ }`.

## Template Literal - text șablon

Începând cu ECMAScript 2015 avem un mod suplimentar de a lucra cu fragmente de text și acesta este numit **template literal** - *șabloane literale*. Chestia extraordinară este că permite introducerea de expresii care pot fi evaluate folosind secvența `${identificator sau expresie}` și lucrul cu fragmente de text pe mai multe rânduri. Pentru a construi un template string punem tot textul nostru între două <code>&#96;</code>, care este caracterul pentru reprezentarea **accentului grav** (*grave accent*, în engleză). Acest caracter mai este denumit în limba engleză și **backtick**.

Acestea este semnul distinct care spune motorului JavaScript că se pot interpola rezultate ale evaluării unei expresii folosind combinația dollar-acolade precum în: `${oVariabilaSauExpresie}`.

```javascript
var ceva = `ceva text ${numeIdentificator}`;
```

*Șabloanele literale* (template literal) sunt un pas evolutiv important dacă ne gândim la faptul că până acum trebuia să apelăm la concatenare pentru a introduce într-un șir de caractere rezultatul evaluării unor expresii. Acest lucru introduce un nivel suplimentar de calcul pentru că motorul trebuia mai întâi să analizeze dacă nu cumva este vorba despre o adunare. Așa, folosind *șabloanele literale*, lucrurile sunt clare.

```javascript
var a = 5, b = 10;
console.log("Cinsprezece este suma " + (a + b) + " și\nnu " + (2 * a + b) + ".");
// este echivalent cu:
console.log(`Cinsprezece este suma ${a + b} și\nnu ${2 * a + b}.`);
```

Un aspect foarte util este că poți redacta fragmentele de cod pe mai multe rânduri fără a folosi `\n`.

```javascript
let ceva = `Acesta este un
fragment de text
pe trei rânduri`;
```

O formă și mai avansată de *șabloane literale* (template literal) este cea numită `tagged template literals` - **literale șablon cu etichetă**. Un simplu exemplu:

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

Primul argument al funcției care va face interpolarea este unul dedicat șirurilor de caractere în care vor fi inserate valorile. Aceste fragmente de text sunt aduse în mediul lexical al funcției ca un array. Fiecare element al acestui array este un fragment de text până la limita la care apare interpolarea valorii. Al doilea argument este cel căruia îi va fi atribuit prima expresie care va genera o valoare pentru prima interpolare.

Există un exemplu și mai elaborat care permite introducerea unui șablon ca argument al unei funcții cu fiecare loc de substituire numerotat, iar aceasta, la rândul său, returnează o alta care va accepta drept argumente valorile ce vor completa șablonul.

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
