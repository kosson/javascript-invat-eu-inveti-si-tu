# RegExp

Scopul folosirii regex-urilor este acela de a ***formula*** șabloane («patterns») prin care să **privim** succesiunea de caractere care este un șir pentru a extrage fragmentele utile, pentru a ști unde se află și pentru a lua decizii mai departe pe baza acestor informații.

RegExp înseamnă **expresii regulate** dar ne vom referi la construcțiile de șabloane ca fiind regex-uri.

**Moment ZEN**: un șir de caractere poate fi un sunet, un cuvânt, mai multe, o propoziție, o frază sau o carte întreagă, un document hipertext accesat la distanță... cam tot ce este reprezentat cu ajutorul caracterelor.

Încep acest capitol prin a vă seta mental pentru felul în care trebuie abordat lucrul cu șabloanele construite cu RegExp. Trebuie conștientizat din prima că RegExp lucrează la nivel de caracter individual, apoi seturi de caractere, grupuri și combinațiile dintre acestea. Dar concentrarea voastră trebuie să pornească de la conștientizarea importanței unui singur caracter. Un singur caracter face diferența între a regăsi ceea ce cauți într-un șir sau nu.

Un mic antrenament de atenție înainte de a lucra. Caracterul `?` la regexuri pune condiția strictă ca un șablon menționat înaintea sa să existe sau nu. De exemplu, `x?`, se va traduce: caracterul `x` poate să fie întâlnit și dacă da, ia-l în considerare, dar este acceptabil și dacă acesta nu există. Și acum, focalizare maximă. Următorul regex <code><u> </u>?</code> te poate da peste cap dacă nu ești atent. Pur și simplu testează dacă există un spațiu sau nu. Liniuța am pus-o eu pentru a marca spațiul pentru că nu am alt mijloc să-l marchez aici. Vezi? De accea trebuie cu multă atenție lucrat.

Șirurile de caractere în JavaScript sunt înșiruiri de secvențe de 16 biți denumite tehnic `unități de cod` (code unit) ce reprezintă, de fapt, un singur caracter. RegExp se așteaptă să lucreze cu unități de cod pe 16 biți, care reprezintă un singur caracter. Totuși începând cu ECMAScript 6, există un fanion dedicat, care semnalizează RegExp că va avea de lucru cu un șir de caractere Unicode - `u`. De fapt, îi este indicat motorului faptul că trebuie să lucreze la nivel de caractere și nu la nivel de `code unit`.

```javascript
let exemplu = '𝒥';

console.log(exemplu.length); // lungimea textului este 2

// testează pentru potrivirea cu orice caracter /^.$/
console.log(/^.$/.test(exemplu)); // false, nu se face potrivirea
console.log(/^.$/u.test(exemplu)); // true, fanionul este ridicat pentru Unicode
```

Expresiile regulate sunt șabloane folosite pentru a căuta combinații de caractere în șiruri. Dacă vrei să lucrezi direct pentru a face experimente, poți folosi instrumentul online RegExr accesibil de la următorul link: http://www.regexr.com/. Tot aici găsești și foarte multă documentație. Pentru JavaScript vezi și https://regexper.com/, care face o treabă foarte faină reprezentând cu hărți vizuale construcția șablonului.

## Detalii de funcționare a motorului de RegExp

Motorul RegExp este unul regex-directed, fiind o implementare „eager” (motor nerăbdător să ofere o potrivire). Am menționat aceast lucru pentru că acest motor, la momentul evaluării, returnează fragmentul care s-a potrivit cu cel mai din stânga fragment, cât mai aproate de începutul șirului chiar dacă ar fi fost disponibilă o variantă mai apropiată de împlinirea tuturor criteriilor șablonului în cuprinsul său. Reține acest aspect de funcționare. Te va ajuta să înțelegi mai bine problemele care apar în utilizare pentru care nu există nicio rațiune.

Aplicarea regexului va porni prin „consumarea” șirului de caractere pornind de la primul încercând toate variantele șablonului chiar din acest punct. Dacă toate variantele au fost epuizat, va mai „consuma” încă un caracter și având acum două va încerca din nou toate combinațiile până când un fragment se va potrivi. Acela va fi și punctul de oprire. Ține în minte că fragmentul poate fi parte a unui cuvânt compus sau a unei formule pentru care nu a fost gândit șablonul. De aceea tipul motorului este „nerăbdător” - pur și simlu raportează prima potrivire indiferent de context.

## Metacaractere

