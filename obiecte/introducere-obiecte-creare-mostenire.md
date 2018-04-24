# Obiecte

## Familiarizare cu obiectele

Standardul spune că **un obiect este un membru al tipului built-in Object** al limbajului. Din punct de vedere al taxonomiei, standardul este clar: un tip a lui `Object`, care este o entitate internă limbajului nostru. Însă pentru a realiza natura obiectelor, vom cita standardul din nou care aduce următoarea lămurire:

> ECMAScript este bazat pe obiecte: limbajul de bază și toate funcționalitățile sunt oferite de obiecte iar un program ECMAScript este un ciorchine de obiecte care comunică.

Obiectele sunt și ele valori. La aceste valori se ajunge printr-o referință (către o locație în memorie unde este stocat), în contrast cu valorile primitive care sunt însăși valoarea. Putem pune primitivele în mai multe zone de memorie pentru care vom avea identificatori diferiți. Obiectele ocupă o zonă de memorie și nu poate fi copiat acel obiect odată creat în alte zone de memorie. Pur și simplu, este unic așa cum o țară este unică în lume cu relieful, obiceiurile și sistemul de valori. Dar pentru a trimite o scrisoare cuiva în lume, trebuie să cunoști țara, orașul, strada și numele persoanei. Așa și cu obiectele. Pentru a folosi acea zonă de memorie vom folosi referințele către aceasta. Acesta este un concept foarte important pe care ar fi bine să-l internalizați acum.

Privind la modul în care sunt organizate datele într-un obiect, vom remarca că acestea sunt colecții de proprietăți identificabile printr-un nume, fiind strânse împreună fără a avea o ordine internă. Este ca și cum ai strânge jucării de același tip într-o cutie după o zi de distracție. Obiectele sunt structuri de date dinamice ale căror proprietăți se modifică și atunci acest lucru se întâmplă spunem că obiectul își modifică starea.

**Despre natura unui obiect ne vorbește standardul**:

> colecții de zero sau mai multe proprietăți fiecare având atribute care determină cum poate fi folosită.

Pentru că obiectele sunt valori, acestea pot fi pasate unei funcții pentru a lucra cu datele obiectului în corpul funcției. Orice modificare aduci datelor atunci când faci prelucrări în funcție, se resfrâng instantaneu prin modificarea valorilor obiectului.

Mai departe, părțile componente, mai exact proprietățile trebuie înțelese precum:

> containere care pot conține alte obiecte, valori primitive sau funcții.

Adu-ți mereu aminte că funcțiile sunt și ele obiecte și din acest motiv, la rândul lor niște referințe.

Câteva concepte fundamentale pentru înțelegerea obiectelor în general:

-   **Incapsulare**: este ceea ce obții atunci când pui împreună datele cu funcționalitățile care vor opera cu ele.
-   **Agregarea obiectelor** se realizează atunci când un obiect are proprietăți care sunt referințe către alte obiecte.
-   **Moștenirea** este un mecanism prin care este asigurată posibilitatea ca obiectul creat să poată folosi datele și funcționalitățile altuia.
-   **Poliformism** este caracteristica unui obiect de a deveni un comportament urmat de multe alte obiecte. Spunem că un obiect se comportă ca o interfață, care poate fi aplicată altor obiecte pentru a opera cu acestea.

Atunci când un obiect este creat, toate caracteristicile sale sunt moștenite de la un alt obiect cu rol de prototip așa cum un copil moștenește trăsăturile mamei. Chiar dacă acel copil este o persoană diferită, acesta moștenește de la părinții săi anumite caracteristici. Dacă am strânge aceste caracteristici într-un loc, acesta ar fi obiectul prototip. Să nu vi se pară ciudat că un prototip este un obiect, iar acesta la rândul lui are un prototip. E ca un lanț care are drept limită superioară obiectele interne `Object` și `Function`, iar desupra lor este valoarea `null`. Totuși acest lanț prototipal poate fi rupt. Vom vedea imediat cum.

### Cât timp trăiește un obiect

Acum poți să-ți pui o întrebare foarte simplă: cât timp „trăiește” un obiect? Mai corect ar fi să reformulăm întrebarea. Cât timp este disponibil un obiect programului. Un obiect este disponibil atâta vreme cât există cel puțin o referință către acesta sau către o proprietate a sa. Ce se întâmplă când nu mai există nicio referință? Zona de memorie pe care o ocupa este eliberată de un mecanism intern motorului denumit în limba engleză *garbage collector*. În această lucrare veți mai întâlni expresia *colectat la gunoi*, ceea ce implică chiar acest proces de eliberare a memoriei care este unul automat. Dacă un obiect oferă metode altuia prin mecanismul de moștenire prototipală, acesta nu va fi colectat la gunoi pentru că de el depind alte obiecte care lucrează cu metode sau valori pe care le apelează din lanțul prototipal format. Acest tip de referință este una implicită. Atunci când un obiect face referințe către proprietățile unui alt obiect, spunem că realizează o referință explicită. Atunci când ambele referințe nu mai există, intervine mecanismul de colectare la gunoi și memoria este eliberată.

### Reguli de redactare

O regulă de redactare utilă este aceea că toate valorile text vor fi introduse în obiecte între ghilimele simple, iar restul valorilor așa cum sunt ele. Dacă nu sunt între ghilimele înseamnă că sunt identificatori ai altor valori. Am putea introduce textul folosind și ghilimelele duble, dar dacă în text vor fi folosite ghilimelele duble, instantaneu am avea o mare problemă pentru că motorul ar considera că la primele ghilimele duble ale textului se încheie declarația valorii text. Proprietățile se redactează precum listele, fiind delimitate prin virgulă. Atunci când folosim operatorul `new`, în limbajul programatorilor spunem că am creat o instanță a unui obiect.

```javascript
// am creat un obiect
// folosind notația literală
const obi = {
  a: 'ceva text'
};
// sau declarând proprietatea
// cu string literal
const obi2 = {
  "a": 'altceva'
};
// echivalent cu
const obi3 = new Object();
obi3.a = 'cineva';
```

Exemplul oferit înfățișează cea mai întâlnită notație pentru crearea obiectelor pe care o numim *literală*: `const obi = {};`. Vei observa că obiectele sunt declarate cu un identificator al unei variabile `const`. Este de preferat această abordare pentru avantajele oferite de `const`.

Acest mod de a adăuga proprietăți noi fără a interveni asupra constructorului este unic și este o marcă a limbajului de programare JavaScript. Este și ceea ce îl face plăcut la lucru prin abordarea directă. Vom vedea mai departe ce sunt constructorii.

#### Alcătuirea obiectelor

Obiectele au **proprietăți** și **metode**. Împreună formează membrii obiectului.

Proprietățile sunt valori primitive - numere, boolean-uri, șiruri de caractere, funcții sau chiar obiecte. O parte din proprietăți sunt valori, adică **sunt ceva**, iar altele **fac ceva**, acestea fiind funcții care sunt apelate în contextul unui obiect.

#### Sintaxa proprietăților

Începând cu ECMAScript 2015 se poate folosi și notația prescurtată atunci când numele unei proprietăți este același cu numele identificatorului unei valori.

```javascript
let unu = 1, este = true; // în loc de
const obi = {
  unu: unu,
  este: este
};
// dacă numele proprietății este același cu
// cel al identificatorului unei valori putem scrie mai concis
const obi = {unu, este};
// efectul este același
console.log(obi);
// {"unu":1,"este":true}
```

**Moment ZEN**: Obiectele pot fi privite ca array-uri asociative pentru că poți accesa valoarea folosind notația cu paranteze drepte: `obi['b']`.

Atunci când sunt adăugate proprietăți folosind sintaxa cu paranteze pătrate, este permisă evaluarea expresiilor dintre parantezele pătrate, iar rezultatul devine cheia.

```javascript
let a = 'ce', b = `va`;
const obi = {};
obi['alt' + a + b] = 'bau';
// { altceva: "bau" }
obi[a + b] = function () {
  return this.valueOf();
};
obi['ceva']();
// Object { altceva: "bau", ceva: () }
```

### Categorii de obiecte

În textul standardului, obiectele se încadrează următoarelor categorii:

-   **Ordinary object** (*obiecte comune*), care au comportamentul comun tuturor obiectelor din JavaScript.
-   **Exotic object** (*obiecte exotice*), care au comportamentul comun obiectelor în JS, dar cu mici diferențe.
-   **Standard objects** (*obiecte standard*) sunt toate obiectele JS. Obiectele *ordinary* și cele *exotice* fac parte din setul obiectelor **standard**.
-   **Built-in objects** (*obiecte interne*) sunt toate obiectele pe care le expune din start motorul de JavaScript. Toate obiectele comune (*ordinary*) fac parte din setul celor interne.

### Obiectele interne (built-in)

Am menționat că JavaScript vine din start cu obiectele care se numesc în limba engleză *built-in object*. Le numim **obiecte interne** limbajului. Pentru a avea acces la ele nu-i nevoie să faci ceva. Pur și simplu ele sunt acolo deja, gata de a fi folosite. Există un detaliu pe care aș dori să-l remarcați cu atenție. Obiectul `global` este parte a obiectelor interne. Am putea concluziona că `obiectul global` plus `obiectele standard` constituie setul mare al celor `interne`. Vom accentua concluzia că obiectul global nu este containerul tuturor obiectelor oricât de tentant ar fi să-l imaginăm astfel. Dar este *containerul*, dacă vrei să-l închipui astfel, al întregului cod pe care-l scrii tu și al entităților care se formează la momentul evaluării acestuia.
Dincolo de acestea există un univers mult mai larg al unor seturi de obiecte puse la dispoziție de browser, de exemplu. Acestea vor constitui ceea ce numim Interfețe de programare a aplicațiilor, în limba engleză Application Programming Interfaces - API-uri.

Modul în care înțelegem funcționalitățile deja existente, pe care un obiect intern le oferă, este determinat și de un set de algoritmi rulați de motorul care implementează standardul ECMAScript. Reamintesc faptul că pentru a putea programa în JavaScript, există un motor a cărui treabă este să facă acest lucru posibil. El se ocupă de generarea obiectelor interne, de a asigura interpretarea codului sursă, ș.a.m.d. Poți să-ți închipui motorul JavaScript ca pe un turn de control.

Să revenim. Acești algoritmi sunt numiți `metode interne` ale obiectelor interne. Metodele interne definesc comportamentul la momentul rulării codul pentru generarea și utilizarea acelui obiect. Reține faptul că aceste metode interne cad în responsabilitatea celor care fac implementarea unui motor de JavaScript - producătorii de browsere și Node.js. Reține acest aspect pentru a nu fi surprins când vei auzi sau citi discuții despre performanțele unui anume motor în comparație cu altul. Aceste metode interne, sunt toate procesele care se petrec în inima unui motor atunci când, de exemplu, apelezi o metodă a unui obiect intern cum ar fi `Object.create()` sau `String.split()`. Aceste adevărate biblioteci de cod scrise în alte limbaje de programare precum C++ sau Rust sunt de fapt executanții *instrucțiunilor* pe care noi le scriem în codul sursă JavaScript. De aici și atributul pus acestui limbaj ca fiind de scripting. Un script fiind un set de instrucțiuni, care la momentul execuției angajează adevărate biblioteci de cod precompilate în limbaje de programare de nivel mai jos sau chiar binare, care comunică 1 și 0 direct cu procesorul și mai noi cu perifericele (Internet of Things). Am menționat acest lucru pentru a înțelege că noi operăm la un nivel foarte înalt, iar JavaScript poate fi perceput ca pe un rețetar ce se aplică într-un mediu dedicat interpretării respectivelor rețete.

Câteva astfel de rețete oferite de limbajul nostru de programare sunt foarte utile lucrului cu obiecte. De exemplu, metoda `Object.getPrototypeOf()` returnează un obiect sau `null` și indică obiectul care oferă proprietățile moștenite, precum și pe cel asupra căruia se face interogarea cu `Object.getPrototypeOf(obiSursă)`. Returnarea lui `null` indică faptul că obiectul curent nu moștenește nicio proprietate. M-am oprit la această metodă pentru că obiectele prototip sunt pivoții pe care se realizează mecanismul de moștenire în JavaScript.

