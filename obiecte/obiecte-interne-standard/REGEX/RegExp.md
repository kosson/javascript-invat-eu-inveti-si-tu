# RegExp

Obiectul RegExp nu are propriile metode.


Șirurile de caractere în JavaScript sunt înșiruiri de secvențe de 16 biți denumite tehnic `unități de cod` (code unit) ce reprezintă, de fapt, un singur caracter. RegExp se așteaptă să lucreze cu unități de cod pe 16 biți, care reprezintă un singur caracter. Totuși începând cu ECMAScript 6, există un fanion dedicat care semnalizează RegExp că va avea de lucru cu un șir de caractere Unicode - `u`. De fapt, îi este indicat motorului faptul că trebuie să lucreze la nivel de caractere și nu la nivel de `code unit`.

```javascript
let exemplu = '𝒥';

console.log(exemplu.length); // lungimea textului este 2

// testează pentru potrivirea cu orice caracter /^.$/
console.log(/^.$/.test(exemplu)); // false, nu se face potrivirea
console.log(/^.$/u.test(exemplu)); // true, fanionul este ridicat pentru Unicode
```

Expresiile regulate sunt șabloane folosite pentru a căuta combinații de caractere în șiruri.
Expresiile regulate pot fi construite, fie cu ajutorul unui constructor, ori pot fi expresii literale în sine.

```javascript
var exempluDeRegExp = new RegExp("ab+c", "g");
var exempluDeRegExp = /ab+c/g;
exempluDeRegExp.global; // true
```

## Obiectul RegExp

Creează un obiect pentru o expresie regulată cu scopul de a realiza găsi o secvență de caractere.

```javascript
var ceCaut = /xy/i,
    cheieObiect = new RegExp('xy','g');
console.log(cheieObiect.test('xyz')); // true
console.log(ceCaut.test('xyz'));  // true
```

După cum se observă, sintaxa este: `/pattern/flags`.

`pattern`: este textul expresiei regulate.
`flags`:
- `g` - global match;
- `i` - ignore case;
- `m` - multiline - tratează caracterele ^ și $ ca și când ar lucra pe mai multe linii (adică potrivirea pe începutul și finalul fiecărei linii delimitate de \n și \r, nu numai la începutul și finalul întregului șir de caractere);
- `u` - unicode - tratează secvența ca puncte de cod în unicode;
- `y` - sticky face potrivirea numai după indexul indicat prin proprietatea `lastIndex` a expresiei regulate în șir.

```javascript
var sirCaractere = 'A fost odată',
    regex = /fost/y;

regex.lastIndex = 2;
regex.test(sirCaractere); // true
```

## Flags - fanioane

### Fanionul `i` - ignore case

Toate șabloanele de căutare construite cu RegExp sunt „atente” la caracterele introduse, făcându-se distincție clară între minuscule și majuscule. Explicația este simplă: codul de caracter nu este același.

În cazul în care au un text în care nu știi cum a fost introdus textul, fiind posibile erori sau chiar intrări ale aceleași sintagme care nu este uniformizată în ceea ce privește caracterele, acest fanion, permite regăsirea fragmentului de text indiferent de lipsa uniformității.

### Fanionul `m` - multiline

Este un fanion care va indica motorului JavaScript ca la căutarea după șablon, fiecare nouă linie de text va fi tratat pur și simplu ca un nou șir de caractere.

Să spunem că un fragment de text începe cu un caracter ales de tine sau un șablon RegExp construit de tine. Fără fanion, JavaScript va testa dacă întregul șir de caractere va începe cu acel caracter căutat, dar dacă este pus fanionul, va căuta linie cu linie în întreg șirul până când va găsi acea linie care începe cu acel caracter.

### Fanionul `g` - global

Este fanionul care spune motorului JavaScript să caute tot ce se potrivește șablonului. Fără acest fanion, va fi returnată doar prima potrivire.

## Crearea obiectului RegExp

Există două feluri prin care se poate crea un obiect RegExp: notația literală și prin constructor.

Obiectul `RegExp` se poate crea prin introducerea directă a șablonului:

```javascript
/xyz/i;
```

sau folosind constructorul care acceptă ca prim argument șablonul iar ca al doilea fanionul sau fanioanele dorite:

```javascript
new RegExp('/xyz/', 'i');
new RegExp(/xyz/, 'i');
```

## Proprietăți ale obiectului RegExp.

