# Instrumentar

## Introducere - labirintul cu mai multe porți de intrare

Vom lucra foarte mult cu secvențe de cod pe care vei dori să le testezi pentru a vedea efectul imediat și astfel pentru a consolida ceea ce înveți. În ceea ce privește instrumentarul de bază, veți auzi cel mai adesea acronimul REPL care înseamnă `read–eval–print loop`, adică un instrument software, care preia fragmentul tău de cod, îl evaluează (îl rulează) și îți oferă rezultatul. La o simplă căutare online după cheia JavaScript REPL, veți găsi și o grămadă de instrumente online cu ajutorul cărora puteți să testați codul.

Pentru scopul de învățare a acestei lucrări, vom lua contact cu unul de bază: consola web. Cel mai simplu este în această consolă web pe care o accesați din browserul pe care-l folosiți. Am ales pentru acest manual browserul Firefox. Pentru a accesa consola web, pur și simplu apăsați tasta F12 și apoi alegeți Console.

Aici puteți introduce fragmentele de cod pentru a urmări rezultatele și pentru a experimenta din curiozitate.

Un alt instrument de test pentru cod este și Node.js, care odată instalat, poate fi utilizat ca un REPL foarte capabil. Acesta se folosește apelând comanda nodejs în Terminal. Odată apelată comada, se deschide consola Node.js. Nu uita, ca să o închizi dai de două ori CTRL + C.

Pe lângă acestea mai există o suită de instrumente online pentru evaluarea codului JavaScript, care mai de care mai utile. Câteva exemple: repl.it, jsbin.com ori jsfiddle.net. La ce bune acestea? Vă oferă posibilitatea de a schița rapid cod pentru a fi testat.

## Locuitorii tărâmului

Mă voi întoarce pentru scurt timp la conceptele cheie cu care vom lucra în JavaScript pentru că este nevoie să avem mai mult context. Menționam anterior că atunci când privești prin prisma standardului, motorul JavaScript trebuie să creeze un tărâm. Întrebarea care se pune este care sunt locuitorii acestui tărâm pe care trebuie să-i cunoaștem mai întâi?

### Primitivele

Primitivele sunt blocurile constructive. La ce mă refer este faptul că avem nevoie să lucrăm în mod curent cu numere, cu șiruri de caractere și cu valori de adevăr. Dar mai mult, în programare, mai este nevoie să exprimi și realități care se leagă în mod direct de felul cum este alocată memoria și mediul lexical pe care codul îl formează și astfel avem primitive precum valori nule (`null`), nedefinite [încă] (`undefined`).

Deci, avem primitivele cu care putem introduce date brute în evaluări: cifre, text și valori de adevăr.

### Obiecte

Când folosim browserul web al sistemului de operare, cel mai mare locatar este obiectul global iar acesta este `window`. Curioasă din fire, vei deschide repede browserul, vei apăsa F12 și în linia consolei vei scrie `window.` (`window` urmat de punct). De îndată ce ai scris numele obiectului global, vor „țâșni” toate proprietățile acestui obiect... obiectul care oferă tot ce spune standardul că ar trebui să fie. În Node.js chiar se numește `global`. Dacă ești curiozitatea personificată, având Node.js instalat pe sistem deja, deschizi un Terminal sau Command Prompt și inițiezi o sesiune de nodejs. Scrie `global` și vei vedea o descriere amănunțită a acestui obiect.

De fapt, în JavaScript totul este o proprietate a unui obiect și sau o metodă a unuia. Vorbim despre o metodă atunci când o funcție joacă un rol activ în interiorul unui obiect.

Și acum că tot am vorbit de obiecte anterior, vom depăși viziunea unei rodii pe care am propus-o în introducere pentru simplitate și vom folosi-o pe cea a unui robot. Un robot, chiar este un „obiect”. Hahaha!

Acum că avem la îndemână un robot, poți să-ți imaginezi o metodă ca pe un semnal transmis unui membru pentru a-l mișca. Hai să ne uităm nițel cam cum arată scris un mic robot care are o codiță ca mijloc de locomoție căruia îi dăm comanda să se miște.

![Ilustrare a unui obiect](IlustratieObiectCaRobotelCodat-Obiect-reprezentare.png "Un roboțel este un obiect")

Codul complet pentru un obiect este o listă de perechi cheie - valoare.

```javascript
var robotel = {
  ochi: 2,
  sunet: 'bing',
  deplasare: function miscCoada () {
    console.log(`mișc coada și fac ${this.sunet}`);
  }
};
robotel.deplasare();
// mișc coada și fac bing
```