Aceste metode, de fapt, aceste **rețete** prestabilite, pot fi și ele alterate pentru că în flexibilitatea JavaScript permite chiar modificarea rețetelor originale (vezi obiectul intern `Reflect`). Este ca și cum ai modifica o carte de bucate așa cum vrei tu după necesitățile tale. Atingerea unui astfel de nivel implică un aspect negativ, iar acesta este pierderea compatibilității cu programele scrise față de restul comunității. Închipuiește-ți ce s-ar întâmpla dacă aș modifica **rețeta** `Object.setPrototypeOf()`, dar alt programator dorește o interfațare cu software-ul scris de mine, fiind bun bazat că metoda sa `Obiect` respectă comportamentul așteptat prin standard? Ar fi un haos desăvârșit. Totuși, sunt momente când mici modificări îmbunătățesc performanța sau îmbogățesc programele.

## Mantre

-   ECMAScript vine cu obiectele sale din start care se numesc obiecte `built-in` în care este inclus și `global object` - obiectul global.
-   Totul în JavaScript are comportamentul unui obiect cu două excepții: `null` și `undefined`.
-   Toate obiectele în JavaScript descind din `Object`.
-   Toate obiectele moștenesc metode și proprietăți din `Object.prototype`, iar acestea pot fi suprascrise sau poți adăuga propriile proprietăți și metode.
-   În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (numeFunctie.prototype). Acest obiect (prototype), este gol și este creat de constructorul lui `Object()`.
-   Fiecare funcție obiect are un obiect prototip diferit.
-   Un obiect poate fi creat cu `new Object()`:
  -1 acestă modalitate **nu va crea și constructor**.
  -2 Accesarea `numeObiect.__proto__.constructor` răspunde cu `function Obiect()` la care s-a ajuns prin căutarea în lanțul prototipal.
-   O funcție apelată cu `new` în fața sa este un constructor.

## Crearea obiectelor

Obiectele pot fi create în două feluri: prin declararea acestora sau prin construirea lor.

1 `const ObiNou = new Object();` la execuție cu `new` se respectă cele patru reguli: (1) crearea obiectului; (2) stabilirea lanțului prototipal; (3) legarea lui `this` la noul obiect; (4) obiectul nou creat este returnat. Sintaxa este echivalentă cu `const newObj = {}`.
2 `const ObiNou = Object.create(null);`, unde `prototype` este setat la `null`. Acest model este supranumit `dict pattern`, adică șablonul de creare a unui dicționar.
3 `const ObiNou = Object.create(Object.prototype);`, fiind echivalent sintaxei `var newObj = {}`.
4 `const ObiNou = {};`, fiind echivalentă cu sintaxa `new Object()`.
5 `function x () { return {} }; const y = x();`, returnează un obiect în urma execuției unei funcții.

Toate variantele au același efect: creează un obiect gol.

Atenție, obiectele create cu `Object.create(null)` nu au constructor. Proprietatea `.constructor` va trimite la funcția la care a fost atașat `prototype` la momentul declarării. Am amintit de șablonul **dict**, o prescurtare de la dicționar. Câteva lămuriri sunt necesare. Acum câțiva ani, nu aveam la îndemână obiectele interne `Map` și `Set` pentru a organiza date. În acest scop erau folosite obiectele comune. Programatorii trebuiau să găsească o alternativă pentru a folosi obiectele precum un siloz, mai corect precum un dicționar de chei/valori.

Am zis dicționar pentru că ajută până și sintaxa la asemănarea cu unul (**cuvânt cheie: valoare**). Astfel, folosindu-se `Object.create(null)` puteai crea un obiect fără legătură prototipală. Astfel, obiectul rezultat nu era *poluat* cu proprietăți moștenite. Ceea ce rămânea era o structură care putea fi folosită precum un **dicționar**.

Modalitatea de a crea obiecte prin returnarea unui obiect dintr-o funcție este și ea des întâlnită. Acest model, șablon, tipar, spune-i cum îți place pentru că englezii îi spun **pattern**, se comportă ca o mică făbricuță de făcut obiecte. De fiecare dată când o astfel de funcție va fi apelată, tot atâtea obiecte vor fi returnate.

```javascript
function Făbricuță (valoarea) {
  // voi folosi notația prescurtată ES6 pentru a scrie obiectul
  return {
    a: 1,
    valoarea
  };
};
// inițiem două colecții ca să fie mai amuzant de urmărit
// una cu valori pentru care se creează Obiectele
// pentru că vom introduce valoarea fiecărui index într-un obiect
// si a doua care va fi containerul în care încărcăm cu push
// obiectele generate de Făbricuță
let colTest = ["x", "y", "z"], colObi = [];
for (let i = 0; i < colTest.length; i++) {
  colObi.push(Făbricuță(colTest[i]));
};
colObi[0];
```

Am făcut un pas important către înțelegerea unei perspective lărgite asupra limbajului. Datele sunt așezate și sunt structurate în diferitele tipuri de agregări necesare unor scenarii diferite aplicate la anumite momente ale execuției unui program.

### Crearea obiectelor cu un constructor

#### Ce sunt constructorii

Sunt niște funcții care sunt redactate special ca la momentul execuției, să **construiască** un obiect. După cum am văzut în capitolul dedicat genezei Tărâmului, atunci când s-au format **intrinsics**, a fost creat și obiectul prototip al tuturor obiectelor, care o fracțiune mai târziu a fost folosit pentru crearea obiectului-funcție ce va juca rolul de prototip al tuturor funcțiilor.

Standardul spune că un constructor este:

> este un obiect funcție care suportă metoda internă `[[Construct]]`.

Prin convenție, pentru a distinge constructorii de funcțiile simple, vor avea identificatorul cu literă mare.

```javascript
function MatrițăAvionVuiaI (tip = 'experimental', an = '1906') {
  this.nume = 'Vuia 1';
  this.deschidereAripi = 4; // în metri
  this.distanțăMaximă = 0.012; // în kilometri
};
var VuiaI = new MatrițăAvionVuiaI();
console.log(VuiaI);
// { nume: 'Vuia 1', deschidereAripi: 4, 'distanțăMaximă': 0.012 }
```

Atunci când un obiect este instanțiat folosindu-se operatorul `new` se va genera automat o proprietate numită `constructor`, care indică funcția care a generat obiectul. La apelarea cu operatorul `new`, mai întâi se generează obiectul și apoi execută codul funcției. Execuția codului dintr-un constructor are ca efect asignarea proprietăților inițiale ale noului obiect. Invocarea unui constructor fără `new` execută codul din corpul funcției fără a crea obiectul.

În exemplul oferit l-am introdus pe `this`. Este nevoie să lămurim câteva aspecte privind acest obiect absolut necesar pentru rularea funcțiilor în contexte de execuție diferite.

#### Despre this

Să ne gândim la o funcție ca la o persoană care privește **bolta celestă** într-o noapte înstelată. Cum ar putea povesti despre toate constelațiile văzute? Cum le-ar putea referenția printr-o singură expresie? Hai, nu e greu, am zis deja... da, da, ai remarcat perfect: **bolta celestă**. Dacă dorim să constrângem la un singur termen care să o identifice, am putea spune foarte simplu **cerul**, nu? Așa este și cuvântul cu înțeles special `this`, care s-ar traduce în română **acesta** cu sensul că indică spațiul în **contextul** căruia se execută o funcție, de exemplu. Termenul stabilește *conectarea* unei funcții cu obiectul și mediul pe care acesta îl formează la momentul apelării unei funcții. Această conectare la obiectul context este cimentată prin crearea unui obiect numit `this` a cărui proprietăți sunt, de fapt proprietățile obiectului în care se execută funcția. Pentru funcția care tocmai și-a început execuția `this` este o proprietate care nu poate fi modificată - nu poți schimba cine este obiectul `this`.

Poți să-ți imaginezi o funcție precum un pilot care se urcă la bordul *obiectului* numit avion. Primul lucru pe care îl face este să-și conecteze căștile la sistemul de comunicare intern al avionului. Acest intercom este **mediul** de comunicare al avionului la care mai sunt conectate și alte funcții precum navigatorii, mecanicii și însoțitorii de bord. Consideră-i pe aceștia funcții. Primul lucru pe care îl fac toți este să se conecteze prin intercom la **mediul** care oferă date pentru a raporta piloților, precum și altor funcții diverse informații. Toți sunt conectați la același **mediu de comunicare** oferit de obiectul avion.

Poți să-ți imaginezi obiectul `this` ca pe un vas care se umple cu referințe către identificatorii din mediul lexical al obiectului în a cărui context se execută funcția.

Reține că referința `this` este strict legată de *locul* în care a fost apelată funcția, nu de *locul* unde a fost declarată. Sunt două lucruri distincte. Dacă nu le vei percepe astfel încă de acum, te vei lovi de multe erori și nu vei înțelege în profunzime anumite comportamente.

#### `this` și constructorii în obiectul global

Știm că funcțiile sunt folosite pentru a construi obiecte. Atenție, o funcție cu rol de constructor poate fi invocată și fără operatorul `new`. În acest caz se va comporta ca o funcție simplă cu toate consecințele rulări în acest mod.

```javascript
function NumescNave (indicativ, nume) {
  this.indicativ = indicativ;
  this.nume = nume;
  let tot = `${indicativ} este ${nume}`;
  console.log(tot);
  // funcția returnează undefined
};
let executie = NumescNave('ISS', 'International Space Station');
console.log(executie);
// o funcție care nu are precizat ceva să returneze, va returna undefined din oficiu
console.log(`${window.indicativ} este ${window.nume}`);
// 'ISS este International Space Station'
let obiect = new NumescNave('Tiangong-1', "Palatul Celest");
console.log(obiect);
```

Ceea se se distinge imediat este faptul că rularea funcției `NumescNave` fără `"use strict";` înjectează toate valorile precizate prin sintaxa `this.ceva` direct în obiectul global. De ce? Pentru că la acesta a fost stabilită legătura implicită pentru valoarea lui `this`. În cazul rulării funcției sub `"use strict";`, motorul JavaScript ar fi semnalat o excepție și ar fi afișat: **Exception: TypeError: this is undefined**. Concluzie, injectarea valorilor nu s-ar mai produce.

### Legătura prototipală la contructori

Obiectele-funcții au la rândul lor o proprietate numită `prototype`. Această proprietate face posibilă moștenirea prototipală. În cazul apelării folosind operatorul `new`, se va genera legătura prototipală fiind folosită chiar referința către obiectul prototip al funcției pentru a adăuga noul obiect în lanțul prototipal.

**Spune standardul**:

> Fiecare obiect creat de un constructor are o referință implicită (numită prototipul obiectului) către valoarea proprietății «prototype» a constructorului.

#### Ce se întâmplă când folosești new

Invocarea unei funcții constructor folosind operatorul `new`, declașează parcurgerea unor etape esențiale. La final, motorul creează un obiect. Reține faptul că acest nou obiect trebuie referențiat printr-o expresie de tipul `const obiNou = new FacObiecte();`. Când ajunge la `new`, motorul JavaScript înțelege că este momentul să creeze un obiect după cum urmează:

1  Se creează un obiect nou.
2  Se creează o legătură prototipală la obiectul prototype al funcției constructor.
3  Obiectul generat automat este pasat funcției cu rol de constructor ca fiind obiectul `this` și astfel, din acest moment devine contextul de execuție al funcției constructor invocate. După ce va fi înzestrat cu proprietățile dorite prin execuția corpului funcției constructor, obiectul `this` va fi returnat drept noul obiect.
4  Dacă funcția constructor nu returnează ceva explicit, atunci înainte de a se închide blocul („}”) se va returna automat obiectul constituit la pasul 1 și după ce a fost „înzestrat” la pasul 3. În cazul în care funcția constructor returnează ceva explicit, nu se mai creează obiectul.

Spuneam că la nevoie poți adăuga în prototipul funcției proprietăți pentru a fi moștenite mai târziu de obiectele create. Să spunem că avem o funcție cu rol de constructor și se instanțiază un obiect. Mai târziu, pentru că este nevoie de o proprietate care să fie moștenită de toate obiectele generate, se poate introduce direct în obiectul `prototype` al funcției și astfel va fi disponibilă și obiectelor instanțiate. Reține că poți introduce metode sau valori și mai târziu, după ce s-a făcut instanțierea.

```javascript
function BenziDesenate (titlu) {
  this.tip = "aventuri";
  this.titlu = titlu;
  this.identificare = function dauID () {
    return `Acum citești ${titlu}, care este de ${this.tip}`
  };
};
const rahan = new BenziDesenate("Rahan");
console.log(rahan.identificare());
BenziDesenate.prototype.apreciere = function () {
  return `Sunt un mare fan ${this.titlu}`;
};
rahan.apreciere();
```

