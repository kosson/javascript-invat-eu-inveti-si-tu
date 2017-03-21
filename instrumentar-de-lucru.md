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
  return a;           // break
};
facCeva();            // break
console.log(a);       // break
```

După cum vedem în exemplul prezentat, vom lucra cu patru enunțuri de cod separate fiecare prin punct și virgulă.

#1 Vom declara variabila `a`, ceea ce conduce la crearea unui identificator și vom atribui identificatorului `a` valoarea `10`.
 - pentru aceasta vom folosi cuvântul rezervat limbajului `var`. Acesta spune motorului JavaScript că următoarea secvență de caractere de după un spațiu este numele identificatorului;
 - după de am dat un nume pentru identificator, urmează un operator, în cazul nostru semnul egal `=`, care are scopul de a atribui valoarea de `10` lui `a`, ceea ce pentru motorul JavaScript este echivalentul stabilirii unei legături dintre identificatorul `a` cu valoarea `10`. E ca și cum am pune valoarea `10` într-un borcănel pe care scriem `a`. Legătura este evidentă: borcănelul inscripționat cu `a` conține valoarea de `10`;

#2 Declarăm că un fragment de cod cuprins între acolade este o funcție. Pentru asta folosim cuvântul rezervat `function` urmat de identificatorul pentru această funcție: `function facCeva`. Apoi urmează un spațiu și o pereche de paranteze rotunde în care, dacă se dorește sau este necesar, vor fi pasate argumente (valori necesare în corpul funcției pentru operațiunile care se întâmplă acolo).
Urmează după un alt spațiu o pereche de acolade în care va fi introdus codul care constituie corpul funcției. Cel mai simplu este să-ți imaginezi o funcție precum un motor care între parantezele rotunde primește combustibil (benzină, aer, NOS) iar între acolade sunt toate părțile sale componente.
Sper că ai remarcat că fiecare enunț se încheie cu semnul de punctuație punct și virgulă.

- În interiorul funcției putem introduce orice fragment de cod JavaScript. Ca urmare, vom declara o nouă variabilă.
- apoi ajung la momentul crucial al unei funcții. Cuvântul rezervat `return` este ceea ce a produs motorul nostru. În cazul nostru, vom returna valoarea variabilei `a`.

Acum, e acum! Pentru ce toată această pregătire? Pentru că sunt sigur că ai observat rapid faptul că identificatorul variabilei declarate în interiorul funcției este fix același cu cel al variabilei declarate „în afara” funcției.

Întrebarea se pune așa: valoarea din interiorul funcției va suprascrie valoarea „din afară”? Pentru a răspunde la această întrebare, vom folosi debugger-ul.

Dar să terminăm pregătirile prin apelarea funcției. Dacă nu apelezi funcția, aceasta nu-și produce efectele. Urmând comparația cu motorul, dacă nu învârți cheia în contact din poziția de staționare în cea de pornire, motorul va sta oprit.

#3 Apelăm funcția prin scrierea identificatorului funcției urmată de paranteze rotunde. Parantezele rotunde spun motorului JavaScript: pornește execuția funcției. Este momentul când funcția este aplelată / invocată.

#4 Vom folosi „sonda” de care povesteam mai sus pentru a vedea cu ochii noștri rezultatul.

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
Am folosit tag-ul special `script`, care specifică prin atributul `src="primul.js"`, că va trebui să încarce și să ruleze acest fișier sursă de JavaScript.

Acum deschide fișierul `index.html` în Firefox și apasă tasta magică F12 pentru a accesa Developer Tools. Acesta este un panou care expune o serie de instrumente cu care va trebui să te familiarizezi pentru că este centrul de testare și depanare a codului JavaScript. Este observabil tabul „Console” urmat de „Debugger”. În Console poți introduce cod JavaScript pentru a-l testa rapid, dar și pentru a vedea codul încărcat deja de browser. Dacă nu găsești fișierul, folosește combinația `CTRL + P`. Tastezi primele caractere ale numelui fișierului și îl încarci.

Un exemplu ceva mai dezvoltat urmărește felul în care se face shadowing în mediul lexical creat de o funcție. Mai exact, cum o variabilă după declarare (adică crearea identificatorului) este disponibilă întregului cod, apoi valoarea este setată la o valoare, iar mai apoi, valoarea este schimbată. Tot procesul acesta descris în linii mari poate fi urmărit cu debuggerul pentru a vedea efectiv cum funcționează codul.

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

Rulează cu debugger-ul pentru a vedea de ce rezultatul afișat este 11 urmat de 10 și nu 11 urmat de 12
