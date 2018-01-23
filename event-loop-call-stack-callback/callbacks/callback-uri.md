# Callback-uri

Ce-ar fi să ne imaginăm un identificator ca pe un cârlig cu care extragem valori din funcții?!

```javascript
function producValoare () { return 2; };
var extragValoare = producValoare();
```

Valoarea identificatorului `extragValoare` este tocmai rezultatul funcției. Ne putem închipui, ca înainte de evaluarea funcției prin apelarea sa, identificatorul era `undefined`, dar de îndată ce am obținut un rezultat prin executarea funcției, identificatorul nostru va avea o valoare. Acest exemplu este unul foarte simplu, dar hai să ne închipuim faptul că funcția noastră face ceva muuuuult mai mult. Să ne imaginăm că este o funcție care descarcă de pe internet o resursă de text sau o imagine, ori mai multe. Această operațiune, după cum îți poți imagina, va necesita ceva timp. Acum vine cheia problemei. Știind că avem un singur fir de execuție, operațiunea noastră are potențialul de a bloca temporar firul. În acest moment ai nevoie de un model de lucru care să-ți permită să execuți codul în continuare, fără niciun blocaj, dar în același timp să îndeplinești și sarcina aducerii resursei.
În ajutorul nostru putem declara o funcție care să îndeplinească sarcina la un moment în care întregul context de execuției îi va permite rularea, adică va avea toate datele necesare. Această funcție este numită de practicieni **callback**, adică o funcție care va aștepta cuminte ca tot ce este necesar sie să fie disponibil și abia atunci se lansează în execuție. Vom vedea mai departe că, de curând, în noua versiune a standardului, mai este disponibil un alt mecanism numit *promisiune*, un model de gestiune asincron mult superior practicii callback-urilor. Deocamdată, să ne concentrăm pe callback-uri pentru că de ele ne vom lovi foarte des mai ales când vom utiliza cod scris de alții.

Un **callback** este o funcție, care este pasată ca argument altei funcții. Adu-ți aminte de faptul că o funcție este o valoare care poate fi pasată ca argument. Funcțiile care primesc alte funcții ca valori sunt **funcții de nivel înalt**.

În limba română am putea aproxima denumirea ca **apeluri ulterioare**. Funcția ca valoare este pasată ca argument și este „apelată ulterior” (în engleză: *called back*) de către funcția care este în execuție deja. Vom folosi varianta denumirii în limba engleză pentru a recunoaște în alte lucrări despre ce vorbim, dar și pentru simplitatea pe care o oferă un singur cuvânt.

În concluzie, un callback este o convenție de folosire a funcțiilor, un model de utilizare dacă ți se pare mai ușor să înțelegi.

## De ce avem nevoie de funcții callback?

Modelul de lucru folosind funcții ce îndeplinesc o anumită sarcină după ce funcția container și-a încheiat sarcinile la rândul său, este o necesitate dictată de lucrul cu date care intră și ies din aplicațiile pe care le creăm. Exemplele sunt nenumărate: citirea unui fișier sau legarea la o bază de date. Multe exemple sunt legate de lucrul cu evenimente în cadrul DOM (Document Object Model) atunci când dorim manipularea elementelor dintr-o pagină web.

Callback-urile fac ceva de mare ajutor în toate aceste scenarii de lucru: pur și simplu dau răgaz unei anumite sarcini să se termine înainte de a finaliza cu totul execuția unui program. Să ne imaginăm că dorim să descărcăm o imagine de la distanță, de undeva de pe net, la care vom atașa o legendă ce descrie conținutul. Textul legendei îl avem deja și se încarcă foarte repede, dar imaginea este ceva mai corpolentă și este nevoie de un timp de așteptare. Callback-ul însărcinat cu aducerea imaginii, va avea răgazul necesar să-și termine treaba în timp ce restul codului va genera containerul imaginii și va poziționa legenda fără a bloca firul de execuție. Când este gata descărcată și imaginea, aceasta va fi afișată și ea. Adu-ți mereu aminte de faptul că JavaScript rulează pe un singur fir de execuție. Sarcina unei anumite funcții care se execută, nu trebuie să blocheze firul de execuție.

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

Totuși trebuie spus un lucru la care trebuie reflectat foarte adânc. Există momente când vei folosi biblioteci de cod externe, care vor prelua callback-ul pe care-l scrii, vor rula utilitarul în contextul aplicației lor, iar la final vor executa funcția scrisă de tine. Kyle Simpson pune această întrebare esențială pentru a verifica și pentru a fi sigur pe modul de execuție a callback-ului: ești sigur pe aplicația externă căreia îi pasezi callback-ul? Ai siguranța că va executa în parametrii doriți de tine codul din funcția pe care i-o pasezi ca și callback? Dacă nu ai scris tu întreaga aplicație, ai **încredere** să o folosești? Recomandarea este ca în momentul dobândirii abilităților de lucru cu promisiunile sau cu funcțiile async/await, să fie abandonată practica callback-urilor.

Urmărirea callback-urilor este o sarcină dificilă și din acest motiv este nevoie de o alternativă.

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