După cum se vede, am trimis o comandă robotului meu printr-un apel la funcția destinată mișcării. Ai observat cum se face? Prin enunțarea obiectului cu care lucrez, apoi un punct ca să-i spun că vreau ceva de la el și apoi invocarea acțiunii, dar hai să-i spunem **metodă**. Cred că te-ai prins deja că o metodă e o funcție... îmi place, te miști repede.

M-a luat valul și am apăsat pedala. Cred că pentru moment este destul cât să ai o bază.

Toată execuția codului JavaScript se leagă de obiecte și felul cum interacționează obiectele unele cu celelalte. Sunt convins că ați reacționat citind acestea și întrebarea despre cui am lăsat funcțiile a apărut instant.

Funcțiile nu au fost uitate, dar le-am amânat introducerea pentru acest moment deoarece și ele sunt obiecte foarte speciale. Spre deosebire de restul, acestea pot fi invocate, pot fi apelate să facă ceva cu niște valori date.

Sper că acum nu ești confuz. Toate detaliile cu privire la acești membri ai ecosferei tărâmului JavaScript, vor fi lămurite în mare amănunt, fiecare la timpul lor.

Pentru a putea pătrunde aspectele de funcționare fără nici o altă întârziere, mai avem nevoie de ceva foarte important: instrumente de investigare. Odată revelate aceste instrumente, vom explora o secvență de cod pentru a vedea și cum trebuie să le manevrăm.

## O sondă în JavaScript

Sonda despre care doresc să vorbim este un obiect cu care JavaScript vine în propriul bagaj și pe care-l vom folosi ca pe un instrument de investigare în codul pe care-l executăm. Este vorba despre `Console`. Acesta este instrumentul primar pentru inspectarea codului în vederea îndreptării erorilor sau pentru a sonda cine, ce conține sau cum arată. Browserul expune `console` ca proprietate a obiectului global `window` și putem avea acces la el introducând în consololă adresa `window.console`. Dar cum în practică rădăcina `window` este ignorată, vom apela direct obiectul scriind în consolă `console.` (console punct). Acum vei vedea și ce funcționalități oferă în lista derulantă care a apărut.

Pentru a detecta valori sau pentru a inspecta anumite situații, cel mai ades vom folosi `console.log(expresie)` și / sau `console.dir()` iar atunci când avem nevoie de o afișare rapidă a felului cum s-a rulat o funcție, vom folosi `console.trace()`.

## Citirea cărții de identitate a locuitorilor

Ca și în realitate, fiecare locuitor al tărâmului JavaScript poate fi întrebat ce „hram poartă”. Există o comandă care poate fi dată pentru toți identificatorii pentru a afla ce se află în spatele lor. Aceasta este `typeof` și vă va oferi tipul valorii la care conduce identificatorul.

```javascript
var x = 10; typeof x; // number
```

Când nu este codul scris de tine, când ai îndoieli asupra unui identificator, poți să-l întrebi la ce tip de valoare face trimitere.

## Inspectarea codului la rulare și detectarea problemelor

Pentru momentul în care folosești biblioteci de cod care nu-ți aparțin sau atunci când scrii cod care produce erori sau rezultate neașteptate, cel mai adesea vei folosi un instrument pe care oricare browser modern îl pune la dispoziție: Debugger-ul. Erorile de cod se numesc „bug-uri” (insecte deranjante), iar acest instrument ajută la identificarea fragmentului de cod care le produce.
Vor fi îndeajuns de multe cazurile în care vei avea nevoie de acest instrument foarte util. În ciuda verbozității cu care am să însoțesc fiecare exemplu, fiecare situație, vei dori, pur și simplu să vezi cu ochii tăi cum funcționează.

Debugger-ul am putea să-l traducem în română cu o transliterare unu-la-unu prin „operator de dezinsecție”, dar pentru a fi foarte eleganți îl vom denumi „depanator”. Depanatorul este un instrument care permite parcurgerea unui fragment de cod încărcat în browser pentru a-i vedea comportamentul și efectele.

Chiar dacă multe din elementele cu care vom lucra în continuare pentru a exemplifica, nu vă sunt cunoscute, nu vă impacientați. Pur și simplu doresc să vă arăt care sunt posibilitățile acestui instrument și făcând asta, să reușesc să vă fac să asimilați câteva concepte de lucru în programare cum ar fi variabilele și funcțiile. Promit să explic pas cu pas ce se întâmplă.