Regex-urile fac uz de 11 caractere cu o însemnătate deosebită atunci când vine vorba de evaluarea unui șablon. Acestea sunt: **«backslash»** `\`, **«carret»** `^`, **«dollar»** `$`, **«punctul»** `.`, **«parantezele dreapte»** `[` și `]`, **«paranteze rotunde»** `(` și `)`, **«pipe»** <code>&#124;</code>, **«semnul întrebării»** `?`, **«semnul plus»** `+`. Aceste caractere au o valoare deosebită și pentru motorul JavaScript, fiind operatori ai limbajului, dar în același timp apar și în textele pe care le prelucrăm pentru că totuși fac parte și din limbajul natural. În cazul construcțiilor de șabloane, pentru a introduce aceste caractere în evaluare, vor trebui precedate cu **«backslash»** `\`.

În afară de cele menționate mai sus, mai este o pereche de caractere, care capătă înțeles special și intră în evaluare doar dacă apar într-o anumită ordine cu un anumit conținut intern. Este vorba despre **«acolade»** `{` și `}`. Fac sens pentru RegExp, dacă apar în astfel de construcții care cuantifică numărul caracterelor care trebuie căutate: `x{1,3}` - menționează de câte ori se va repeta caracterul `x`.

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

Fără acest fanion, va fi returnată doar prima potrivire care se face.
Folosind fanionul, se va face potrivire pe tot ce seamănă cu secvența șablonul.

## Crearea obiectului RegExp

Există două feluri prin care se poate crea un obiect RegExp: notația literală și prin constructor.

Obiectul `RegExp` se poate crea prin introducerea directă a șablonului:

```javascript
/xyz/i; // sau
var exempluDeRegExp = /ab+c/g;
```

sau folosind constructorul care acceptă ca prim argument șablonul iar ca al doilea fanionul sau fanioanele dorite:

```javascript
new RegExp('/xyz/', 'i');
new RegExp(/xyz/, 'i');
```

Folosirea funcției constructor are ca efect compilarea la momentul rulării. Se va folosi constructorul atunci când se știe că șablonul se va modifica sau când nu cunoști expresia regulată, unul din cazuri ar fi construirea acesteia în mod dinamic prin acțiunea utilizatorului.

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

- Șirul este imuabil (nu va fi modificat).
- Șirul este „consumat” (cu sensul de procesare) de RegExp de la stânga la dreapta.
- Din moment ce un caracter a fost „consumat”, acesta nu mai este folosit.
- Expresiile regulate în JavaScript sunt obiecte.
- RegExp în JavaScript avansează caracter cu caracter, iar când a fost găsit un șir care se potrivește, caracterul este „consumat” deodată regex trecând la caracterul următor (dacă regex este global).
- Metacaracterele pot impune un comportament **greedy** (*expansive*: consumă tot șirul) sau **lazy** (*autosuficient*: oprește-te imediat după prima potrivire) în ceea ce privește consumarea resursei de șir.
- șabloanele sunt folosite cu metodele `exec` și `test` ale obiectului RegExp.
- șabloanele sunt folosite cu metodele `match`, `replace`, `search` și `split` ale lui String.

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

### Caracterele speciale din expresiile regulate - metacaractere

| Caracter | Semnificație | Echivalență |
|:---------|:-------------|:----------- |
| `\` «backslash» | indică faptul că următorul caracter are înțeles special pentru sistem (numite și „metacaractere”). Dacă caracterul este special este de înțeles pentru sistem că acesta trebuie tratat ca oricare altul fără a-l interpreta. `/a*/` înseamnă caută un a, care poate fi urmat de mai mulți a, dar `/a\*/` înseamnă caută chiar `a*`. Însuși backslashul trebuie să i se facă „escaping” pentru a fi tratat ca orice caracter simplu: `/\\/` - caută un `\`. | |
| `^` «carret» | indică faptul că se dorește căutarea cu primele caractere ale șirului. Dacă stegulețul pentru multiline este prezent (true), atunci căutarea se va face și după caracterul `line break`, adică pe următoarea linie. De exemplu `/^A/` nu va găsi nimic în „un A”, dar îl găsește pe A în „Anul viitor”. `^` are un înțeles diferit atunci când apare ca fiind primul caracter dintr-un șablon de caractere (vezi mai jos). | |
| `$` «dollar» | indică că se dorește căutarea pe caracterele chiar de dinaintea finalizării șirului. Dacă stegulețul pentru multiline este prezent (true), atunci căutarea se va face imediat înainte de caracterul `line break`. De exemplu, `/t$/` nu îl găsește pe „t” în „etern”, dar îl găsește în „dorit”. | |
| `*` «asterix» | [**cunoscut ca și „cuantificator”**] indică că va face o căutare după expresia de dinaintea lui de 0 sau mai multe ori. Este echivalentul lui `{0,}`. De exemplu, `/au*/` găsește în „auuu, ce doare”, în „am găsit aur” și în „el a plecat” | {0,} |
| `+` | [**cunoscut ca și „cuantificator”**] precizează că se va face căutarea după expresia anterioară de una sau mai multe ori. Este echivalentul lui `{1,}`. De exemplu, `/a+/` va găsi în „casa” și în „aaaaau!”. | |
| `?` | [**cunoscut ca și „cuantificator”**] Menționează faptul că se va face căutare după expresia anterioară. Rezultatul poate fi 0 sau poate apărea o singură dată. Este echivalentul lui {0,1}. `"știință".match(/n?ță?/); // [ "nță" ]` `"gablonț".match(/n?ță?/); // [ "nț" ]` `"țeavă".match(/n?ță?/); // [ "ț" ]`. Dacă se folosește imediat după cuantificatori (*, +, ?, ori {}), transformă cuantificatorul într-unul non-greedy (adică cât mai puține caractere posibil), opus comportamentului natural (găsirea a cât mai multe caractere posibil). De exemplu, `"caractere 1437675".match(/\d+/gui); // [ "1437675" ]`. Dar combinând cu ? înseamnă caută numere întregi, și adu-le rând pe rând în array-ul rezultatelor: `"caractere 1437675".match(/\d+?/gui); // [ "1", "4", "3", "7", "6", "7", "5" ]`. Acest lucru se întâmplă pentru că șirul numerelor este consumat de la stânga la dreapta iar expresia se limitează la fiecare cifră oprindu-se, apoi reia căutarea de la șirul rămas și tot așa. | {0,1} |
| `.` | Punctul indică o identificare a tuturor caracterelor (litere, simboluri, numere), dar fără caracterul newline (`\n`). De multe ori este asemănat unui wildcard cu care poți substitui orice(nu și new lines). Adevăratul wildcard totuși este  setul **[\s\S]** - identifică tot ce este whitespace și tot ce nu este whitespace, pe scurt, orice. Un exemplu pentru a înțelege: `"acuma mai multe mere a anemice cam anapoda a".match(/.a/); // [ "ma" ]`. Dacă activezi globalul, vei avea `// [ "ma", "ma", " a", " a", "ca", " a", "na", "da", " a" ]`. Ceea ce este observabil este faptul că, în cazul menționat aduce litera a și una înaintea ei, dacă aceasta a fost găsită într-un cuvânt. Ordinea o dă poziția punctului. Dacă era așezat după caracterul căutat aveam `[ "ac", "a ", "ai", "a ", "an", "am", "an", "ap", "a " ]` | |
| `\d` | Specifică un caracter numeric, un digit | [0-9] |
| `\D` | Caută tot ce nu este digit și aduce un șir dacă șirul original începe cu caractere începând cu primul digit. Atenție, dacă șirul original începe cu un digit nu este adus niciun rezultat. De exemplu, `"saturn4 23".match(/\D/); // Array [ "s" ]` și `"saturn4 23".match(/\D+/); // Array [ "saturn" ]` | Set cu negație [^0-9] |
| `\s` | Identifică un singur spațiu gol, incluzând spațiu, tab, form feed, line feed și alte spații din schema Unicod. De exemplu, `"ana are mere".match(/\s\w*/)` identifică `Array [ " are" ]`, deci, primul cuvânt de după primul spațiu | [ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​-\u200a​\u2028\u2029\u202f\u205f​\u3000\ufeff] |
| `\S` | Identifică orice caracter, dar nu și un spațiu gol. De exemplu, `"ana are mere".match(/\S\w*/);` identifică `Array [ "ana" ]`. | Set cu negație [^ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​-\u200a​\u2028\u2029\u202f\u205f​\u3000\ufeff]. |
| `[\s\S]` | Identifică orice caracter, fie el spațiu sau nu. Este un adevărat wildcard - locțiitor de orice. De exemplu, `"acuma mai multe mere a anemice cam anapoda a".match(/\s\S/)` identifică primul „m” de după primul spațiu. Adăugarea flagului g are darul de a aduce toate literele imediat de după spațiu `Array [ " m", " m", " m", " a", " a", " c", " a", " a" ]`, iar adăugarea cuantificatorului `+`, aduce în array toate cuvintele din șir: `"acuma mai multe mere a anemice cam anapoda a".match(/\s\S+/g); // [ " mai", " multe", " mere", " a", " anemice", " cam", " anapoda", " a" ]` |  |
| `\t` | Identifică un tab orizontal ||
| `\r` | Identifică un carriage return ||
| `\n` | Identifică un new line ||
| `\v` | Identifică un tab vertical ||
| `\f` | Identifică un form feed ||
| `[\b]` | Identifică o limită pentru o secvență din șablon - «border» ||
| `0` | Identifică un caracter NUL ||
| `\w` | Identifică orice caracter din setul de bază Latin și majusculele, incluzând și underscore. | Echivalent cu `[A-Za-z0-9_]` |
| `\W` | Este negarea identificării cu `\w`. Identifică orice caracter care nu este un caracter dintr-un posibil cuvânt format cu Latine. De exemplu, /\W/ identifică „%” din 50%. | Echivalent cu setul de negare `[^A-Za-z0-9_]` |

