# Intl.Collator

Acest constructor permite instanțierea unor obiecte utilizate pentru a compara șiruri de caractere (glife) în contextul unor limbi diferite. `Intl.Collator()` poate fi apelat cu `new` sau fără. Pentru a lucra în cele mai bune condiții cu acest API, în cazul limbii române, asigurați-vă că aveți instalat suportul de localizare a sistemului de operare.

## Parametri

### locales

Este un șir de caractere sau un array al acestora, fiecare fiind o reprezentare a unui tag de limbă. Este permisă introducerea unor chei specifice Unicode-ului. Tot aceste chei specifice pot fi introduse distinct în obiectul `options` ca valori ale proprietății `collation`. Când acest lucru este făcut, ceea ce este precizat în acest obiect are întâietate.

#### Chei Unicode care sunt permise

**co** care specifică variantele anumitor localizări (*collation*). De exemplu:

- `big5han`  (chineză; nu este disponibil în Chrome sau Edge)
- `compat`   (arabic)
- `dict`     (sinhala)
- `direct`   (este abandonat, a nu se folosi)
- `ducet`    (nu-i disponibil, a nu se folosi)
- `emoji`    (root)
- `eor`      (root)
- `gb2312`   (chineză; nu este disponibil în Chrome sau Edge)
- `phonebk`  (germană - reduce caracterele cu diacritice specifice la forma de bază, de ex. `o` fără umlaut)
- `phonetic` (lingala)
- `pinyin`   (chineză)
- `reformed` (suedeză; nu menționa acest tag pentru că este din oficiu)
- `searchjl` (coreană; nu-l folosi pentru a face sortări)
- `stroke`   (chineză)
- `trad`
- `unihan`   (chineză, japoneză și coreană; nu este disponibil în Chrome sau Edge)
- `zhuyin`   (chineză).

**kn** indică dorința de a folosi varianta numerică a caracterelor atunci când se face compararea. Valoarea este fie `true`, fie `false`. Opțiunea poate fi setată și în obiectul `options` ca valoare a proprietății `numeric`.

**kf** indică preferința sortării pornind, fie de la majuscule, fie cu cele de tipar. Valorile pot fi următoarele: `upper`, `lower` sau `false` (caz în care va fi folosită valoarea din oficiu). Valoarea poate fi setată proprietății `caseFirst` a obiectului `options`.

### options

Este obiectul de configurare pentru operațiunea de comparare. Acesta poate avea următoarele proprietăți.

**localeMatcher** precizează algoritmul după care se face căutarea în localizările care sunt disponibile runtime-ului de JavaScript. Valorile posibile sunt `lookup` sau `best fit` (valoarea din oficiu).

**usage** precizează dacă operațiunea de comparare a șirurilor de caractere este în scop de căutare sau de potrivire unu-la-unu a caracterelor. Posibilele valori sunt `sort` (valoarea din oficiu) și `search`.

**sensitivity** precizează care este elementul(ele) care realizează distincția ce ar returna un rezultat diferit de zero. Valorile posibile sunt:

- `base` care precizează faptul că doar caracterele care sunt distincte sunt considerate diferite. De exemplu, `a` este diferit total de `b`, dar `a` și cu `á` au aceeași bază, precum și în cazul `a` cu `A`;
- `accent` precizează că, diferite pot fi considerare caracterele care au litera de bază sau accentele diferite. De exemplu, `a` este diferit de `b`, `a` și cu `á` sunt socotite a fi tot diferite, dar `a` cu `A`, nu;
- `case` consideră a fi diferite șirurile a căror litere de bază sau dacă sunt comparate majuscule cu cele de tipar, vor fi considerate a fi diferite. De exemplu, `a` și cu `á` vor fi comsiderare egale, dar  `a` cu `A`, nu;
- `variant` fiind șiruri care diferă prin literele de bază, accente sau diacritice sau dacă sunt majuscule cu cele de tipar, caz în care `a` este diferit de `b`, `a` și cu `á` sunt diferite, precum și `a` cu `A`.

Valoarea din oficiu pentru `sort` este `variant`.

**ignorePunctuation** precizează dacă sau nu poate fi ignorată punctuația. Valorile posibile sunt `true` sau `false`.

**numeric** care precizează dacă compararea se va face în baza valorii numerice ce reprezintă caracterul.