Exemplul de mai sus este ceea ce Douglas Crockford numește moștenire „presudoclasică” și argumentează că ar fi o practică ce ar trebui evitată. Am menționat acest model pentru că este întâlnit adesea în aplicații. Dacă dorești să înțelegi noua sintaxă care introduce conceptul de clase în JavaScript, această practică trebuia menționată. Ca deficiență a modelului este că ori de câte ori vei crea un obiect nou, funcția `dauID` va fi creată și ea, poluându-se memoria. Obiectul funcție nu va putea fi colectat la gunoi pentru că este legat prin prototip de obiectele instanțiate. Reține faptul că performanța în cazul constructorilor poate fi afectată.

Crockford indică faptul că în practică mai sunt întâlnite și situații „nebune”, când se înlocuiește prototipul unui obiect funcție cu un obiect creat din apelarea cu `new` a unei funcții constructor.

```javascript
function SuntUnContructor () {
  this.oProprietate = 10;
};
SuntUnContructor.prototype.oFunctie = function oFunctie(){
  return this.oProprietate;
};
function UnConstructorNou () {
  this.oValoare = 1000;
};
UnConstructorNou.prototype = new SuntUnContructor();
UnConstructorNou.prototype.propNoua = function(){
  return oValoare;
};
const obi2 = new UnConstructorNou();
obi2.oValoare; // 1000
```

Odată cu evoluția standardului a fost oferită o alternativă elegantă prin `Object.create()`, cu ajutorul căreia putem evita instanțierea cu `new`. Totuși declari o funcție constructor și adaugi în prototip proprietățile pe care obiectul le va moșteni.

```javascript
let Ceva = function (info) { this.info = info };
// adugă metoda
Ceva.prototype.difuzor = function () {
  console.log(this.info);
};
const instanta = Object.create(Ceva.prototype, {
  info: {
    value: 'Salut!',
    writable: true
  }
});
instanta.difuzor(); // Salut!
```

#### Constrângerea la constructor

Uneori ai nevoie să restricționezi o funcție doar la rolul de constructor. Obiectul rezultat este o instanță a obiectului `this` al funcției constructor pentru că în baza lui `this` a fost instanțiat acesta. Bazându-ne pe acest lucru putem verifica la momentul invocării dacă obiectul s-a creat sau nu. La apelarea cu `new` se creează obiectul, iar la execuția simplă nu se creează niciun obiect.

```javascript
function VehiculSpatial (nume) {
  if(this instanceof VehiculSpatial){
    this.nume = nume;
    this.tip = 'vehicul';
  } else {
    throw new Error('Funcția are rol de constructor! Invocă cu new');
  }
};
let obiectNou = new VehiculSpatial('ISS'); // { nume: "ISS", tip: "vehicul" }
let obiectEsuat = VehiculSpatial(); // Error: Funcția are rol de constructor! Invocă cu new
```

Această restricționare poate fi păcălită apelând funcția constructor în contextul unui obiect deja creat de funcția constructor fără a instanția cu new.

```javascript
let obiectPacalitor = VehiculSpatial.call(obiectNou, 'Soyuz');
// în acest moment, obiectNou este modificat la Object { nume: "Soyuz", tip: "vehicul" }
```

Ceea ce tocmai s-a petrecut este că s-a invocat constructorul în contextul unui obiect deja construit pe baza lui, iar `this` a devenit obiectul deja creat. Acest lucru conduce la rescrierea lui `nume` în obiectul gazdă (`obiectNou`). Acest comportament nu este cel așteptat atâta vreme cât am dorit ca funcția constructor să permită invocarea doar cu `new`.

În ES6 această problemă este reglată prin `new.target`. Acestă proprietate, care este mai specială pentru că se adresează unui viitor obiect ce nu a fost creat încă, capătă o valoare atunci când are metoda `[[Construct]]`. Valoarea este constructorul obiectului proaspăt generat, adică `this`. Dacă funcția constructor este apelată fără `new` asta înseamnă că este apelată cu `[[Call]]`, `new.target` va avea valoarea `undefined`.

```javascript
function VehiculSpatial (nume) {
  if(typeof new.target !== "undefined"){
    this.nume = nume;
    this.tip = 'vehicul';
  } else {
    throw new Error('Funcția are rol de constructor! Invocă cu new');
  }
};
let obiectNou = new VehiculSpatial('ISS'); // { nume: "ISS", tip: "vehicul" }
let obiectPacalitor = VehiculSpatial.call(obiectNou, 'Soyuz'); // Error: Funcția are rol de constructor! Invocă cu new
```

#### Getteri și setteri

Uneori este necesar să protejezi anumite valori ale unui obiect pe care-l generezi folosind o funcție constructor. Partea foarte frumoasă este că însăși funcția constructor permite introducerea unor mecanisme de acces și setare a valorilor din obiectul rezultat. Acest lucru se realizează prin funcții specializate care poartă denumirea de **accesori** și sunt cunoscuți ca fiind **getteri** (de la englezescul `get`, care înseamnă **a obține** o valoare) și **setteri** (de la englezescul `set`, care înseamnă a introduce o valoare).

Până la ECMAScript 5, getterii și setterii erau nimic mai mult decât două funcții special croite pentru a introduce și scoate valori.

```javascript
function FaUnObiect (sunetPrimit) {
  let sunet = sunetPrimit; // setare cu o valoare inițială
  this.getSunet = function () {
    return sunet;
  };
  this.setSunet = function (zgomot) {
    sunet = zgomot;
  };
};
const obi = new FaUnObiect('zbang');
obi.getSunet(); // "zbang"
obi.setSunet('poc');
obi.getSunet(); // "poc"
```

Ceea ce este observabil este faptul că `valoare` nu este accesibil direct, ci numai prin intermediul celor două funcții specializate. ECMAScript 5 simplifică lucrurile din punct de vedere sintactic și reduce verbozitatea codului. În locul unei funcții cu rol de constructor, se poate lucra direct cu obiectul la momentul declarării sale.

```javascript
const obi = {
  get sunet () {
    return this.valoare;
  },
  set sunet (zgomot) {
    this.valoare = zgomot;
  }
};
obi.sunet; // undefined
obi.sunet = 'paf';
obi.sunet; // "paf"
```

În cazul nostru, `valoare` este partea ascunsă a obiectului, care poate fi manipulată doar prin metodele specializate.

#### Introducerea de proprietăți în prototipul unui obiect gol - obiect literal

Acesta este cazul simplu de moștenire care se poate realiza. Dacă avem un obiect, folosești metoda `create` a obiectului intern `Object` pentru cazul special în care ai nevoie să deturnezi legătura implicită la obiectul prototipal setat de motor și să pui alt obiect în loc cu rol de prototip.

```javascript
const obiect = {};
Object.getPrototypeOf(obiect); // Object { , 15 more… }
Object.setPrototypeOf(obiect, {ceva: 10});
// Object.getPrototypeOf(produs2) => Object { ceva: 10 }
```

### Crearea printr-o declarație literală

Declararea literală este sintaxa cel mai ades întrebuințată pentru a crea obiectele. Instant se va face cuplarea la obiectul prototipal al obiectului fundamental `Object`.

```javascript
const obiectNou = {};
obiectNou.__proto__.constructor
// returnează: function Object()
```

Atunci când creezi un obiect printr-un literal, de fapt constitui un „domeniu” separat de restul codului cunoscut în lumea programării ca **namespace**. Punctul de intrare este chiar numele obiectului. Acest lucru este foarte util pentru a separa fragmente mai mari sau mai mici în zone unic identificabile. Este foarte util dacă te gândești că atunci când scrii o aplicație este posibil ca multe funcționalități să le folosești din alte programe scrise de alți colegi. Dacă nu ar exista un mecanism de separare, ar fi o bună șansă să suprascrii fără să vrei valori, care, potențial, ar purta același nume.

Astfel, realizezi este o modularizare a codului. Ca programator aduci la lumină un obiect nou, al tău, care va performa în strânsă legătură cu obiectele scrise de alții.

```javascript
const aplicatie = aplicatie || {};
```

În fragmentul de mai sus am apelat la o expresie de inițializarea a unei aplicații, care prin utilizarea operatorului logic SAU, va verifica existența unui identificator `aplicatie`, iar dacă acesta nu există, va fi creat un obiect care să fie containerul a ceea ce va fi. Această expresie este o practică foarte des întâlnită pentru a „rezerva” un „nume de domeniu” (**namespace**) pentru propria aplicație.

### Crearea obiectelor cu `Object.create()`

Această metodă a obiectului intern fundamental `Object` a fost introdusă odată cu versiunea ES5 a standardului. Permite atribuirea directă a unui prototip unui obiect, eliberând prototipul din legătura sa cu propriul constructor, dacă acest lucru este dorit. Prin pasarea valorii `null`, ai posibilitatea să creezi un obiect care să nu aibă legătură prototipală intermediată. Foarte interesant, nu? Legătura se face automat la obiectul prototip a lui `Object`.

```javascript
const obiect = Object.create(null);
Object.getPrototypeOf(obiect); // null

const obiect2 = {};
Object.getPrototypeOf(obiect2); // {}
// echivalent cu
obiect = Object.create(Object.prototype);
```

Echivalența este evidentă pentru că un obiect literal este un obiect ordinar, care stabilește imediat o legătură la obiectul prototip a lui `Object` identificat prin `Object.prototype`. Construirea unui prototip care să stea la baza unui nou obiect construit poate fi des întâlnită în practică.

```javascript
const prototip = {
  prop1: "salut",
  prop2: function compun () {
    console.log('Te ' + this.prop1);
  }
};
// prototip.__proto__.constructor răspunde: function Object()
const instanta = Object.create( prototip );
// instanta.__proto__.constructor răspunde: function Object()

instanta.prop2(); // Te salut
instanta.salutNou = function compunSalut () {
  console.log('Te ' + this.prop1 + ' iar');
};
instanta.salutNou(); // Te salut iar
```

Atenție! Valorile din prototip nu pot fi modificate, dar pot fi suprascrise în obiectul care le moștenește pentru că, de fapt, devin a lor. Avem exemplul propus de Kyle Simpson care este ceva mai elaborat.

```javascript
function Bunica (nume) { this.persoană = nume; };
Bunica.prototype.cineSunt = function identificare () { return "Eu sunt " + this.persoană; };

function Mamă (cine) { Bunica.call(this, cine); };
Mamă.prototype = Object.create(Bunica.prototype); // se „injectează” prototipul Bunicii în Mamă
// ATENȚIE! proprietatea .contructor se face de acum către Bunică()
Mamă.prototype.anunță = function euSunt () { console.log("Salut " + this.cineSunt() + "."); };

const obi1 = new Mamă("obi1");
const obi2 = new Mamă("obi2");

obi1.anunță();
obi2.anunță();
```

Metoda `Object.create()` permite o implementare simplă a conceputului de „moștenire diferențială” în care obiectele sunt capabile să moștenească direct din alte obiecte. Kyle Simpson numește această modalitate de a crea obiecte: Objects Linked to Other Objects, pe scurt OLOO. Acest model se bazează pe faptul că `Object.create()` are posibilitatea de a adăuga și în același timp de a configura proprietăți ale obiectului. Este de fapt un caz de șablon tip `Prototype`. Pentru că tot am amintit despre șabloane, ar fi foarte potrivită mențiune faptului că toate aceste elemente de bază pe care le aprofundăm acum, conduc la realizarea unor structuri mai complexe de cod, care permit o mai mare plasticitate atunci când apare nevoia de a modela date.

```javascript
const vehicul = {
  getModel: function ceModel () {
    console.log('Tipul este: ' + this.model);
  }
};

const stație = Object.create(vehicul, {
  // Sintaxa este similară cu Object.defineProperties și Object.defineProperty
  'id': {
    value: 'ISS - 01',
    enumerable: true
    // anterior: writable:false și configurable:false
  },
  'model': {
    value: 'Stație spațială',
    enumerable: true
  }
});
console.log(stație);
// { id: 'ISS - 01', model: 'Stație spațială' }
stație.getModel();
```

Atunci când vrei să creezi un obiect în baza altuia, folosește acest **OLOO**. După cum observi, este mult mai ușor de redactat și este ușor de urmărit ceea ce se întâmplă.