Deschide editorul tău de cod preferat. Dacă nu ai unul deja, te invit să folosești editorul Atom. Dar să știi că orice editor este bun atâta vreme cât poți salva cu extensia de fișier `.js` și `.html`, fără adaosuri ciudate. Dacă ai deschis deja editorul, te rog, introdu următoarea secvență de cod și salveaz-o într-un director pregătit special dinainte. În același director vom mai introduce un fragment de cod, de data aceasta de html într-un pas următor. Deci, salvează cu denumirea de `primul.js` acum și lasă deschis pentru a privi la cod urmând explicațiile.

```javascript
var a = 10;           // break
function facCeva () {
  var a = 11;         // break
  console.log(a);     // break
  return a;           // break
};                    // break
facCeva();            // break
console.log(a);       // break
```

## Folosirea debugger-ului

Am terminat pregătirea codului JavaScript. Acum este necesar să folosim un fișier html care să folosească fișierul sursă pe care tocmai l-am creat drept resursă proprie.
Pentru acest lucru deschide un fișier nou pe care-l vom numi `index.html`. Fișierul va fi constituit din următorul fragment HTML.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="primul.js" charset="utf-8"></script>
    <title></title>
  </head>
  <body>
    <p>Exemplu pentru folosirea depanatorului.</p>
  </body>
</html>
```

Ai observat cum am făcut legătura cu fișierul JavaScript?

Am folosit tag-ul special `script` (în HTML, informația este codată între niște secvențe de text numite taguri precum `<html>pagina web</html>`), care specifică prin atributul `src="primul.js"`, că va trebui să încarce și să ruleze acest fișier sursă de JavaScript.

**Totul e pregătit? Ne lansăm!**

Acum, deschide fișierul `index.html` în Firefox și apasă tasta magică F12 pentru a accesa Developer Tools. Poți folosi și combinația CTRL + SHIFT + i. Acesta este un panou care expune o serie de instrumente cu care va trebui să te familiarizezi pentru că este centrul de testare și depanare a codului JavaScript. Este observabil tabul „Console” urmat de „Debugger”. În Console poți introduce cod JavaScript pentru a-l testa rapid, dar și pentru a vedea codul încărcat deja de browser. Dacă nu găsești fișierul, folosește combinația `CTRL + P`. Tastezi primele caractere ale numelui fișierului și îl încarci.

Vei vedea deja în consolă (din partea dreaptă sus apasă pe Toggle Split Toggle), în zona de consolă rezultatele execuției codului: 11 și 10.

Pune cu mouse-ul break point-urile pe liniile unde există comentariul `// break`. Comentariul l-am pus eu să vă vină mai ușor pentru a vă ghida. Ai reușit să pui un break point atunci când va apărea o săgeată albastră peste numărul liniei de cod. Fii foarte atent pentru că ordinea în care pui punctele ține de ordinea în care debugger-ul va urmări execuția codului. Pentru a nu complica povestea, pune break point-urile în ordine linie după linie până la sfârșit.

După ce ai setat toate punctele de inspecție ale codului (break point-uri), faci reîncărcare la pagină (apeși săgeata circulară din partea dreaptă imediat după caseta în care introduci adresa web). Astfel, se va porni debugger-ul și vei putea „păși” din punct de întrerupere în altul până la încheierea unei execuții simulate a codului. Vei avansa folosind F11. Am ales F11 pentru că în cazul când este întâlnită o funcție, se va intra și se va parcurge și codul din acea funcție.

Câteva detalii despre posibilitatea de a avansa prin codul scris - butoanele și expunerea funcționalității lor.
- Comanda **Play** (F8), înseamnă rulează tot codul până la următorul break-point setat.
- Comanda **Step over** (F10), spune debugger-ului să avanseze la linia următoare dacă ești în interiorul unei funcții.
- Comanda **Step in** (F11), spune: avansează la linia următoare în cadrul funcției, dar dacă linia următoare este invocarea unei alte funcții, intră în acea funcție.
- Comanda **Step out** (Shift + F11), spune: rulează tot codul până la finalul funcției investigate în acest moment.

După cum vedem în exemplul prezentat, vom lucra cu patru enunțuri de cod separate fiecare prin punct și virgulă. Propun să pornim cu parcurgerea codului (hai, ia o piatră în gură dacă ești începător... va fi fain, curaj). Eram să uit, dacă ai dat de mai multe ori clic din greșeală și ai trecut repede pentru un pas, pur și simplu, reîncarcă pagina și ia-o de la capăt.

![Momentul 0 al parcurgerii secvenței de cod](StartDebugger.png)

### Variabila

