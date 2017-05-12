# Callback-uri

Un **callback** este o secvență de cod executabilă, care este pasată ca argument unei funcții. Adu-ți aminte de faptul că o funcție este o valoare care poate fi pasată ca argument. Funcțiile care primesc alte funcții ca valori sunt **funcții de nivel înalt**.

În limba română am putea aproxima denumirea ca **apeluri ulterioare**. Funcția ca valoare este pasată ca argument și este „apelată ulterior” (called back) de către funcția care este în execuție deja.

## De ce avem nevoie de funcții callback?

Cel mai bine se leagă lucrurile care au o poveste. Iar pentru a înțelege povestea callback-ului, ne vom închipui o întâmplare dintr-un restaurant cu un client care dorește să hrănească zece nevoiași, dar are doar ingredientele.

Ne aflăm într-un restaurant. În momentul în care vine chelnerul să ia comanda, nu ai mâncarea și nici cine să-ți gătească, dar ai ingredientele. Știu, pare ciudat, dar așa e personajul poveștii iar politica restaurantului permite acest lucru.
Și zice el politicos chelnerului: „Vreau ca iscusitul vostru bucătar să facă o budincă gătită cu aceste ouă, șunca și brânza asta... de capră. După care vreau porționeze tava în zece”. Chelnerul ia comanda și dispare.
Bucătarul preia comanda, trece pe la client și ia ingredientele aduse. Prin măiestria sa rezultă o mândrețe de budincă pe care o dă clientului, nu înainte de a o porționa în 10 așa cum ai precizat la final. Iată ce a realizat cu trei ingrediente și munca făcută de un bucătar.

## Scenariul!!!

O funcție este declarată, dar are un mic secret. Să spunem că este **funcția de bază**. Acesta este un termen arbitrar, care ne va ajuta să înțelegem mai bine relația cu o altă funcție. Este funcția callback. Acesta este definită de utilizator, care are drept scop preluarea rezultatelor funcției de bază ca material de lucru pentru

TODO: Refă acest paragraf - de cel care folosește rezultatele funcției de bază. Unul dintre argumente este de fapt o funcție, care va fi apelată la rândul ei în interior. Această funcție „ascunsă” într-un argument se numește callback.



**Moment ZEN**: Callback-ul este o funcție care este executată ca răspuns la un eveniment.

Atunci când funcția care are drept parametru callback-ul ajunge la un rezultat, invocă execuția acestuia pasând callback-ului taman rezultatul la care a ajuns. Abia callback-ul are rolul de a returna ceva.

În programarea funcțională, acest mod de a propaga rezultatul se numește „continuation-passing style” (CPS). Returnarea rezultatului dintr-o funcție se numește „direct style”.

În continuare vom face o exemplificare **direct style** versus **continuation-passing style**

```javascript
// direct style
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

La invocarea funcției, fii sigur că ultimul argument pasat este o funcție care primește un unic argument. În acest moment, este invocată funcția de bază. Aceasta primește la primele argumente valorile de lucru iar ultimul, de regulă, fiind funcția callback. Încă o dată îți reamintesc că în JavaScript funcțiile sunt de nivel înalt, acceptând alte funcții ca valori de lucru prin argumente. Aceasta este și explicația pentru care callback-urile funcționează.

Mai există cazul în care callback-urile funcționează asincron.
Pentru a simula asincronicitatea, se va folosi metoda `setTimeout` oferită de obiectul global.

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

Pentru fiecare pas al animației, calbackul pasat lui `setInterval` face closure pe valorile `elementTinta` și increment și astfel, fiind accesibile ca niște variabile care pot fi accesate dar având valorile modificate.

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

Reține faptul că de fiecare dată când intervalul presetat expiră, funcția care joacă rol de callback reactivează **lexical environment** - scope-ul de la momentul creării. Closure-ul pe care-l face fiecare callback ține evidența la propriul set de variabile.

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
}

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

Atenție, în Node, primul argument al unui callback va fi întotdeauna un obiect de eroare. Acesta este modelul care trebuie urmat. Datele vehiculate constituie cel de-al doilea argument.

## Disciplina folosirii callback-urilor

- Ieși din funcție cât se poate de repede cu `return`, `continue` sau `break`.
- Creează funcții cu nume pentru callback-uri pasând rezultatele intermediare ca argumente.
- Modularizează codul împărțindu-l în funcții mici, făcându-l reutilizabil ori de câte ori acest lucru este posibil.

## Dependințe cognitive:

- scope
- this
- closures
