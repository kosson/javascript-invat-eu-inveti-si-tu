# Pentru voi!

Dedic acest efort copiilor mei, copiilor tuturor celor care vor citi materialele și vouă, celor care veți citi, veți învăța dorind să înțelegeți.

Este pentru voi colegii mei care lucrați în biblioteci și în instituțiile de memorie.

Speranța mea se îndreaptă către cei care vor reuși să stăpânească limbajul într-atât de bine încât să intre în etapa creativă fără întârziere. Nu este îndeajuns să folosești ceea ce îți este oferit de celalți, pur și simplu este nevoie să poți rezolva problemele reale cu care te confrunți.

## O resursă pentru a înțelege JavaScript

Oricine învață mai bine dacă scrie lucrurile pe care dorește să le înțeleagă iar această carte mă va ajuta și pe mine să înțeleg mai bine concepte și practici care se însușesc cu dificultate în timp. Am dorit să vă iau cu mine în această întreprindere pentru că îmi doresc să vă fac părtași unui model nou de a scrie cărți: cel incluziv, care expune totul înainte.
Ținta este realizarea unui material de învățare pentru JavaScript, care să fie eficient în înțelegerea aspectelor dificil de pătruns. Și acestea nu sunt puține.

Sunt cuprinse între coperți experiențe și note strânse după ce am citit și am vizionat multe alte lucrări dedicate acestui limbaj de programare.
Este posibil ca multe dintre interpretările mele sau felul în care explic să nu fie cel canonic, cel predat în școală sau în mediile academice dedicate. Limbajul adoptat este unul dedicat celui care dorește să înțeleagă fenomenul și să ajungă la contextualizare rapidă a anumitor concepte sensibile.

Materialele pot servi și ca date prelucrabile pentru un posibil sistem de învățare dinamic și adaptat pe subiect. În acest sens, unele materiale includ secțiuni intitulate „dependințe cognitive” sau „alonje”. Mai toate subiectele tratate conțin o secțiune intitulată „mantre”, care au scopul de a realiza liste de „atribute” care descriu aspectele cele mai importante.

## Anti-introducere

JavaScript este motorul dinamicii paginilor web și nu numai. Avantajele folosirii JS pornesc de la server (NodeJs), până la aplicațiile rulate în pagina web a utilizatorului.
Când vorbim de JavaScript, de fapt vorbim despre o implementare, adică de respectarea tuturor regulilor pe care le impune standardul ECMAScript.

Programarea ar fi util să fie înțeleasă ca o limbă nouă pe care trebuie să o înveți. De aceea se numește și limbaj. Acest limbaj are o gramatică proprie cu toate regulile pe care le poate avea, de la felul în care înșirui caracterele, până la modul în care faci enunțurile pentru a avea sens și pentru un computer atunci când le evaluează.

### Astăzi întrebarea este `cum`, nu `de ce`

Pentru că această colecție se adresează și bibliotecarilor, nu mai poate fi despărțită nevoia de cerință. Ceea ce doresc să subliniez este faptul că aproape toate serviciile moderne ale unei instituții de memorie nu mai pot fi gândite fără o formă sau alta de prelucrare a datelor.

Întrebarea pentru toți profesioniștii domeniului științelor informării este în acest moment cum. Cum să învăț să gestionez date, cum să le manipulez, cum să le prezint pentru a fi mai ușor de înțeles celor care au nevoie de ele.

Această carte dorește să ofere o cale prin care să fie dobândite cunoștințe în domeniul programării îndeajuns de avansate, să permită o a doua natură celor care au nevoie să lucreze cu datele.

Una din țintele acestei cărți este aceea de a explica și însuși cunoștințele necesare de a manipula date, de a le transforma, și pentru a le genera dinamic într-o formă de prezentare.

Voi încheia pledoaria pentru acest drum cu o afirmație care se va dovedi adevărată pe măsură ce veți descoperi bucuria de a lucra cu structuri de cod ce permit prelucrarea: textul în sinea lui este o colecție de date. De fapt un array... te-am făcut curios?

## Perspectivă peste un tărâm

Atunci când am pornit la scrierea acestei cărți nu am avut nevoia să văd de pe orbită cum arată planeta JavaScript, dar pe măsură ce am avansat cu scrierea textului, am realizat că este nevoie să privești mai întâi din spațiu pentru a înțelege valoarea tuturor entităților și relațiilor pe care le stabilesc acestea la nivelul solului. Vorbim despre o adevărată lume, despre un tărâm special.

Textul standardului oferă cea mai bună perspectivă atunci când vine vorba despre un program JavaScript care este privit la lucru. Voi parafraza și cita acolo unde este necesar standardul pentru a contura un cadru cât mai complet.

Mai întâi este util să spun că standardul menționează chiar termenul de „realm” - **tărâm**: „înainte de a fi evaluat, tot codul ECMAScript trebuie asociat unui tărâm. Conceptual, un tărâm constă dintr-un set de obiecte intrinseci, un mediu global și tot codul ECMAScript care este încărcat în cadrul «scope-ul» acelui mediu global, precum și alte stări și resurse asociate”. Atenție, pentru fiecare „context de execuție în efect”, adică bucata de cod care este evaluată la momentul în care bagi capul în „căpița de cod care se execută”, se creează câte o nouă înregistrare pentru cum arată tărâmul.

