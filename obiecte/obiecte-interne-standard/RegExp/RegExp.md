# RegExp

Am stabilit deja din tot ce-am povestit până acum că textul este o resursă digitală care poate fi exploatată și în care poți face căutări după anumite fragmente cheie. Poți să-ți imaginezi `RegExp`-ul ca pe un motor de căutare în care introduci cheile de căutare după anumite reguli. Și de aici și denumirea de `regular expressions` în limba engleză -`RegExp`. Facem căutări în texte după *șabloane construite după anumite reguli*, dar ne vom referi la aceste construcții numindu-le șabloane sau regex-uri. Pentru englezescul „pattern” am ales `șablon` pentru că semantic exprimă cel mai bine scopul fragmentului după care facem căutarea, iar pentru operațiunea în sine de căutare am folosit interșanjabil „a potrivi”, cu sensul de a potrivi în șir șablonul sau „a căuta”, cu sensul operațiunii de identificare în șir atunci când explicația redă operațiunea din punctul de vedere al motorului `RegExp`.

Scopul folosirii regex-urilor este acela de a **constitui** un filtru prin care trecem o succesiune de caractere.

**Moment ZEN**: un șir de caractere poate fi un cuvânt, mai multe, o propoziție, o frază sau o carte întreagă, un document hipertext accesat la distanță... cam tot ce este reprezentat cu ajutorul caracterelor.

**Spune standardul**:
*Forma și funcționalitatea expresiilor regulate sunt modelate după cele oferite de limbajul de programare Perl 5*.

Continuăm prin a ne transpune în starea necesară pentru lucrul cu șabloanele construite cu `RegExp`. Trebuie conștientizat din prima că `RegExp` lucrează la nivel de caracter individual, apoi seturi de caractere, grupuri și combinațiile dintre acestea. Dar starea necesară pornește de la conștientizarea importanței cruciale pe care o are un singur caracter, fie că acesta este „vizibil” sau „invizibil” (spațiile albe, taburile). Vă mai amintiți de faptul că JavaScript lucrează cu setul de caractere codat după standardul Unicode?! Amintiți-vă acest detaliu ca pe o melodie de fundal atunci când lucrați cu text.

**Moment ZEN**: Un singur caracter face diferența între a găsi ceea ce cauți într-un șir sau nu.

Caracterele speciale din expresiile regulate se numesc *metacaractere* și sunt părțile componente ale regulilor după care facem căutarea. Sunt un set restrâns, dar au flexibilitatea de a construi expresii foarte diverse și flexibile. Aici, cel mai bun exemplu la care vă puteți gândi este introducerea greșită a unei chei de căutare, după care dinamic vi se face o sugestie de corectură. În spatele unui astfel de comportament poate sta RegExp-ul.

**Moment ZEN**: O expresie regulată este o expresie care trebuie să fie evaluată.

## Un mic antrenament de atenție înainte de a lucra.

Caracterul `?` la regex-uri pune condiția strictă ca un șablon menționat înaintea sa să existe sau nu. De exemplu, `x?`, se va traduce: caracterul `x` poate să fie existe în șirul de caractere analizat sau nu, dar dacă îl găsești, include-l în rezultat.

### Ce înseamnă a include în rezultat?

Motorul RegExp indică succesiunea caracterelor, de câte ori li se permite să apară, de câte ori pot să se repete și așa mai departe. Acest model, acest șablon făurit de programator, este o descriere a ceea ce căutăm într-un șir de caractere și a tuturor variațiunilor posibile, ori a deviațiilor acceptate pentru întregul model sau pentru părți din acesta. Ținând cont de aceste aspecte, motorul parcurge caracter după caracter întreg șirul dat spre analiză. Ori de câte ori un caracter se potrivește tipului sau succesiunii, acesta este introdus într-un rezultat. Abia după ce a găsit un șir care să potrivească exact cu regulile șablonului, motorul va renunța la căutare și dacă s-a făcut o potrivire iar șirul de caractere nu a fost epuizat, restul este ignorat. Acesta este comportamentul implicit al motorului. Acest comportament poate fi modificat în funcție de regulile incluse în șablon.

Și acum, focalizare maximă.

Următorul regex este unul valid și solicită atenția ta ca și detector de caractere: <code><span style='color: red'>_</span>?</code> (spațiu și semnul întrebării, aici l-am folosit pe underscore să-ți marchez faptul că este un spațiu) te poate da peste cap dacă nu ești atent. Pur și simplu testează dacă există un spațiu sau nu pentru că înaintea semnului întrebării era un spațiu nedetectabil celor care abia s-au apucat de lucru pe șiruri de caractere. Vezi? De aceea trebuie lucrat cu multă atenție.

Regex-urile mai au în componență niște litere care succed șablonul. Acestea în limba engleză sunt numite „flags”, dar pentru limba română le-am tradus ca fanioane pentru că semnalizează un anumit comportament pe care motorul de interpretare trebuie să-l adopte.

**Spune standardul**:
*Un șablon este evaluat („este compilat”) la o valoare rezultată dintr-o procedură internă*.

Șirurile de caractere în JavaScript sunt secvențe de 16 biți denumite tehnic `unități de cod` (*code unit*) ce reprezintă, de fapt, un singur caracter. `RegExp` se așteaptă să lucreze cu unități de cod pe 16 biți, care reprezintă un singur caracter. Totuși, începând cu ECMAScript 6, există un fanion dedicat, care semnalizează motorului `RegExp` că va avea de lucru cu un șir de caractere Unicode - `u`. De fapt, îi este indicat motorului faptul că trebuie să lucreze la nivel de caractere și nu la nivel de `code unit`.

```javascript
let exemplu = '𝒥';
console.log(exemplu.length);
// lungimea textului este 2
// nu 1 așa cum te-ai fi așteptat
// pentru că avem un singur caracter

// șablonul este /^.$/ ceea ce înseamnă
// orice caracter aflat în setul mare UTF.
console.log(/^.$/.test(exemplu));
// false, nu se face potrivirea
console.log(/^.$/u.test(exemplu));
// true, având fanionul Unicode
```

Expresiile regulate sunt șabloane folosite pentru a căuta combinații de caractere în șiruri. Dacă vrei să lucrezi direct pentru a face experimente, poți folosi instrumentul online **RegExr** accesibil de la următorul link: http://www.regexr.com/. Tot aici găsești și foarte multă documentație. Pentru JavaScript vezi și https://regexper.com/, care face o treabă foarte faină reprezentând cu hărți vizuale construcția șablonului.

## Detalii de funcționare ale motorului RegExp

Tehnic vorbind, motorul `RegExp` este unul ***regex-directed***, adică șablonul ocupă rolul central. Motorul este o implementare „eager” ceea ce înseamnă că este un motor foarte „nerăbdător” să ofere un rezultat. Dacă s-a format rezultatul respectându-se regulile, restul de resursă de text este ignorat.