### Crearea obiectelor cu valori deja computate

Această metodă este introdusă de ECMAScript 2015. De fapt, creezi obiecte literale, dar de această dată se pot introduce valori computate (**computed property names** îi spune în limba engleză) chiar la momentul în care este constituit obiectul.

```javascript
// cel mai simplu exemplu
const a = 10;
const b = 20;
const obi = {a, b};

// un alt exemplu
const namespace = 'moz';
const webObi = {
  [namespace + 'box-sizing']: 'border-box',
  [namespace + 'box-shadow']: '25px25px10px #888888'
};
```

## Membrii obiectului

### Proprietățile unui obiect

Proprietățile obiectului sunt datele pe care dorim să le organizăm cu acel obiect și fac parte din membrii obiectului.

După ce instanțiezi un obiect, ai nevoie să-l faci funcțional populându-l. Putem să ne imaginăm un obiect ca pe un container pentru un set de lucruri ce stabilesc împreună un sens, o unitate proprie gata să fie prelucrată. Până la apariția noilor obiecte interne `Map` și `Set`, obiectele erau folosite și pentru a stoca date, fiind numite de programatori **dicționare**. De ce? Pentru că modul de a scrie obiectul aduce cu aranjamentul editorial al unui dicționar. Ai termenul, pui două puncte și apoi explicația. Reține pe viitor faptul că pentru a stoca date, poți folosi cu mare succes `Map` și `Set`. Dacă dorești să gestionezi obiecte care sunt folosite temporar așa cum sunt cele generate de evenimentele din DOM, folosește `WeakMap` și `WeakSet`.

#### Atributele proprietăților unui obiect

Atributele sunt folosite pentru a defini și a explica starea proprietăților unui obiect. Vom vedea că o singură proprietate a unui obiect are mai multe atribute, care pot fi manipulate pentru a realiza anumite condiții pentru datele primite și analizate în cadrul unui obiect. Proprietățile unui obiect sunt niște membri care pot fi accesați, setați și pot fi modificați pentru a putea prelua valori. Sau dimpotrivă, poți să le blochezi. Ba mai mult, poți să pui o setare prin care să interzici configurarea unei anumite proprietăți sau a tuturor proprietăților printr-o așa-zisă „înghețare” a obiectului. Am structurat atributele proprietăților după ceea ce oferă util acestea.

<img src="ProprietatePentruDate.png" width="300">

| Numele atributului | Valoarea returnată     | Descriere                                                                                   |
|:------------------ |:---------------------- |:------------------------------------------------------------------------------------------- |
| `value`            | oricare tip ECMAScript | Este valoarea obținută prin accesarea proprietății                                          |
| `writable`         | Boolean                | Dacă `false`, atributul `value` nu va putea fi scris folosind `set`                         |
| `enumerable`       | Boolean                | Dacă este setat la `true`, proprietatea va putea fi enumerată într-un `for..in`             |
| `configurable`     | Boolean                | Dacă `false`, nu poți modifica. Poți modifica `value` și setarea lui `writable` la `false`. |

#### Atributele unei proprități de tip **accessor**

<img src="ProprietateAccesor.png" width="300">

| Numele atributului | Valoarea returnată     | Descriere                                                         |
|:------------------ |:---------------------- |:----------------------------------------------------------------- |
| `get`              | Obiect sau `undefined` | Dacă valoarea este un obiect acesta este o funcție-obiect         |
| `set`              | Obiect sau `undefined` | Dacă valoarea este un obiect acesta este o funcție-obiect         |
| `enumerable`       | Boolean                | Dacă `true`, proprietatea va putea fi enumerată într-un `for..in` |
| `configurable`     | Boolean                | Dacă `false`, orice încercare de modificare, va eșua              |

Un exemplu practic:

```javascript
const newObj = {};
Object.defineProperty(newObj, 'numeCheieNoua', {
  value: 'Salutare',
  writable: true,
  enumerable: true,
  configurable: true
});
```

### Metodele unui obiect

O funcție care este declarată într-un obiect sau care este referențiată de o cheie a unui obiect, devine metodă și parte a membrilor acelui obiect. Atenție! este totuși o funcție în sine, o valoare, care atunci când este declarată pentru o proprietate, poate fi accesată doar prefixându-i identificatorul cu numele obiectului. Este exact ca în cazul unei adrese (`oraș: 'Corabia'`).

```javascript
const obi = {
  jeton: 10,
  faCeva: function faCeva () { console.log(this.jeton) }
};
obi.faCeva(); // 10
```

Funcția identificată prin `faCeva` este o metodă a obiectului `obi`. Identificatorul `faCeva` este de fapt o referință către funcția ce afișează în consolă valoarea lui `jeton`. Sintaxa `obi.faCeva` poate fi considerată o referință către funcție. Nu uita faptul că o funcție cu rol de metodă are setat `this` automat la obiectul a cărui metodă este sau a devenit. Am spus că „a devenit” ca posibil scenariu pentru că poți avea o funcție declarată în afara obiectului, dar pe care o asociezi unei proprietăți a unui obiect, cu scopul de a prelucra date din obiect. Folosirea unei funcții într-un obiect drept „metodă”, nu este decât apelarea unei funcții în contextul obiectului. Nu se poate spune că obiectul „conține” funcția. Obiectul doar face o referință. Funcției cu rol de metodă i se pasează `this`, care este obiectul unde joacă rol de metodă.

Modalitatea de a crea o metodă într-un obiect este perfect echivalentă cu următoarea alternativă.

```javascript
const obi = { jeton: 10 };
obi.faCeva = function faCeva () { console.log(this.jeton); };
obi.faCeva(); // 10
faCeva(); // faCeva is not defined
```

Dar și această alternativă este perfect identică cu următoarea:

```javascript
let jeton = 1000;
const obi = { ceva: 10 };
function faCeva () { console.log(this.jeton) };
obi.faCeva = faCeva;
obi.faCeva(); // 10
faCeva(); // undefined
// e undefined pentru că JS creează automat
// variabila token in global,
// dar nu are valoare pentru ea
// sau 1000, dacă ai token declarat în global.
```

Aici este un element în plus. Funcția `faCeva` a fost declarată în obiectul global, ceea ce înseamnă că `scope`-ul său lexical se află în `global scope`. În cazul în care în global scope ar fi fost declarată valoarea `jeton`, la invocarea funcției în sine, nu ca metodă, ar fi fost adusă valoarea acesteia.

Odată cu apariția noii versiuni ECMAScript, metodele au fost definite în mod formal. Standardul definește o metodă ca fiind **o funcție care are o proprietate internă `[[HomeObject]]`**. Această proprietate indică obiectul căruia îi aparține metoda. De curând a fost introdusă o simplificare a scrierii sintaxei:

```javascript
const obi = {
  x: 10,
  faCeva () { console.log(this.x) }
};
obi.faCeva(); // 10
```

Observați faptul că declararea metodei `faCeva()` s-a făcut cu notația prescurtată. Este o contragere a scrierii unei metode folosind o funcție anonimă: de la `faCeva: function () {console.log(this.x)}`, am ajuns la forma prescurtată `faCeva () { console.log(this.x) }`. În limba engleză, programatorii numesc această formă prescurtată **concise method** - *metodă prescurtată*. Ar fi bine să vă obișnuiți cu această notație pentru că o veți vedea din ce în ce mai des.

Cazul cel mai util în care prescurtările strălucesc este cel al inițializării directe a proprietăților (în engleză programatorii ver numi această tehnică **property initializer**) prin valorile parametrilor unei funcții de tip fabrică.

```javascript
function construiesteObi (unu, doi) {
  return { unu, doi };
};
const obiNou = construiesteObi(1, 2);
// Object { unu: 1, doi: 2 }
```

### Adăugarea membrilor în obiect

#### Folosirea operatorul punct

Englezul îi spune **dot notation** și este cea mai facilă modalitate de a adăuga proprietăți unui obiect existent cu mențiunea ca acel obiect să nu fie înghețat sau protejat total la scriere.

```javascript
const newObj = {};            // Creează obiectul
newObj.oCheie = 'Salutare'; // Scrie proprietăți
let cheie = newObj.oCheie;  // Accesează proprietățile
```

#### Folosirea sintaxei cu parante drepte

```javascript
const newObj = {};                // Creează obiectul
newObj['oCheie'] = 'Salutare';  // Scrie proprietăți
let cheie = newObj['oCheie'];   // Accesează proprietățile
```

#### Folosirea metodei `Object.defineProperty()`

Această variantă de a introduce proprietăți într-un obiect este de o forță colosală pentru că astfel, poți controla atributele fiecărei proprietăți introduse.

```javascript
const newObj = {}; // Creează obiectul literal
Object.defineProperty(newObj, 'numeCheieNoua', {
  value: 'Salutare',
  writable: true,
  enumerable: true,
  configurable: true
});
```

#### Folosirea metodei `Object.defineProperties()`

Această metodă este utilizată în cazul în care trebuie introduse mai multe proprietăți deodată.

```javascript
Object.defineProperties(obiNou, {
  'oCheie': {
    value: 'Salutare',
    writable: true
  },
  'oAltaCheie': {
    value: 'Ce mai faci?',
    writable: true
  }
});
```

#### Proprietăți computate

Și dacă tot am introdus sintaxele binevenite ale versiunii ES6, cred că este momentul cel mai potrivit pentru a vă prezenta **proprietățile computate**. Dacă ai un obiect literal, poți să-i pui ca și cheie a proprietății o valoare tip șir (string) oferită de o variabilă, de fapt orice expresie validă care poate fi evaluată:

```javascript
let prop = 'identificator';
let comp = 'primul';
const obi = {
  [prop]: 189439,
  [comp + ' lucru']: 'o balenă'
};
console.log(obi[prop]); // 189439
console.log(obi['primul lucru']); // o balenă
```

#### Getters și setters

Javascript oferă posibilitatea de a defini funcții specializate cu ajutorul cărora să poți manipula o valoare din interiorul unui obiect, fără a accesa direct acea valoare prin sintaxa cu punct sau paranteze pătrate.

```javascript
const obi = {
  a: 1,
  get ceva () {
    return this.a;
  },
  set ceva (valoare) {
    this.a = valoare;
  }
};
obi.ceva = 10;
obi.ceva;
```

În limba engleză **get** înseamnă să obții valoarea, iar **set**, să o asignezi. Acest lucru este util atunci când lucrezi cu o colecție de valori folosind un array, de exemplu.

```javascript
const obiect = {
  colectie: [],
  set ceva (valoare) {
    this.colectie[this.colectie.length] = valoare;
  },
  get ceva () {
    return this.colectie.join(', ');
  }
};
obiect.ceva = 10;
obiect.ceva = 'un ceva';
obiect.colectie // "un ceva, 10"

delete obiect.ceva; //true
// ai șters accesorii
obiect.ceva = 101; // inserție directă
// Object { colectie: […], ceva: 101 }
obiect // Object { colectie: Array[2] }
```

Reține faptul că funcțiile în JavaScript sunt obiecte. Funcțiile fac closure pe valorile din mediul lexical extern, dacă acestea sunt necesare pentru evaluarea propriului cod. Poți simula astfel geterii și setterii construindu-i ca parte a unui obiect returnat la execuția unei funcții. Acest mecanism permite manipularea unor valori la care altfel nu ajungi ușor sau la valori care s-a dorit să fie protejate ori ascunse, de-a dreptul.

```javascript
function unObiect () {
  let oValoare;
  return {
    set: function (nou) { oValoare = nou },
    get: function () { return oValoare },
    tip: function () { return typeof oValoare }
  };
};
const x = unObiect();
x.get();    // undefined
x.set(10);  // undefined
x.get();    // 10
x.tip();    // "number"
```

Poți defini un setter/getter folosind și metoda `Object.defineProperty()`.

```javascript
const obiect = { colectie: [] };
Object.defineProperty(obiect, 'ceva', {
  set: function (valoare){this.colectie[this.colectie.length] = valoare;},
  get: function () { return this.colectie.join(', '); }
});
obiect.ceva = 'test';
obiect.colectie; // [ "test" ]
```

### Accesarea membrilor unui obiect

Accesarea proprietăților se poate face folosind sintaxa cu punct și cea cu paranteză pătrată:

1 `obiect.proprietate`
2 `obiect['proprietate']`