**caseFirst** care precizează dacă mai întâi vei face sortare după majuscule sau nu.

**collation** le-am precizat mai sus la posibilele collations.

```javascript
console.log(new Intl.Collator().compare("a", "b")); // -1 însemnând că cele două caractere sunt diferite - valoare celui de-al doilea fiind mai mare decât primul din comparație
console.log(new Intl.Collator().compare("b", "a")); // 1 însemnând că valoarea primului este mai mare decât a celui de-al doilea
console.log(new Intl.Collator().compare("b", "b")); // 0 marcând egalitatea între cele două caractere
```

## Metode statice

### Intl.Collator.supportedLocalesOf()

Metoda returnează un array cu localizările (*language tags*) pe care runtime-ul le poate folosi din lista celor precizate drept argument fără a recurge la setarea din oficiu pentru localizare.

## Metode ale instanțelor

### Intl.Collator.prototype.compare()

Este o metodă de tip getter care este folosită pentru a compara două șiruri de caractere conform unei ordini de sortare setată pentru acest obiect `Intl.Collator`.

```javascript
const ro_collator = new Intl.Collator('ro');
ro_collator.compare('a', 'ă'); // -1 pentru că valoarea caracterului `ă` este mai mare decât a lui `a`.
// acest lucru indică faptul că `ă` va fi poziționat după `a`. Valoarea negativă înseamnă că operandul (caracterul) din stânga e mai mic ca valoare decât cel cu care este comparat
```

Metoda este foarte utilă pentru că poate fi pasată drept callback metodei `sort` a lui `Array`.

```javascript
const toponime = ["Alba", "Arad", "București", "Bacău", "Brașov", "Constanța", "Cluj-Napoca"]; // array de sortat
const ro_collator = new Intl.Collator('ro');
toponime.sort(ro_collator.compare); // ['Alba', 'Arad', 'Bacău', 'Brașov', 'București', 'Cluj-Napoca', 'Constanța']
console.log(toponime.join(', ')); // Alba, Arad, Bacău, Brașov, București, Cluj-Napoca, Constanța
```

MDN ne pune la îndemână un exemplu pentru limba germană.

```javascript
const a = ["Offenbach", "Österreich", "Odenwald"];
const collator = new Intl.Collator("de-u-co-phonebk");
a.sort(collator.compare);
console.log(a.join(", ")); // "Odenwald, Österreich, Offenbach"
```

Pentru căutare, tot un exemplu de la MDN este relevant, de data aceasta pentru limba franceză.

```javascript
const a = ["Congrès", "congres", "Assemblée", "poisson"];
const collator = new Intl.Collator("fr", {
  usage: "search",
  sensitivity: "base",
});
const s = "congres";
const matches = a.filter((v) => collator.compare(v, s) === 0);
console.log(matches.join(", ")); // "Congrès, congres"
```

### Intl.Collator.prototype.resolvedOptions()

Metoda returnează un nou obiect cu proprietăți ce reflectă localizările, precum și opțiunile aferente care au fost incluse și au produs efectele la momentul în care a fost instanțiat obiectul `Intl.Collator`. Este foarte util atunci când ai nevoie să ai o confirmare a unei setări sau pur și simplu să faci debugging.

```javascript
const numberRo = new Intl.NumberFormat('ro-RO');
let option4RO = numberRo.resolvedOptions();
console.log(JSON.stringify(option4RO));
/*
{
    "locale":"ro-RO",
    "numberingSystem":"latn",
    "style":"decimal",
    "minimumIntegerDigits":1,
    "minimumFractionDigits":0,
    "maximumFractionDigits":3,
    "useGrouping":"auto",
    "notation":"standard",
    "signDisplay":"auto",
    "roundingMode":"halfExpand",
    "roundingIncrement":1,
    "trailingZeroDisplay":"auto",
    "roundingPriority":"auto"
}
*/
```

## Resurse

- [utf8_bin vs. utf_unicode_ci | Stack Overflow](https://stackoverflow.com/questions/10929836/utf8-bin-vs-utf-unicode-ci)
- [Tastatura RO | secarica.ro](https://www.secarica.ro/index.php/en/rou/tastatura-ro)
- [Codarea în fonturi | secarica.ro](https://www.secarica.ro/index.php/en/rou/codarea-in-fonturi)
