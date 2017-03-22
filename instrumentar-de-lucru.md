# Instrumentar

Vom lucra foarte mult cu secvențe de cod pe care vei dori să le testezi pentru a vedea efectul imediat și astfel pentru a consolida ceea ce înveți. În ceea ce privește instrumentar de bază, veți auzi cel mai ades acronimul REPL care înseamnă `read–eval–print loop`, adică un instrument software, care preia fragmentul tău de cod, îl evaluează (îl rulează) și îți oferă rezultatul. La o simplă căutare online după cheia JavaScript REPL, veți găsi și o grămadă de instrumente online cu ajutorul cărora să testați codul.

Pentru scopul de învățare a acestei lucrări, vom lua contact cu unul de bază: consola web. Cel mai simplu este în această consolă web pe care o accesați din browserul pe care-l folosiți. Am ales pentru acest manual browserul Firefox. Pentru a accesa consola web, pur și simplu apăsați tasta F12 și apoi alegeți Console.

Aici puteți introduce fragmentele de cod pentru a urmări rezultatele și pentru a experimenta din curiozitate.

Un alt instrument de test pentru cod este și Nodejs, care odată instalat, poate fi utilizat ca un REPL foarte capabil.

## O sondă în JavaScript

Sonda despre care doresc să vorbim este un obiect cu care JavaScript vine în propriul bagaj și pe care-l vom folosi ca pe o sondă în codul pe care-l scriem. Este vorba despre `Console`. Acesta este instrumentul primar pentru inspectarea codului în vederea îndreptării erorilor sau pentru a sonda cine, ce conține sau cum arată. Browserul expune `console` ca `window.console`. Dar cum în practică `window` este ignorat, vom apela direct obiectul.

Pentru a detecta valori sau pentru a inspecta anumite situații, cel mai ades vom folosi `console.log(expresie)` și / sau `console.dir()` iar atunci când avem nevoie de o afișare rapidă a felului cum s-a rulat o funcție, vom folosi `console.trace()`.

## Inspectarea codului la rulare și detectarea problemelor

Pentru momentul în care folosești biblioteci de cod care nu-ți aparțin sau atunci când scrii cod care produce erori sau rezultate neașteptate, cel mai adesea vei folosi un instrument pe care oricare browser modern îl pune la dispoziție: Debugger-ul. Erorile de cod se numesc „bug-uri” (insecte deranjante), iar acest instrument ajută la identificarea fragmentului de cod care le produce.
Vor fi îndeajuns de multe cazurile în care vei avea nevoie de acest instrument foarte util. În ciuda verbozității cu care am să însoțesc fiecare exemplu, fiecare situație, vei dori, pur și simplu să vezi cu ochii tăi cum funcționează.

Debuggerul am putea să-l traducem în română cu o transliterare unu-la-unu prin „operator de dezinsecție”, dar pentru a fi foarte eleganți îl vom denumi „depanator”. Depanatorul este un instrument care permite parcurgerea unui fragment de cod încărcat în browser pentru a-i vedea comportamentul și efectele.

Chiar dacă multe din elementele cu care vom lucra în continuare pentru a exemplifica, nu vă sunt cunoscute, nu vă impacientați. Pur și simplu doresc să vă arăt care sunt posibilitățile acestui instrument. Promit să explic pas cu pas ce se întâmplă.

Deschide editorul tău de cod preferat. Dacă nu ai unul deja, te invit să folosești editorul Atom. Dar să știi că orice editor este bun atâta vreme cât poți salva cu extensia de fișier `.js` și `.html`, fără adaosuri ciudate. Dacă ai deschis deja editorul, te rog introdu următoarea secvență de cod și salveaz-o într-un director pregătit special dinainte. În același director vom mai introduce un fragment de cod, de data aceasta de html. Deci, salvează cu denumirea de `primul.js` acum și lasă deschis pentru a privi la cod urmând explicațiile.

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

### Folosirea debuggerului

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

Am folosit tag-ul special (în HTML, informația este codată între niște secvențe de text numite taguri precum `<html>pagina web</html>`) `script`, care specifică prin atributul `src="primul.js"`, că va trebui să încarce și să ruleze acest fișier sursă de JavaScript.

**Totul e pregătit? Ne lansăm!**