Operatorul punct permite citirea proprietăților, dar încercarea de a citi o proprietate care nu există, returnează `undefined`. Dacă o proprietate nu există, aceasta va fi creată: `obiect.oProprietate = 'ceva';`.

Metodele pot fi și ele la rândul lor accesate folosind cele două tipuri de sintaxă, fie ca valori, fie ca apeluri.

1 `obiect.metoda()`
2 `obiect["metoda"]()`

Atunci când invoci o metodă folosind notația cu punct, ai acces la proprietățile obiectului folosind cuvântul cheie `this` deoarece obiectul în cadrul căruia se execută funcția este `this`.

Pentru că sintaxa cu paranteze pătrate (`["proprietate"]`), folosește un șir de caractere (**string**), acest lucru înseamnă că o secvență de cod poate fi folosită pentru a construi valoarea acelui string, de exemplu prin concatenare. Dacă pentru accesare se va folosi orice altceva în afară de stringuri, numărul sau obiectul vor fi transformate în stringuri (folosindu-se mecanismul de coercion). ES6 introduce o nouă sintaxă care ușurează modul de constituire a numelui cheii unui obiect. Până acum, acest lucru se făcea astfel:

```javascript
let numeCheieNoua = "special";
const obi = {
  cheie1: 10,
  cheie2: "ceva"
};
obi[numeCheieNoua] = 1000;
```

ECMAScript 2015 propune următoarea sintaxă:

```javascript
let numeCheieNoua = "special";
const obi = {
  cheie1: 10,
  cheie2: "ceva",
  [numeCheieNoua]: 1000
};
// { cheie1: 10, cheie2: "ceva", special: 1000 }
```

Parcă-i familiar, nu? Dacă te uiți, mai devreme am amintit de **proprietățile computate**. Operatorul paranteză pătrată permite să faci referință către un membru printr-o expresie.

```javascript
const obiect = { unu: "primul", doi: "al doilea" };
obiect['u' + 'nu']; // "primul"
// sau
let cheieProprietate = 'doi';
obiect[cheieProprietate]; // "al doilea"
```

Acest operator permite accesarea proprietăților a căror chei nu sunt identificatori. Iată un exemplu în care poate fi un întreg fragment de text.

```javascript
const obiect = {'aceasta cheie nu este identificator': 10};
obiect['aceasta cheie nu este identificator']; // 10
```

Trebuie spus că operatorul paranteză dreaptă constrânge, transformă automat (prin **coercion**) ceea ce are în interior la string.

```javascript
let obiect = { 23: 10 };
obiect[20 + 3];
// se rezolvă adunarea și se
// face constrângere la string
```

Se pot seta și proprietăți folosind notația paranteză pătrată la fel ca în cazul operatorului cu punct:

```javascript
const obiect = { unu: 1 };
obiect['doi'] = 2;
obiect; // { unu: 1, doi: 2 }
```

Se pot și șterge exact ca și în cazul operatorului cu punct:

```javascript
delete obiect['doi']; // true
```

**Moment Zen**: În obiecte, numele proprietăților sunt stringuri sau simboluri.

### Eliminarea membrilor unui obiect

Operatorul `delete` permite eliminarea unei proprietăți, adică a perechii cheie-valoare din obiect. Operatorul `delete` are efect doar asupra proprietăților care aparțin obiectului (`own`). Prototipul nu este afectat. Delete returnează `false` dacă proprietatea nu poate fi ștearsă dar care este deținută de obiect, și va returna `true` dacă proprietatea a fost ștearsă cu succes.

```javascript
const obiect = { prima: 1, aDoua: 2 };
delete obiect.prima; // true
console.log(obiect); // Object { aDoua: 2 }
```

Dacă o proprietate este ștearsă, atunci și cheia sa va fi ștearsă. Dacă o bibliotecă de cod ar introduce o proprietate nouă în prototipul obiectului general `Object`, atunci la parcurgerea obiectului, vom avea o proprietate suplimentară care apare.

```javascript
"use strict";
const obiect = { unu: "primul", doi: "al doilea" },  cheie;
for ( cheie in obiect ) { console.log( cheie, obiect[cheie] ); };
Object.prototype.trei = "al treilea";
for ( cheie in obiect ) { console.log( cheie, obiect[cheie] ); };
```

## Moștenirea prototipală

Standardul oferă definiția prototipului: *obiect al cărui proprietăți sunt puse la dispoziția altor obiecte*.

Nota atașată definiției este și ea foarte valoroasă pentru lămuririle pe care le aduce:

> Atunci când un constructor creează un obiect, acel obiect va referenția automat proprietatea prototype a constructorului cu scopul de a rezolva referințele proprietăților. Proprietatea prototype a constructorului poate fi referențiată de expresia constructor.prototype. Proprietățile adăugate prototipului unui obiect sunt puse la dispoziția tuturor obiectelor care accesează prototipul prin moștenire. Alternativa este crearea unui nou obiect având un prototip specificat explicit prin utilizarea funcției interne Objct.create.

### Despre moștenire

Pentru a înțelege cu adevărat natura și specificitățile limbajului de programare JavaScript, trebuie să fie înțeles modul în care proprietățile unui obiect sunt „moștenite” de un altul. Nu uita nicio secundă faptul că JavaScript este un limbaj de programare care este o continuă comunicare între diferite obiecte, fie că acestea sunt cele interne, fie că sunt cele create de noi. Simplificând în tușe foarte groase, creatorii limbajului au dorit o modelare a structurilor de prelucrare a datelor după modul în care lumea reală funcționează: copii au părinți, iar aceștia moștenesc caracteristicile părinților pe lângă cele care definesc propria persoană.

**Moment Zen**: JavaScript este un limbaj bazat pe moștenire prototipală - prototypal inheritance

În alte limbaje de programare așa cum este Java, de exemplu, pentru a genera un obiect ai nevoie de un fragment de cod care are rolul de plan de construcție pentru viitoarele obiecte. Pur și simplu este o secvență de cod care descrie care sunt valorile și tipul lor pentru proprietățile viitorului obiect.

Astfel, între obiecte se creează această legătură numită „legătură prototipală”. Aceste legături realizează „moștenirea prototipală” - `prototypal inheritance`. Obiectul preexistent constituie prototipul pentru cel nou creat care poate adăuga noi membri, noi comportamente. De fapt, vorbim despre o *delegare* pe lanțul prototipal format. Acest lucru înseamnă că atunci când ceri o proprietate care nu există, delegi solicitarea către prototip să o analizeze și să servească o valoare sau să delege mai sus cererea dacă mai există un obiect prototip părinte.

Unul din motivele pentru care ai folosi acest lanț prototipal este acela de a realiza șabloane care structurează funcționalități prin ascunderea sau relevarea anumitor detalii. Acest lucru este posibil prin introducerea de funcții în prototip. Avantajul major al acestui lucru este că funcția este creată o singură dată în obiectul prototip.

Un avantaj extraordinar pe care-l oferă moștenirea prototipală este că odată cu modificarea obiectului prototip, toate funcționalitățile noi vor fi disponibile tuturor celor care le moștenesc.

Pentru a reutiliza cod, se creează obiecte care se bazează pe cele existente prin exploatarea unui lanț prototipal care se formează între obiecte și care poate fi interogat prin proprietatea oricărui obiect `__proto__`. Proprietatea `__proto__` nu este același lucru cu `prototype`. În cazul lui `__proto__` acesta indică obiectul prototype al constructorului folosit pentru crearea obiectului instanțiat.

```javascript
const obi = {ceva: 'salve'};// crearea unui obiect
function Salut () {};       // declararea unei funcții
Salut.prototype = obi;      // setarea lui obi drept prototip
const inst = new Salut();   // instanțierea unui obiect
typeof inst.__proto__;      // "object"
typeof inst.prototype;      // "undefined"
typeof inst.constructor.prototype;  // "object"
```

Poți inlocui oricând obiectul cu rol de prototip după instanțierea obiectelor, iar legătura lui `__proto__` va fi la obiectul tocmai înlocuit pentru toate obiectele instanțiate după înlocuire. Obiectele instanțiate mai vechi, de dinaintea înlocuirii obiectului prototip, vor avea `__proto__` care trimite la cel vechi. Constructorul, de fapt proprietatea constructor a noilor obiecte instanțiate după înlocuire, nu va mai returna identificatorul funcției constructor de la care s-a pornit, ci pe `Object()`. Pentru a repara acest lucru, va trebui, manual să fie setată proprietatea constructor: `NumeFuncțieConstructorOriginală.prototype.constructor = NumeFuncțieConstructorOriginală.prototype.constructor;`

Două obiecte care conțin fix aceiași membri, nu sunt identice; au identități diferite și acest lucru le face unice.

```javascript
const a = { 0: 'ceva' },
      b = { 0: 'ceva' };
a === b; // false
```

Obiectele sunt structuri care pot fi modificate chiar dacă identitatea rămâne neschimbată și spunem că din acest motiv pot suferi **mutații**. Același comportament îl au și array-urile. Și mai este un lucru pe care obiectele îl împărtășesc cu array-urile. Membrii unui obiect pot fi accesați prin folosirea parantezelor drepte.

```javascript
const obi = { a: 10 };
obi['a']; // 10
```

Folosirea moștenirii prototipale introduce o ierarhie, o taxonomie prealabilă în aplicație, care este posibil să intre în conflict cu realitățile ulterioare. Acest mod de a scrie cod nu este încurajat în contextul actual care se orientează mai degrabă către programarea funcțională. În contextul programării funcționale, este încurajată compoziția obiectelor opusă mecanismului de moștenire.

De fapt, se poate vorbi de o „delegare comportamentală” și nu de o moștenire în sensul clasic. Obiectele stabilesc legături prototipale prin care se pot face delegări pe lanțul prototipal atunci când se caută ceva.

Spune standardul:

> Toate **obiectele ordinare** au „un slot intern” numit `[[Prototype]]`.

Valoarea acestui slot poate fi `null` sau un obiect care va oferi tuturor descendenților funcționalități și valori. `Object.getPrototypeOf()` returnează valoarea din proprietatea internă `[[Prototype]]` iar `Object.setPrototypeOf()` o schimbă.

Toate obiectele comune au „un slot intern” numit `[[Extensible]]`, care controlează dacă pot fi adăugate sau nu proprietăți la obiect. Dacă valoarea acestui slot este `false`, atunci nu se mai pot adăuga proprietăți noi.

Legătura cu `[[Prototype]]` este aceea că în cazul unui `[[Extensible]]` cu valoare `false`, valoarea slotului intern `[[Prototype]]` a obiectului, nu poate fi modificată. În plus, de vreme ce a fost pusă pe `false`, nu o mai poți modifica la `true`.

### Mantre

-   `[[Prototype]]`, adică proprietatea `.prototype` este o legătură care se stabilește de la un obiect la altul.
-   Legătura prototipală se poate obține și prin `Object.create()`.
-   Legătura prototipală se obține și prin invocarea cu `new`.
-   Legătura prototipală creează un lanț de delegare pentru cazurile în care nu găsești o proprietate sau o metodă într-un anumit context de execuție.
-   Relațiile prototipale pot cauza probleme atunci când este nevoie de enumerarea proprietăților obiectelor. Ambalează într-o funcție de verificare cu `Object.hasOwnPropery()`;


### Verificarea prototipului

Există două situații în care ai nevoie să afli informații despre un obiect: atunci când ai nevoia de confirmare că un anume obiect este prototipul altuia în diferite scenarii și al doilea caz când vrei să știi numele obiectului care este prototipul celui investigat.

#### Confirmarea prototipului pentru cel investigat

```javascript
ObiectInvestigat.prototype.isPrototypeOf(obiectulBanuitAFiPrototipul);
```

#### Cine este obiectul prototipal pentru cel investigat?

```javascript
// În cazul în care s-a folosit un constructor
ObiectDeLucru.__proto__ // sau cel mai repede
Object.getPrototypeOf(ObiectDeLucru);
```

### Modele de realizare a moștenirii prototipale

#### A. Prototip gol, care nu moștenește

Crearea unui obiect al cărui prototip este gol. Gol înseamnă că nu va moșteni nicio proprietate de la obiectul prototip pe care `Object.prototype` îl oferă.