### Seturi de caractere

| Caracter | Semnificație |
|:---------|:-------------|
| `[abc]` sau `[a-c]` | Este un set de caractere. Identificările se fac după oricare dintre caractere |
| `[^abc]` sau `[^a-c]` | Este un set de caractere negat. Identificările se fac după oricare dintre caractere mai puțin cele precizate astfel |

### Alternative

| Caracter | Semnificație |
|:---------|:-------------|
| `a`<code>&#124;</code>`b` | Îl identifică, fie pe a, fie pe b |

### Limite

| Caracter | Semnificație |
|:---------|:-------------|
| `^` | Acest caracter se numește **carret** și identifică unde începe șirul. Dacă stegulețul pentru multiline este setat, se face identificare și imediat după caracterul de line break. De exemplu, `/^X/` nu identifică X-ul din „este un X”, dar identifică pe X în „X este”.  În interiorul seturilor, are rolul de a specifica ce nu va fi considerat la căutare `[^c-f]`, însemnând „fă căutarea, dar omite setul specificat de caractere”|
| `$` | Identifică finalul șirului. Dacă stegulețul pentru multiline este setat, se face identificare imediat înainte de caracterul line break. |
| `\b` | Caracterul backslash marchează limitele de căutare aplicate unui șir, acestea fiind strict restricționate la secvența reprezentată de șablon. Indică granița strictă. De exemplu, în `"saturn".match(/\bs/); // Array [ "s" ]` este limita superioară, iar `"saturn".match(/urn\b/); // Array [ "urn" ]` |
| `\B` | Este opusul lui `\b` potrivind fragmentul care este regăsit prin șablon dar care poate fi continuat|