Acum, deschide fișierul `index.html` în Firefox și apasă tasta magică F12 pentru a accesa Developer Tools. Poți folosi și combinația CTRL + SHIFT + i. Acesta este un panou care expune o serie de instrumente cu care va trebui să te familiarizezi pentru că este centrul de testare și depanare a codului JavaScript. Este observabil tabul „Console” urmat de „Debugger”. În Console poți introduce cod JavaScript pentru a-l testa rapid, dar și pentru a vedea codul încărcat deja de browser. Dacă nu găsești fișierul, folosește combinația `CTRL + P`. Tastezi primele caractere ale numelui fișierului și îl încarci.

Vei vedea deja în consolă (din partea dreaptă sus apasă pe Toggle Split Toggle), în zona de consolă rezultatele execuției codului: 11 și 10.

Pune cu mouse-ul break point-urile pe liniile unde există comentariul `// break`. Comentariul l-am pus eu să vă vină mai ușor pentru a vă ghida.

După ce ai setat toate punctele de inspecție a codului (break point-uri), faci reîncărcare la pagină (apeși săgeata circulară din partea dreaptă imediat după caseta în care introduci adresa web). Astfel, se va porni debugger-ul și vei putea „păși” din punct de întrerupere în altul până la încheierea unei execuții simulate a codului. Vei avansa folosind F11. Am ales F11 pentru că în cazul că este întâlnită o funcție, se va intra și se va parcurge și codul din acea funcție.

Câteva detalii despre posibilitatea de a avansa prin codul scris - butoanele și expunerea funcționalității lor.
- Comanda **Play** (F8), înseamnă rulează tot codul până la următorul break-point setat.
- Comanda **Step over** (F10), spune debugger-ului să avanseze la linia următoare dacă ești în interiorul unei funcții.
- Comanda **Step in** (F11), spune: avansează la linia următoare în cadrul funcției, dar dacă linia următoare este invocarea unei alte funcții, intră în acea funcție.
- Comanda **Step out** (Shift + F11), spune: rulează tot codul până la finalul funcției investigate în acest moment.

După cum vedem în exemplul prezentat, vom lucra cu patru enunțuri de cod separate fiecare prin punct și virgulă. Propun să pornim cu parcurgerea codului (hai, ia o piatră în gură dacă ești începător... va fi fain, curaj). Eram să uit, dacă ai dat de mai multe ori clic din greșeală și ai trecut repede pentru un pas, pur și simplu, reîncarcă pagina și ia-o de la capăt.

![Momentul 0 al parcurgerii secvenței de cod](StartDebugger.png)

#1 Vom declara variabila `a`, ceea ce conduce la crearea unui identificator și vom atribui identificatorului `a` valoarea `10`.
 - pentru aceasta vom folosi cuvântul rezervat limbajului `var`. Acesta spune motorului JavaScript că următoarea secvență de caractere de după un spațiu este numele identificatorului;
 - după ce am dat un nume pentru identificator, urmează un operator, în cazul nostru semnul egal `=`, care are scopul de a atribui valoarea de `10` lui `a`, ceea ce pentru motorul JavaScript este echivalentul stabilirii unei legături dintre identificatorul `a` cu valoarea `10`. E ca și cum am pune valoarea `10` într-un borcănel pe care scriem `a`. Legătura este evidentă: borcănelul inscripționat cu `a` conține valoarea de `10`;

Să ne bazăm puțin pe logica pe care imaginea cu borcănelul etichetat ne-o oferă. Mai întâi de a pune valoarea în borcănel, mai întâi trebuie să avem borcănelul (momentul când ai scris `var`), apoi aplicăm o etichetă pe care scriem denumirea conținutului (momentul când ai scris `a` după `var`).

Acum este un moment cheie, care odată înțeles, multe, chiar foarte multe probleme de programare în JavaScript vor fi evitate.

Avem borcănelul și eticheta inscripționată pe el. Korekt! Dar ce observăm?! Da, ai dreptate, e simplu: borcănelul este gol. Această observație vă va salva din multe situații de confuzie: variabilele, inițial sunt legate de o valoare specială care se numește `undefined`. Și să-ți mai spun un mare, un imens secret, care te va scoate din bucluc de multe ori.

    Variabilele, cu excepția celor dintr-o funcție, imediat ce codul sursă a fost citit de motorul JavaScript, sunt „strânse în capul codului” (mecanism de hoistings îi spunem), iar fiecare dintre ele au valoarea `undefined`.