Vom declara variabila `a`, ceea ce conduce la crearea unui identificator și vom atribui identificatorului `a` valoarea `10`.
 - pentru aceasta vom folosi cuvântul rezervat limbajului `var`. Acesta spune motorului JavaScript că următoarea secvență de caractere de după un spațiu este numele identificatorului;
 - după ce am dat un nume pentru identificator, urmează un operator, în cazul nostru semnul egal `=`, care are scopul de a atribui valoarea de `10` lui `a`, ceea ce pentru motorul JavaScript este echivalentul stabilirii unei legături dintre identificatorul `a` cu valoarea `10`. E ca și cum am pune valoarea `10` într-un borcănel pe care scriem `a`. Legătura este evidentă: borcănelul inscripționat cu `a` conține valoarea de `10`;

Să ne bazăm puțin pe logica pe care imaginea cu borcănelul etichetat ne-o oferă. Mai întâi de a pune valoarea în borcănel, mai întâi trebuie să avem borcănelul (momentul când ai scris `var`), apoi aplicăm o etichetă pe care scriem denumirea conținutului (momentul când ai scris `a` după `var`).

Acum este un moment cheie, care odată înțeles, multe, chiar foarte multe probleme de programare în JavaScript vor fi evitate.

Avem borcănelul și eticheta inscripționată pe el. Korekt! Dar ce observăm?! Da, ai dreptate, e simplu: borcănelul este gol. Această observație vă va salva din multe situații de confuzie: variabilele, inițial sunt legate de o valoare specială care se numește `undefined`. Și să-ți mai spun un mare, un imens secret, care te va scoate din bucluc de multe ori.

**Imediat ce codul sursă a fost citit de motorul JavaScript, tuturor variabilelor și funcțiilor le sunt colectate identificatorii care sunt „puși în capul codului” (mecanism de hoistings îi spune), iar fiecare dintre ele au valoarea `undefined`.**

Ce înseamnă „în capul codului”? Adică sunt disponibile instant întregului cod pentru a le atribui valori, modifica, etc. Sunt omniprezente pentru mediul lexical în care au fost declarate.

Stop joc! Cum?! Nu ți-am povestit ce-i cu mediul lexical? Ba da, recitește atent introducerea. Dacă nu ai chef, e zona de cod în care căutăm identificatorii.

Același comportament este aplicat și funcțiilor după cum vom vedea pentru că... (tobele bat intens), și funcțiile sunt tot niște valori identificate printr-o „etichetă” (un identificator). Putem afirma cu multă simplitate că în momentul în care browserul a trecut prin cod încărcându-l, are o fază în care culege toți identificatorii și le atribuie valoarea `undefined`. Abia după acest pas, motorul JavaScript se mai uită la detaliile codului și începe să atribuie valorile specificate fiecare la momentul său pe măsură ce codul este rulat.

Există o notabilă excepție de la acest comportament. Acest comportament este dictat de modificările aduse standardului începând cu ES6. Regula standardului nou spune că variabilele declarate cu `let` în locul lui `var`, vor fi pironite de „locul” în cod unde au fost declarate. Acest nou comportament este încurajat ca practică și este menit să elimine toate problemele de înțelegere a mecanismului de „ridicare în capul codului” (hoisting). De fapt, a fost gândit să dea o mână de ajutor și celor care vin din zona de C și C++ pentru a le da familiaritate în felul în care funcționează codul. După toată balonarea și toată lauda pentru `let`, se pare că este destinat să-l înlocuiască pe `var` încet, încet.

Mie îmi place `let` pentru că îmi mai simplifică din procesul de gândire a codului, dar și pentru faptul că tradus are o anumită melodie. Fii atent la următorul enunț: `let a = 10;`. Chiar tradus în română sună foarte fain, ca în matematică (da, ca și tine, am iubit matematica... aaa... nu): „fie ca `a` să fie legat de valoarea 10”. E aproape de spusele unui magician, nu? Fain!

Să revenim. Hai să ne uităm la primul pas făcut cu debugger-ul și vom observa tocmai această „ridicare în capul codului” cu atribuirea valorii `undefined`. Dacă pui mouse-ul pe identificatorul `a` interoghezi valoarea.

![Variabila a este „ridicată” și acum are valoarea inițială undefined](VariabileHoistedCuUndefined.png)

Valoarea identificatorului nostru se reflectă și în cele ținute în evidență de `this`.

![Valoarea „undefined” a lui „a”, se reflectă și în evidențele lui „this” vizibil din panoul „Variables”](VariablesThisUndefined.png)

Ce-o fi `this`?! Mai ții minte când spuneam că în JavaScript totul este un obiect și că din start totul este o proprietate a obiectului global (`window`)?! Atunci, explicația lui `this` e simplă: este referința către obiectul a cărui proprietate este de fapt funcția. Tradus în românește ar fi: „folosește ACEST obiect drept context în care mă execut eu ca funcție”.