Am menționat aceast lucru pentru că acest motor, la momentul evaluării, returnează rezultatul potrivirii cu cel mai din stânga fragment din șirul de caractere, adică care se află cât mai aproape de începutul șirului, chiar dacă ar fi fost disponibilă o variantă mai apropiată de împlinirea tuturor criteriilor șablonului în corpul său. Reține acest aspect de funcționare. Te va ajuta să înțelegi mai bine problemele care apar în utilizare pentru care, aparent, nu există nicio rațiune.

Aplicarea șablonului va porni prin „consumarea” șirului de caractere pornind de la primul încercându-se toate variantele șablonului chiar din acest punct. Dacă toate variantele au fost epuizate, va mai „consuma” încă un caracter și având acum două va încerca din nou toate combinațiile până când un fragment se va potrivi. Acela va fi și punctul de oprire. Ține minte că fragmentul poate fi parte a unui cuvânt compus sau a unei formule pentru care nu a fost gândit șablonul. De aceea tipul motorului este „nerăbdător” - pur și simplu raportează prima potrivire indiferent de context.

## Metacaracterele

Regex-urile fac uz de 11 caractere cu o însemnătate deosebită atunci când vine vorba de evaluarea unui șablon. Acestea sunt:

- **«backslash»** `\`,
- **«carret»** `^`,
- **«dollar»** `$`,
- **«punctul»** `.`,
- **«parantezele dreapte»** `[]`,
- **«parantezele rotunde»** `()`,
- **caracterul «pipe»** <code>&#124;</code>,
- **«semnul întrebării»** `?` și
- **«simbolul plus»** `+`.

Aceste caractere au o valoare deosebită și pentru motorul JavaScript, fiind operatori ai limbajului, dar în același timp apar și în textele pe care le prelucrăm pentru că totuși fac parte și din limbajul natural. În cazul construcțiilor de șabloane, pentru a introduce aceste caractere în evaluare, vor trebui precedate cu **«backslash»** `\`.

În afară de cele menționate mai sus, mai este o pereche de caractere, care capătă înțeles special și intră în evaluare doar dacă apar într-o anumită ordine cu un anumit conținut intern. Este vorba despre **«acolade»** `{` și `}`. Fac sens pentru RegExp, dacă apar în astfel de construcții care cuantifică numărul caracterelor care trebuie căutate: `x{1,3}` - menționează de câte ori se va repeta caracterul `x`.

## Obiectul `RegExp`

`RegExp` este un obiect intern al JavaScript.

Cel mai ades se va genera un obiect `RegExp` prin introducerea directă a șablonului ca expresie literală:

```javascript
var exempluDeRegExp = /ab+c/g;
```

Pentru a crea un obiect regex, ai două alternative. Prima este aceea deja indicată prin folosirea unui constructor, iar cea de-a doua este cea care implică instanțierea constructorului cu `new`.

```javascript
var cheieObiect = new RegExp('xy','g');
console.log(cheieObiect.test('xyz')); // true
```

Crearea folosind constructorul acceptă ca prim argument șablonul, iar ca al doilea, un fanion sau mai multe:

```javascript
new RegExp('/xyz/', 'i');
new RegExp(/xyz/, 'i');
// sintaxă alternativă
```

Folosirea funcției constructor are ca efect compilarea la momentul rulării. Se va folosi constructorul atunci când se știe că șablonul se va modifica sau când nu cunoști expresia regulată, caz în care acesta se construiește dinamic prin acțiunea utilizatorului.

După cum se observă, sintaxa este: `/pattern/flags`.

`pattern`: este textul expresiei regulate.
`flags`:
- `g` - **global match**;
- `i` - **ignore case**;
- `m` - **multiline** - implică folosirea limitelor ^ și $ pentru o resursă text pe mai multe linii;
- `u` - **unicode** - tratează secvența ca *puncte de cod* Unicode;
- `y` - **sticky** face potrivirea numai după indexul indicat prin proprietatea `lastIndex` a expresiei regulate în șir.


### Flags - fanioane

#### Fanionul `i` - ignore case

Toate șabloanele de căutare construite cu RegExp sunt „atente” la caracterele introduse, făcându-se distincție clară între minuscule și majuscule. Explicația este simplă: codul de caracter nu este același.

În cazul în care au un text în care nu știi cum a fost introdus textul, fiind posibile erori sau chiar intrări ale aceleași sintagme, care nu este uniformizată în ceea ce privește caracterele, acest fanion permite regăsirea fragmentului de text indiferent de lipsa uniformității.

#### Fanionul `m` - multiline

Este un fanion care va indica motorului JavaScript ca la căutarea după șablon, fiecare nouă linie de text va fi tratat pur și simplu ca un nou șir de caractere.

Să spunem că un fragment de text începe cu un caracter ales de tine sau un șablon RegExp construit de tine. Fără fanion, JavaScript va testa dacă întregul șir de caractere va începe cu acel caracter căutat, dar dacă este pus fanionul, va căuta linie cu linie în întreg șirul până când va găsi acea linie care începe cu acel caracter.

#### Fanionul `g` - global

Fără acest fanion, va fi returnată doar prima potrivire care se face.
Folosind fanionul, se va face potrivire pe tot ce seamănă cu secvența șablonul.

#### Fanionul `y` - sticky

Se mai numește și **modul lipicios** (*sticky* în limba română înseamnă lipicios). Ceea ce se petrece în cazul acestui fanion este că se vor face căutările de la indexul menționat de proprietatea `lastIndex`.

```javascript
var sirCaractere = 'A fost odată',
    sablon = /fost/y;