Ce înseamnă „în capul codului”? Adică sunt disponibile instant întregului cod pentru a le atribui valori, modifica, etc. Același comportament este aplicat și funcțiilor după cum vom vedea pentru că... (tobele bat intens), și funcțiile sunt tot niște valori identificate printr-o „etichetă”. Putem afirma cu multă simplitate că în momentul în care browserul a trecut prin cod încărcându-l, are o fază în care culege toți identificatorii și le atribuie valoarea `undefined`. Abia după acest pas, motorul JavaScript se mai uită la detaliile codului și începe să atribuie valorile specificate fiecare la momentul său pe măsură ce codul este rulat.

Hai să ne uităm la primul pas făcut cu debuggerul și vom observa tocmai această „ridicare în capul codului” cu atribuirea valorii `undefined`. Dacă pui mouse-ul pe identificatorul `a` interoghezi valoarea.

![Variabila a este „ridicată” și acum are valoarea inițială undefined](VariabileHoistedCuUndefined.png)

Valoarea identificatorului nostru se reflectă și în cele ținute în evidență de `this`.

![Valoarea „undefined” a lui „a”, se reflectă și în evidențele lui „this” vizibil din panoul „Variables”](VariablesThisUndefined.png)

Ce-o fi `this`?! Deocamdată este îndeajuns să-ți imaginezi că este un context de moment în care se execută un fragment de cod sau mai specific o funcție, de exemplu. Ca să-ți imaginezi mai simplu, `this` este oala în care fierbi borcănelele pentru a le pasteuriza.

Aici, în zona de „Variables” vei vedea toți identificatorii și valorile lor asociate. Această zonă a Debuggerului va fi lupa sub care veți trece pașii de execuție a codului.

#2 Declarăm că un fragment de cod cuprins între acolade este o funcție. Pentru asta folosim cuvântul rezervat `function` urmat de identificatorul pentru această funcție: `function facCeva`. Apoi urmează un spațiu și o pereche de paranteze rotunde în care, dacă se dorește sau este necesar, vor fi pasate argumente (valori necesare în corpul funcției pentru operațiunile care se întâmplă acolo).
Urmează după un alt spațiu o pereche de acolade în care va fi introdus codul care constituie corpul funcției. Cel mai simplu este să-ți imaginezi o funcție precum un motor care între parantezele rotunde primește combustibil (benzină, aer, NOS) iar între acolade sunt toate părțile sale componente.
Sper că ai remarcat că fiecare enunț se încheie cu semnul de punctuație punct și virgulă.

- În interiorul funcției putem introduce orice fragment de cod JavaScript. Ca urmare, vom declara o nouă variabilă.
- Mai punem o sondă pentru a scoate și în consolă să vedem cu ochii noștri valoarea.
- Apoi ajung la momentul crucial al unei funcții. Cuvântul rezervat `return` este ceea ce a produs motorul nostru. În cazul nostru, vom returna valoarea variabilei `a`.

### Momentul cheie

Acum, e acum! Pentru ce toată această pregătire? Pentru că sunt sigur că ai observat rapid faptul că identificatorul variabilei declarate în interiorul funcției este fix același cu cel al variabilei declarate „în afara” funcției.

Întrebarea se pune așa: valoarea din interiorul funcției va suprascrie valoarea „din afară”? Tocmai pentru a răspunde la această întrebare, vom folosi debugger-ul.

Dar să terminăm pregătirile prin apelarea funcției. Dacă nu apelezi funcția, aceasta nu-și produce efectele. Urmând comparația cu motorul, dacă nu învârți cheia în contact din poziția de staționare în cea de pornire, motorul va sta oprit.

#3 Apelăm funcția prin scrierea identificatorului funcției urmată de paranteze rotunde. Parantezele rotunde spun motorului JavaScript: pornește execuția funcției. Este momentul când funcția este aplelată / invocată.

#4 Vom folosi „sonda” de care povesteam mai sus pentru a vedea cu ochii noștri rezultatul.

## Curiozitatea nu a omorât pisica!

Un exemplu ceva mai dezvoltat urmărește felul în care se face shadowing (supra) în mediul lexical creat de o funcție. Mai exact, cum o variabilă după declarare (adică crearea identificatorului) este disponibilă întregului cod, apoi valoarea este setată la o valoare, iar mai apoi, valoarea este schimbată. Tot procesul acesta descris în linii mari poate fi urmărit cu debuggerul pentru a vedea efectiv cum funcționează codul.

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