- `RegExp.prototype.constructor` - function RegExp()
- `RegExp.prototype.flags` - returnează un string cu fanioanele (flags) pentru obiectul curent
- `RegExp.prototype.global` - dacă fanionul `g` a fost ridicat, valoarea este `true`.
- `RegExp.prototype.ignoreCase` - dacă fanionul `i` a fost ridicat, valoarea este `true`.
- `RegExp.prototype.multiline` - dacă fanionul `m` a fost ridicat, valoarea este `true`.
- `RegExp.prototype.source` returnează varianta text a obiectului.
- `RegExp.prototype.sticky` - dacă fanionul `y` a fost ridicat, valoarea este `true`.
- `RegExp.prototype.unicode` - dacă fanionul `u` a fost ridicat, valoarea este `true`.

## Mantre

- șirurile în JavaScript sunt imuabile (nu se modifică șirul original).
- șirurile sunt „consumate” (cu sensul de procesare) de JavaScript de la stânga la dreapta.
- din moment ce un caracter a fost „consumat”, acesta nu mai este folosit.
- expresiile regulate sunt obiecte în JavaScript.
- RegExp în JavaScript avansează caracter cu caracter, iar când a fost găsit un șir care se potrivește, caracterul este „consumat” deodată regex trecând la caracterul următor (dacă regex este global).

Aceste șabloane sunt folosite cu metodele `exec` și `test` ale obiectului RegExp.
Aceste șabloane sunt folosite cu metodele `match`, `replace`, `search` și `split` ale lui String.

Pentru a construi o expresie regulată se poate face în două moduri:

- utilizând o expresie literală care este cuprinsă între două slashuri cum ar fi: `var r = /xy+z/;`
- sau folosind o funcție constructor așa cum este obiectul RegExp: `var r = new RegExp("xy+z");`

Folosirea funcției constructor are ca efect compilarea la momentul rulării. Se va folosi constructorul atunci când se știe că șablonul se va modifica sau când nu cunoști expresia regulată, unul din cazuri ar fi construirea acesteia în mod dinamic prin acțiunea utilizatorului.

### Expresii simple

Cel mai simplu exemplu este al unui șir exact (direct match), care să fie căutat în alt șir - `/abc/`

```javascript
"sa fie: abcd".match(/abc/); // Array ["abc"]
```

Exemplul unui șir în care un anume caracter se repetă - `/ab*c/` : a este urmat de 0 sau mai mulți b

```javascript
var sir = "sa fie: abbbc";
var reg = /ab*c/;
var gasit = sir.match(reg);
console.log(gasit); // Array ["abbbc"]
```

### Expresii care oferă alternative

Un caz ar fi atunci când dorești să găsești mai multe fragmente într-un șir.

```javascript
var paginaWeb = '<a href="/undeva">resursă</a><link rel="stylesheet" href="/style.css"><script type="text/javascript" src="/js/main.js"></script>';
var identificate = paginaWeb.match(/area|a|link|script|source/ig);
console.log(identificate);
```

Este specificat să se ignore majusculele și să se facă căutare la nivel global. Fără specificarea lui g, ar fi returnat doar prima potrivire.

### Caracterele speciale din expresiile regulate

