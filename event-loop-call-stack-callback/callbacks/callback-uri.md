# Callback-uri

Știm despre funcții că sunt valori care pot fi pasate ca oricare alta. În spiritul acestei afirmații fundamentale putem realiza comunicarea intenției de prelucrare a datelor printr-o funcție unei alte părți software, care va lua funcția ta și o va face parte din propriile evaluări, iar la finalizarea acestora vei primi un rezultat.

Este o relație simbiotică realizată pe încrederea acordată API-ului că îți va returna rezultatul pe care îl aștepți. Pentru că majoritatea codului unui API este cu sursă deschisă, poți investiga ce se petrece cu funcția pe care ai pasat-o, dar de cele mai multe ori tratezi un API ca pe o *cutie neagră* în care introduci date și care îți oferă înapoi alte date tratate. Să detaliem!

În limba română am putea aproxima numele în limba engleză de **callback** ca **apeluri ulterioare**. Funcția ca valoare este pasată ca argument și este „apelată ulterior” (în engleză: *called back*) de către funcția care este în execuție deja. Vom folosi varianta denumirii în limba engleză pentru a recunoaște în alte lucrări despre ce vorbim, dar și pentru simplitatea pe care o oferă un singur cuvânt.

Callback-ul este o funcție care va porni evaluarea propriului cod când va avea toate datele necesare oferite de contextul său de execuție. Este o funcție care va aștepta cuminte tot ce îi este necesar și abia atunci se lansează în execuție.

## De ce avem nevoie de funcții callback?

Care este motivul pentru care facem acest lucru? Aducerea unei resurse sau prelucrarea sa poate să ia timp. Nu ai voie să blochezi firul de execuție și ca să realizezi această magie, vei apela la un API al browserului. Ce te faci în momentul în care resursa a venit? Tu ai adus-o pentru a face ceva cu ea. În aceast scop trebuie să ai cod care să o prelucreze. Acest cod este „păstrat” ca valoare într-o funcție. Această funcție este pasată API-ului pentru ca în momentul în care a terminat operațiunea sa specifică, să execute codul funcției noastre aplicată pe rezultatul adus.

Modelul de lucru folosind funcții ce îndeplinesc o anumită sarcină după ce funcția container și-a încheiat sarcinile la rândul său, este o necesitate dictată de lucrul cu date care intră și ies din aplicațiile pe care le creăm. Exemplele sunt nenumărate: citirea unui fișier sau legarea la o bază de date. Multe exemple sunt legate de lucrul cu evenimente în cadrul **DOM** (Document Object Model) atunci când dorim manipularea elementelor dintr-o pagină web.

Callback-urile fac ceva de mare ajutor în toate aceste scenarii de lucru: pur și simplu dau răgaz unei anumite sarcini să se termine înainte de a finaliza cu totul execuția unui program.

Vom vedea mai departe că recent, în noua versiune a standardului este disponibil un alt mecanism numit *promisiune*, un model de gestiune asincron mult superior practicii callback-urilor. Deocamdată, să ne concentrăm pe callback-uri pentru că de ele ne vom lovi foarte des mai ales când vom utiliza cod scris de alții.

## Descrierea callback-urilor

Am stabilit că un **callback** este o funcție, care este pasată ca argument altei funcții. Adu-ți aminte mereu că o funcție este o valoare care poate fi pasată ca argument. Funcțiile care primesc altele drept valori se numesc **funcții de nivel înalt**.

Ce-ar fi să ne imaginăm un identificator ca pe un cârlig cu care extragem valori din funcții?!

```javascript
function producValoare () { return 2; };
var extragValoare = producValoare();
// extragValoare închipuiește-l ca pe un extractor de valoare
```

Valoarea identificatorului `extragValoare` este tocmai rezultatul funcției. Ne putem închipui, că înainte de evaluarea funcției prin apelarea sa, identificatorul avea valoarea `undefined`, dar de îndată ce am obținut un rezultat prin evaluarea codului din corpul funcției, identificatorul nostru va avea valoarea evaluării.

Acest exemplu este unul foarte simplu, dar hai să ne închipuim faptul că funcția noastră face ceva muuuuult mai mult. Să ne imaginăm că este o funcție care descarcă de pe internet o resursă de text sau o imagine, ori mai multe. Această operațiune, după cum îți poți imagina, va necesita ceva timp. Operațiunea noastră are potențialul de a bloca temporar firul cât timp sunt căutate resursele și apoi aduse una câte una, etc.