```javascript
const obiect = Object.create({}, {ceva: {value: 1}});
Object.getPrototypeOf(obiect);
// Object {  } prototipul este gol

// Obiectele care vor fi create în baza lui obiect,
// vor avea un prototip gol
const obiect2 = Object.create(
  Object.getPrototypeOf(obiect),
  Object.getOwnPropertyDescriptors(obiect)
);
Object.getPrototypeOf(obiect2);
// Object {  } prototipul este gol
```

#### B. Crearea unui obiect literal

Prin crearea directă a unui obiect literal, se generează o legătură automată către prototipul impus de `Object.prototype`

```javascript
const matrita = {ceva: 1};
Object.getPrototypeOf(matrita); // Object { , 15 more… }
Object.getPrototypeOf(matrita) === Object.prototype; // true
```

#### C. Clonarea obiectelor și moștenirea prototipului de către clonă

```javascript
const obiect = {
  ceva: 10,
  faCeva: function () {
    console.log('Salut!');
  }
};
Object.getPrototypeOf(obiect2); // Object { , 15 more… } de fapt Object.prototype

const obiect2 = Object.create(
  Object.getPrototypeOf(obiect),
  Object.getOwnPropertyDescriptors(obiect)
);

Object.getPrototypeOf(obiect2); // Object { , 15 more… }
Object.getPrototypeOf(obiect2) === Object.prototype; // true
```

### Apelarea unei metode din `prototype`, clasic și cu `super`

Uneori ai nevoie să accesezi direct metode sau valori din obiectul prototip de la care moștenești. Soluția „clasică” până la varianta curentă a standardului este să „obții” obiectul prototip de la care moștenește al tău aplicând `Object.getPrototypeOf(this)` chiar pe `this`, iar apoi obținând această referință, vei aplica metoda, dar cu apelare prin `call()` pe obiectul context în care evoluezi în acest moment.

```javascript
Object.getPrototypeOf(this).numeMetodaDinPrototip.call(this); // varianta ES5
super.numeMetodaDinPrototip() // varianta ES6
```

După cum observi, această metodă vechi a fost prescurtată la `super`, ceea ce reduce din verbozitate. Pentru cei cu ochiul ager, nu-i așa că aduce nițel a Java? `super` este o referință către obiectul prototip al obiectului de lucru curent. Este echivalentul lui `Object.getPrototypeOf(this)`. Nu uita faptul că `Object.getPrototypeOf()` returnează valoarea din proprietatea internă `[[Prototype]]`. Orice referință la `super` folosește proprietatea internă `[[HomeObject]]` pentru a determina pașii următori cum ar fi `Object.getPrototypeOf()` asupra valorii stocate de `[[HomeObject]]` cu scopul de a obține, de fapt prototipul.

```javascript
const obi1 = {
  faceva () {
    return 'ce-i returnat din obi1 ';
  }
};
const obi2 = {
  faAltceva () {
    return super.faceva() + ' este oferită aici';
  }
};
// setezi prototipul lui obi2 la cel a lui obi1.
Object.setPrototypeOf(obi2, obi1);
obi2.faAltceva(); // "ce-i returnat din obi1  este oferită aici"
```

## Clase în JavaScript

JavaScript este un limbaj de programare bazat pe obiecte pe care nu le instanțiază în baza unei clase. Prin modul lor de lucru, funcțiile au oferit calea către implementarea claselor. Ce a rezolvat implementarea claselor odată cu versiunea ES6? Primul și cel mai important lucru este posibilitatea ca o *funcție obiect* să moștenească de la altă *funcție obiect*. Acest salt a permis ca o funcție constructor să poată moșteni din altă funcție constructor.

```javascript
// Limitările ES5
function X () {};
X.metoda = function () { console.log('Salut!') };

function Y () {};
Y.prototype = Object.create(X.prototype);

Y.metoda; // undefined
Y.metoda(); // Y.metoda is not a function
```

Acest lucru se întâmplă pentru că `Object.create()` crează doar obiecte simple, nu poate crea *funcții obiecte*. Clasele rezolvă această moștenire.

```javascript
class X {
  static  metoda () {
    console.log('Salut!');
  }
}
class Y extends X {}
Y.metoda(); // Salut!
```

O altă problemă pe care o rezolvă clasele este posibilitatea de a extinde constructorii interni limbajului (*built-in*). Unii dintre aceștia sunt obiecte *exotice* și acum numai prin mecanismului claselor pot fi extinse.

Totuși clasele au câteva detalii care le departajează de funcții. Nu pot fi apelate simplu fără operatorul `new`. Metodele, adică funcțiile declarate intern nu creează propriile obiecte `prototype`. Prototipul unei clase nu poate fi reasignat.

### Drumul către clase - studiu

Modelarea unei clase rudimentare se poate realiza prin introducerea de funcționalități și date în obiectul `this` al unei funcții. Adu-ți aminte că la executarea unei funcții constructor folosind operatorul `new`, primul lucru pe care-l face motorul este să creeze un obiect în contextul căruia să execute corpul funcției.

```javascript
function VehiculSpatial (identificator) {
  this.id = identificator;
  this.functie = '';
  this.an = '';
  this.prezentare = function afisez () {
    return this.id + " " + this.an;
  };
};
const Santinel = new VehiculSpatial('Santinel');
Santinel.functie = 'satelit';
Santinel.an = 2015;
console.log(Santinel.prezentare());
// ca deficiență, funcția care joaca rol de metodă, este recreată
// ori de câte ori este creat un nou obiect prin new
```

Partea deficitară a unei astfel de soluții este că funcțiile care joacă rol de metode în obiectul `this` (obiectul context în care va rula funcția când va fi apelată cu `new`), vor fi recreate ori de câte ori este creat un nou obiect. Acest fapt implică probleme de performanță a codului ocupând memoria cu aceeași funcție recreată ori de câte ori este instanțiat un nou obiect.

Modelarea unei clase rudimentare se poate realiza și prin introducerea de funcționalități și date în obiectul prototip al funcției. Astfel, prin mecanismul de moștenire prototipală, toate obiectele instanțiate cu `new`, vor beneficia de acces direct la toți membrii obiectului prototip.

```javascript
function VehiculSpatial(identificator){
  this.id = identificator;
  this.functie = '';
  this.an = '';
};
VehiculSpatial.prototype.prezentare = function () {
  return this.id + " " + this.an;
};
const Santinel = new VehiculSpatial('Santinel');
Santinel.functie = 'satelit';
Santinel.an = 2015;
console.log(Santinel.prezentare());
```

Este rapid observabil faptul că simularea clasei s-a realizat prin introducerea de proprietăți și în `this`, dar și în `prototype`.

Prin introducerea noii sintaxe se intenționează *crearea claselor pe baza moștenirii prototipale*. Sintaxa prezintă câteva particularități. Proprietățile viitorului obiect se introduc în metoda constructor. Metodele se introduc fără să fie precedate de cuvântul cheie `function` și nici nu vor fi despărțite prin virgulă. Accesarea proprietăților și metodelor se va face prin intermediul obiectului `this`.

```javascript
class Test {
  constructor (val) {
    this.val = val; // proprietăți interne
  }
  // proprietăți în prototype:
  ecou () {
    console.log(this.val);
  }
};
const unTest = new Test('Salut!');
// câteva verificări
console.log(unTest instanceof Test);    // true
console.log(unTest instanceof Object);  // true
console.log(typeof Test); // function
console.log(typeof Test.prototype.ecou); // function
```

Echivalent lui `constructor (val) {}`, este `function Test (val) { this.val = val }`. Urmează o listă a membrilor viitorului obiect care menționează direct identificatorul fără cuvântul cheie `function`. Nu a fost folosită nici formula consacrată `Test.prototype.actiune`, rolul acesteia fiind preluat de funcția `constructor`. O clasă poate avea o singură metodă `constructor` care este opțională. Instanțierea se face folosind operatorul `new`. Atenție, obiectul `prototype` al clasei va fi protejat la scriere (**read-only**). Nu se comportă ca în cazul funcțiilor din modelul clasic în care poți adăuga ulterior în obiectul `prototype` proprietăți și metode.

Obiectul `this` are un rol central pentru clase pentru că numai folosindu-l vei putea accesa metodele și proprietățile clasei. Tot `this` permite înlănțuirea (*chaining* în limba engleză) metodelor unei clase pe obiectul instanțiat. Singurul lucru de care trebuie să te asiguri este că pentru clasele pe care dorești să le înlănțuiești, `this` trebuie să fie returnat din metodă la final. Acest lucru trebuie făcut pentru a actualiza valorile obiectului generat cu `new`.

```javascript
class Ceva {
  meto1 (val1) {
    this.val1 = val1;
    return this;
  }
  meto2 (val2) {
    this.val2 = val2 + this.val1;
    return this;
  }
}
const obi = new Ceva();
obi.meto1(10).meto2(2);
// poți face chaining
for(let prop in obi) {
  console.log(prop);
}; // undefined
```

Spre deosebire de constructorii declarați cu `function`, clasele nu pot fi instanțiate fără operatorul `new`. Reține faptul că o clasă tot o funcție este de fapt. În JavaScript nu există entități clase. Toate metodele din obiectul `prototype` sunt setate cu `false` la `enumerable`. Acest lucru înseamnă că obiectul nu va afișa metodele clasei într-un `for..in`.

Chiar dacă nu ai declarat o funcție `constructor`, aceasta va fi generată din oficiu. Poți verifica acest lucru interogând obiectul prototip al clasei. Posibilitatea de a adăuga proprietăți direct în obiectul prototip încă este posibilă, dar nu este recomandabilă.

### Declarații și expresii de clase

Precum în cazul funcțiilor, clasele pot fi declarate, dar pot fi și expresii. Există un detaliu important care separă declarația claselor de cea a funcțiilor cu rol de constructor: clasele nu beneficiază de hoisting.

#### Declarație de clasă

Clasele pot fi declarate direct apelelând la sintaxa `class NumeClasă {...}`. Ceea ce se petrece la declararea unei clase este că se constituie variabila cu numele clasei. Variabila este inițializată cu o funcție. În obiectul `prototype` al funcției vor fi regăsite funcția constructor a cărui nume este numele clasei precum și toate metodele.

```javascript
class Ceva {
  constructor(extern){
    this.ceva = extern;
  }
  ecou () {
    console.log(this.ceva);
  }

  ["ceva" + "bun"] () {
    console.log(Object.getOwnPropertyNames(this));
  }
};
Ceva === Ceva.prototype.constructor; // true
Object.getOwnPropertyNames(Ceva.prototype); // [ "constructor", "ecou", "cevabun" ]
```

Este util să menționăm faptul că în clase sunt acceptate „numele computate” pentru identificatorii proprietăților. În acest caz, trebuie folosită sintaxa cu paranteze pătrate.

#### Expresie de clasă

Sunt permise expresiile de clase. Similar funcțiilor, clasele pot să aibă nume sau nu. Dacă poartă nume, acesta este disponibil în blocul de cod al clasei. Testul cu `typeof` va fi întotdeauna `function`.

```javascript
const Plan = class OClasă {
  constructor (extern) {
    this.ceva = extern;
  };
  ecou () {
    console.log(this.ceva);
    console.log(OClasă);
  };
};
const obi = new Plan('Salut!');
obi.ecou(); // Salut! function OClasă()
```

În cazul expresiilor, poți avea un nume atașat clasei, dar apelarea acelui nume va fi posibilă doar din interiorul clasei.

#### Clasele sunt valori de prim-rang

Clasele pot fi pasate drept valori funcțiilor. Funcțiile pot returna clase ca adevărate factory-uri.

```javascript
function creatorDeCeva (ClasaMea) {
  return new ClasaMea();
};
let obi = creatorDeCeva (
  class {
    ecou () {
      console.log('bing-bang!');
    }
  };
);
```

O aplicație practică a claselor este crearea din zbor a Singleton-urilor (acestea sunt obiecte unice în economia unei aplicații - un singur obiect de acest fel poate exista la un moment dat). Acest lucru se poate realiza prin aplicarea directă a lui `new` pe expresia de clasă.

```javascript
const Avion = new class {
  constructor (indicativ) {
    this.id = indicativ;
  };
  transmite () {
    console.log(this.id);
  };
}('IAR 99');
Avion.id();
```

### Metodele statice

Metodele statice există doar în corpul clasei și nu pot fi apelabile din obiectele create. O metodă statică este echivalentul adăugării unei metode unei funcții.

```javascript
function Ceva () {};
Ceva.oMetodaStatica = function () {};
```