sablon.lastIndex = 2;
sablon.test(sirCaractere); // true
```

### Proprietăți ale obiectului prototip a lui `RegExp`

Aceste proprietăți sunt foarte utile atunci când dorești să afli starea în care se află obiectul regex la un anumit moment dat.

- `RegExp.prototype.constructor` - returnează funcția obiect: function RegExp()
- `RegExp.prototype.flags` - returnează un string cu fanioanele setate pentru obiectul curent
- `RegExp.prototype.global` - dacă fanionul `g` a fost introdus, valoarea este `true`.
- `RegExp.prototype.ignoreCase` - dacă fanionul `i` a fost introdus, valoarea este `true`.
- `RegExp.prototype.multiline` - dacă fanionul `m` a fost introdus, valoarea este `true`.
- `RegExp.prototype.source` returnează varianta text a obiectului.
- `RegExp.prototype.sticky` - dacă fanionul `y` a fost introdus, valoarea este `true`.
- `RegExp.prototype.unicode` - dacă fanionul `u` a fost introdus, valoarea este `true`.

## Mantre

- **Șirul este imuabil** (nu va fi modificat).
- **Șirul este „consumat”** (cu sensul de procesare) de `RegExp` de la stânga la dreapta.
- Din moment ce un caracter a fost „consumat”, acesta nu mai este folosit.
- Expresiile regulate în JavaScript sunt obiecte.
- `RegExp` în JavaScript avansează caracter cu caracter, iar când a fost găsit un șir care se potrivește, caracterul este „consumat” trecându-se la caracterul următor (dacă regex este global).
- Folosirea funcției constructor are ca efect compilarea la momentul rulării.
- Metacaracterele pot impune un comportament **greedy** (*expansive*: consumă tot șirul) sau **lazy** (*autosuficient*: oprește-te imediat după prima potrivire) în ceea ce privește consumarea resursei de șir.
- șabloanele sunt folosite cu metodele `exec` și `test` ale obiectului RegExp.
- șabloanele sunt folosite cu metodele `match`, `replace`, `search` și `split` ale lui String.

### Potrivirea caracter cu caracter

Cel mai simplu exemplu este cel al unui șir exact (*direct match*), care să fie căutat în alt șir - `/abc/`

```javascript
"sa fie: abcd".match(/abc/); // ["abc"]
```

#### Limite

Șirurile de caractere care sunt „procesate” de motorul RegExp, trebuie privite ca pe niște resurse care au limite. Limita superioară o putem considera a fi începutul șirului, iar limita inferioară, capătul acestuia. Un lucru foarte util ar fi ca acum, în acest moment să înțelegem o curiozitate a motorului RegExp. Acesta își rezervă încă un spațiu înainte și după șir pentru a permite anumitor procese să se desfășoare. Unul dintre acestea ar fi parcurgerea întregului șir inclusiv a ultimului caracter și apoi în afara șirului pentru a se întoarce cu scopul de a face o regăsire. Pare mai ciudat, dar va face sens după ce acumulăm mai mult.

**Limita superioară și limita inferioară a șirului - începutul și capătul**

Ambele limite sunt jalonate prin două caractere speciale: `^` (numit în engleză *carret*) și bine-cunoscutul dolar `$`.

| Caracter | Semnificație |
|:---------|:-------------|
| `^` «carret» | Identifică unde începe șirul.|
| `$` «dollar» | Indică că se dorește căutarea pe caracterele chiar de dinaintea finalizării șirului. |

***Detalii pentru carret***

Dacă stegulețul pentru multiline este setat, se face identificare și imediat după caracterul *line break*. De exemplu, `/^X/` nu identifică X-ul din „este un X”, dar identifică pe X în „X este”.

În interiorul seturilor, are rolul de a specifica ce nu va fi inclus la căutare cu stricta condiție ca acesta să apară imediat după paranteza pătrată. De exemplu, `[^c-f]`, înseamnă: „fă căutarea, dar omite setul specificat de caractere”.
Dacă apare mult după poziția de după paranteza pătrată, va avea înțelesul de caracter simplu ca oricare altul. Nu își va produce efectul special.

**Detalii pentru dolar**

Dacă stegulețul pentru multiline este prezent (true), atunci căutarea se va face imediat înainte de caracterul `line break`. De exemplu, `/t$/` nu îl găsește pe „t” în „etern”, dar îl găsește în „dorit”.

#### Limită la cuvânt - *word boundary* `\b`

| Caracter | Semnificație |
|:---------|:-------------|
| `\b` | Caracterul «word border» marchează limitele de căutare aplicate unui șir, acestea fiind strict restricționate la secvența reprezentată de șablon. Indică granița strictă. De exemplu, în `"saturn".match(/\bs/); // [ "s" ]` este limita superioară, iar `"saturn".match(/urn\b/); // [ "urn" ]` indică limita inferioară a șirului.|
| `\B` | Este opusul lui `\b` potrivind fragmentul care este regăsit prin șablon dar care poate fi poziția ***dintre*** două caractere ce pot forma un cuvânt ori poziția dintre două caractere care nu pot forma un cuvânt.|

Acest metacaracter se comportă și el ca o ancoră și ca și în cazul anterioarelor va face potrivire pe lungime zero.

Specializarea acestei ancore este potrivirea pe fragmentele de șir care sunt formate din acele caractere care formează cuvinte. Deci, am putea distinge caracterele după capacitatea lor de a forma cuvinte sau nu.

Vă mai aduceți aminte de prescurtarea de seturi `\w`? Aceste caractere sunt cele care au capacitatea de a forma cuvinte și la ele este limitată evaluarea corectă a limitelor pe cuvinte realizată prin `\b`. Readu-ți aminte faptul că setul a cărui prescurtare este `\w` cuprinde și cifrele. Vice-versa sunt caracterele pentru care avem prescurtarea de negare `\W`.

Dacă șirul debutează cu un caracter parte a unui cuvânt, motorul RegExp poziționează valid limita `\b` chiar înaintea acelui caracter atunci când își începe evaluarea. Adu-ți aminte că `\b` are dimensiune zero, este doar o ancoră.

Constrângerea se poate face ori la începutul cuvântului, ori la încheierea sa.

```javascript
var sir = 'Un pământean apăru în prag. Era negru pământ.';
var cautare = sir.match(/\bpământ\b/g);
console.dir(cautare); // apare o dată
```

Fii atent că `\b` ca considera punctele și liniile ca terminații, ca limite. De aceea în exemplul de mai sus este găsit fragmentul de la final.

Opusul este folosirea lui `\B` care va potrivi doar fragmentele care sunt continuate, și care nu au un spațiu după sau înainte.

```javascript
var cautare = sir.match(/pământ\B/g); // o potrivire
```

Tot pe această direcție, pot fi folosite caracterele `\s`, care indică chiar un spațiu sau un tab.


#### Cuantificatori

| Caracter | Semnificație |
|:---------|:-------------|
| `*` «asterix» | \[**cunoscut ca și „cuantificator”**] indică că va face o căutare după expresia de dinaintea lui de 0 sau mai multe ori. Este echivalentul lui `{0,}`. De exemplu, `/au*/` găsește și în „auuu, ce doare”, în „am găsit aur” |
| `+` | \[**cunoscut ca și „cuantificator”**] precizează că se va face căutarea după expresia anterioară de una sau mai multe ori. Este echivalentul lui `{1,}`. De exemplu, `/a+/` va găsi în „casa” și în „aaaaau!”. |
| `?` | \[**cunoscut ca și „cuantificator”**] Menționează faptul că se va face căutare după expresia anterioară. Rezultatul poate fi 0 sau poate apărea o singură dată. Este echivalentul lui {0,1}. `"știință".match(/n?ță?/); // [ "nță" ]` `"gablonț".match(/n?ță?/); // [ "nț" ]` `"țeavă".match(/n?ță?/); // [ "ț" ]`. Dacă se folosește imediat după cuantificatori (*, +, ?, ori {}), transformă cuantificatorul într-unul non-greedy (adică cât mai puține caractere posibil), opus comportamentului natural (găsirea a cât mai multe caractere posibil). De exemplu, `"caractere 1437675".match(/\d+/gui); // [ "1437675" ]`. Dar combinând cu ? înseamnă caută numere întregi, și adu-le rând pe rând în array-ul rezultatelor: `"caractere 1437675".match(/\d+?/gui); // [ "1", "4", "3", "7", "6", "7", "5" ]`. Acest lucru se întâmplă pentru că șirul numerelor este consumat de la stânga la dreapta iar expresia se limitează la fiecare cifră oprindu-se, apoi reia căutarea de la șirul rămas și tot așa. |
| `.` | Punctul identifică toate caracterele posibile (litere, simboluri, numere), dar fără caracterul newline (`\n`). De multe ori este asemănat unui wildcard cu care poți substitui orice(nu și new lines). Adevăratul wildcard totuși este  setul **\[\s\S]** - identifică tot ce este whitespace și tot ce nu este whitespace, pe scurt, orice. Un exemplu pentru a înțelege: `"acuma mai multe mere a anemice cam anapoda a".match(/.a/); // [ "ma" ]`. Dacă activezi globalul, vei avea `// [ "ma", "ma", " a", " a", "ca", " a", "na", "da", " a" ]`. Ceea ce este observabil este faptul că, în cazul menționat aduce litera a și una înaintea ei, dacă aceasta a fost găsită într-un cuvânt. Ordinea o dă poziția punctului. Dacă era așezat după caracterul căutat aveam `[ "ac", "a ", "ai", "a ", "an", "am", "an", "ap", "a " ]` |

