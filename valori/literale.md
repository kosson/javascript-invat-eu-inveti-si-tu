# Literals

Literalele următoare sunt rezervate:

## Literal `null`

Avem unul singur și acesta este cuvântul rezervat `null`

## Literale `boolean`

Avem cele două variante `true` și `false`.

## Literale numerice

Sunt cifrele redactate ca atare, dar și punctul care delimitează fracțiile.
Mai sunt exponenții: `e` sau `E`.
Semnul plus și minus care să indice care valoare de pe axa numerelor.
Întregii binari precum `0b`.
Digiții binari clasici: `0` și `1`.
Valori octale: `0o` sau `0O`.
Întregi hexa: `0x` sau `0X`.

## Literale pentru șiruri de caractere

`'`, '"', `\b`, `\f`, `\r`, `\n`, `\t`, `\v`.

Pentru digiții zecimali: `x`, `u`.

Pentru hexa: `x`.

Secvențe de escape pentru UNICODE: `u` sau `u{ }`

## Template Literal Lexical Components

\` `ceva text ${numeIdentificator}` \`

## Template Literals

Începând cu ECMAScript 2015, stringurile literale pot fi numite și „șabloane literale”. Șabloanele literale oferă posibilitatea de a introduce text pus între semne backticks (\`text\`) în care se poate interpola rezultatul evaluării unei expresii folosind constructul `${oVariabilaSauExpresie}`.

```javascript
var a = 5;
var b = 10;

console.log("Cinsprezece este suma " + (a + b) + " și\nnu " + (2 * a + b) + ".");
// este echivalent cu:
console.log(`Cinsprezece este suma ${a + b} și\nnu ${2 * a + b}.`);
```

O formă și mai avansată de template-uri literale este cea numită `tagged template literals`. Un simplu exemplu:

```javascript
var a = 0.5;
var b = 10;

var stranse = `Adunarea este: ${ (a+b).toFixed(2) }, înmulțirea este: ${ a*b }`;
console.log(stranse);
```

Se pot imbrica template-urile precum în următorul exemplu:

```javascript
var oParte = 'o parte de text';
var altaParte = `Ce voi face este ${ `să unesc ${oParte}` }`;
console.log(altaParte); // Ce voi face este să unesc o parte de text
```

### Template tag

```javascript
var ceva = etichetare`Un text`;
```

În acest caz, `etichetare` este o funcție care este apelată cu datele template-ului literal care este procesat. Funcția primește datele din template ca bucăți individuale și trebuie să le combine pentru a creea rezultatul. Primul argument este chiar un array iar cel de-al doilea este un `rest arguments`.

```javascript
let atribut = 'foarte bun',
    procent = '100',
    ceva = eticheta`Un text ${atribut} cu ${procent}% suspans pentru ${(procent*0.23).toFixed(4)} emoții.`;

function eticheta(corp, ...inputuri){
  console.log(corp, inputuri);
};
// ["Un text ", " cu ", "% suspans pentru ", " emoții." ]
// [ "foarte bun", "100", "23.0000" ]
```

Funcția `etichetare` primește următoarele argumente:

- un array identificat prin `corp` care conține următoarele:
  - șirul de caractere de dinaintea primei înlocuiri (în cazul în care se începe cu o înlocuire acesta este un șir gol `""`),
  - șirul de caractere de după prima înlocuire,
  - și în continuare șirurile de după fiecare înlocuire dacă ar mai fi.
- și un array `inputuri`, care conține valorile care vor fi evaluate pentru a fi inserate în șablon
  - primul element este `foarte bun`,
  - al doilea este `100`
  - iar al treilea este valoarea evaluată pentru `(procent*0.23).toFixed(4)`, care este 23.0000

Avantajul folosirii acestor șabloane interactive este că permit recombinarea rapidă a șirurilor în interiorul funcției cu rol de etichetă pentru șablon. În interiorul funcției, având acces la toate părțile componente ale șirului, acestea pot fi recombinate după nevoie.

Trebuie reținut faptul că în funcția etichetă, intră valorile evaluate deja ale expresiilor din șablon.