Metodele statice sunt folosite adesea pentru a crea funcții cu rol de utilitar și sunt folosite exclusiv pentru a prelucra date în clasă, nu în obiectele create. Poți apela o metodă statică din altă metodă statică folosind `this`.

```javascript
class Test {
  constructor (val) {
    this.val = val;
  }
  static ceva () {
    return 'ceva';
  }
  static altceva () {
    return this.ceva() + ' din alt apel static';
  }
};
Test.ceva(); // "ceva"
Test.altceva(); // "ceva din alt apel static"
```

Metodele statice nu pot fi accesate folosind `this` din metodele non-statice. După cum se observă în exemplu, pot fi accesate cu sintaxa `nume_clasă.nume_metodă_statică()`. În metodele statice poți defini alte proprietăți funcției clasă. Acestea sunt apelate cu numele funcției și nu cu `this`.

```javascript
class Ceva () {
  static metoda () {
    Ceva._cevaPrivat = new Date.now();
  }
  constuctor (data) {
    this.expun = Ceva._cevaPrivat;
    this.dataCalendaristica = data;
  }
}
```

Uneori aceste metode statice sunt folosite pentru a crea obiecte pe care le returnează, dar care folosesc date diferite de cele din constructor.

```javascript
const obi = {titlu: "Margareta", autor: "Ion Fotiade"}
class Fișă {
  constructor (titlu, autor) {
    this.titlu = titlu,
    this.autor = autor
  }
  static Altceva (titlu, autor) {
    return new Fișă(titlu, autor);
  }
}
const fișăNouă = new Fișă('100 de ani', 'Ioan Fotiade');
const fișăExt = Fișă.Altceva(obi.titlu, obi.autor);
console.log(fișăExt);
```

Reține faptul că metodele statice nu sunt moștenite de obiectele create.

### Accesori și incapsulare

În JavaScript singura posibilitate de a atinge incapsularea prin care înțelegem protejarea datelor prin variabile private este să realizăm closure-ri. Clasele permit realizarea unei incapsulări dacă datele protejate le introducem în constructor și apoi le accesăm prin accesori.

```javascript
class Ceva {
  constructor (privata) {
    let _privata = privata;
    this.getPrivata = function () {
      return _privata;
    }
  }
}
```

Cu ajutorul accesorilor se poate comunica direct cu proprietățile obiectului instanțiat în baza clasei.

```javascript
class AccesibilDeAfara {
  constructor (valoare) {
    this.val = valoare;
  };
  get elem () {
    return this.val;
  };
  set elem (externa) {
    this.val = externa;
  };
};
const obi = new AccesibilDeAfara('miau');
obi.elem; // val: miau
obi['elem'] = 12; // val: 12
```

### Extinderea claselor

Clasele pot fi extinse. Este indicată extinderea unei clase folosindu-se cuvântul cheie `extends`. În tratarea acestui subiect, legitim este să răspundem la întrebarea de ce? De ce avem nevoie să derivăm obiectele? Răspunsul vine din necesitatea de a putea avea acces la proprietățile și metodele unui obiect existent deja, pe care să nu le mai scriem din nou într-o nouă clasă, dar care să permită îmbogățirea sau modificarea acestora.

```javascript
class Ceva {
  constructor (primo, secundo) {
    this.ceva = 'o proprietate';
    this.altceva = 'alte proprietăți';
    this.primo = primo;
    this.secundo = secundo;
  }
};

class Altceva extends Ceva {
  constructor (terzo) {
    super(primo, secundo);
    this.ceva = 'Halal';
  }
};
```

Derivarea obiectelor înainte de clasele introduse de noul standard ES6 era un proces laborios de creare a unui obiect și apoi crearea unui altuia căruia îi era setat prototipul îmbogățit al primului. Clasele care moștenesc de la altele, se numesc *clase derivate*. Acest lucru înseamnă că toate proprietățile și metodele clasei derivate vor fi moștenite din clasa părinte.

#### Modelul istoric

Mai jos este modelul istoric comparat cu ceea ce propune `extends`. Să pornim de la modelul istoric.

```javascript
function Parinte (val) {
  this.statica = val;
};
Părinte.prototype.oriDoi = function () {
  return this.statica * 2;
};
function Copil (deinmultit) {
  Părinte.call(this, deinmultit);
};
Copil.prototype = Object.create( Parinte.prototype, {
    constructor: {
      value: Copil,
      enumerable: true,
      writable: true,
      configurable: true
    }
  }
);
let rezultat = new Copil(2);
console.log(rezultat.oriDoi()); // 4
```

Este observabil cu cât efort s-a realizat acest lucru.
Mai întâi am executat funcția `Parinte` în contextul lui Copil pasându-i `this` pentru a seta corect contextul de execuție, adică în interiorul lui `Copil`. Au fost pasate atributele așteptate de `Parinte`. A trebuit să *rescriem* obiectul prototip al lui `Copil` setându-l artificial la cel pe care dorim să-l moștenim folosind `Object.create()` în acest sens. A trebuit să facem un pas suplimentar setând proprietatea `constructor` să trimită înapoi la `Copil` pentru a consolida originea sa.

#### extends și super()

În cazul claselor, mare parte din operațiunile complexe ale derivării sunt rezolvate prin introducerea sintagmei `extends` în declarația clasei care dorești să fie derivata alteia. Ceea ce realizează este și abstractizarea funcționalităților unei clase care va fi privită de cele derivate din ea ca un model de urmat în ceea ce privește comportamentele de bază. Similar copiilor care privesc și copiază comportamentele părinților, clasele care extind altele, vor avea acces la metodele și proprietățile părintelui prin mecanismul de moștenire care se va stabili automat. Putem afirma despre o clasă de la care se derivează că se comportă ca o interfață. O interfață fiind setul de date și funcționalități disponibil tuturor copiilor, dar care poate fi modificat de aceștia.

Am stabilit faptul că prototipul este setat automat la obiectul prototip al constructorului părinte. Constructorul părintelui poate fi accesat folosind metoda `super()`. În clasele derivate, `super()` trebuie apelat înainte de a folosi `this` în funcția constructor a copilului. Acest lucru trebuie făcut pentru a seta o linie directă de moștenire cu proprietățile constructorului clasei părinte. Regula ar fi ca datele necesare să alimentezi părintele pentru operațiunile interne ale părintelui, să le trimiți prin super(arg1, arg2, etc). Ce este nevoie copilului, setezi prin `this`. Nu uita, că prin moștenire vei avea mereu acces la datele și metodele părintelui.

```javascript
class Parinte {
  constructor (val) {
    this.ceva = val;
  }
  oriDoi () {
    return this.ceva * 2;
  }
};

class Copil extends Parinte {
  constructor (val) {
    super(val);
    this.altceva = 10;
  }
};
const inmultire = new Copil(2);
inmultire.oriDoi(); // 4
console.log(inmultire instanceof Copil); // true
console.log(inmultire instanceof Părinte); // true
```

Dacă nu declari constructorul, adică formulezi o clasă derivată fără a menționa constructorul, acesta oricum este constituit în spate de motor, iar `super()` este apelat automat.

Atunci când este nevoie, ai posibilitatea de a extinde și constructori care nu sunt clase.

```javascript
function Parinte () {};
Parinte.prototype.unu = 10;

class Copil extends Parinte {
  aduValoare () {
    console.log(this.unu);
  }
}
const obi = new Copil();
obi.aduValoare(); // 10
```

#### Suprascrierea metodelor

Menționam mai devreme faptul că unul din motivele pentru care avem clase este simplificarea extinderii unei clase, dar a cărui funcționalități sunt modificate pentru a servi scopurilor pentru care se face extinderea.

```javascript
class Parinte {
  constructor (valoare) {
    this.valoare = valoare;
  }
  afișare () {
    console.log(this.valoare);
  }
}
class Copil extends Parinte {
  constructor (ceva, altceva) {
    super(ceva); // se invocă constructorul părintelui
    this.altceva = altceva;
  }
  afișare () {
    super.afișare();
  }
}
```

### Moștenirea din obiectele interne prin clase derivate

Clasele permit moștenirea din obiectele predefinite intern din JavaScript, ceea ce se poate dovedi foarte util atunci când vei dori niște funcționalități mai speciale pornind de la un obiect intern al limbajului. Acest lucru se realizează prin extinderea lor.

```javascript
class ArrayulMeu extends Array {
  // deocamdată nimic
};
var unArraySpecial = new ArrayulMeu('ceva', 'altceva');
console.log(unArraySpecial); //[ "ceva", "altceva" ]
console.log(ArrayulMeu instanceof Array); // false
```

Toate metodele din obiectul prototip al lui Array sunt disponibile noului obiect creat în baza clasei care a derivat obiectul built-in. Responsabil pentru accesul la metodele din prototipul lui `Array` este un simbol `Symbol.species`, un simbol *bine-cunoscut* (*well-known* în limba engleză). Pentru a înțelege, trage un ochi la `Symbol`.

`Symbol.species` definește o proprietate accesor, care returnează o funcție. Funcția este un constructor gata de a fi utilizat în locul constructorului.

## Obiecte în practică

### Tratarea obiectelor care seamănă cu array-uri

Cel mai la îndemână exemplu sunt nodurile DOM. Parcurgerea (traversing) DOM-ului se numește „walking the DOM”.
DOM-ul este o colecție de noduri. Cel mai ades pentru accesarea informației din nodurile de interes, mai întâi acestea trebuie identificate. Se folosesc clasicele:

-   document.getElementById("#idfolosit"),
-   document.getElementsByTagName,
-   document.querySelector(pot fi tag-uri, class, id-uri, attributes, pseudoclase, elemente).

```javascript
"use strict";
var noduriDOM = document.querySelectorAll("div"),   // se constituie o colecție array-like
    arrayLike = Array.prototype.slice.call(noduriDOM); // transformarea într-un array-like
arrayLike.forEach(function(element){
  console.log(element);
});
```

Cu o simplificare:

```javascript
var noduriDOM = document.querySelectorAll("div"),
    arrayLike = [].slice.call(noduriDOM);
arrayLike.forEach(function (element) {
  console.log(element);
});
```

Atenție, pentru că selectarea elementelor de interes cu ajutorul lui `querySelector` poate fi confuză uneori, cel mai bine este să fie folosit atributul de selecție `data-ceva="formular"` care a fost introdus de HTML5.

```html
<ul data-target="lista">
  <li data-target="element">unu</li>
  <li data-target="element">doi</li>
  <li data-target="element">trei</li>
</ul>
```

Selecția devine mult mai clară nefiind afectată de posibilele schimbări aduse nodurilor DOM pentru că acestea sunt dinamice.

```javascript
var lista = document.querySelector('[data-target=\"lista\"]');
var colectia = document.querySelectorAll('[data-target=\"element\"]');

var caAr = [].slice.call(colectia);
console.log(caAr);            // Array[li, li, li]
caAr.forEach(function (elem) {
  console.log(elem);          // <li data-target="element">
});
```

Elementele găsite sunt de fapt o colecție de noduri, care este dinamică în sensul că, de fiecare dată când DOM-ul va suferi o modificare, se va actualiza și aceasta. În ES6 există o aceeași abordare: `arrayLike = Array.from(nodes)`. ES6 introduce un nou tip de obiecte iterabile - obiecte ale căror elemente pot fi extrase rând pe rând.

### Folosirea unui obiect ca un dicționar de valori (`map`)

JavaScript nu are structuri de date specifice unei „hărți” de valori - ceea ce se înțelege în alte limbaje de programare a fi un `map`. Singura modalitate este aceea de a folosi un obiect. În acest caz sunt anumite probleme care trebuie luate în considerare precum durerile de cap pe care le dă moștenirea. Lanțul prototipal care se stabilește, poate afecta citirea proprietăților. Unele operațiuni, se uită la tot lanțul prototipal și *văd* proprietăți moștenite. Alte operațiuni accesează doar proprietățile pe care obiectul le are fără a se uita la cele moștenite. Atunci când folosești un obiect drept colecție (`map`), trebuie operat asupra lui cu mare atenție.

```javascript
const matrița = {proprietate: 'ceva'};
const obiect = Object.create(matrița);
obiect.altaProprietate = 'altceva';
```

### Destructurarea obiectelor sau destructuring assignment

ES6 introduce posibilitatea de a transfera valorile cheilor unor variabile care trebuie să respecte o singură cerință: **numele identificatorilor să fie aceleași cu cele ale proprietăților**. Dacă vrem să privim obiectele ca pe niște depozite de valori identificate prin numele cheilor, atunci cu siguranță că asignarea prin destructurare va fi o binecuvântare.