| Caracter | Semnificație | Echivalență |
|:---------|:-------------|:----------- |
| \ | indică faptul că următorul caracter are înțeles special pentru sistem (numite și „metacaractere”). Dacă caracterul este special este de înțeles pentru sistem că acesta trebuie tratat ca oricare altul fără a-l interpreta. `/a*/` înseamnă caută un a, care poate fi urmat de mai mulți a, dar `/a\*/` înseamnă caută chiar `a*`. Însuși backslashul trebuie să i se facă „escaping” pentru a fi tratat ca orice caracter simplu: `/\\/` - caută un `\`. | |
| ^ | indică faptul că se dorește căutarea cu primele caractere ale șirului. Dacă stegulețul pentru multiline este prezent (true), atunci căutarea se va face și după caracterul `line break`, adică pe următoarea linie. De exemplu `/^A/` nu va găsi nimic în „un A”, dar îl găsește pe A în „Anul viitor”. `^` are un înțeles diferit atunci când apare ca fiind primul caracter dintr-un șablon de caractere (vezi mai jos). | |
| $ | indică că se dorește căutarea pe caracterele chiar de dinaintea finalizării șirului. Dacă stegulețul pentru multiline este prezent (true), atunci căutarea se va face imediat înainte de caracterul `line break`. De exemplu, `/t$/` nu îl găsește pe „t” în „etern”, dar îl găsește în „dorit”. | |
| * | [**cunoscut ca și „cuantificator”**] indică că va face o căutare după expresia de dinaintea lui de 0 sau mai multe ori. Este echivalentul lui `{0,}`. De exemplu, `/au*/` găsește în „auuu, ce doare”, în „am găsit aur” și în „el a plecat” | {0,} |
| + | [**cunoscut ca și „cuantificator”**] precizează că se va face căutarea după expresia anterioară de una sau mai multe ori. Este echivalentul lui `{1,}`. De exemplu, `/a+/` va găsi în „casa” și în „aaaaau!”. | |
| ? | [**cunoscut ca și „cuantificator”**] Menționează faptul că se va face căutare după expresia anterioară. Rezultatul poate fi 0 sau poate apărea o singură dată. Este echivalentul lui {0,1}. `"știință".match(/n?ță?/); // [ "nță" ]` `"gablonț".match(/n?ță?/); // [ "nț" ]` `"țeavă".match(/n?ță?/); // [ "ț" ]`. Dacă se folosește imediat după cuantificatori (*, +, ?, ori {}), transformă cuantificatorul într-unul non-greedy (adică cât mai puține caractere posibil), opus comportamentului natural (găsirea a cât mai multe caractere posibil). De exemplu, `"caractere 1437675".match(/\d+/gui); // [ "1437675" ]`. Dar combinând cu ? înseamnă caută numere întregi, și adu-le rând pe rând în array-ul rezultatelor: `"caractere 1437675".match(/\d+?/gui); // [ "1", "4", "3", "7", "6", "7", "5" ]`. Acest lucru se întâmplă pentru că șirul numerelor este consumat de la stânga la dreapta iar expresia se limitează la fiecare cifră oprindu-se, apoi reia căutarea de la șirul rămas și tot așa. | {0,1} |
| . | Punctul indică o identificare a tuturor caracterelor dar fără caracterul newline. De multe ori este asemănat unui wildcard cu care poți substitui orice. Orice, mai puțin newlines. Adevăratul wildcard în regexuri este  **[\s\S]** - identifică tot ce este whitespace și tot ce nu este whitespace, pe scurt, orice. Un exemplu pentru a înțelege: `"acuma mai multe mere a anemice cam anapoda a".match(/.a/); // Array [ "ma" ]`. Dacă activezi globalul, vei avea `// Array [ "ma", "ma", " a", " a", "ca", " a", "na", "da", " a" ]`. Ceea ce este observabil este faptul că, în cazul menționat aduce litera a și una înaintea ei, dacă aceasta a fost găsită într-un cuvânt. Ordinea o dă poziția punctului. Dacă era așezat după caracterul căutat aveam `Array [ "ac", "a ", "ai", "a ", "an", "am", "an", "ap", "a " ]` | |
| \d | specifică un caracter numeric, un digit | [0-9] |
| \D | caută tot ce nu este digit și aduce un șir dacă șirul original începe cu caractere cu limita primul digit. Atenție, dacă șirul original începe cu un digit nu este adus niciun rezultat. De exemplu `"saturn4 23".match(/\D/); // Array [ "s" ]` și `"saturn4 23".match(/\D+/); // Array [ "saturn" ]` | [^0-9] |
| \s | Identifică un singur spațiu gol, incluzând spațiu, tab, form feed, line feed și alte spații din schema Unicod. De exemplu, `"ana are mere".match(/\s\w*/)` identifică `Array [ " are" ]`, deci, primul cuvânt de după primul spațiu | [ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​-\u200a​\u2028\u2029\u202f\u205f​\u3000\ufeff] |
| \S | Identifică orice caracter, dar nu și un spațiu gol. De exemplu `"ana are mere".match(/\S\w*/);` identifică `Array [ "ana" ]`. | [^ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​-\u200a​\u2028\u2029\u202f\u205f​\u3000\ufeff]. |
| \s\S | Identifică orice caracter. Este un adevărat wildcard. De exemplu: `"acuma mai multe mere a anemice cam anapoda a".match(/\s\S/)` identifică primul „m” de după primul spațiu. Adăugarea flagului g are darul de a aduce toate literele imediat de după spațiu `Array [ " m", " m", " m", " a", " a", " c", " a", " a" ]`, iar adăugarea cuantificatorului `+`, aduce în array toate cuvintele din șir: `"acuma mai multe mere a anemice cam anapoda a".match(/\s\S+/g); // Array [ " mai", " multe", " mere", " a", " anemice", " cam", " anapoda", " a" ]` |  |
| \t | Identifică un tab orizontal ||
| \r | Identifică un carriage return ||
| \n | Identifică un linefeed ||
| \v | Identifică un tab vertical ||
| \f | Identifică un form feed ||
| [\b] | Identifică un backspace ||
| 0 | Identifică un caracter NUL ||
| \w | Identifică orice caracter din setul de bază Latin, incluzând și underscore. | Echivalent cu `[A-Za-z0-9_]` |
| \W | Identifică orice caracter care nu este un caracter dintr-un posibil cuvânt format cu Latine. De exemplu, /\W/ identifică „%” din 50%. | Echivalent cu `[^A-Za-z0-9_]` |