Apoi avem o paletă foarte expresivă de caractere care pur și simplu țin locul celor din alfabet sau spațiilor goale indiferent care ar fi acelea. Aici permutările posibile fac posibile orice combinații imaginabile.

#### Metacaractere locțiitor

**Backslash**

| Caracter | Semnificație |
|:-------- |:------------ |
| `\` «backslash» | indică faptul că următorul caracter are înțeles special pentru sistem. |

Caracterele care indică un anumit curs de acțiune pentru motorul RegExp sunt speciale sunt numite și „metacaractere”. De exemplu, `/a*/` înseamnă caută un a, care poate fi urmat de mai mulți a, dar `/a\*/` înseamnă caută chiar `a*` - a urmat de o steluță. Însuși backslash-ului trebuie să i se facă „escaping” pentru a fi tratat ca orice caracter simplu: `/\\/` - caută un `\`.

**Cifrele**

| Caracter | Semnificație |
|:---------|:-------------|
| `\d` | Specifică un caracter numeric, adică un singur digit. |
| `\D` | Caută tot ce nu este digit și aduce un șir dacă șirul original începe cu caractere începând cu primul digit.|

Metacaracterul `\D` este negarea lui `\d`.
În cazul negării, dacă șirul original începe cu un digit nu este adus niciun rezultat. De exemplu, `"saturn4 23".match(/\D/); // ["s"]` și `"saturn4 23".match(/\D+/); // ["saturn"]`

**Caracterele albe, spațiile goale**

| Caracter | Semnificație |
|:---------|:-------------|
| `\s` | Identifică un singur spațiu gol, incluzând: *spațiu*, *tab*-urile, *form feed*, *line feed* și alte spații din schema Unicode. De exemplu, `"ana are mere".match(/\s\w*/)` identifică `[" are"]`, deci, primul cuvânt de după primul spațiu |
| `\S` | Identifică orice caracter, dar nu și un spațiu gol. De exemplu, `"ana are mere".match(/\S\w*/);` identifică `["ana"]`. Practic, am putea spune că este negarea lui `\s`.|

**Caractere de control și machetare**

| Caracter | Semnificație |
|:---------|:-------------|
| `\t` | Identifică un tab orizontal |
| `\r` | Identifică un carriage return |
| `\n` | Identifică un new line |
| `\v` | Identifică un tab vertical |
| `\f` | Identifică un form feed |
| `[\b]` | Identifică caracterul backspace și nu trebuie confundat cu `\b` |

**Caractere nule și setul Latin al Unicode**

| Caracter | Semnificație |
|:---------|:-------------|
| `0` | Identifică un caracter NUL |
| `\w` | Identifică orice caracter din setul de bază Latin și majusculele, incluzând și underscore. |
| `\W` | Este negarea identificării cu `\w`. Identifică orice caracter care nu este un caracter dintr-un posibil cuvânt format cu Latine. De exemplu, /\W/ identifică „%” din 50%. |
| `\cX` | Unde `X` este un caracter de la A la Z, fiind un caracter de control. |

**Potrivirea directă pe code pointuri Unicode**

| Caracter | Semnificație |
|:---------|:-------------|
| `\xhh` | Unde hh sunt coduri de caracter iar fiecare h este un digit hexazecimal. |
| `\xhhhh` | Unde hhhh sunt coduri de caracter iar fiecare h este un digit hexazecimal. |
| `\u{hhhh}` | Unde hhhh sunt coduri de caracter iar fiecare h este un digit hexazecimal pentru un caracter Unicode. Funcționează numai când fanionul pentru Unicode este menționat |

Este posibilă și gruparea caracterelor atunci când este necesară o construcție mai elaborată.

### Alternative

Uneori ai nevoia să-i spui motorului să facă o căutare după un caracter sau o alternativă la acesta. Acest lucru este posibil folosind un caracter special numit pipe.

| Caracter | Semnificație |
|:---------|:-------------|
| `a`<code>&#124;</code>`b` | Îl identifică, fie pe a, fie pe b |

Un caz ar fi atunci când dorești să găsești mai multe fragmente într-un șir.

```javascript
var paginaWeb = '<a href="/undeva">resursă</a><link rel="stylesheet" href="/style.css"><script type="text/javascript" src="/js/main.js"></script>';
var identificate = paginaWeb.match(/area|a|link|script|source/ig);
console.log(identificate);
```

Este specificat să se ignore majusculele și să se facă căutare la nivel global. Fără specificarea fanionului `g`, s-ar fi returnat doar prima potrivire. Fii foarte atent la faptul că mai întâi motorul evaluează șabloanele și apoi se face potrivirea.

```javascript
var sir = 'Desenez un balaur';
var sablon = /\bbalaur|zmeu|păsărilă|sfarămă-piatră\b/;
console.log(sir.match(sablon)); // ["balaur"]
```

Reamintește-ți mereu că motorul RegExp este „nerăbdător” să facă o potrivire așa că în cazul în care oricare din alternative va potrivi un fragment de caractere, se va declara mulțumit și acela va fi rezultatul. Concluzia este că ordinea șabloanelor în seria de alternative este crucială.

### Seturi de caractere (*ranges* sau *clase*)

Într-un set poți specifica caracterele care să permită o regăsirea mult mai rapidă după niște criterii care să ofere o mai mare flexibilitate. În alte lucrări mai sunt denumite și **clase**. Noi vom folosi termenul de **set**.

**Moment ZEN**: Ordinea caracterelor dintr-un set nu contează.

De exemplu, un set pentru regăsirea după caracterele a, b și c este menționat astfel: `[abc]`.

```javascript
var sir = 'abecedar abc';
var cautare = sir.match(/[abc]/g);
console.dir(cautare);
```

Fără niciun fanion specificat, se va face regărirea primului caracter din set, când acesta este întâlnit în șir. Căutarea se va opri aici. Folosirea fanionului `g`, va avea ca efect căutarea în întreg șirul după fiecare caracter din setul specificat.

Grupul cel mai interesant este cel care permite codarea oricărui caracter indiferent de funcția și însemnătatea care ar putea-o avea. Pur și simplu potrivește cu orice.