```javascript
const obi = {
  a: 4,
  b: true,
  c: function y () {
    return 'salut';
  }
};
const {b, c} = obi;
console.log(a); // undefined
console.log(b); // true
console.log(c()); // salut
```

Ceea ce se întâmplă este că se vor genera în mediul lexical identificatori cărora li se vor atribui valorile din obiect. Poți percepe această operațiune ca pe un transfer din mediul lexical al unui obiect, în mediul lexical dorit.

Trebuie ca numele identificatorilor să fie identic cu cel al proprietăților obiectului din care se face **transferul** valorilor, dar se poate face și cu modificarea numelor variabilelor, dacă acest lucru este necesar.

```javascript
const obi = {unu: 1, doi: 2};
const {unu: prima, doi: aDoua} = obi;
console.log(prima, aDoua); 1 2
```

La fel de bine ar merge și asignarea directă cu singura condiție ca expresia să fie în interiorul unui operator de grupare.

```javascript
( {a,b,c} = obi );
```

Dacă nu este introdus între paranteze rotunde, motorul JavaScript va considera acoladele ca un bloc de cod distinct.

#### Suprascrierea valorilor - destructuring assignment

La *transferul* valorilor este foarte posibil să aplici o modificare a valorilor preluate din obiect. Acest lucru este posibil prin ceea ce se numește *destructuring assignment*.

```javascript
const {unu = 10, doi = 100} = {unu: 1000};
console.log(unu); // 1000
```

Se pot suprascrie valorile unor variable cu valorile proprietăților unui obiect prin mecanismul de destructurare (*destructuring assignment*).

```javascript
const obi = {
  unu: 1,
  doi: 2
};
let unu = 10,
    doi = 20;
// si acum destructurezi folosind operatorul ()
({unu, doi} = obi); console.log(unu, doi); // 1 2
// () este nevoie pentru a indica ca {} nu marchează un bloc de cod, ci o expresie
```

#### Destructurarea array-urilor

Destructurarea funcționează foarte bine și în cazul array-urilor, care la rândul lor sunt obiecte. În acest caz nu mai este necesară respectarea parității numelor ientificatorilor cu cea a cheilor pentru că nu mai avem chei. Potrivirea se va face în ordinea elementelor din array.

```javascript
const arr = [1, true, function y () {return 'salut'}, 10, 20];
const [nr, bool, igrec, ...valori] = arr;
console.log(nr); // 1
console.log(bool); // true
console.log(igrec()); // salut
console.log(valori); //[Array] [10,20]
```

Un alt caz interesant de destructurare este atunci când asignezi unei structuri de identificare un întreg obiect. În acest caz, pentru a constitui identificatorul, trebuie introdusă în expresia de destructurare adresa întreagă către acel obiect.

```javascript
const obi = {
  a: 10,
  b: {
    x: [1, 2],
    y: {
      i: 'Salut, ',
      j: 'România!'
    }
  }
};
const {b: {y}} = obi;
console.log(y.i + y.j);
// Salut, România!
```

#### Mimarea parametrilor cu nume

Să presupunem că ai nevoie să populezi parametrii unei funcții cu valorile unui obiect prin preluarea dinamică a acestora. Poți face acest lucru cu singura condiție ca numele parametrilor să corespundă proprietăților de unde se vor prelua valorile.

```javascript
let afisezCeva = ({x, y}) => {
  return `${x} și ${y}`;
};
afisezCeva({x: 10, y: 20}); // "10 și 20"
```

## Verificări

### Testare cu operatorul in

Pentru a testa dacă o proprietate există se poate folosi operatorul `in`. Problema cu `in` este aceea că ia în calcul și ceea ce este în prototip, în cazul nostru în `matrița`.

```javascript
'altaProprietate' in obiect; // true
// din nefericire in se uită și în prototip
'toString' in obiect; // true -> e foarte rău
// pentru că se uită și în Object.prototype.
'proprietate' in obiect; // true
```

### Testare cu Object.hasOwnProperty()

Pentru a verifica dacă o proprietate aparține obiectului se va folosi `Object.hasOwnProperty()`:

```javascript
obiect.hasOwnProperty('altaProprietate'); // true
obiect.hasOwnProperty('proprietate'); // false
obiect.hasOwnProperty('toString'); // false
```

### Radiografierea obiectelor cu Object.getOwnPropertyNames()

Această metodă poate fi utilizată pentru a extrage informațiile care descriu un obiect. Mă refer la faptul că uneori avem nevoie să aflăm tot ce se poate afla despre un obiect pentru a ne face o idee generală despre ce oferă. Să vedem cum am putea obține toate informațiile despre un obiect.

```javascript
console.log(Object.getOwnPropertyNames(window));
```

La momentul redactării acestui material, o astfel de interogare a returnat un array cu 904 chei reprezentând toate proprietățile și metodele obiectului `window` al browserului. Putem merge mai departe pentru a separa care sunt metodele. Această procedură nu poate fi aplicată pe obiectul global `window`, dar funcționează pe oricare obiect, fie el global sau nu.

```javascript
console.log( Object.getOwnPropertyNames(String).filter( function (p) {
  return typeof String[p] === 'function';
}));
```

Pentru obiecte care nu sunt foarte stufoase, se poate folosi cu succes și `console.dir(nume_obiect)`.

### Testare cu `for..in`

Dacă folosești un `for..in` vei obține toate cheile, adică și pe cele din prototip. Deci, nu funcționează corect. De ce se întâmplă acest lucru? Pentru că sunt luate în considerare și proprietățile moștenite prin prototip, care sunt setate ca `enumerable`. Motivul pentru care proprietățile lui `Object` nu apar este că acestea nu sunt `enumerable`.

```javascript
for (key in obiect) console.log(key);
// altaProprietate
// proprietate
```

### Accesează și citește cheile obiectului

Pentru a avea acces la cheile unui obiect și numai la cheile pe care respectivul obiect le deține, se va folosi `Object.keys(obiect)`.

```javascript
Object.keys(obiect); // Array [ "altaProprietate" ]
```

#### Obținerea unui array cu numele tuturor proprietăților

Dacă vrei să obții numele tuturor proprietăților, se va folosi `Object.getOwnPropertyNames(obiect)`;

```javascript
obiect.artefact = ['vază', 'statuetă'];
Object.keys(obiect); // Array [ "altaProprietate", "artefact" ]
```

#### Obținerea valorii asociate unei proprietăți

Se poate opta pentru una din două modalități posibile de a face acest lucru:

-   folosind **operatorul cu punct**
-   folosind **operatorul cu paranteză pătrată**

Operatorul cu punct nu poate fi folosit pentru că avem de a face cu diverse chei care ar putea avea asociate diferite tipuri de date. Din nefericire, operatorul cu paranteză dreaptă ia în considerare și proprietățile moștenite.

```javascript
obiect['toString']; // function toString()
```

Pentru că nu există o operațiune built-in pentru a citi doar proprietățile proprii. Este nevoie de a scrie o funcție care să facă chiar asta:

```javascript
function accesProprietatiProprii (obiectul, proprietatea) {
  return (obiectul.hasOwnProperty(proprietatea)) ? obiectul[proprietatea] : undefined;
};
accesProprietatiProprii(obiect, 'altaProprietate'); // "altceva"
accesProprietatiProprii(obiect, 'artefact');        // Array [ "vază", "statuetă" ]
accesProprietatiProprii(obiect, 'toString');        // undefined
```

Varianta de mai sus are o problemă atunci când o proprietate a obiectului se numește exact `hasOwnProperty`. Atunci aceasta va înceta să mai lucreze și este recomandabil să se facă un `call()`.

```javascript
function accesProprietatiProprii (obiectul, proprietatea) {
  return (Object.prototype.hasOwnProperty.call(obiectul, proprietatea)) ? obiectul[proprietatea] : undefined;
};
```

### Extinderea obiectelor simple

Obiectelor li se pot adăuga proprietăți și metode pentru a le extinde funcționalitatea. Extinderea unui obiect este simplă atunci când software-ul este scris de o singură persoană sau atunci când este singurul stăpân al codului. Lucrurile se complică atunci când trebuie să îmbogățești funcționalitățile unui obiect cu unele care au fost scrise deja și care au nevoie doar de o preluare în propriul obiect. De fapt, acesta este și scopul. Să preiei ceea ce a fost scris deja de alții pentru a realiza un compus software mult mai valoros.

#### Ce este un „mixin”

Este un obiect care îmbogățește obiectul `this` cu funcții și obiecte aparținând altor obiecte. La final, rezultă un obiect nou care este o variantă „extinsă” a obiectului original. Atenție, obiectul rezultat va îngloba referințe, nu obiectele în sine, care vor continua să existe separat.

Pornești de la un obiect pe care vrei să-l „mixezi” cu un altul.

```javascript
const functiiCerc = {
  arie: function facAria () { return Math.PI * this.raza * this.raza },
  creste: function crescRaza () { this.raza++; },
  descreste: function descrRaza () { this.raza--; }
};
```

Pentru a simplifica adăugarea metodelor și proprietăților, se poate scrie o funcție specializată:

```javascript
function extinde (obi, obiSursa) {
  for (let x in obiSursa) {
    if ( obiSursa.hasOwnProperty(x) ) {
      obi[x] = obiSursa[x];
    };
  };
  return obi;
};
```

Această funcție poate fi invocată pentru a extinde funcționalitatea prototipului unui alt obiect. O schiță pentru o astfel de extindere ar fi:

```javascript
let ElementRotund = function facElemRotund (raza, identificator) {
  this.raza = raza;
  this.identificator = identificator;
};
extinde(ElementRotund.prototype, functiiCerc);
```

O altă variantă pentru funcția de extindere:

```javascript
function extinde (proprietati) {
  let prop, obi;
  obi = Object.create(this);
  for(prop in proprietati) {
    if(proprietati.hasOwnProperty(prop)) {
        obi[prop] = proprietati[prop];
    };
  };
  return obj;
};
```

În acest caz se creează un nou obiect cu `this` (de fapt, face o copie a lui însuși), la care bucla `for` adaugă proprietățile de la obiectul care se dorește a fi integrat. De fapt, din punct de vedere tehnic, se face o copie a referințelor către proprietățile obiectului de integrat. Astfel se face extinderea obiectului original.

Dacă funcțiile definite de un mixin sunt destinate a fi folosite de un alt obiect, se pune întrebarea dacă nu ar fi mai simplă apelarea mixinului într-un `call()`.

```javascript
let functiiCerc = function () {
  this.arie = function () { return Math.PI * this.raza * this.raza };
  this.creste = function() { this.raza++; };
  this.descreste = function() { this.raza--; };
  return this;
};
let ElementRotund = function (raza) { this.raza = raza };
functiiCerc.call(ElementRotund.prototype);
const cerc1 = new ElementRotund(10);
cerc1.arie(); //
```

### Mantre

-   Spre deosebire de funcții, declarația de clasă nu beneficiază de mecanismul de hoisting indiferent că este o declarație sau o expresie de clasă. Deci, până când execuția nu ajunge la locul declarației, clasa se află în Temporal Dead Zone (TDZ).
-   Tot codul din clasă rulează automat în `strict mode`.
-   Toate metodele create sunt automat non-enumerabile.
-   Apelarea constructorului fără `new` conduce la o stare de eroare.
-   Numele clasei nu trebuie folosit în interiorul acesteia pentru o reasignare. Conduce la eroare.
-   În cazul folosirii expresiilor de clasă, nu este necesară introducerea unui identificator după cuvântul cheie `class`.
-   `super()` setează legătura la `this` în cazul claselor derivate. Dacă folosești constructorul, adu-ți mereu aminte să invoci mai întâi de toate `super()`.
-   clasele permit moștenirea din toate obiectele built-in: `class ArraySpecial extends Array {}`.

## Resurse

-   [Crockford on Javascript - Functions](https://www.youtube.com/watch?v=lVnnxfdLdlM)
-   [A fresh look at JavaScript Mixins, de  Angus Croll](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/)
-   [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
-   [Object-oriented JavaScript: A Deep Dive into ES6 Classes](https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)
-   [What is the definition of “interface” in object oriented programming](https://stackoverflow.com/questions/2866987/what-is-the-definition-of-interface-in-object-oriented-programming)
-   [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