```javascript
// acesta este cod ilustrativ (nu rula!)
aducDeLaServer('http://kosson.ro/ceva.csv', function (rezultat) {
  console.log(rezultat.nume);
});
```

În traducere liberă un astfel de **eveniment** (apelul funcției) spune controlului: eu, funcția `aducDeLaServer`, care tocmai am fost apelată, îmi voi întrerupe execuția (evaluarea codului meu intern) pentru a mă duce pe net să aduc resursa de la adresa web specificată de tine. Câtă vreme fac acest lucru, eu nu am să te întrerup și poți executa altceva, dar să știi că din momentul în care resursa de pe net a venit, te invit să *programezi* execuția funcției pe care ți-am pasat-o drept *callback* (de aici și explicația termenului de apel ulterior), prin introducerea ei în **bucla evenimentelor**. Când îi vine rândul, funcția callback va fi executată, iar controlul reia execuția funcției `aducDeLaServer`. Dacă nu mai e nimic de făcut încheie și execuția acesteia.

În concluzie, un callback este o convenție de folosire a funcțiilor, un model de utilizare dacă ți se pare mai ușor să înțelegi.

## Callback hell - iadul apelurilor

Folosirea callback-urilor poate să se soldeze cu o serie de imbricări ale apelurilor ceea ce seamănă vizual cu o piramidă datorită indentării codului.
Ca să eviți această situație neplăcută, nu imbrica funcțiile și folosește mecanismul de hoisting ca pe un avantaj. În plus, trebuie să gestionezi erorile care apar în fiecare callback.

```javascript
aducResursa('mar', function () {
  careApeleazaAltceva ('serviciulX', function () {
    console.log('ceva');
  }){};
});
```

Totuși trebuie spus un lucru la care trebuie reflectat foarte adânc. Există momente când vei folosi biblioteci de cod externe, care vor prelua callback-ul pe care-l scrii, vor rula utilitarul în contextul aplicației lor, iar la final vor executa funcția scrisă de tine.

Kyle Simpson pune câteva întrebări esențiale pentru verificare și dobândirea siguranței în scenariul de lucru cu un callback:

- Ești sigur pe aplicația externă căreia îi pasezi callback-ul?
- Ești încredințat că va executa în parametrii doriți de tine codul din funcția pe care i-o pasezi ca și callback?
- Dacă nu ai scris tu întreaga aplicație care va folosi callback-ul, ai **încredere** să o folosești?

Acestea sunt întrebări foarte serioase, care setează cadrul mental pentru căutarea de noi soluții. Acestea nu au întârziat să apară, fiind propulsate de standard: promisiunile și funcțiile async/await. În acest moment, recomandarea este ca în momentul dobândirii abilităților de lucru cu **promisiunile** sau cu funcțiile **async/await**, să fie abandonată practica callback-urilor.

Un argument în plus pentru abandonarea treptată a practicii callback-urilor este aceea că urmărirea callback-urilor este o sarcină dificilă în sine.

## Explorarea unui scenariu

O funcție este declarată. Să o poreclim **funcția de bază**. Acesta este un termen arbitrar, care ne va ajuta să înțelegem mai bine relația cu o altă funcție: callback-ul. Funcția de bază este definită de utilizator cu scopul de a prelucra datele oferite la invocare. Funcția de bază are un mic secret. Primește funcția callback ca argument și după ce a terminat toate prelucrările, o execută la final pasându-i rezultatul evaluărilor din funcția de bază.

**Moment ZEN**: Callback-ul este o funcție care este executată ca răspuns la un eveniment.

În programarea funcțională, acest mod de a propaga rezultatul se numește **continuation passing style** (CPS). Returnarea rezultatului dintr-o funcție se numește **direct style**. Să-i spunem pe românește **abordare directă**.

În continuare vom face o exemplificare **direct style** versus **continuation-passing style**

```javascript
// direct style - abordare direct
function adunare (a, b) {
  return a + b; // direct style
}; adunare (1, 2); // 3
```

Modalitatea sincronă de a prelucra rezultatul folosind stilul **continuation-passing**. Declari o funcție care face prelucrările necesare pe datele primite prin argumente. În interiorul funcției este invocată funcția callback, care a fost primită ca valoare a ultimului argument. Acestei funcții îi este pasat rezultatul tuturor prelucrărilor din funcția de bază.