Putem privi `this` ca spațiul de unde tot codul rulat își ia valorile de care are nevoie pentru a rula. De exemplu, dacă o funcție este construită cu valorile 10 și 1000, ea, funcția se așteaptă ca aceste valori să fie disponibile deja undeva numai bune să le ia și să le folosească. Acest „undeva” este `this`. Ține minte că în afară de „undeva”, mai trebuie dată atenție și lui „cândva” (asta e o chestie faină care ține chiar de felul în care se rulează codul pe „linia timpului).

Să revenim. Aici, în zona de „Variables” vei vedea toți identificatorii și valorile lor asociate. Această zonă a Debugger-ului va fi lupa sub care veți trece pașii de execuție a codului.

### Funcția

Un fragment de cod de întindere mică sau medie care face un lucru precis este o funcție. Acest fragment de cod este pus între acolade. Pentru a declara o funcție folosim cuvântul rezervat `function` urmat de identificatorul pentru această funcție: `function facCeva`. Apoi urmează un spațiu și o pereche de paranteze rotunde în care, dacă se dorește sau este necesar, vor fi pasate argumente (valori necesare în corpul funcției pentru operațiunile care se întâmplă acolo).

Urmează după un alt spațiu o pereche de acolade în care va fi introdus fragmentul de cod sursă care constituie corpul funcției. Cel mai simplu este să-ți imaginezi o funcție precum un motor care între parantezele rotunde primește combustibil (benzină, aer, NOS) iar între acolade sunt toate părțile sale componente.
Sper că ai remarcat că fiecare enunț se încheie cu semnul de punctuație punct și virgulă.

- În interiorul funcției putem introduce orice fragment de cod JavaScript. Ca urmare, vom declara o nouă variabilă.
- Mai punem o sondă pentru a scoate și în consolă să vedem cu ochii noștri valoarea.
- Apoi ajung la momentul crucial al unei funcții. Cuvântul rezervat `return` este ceea ce a produs motorul nostru. În cazul nostru, vom returna valoarea variabilei `a`.

### Momentul cheie

Acum, e acum! Pentru ce toată această pregătire? Pentru că sunt sigur că ai observat rapid faptul că identificatorul variabilei declarate în interiorul funcției este fix același cu cel al variabilei declarate „în afara” funcției.

Întrebarea se pune așa: valoarea din interiorul funcției va suprascrie valoarea „din afară”? Tocmai pentru a răspunde la această întrebare, am folosit debugger-ul.

Haideți să terminăm prin apelarea funcției. Dacă nu apelezi funcția, aceasta nu-și produce efectele. Urmând comparația cu motorul, dacă nu învârți cheia în contact din poziția de staționare în cea de pornire, motorul va sta oprit.

### Apelarea funcției

Apelăm funcția prin scrierea identificatorului funcției urmată de paranteze rotunde. Parantezele rotunde spun motorului JavaScript: pornește execuția funcției. Este momentul când funcția este aplelată / invocată.

#### Sondarea

Vom folosi „sonda” de care povesteam mai sus pentru a vedea cu ochii noștri rezultatul.

Acum e rândul tău să experimentezi.

## Curiozitatea nu a omorât pisica!

Un exemplu ceva mai dezvoltat urmărește felul în care se face shadowing (suprascrierea) în mediul lexical creat de o funcție. Mai exact, cum o variabilă după declarare (adică crearea identificatorului) este disponibilă întregului cod, apoi valoarea este setată la o valoare, iar mai apoi, valoarea este schimbată. Tot procesul acesta descris în linii mari poate fi urmărit cu debugger-ul pentru a vedea efectiv cum funcționează codul.

```javascript
var a = 10;           // break
function facCeva () {
  a = 12;             // break
  var a = 11;         // break
  console.log(a);     // break
};
facCeva();            // break
console.log(a);       // break
```

Rulează cu debugger-ul pentru a vedea de ce rezultatul afișat este 11 urmat de 10 și nu 11 urmat de 12.

## Un Tărâm al mediilor lexicale

Prin experimentarea modului de lucru cu Debugger-ul, de fapt am privit la microscop felul în care motorul care implemententează standardul „interpretează” și evaluează cod JavaScript.

Ceea ce am făcut totuși este o acomodare cu majoritatea conceptelor de lucru. Mi-a fost tare teamă să nu introduc subiectele care sunt menite să consolideze cunoștințe fără a avea deja o minimă experiență.

Următorul pas este unul foarte important și țintește înțelegerea mediului lexical (***lexical environment***) sau mai pe scurt, așa cum este numit de programatori: scope.