| Caracter | Semnificație |
|:---------|:-------------|
| `[\s\S]` | Identifică cu adevărat orice caracter, fie el spațiu sau nu. Este un adevărat wildcard - locțiitor de orice. De exemplu, `"acuma mai multe mere a anemice cam anapoda a".match(/\s\S/)` identifică primul „m” de după primul spațiu. Adăugarea flagului g are darul de a aduce toate literele imediat de după spațiu `[" m"," m"," m"," a"," a"," c"," a"," a" ]`, iar adăugarea cuantificatorului `+`, aduce în array toate cuvintele din șir: `"acuma mai multe mere a anemice cam anapoda a".match(/\s\S+/g); // [" mai"," multe"," mere"," a"," anemice"," cam"," anapoda"," a" ]`|


Acestea sunt cunoscute și sub denumirea de clase de caractere, dar cel mai apropiat de o simplă înțelegere a funcționalității este aceea de set. Întregul set este evaluat doar la un unic caracter, care se găsește în set. Setul poate fi înțeles ca totalitatea caracterelor care rând pe rând, vor fi luate în considerare la momentul căutării în șir.

| Caracter | Semnificație |
|:---------|:-------------|
| `[abc]` sau `[a-c]` | Este un set de caractere. Identificările se fac după oricare dintre caractere: ori a, ori b, ori c. Prin specificarea liniuței îi spui motorului RegExp să includă toate caracterele între cele două menționate la stânga și la dreapta.|
| `[^abc]` sau `[^a-c]` | Este un set de caractere negat. Identificările se fac după oricare dintre caractere mai puțin cele precizate astfel |

Nu se vor face niciodată potriviri după două din set sau mai multe. Doar unul singul la o unică operațiune de căutare. Este ca și cum ai un locaș în care poate intra dor o singură piesă cu profil pătrat și ai o pungă cu mai multe fragmente unice, care ar putea constitui tot atâția candidați. Când vine vorba să fie atașat în locaș fragmentul care corespunde, motorul scotocește în pungă și scoate rând pe rând câte un fragment până când îl găsește pe cel căutat. Sau nu!

Linia va specifica limitele setului. Cel mai uzitat exemplu este căutarea prin întreg setul de caractere de la a la z: `[a-z]` sau majusculele `[A-Z]` ori cifrele `[0-9]`. Linia spune motorului RegExp să constituie un ***set***. O mică precizare pentru a elimina confuziile: pentru a face potrivire după însăși caracterul `-`, trebuie precedate de backslash.

Poți combina în același set mai multe subseturi. De exemplu, setul `[a-zA-Z0-9]` spune motorului că potrivirea se va face după toate caracterele precizat de subseturi, fie acestea litere sau digiți.

#### Rolul metacaracterelor în seturi