```javascript
function adunare (a, b, faAdunarea) {
  var x = a + b;
  faAdunarea (x);
};
// execută pasând un callback
adunare (1, 2, function(rezultat) {
  // callbackul primește un argument, ca evaluare a operațiunii a+b
  console.log('Rezultatul este: ' + rezultat);
}); // Rezultatul este: 3
```

Modul de a redacta codul de mai sus este foarte des întâlnit, dar produce confuzie pentru cei neacomodați cu acest stil. O variantă mai curată ar fi să folosim un identificator sau o variabilă opusă ca practică unei definirii a unei funcții anonime ca ultim argument.
La invocarea funcției, asigură-te că ultimul argument pasat este funcția callback și că aceasta are un argument, care va fi și rezultatul dorit la final. În acest moment, este invocată funcția de bază. Aceasta primește la primele argumente valorile de lucru, ultimul fiind funcția callback. Încă o dată îți reamintesc că în JavaScript funcțiile sunt de nivel înalt, acceptând alte funcții ca valori de lucru prin argumente. Aceasta este și explicația pentru care callback-urile funcționează.

```javascript
(function () {
  function adunare (a, b, faAdunarea) {
    var x = a + b;
    faAdunarea (x);
  };
  function afișează (omega) {
   console.log( omega + 1 );
  };
  adunare (1, 2, afișează);
})();
```

Exemplul de mai sus este unul **sincron**, adică unul care nu a deferit execuția callback-ului unui moment viitor în timp pentru că `adunare` ar fi blocat firul de execuție. Pur și simplu, evaluarea decurge normal. Acestea sunt invocate înainte ca o funcție să returneze. Callback-urile sincrone sunt invocate în firul de execuție originar. De exemplu, la invocarea unui callback cu `forEach`, acesta va fi performat pentru fiecare dintre elementele listei.

Mai există cazul în care callback-urile funcționează **asincron**.
Pentru a simula asincronicitatea, vom folosi utilitarul `setTimeout`, un API oferit de motor. Folosirea lui `setTimeout` implică fragmentarea în două calupuri de timp: cel al execuției utilitarului și cel al execuției codului din corpul funcției callback, care se va petrece la un moment viitor specificat.

```javascript
// adunarea ca operațiune asincronă
function adunareAsinc(a, b, callback){
  setTimeout(function(){
    //simularea asincronicității
    callback(a + b);
  }, 3000);
};
console.log('inainte');
adunareAsinc(1, 2, function(rezultat){
  console.log('Rezultat: ' + rezultat);
});
console.log('după');
// mesajul rezultatului apare în consolă după
```

![Exemplificare asincronicitate folosind Nodejs](callbacksSiEventLoop.svg)

Atenție! funcția `adunareAsincrona` nu va mai aștepta la execuție să se declanșeze execuția callbackului și va relua execuția mai departe și abia după ce `setTimeout` va fi terminat, după cele 3 secunde, abia atunci va fi executat și callback-ul. După ce timpul se va fi scurs, execuția callback-ului returnează rezultatul. Menținerea contextului se face datorită closure-ului.

### Callbackurile asincrone - deferred callback (invocare întârziată)

Callback-ul este invocat după ce o funcție a returnat deja sau a returnat într-un alt fir de execuție al stivei.

Callback-urile asincrone sunt folosite pe scară largă în API-urile legate de IO așa cum sunt `socket`-urile, de exemplu (`socket.connet(callback)`). Ceea ce este de așteptat în cazul `socket` este ca atunci când `connect` returnează, callback-ul încă să nu fie invocat de vreme ce așteaptă să se facă conexiunea.

Pot fi invocate de un alt fir de execuție (în cazul mecanismelor de invocare întârziată «deferral» bazate pe firul de execuție). În acest caz, o aplicație ar trebui să sincronizeze orice resurse accesează callback-ul. Aici este ridicată o problemă care ține și de modificarea stării aplicației, mai exact trebuie luat în calcul faptul că alte fire de execuție deja au modificat starea aplicației.

„Amânarea” unui callback are ca efect „trecerea unei perioade” necesară stivei să ajungă înapoi la bucla centrală (event loop). Mai este un caz: cel al rulării într-un alt fir de execuție.