### Grupare și referențiere

| Caracter | Semnificație |
|:---------|:-------------|
| `(x)` | Identifică x și ține minte ce a găsit. Acestea sunt numite grupuri de captură. Subșirurile descoperite pot fi reapelate din array-ul rezultatelor sau din proprietățile predefinite ale obiectului RegExp ($1, ..., $9). Atenție, folosirea grupurilor penalizează performanța. Dacă nu este nevoie de un apel la substringurile descoperite, mai bine se face identificarea fără paranteze. |
| `\n` | n este un număr întreg pozitiv |
| `(?:x)` | Îl identifică pe x, dar nu-l ține minte, nu-l „capturează”. |

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

## Seturi de caractere (ranges)

Într-un set poți specifica caracterele care să permită o regăsirea mult mai rapidă după niște criterii care să ofere o mai mare flexibilitate. În alte lucrări mai sunt denumite și clase. Noi vom folosi set.

**Moment ZEN**: Ordinea caracterelor dintr-un set nu contează.

De exemplu, un set pentru regăsirea după caracterele a, b și c este menționat astfel: `[abc]`.

```javascript
var sir = 'abecedar abc';
var cautare = sir.match(/[abc]/g);
console.dir(cautare);
```

Fără niciun fanion specificat, se va face regărirea primului caracter din set, când acesta este întâlnit în șir. Căutarea se va opri aici. Folosirea fanionului `g`, va avea ca efect căutarea în întreg șirul după fiecare caracter din setul specificat.