În cazul seturilor sunt doar câteva din metacaracterele care îți joacă rolul lor. Acestea sunt `[]`, care indică setul în sine, backslash `\`, carret `^` și hyphen `-`. Restul sunt simple caractere care nu au niciun înțeles specific pentru motorul `RegExp`. Pentru ca matacaracterele să fie incluse au nevoie să fie precedate de backslash (escape sequence). Poți să le introduci și direct doar dacă nu vor ocupa o poziție care să activeze înțelesul lor de metacaracter. De exemplu: `/[a^]/`.

```javascript
var sir = "^Am scris \a^.";
var sablon = /[\\a^]/;
console.log(sir.match(sablon));
// [Array] ["^"]
```

Utilitatea? Uite, de exemplu, poți face căutări după caractere care în afara parantezelor pătrate ar fi fost metacaractere: `/[*]/` - faci căutare după o steluță. Poți face și escape, dar reduce lizibilitatea codului.
Backslashul are nevoie de alt backslash pentru a fi tratat ca un caracter normal.

#### Puțină practică cu seturile

Uite, ceva foarte util. Parsarea însăși a codului sursă JavaScript pentru căutarea unui identificator, care deja știm că poate fi orice caracter plus `_` și `$`: `[A-Za-z_][A-Za-z_0-9]*`. Sau potrivirea unui tag HTML `<[A-Za-z][A-Za-z0-9]*>` - primul set forțează căutarea unui caracter, nu a unei cifre. Din tot ce-am povestit aici o conluzie care să ne ajute în orice moment este că trebuie să știi bine ce cauți și cum arată.

Un alt exemplu de set foarte util este cel care are comportament de întreruptor cu sensul de „asta sau asta”. Să spunem că avem două variante care ar putea fi introduse de utilizator: `cluj napoca` și `cluj-napoca`. Pentru a face o regăsire după ambele variante, vom opta pentru următoarea construcție regex: `/[cluj[- ]napoca]/`.

```javascript
var sir = 'cluj-napoca sau cluj - napoca sau cluj napoca';
var cautare = sir.match(/cluj[- ]napoca/g);
console.log(cautare); // ["cluj-napoca","cluj napoca"]
```

Sunt returnate ambele variante. Este folositor și pentru cazul în care vrei să oferi corecturi la cuvintele introduse cu erori de scriere: `/C[aâ]mpina/`.
Un detaliu foarte important privind seturile, este cazul folosirii punctului. În interiorul seturilor, punctul nu are înțelesul de „orice caracter”, rol pe care-l are în construcțiile regex. În interiorul seturilor, punctul este punct. Asta permite identificarea de numere întregi, de exemplu. O construcție `[\d.][\d.]\d` poate regăsi toate numele întregi: `0.1` sau `.34`.

Seturile pot fi repetate folosind cuantificatorii.

Recunoașterea fragmentelor de text care menționează ora sau data se poate face foarte rapid cu ajutorul unui set.

```javascript
var sablon = /[0-9:amp]/;
sablon.test('10am'); // true
```

#### Negarea setului

Seturile de caractere pot fi negate în sensul că se va face potrivire după toate caracterele posibile, mai puțin cele specificate în set. Atenție! Spre deosebire de punct `.`, care are în intenție potrivirea tuturor caracterelor, folosirea unui set negat va lua în considerare și caracterele invizibile cum sunt *line breaks*, de exemplu.

Pentru a nega folosirea setului, pur și simplu pui caracterul `^` la început: `[^c-f]`, cu înțelesul de ocolește partea șirului care conține acest set de caractere. Carret trebuie pus chiar la început imediat după paranteza pătrată dacă dorim negarea. Dacă este în altă poziție, pur și simplu e și el parte a setului de caractere.

Există o nuanță semantică pe care trebuie să o lămurim. Când ai un șablon de genul `/al[^i] doilea/`, înțelesul corect este **al** care poate fi urmat de orice caracter, dar nu și de **i**. De ce este relevantă precizarea? Pentru că în locul acelui **i**, care nu este permis poate fi un spațiu, iar spațiul va fi returnat ca partea potrivirii. Negarea poate fi înțeleasă ca un wildcard care elimină anumite caractere sau combinații de caractere indezirabile (vezi grupările), dar care poate fi orice altceva plus setul invizibilelor.

La ce ar fi utilă o astfel de opțiune? De exemplu, pentru a elimina anumite caractere de control pe care le folosești pentru a demarca fragmente de text, taguri, etc. Sau mai poți avea cazul în care dorești să corectezi numele de fișiere pentru a nu conține caractere altele decât cele din setul Latin, ș.a.m.d.

Ai putea folosi negările pentru a marca tot ceea ce NU vrei să intre în componența subșirului care ar putea fi găsit. Îți poți închipui un marker negru cu care s-au acoperit anumite caractere sau fragmente întregi dintr-un text al unui document secret.

#### Prescurtările pentru seturi

Acestea pot fi rezumate astfel:

- `[0-9]`     : `\d`,
- `[^\d]`     : `\D`
- `[A-Za-z]`  : `\w`,
- `[^\w]`     : `\W`
- `[ \t\r\n]` : `\s`,
- `[^\s]`     : `\S`,
- `[^\n]`     : `.`

Reține faptul că prescurtările se pot folosi și în interiorul seturilor: `[\d\s]`.

### Cuantificatorii pe îndelete

Am descris deja pe scurt comportamentul lui `+`, `?` și `*`.

| `+` | `?` | `*` |
|:--|:--|:--|
| {1,n} | {0,1} | {0,n} |

**Cum să le ții minte?**

Pentru `+`, ține minte că adaugi ceva la ceva ce există deja, deci trebuie să existe cel puțin o dată șirul sau caracterul potrivit și continui cu șablonul la infinit, mai exact, până la epuizarea resursei de șir; are un caracter expansiv precum omida vorace, care va mânca toată păstaia indiferent că e satisfăcută foamea sau nu.

Pentru `*`, gândește-te ca la Big-Bang: din nimic, din 0 la infinit orice; deci șirul poate să existe sau nu.

Cât despre `?`, pur și simplu este ca un „if”: bre! exiști sau nu?! Deci, potrivește dacă există, dacă nu, se trece mai departe, la următoarea regulă a șablonului.

Acum că știm cum să folosim seturile, le putem atașa cuantificatori pentru a atinge căutări ceva mai rafinate. Un set de tipul `/[A-Z][a-z]+/g`, va găsi toate numele de persoane dintr-un șir: `Ana, George și emi`. Ultimul este intenționat scris fără majusculă pentru a face diferența.

```javascript
var sir = 'Ana, George și emi';
var cautare = sir.match(/[A-Z][a-z]+/g);
console.dir(cautare); // [Ana, George]
```

Dacă dorești să potrivești fragmente de taguri XML sau HTML, nu te lăsa păcălit de un șablon simplist precum `<.+>`. La ceea ce mă refer când spun fragmente de taguri sunt cazurile când poate dorești să extragi tagul cu toate atributele specificate. De exemplu, `<p style="color: red">`.

Șablonul menționat are în intenție returnarea primului tag, cel care deschide și va funcționa aducând toate caracterele posibile care pot fi potrivite cu punctul, adică orice caracter (mai puțin `\n`) până când va întâlni ultima croșetă de închidere din șir, aceasta fiind și regula cu care se încheie șablonul regex. Este evident comportamentul expansiv (greedy) al plusului în șabloanele regex.

```javascript
var sir = '<div><p>Un <cite>citat.</cite></p></div>plus ceva';
var sablon = /<.+>/;
console.log(sir.match(sablon));
// ["<div><p>Un <cite>citat.</cite></p></div>"]
```

Acest lucru se petrece pentru că punctul ia în considerare prima croșetă drept reper de pornire pentru căutare, continuând cu toate celelalte caractere întâlnite, până când va ajunge la poziția de după ultimul caracter din șir. Este ca și cum tragi cu un pistol la țintă, iar glonțul lovește ținta, trece prin ea, trece și se oprește în perete. În cazul nostru, va trece și prin caracterele suplimentare, pe care le-am pus pentru acest exemplu: `plus ceva`.

Abia atunci motorul RegExp va privi ultimul caracter și-l va compara cu cel din regex pentru a vedea dacă este ce caută pentru a satisface șablonul. Supriza pentru motor este că ultimul caracter nu este cel specificat în șablon și va face cale întoarsă până ce va da de primul carater care se potrivește cu cel specificat în șablon după plus. În cazul nostru `>` pe care-l va returna ca potrivire.

Operațiunea de a merge înapoi pe șir pentru a satisface căutarea se numește `backtracking` (back înseamnă „înapoi” și tracking „a urma”). Sau „a face cale-ntoarsă”. După ce a făcut backtracking, va returna „nerăbdător” ceea ce a găsit.

Cum transformi comportamentul expansiv (**greedy**) într-unul autosuficient (**lazzy**)? Adaugi imediat după plus cuantificatorul `?`.

```javascript
var sir = '<div><p>Un <cite>citat.</cite></p></div>plus ceva';
var sablon = /<.+?>/;
console.log(sir.match(sablon));
// [ '<div>',
//  index: 0,
//  input: '<div><p>Un <cite>citat.</cite></p></div>plus ceva' ]
```

Asta totuși nu rezolvă problema backtracking-ului, care totuși se va face, va taxa performanța motorului RegExp. La o folosire simplă, backtracking-ul nu se simte ca taxare de performanță, dar atunci când potrivirea se face pe ciclurile unei bucle, induce o întârziere.

Cuantificatorul `?`, de exemplu, permite căutarea apariției membrilor unei familii de cuvinte știind că au o parte comună. Cuvântul `pământean` face parte din familia de cuvinte a lui `pământ`.

```javascript
var sir = 'Un pământean apăru în prag. Era negru pământ.';
var cautare = sir.match(/pământ?/gi);
console.dir(cautare); // apare de 2 ori
```

De fapt, nu e chiar atât de inteligent RegExp-ul, ci doar spune că acea combinație de caractere trebuie să apară în șir numărându-se de câte ori apare indiferent ce precede sau cu ce continuă.

Un strop de inteligență ar fi să introduci alternative într-un grup, care, la rândul său să existe sau nu.

```javascript
var sir = 'Un pământean apăru în pragul pământiu. Era negru pământ.';
var cautare = sir.match(/păm[îâ]nt(ean|iu|os)?/g);
console.log(cautare);
// ["pământean","pământiu","pământ"]
```

Încă un caz interesant și te las. Gândește-te că în text abundă date calendaristice care nu sunt scrise uniform. Ba „oct”, ba „octombrie”. Întrebarea este cum le potrivești pe toate cu un singur șablon.

```javascript
var sir = 'Era octombrie. Calendarul spunea 12 oct.';
var sablon = /oct(ombrie)?/g;
console.log(sir.match(sablon));
// ["octombrie","oct"]
```

Ceea ce se mai observă este că metacaracterul `?` este unul care implică comportamentul expansiv (**greedy**). De ce? Pentru că spune motorului că musai trebuie să potrivească șablonul ca mai apoi să se dea bătut dacă acesta are corespondent în string. Pentru a face șablonul autosuficient (**lazzy**), ar trebui să mai pui un metacaracter `?` după primul.

Cuantificatorul `*` este combinația celor dinainte. Este și el un cuantificator expansiv încercând să consume întreaga resursă de șir.

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
## Ancorarea și constrângerile de căutare

Ancorele sunt menite a poziționa procesul de căutare înainte sau între caractere.

Metacaracterul carret `^`, inițiază procedura de căutare începând de la poziția de dinaintea primului caracter al șirului. De exemplu, `/^a/` va potrivi corect în șirul `agrar` pentru că avem caracterul `a`, care deschide șirul în acest caz.

Similar este comportamentul metacaracterului `$`, care marchează limita imediat de după ultimul caracter al șirului. De exemplu, `/r$/`, va potrivi corect caracterul `r` dintr-un șir ca „dar”.

O căutare după un șablon încadrat de `^` și `$`, va căuta ca șirul să debuteze strict cu acel caracter care stă imediat după `^` și care se încheie cu acel caracter menționat imediat înaintea lui `$`.

```javascript
var sablon = /^ceva$/;
sablon.test('ceva');
// true
```

În cazul în care avem șiruri care conțin o rupere printr-un *new line*, de exemplu, `am găsit\nocomoară`, *carret* (`^`), va potrivi înaintea lui caracterul **a** din deschiderea șirului, dar și pe **o** imediat de după `\n`. Dollar va potrivi imediat înaintea lui `\n` și imediat după `ă` de la finalul întregului șir.

**Moment Zen**: Ancorele marchează o poziție, nu un caracter. `^` și `$` sunt doar poziții cu dimensiune 0, adică de dinaintea și de după șirul real.

Cel mai simplu caz de utilizarea a ambelor limite este pentru a testa dacă un fișier sau șir este vid, adică dacă nu conține absolut nimic.

```javascript
var sablon = /^$/;
sablon.test('');
// true
```

Un caz ceva mai elaborat este cel al precizării limitelor de căutare.

```javascript
var sir = 'Unu la cap, iar la fine unu';
var cautare = sir.match(/^unu|unu$/gi);
console.dir(cautare); // 2 potriviri
// [ 'Unu', 'unu' ]
```

În cazul `^unu|unu$` s-a căutat dacă șirul începe cu `unu` și se termină cu `unu`.
Atenție mare, folosirea ambelor caractere cu un șablon între, va spune că ceea ce este în șablon, va trebui să fie între limite strict. De exemplu, `^ceva$`, chiar așa trebuie să arate șirul de caractere ca să se facă regăsirea cu succes.
Dacă cuplezi carret `^` cu fanionul `m`, căutarea se va face pentru fiecare început de linie. Același lucru este valabil și pentru `$`.

## Lazy (*autosuficient*) și greedy (*expansiv*)

În mod natural, expresiile regulate au un comportament `greedy`, adică vor încerca să facă identificări până când resursa de șir este epuizată.

Un exemplu simplu pentru a înțelege natura expansivă a RegExp-ului, este cel al definirii limitelor: `/\d{2,5}/`. În acest caz, va găsi toate caracterele număr între 2 și 5, dar toate. Va epuiza acolo unde poate toate caracterele număr. Pentru a limita acest comportament, poți pune după șablon un `?` și astfel îi vei spune motorului să fie „foarte leneș” (în limba engleză *lazy* înseamnă leneș) în căutare. În general în programare, termenul de *lazy* implică principiul calculării unei valori prin evaluarea expresiei doar dacă este absolut necesar. În cazul nostru, dacă a dat peste primele două caractere numerice, să se oprească acolo fiind suficient pentru a satisface acest șablon. Nu va încerca să caute mai departe până la cele 5 indiferent că acestea exisă, au ba.

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

La ce ar folosi să știm asta? Ia gândește-te că dorești să prelucrezi fragmente de JSON (date codate folosind schema JavaScript Object Notation).

## Grupări

Grupările pot fi gândite ca posibilitatea de a construi șabloane elaborate, adevărate propoziții. Gruparea permite formularea de expresii secundare, care pot fi tratate ca și o unitate.

| Caracter | Semnificație |
|:---------|:-------------|
| `(x)` | Identifică x și ține minte ce a găsit. Acestea sunt numite grupuri de captură. Subșirurile descoperite pot fi reapelate din array-ul rezultatelor sau din proprietățile predefinite ale obiectului RegExp ($1, ..., $9). Atenție, folosirea grupurilor penalizează performanța. Dacă nu este nevoie de un apel la substringurile descoperite, mai bine se face identificarea fără paranteze. |
| `\n` | n este un număr întreg pozitiv |
| `(?:x)` | Îl identifică pe x, dar nu-l ține minte, nu-l „capturează”. |
| `x(?=y)` | Spune că `x` nu va fi returnat la potrivire dacă nu este urmat de `y`. Această procedură se numește în engleză „lookahead” - privește înainte. De exemplu în `Ion Amariei`, șablonul `Ion(?=Amariei)`, va returna doar dacă Ion este urmat de Amariei. |
| `x(?!y)` | Este fix inversul `lookahead`-ului. Șablonul va potrivi doar dacă x nu este urmat de y. |

Grupurile arată și ca niște rețete în care ingredientele indică modul în care se va face regăsirea. Grupurile permit o mai bună „țintire” a subșirurilor dorite. Să spunem că ai trei secvențe de caractere despărțite de spații și dorești să le regăsești. În loc să faci reguli care să potriveastă ceea ce sunt, ai putea face grupuri care să cuprindă ceea ce nu sunt.

```javascript
var sir = 'Un posibil fragment.';
var sablon = /(\S+) (\S*) ?\b(\S+)/;
var cautare = sablon.exec(sir);
console.log(cautare);
// ["Un posibil fragment.", "Un", "posibil", "fragment."]
```

Explicația evaluării regexului construit în exemplu este următoarea. În șirul propus, dorim să extragem primele trei cuvinte. Pentru aceasta, voi crea primul grupaj - `(\S+)` - de caractere a primului cuvânt spunând așa: selectează-mi toate caracterele care nu sunt spații, dacă există cel puțin unu. Apoi punem în șablon un spațiu pur și simplu fără a-l marca cu `\s` și purcedem la identificarea celui de-al doilea grupaj - `(\S*)` - care spune așa: selectează-mi toate caracterele care nu sunt spații indiferent de caractere pornind de la 0 la n. De fapt, ceea ce dorim este să testăm dacă există un cuvânt între alte două. De aceea testăm cu `*` pentru că oferă posibilitatea să nu existe cuvântul „intern”. Apoi urmează cel de-al doilea spațiu și aici facem o limitare la o identificare limitată pentru spațiu; poate să fie sau nu. Este doar în cazul în care avem cuvântul „intern”, în cazul nostru *posibil*. Încă nu este îndeajuns și precizăm cu `\b` că aceasta este limita căutării pentru secvența de dinaintea ultimului cuvânt. De la limită avem ultimul grup `(\S+)`, care spune: extrage tot ce nu este spațiu dacă am cel puțin un caracter non-spațiu.

Ce se întâmplă când ai doar două cuvinte și nu trei așa cum ai dori.

```javascript
var sir = 'Un fragment';
var sablon = /(\S+) (\S*) ?\b(\S+)/;
var cautare = sablon.exec(sir);
console.dir(cautare);
// ["Un fragment", "Un", "", "fragment"]
```
### Gruparea și capturarea rezultatului

Gruparea permite și așa-zisa „capturare”, de fapt o memorizare a rezultatelor grupurilor pentru a fi utilizate ulterior.

Grupurile care să nu captureze rezultatele sunt de preferat.

Avantajul grupării este că le poți aplica repetiții. În mod normal, repetițiile se aplică unui singur caracter sau set de caractere aflat la stânga metacaracterului.

Prin grupare putem construi un regex care să identifice o adresă web incluzând și protocolul.

```javascript
var adrese = '<a href = "http://www.kosson.ro">Un site interesant</a><link rel="stylesheet" href="https://cloudshare.io/main.css">';
var identificare = adrese.match(/(?:https?)?\/\/[a-z][a-z0-9-]+[a-z0-9]+/ig);
// (?:https?)? ?: spune că este un grup care nu trebuie capturat.
```

Un exemplu interesant în care gruparea poate fi folosită ca un model alternant, ar fi cel în care o parte a unui cuvânt poate apărea sau nu.

```javascript
var sir = 'Bună ziua! Noi facem bunăstare.';
var sablon = /bună(stare)?/;
console.log(sir.match(sablon));
// ["bunăstare","stare"]
```

Pentru că în cazul prezentat care tratează cazul cuvintelor compuse metacaracterul `?` are un comportament expansiv căutând întreaga combinație, rezultatul fiind acela că întreaga combinație este potrivită prima.

Tot din acest exemplu mai învățăm ceva despre metacaracterul `?`. Poate fi tratat ca un buton on/off pentru caracterul sau grupul sau setul după care stă.

Un exemplu ceva mai elaborat este parcurgerea unei structuri XHTML, care un ultim tag ce nu corespunde la secvența de închidere.

```javascript
var obi = {};
var sir = `<p>altceva</p>
<cite>altceva</cite>
<a href="http://www.ceva.ro">link</a>
<p>ceva</p>`;
sir.split('\n').forEach(function(linie){
  potrivire = /<([A-z][A-z0-9]*)[^>]*>(.*?)<\/\1>/.exec(linie);
  // <(\w+)>([^<]*)<\/\1> // alternativa nepretențioasă
  if(potrivire){
    var tag = potrivire[1];
    obi[tag] = potrivire[0];
  };
});
obi;
```

Acesta este un caz foarte simplu în care dacă avem elemente de același fel acestea se vor suprascrie în obiect.

### Backreferencing - căutare înapoi cu un pas

Gruparea activează un mecanism de memorizare care ține minte șirul de caractere pentru secvența șablonului dintre parantezele rotunde. Mecanismul de memorizare poate fi anulat la nevoie. Nu uita faptul că memorizarea (***backreference***) taxează ca și resurse. Dacă nu ai nevoie de ea, anuleaz-o. De exemplu, în `bună(stare)?`, fragmentul memorizat, la momentul extragerii din șir va fi `stare`. Pentru a renunța la memorizare pui imediat după deschiderea parantezei rotunde a grupului sintaxa specială semnul întrebării și două puncte: `?:`. Astfel, șablonul va deveni `bună(?:stare)?`. Sintaxa `?:` spune motorului să nu folosească capturarea, memorizarea.

Totuși, la ce ar fi bună memorarea fragmentelor de șir prin acest mecanism?
Poți folosi acest mecanism atunci când dorești să cauți și să înlocuiești secvențe de text.

Să presupunem că avem de parcurs un fragment XHTML, care este un soi de XML (Extended Markup Language) și avem de modificat ceva. Știm deja că XML-ul are o regulă strictă care spune că tagurile deschise trebuie închise, iar în cazul nostru: `<cite>Un citat</cite>`.

Fiecărui grup îi sunt asignate numere de la stânga la dreapta începând cu 1. Se pot referenția aceste grupuri cu backslash număr, de exemplu `\1`.

```javascript
var sir = '<p>Un <cite>citat.</cite></p><span>ceva</span>';
var sablon = /<([A-z][A-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
console.log(sablon.exec(sir));
// ["<p>Un <cite>citat.</cite></p>","p","Un <cite>citat.</cite>"]
```

Odată stabilit un backreference, poate fi folosit ori de câte ori se dorește.

```javascript
var sir = 'Acuma: ah ha ahaha axa';
var sablon = /([a-x])h\1h\1/i;
console.log(sir.match(sablon));
// ["ahaha","a"]
```

Un alt exemplu util ar fi depistarea cuvintelor care apar de două ori din diverse erori de scriere.

```javascript
var sir = 'am scris scris dublat';
var sablon = /\b(\w+)\s+\1\b/;
console.log(sir.match(sablon));
// [Array] ["scris scris","scris"]
```

## Lookahead pozitiv și negativ

Termenul de lookahead s-ar putea traduce ca o căutare cu anticipare.

Am menționat deja că un șablon `a(?=b)` indică motorului RegExp faptul că trebuie să avanseze pe șir pentru a satisface potrivirea lui a urmat imediat de `b` așa cum avem acum.

```javascript
var sir = 'abece';
var sablon = /a(?=b)/;
console.log(sir.match(sablon));
// ["a"]
```

Fii atent că un lookahead nu creează un backreference.

Un **lookup negativ** este construirea unui șablon care să nege potrivirea imediată a caracterului: `a(?!b)`. RegExp va fi instruit să caute orice `a` dar care să nu fie urmat de `b`.

```javascript
var sir = 'abac car'
var sablon = /(?!a)c/;
console.log(sir.match(sir));
```

## Șabloane folosite cu `String`

Șabloanele regex fac casă bună cu anumite metodele ale obiectului intern String.

### Căutarea folosind metoda `search(șablon)`

Metoda specializată acceptă drept argument un șablon regex pentru a face căutări.

```javascript
var ceva = 'Orice în care orice poate fi orice';
ceva.search(/orice/); // 14
```

Este returnat indexul la care apare pentru prima dată combinația specificată de șablon. De ce nu a luat în considerare și primul cuvânt? Pentru că litera o este o majusculă care are nevoie de alt șablon. Prima secvență care se potrivește perfect este la indexul 4 al șirului.

### Căutarea folosind metoda `match(șablon)`

Rezultatul unei căutări pe șir cu metoda `match` a obiectului intern `String`.

```javascript
var ceva = 'Orice în care orice poate fi orice';
var potriviri = ceva.match(/orice/);
console.dir(potriviri);
```

Rezultatul este un array, care are valoarea 14 pentru `index` și la `input` întreg șirul.
Dacă este activat fanionul `g`, regăsirea se va face pe tot șirul în toate combinațiile posibile și se va completa array-ul cu toate aceste variante.

### Înlocuirea unui șir folosind metoda `replace(șablon, înlocuitor)`

Adeseori regex-urile sunt cuplate cu metoda `replace` a obiectului intern `String`.

```javascript
var ceva = 'caut ceva';
ceva.replace('caut', 'am'); // "am ceva"
ceva.replace(/caut/g, 'vreau'); // "vreau ceva"
```

Se mai pot folosi expresiile regulate și cu metoda `split` a obiectului String.

## Referințe

Mozilla Developer Network [Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

Eloquent JavaScript. Second edition [Regular Expressions](http://eloquentjavascript.net/09_regexp.html)

Regular Expressions: The Complete Tutorial [Regular Expressions. The Complete Tutorial](https://www.princeton.edu/~mlovett/reference/Regular-Expressions.pdf)