Un tărâm este constituit dintr-un set de obiecte interne, obiectul global pentru tărâmul la care ne referim, cadrul lexical creat de însăși felul în care este redactat codul („lexical environment”) și elemente care au capacitatea de a crea șabloane. Toate tărâmurile care sunt create sunt evidențiate de o înregistrare specială numită de standard `Realm Record`. Din toată această mică listă reține faptul că JavaScript vine cu câteva lucruri din start care împreună cu programul scris de tine construiesc un tărâm.

Un program JavaScript este de fapt un grup de obiecte care comunică între ele. Obiectele acestea sunt niște colecții de proprietăți iar pentru fiecare dintre proprietăți există atribute care determină cum se pot folosi acestea. Proprietățile pot fi considerate ca niște cutii care conțin la rândul lor **obiecte**, **valori primitive** sau **funcții**.

**Moment ZEN**: ECMAScript este bazat pe obiecte.

Simplu, avem șase primitive în acest moment: `Boolean`, `Null`, `Undefined`, `String`, `Number` și `Symbol`.
Obiectele sunt de fapt membri ai tipului de obiect intern limbajului numit `Object`. Funcțiile sunt un tip de obiecte care în jargonul limbajului sunt de tip `callable` (pentru care se poate iniția un apel pentru a le executa), iar funcțiile care sunt identificate printr-o proprietate a unui obiect sunt metode ale acestuia.

Mai adăugăm că ECMAScript, adică JavaScript are niște obiecte cu care vine el din start (`built-in objects`).

Aceasta este cadrul foarte general.

## Mică anatomie a limbajului

Caracterele folosite pentru a scrie cod respectă standardul de codare Unicode. Toate elementele lexicografice care constituie codul în sine, cu excepția spațiului și a comentariilor, se numesc `token-uri`, adică `atomi lexicali`. Acești atomi lexicali, token-ii, sunt rezultatul parcurgerii unui fragment de cod (codul sursă) asupra căruia se aplică regulile lexicale specifice gramaticii pe care o impune standardul ECMAScript.

Textul sursă poate fi un `Script` sau un `Module`. Codul pe care-l scrii poate fi compus pe mai multe linii pentru că pentru JavaScript spațiile, taburile și line breaks-urile sunt spații albe și nu semnale că ar trebui să ia o decizie.

Spune standardul că mai întâi textul codului este parcurs pentru a-l „converti într-o succesiune de elemente de input” folosindu-se regulile lexicale. Aceste elemente de input sunt: token-uri, line terminators (line-feed, carriage return, line separator, paragraph separator), comentariile și white space (tab, spece, non-breakable space, line tabulation, form feed, no-break space). Imediat după această fază, acestă succesiune de elemente de input mai este parcursă încă o dată aplicându-se regulile gramaticale pentru a identifica ce este ce în text, care sunt identificatori, cuvintele rezervate limbajului, etc.

ECMAScript are un set de cuvinte rezervate care nu pot fi folosite decât în sensul efectelor care le sunt menite: `break, do, in, typeof, case, else, instanceof, var, catch, export, new, void, class, extends, return, while, const, finally, super, with, continue, for, switch, yield, debugger, function, this, default, if, throw, delete, import, try, await`.

Buna practică spune ca toate liniile de instrucțiuni în JavaScript să fie terminate prin punct și virgulă (`;`), chiar dacă motoarele care implementează ECMAScript la momentul evaluării codului, introduc automat (automatic semicolon insertion) acest caracter care spune că o anumită linie este o instrucțiune.

### Automatic semicolon insertion - introducerea automată a lui punct și virgulă

Unele declarații (statements) JavaScript trebuie să se termine cu punct și virgulă, fiind supuse mecanismului ASI - Automatic Semicolon Insertion:

Aceste declarații și instrucțiuni sunt:

- comenzi simple
- `let`, `const`, declarații de variabile
- `import`, `export`, declarațiile de module
- declararea expresiilor
- debugger
- `continue`, `break`, `throw`
- `return`

### Caracterele cu rol special

Există câteva caractere care necesită chiar acum la început de drum o atenție specială. Acestea sunt `'` (ghilimele simple), `"` (ghilimele duble), `\n` (end of line), '\r' (carriage return), '\t' (tab), '\\'.

JavaScript este un limbaj de programare folosit la manipularea șirurilor de caractere indiferent ce reprezintă pentru noi oamenii.
Caracterele de mai sus și combinațiile lor au un înțeles special pentru motorul de JavaScript, dar atunci când ele însele sunt necesare ca și caractere, fie că fac parte dintr-un text analizat, fie că se dorește compunerea unuia într-o manieră dinamică, aceste caractere trebuie să fie precedate de backslash (`\`).
În cazul ghilimelelor, ca bună practică, se vor folosi ghilimele simple pentru declararea șirurilor de caractere pentru că, fiind un limbaj strâns legat de markup-ul paginilor web, ar putea cuprinde ghilimele duble ca parte a fragmentelor de pagină web construite dinamic.

Acoladele `{}` au rolul de a indica mediul în care se va executa codul în JavaScript. Cel mai ades veți vedea că indică blocurile de cod ale funcțiilor. Între acolade veți introduce liste de instrucțiuni (**statements**) specifice JavaScript separate prin punct și virgulă `;`.

Ce sunt instrucțiunile?
Instrucțiunile sunt expresii (`expressions`), de fapt idioame specifice limbajului JavaScript. Reține, o expresie este o instrucțiune.

# Resurse

[ECMAScript® 2017 Language Specification](https://tc39.github.io/ecma262/)
Simpson, Kyle. [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
Haverbeke, Marijn. [Eloquent JavaScript](http://eloquentjavascript.net/)