## Closure-uri făcute de callback-uri

Pentru fiecare pas al animației, callback-ul pasat lui `setInterval` face closure pe valorile `elementTinta` și `increment` și astfel, fiind accesibile ca niște variabile care pot fi accesate, dar având valorile modificate.

```html
<div id="element">Un nod de text</div>
<script type="text/javascript">
  function Misca(elem){
    var elementTinta = document.getElementById('element'),
        increment = 0;
    var temporizator = setInterval(function(){
      if(increment < 400){
        elementTinta.style.position = "relative";
        elementTinta.style.background = "red";
        elementTinta.style.left = elementTinta.style.top = increment + "px";
        increment++;
      }else{
        clearInterval(temporizator);
      }
    }, 10);
  };
  Misca("element");
</script>
```

Reține faptul că de fiecare dată când intervalul presetat expiră, funcția care joacă rol de callback reactivează mediul lexical de la momentul creării. Closure-ul pe care-l face fiecare callback ține evidența propriului set de variabile.

## Mantre

- Funcțiile pot fi pasate ca argumente altor funcții pentru că, de fapt, este pasat un obiect, este pasată o valoare în sine.
- Funcțiile care acceptă alte funcții drept argumente sau care returnează funcții se numesc „funcții de ordin superior” - „higher-order function”.
- Un callback este un closure a cărui funcție va fi invocată atunci când un anumit eveniment se întâmplă.
- Nu toate funcțiile cărora li se pasează un callback sunt asincrone. Un exemplu este `[1,2].map(function(elem){return elem+1;});`. Rezultatul este returnat sincron folosind „direct style”.
- **`this` al unui callback indică întotdeauna către obiectul global. Pentru a fixa `this` la funcția gazdă se va folosi `call()`, `apply()` sau `bind()`**.
- **Callback-ul care folosește fat arrows este legat de scope-ul lexical și nu mai este nevoie de `call()`, `apply()` sau `bind()`**.
- Invocarea unui callback este invocarea unei funcții a cărui `this` este obiectul global (implicit assignment).

Cel mai simplu exemplu este oferit de execuția la un anumit moment în timp.

```javascript
function arataMesajul(mesaj){
  setTimeout(function(){
    alert(mesaj);
  }, 3000);
};
arataMesajul('funcția internă este chemată după trei secunde');
```

## Folosire

Sunt folosite în bibliotecile de cod pentru că oferă reutilizare. Permite ca metodele bibliotecii să fie ușor de configurat și de extins.

### Utilizare în Node.js

Un exemplu de folosire a callback-urilor în Node.js

```javascript
var fs = require('fs');
var callback = function faCeva(error, data){  // o practică bună este a numi funcțiile pentru a le vedea în stivă
  if(error){
    return callback(error, null);
  };
  // fă ceva cu datele
};
fs.readFile('date.csv', 'utf-8', callback);
```

Atenție, în NodeJS, primul argument al unui callback va fi întotdeauna un obiect de eroare. Acesta este modelul care trebuie urmat. Datele vehiculate constituie cel de-al doilea argument.

## Disciplina folosirii callback-urilor

- Ieși din funcție cât se poate de repede cu `return`, `continue` sau `break`.
- Creează funcții cu nume pentru callback-uri pasând rezultatele intermediare ca argumente. Scoate funcțiile și declară-le în afară. Fă mecanismul de hoisting să lucreze pentru tine.
- Modularizează codul împărțindu-l în funcții mici, făcându-l reutilizabil ori de câte ori acest lucru este posibil.
- În cazul folosirii callback-urilor împreună cu operatorul spread (...), callback-ul nu va mai fi poziționat ultimul, ci primul sau penultimul. Acest lucru se întâmplă pentru că sintaxa spread trebuie să fie ultimul argument introdus.

## Bună practică

Din capul locului menționează dacă o funcție este asincronă sau nu la momentul definirii.
Dacă un callback trebuie invocat cu întârziere, definește funcția pentru a realiza acest lucru.
În cazul folosirii callback-urilor, va trebui să capturezi erorile la fiecare pas pentru că utilizarea de callback-uri suferă pe partea de raportare a acestora. Acest aspect a fost rezolvat elegant în cazul folosirii promisiunilor.

## Dependințe cognitive:

- scope
- this
- closures