### Seturi de caractere

| Caracter | Semnificație | Echivalență |
|:---------|:-------------|:----------- |
| [abc] sau [a-c] | Este un set de caractere. Identificările se fac după oricare dintre caractere ||
| [^abc] sau [^a-c] | Este un set de caractere negat. Identificările se fac după oricare dintre caractere mai puțin cele precizate astfel ||

### Alternative

| Caracter | Semnificație | Echivalență |
|:---------|:-------------|:--------------- |
| `a[pipe]b` | Îl identifică, fie pe a, fie pe b | |

### Limite

| Caracter | Semnificație | Echivalență |
|:---------|:-------------|:----------- |
| ^ | Identifică unde începe șirul. Dacă stegulețul pentru multiline este setat, se face identificare și imediat după caracterul de line break. De exemplu, `/^X/` nu identifică X-ul din „este un X”, dar identifică pe X în „X este”.  ||
| $ | Identifică finalul șirului. Dacă stegulețul pentru multiline este setat, se face identificare imediat înainte de caracterul line break. ||
| \b | Marchează granițele unui șir. `"saturn".match(/\bs/); // Array [ "s" ]` fiind limita superioară, iar `"saturn".match(/urn\b/); // Array [ "urn" ]` |  |

### Grupare și referențiere

| Caracter | Semnificație | Echivalență |
|:---------|:-------------|:----------- |
| (x) | Identifică x și ține minte ce a găsit. Acestea sunt numite grupuri de captură. Subșirurile descoperite pot fi reapelate din array-ul rezultatelor sau din proprietățile predefinite ale obiectului RegExp ($1, ..., $9). Atenție, folosirea grupurilor penalizează performanța. Dacă nu este nevoie de un apel la substringurile descoperite, mai bine se face identificarea fără paranteze. |  |
| \n | n este un număr întreg pozitiv |  |
| (?:x) | Îl identifică pe x, dar nu-l ține minte, nu-l „capturează”. |  |

Gruparea permite formarea de expresii secundare, care pot fi tratate ca o unitate.
Gruparea permite și așa-zisa „capturare” a rezultatelor grupurilor pentru a fi utilizate ulterior.

Grupurile care să nu captureze rezultatele sunt de preferat.

Avantajul grupării este că le poți aplica repetiții. În mod normal, repetițiile se aplică unui singur caracter aflat la stânga metacaracterului.

Ca exemplu, putem construi un regex care să identifice o adresă web incluzând și protocolul.

```javascript
var adrese = '<a href = "http://www.kosson.ro">Un site interesant</a><link rel="stylesheet" href="https://cloudshare.io/main.css">';
var identificare = adrese.match(/(?:https?)?\/\/[a-z][a-z0-9-]+[a-z0-9]+/ig);
// (?:https?)? ?: spune că este un grup care nu trebuie capturat.
// identifică http
// s? vezi dacă este și s în cazul unui https
// ? tot grupul vezi dacă există o dată.
// \/\/ se face escaping pentru slashuri
// apoi o serie de domenii de caractere
```

## Diferența dintre identificările lazy și cele `greedy`.

În mod natural, expresiile regulate au un comportament `greedy`, adică vor încerca să facă identificări până când resursa șir este epuizată.

Gruparea permite o tehnică de apelare a grupului numită `backreferencing`. În cazul regexurilor, fiecărui grup îi sunt asignate numere de la stânga la dreapta începând cu 1. Se pot referenția aceste grupuri cu backslash număr.

```javascript
var sir = "Dorel era UN mare băiețel DE fel.";
var identificare = sir.match(/(?:[A-Z])(?:[A-Z])\2\1/g);
console.log(identificare);
```