Modul de a redacta codul de mai sus este foarte des întâlnit, dar produce confuzie pentru cei neacomodați cu acest stil de redactare a codului. O variantă mai curată ar fi să folosim identificatorul opus definirii funcției în argumente.

```javascript
function adunare (a, b, faAdunarea) {
  var x = a + b;
  faAdunarea (x);
};
function afișează (omega) {
 console.log( omega + 1 );
 console.log(this); // Window
};
adunare (1, 2, afișează);
```

La invocarea funcției, fii sigur că ultimul argument pasat este o funcție care primește un unic argument. În acest moment, este invocată funcția de bază. Aceasta primește la primele argumente valorile de lucru iar ultimul, de regulă, fiind funcția callback. Încă o dată îți reamintesc că în JavaScript funcțiile sunt de nivel înalt, acceptând alte funcții ca valori de lucru prin argumente. Aceasta este și explicația pentru care callback-urile funcționează. Ai observat ceva deja? Funcția cu rol de callback are drept valoare a obiectului `this` obiectul global. Chiar și când codul este izolat într-un IIFE, tot la obiectul global face referință.

```javascript
(function () {
  function adunare (a, b, faAdunarea) {
    var x = a + b;
    faAdunarea (x);
  };
  function afișează (omega) {
   console.log( omega + 1 );
   console.log(this); // Window
  };
  adunare (1, 2, afișează);
})();
```

Mai există cazul în care callback-urile funcționează asincron.
Pentru a simula asincronicitatea, se va folosi metoda `setTimeout`, un API oferit de motor. Folosirea lui `setTimeout` implică fragmentarea în două calupuri de timp: cel al execuției API-ului și cel al execuției codului din corpul funcției callback, care se va petrece la un moment viitor specificat.

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

Atenție! funcția `adunareAsincrona` nu va mai aștepta la execuție să se declanșeze execuția callbackului și va relua execuția mai departe și abia după ce `setTimeout` va fi terminat, după cele 3 secunde, abia atunci va fi executat și callback-ul. După ce timpul se va fi scurs, execuția callback-ului returnează rezultatul. Menținerea contextului se face datorită closure-ului.

## Anatomie

Pentru fiecare pas al animației, callback-ul pasat lui `setInterval` face closure pe valorile `elementTinta` și increment și astfel, fiind accesibile ca niște variabile care pot fi accesate dar având valorile modificate.

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

Reține faptul că de fiecare dată când intervalul presetat expiră, funcția care joacă rol de callback reactivează mediul lexical de la momentul creării. Closure-ul pe care-l face fiecare callback ține evidența la propriul set de variabile.

![Exemplificare asincronicitate folosind Nodejs](callbacksSiEventLoop.svg)

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
- Creează funcții cu nume pentru callback-uri pasând rezultatele intermediare ca argumente.
- Modularizează codul împărțindu-l în funcții mici, făcându-l reutilizabil ori de câte ori acest lucru este posibil.
- În cazul folosirii callback-urilor împreună cu operatorul spread, callback-ul nu va mai fi poziționat ultimul, ci primul sau penultimul. Acest lucru se întâmplă pentru că sintaxa spread trebuie să fie ultimul argument introdus.

## Callback-uri sincrone și asincrone

### Callback-urile sincrone

Acestea sunt invocate înainte ca o funcție să returneze. Putem spune că aplicația care primește callback-ul va rămâne în stivă.
Callback-urile sincrone sunt invocate în firul de execuție originar.
Spre exemplu, la invocarea unui callback cu `forEach`, acesta va fi performat pentru fiecare dintre elementele listei.

### Callbackurile asincrone - deferred callback (invocare întârziată)

Callback-ul este invocat după ce o funcție a returnat deja sau a returnat într-un alt fir de execuție al stivei.

Callback-urile asincrone sunt folosite pe scară largă în API-urile legate de IO așa cum sunt socketurile, de exemplu (`socket.connet(callback)`). Ceea ce este de așteptat în cazul socket este ca atunci când connect returnează, callback-ul încă să nu fie invocat de vreme ce așteaptă să se facă conexiunea.

Pot fi invocate de un alt fir de execuție (în cazul mecanismelor de invocare întârziată «deferral» bazate pe firul de execuție). În acest caz, o aplicație ar trebui să sincronizeze orice resurse accesează callback-ul. Aici este ridicată o problemă care ține și de modificarea stării aplicației, mai exact trebuie luat în calcul faptul că alte fire de execuție deja au modificat starea aplicației.

„Amânarea” unui callback are ca efect „trecerea unei perioade” necesară stivei să ajungă înapoi la bucla centrală (event loop). Mai este un caz: cel al rulării într-un alt fir de execuție.

## Bună practică

Din capul locului menționează dacă o funcție este asincronă sau nu la momentul definirii.
Dacă un callback trebuie invocat cu întârziere, definește funcția să facă acest lucru.
În cazul folosirii callback-urilor, va trebui să capturezi erorile la fiecare pas pentru că utilizarea de callback-uri suferă pe partea de raportare a acestora. Acest aspect a fost rezolvat elegant în cazul folosirii promisiunilor.

## Dependințe cognitive:

- scope
- this
- closures