Regex-ul permite folosirea unui caracter special, linia, care va specifica limitele setului. Un bun exemplu este căutarea prin întreg setul de caractere de la a la z: `[a-z]` sau majusculele `[A-Z]` ori cifrele `[0-9]`. Caracterul liniuță spune Regex-ului să constituie un ***set***. O mică precizare pentru a elimina confuziile: pentru a face potrivire după însăși caracterul `-`, trebuie precedate de backslash. Atenție, potrivirea se va face după un singur caracter din acel set, nu după toate sau mai simplu, este răspunsul la întrebarea: caracterul la care mă uit se regăsește în acest set?

### Metacaracterele în seturi

În cazul seturilor sunt doar câteva din metacaracterele care îți joacă rolul lor. Acestea sunt `[]`, care indică setul în sine, backslash `\`, carret `^` și hyphen `-`. Restul caracterelor sunt simple caractere care nu au niciun înțeles specific pentru RegExp. Pentru ca matacaracterele să fie incluse au nevoie să fie precedate de backslash (escape sequence). Poți să le introduci și direct doar dacă nu vor ocupa o poziție care să activeze înțelesul lor de metacaracter. De exemplu: `/[a^]/`.

```javascript
var sir = "^Am scris \a^.";
var sablon = /[\\a^]/;
console.log(sir.match(sablon));
// [Array] ["^"]
```

Utilitatea? Uite, de exemplu, poți face căutări după caractere care în afara parantezelor pătrate ar fi fost metacaractere: `/[*]/` - faci căutare după o steluță. Poți face și escape, dar reduce lizibilitatea codului.
Backslashul are nevoie de alt backslash pentru a fi tratat ca un caracter normal.

### Puțină practică cu seturile

Uite, ceva foarte util. Parsarea însăși a codului sursă JavaScript pentru căutarea unui identificator, care deja știm că poate fi orice caracter plus `_` și `$`: `[A-Za-z_][A-Za-z_0-9]*`.

Un alt exemplu de set foarte util este cel care are comportament de întreruptor cu sensul de „asta sau asta”. Să spunem că avem două variante care ar putea fi introduse de utilizator: `cluj napoca` și `cluj-napoca`. Pentru a face o regăsire după ambele variante, vom opta pentru următoarea construcție regex: `/[cluj[- ]napoca]/`.

```javascript
var sir = 'cluj-napoca sau cluj - napoca sau cluj napoca';
var cautare = sir.match(/cluj[- ]napoca/g);
console.log(cautare); // ["cluj-napoca","cluj napoca"]
```

Sunt returnate ambele variante. Este folositor și pentru cazul în care vrei să oferi corecturi la cuvintele introduse cu erori de scriere: `/C[aâ]mpina/`.
Un detaliu foarte important privind seturile, este cazul folosirii punctului. În interiorul seturilor, punctul nu are înțelesul de „orice caracter”, rol pe care-l are în construcțiile regex. În interiorul seturilor, punctul este punct. Asta permite identificarea de numere întregi, de exemplu. O construcție `[\d.][\d.]\d` poate regăsi toate numele întregi: `0.1` sau `.34`.

Seturile pot fi repetate folosind cuantificatorii.

### Negarea setului

Seturile de caractere pot fi negate în sensul că se va face potrivire după toate caracterele posibile, mai puțin cele din set. Atenție! Spre deosebire de punct `.`, care are în intenție potrivirea tuturor caracterelor, folosirea unui set negat va potrivi și caracterele invizibile cum sunt line breaks, de exemplu.

Pentru a nega folosirea setului, pur și simplu pui caracterul `^` la început: `[^c-f]`, cu înțelesul de ocolește partea șirului care conține acest set de caractere.

Există o nuanță semantică pe care trebuie să o lămurim. Când ai un șablon de genul `/al[^i] doilea/`, înțelesul corect este „«al» care poate fi urmat de orice caracter, dar nu și «i»”. De ce este relevantă precizarea? Pentru că în locul acelui «i», care nu este permis poate fi un spațiu, iar spațiul va fi returnat ca partea potrivirii. Negarea poate fi înțeleasă ca un wildcard care elimină anumite caractere indezirabile, dar care poate fi orice altceva plus invizibilele.

La ce ar fi utilă o astfel de opțiune? De exemplu, pentru a elimina anumite caractere de control pe care le folosești pentru a demarca fragmente de text, taguri, etc. Sau mai poți avea cazul în care dorești să corectezi numele de fișiere pentru a nu conține caractere altele decât cele din setul Latin, ș.a.m.d.

### Prescurtările pentru seturi

Deja le știm:
- `[0-9]` : `\d`,
- `[^\d]` : `\D`
- `[A-Za-z]` : `\w`,
- `[^\w]` : `\W`
- `[ \t\r\n]` : `\s`,
- `[^\s]` : `\S`,
- `[^\n]` : `.`

Reține faptul că prescurtările se pot folosi și în interiorul seturilor: `[\d\s]`.

## Cuantificatorii pe îndelete

Am descris deja pe scurt comportamentul lui `+`, `?` și `*`.

|`+`|`?`|`*`|
|:-|:-|:-|
|{1,n}|{0,1}|{0,n}|

Cum să le ții minte? Păi, pentru `+`, ține minte că adaugi ceva la ceva ce există deja, deci trebuie să existe cel puțin odată șirul potrivit și continui cu șablonul la infinit, mă rog, până la epuizarea resursei de șir. Pentru `*` gândește-te ca la big-bang: din nimic, din 0 la infinit orice; deci șirul poate să existe sau nu. Cât despre `?`, pur și simplu este ca un „if”: bre! exiști sau nu?! Deci, potrivește dacă există, dacă nu, GHINION.

Acum că știm cum să folosim seturile, le putem atașa cuantificatori pentru a atinge căutări ceva mai rafinate. Un set de tipul `/[A-Z][a-z]+/g`, va găsi toate mumele de persoane dintr-un șir: `Ana, George și emi`.

```javascript
var sir = 'Ana, George și emi';
var cautare = sir.match(/[A-Z][a-z]+/g);
console.dir(cautare); // [Ana, George]
```

Cuantificatorul `?` de exemplu poți căuta apariția membrilor unei familii de cuvinte știind că au o parte comună. De exemplu, cuvântul `pământean` face parte din familia de cuvinte a lui `pământ`.

```javascript
var sir = 'Un pământean apăru în prag. Era negru pământ.';
var cautare = sir.match(/pământ?/gi);
console.dir(cautare); // apare de 2 ori
```

De fapt, nu e chair atât de inteligent regex-ul, ci doar spune că acea combinație de caractere trebuie să apară în șir cuantificându-se de câte ori apare indiferent ce precede sau cu ce continuă.

Cuantificatorul `*` este combinația anteriorilor.

Mai poți specifica de câte ori poate să apară un anumit caracter menționând imediat după acesta între acolade de câte ori.

```javascript
var sir = 'Baterii AAA, nu AA sau AAAA';
var cautare = sir.match(/a{3}/gi);
console.dir(cautare); // apare de 2 ori
```

Chiar poți indica ca potrivirea să se facă doar după un anumit număr de caractere.

```javascript
var cautare = sir.match(/a{2,}/gi);
console.dir(cautare); // 3 potriviri
```

După cum bine ai intuit, se poate preciza și limita superioară a numărului de apariții ale secvenței.

```javascript
var cautare = sir.match(/a{3,4}/gi);
console.dir(cautare); // 2 potriviri
```

## Constrângerile de căutare și ancorarea

### Ancorare

Ancorele sunt menite a poziționa procesul de căutare înainte sau între caractere. Metacaracterul carret `^`, poziționează procedura de potrivire chiar la poziția de dinaintea primului caracter al șirului. De exemplu, `/^a/` va potrivi corect în șirul `agrar` pentru că avem caracterul `a`, care chiar deschide șirul.

Similar este comportamentul metacaracterului `$` care marchează limita imediat de după ultimul caracter al șirului. De exemplu, `/r$/`, va potrivi corect caracterul `r` din șir.

### Ambele limite

Regexurile fac uz de două caractere pentru a indica „granițele” căutării. Limita începutului șirului de caractere este marcată de caracterul carret `^`, iar limita încheierii șirului marcată prin caracterul dollar `$`.

```javascript
var sir = 'Unu la cap, iar la fine unu';
var cautare = sir.match(/^unu|unu$/gi);
console.dir(cautare); // 2 potriviri
```

În cazul `^unu|unu$` s-a căutat dacă șirul începe cu `unu` și se termină cu `unu`.
Atenție mare, folosirea ambelor caractere cu un șablon între, va spune că ceea ce este în șablon, va trebui să fie între limite strict. De exemplu, `^ceva$`, chiar așa trebuie să arate șirul de caractere ca să se facă regăsirea cu succes.
Dacă cuplezi carret `^` cu fanionul `m`, căutarea se va face pentru fiecare început de linie. Același lucru este valabil și pentru `$`.

## Căutarea strict pe fragmente între spații: cuvinte

Pentru a face astfel de căutări, se va construi șablonul folosindu-ne de caracterul backslash `\b` (*boundary character*). Constrângerea se poate face ori la începutul cuvântului, ori la încheierea sa. Atenție, folosesc termenul de cuvânt pentru că îmi este mai ușor, dar poate fi orice secvență de caractere delimitată de spații.

```javascript
var sir = 'Un pământean apăru în prag. Era negru pământ.';
var cautare = sir.match(/\bpământ\b/g);
console.dir(cautare); // apare o dată
```

Fii atent că `\b` ca considera punctele și liniile ca terminații, ca limite. De aceea în exemplul de mai sus este găsit fragmentul de la final.

Opusul este folosirea lui `\B` care va potrivi doar fragmentele care sunt continuate, nu au un spațiu după sau înainte.

```javascript
var cautare = sir.match(/pământ\B/g); // o potrivire
```

Tot pe această direcție, pot fi folosite caracterele `\s`, care indică chiar un spațiu sau un tab.

## Diferența dintre identificările `lazy` (*autosuficiente*) și cele `greedy` (*expansive*).

În mod natural, expresiile regulate au un comportament `greedy`, adică vor încerca să facă identificări până când resursa de șir este epuizată.

Un exemplu simplu pentru a înțelege natura expansivă a RegExp-ului, este cel al definirii limitelor: `/\d{2,5}/`. În acest caz, va găsi toate caracterele număr între 2 și 5, dar toate. Va epuiza acolo unde poate toate caracterele număr. Pentru a limita acest comportament, poți pune după șablon un `?` și astfel îi vei spune motorului să fie „foarte leneș” (lazy) în căutate. Dacă a dat peste primele două caractere numerice, să se oprească acolo fiind suficient pentru a satisface acest șablon. Nu va încerca să caute mai departe până la cele 5 indiferent că acestea exisă, au ba.

Coportamentul expansiv (*greedy*) se poate dovedi a fi o pacoste atunci când țintești fragmente specifice care apar prima dată în șir. De exemplu, dacă ai două citate unul după altul, comportamentul greedy va recolta tot ce este între primul semn al citării și ultimul din șir, nu cel pereche: `am „un citat” și aici „altul”`.

```javascript
var sir = 'am „un citat” și aici „altul”';
var cautare = sir.match(/\s„.*”/);
console.dir(cautare);
```

Cuantificatorul `*` induce comportamentul expansiv (*greedy*). Limitarea o faci cu un tester `?` iar efectul este că va limita căutarea la minimul necesar.

```javascript
var cautare = sir.match(/\s„.*?”/);
```

În combinația `['"].*['"]`, care spune așa: potrivește orice caracter fără new line de 0 sau oricâte există între ghilimele duble sau simple. Aici se ivește o problemă legată de faptul că `*` se comportă expansiv (*greedy*).

```javascript
var sir = '{"cheie": "valoare", "a": 2}';
var sablon = /['"].*['"]/;
console.log(sir.match(sablon));
// ["\"cheie\": \"valoare\""]
```

Te-ai fi gândit că potrivirea se face direct pe prima potrivire, care în exemplu este `"cheie"`. În schimb, au fost extrase toate combinațiile. Acesta este efectul expansiv (*greedy*) al lui `*`. Potrivirile se vor face până la epuizarea întregului șir.

Pentru a limita efectul expansiv, în loc de a folosi punctul pentru a potrivi orice caracter, mai bine faci un set de caractere care să fie potrivite. Pentru a potrivi cu adevărat toate eventualitățile poți înlocui șablonul propus cu `/"[^"\r\n]*"/` - orice caractere aflate între ghilimele duble, dar care la rândul lor nu sunt ghilimele duble și nici new lines sau carriage return.

La ce ar folosi să știm asta? Ia gândește-te că dorești să prelucrezi fragmente de JSON.

## Grupare pentru a construi șabloane elaborate: propoziții

Grupurile arată ca niște rețete în care ingredientele indică modul în care se va face regăsirea. Grupurile permit o mai bună „țintire” a subșirurilor dorite. Să spunem că ai trei secvențe de caractere despărțite de spații și dorești să le regăsești. În loc să faci reguli care să potriveastă ceea ce sunt, ai putea face grupuri care să cuprindă ceea ce nu sunt.

```javascript
var sir = 'Un posibil fragment.';
var sablon = /(\S+) (\S*) ?\b(\S+)/;
var cautare = sablon.exec(sir);
console.log(cautare);
// ["Un posibil fragment.", "Un", "posibil", "fragment."]
```

Explicația evaluării regexului construit în exemplu este următoarea. În șirul propus, dorim să extragem primele trei cuvinte. Pentru aceasta, voi crea primul grupaj - `(\S+)` - de caractere a primului cuvânt spunând așa: selectează-mi toate caracterele care nu sunt spații, dacă există cel puțin unu. Apoi punem în șablon un spațiu pur și simplu fără a-l marca cu `\s` și purcedem la identificarea celui de-al doilea grupaj - `(\S*)` - care spune așa: selectează-mi toate caracterele care nu sunt spații indiferent ce caractere `*` pornind de la 0 la n. De fapt, ceea ce dorim este să testăm dacă există un cuvânt între alte două. De aceea testăm cu `*` pentru că oferă posibilitatea să nu existe cuvântul „intern”. Apoi urmează cel de-al doilea spațiu și aici facem o limitare la o identificare limitată pentru spațiu; poate să fie sau nu. Este doar în cazul în care avem cuvântul „intern”, în cazul nostru *posibil*. Încă nu este îndeajuns și precizăm cu `\b` că aceasta este limita căutării pentru secvența de dinaintea ultimului cuvânt. De la limită avem ultimul grup `(\S+)`, care spune: extrage tot ce nu este spațiu dacă am cel puțin un caracter non-spațiu.

Ce se întâmplă când ai doar două cuvinte și nu trei așa cum ai dori.

```javascript
var sir = 'Un fragment';
var sablon = /(\S+) (\S*) ?\b(\S+)/;
var cautare = sablon.exec(sir);
console.dir(cautare);
// ["Un fragment", "Un", "", "fragment"]
```

### Grupuri care fac captură și cele care nu fac

Să presupunem că avem de parcurs un fragment XHTML, care este un soi de XML (Extended Markup Language). Știm deja că XML-ul are o regulă strictă care spune că tagurile deschise trebuie închise, iar în cazul nostru: `<cite>Un citat</cite>`.

## Backreferencing

Gruparea permite o tehnică de apelare a grupului numită `backreferencing`. În cazul regexurilor, fiecărui grup îi sunt asignate numere de la stânga la dreapta începând cu 1. Se pot referenția aceste grupuri cu backslash număr.

```javascript
var sir = "Dorel era UN mare băiețel DE fel.";
var cautare = sir.match(/(?:[A-Z])(?:[A-Z])\2\1/g);
console.log(cautare);
```

## Căutări cu șabloane folosite de metodele String

Șabloanele regex fac casă bună cu anumite metodele ale obiectului intern String.

### Căutarea cu `search`

Metoda specializată acceptă drept argument un șablon regex pentru a face căutări.

```javascript
var ceva = 'Orice în care orice poate fi orice';
ceva.search(/orice/); // 14
```

Este returnat indexul la care apare pentru prima dată combinația specificată de șablon. De ce nu a luat în considerare și primul cuvânt? Pentru că litera o este o majusculă care are nevoie de alt șablon. Prima secvență care se potrivește perfect este la indexul 4 al șirului.

### Căutare cu `match`

Rezultatul unei căutări pe șir cu metoda `match` a obiectului intern `String`.

```javascript
var ceva = 'Orice în care orice poate fi orice';
var potriviri = ceva.match(/orice/);
console.dir(potriviri);
```

Rezultatul este un array, care are valoarea 14 pentru `index` și la `input` întreg șirul.
Dacă este activat fanionul `g`, regăsirea se va face pe tot șirul în toate combinațiile posibile și se va completa array-ul cu toate aceste variante.

### Înlocuiri simple de șiruri - `replace`

Adeseori regex-urile sunt cuplate cu metoda replace a obiectului intern `String`.

```javascript
var ceva = 'caut ceva';
ceva.replace('caut', 'am'); // "am ceva"
ceva.replace(/caut/g, 'vreau'); // "vreau ceva"
```

## Referințe

Mozilla Developer Network [Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

Eloquent JavaScript. Second edition [Regular Expressions](http://eloquentjavascript.net/09_regexp.html)

Regular Expressions: The Complete Tutorial [Regular Expressions. The Complete Tutorial](https://www.princeton.edu/~mlovett/reference/Regular-Expressions.pdf)
