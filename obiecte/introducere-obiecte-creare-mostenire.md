# Obiecte

## Familiarizare cu obiectele

Standardul spune că **un obiect este un membru al tipului built-in Object** al limbajului. Din punct de vedere al taxonomiei, standardul este clar: *un tip a lui `Object`, care este o entitate internă limbajului nostru*. Însă pentru a realiza <u>natura</u> obiectelor, cităm standardul pentru următoarea lămurire:

> ECMAScript este bazat pe obiecte: limbajul de bază și toate funcționalitățile sunt oferite de obiecte, iar un program ECMAScript este un ciorchine de obiecte care comunică.

Obiectele sunt și ele valori. La aceste valori se ajunge printr-o **referință** (către o locație în memorie unde este stocat), în contrast cu primitivele care sunt chiar valoarea. Obiectele ocupă o zonă de memorie și nu pot fi copiate în alte zone de memorie. Zona de memorie în care sunt scrise valorile unui program JavaScript se numește **heap** (lb. rom. *maldăr*). Pur și simplu, sunt unice, așa cum o țară este unică în lume cu relieful, obiceiurile și sistemul de valori. Pentru a trimite o scrisoare cuiva, trebuie să cunoști țara, orașul, strada și numele persoanei. Este și cazul obiectelor. Pentru a folosi acea zonă de memorie ocupată de obiect, vom folosi referința sau referințele către acesta.

Privind la modul în care sunt organizate datele într-un obiect, vom remarca că acestea sunt colecții de proprietăți identificabile printr-un nume, fiind strânse împreună fără a avea o ordine internă. Este ca și cum ai strânge jucăriile unui copil într-o cutie după o zi de distracție. Obiectele sunt structuri de date dinamice ale căror proprietăți se modifică. Atunci când acest lucru se întâmplă spunem că obiectul *își modifică starea*.

**Despre alcătuirea unui obiect standardul spune**:

> colecții de zero sau mai multe proprietăți fiecare având atribute care determină cum poate fi folosită.

Pentru că obiectele sunt valori, acestea pot fi pasate unei funcții pentru a lucra cu datele obiectului în corpul funcției. Orice modificare aduci datelor atunci când faci prelucrări în funcție, se răsfrânge instantaneu prin modificarea valorilor obiectului pentru că lucrezi cu referințe. Părțile componente, mai exact proprietățile trebuie înțelese în litera standardului:

> containere care pot conține alte obiecte, valori primitive sau funcții.

Adu-ți mereu aminte că funcțiile sunt și ele obiecte și din acest motiv, la rândul lor niște referințe.

Câteva concepte fundamentale pentru înțelegerea obiectelor în general:

-   **Abstractizare**: înseamnă ascunderea detaliilor de implementare în prototype sau într-o funcție. Poți înțelege abstractizarea ca o căutare și organizare a entităților similare din cod pentru a le oferi printr-o funcție sau un obiect.
-   **Încapsulare**: este ceea ce obții atunci când pui împreună datele cu funcționalitățile care vor opera cu ele. În practică, se reduce la o *ascundere* a părților *private*. Un exemplu pentru incapsulare este un model de organizarea a codului numit Revealing Module Pattern.
-   **Agregarea obiectelor** se realizează atunci când un obiect are proprietăți care sunt referințe către alte obiecte.
-   **Moștenirea** este un mecanism prin care obiectul creat poate folosi datele și funcționalitățile altuia cu rol de părinte. În JavaScript, moștenirea se realizează prin obiectul prototipal.
-   **Poliformism** este caracteristica unui obiect de a deveni *un comportament* urmat de multe alte obiecte. Spunem că un obiect se comportă ca *o interfață*, care poate fi aplicată altor obiecte pentru a opera cu acestea.

Atunci când un obiect este creat, toate caracteristicile sale sunt moștenite de la un alt obiect cu rol de **prototip** așa cum un copil moștenește trăsăturile părinților. Chiar dacă acel copil este o persoană diferită, acesta moștenește de la părinții săi anumite caracteristici. Dacă am strânge aceste caracteristici moștenite într-un set, acesta ar fi **obiectul prototip**. Să nu vi se pară ciudat că un prototip este un obiect, iar acesta la rândul lui are un prototip. E ca un lanț, care are drept limită superioară obiectele interne `Object` și `Function`, iar deasupra lor este valoarea `null`. Totuși acest lanț prototipal poate fi rupt la nevoie.

### Alcătuirea obiectelor

Obiectele au **proprietăți** și **metode** ce formează **membrii** obiectului.

Proprietățile pot fi numere, boolean-uri, șiruri de caractere, funcții sau chiar alte obiecte. **Proprietățile** sunt valori (primitive, funcții sau alte obiecte), iar metodele sunt funcții declarate în obiect sau în afara lui. Membrii unui obiect formează o adevărată *semnătura* a obiectului. Fiecare obiect are o *semnătură* distinctă. Dacă dorești să creezi mai multe obiecte, cel mai înțelept este să folosești constructorii sau funcții care le returnează.

### Viața unui obiect

Să explorăm prin fațetele oferite de următoarele întrebări:

- cât timp *trăiește* un obiect?
- cât stă el scris în zona de memorie?
- cât timp este disponibil un obiect programului?

Un obiect este disponibil atâta vreme cât există cel puțin o referință către acesta sau către o proprietate a sa. Ce se întâmplă când nu mai există nicio referință? Zona de memorie este eliberată de un mecanism intern motorului denumit în limba engleză *garbage collector*. În această lucrare veți mai întâlni și expresia *colectat la gunoi*.

```javascript
const obiectul1 = {ceva: 10};
if (true) {
  const obiectul2 = {altceva: 20}; // va fi distrus imediat ce testul se va termina
  obiectul1.proprietatea1 = {undeva: 'Bod'};
}
```

În exemplul de mai sus, obiectul definit pentru `proprietatea1` va fi păstrat pentru că am setat o referință către acesta în `obiectul1`. Câtă vreme `obiectul1` va trăi, va trăi și legătura către cel definit în blocul decizional - `obiectul1.proprietatea1`.
Te vei întreba ce se petrece cu `obiectul2`. Acesta va fi *colectat la gunoi* pentru că mediul lexical în care a fost definit, cel al blocului decizional, colapsează la momentul încheierii testului, iar despre declarații spunem că devin *out of scope* - *ies în afara mediului lexical*.

Putem indica motorului distrugerea unui obiect și în consecință *colectarea la gunoi* prin setarea referinței la valoarea `undefined` sau `null`.

```javascript
let obi = {ceva: 10};
obi = null; // locația de memorie a fost curățată
```

Reține faptul că proprietățile unui obiect, precum și elementele unui array, care tot un obiect este, sunt accesibile câtă vreme sunt în memorie. Pentru a vedea un caz interesat, să punem un obiect ca element într-un array. Dacă obiectul va fi setat la `null`, totuși vom avea încă o referință la el accesând elementul de array.

```javascript
let obi = {ceva: 10};
let arr = [obi];
obi = null;
console.log(arr[0]); //
```

Ceea ce s-a distrus prin `null` este legătura identificatorului `obi` la obiect, dar prin elementul array-ului, această legătură se păstrează accesând acel element.

Dacă un obiect oferă metode altuia prin mecanismul de moștenire prototipală, acesta nu va fi *colectat la gunoi* pentru că de el depind alte obiecte, care lucrează cu metode sau valori, pe care le apelează prin lanțul prototipal format. Acest tip de referință este una *implicită* (se face automat). Atunci când un obiect face referințe către proprietățile unui alt obiect, spunem că realizează o referință *explicită*, folosind un identificator. Atunci când ambele referințe nu mai există, intervine mecanismul de *colectare la gunoi* și zona de memorie în care exista, este eliberată.

Atunci când pasăm unei funcții un obiect, de fapt îi dăm referința către acesta. O referință se comportă precum o referință bibliografică către un fragment dintr-o carte.

```javascript
var obi1 = {}; let obi2 = {}; const obi3 = {}; // avem trei obiecte distincte
var obiA = obiB = obiC = {}; // cei trei identificatori sunt tot atâtea referințe către același obiect
```

### Reguli de redactare

Pentru a introduce o proprietate într-un obiect, pur și simplu vei avea obiectul marcat prin acolade, iar în interior, vei introduce identificatorii proprietății urmați de două puncte și apoi valoarea: `{a: 'ceva'}`.

Toate valorile text vor fi introduse în obiecte între ghilimele simple, iar restul valorilor așa cum sunt ele. Dacă nu sunt între ghilimele, înseamnă că avem identificatorii altor valori. Am putea introduce textul folosind și ghilimelele duble, dar dacă în text vor fi folosite ghilimelele duble (valori într-un CSV), instantaneu am avea o mare problemă. Motorul ar considera că, la primele ghilimele duble ale textului, se încheie declararea valorii. Proprietățile se redactează precum listele, fiind delimitate prin virgulă.

```javascript
// notația literală
const obi = { a: 'ceva text' };
// proprietate cu string literal
const obi2 = { "a": "altceva" };
```

Exemplul indică cea mai întâlnită formulă de creare a obiectelor numită *literală*. Vei observa că obiectele sunt declarate cu un identificator al unei variabile `const`.

Modul de a adăuga proprietăți noi, fără a interveni asupra constructorului, este unic, fiind o marcă a limbajului de programare JavaScript. Este și ceea ce îl face plăcut în lucru prin abordarea directă. Douglas Crockford indică acest avantaj al limbajului, care oferă independență opus constrângerilor pe care o **clasă** (un șablon în baza căruia sunt instanțiate obiecte) îl impune privind numele proprietăților și tipul lor.

Obiectele pot conține la rândul lor alte obiecte, fiind posibilă reprezentarea unor înregistrări complexe.

#### Sintaxa identificatorilor

Începând cu ECMAScript 2015, se poate folosi și notația prescurtată atunci când numele unei proprietăți este același cu numele identificatorului unei valori. Putem introduce doar numele identificatorului.

```javascript
// declararea valorilor
let unu = 1, este = true;
// constituirea obiectului
const obi = {
  unu: unu,
  este: este
};
// cu formă concisă permisă:
const obi = {unu, este};
// Efectul este același
console.log(obi);
// {"unu":1,"este":true}
```

**Moment ZEN**: Obiectele au aspectul unor array-uri asociative pentru că poți accesa valoarea folosind notația cu paranteze drepte: `obi['b']`.

Atunci când sunt adăugate proprietăți, folosirea sintaxei cu paranteze pătrate va permite evaluarea expresiilor dintre parantezele pătrate, iar rezultatul devine cheia.

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

Textul standardului încadrează obiectele în următoarele categorii:

-   **Ordinary object** (*obiecte comune*), care au comportamentul comun tuturor obiectelor din JavaScript.
-   **Exotic object** (*obiecte exotice*), care au comportamentul comun obiectelor în JS, dar cu mici diferențe.
-   **Standard objects** (*obiecte standard*) sunt toate obiectele JS. Obiectele *ordinary* și cele *exotice* fac parte din setul obiectelor **standard**.
-   **Built-in objects** (*obiecte interne*) sunt toate obiectele pe care le expune din start motorul de JavaScript. Toate obiectele comune (*ordinary*) fac parte din setul celor interne.

### Obiectele interne limbajului

Am menționat că JavaScript oferă din oficiu obiecte care se numesc în limba engleză *built-in*. Le numim **obiecte interne** limbajului. Pentru a avea acces la ele nu-i nevoie să faci ceva. Pur și simplu ele sunt acolo deja, gata de a fi folosite. Există un detaliu important. Există un obiect de *fundal* pentru întreg codul scris de programator, care este numit `global`. Acesta face parte din setul obiectelor interne.
Obiectul `global` plus **obiectele standard** constituie setul mare al celor **interne**.

Obiectul global nu este containerul tuturor obiectelor oricât de tentant ar fi să-l imaginăm astfel. Poți totuși să-l consideri a fi contextul entităților propriului cod la momentul evaluării. Este chiar obiectul la care se face legătura `this` atunci când codul nu rulează sub regula `use strict`.

Dincolo de acestea există un univers mult mai larg al unor seturi de obiecte puse la dispoziție de browser, de exemplu. Acestea vor constitui ceea ce numim **interfețe de programare a aplicațiilor**, în limba engleză **Application Programming Interfaces**, pe scurt **API**-uri.

Modul în care înțelegem ce oferă din start un obiect intern, este determinat și de un set de algoritmi rulați de motorul care implementează standardul ECMAScript. Reamintesc faptul că pentru a putea programa în JavaScript, există un motor al cărui treabă este să genereze obiectele interne, să interpreteze codului sursă, ș.a.m.d.

Acești algoritmi sunt numiți `metode interne` ale obiectelor interne. Metodele interne definesc comportamentul la momentul rulării codul privind crearea și utilizarea acelui obiect. Implementarea acestor metode interne specificate de standard cade în responsabilitatea celor care construiesc motoare JavaScript - producătorii de browsere și Node.js. Reține acest aspect pentru a nu fi surprins când vei auzi sau citi discuții despre performanțele unui anume motor în comparație cu altul. Aceste metode interne sunt toate procesele care se petrec în inima unui motor atunci când, de exemplu, apelezi o metodă a unui obiect intern cum ar fi `Object.create()` sau `String.split()`.

Aceste adevărate biblioteci de cod scrise în alte limbaje de programare precum C++ sau Rust sunt executanții *instrucțiunilor* pe care noi le scriem în codul sursă JavaScript. De aici și atributul pus acestui limbaj **de scripting**. Un script fiind un set de instrucțiuni, care la momentul execuției angajează adevărate biblioteci de cod precompilate în limbaje de programare de nivel mai jos sau chiar binare, care comunică `1` și `0` direct cu procesorul și mai nou chiar și cu perifericele (Internet of Things). Am menționat acest lucru pentru a înțelege că noi operăm la un nivel foarte înalt, iar JavaScript poate fi perceput ca un *rețetar* aplicat unui mediu dedicat interpretării respectivelor rețete.

Câteva astfel de rețete sunt foarte utile lucrului cu obiecte. De exemplu, metoda `Object.getPrototypeOf()` returnează un obiect sau `null`. Indică obiectul care oferă proprietățile moștenite, precum și pe cel asupra căruia se face interogarea cu `Object.getPrototypeOf(obiSursă)`. Returnarea lui `null` indică faptul că obiectul curent nu moștenește nicio proprietate. M-am oprit la această metodă pentru că obiectele prototip oferă mecanismul de moștenire în JavaScript.

Aceste metode, de fapt, aceste **rețete** prestabilite, pot fi și ele alterate pentru că JavaScript permite chiar modificarea rețetelor originale (vezi obiectul intern `Reflect`). Este ca și cum ai modifica o carte de bucate așa cum vrei tu după necesitățile tale. Atingerea unui astfel de nivel implică un aspect negativ, iar acesta este pierderea compatibilității cu programele scrise de restul comunității. Închipuiește-ți ce s-ar întâmpla dacă aș modifica **rețeta** `Object.setPrototypeOf()`, dar alt programator dorește o interfațare cu software-ul scris de tine, fiind bun bazat că metoda cu același nume respectă comportamentul așteptat prin standard? Ar fi un haos desăvârșit. Totuși, sunt momente când mici modificări îmbunătățesc performanța sau îmbogățesc programele.

## Mantre

-   ECMAScript vine cu obiectele sale din start, care se numesc obiecte `built-in`, fiind inclus și `global object` - obiectul global.
-   Totul în JavaScript poate avea comportamentul unui obiect exceptând: `null` și `undefined`.
-   Toate obiectele în JavaScript descind din `Object`.
-   Toate obiectele moștenesc metode și proprietăți din `Object.prototype`, dar acestea pot fi suprascrise sau poți adăuga propriile proprietăți și metode.
-   În cazul tuturor funcțiilor, motorul JavaScript generează un obiect `prototype`. Acest obiect este gol și este creat de constructorul lui `Object()`.
-   Fiecare funcție obiect are un obiect prototip diferit.
-   Un obiect poate fi creat cu `new Object()`:
    1. Acestă modalitate **nu va crea și constructor**.
    2. Accesarea `numeObiect.__proto__.constructor` răspunde cu `function Obiect()` la care s-a ajuns prin căutarea în lanțul prototipal.
-   O funcție apelabilă cu `new` în fața sa este un constructor.

## Crearea obiectelor

În general, obiectele pot fi create prin declarare sau construire. La declarare, redactezi literal proprietățile. În cazul construirii, creezi obiecte executând o funcție numită *constructor*. Sarcina lor este să returneze un obiect cu toate proprietățile sale. Să trecem în revistă căteva metode prin care putem obține un obiect.

1. Crearea în baza unui contructor folosind `new`. De exemplu, pentru `const ObiNou = new Object();`, la executarea cu `new` se respectă cele patru reguli:
  1. crearea obiectului;
  2. stabilirea lanțului prototipal;
  3. stabilirea legăturii `this` la noul obiect;
  4. obiectul nou creat este returnat. Rezultatul este echivalent cu declarația literală: `const newObj = {}`.
2. `const ObiNou = Object.create(null);`, unde `prototype` este setat la `null`. Acest model este supranumit *dict pattern*, adică șablonul de creare a unui dicționar.
3. `const ObiNou = Object.create(Object.prototype);`, fiind echivalent cu `const newObj = {}`.
4. `const ObiNou = {};`, fiind echivalentă cu `new Object()`.
5. `function x () { return {} }; const y = x();`, returnează un obiect în urma execuției unei funcții.
6. Crearea obiectelor folosind clase: `class X {}; const obiX = new X();`

Toate variantele au același rezultat: creează un obiect gol.

Atenție, obiectele create folosind `Object.create(null)` nu au constructor. Proprietatea `.constructor` va trimite la funcția la care a fost atașat `prototype` la momentul declarării. Am amintit de șablonul **dict**. Câteva lămuriri sunt necesare. Acum câțiva ani, nu aveam la îndemână obiectele interne `Map` și `Set` pentru a organiza date. În acest scop erau folosite obiectele comune, care erau folosite precum dicționare de chei - valori. Sintaxa indică asemănarea cu unul (**cuvânt cheie: valoare**). Astfel, folosindu-se `Object.create(null)` puteai crea un obiect fără legătură prototipală. Obiectul rezultat nu era *poluat* cu proprietăți moștenite. Ceea ce rămânea era o structură care putea fi folosită precum un **dicționar**.

Modalitatea de a crea obiecte prin returnarea dintr-o funcție este și ea des întâlnită. Acest model, șablon, tipar, spune-i cum îți place pentru că englezii îi spun **pattern**, se comportă ca o mică făbricuță de făcut obiecte. De fiecare dată când o astfel de funcție va fi apelată, tot atâtea obiecte vor fi returnate. Pentru exemplificare, vom iniția două colecții: una cu valori pentru care se creează obiectele și a doua în care le stocăm după ce au fost generate de `Făbricuță`.

```javascript
function Făbricuță (valoarea) {
  return {valoarea};
};

let colTest = ["x", "y", "z"], colObi = [];
for (let i = 0; i < colTest.length; i++) {
  colObi.push(Făbricuță(colTest[i]));
};
colObi[0]; // { valoarea: "x" }
colObi[1]; // { valoarea: "y" }
colObi[2]; // { valoarea: "z" }
```

Am făcut un pas important în înțelegerea unei perspective lărgite asupra limbajului. Datele sunt așezate și sunt structurate în diferitele tipuri de agregări necesare unor scenarii diferite. Șablonul *Făbricuță* de mai sus elimină scrierea de mână a obiectelor care au aceeași **semnătură**. Putem spune că obiectele a căror structură a fost gândită să fie baza pentru crearea altora, sunt niște **interfețe**. O interfață este o sumă de caracteristici comune care vor fi regăsite la toate obiectele care vor dori să *implementeze* acea interfață. `Făbricuța` de mai sus creează obiecte cu semnătura `{ a: 1,  valoarea }`, interfața în cazul acesta fiind proprietățile `a` și `valoarea`.

### Folosirea constructorilor

Constructorii sunt niște funcții redactate special ca la momentul executării, să **construiască** un obiect. Standardul spune că un constructor este:

> un obiect funcție care suportă metoda internă `[[Construct]]`.

Prin convenție, pentru a distinge constructorii de funcțiile simple, se va scrie identificatorul acesteia cu majusculă.

```javascript
function MatrițăAvionVuiaI (tip = 'experimental', an = '1906') {
  this.nume = 'Vuia 1';
  this.deschidereAripi = 4;    // în metri
  this.distanțăMaximă = 0.012; // în kilometri
};
var VuiaI = new MatrițăAvionVuiaI();
console.log(VuiaI);
// { nume: 'Vuia 1', deschidereAripi: 4, 'distanțăMaximă': 0.012 }
```

În cazul constructorului de mai sus am folosit parametri cu valori din oficiu. Atunci când un obiect este instanțiat cu operatorul `new`, se va genera automat o proprietate numită `constructor`, indicând funcția care a generat obiectul. La apelarea cu operatorul `new`, mai întâi se generează obiectul. După, se execută codul funcției. Execuția constructorului are ca efect atribuirea proprietăților inițiale ale noului obiect. Invocarea unui constructor fără `new` execută codul din corpul funcției fără a crea obiectul. În cazul în care constructorului nu i se pasează niciun argument, parantezele rotunde pot fi omise opțional.

```javascript
function Ceva () { this.a = 1 };
const obi = new Ceva;
```

Spunem că instanțiem obiecte de tipul constructorului. Pe cale de consecință, operatorului `instanceof` va indica mereu constructorul. În exemplul constructorului `MatrițăAvionVuiaI`, l-am introdus pe `this`, un cuvânt cheie, care denumește o legătură la un obiect context.

#### Legătura `this`

Legătura `this` este o conexiune live la proprietățile și metodele obiectului în al cărui context se execută o funcție. De ce ar fi nevoie să existe un cuvânt cheie, care să simbolizeze legătura la membrii obiectului, dacă avem identificatorul obiectului. Răspunsul se leagă de posibilitatea ca într-o etapă a executării codului, obiectului nostru să-i fie atribuit un alt identificator. În acel moment, vei pierde toate referințele către entitățile interne folosind identificatorul inițial.

```javascript
let obi = {
  a: 1,
  b: function () {
    console.log(obi.a); // o referință directă
  }
};
let obi1 = obi; // facem o ref nouă
obi = {c: 1}; // reatribuim id cu alt ob
obi1.b(); // undefined
// la reatribuire am pierde
// referința către funcție, corect?
```

Alternativa corectă este cea a referirii obiectului chiar din interiorul său folosind `this`, aceasta fiind o legătură cu mediul lexical al obiectului. Astfel, la momentul evaluării unei expresii, motorul va ști exact faptul că te referi la obiectul vizat și că acesta trebuie să ofere accesul la date.

```javascript
const obi = {
  a: 1,
  b: function metoda1 () {
    console.log(this.a);// o referință directă
  }
};
obi.b(); // 1
```

Pentru o funcție care tocmai și-a început execuția, `this` este o proprietate care nu poate fi modificată. În cazul de mai sus, funcția cu rol de metodă, va avea acces la mediul lexical al obiectului pentru că, în primul rând a fost definită ca parte a aceluiași mediu lexical, dar mai mult, pentru că a stabilit legătura `this` automat la acel obiect.

Totuși, reține faptul că referința `this` este strict legată de *locul* în care a fost apelată funcția, nu de *locul* unde a fost declarată aceasta. Sunt două lucruri distincte. Dacă nu le vei percepe astfel încă de acum, te vei lovi de multe erori și nu vei înțelege în profunzime anumite comportamente.

#### `this` și constructorii în obiectul global

Am văzut deja cum funcțiile pot returna obiecte, aceasta fiind o modalitate de a le crea. Dar atunci când ai nevoie de mai multă finețe în compunerea viitorului obiect, vei folosi funcțiile din nou din postura de constructori. Un constructor zămislește obiecte folosind numai operatorul `new`. Dacă nu o invoci cu `new`, se va comporta ca o funcție simplă cu toate consecințele rulări în acest mod. Acest mecanism comportamental dual este chiar un avantaj oferit de limbaj. Cu ajutorul constructorilor, de fapt alcătuiești *semnătura* viitoarelor obiecte. Te vei întreba care este mecanismul magic prin care o funcție poate crea un obiect? Nicio magie, aici: pur și simplu, funcțiile sunt și ele obiecte!

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
// o funcție care nu returnează ceva explicit,
// va returna valoarea undefined din oficiu
console.log(`${window.indicativ} este ${window.nume}`);
// 'ISS este International Space Station'
let obiect = new NumescNave('Tiangong-1', "Palatul Celest");
console.log(obiect);
```

Din exemplul funcției `NumescNave`, se remarcă imediat faptul că rularea fără `"use strict";` va rezulta în injectarea tuturor valorilor menționate prin sintaxa `this.ceva`, direct în obiectul global, care în cazul browserului este `window`. De ce? Pentru că la acesta a fost stabilită legătura din oficiu pentru valoarea lui `this`. În cazul rulării funcției sub `"use strict";`, motorul JavaScript ar fi semnalat o excepție și ar fi afișat: **Exception: TypeError: this is undefined**. Concluzie: injectarea valorilor nu s-ar mai produce.

### Legătura prototipală la constructori

După cum am văzut în capitolul dedicat genezei Tărâmului, atunci când s-au format **intrinsics**, a fost creat și obiectul prototip al tuturor obiectelor, care o fracțiune mai târziu a fost folosit pentru crearea obiectului-funcție ce va juca rolul de prototip al tuturor funcțiilor.

Obiectele-funcții au la rândul lor o proprietate numită `prototype`. Această proprietate face posibilă moștenirea prototipală. În cazul apelării folosind operatorul `new`, se va genera legătura prototipală, fiind folosită chiar referința către obiectul prototip al funcției pentru a adăuga noul obiect în lanțul prototipal.

**Spune standardul**:

> Fiecare obiect creat de un constructor are o referință implicită (numită prototipul obiectului) către valoarea proprietății «prototype» a constructorului.

#### Ce se întâmplă când folosești `new`

Invocarea unei funcții constructor folosind operatorul `new`, declanșează parcurgerea unor etape esențiale. La final, motorul creează un obiect. Reține faptul că acest nou obiect trebuie referit printr-o expresie de tipul `const obiNou = new FacObiecte();`. Când ajunge la `new`, motorul JavaScript înțelege că este momentul să parcurgă etapele:

1.  Se creează un obiect nou.
2.  Se creează legătura prototipală la obiectul prototype al funcției constructor.
3.  Obiectul generat automat este pasat funcției cu rol de constructor ca fiind obiectul `this` și astfel, din acest moment devine contextul de execuție al funcției constructor invocate. După ce va fi înzestrat cu proprietățile dorite prin execuția corpului funcției constructor, obiectul `this` va fi returnat drept noul obiect.
4.  Dacă funcția constructor nu returnează ceva explicit, atunci înainte de a se închide blocul (`}`) se va returna automat obiectul constituit la pasul 1, după ce a fost *înzestrat* la pasul 3. În cazul în care funcția constructor returnează ceva explicit, nu se mai creează obiectul.

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

Exemplul de mai sus este ceea ce Douglas Crockford numește moștenire *presudoclasică* și argumentează în favoarea evitării acestei practici. Am menționat acest model pentru că este întâlnit adesea în aplicații. Pentru a înțelege clasele în JavaScript, această practică trebuia menționată. Deficiența modelului este că ori de câte ori vei crea un obiect nou, funcția `dauID` va fi re-creată și ea, poluându-se memoria cu aceeași funcție replicată.

Pentru evitarea unei astfel de duplicări păguboase, se va folosi obiectul constructorului. Obiectul **prototype** este un veritabil context de execuție pentru viitoarele obiecte. Prototype este accesibil tuturor instanțelor. O consecință directă este că obiectul funcție nu va putea fi colectat la gunoi pentru că este legat prin prototip de obiectele instanțiate. Crockford indică faptul că în practică mai sunt întâlnite și situații *nebune*, când se înlocuiește prototipul unui obiect funcție cu un obiect creat din apelarea cu `new` a unei funcții constructor.

```javascript
// primul constructor
function SuntUnContructor () {
  this.oProprietate = 10;
};
SuntUnContructor.prototype.oFunctie = function oFunctie () {
  return this.oProprietate;
};
// al doilea constructor
function UnConstructorNou () {
  this.oValoare = 1000;
};
UnConstructorNou.prototype = new SuntUnContructor();
UnConstructorNou.prototype.propNoua = function () {
  return oValoare;
};
const obi2 = new UnConstructorNou();
obi2.oValoare; // 1000
```

Odată cu evoluția standardului a fost oferită o alternativă elegantă prin metoda `Object.create()`, cu ajutorul căreia putem evita instanțierea cu `new`. Totuși declari o funcție constructor și adaugi în prototip proprietățile pe care obiectul le va moșteni.

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

Astfel, se va realiza conectarea la obiectul prototip al constructorului. Veți vedea faptul că folosirea sintaxei de lucru pentru clase, va realiza automat legătura la obiectul prototip al constructorului la momentul extinderii uneia.

#### Constrângerea rolurilor

Uneori ai nevoie să restricționezi o funcție doar la rolul de constructor. Obiectul rezultat este o instanță a obiectului `this` a funcției constructor pentru că în baza lui `this` a fost instanțiat acesta. Bazându-ne pe acest lucru, putem verifica la momentul invocării dacă obiectul s-a creat sau nu. La apelarea cu `new` se creează obiectul, iar la execuția simplă nu se creează niciun obiect.

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

Această restricționare poate fi păcălită apelând constructorul nostru în contextul unui obiect deja creat în baza lui, fără a instanția cu `new`. Acest lucru este oferit de `call()`.

```javascript
let obiectPacalitor = VehiculSpatial.call(obiectNou, 'Soyuz');
// în acest moment, obiectNou este modificat la Object { nume: "Soyuz", tip: "vehicul" }
```

Folosirea metodei `call` a produs o legare a lui `this` la obiectul deja creat. Acest lucru conduce la rescrierea lui `nume` în obiectul gazdă (`obiectNou`). Acest comportament nu este cel așteptat atâta vreme cât am dorit ca funcția constructor să permită invocarea doar cu `new`, dar este posibil.

În ES6 această problemă este reglată prin `new.target`. Această proprietate, care este mai specială pentru că se adresează unui viitor obiect ce nu a fost creat încă, capătă o valoare atunci când funcția este un constructor (apelat cu `new`, folosind metoda internă `[[Construct]]`). Dacă funcția constructor este apelată fără `new`, înseamnă că este apelată cu metoda internă `[[Call]]`, iar `new.target` va avea valoarea `undefined`.

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

Funcția are rol de constructor! Invocă cu `new` pentru a crea obiectul.

#### Manipularea indirectă a valorilor

Uneori este necesar să protejezi anumite valori ale unui obiect pe care-l generezi folosind o funcție constructor. Partea foarte frumoasă este că însăși funcția constructor permite introducerea unor mecanisme de acces și setare a valorilor în obiectul rezultat. Acest lucru se realizează prin funcții specializate care poartă denumirea de **accesori** și sunt cunoscuți ca fiind **getteri** (de la englezescul `get`, care înseamnă **a obține** o valoare) și **setteri** (de la englezescul `set`, care înseamnă a introduce o valoare).

Până la ECMAScript 5, *getter*ii și *setter*ii erau doar două funcții special croite pentru a introduce și scoate valori.

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

În exemplul următor observăm că `valoare` nu este accesibil direct, ci numai prin intermediul celor două funcții specializate. ECMAScript 5 simplifică lucrurile din punct de vedere sintactic și reduce verbozitatea codului. În locul unei funcții cu rol de constructor, se poate lucra direct cu obiectul la momentul declarării sale.

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

În cazul nostru, `valoare` este partea ascunsă a obiectului, care poate fi manipulată doar prin metodele specializate. Acest mod de a lucra cu proprietățile unui obiect își dovedește utilitatea atunci când lucrezi cu o colecție de valori.

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

Poți defini un setter / getter folosind și metoda `Object.defineProperty()`.

```javascript
const obiect = { colectie: [] };
Object.defineProperty(obiect, 'ceva', {
  set: function (valoare){this.colectie[this.colectie.length] = valoare;},
  get: function () { return this.colectie.join(', '); }
});
obiect.ceva = 'test';
obiect.colectie; // [ "test" ]
```

### Crearea printr-o declarație literală

Declararea literală este sintaxa cel mai adesea întrebuințată pentru a crea obiectele. Instant se va face cuplarea la obiectul prototipal al obiectului fundamental `Object`.

```javascript
const obiectNou = {};
obiectNou.__proto__.constructor
// returnează: function Object()
```

Atunci când creezi un obiect printr-un literal, de fapt constitui un **domeniu** separat de restul codului cunoscut în lumea programării ca **namespace**. Punctul de intrare este chiar numele obiectului. Acest lucru este foarte util pentru a separa fragmente mai mari sau mai mici în zone unic identificabile. Este foarte util dacă te gândești că atunci când scrii o aplicație este posibil ca multe funcționalități să le folosești din alte programe scrise de alți colegi. Dacă nu ar exista un mecanism de separare, ar fi o bună șansă să suprascrii fără să vrei valori, care, potențial, ar purta același nume.

Astfel, realizezi este o modularizare a codului. Ca programator aduci la lumină un obiect nou, al tău, care va performa în strânsă legătură cu obiectele scrise de alții.

```javascript
const aplicatie = aplicatie || {};
```

În fragmentul de mai sus am apelat la o expresie de inițializarea a unei aplicații, care prin utilizarea operatorului logic `SAU`, va verifica existența unui identificator `aplicatie`, iar dacă acesta nu există, va fi creat un obiect care să fie containerul a ceea ce va fi. Această expresie este o practică foarte des întâlnită pentru a **rezerva** un *nume de domeniu* (**namespace**) pentru propria aplicație.

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

Echivalența este evidentă pentru că un obiect literal este un obiect ordinar, care stabilește imediat o legătură la obiectul prototip a lui `Object`, identificat prin `Object.prototype`. Construirea unui prototip care să stea la baza unui nou obiect construit poate fi des întâlnită în practică.

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

Atenție, valorile din prototip nu pot fi modificate, dar pot fi suprascrise în obiectul care le moștenește pentru că, de fapt, devin a lor. Avem exemplul propus de Kyle Simpson care este ceva mai elaborat.

```javascript
function Bunica (nume) { this.persoană = nume; };
Bunica.prototype.cineSunt = function identificare () { return "Eu sunt " + this.persoană; };

function Mamă (cine) { Bunica.call(this, cine); };
Mamă.prototype = Object.create(Bunica.prototype); // se „injectează” prototipul Bunicii în Mamă
// ATENȚIE! proprietatea .contructor se face de acum către Bunică()
Mamă.prototype.anunță = function euSunt () { console.log("Salut " + this.cineSunt() + ".") };

const obi1 = new Mamă("obi1");
const obi2 = new Mamă("obi2");

obi1.anunță();
obi2.anunță();
```

Metoda `Object.create()` permite o implementare simplă a conceputului de *moștenire diferențiată* în care obiectele sunt capabile să moștenească direct din alte obiecte. Kyle Simpson numește această modalitate de a crea obiecte: *Objects Linked to Other Objects*, pe scurt **OLOO**. Acest model se bazează pe faptul că `Object.create()` are posibilitatea de a adăuga și în același timp de a configura proprietăți ale obiectului. Este de fapt un caz de șablon tip `Prototype`. Pentru că tot am amintit despre șabloane, ar fi foarte potrivită mențiunea că toate aceste elemente de bază pe care le aprofundăm acum, conduc la realizarea unor structuri mai complexe de cod, care permit o mai mare plasticitate atunci când apare nevoia de a modela date.

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

Atunci când vrei să creezi un obiect în baza altuia, folosește acest **OLOO**. După cum observi, este mult mai ușor de redactat și de urmărit ceea ce se întâmplă.

### Folosirea valorilor deja computate

Această metodă este introdusă de ECMAScript 2015. De fapt, creezi obiecte literale, dar de această dată se pot introduce valori computate (**computed property names** îi spune în limba engleză), chiar la momentul în care este constituit obiectul.

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

### Lazy loading

În cazul în care ai nevoie să accesezi o valoare care a fost obținută printr-un efort (IO sau calcul), cel mai bine ar fi să faci caching la respectiva valoare pentru ca oricând o vei mai cere, aceasta să existe deja.

```javascript
const Test = {
  get date() {
    const dateComputate = oFunctieCareFaceIO();
    // caching
    Object.defineProperty(this, 'date', {
      value:        dateComputate,
      writable:     false,
      configurable: false,
      enumerable:   false
    });
    return dateComputate;
  }
}
```

Acest mecanism permite o *amânare* a calculării valorilor proprietăților până la momentul când acestea sunt solicitate. Acesta este cazul în care valoarea noastră este rezultată dintr-o operațiune care taxează resursele de calcul. Într-un astfel de scenariu, cel mai bine este să calculezi valoarea la prima solicitare, urmând ca apoi ori de câte ori este cerută, să fie servită dintr-un cache.

## Membrii obiectului

### Proprietățile unui obiect

Proprietățile obiectului sunt datele pe care dorim să le organizăm cu acel obiect și fac parte din membrii obiectului.

După ce instanțiezi un obiect, ai nevoie să-l faci funcțional populându-l. Putem să ne imaginăm un obiect ca pe un container pentru un set de lucruri ce stabilesc împreună un sens, o unitate proprie gata să fie prelucrată. Până la apariția noilor obiecte interne `Map` și `Set`, obiectele erau folosite și pentru a stoca date, fiind numite de programatori **dicționare**. Alternativ, pentru a stoca date, poți folosi cu mare succes `Map` și `Set`. Dacă dorești să gestionezi obiecte care sunt folosite temporar așa cum sunt cele generate de evenimentele din DOM, folosește `WeakMap` și `WeakSet`.

#### Atributele proprietăților unui obiect

Atributele sunt folosite pentru a defini și a explica starea proprietăților unui obiect. Vom vedea că o singură proprietate a unui obiect are mai multe atribute, care pot fi manipulate pentru a realiza anumite condiții pentru datele primite și analizate în contextul unui obiect. Proprietățile unui obiect sunt niște membri care pot fi accesați, setați și pot fi modificați pentru a putea prelua valori. Sau dimpotrivă, poți să le blochezi. Ba mai mult, poți să pui o setare prin care să interzici configurarea unei anumite proprietăți sau a tuturor proprietăților printr-o așa-zisă *înghețare* a obiectului. Am structurat atributele proprietăților după ceea ce oferă util acestea.

<img src="ProprietatePentruDate.png" width="300">

| Numele atributului | Valoarea returnată | Descriere                                                                                   |
|:------------------ |:------------------ |:------------------------------------------------------------------------------------------- |
| `value`            | oricare tip        | Este valoarea obținută prin accesarea proprietății                                          |
| `writable`         | Boolean            | Dacă `false`, atributul `value` nu va putea fi scris folosind `set`                         |
| `enumerable`       | Boolean            | Dacă este setat la `true`, proprietatea va putea fi enumerată într-un `for...in`            |
| `configurable`     | Boolean            | Dacă `false`, nu poți modifica. Poți modifica `value` și setarea lui `writable` la `false`. |

#### Atributele unei proprietăți accessor

<img src="ProprietateAccesor.png" width="300">

| Numele atributului | Valoarea returnată     | Descriere                                                          |
|:------------------ |:---------------------- |:------------------------------------------------------------------ |
| `get`              | Obiect sau `undefined` | Dacă valoarea este un obiect, acesta este o funcție-obiect         |
| `set`              | Obiect sau `undefined` | Dacă valoarea este un obiect, acesta este o funcție-obiect         |
| `enumerable`       | Boolean                | Dacă `true`, proprietatea va putea fi enumerată într-un `for...in` |
| `configurable`     | Boolean                | Dacă `false`, orice încercare de modificare, va eșua.              |

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

O funcție declarată într-un obiect sau care este referită de o cheie a unui obiect, devine metodă și parte a membrilor acelui obiect. Atenție, este totuși o funcție în sine, o valoare, care atunci când este declarată pentru o proprietate, poate fi accesată doar prefixându-i identificatorul cu numele obiectului. Este exact ca în cazul unei adrese (`oraș: 'Corabia'`).

```javascript
const obi = {
  jeton: 10,
  faCeva: function faCeva () { console.log(this.jeton) }
};
obi.faCeva(); // 10
```

Funcția identificată prin `faCeva` este o metodă a obiectului `obi`. Identificatorul `faCeva` este de fapt o referință către funcția ce afișează în consolă valoarea lui `jeton`. Sintaxa `obi.faCeva` poate fi considerată o referință către funcție. Nu uita faptul că o funcție cu rol de metodă are setat `this` automat la obiectul a cărui metodă este sau a devenit. Am spus că a *devenit*, într-un posibil scenariu, pentru că poți avea o funcție declarată în afara obiectului, dar pe care o asociezi unei proprietăți a unui obiect, cu scopul de a prelucra date din obiect. Folosirea unei funcții într-un obiect drept *metodă*, nu este decât apelarea unei funcții în contextul obiectului. Nu se poate spune că obiectul *conține* funcția. Obiectul face doar referință. Funcției cu rol de metodă i se pasează `this`, care este obiectul unde joacă rol de metodă.

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

Odată cu apariția noii versiuni ECMAScript, metodele au fost definite în mod formal. Standardul definește o metodă ca fiind **o funcție care are o proprietate internă `[[HomeObject]]`**. Această proprietate indică obiectul căruia îi aparține metoda. De curând a fost introdusă o simplificare a scrierii sintaxei, folosind ceea ce numim formă prescurtată **concise method** - *metodă prescurtată*.

```javascript
const obi = {
  x: 10,
  faCeva () { console.log(this.x) }
};
obi.faCeva(); // 10
```

De la `faCeva: function () {console.log(this.x)}`, am ajuns la forma prescurtată `faCeva () { console.log(this.x) }`. Cazul cel mai util în care prescurtările strălucesc este cel al inițializării directe a proprietăților (această tehnică este numită **property initializer**) prin valorile parametrilor unei funcții de tip fabrică (o funcție specializată în crearea de obiecte).

```javascript
function construiesteObi (unu, doi) {
  return { unu, doi };
};
const obiNou = construiesteObi(1, 2);
// Object { unu: 1, doi: 2 }
```

Trebuie făcută o mențiune foarte importantă pentru metodele unui obiect. O funcție săgeată nu poate face legătura `this` la obiectul pentru care ipotetic ar juca rol de metodă. Dar în cazul în care în interiorul metodei ai defini o funcție, aceasta ar putea fi o funcție săgeată. Avantajul ar fi că asigură legătura la `this`-ul metodei, care este obiectul.

```javascript
const obiLiteral = {
  ceva: 10,
  oMetoda () {
    let altceva = 2;
    let adun = () => this.ceva + altceva;
    console.log(adun());
  }
};
obiLiteral.oMetoda(); //12
```

### Adăugarea proprietăților

#### Folosirea operatorul punct

Englezul îi spune **dot notation** (*notație folosind punctul*) și este cea mai facilă modalitate de a adăuga proprietăți unui obiect existent cu mențiunea ca acel obiect să nu fie înghețat sau protejat total la scriere.

```javascript
const newObj = {};            // Creează obiectul
newObj.oCheie = 'Salutare'; // Scrie proprietăți
let cheie = newObj.oCheie;  // Accesează proprietățile
```

Posibilitatea de a adăuga în mod dinamic proprietăți dacă acestea nu există, este o altă caracteristică puternică a limbajului.

#### Folosirea parantezelor drepte

```javascript
const newObj = {};              // Creează obiectul
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

Același lucru poți să-l faci folosind `Reflect.defineProperty` cu avantajul că în cazul reușitei modificării obiectului, metoda va returna `true`.

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

### Accesarea membrilor unui obiect

Accesarea proprietăților se poate face folosind sintaxa cu punct și cea cu paranteză pătrată:

1 `obiect.proprietate`
2 `obiect['proprietate']`

Operatorul punct permite citirea proprietăților, dar încercarea de a citi o proprietate care nu există, returnează `undefined`. Dacă o proprietate nu există, aceasta va fi creată: `obiect.oProprietate = 'ceva';`.

Metodele pot fi și ele la rândul lor accesate folosind cele două tipuri de sintaxă, fie ca valori, fie ca apeluri.

1 `obiect.metoda()`
2 `obiect["metoda"]()`

Atunci când invoci o metodă folosind notația cu punct, ai acces la proprietățile obiectului folosind cuvântul cheie `this`, deoarece obiectul în contextul căruia se execută funcția este `this`.

Pentru că sintaxa cu paranteze pătrate (`["proprietate"]`), folosește un șir de caractere (**string**), acest lucru înseamnă că o secvență de cod poate fi folosită pentru a construi valoarea acelui string, de exemplu prin concatenare. Dacă pentru accesare se va folosi orice altceva în afară de stringuri, numărul sau obiectul vor fi transformate în stringuri (folosindu-se mecanismul de coercion). ES6 introduce o nouă sintaxă care ușurează modul de constituire a numelui cheii unui obiect. Până acum, acest lucru se făcea introducând din exterior valoarea.

```javascript
let numeCheieNoua = "special";
const obi = {
  cheie1: 10,
  cheie2: "ceva"
};
obi[numeCheieNoua] = 1000; // din afară
```

ECMAScript 2015 propune următoarea sintaxă:

```javascript
let numeCheieNoua = "special";
const obi = {
  cheie1: 10,
  cheie2: "ceva",
  [numeCheieNoua]: 1000 // din interior
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

Se pot seta și proprietăți folosind notația paranteză pătrată:

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

Operatorul `delete` permite eliminarea unei proprietăți, adică a perechii cheie-valoare din obiect. Acesta are efect doar asupra proprietăților care aparțin obiectului. Prototipul nu este afectat. Delete returnează `false`, dacă proprietatea nu poate fi ștearsă, dar este deținută de obiect. Va returna `true` dacă proprietatea a fost ștearsă cu succes.

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

**Moment Zen**: Un obiect este întotdeauna legat de un obiect prototip la ai cărui membri are acces.

Nota atașată definiției din standard este și ea foarte valoroasă pentru lămuririle pe care le aduce:

> Atunci când un constructor creează un obiect, acel obiect va referi automat proprietatea `prototype` a constructorului cu scopul de a rezolva referințele proprietăților. Proprietatea `prototype` a constructorului poate fi referită de expresia `constructor.prototype`. Proprietățile adăugate prototipului unui obiect sunt puse la dispoziția tuturor obiectelor care accesează prototipul prin moștenire. Alternativa este crearea unui nou obiect având un prototip specificat explicit prin utilizarea funcției interne `Object.create`.

Pentru a înțelege cu adevărat natura și specificitățile limbajului de programare JavaScript, trebuie să fie înțeles modul în care proprietățile unui obiect sunt *moștenite* de un altul.

**Moment Zen**: Fiecare obiect are un prototip a cărui valoare este un alt obiect sau `null`.

Un program care rulează este o continuă comunicare între diferite obiecte, fie că acestea sunt cele interne, fie că sunt cele create de noi. Simplificând în tușe foarte groase, creatorii limbajului au dorit o modelare a structurilor de prelucrare a datelor după modul în care lumea reală funcționează: copiii au părinți, iar aceștia moștenesc caracteristicile lor, pe lângă cele care definesc propria persoană.

**Moment Zen**: JavaScript este un limbaj bazat pe moștenire prototipală - *prototypal inheritance*.

În alte limbaje de programare așa cum este Java, de exemplu, pentru a genera un obiect ai nevoie de un fragment de cod, care are rolul de plan de construcție pentru viitoarele obiecte. Pur și simplu este o secvență de cod care descrie valorile și tipul lor, fiind proprietățile viitorului obiect.

Astfel, între obiecte se creează această legătură numită *legătură prototipală*. Intern, obiectele mențin legătura cu obiectul prototipal prin intermediul unei proprietăți `[[Prototype]]`, care va indica obiectul prototipal de la care acesta moștenește. De exemplu, atunci când se instanțiază obiecte cu `new`, proprietatea `prototype` a constructorului va fi păstrată ca referință în slotul `[[Prototype]]` al obiectului instanțiat. Pentru a accesa valoarea acestei proprietăți va trebui să fie folosită metoda `Object.getPrototypeOf`.

**Moment Zen**: Toate obiectele literale, moștenesc din obiectul prototipal `Object.prototype`.

Aceste legături realizează ceea ce numim *moștenirea prototipală* - **prototypal inheritance**. Obiectul preexistent constituie prototipul pentru cel nou creat, care poate adăuga noi membri, noi comportamente. De fapt, vorbim despre o *delegare* pe lanțul prototipal format. Acest lucru înseamnă că atunci când ceri o proprietate care nu există, delegi solicitarea către prototip. Motorul caută referința și returnează o valoare, dacă aceasta este găsită. Dacă nu, se deleagă mai sus cererea, dacă mai există un obiect prototip părinte. Dacă nu mai există vreun părinte, este returnată o excepție. Acest proces de căutare, poate fi vizualizat ca un somon care sare în amonte pragurile unui râu.

Unul din motivele pentru care ai folosi acest adevărat *lanț prototipal* este acela de a realiza șabloane care structurează funcționalități prin ascunderea sau expunerea anumitor detalii. Acest lucru este posibil prin introducerea de funcții în prototip. Avantajul major al acestui lucru este că funcția este creată o singură dată în obiectul prototip.

Un avantaj extraordinar pe care-l oferă moștenirea prototipală este că odată cu modificarea obiectului prototip, toate funcționalitățile noi vor fi disponibile instantaneu tuturor celor care le moștenesc.

**Moment Zen**: Modificarea obiectului prototipal implică reflectarea instantanee în obiectele care moștenesc din acesta.

Poți reutiliza cod prin moștenire folosind lanțul prototipal care se formează între obiecte și care poate fi interogat prin proprietatea `__proto__`. Proprietatea `__proto__` nu este același lucru cu `prototype`. În cazul lui `__proto__`, acesta indică obiectul prototype al constructorului folosit pentru crearea obiectului instanțiat.

```javascript
const obi = {ceva: 'salve'};// crearea unui obiect
function Salut () {};       // declararea unei funcții
Salut.prototype = obi;      // setarea lui obi drept prototip
const inst = new Salut();   // instanțierea unui obiect
typeof inst.__proto__;      // "object"
typeof inst.prototype;      // "undefined"
typeof inst.constructor.prototype;  // "object"
```

Poți înlocui oricând obiectul cu rol de prototip după instanțierea obiectelor, iar legătura lui `__proto__` va fi la obiectul tocmai înlocuit pentru toate obiectele instanțiate după înlocuire.

**Moment Zen**: Pentru a afla care este obiectul prototipal, vezi care este valoarea lui `__proto__`.

Obiectele instanțiate mai vechi, de dinaintea înlocuirii obiectului prototip, vor avea `__proto__`, care trimite la cel vechi. Constructorul, de fapt, proprietatea `constructor` a noilor obiecte instanțiate după înlocuire, nu va mai returna identificatorul funcției constructor de la care s-a pornit, ci pe `Object()`. Pentru a repara acest lucru, va trebui, manual să fie setată proprietatea constructor:

```javascript
FuncConstr.prototype.constructor = FuncConstr.prototype.constructor;
```

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

De fapt, se poate vorbi de o *delegare comportamentală* și nu de o moștenire în sensul clasic. Obiectele stabilesc legături prototipale prin care se pot face delegări pe lanțul prototipal atunci când se caută ceva.

**Spune standardul**:

> Toate **obiectele ordinare** au «un slot intern» numit `[[Prototype]]`.

Valoarea acestui slot poate fi `null` sau un obiect care va oferi tuturor descendenților funcționalități și valori. `Object.getPrototypeOf()` returnează valoarea din proprietatea internă `[[Prototype]]`, iar `Object.setPrototypeOf()` o schimbă.

Toate obiectele comune au *un slot intern* numit `[[Extensible]]`, care controlează dacă pot fi adăugate sau nu proprietăți la obiect. Dacă valoarea acestui slot este `false`, atunci nu se mai pot adăuga proprietăți noi.

În cazul unui `[[Extensible]]` cu valoarea `false`, valoarea slotului intern `[[Prototype]]` a obiectului, nu poate fi modificată. În plus, de vreme ce a fost pusă pe `false`, nu o mai poți modifica la `true`.

#### Modificarea obiectului prototipal

Acesta este cazul simplu de moștenire care se poate realiza. Dacă avem un obiect, folosești metoda `create()` a obiectului intern `Object` pentru cazul special în care ai nevoie să deturnezi legătura implicită la obiectul prototipal setat de motor și să pui alt obiect cu rolul de prototip.

```javascript
const obiect = {};
Object.getPrototypeOf(obiect); // Object { , 15 more… }
Object.setPrototypeOf(obiect, {ceva: 10});
// Object.getPrototypeOf(produs2) => Object { ceva: 10 }
```

Pentru a evita introducerea a mai multor proprietăți succesiv, mai lesne este elaborarea unui obiect.

```javascript
function Test (val) {
  this.a = 1;
};
Test.prototype = {
  // constructor: Test,
  ceva: function () { console.log(this.a + 2) }
};
var obi = new Test(2);
console.log(obi.constructor.name); // Object
```

Înlocuirea obiectului prototipal al constructorului cu un obiect literal are un efect de care trebuie să țineți cont. Proprietatea `constructor` nu mai trimite către funcția constructor, ci direct către `Object`. Acest lucru se întâmplă pentru că proprietatea `constructor` ține de obiectul `prototype`, nu al instanței.
Pentru a rezolva această redirectare, trebuie introdusă o proprietate `constructor`, care să indice obiectul funcție `Test`.

```javascript
Test.prototype = {
  constructor: Test,
  ceva: function () { console.log(this.a + 2) }
};
```

În contrast cu obiectele instanțiate în baza unui constructor, cele literale vor moșteni automat din `Object.prototype`.

#### Valori comune în `prototype`

Dacă pentru funcțiile definite în obiectul `prototype` știm că vor fi folosite de toate instanțele fără a mai fi redefinite, ce se poate întâmpla în cazul în care în prototip avem valori, care pot fi modificate.

```javascript
var Test = function () {
  this.a = 10;
};
Test.prototype.b = [];
var obi0 = new Test;
var obi1 = new Test;
obi0.b.push('a');
obi1.b.push('b');
console.log(obi0.b); // [ 'a', 'b' ]
console.log(obi1.b); // [ 'a', 'b' ]
```

Acesta este motivul pentru care trebuie acordată o atenție deosebită proprietăților din obiectul prototipal.

### Mantre

-   `[[Prototype]]`, adică proprietatea `.prototype` este o legătură de la un obiect la altul.
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

#### Care este obiectul prototipal

```javascript
// În cazul în care s-a folosit un constructor
ObiectDeLucru.__proto__ // sau cel mai repede
Object.getPrototypeOf(ObiectDeLucru);
```

### Realizarea moștenirii

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

Prin crearea directă a unui obiect literal, se generează o legătură automată către prototipul impus de `Object.prototype`.

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

Uneori ai nevoie să accesezi direct metode sau valori din obiectul prototip de la care moștenești. Soluția *clasică* până la varianta curentă a standardului era să *obții* obiectul prototip de la care moștenește al tău aplicând `Object.getPrototypeOf(this)` chiar pe `this`, iar apoi obținând această referință, vei aplica metoda, dar cu apelare prin `call()` pe obiectul context.

```javascript
Object.getPrototypeOf(this).numeMetodaDinPrototip.call(this); // varianta ES5
super.numeMetodaDinPrototip();                                // varianta ES6
```

După cum observi, această metodă veche a fost prescurtată la `super`, ceea ce reduce din verbozitate. Pentru cei cu ochiul ager, nu-i așa că aduce nițel a Java? Ter`super` este o referință către obiectul prototip al obiectului de lucru curent. Este echivalentul lui `Object.getPrototypeOf(this)`. Nu uita faptul că `Object.getPrototypeOf()` returnează valoarea din proprietatea internă `[[Prototype]]`. Orice referință la `super` folosește proprietatea internă `[[HomeObject]]` pentru a determina pașii următori cum ar fi `Object.getPrototypeOf()` asupra valorii stocate de `[[HomeObject]]` cu scopul de a obține, de fapt prototipul.

```javascript
const obi1 = {
  faceva () {
    return 'ce-i returnat din obi1 ';
  }
};
const obi2 = {
  faAltceva () {
    return super.faceva() + 'este oferită aici';
  }
};
// setezi prototipul lui obi2 la cel a lui obi1.
Object.setPrototypeOf(obi2, obi1);
obi2.faAltceva(); // "ce-i returnat din obi1 este oferită aici"
```

## Obiecte în practică

### Obiecte similare array-ului

Cel mai la îndemână exemplu sunt nodurile DOM. Parcurgerea (traversing) DOM-ului se numește „walking the DOM”. DOM-ul este o colecție de noduri. Cel mai adesea pentru accesarea informației din nodurile de interes, mai întâi acestea trebuie identificate. Se folosesc clasicele:

-   `document.getElementById("#idfolosit")`,
-   `document.getElementsByTagName`,
-   `document.querySelector(`pot fi tag-uri, class, id-uri, attributes, pseudoclase, elemente`)`.
Changes
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

Selecția devine mult mai clară, nefiind afectată de posibilele schimbări aduse nodurilor DOM pentru că acestea sunt dinamice.

```javascript
var lista = document.querySelector('[data-target=\"lista\"]');
var colectia = document.querySelectorAll('[data-target=\"element\"]');

var caAr = [].slice.call(colectia);
console.log(caAr);            // Array[li, li, li]
caAr.forEach(function (elem) {
  console.log(elem);          // <li data-target="element">
});
```

Elementele găsite sunt de fapt o colecție de noduri. Aceste noduri sunt dinamice în sensul că, de fiecare dată când DOM-ul va suferi o modificare, se va actualiza și aceasta. În ES6 există o aceeași abordare: `arrayLike = Array.from(nodes)`. ES6 introduce un nou tip de obiecte iterabile - obiecte ale căror elemente pot fi extrase rând pe rând.

### Obiecte ca dicționare de valori

JavaScript nu are structuri de date specifice unei *hărți* de valori - ceea ce se înțelege în alte limbaje de programare a fi un `map`. Singura modalitate este aceea de a folosi un obiect. În acest caz sunt anumite probleme care trebuie luate în considerare precum durerile de cap pe care le dă moștenirea. Lanțul prototipal care se stabilește, poate afecta citirea proprietăților. Unele operațiuni, se uită la tot lanțul prototipal și *văd* proprietăți moștenite. Alte operațiuni accesează doar proprietățile pe care obiectul le are fără a se uita la cele moștenite. Atunci când folosești un obiect drept colecție (`map`), trebuie operat asupra lui cu mare atenție.

```javascript
const matrița = {proprietate: 'ceva'};
const obiect = Object.create(matrița);
obiect.altaProprietate = 'altceva';
```

### Destructurarea obiectelor

ES6 introduce posibilitatea de a seta variabile cu valorile cheilor unui obiect (*destructuring assignment*). Trebuie respectată o singură cerință: numele identificatorilor variabilelor trebuie să fie identice cu cele ale cheilor proprietăților din obiectul din care sunt luate valorile. Trebuie remarcat faptul că entitatea din partea stângă a egalului nu este un obiect, ci un șablon care reprezintă calea către valoarea căutată în obiectul sursă.

```javascript
const testObj = {ceva: 1, altceva: 2};
const {ceva, altceva:undeva} = testObj;
```

În exemplul prezentat nu numai că am *extras* valorile în variabile, dar am și redenumit identificatorii, dacă numele originale ale cheilor nu sunt dorite. Pot fi extrase mai multe valori odată. În cazul în care numele variabilei se dorește să fie chiar proprietatea, atunci putem menționa explicit numele identificatorului să fie cel al cheii din obiect.

```javascript
var {ceva: ceva} = obi1;
var {altceva: altceva} = obi2;
console.log(ceva, altceva); // 10 text
```

Putem aplica forma simplificată și vom ajunge la o formă pe care o veți întâlni foarte adesea în lucrul cu modulele. Forma simplificată a lui `var {altceva: altceva} = obi` este `var {altceva} = obi`. Câtă vreme vei urma structura unui obiect indiferent de adâncimi, vei putea extrage valori în variabilele dorite.

```javascript
const obi = {
  ceva: {
    altceva: [
      {cineva: 'Ionuț'}
    ],
    câte: 10
  }
}
obi.ceva.altceva[0].cineva;
var {ceva: {altceva: [{cineva}]}} = obi;
console.log(cineva); // Ionuț
```

Dacă vrem să privim obiectele precum depozite de valori identificate prin numele cheilor, atunci cu siguranță că atribuirea prin destructurare va fi o binecuvântare.

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

Ceea ce se întâmplă este că se vor genera identificatori cărora li se vor atribui valorile din obiect. Poți percepe această operațiune ca pe un transfer din mediul lexical al unui obiect, în mediul lexical dorit. Trebuie ca numele identificatorilor să fie identic cu cel al proprietăților obiectului din care se face *transferul* valorilor, dar se poate face și cu modificarea numelor variabilelor, dacă acest lucru este necesar.

```javascript
const obi = {unu: 1, doi: 2};
const {unu: prima, doi: aDoua} = obi;
console.log(prima, aDoua); // 1 2
```

La fel de bine ar merge și atribuirea directă cu singura condiție ca expresia să fie în interiorul unui operator de grupare.

```javascript
( {a,b,c} = obi );
```

Dacă nu este introdus între paranteze rotunde, motorul JavaScript va considera acoladele ca un bloc de cod distinct. La *transferul* valorilor este foarte posibil să aplici o modificare a valorilor preluate din obiect.

```javascript
const {unu = 10, doi = 100} = {unu: 1000};
console.log(unu); // 1000
```

Se pot suprascrie valorile unor variable cu valorile proprietăților unui obiect prin mecanismul de destructurare.

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

În cazul în care se va face o destructurare pe un obiect care nu are nicio proprietate sau care nu are proprietaea dorită, vei obține valoarea `undefined` pentru variabilă.

```javascript
var {nuexistă} = {};
console.log(nuexistă); // undefined
```

#### Valori din oficiu

Atribuirea de valori din oficiu se dovedește foarte utilă atunci când încerci să faci o destructurare pe un obiect gol sau care nu are proprietatea dorită.

```javascript
var {nuexistă = false} = {};
console.log(nuexistă); // false
```

Poți seta chiar mesaje.

```javascript
const {proprietateDorită: eroare = "Nu am obținut nimic"} = {};
console.log(eroare); // Nu am obținut nimic
```

#### Array-ul ca obiect destructurat

Destructurarea funcționează foarte bine și în cazul array-urilor, care la rândul lor sunt obiecte. Acest subiect este tratat la capitolul dedicat obiectului intern `Array`.

În cazul array-urilor este necesară respectarea parității numelor identificatorilor cu cea a cheilor, pentru că nu mai avem chei. Potrivirea se va face în ordinea elementelor din array. Pentru a aduna ce-a mai rămas, am folosit și operatorul *spread* pentru a strânge restul elementelor într-un array.

```javascript
const arr = [1, true, function y () {return 'salut'}, 10, 20];
const [nr, bool, igrec, ...valori] = arr;
console.log(nr); // 1
console.log(bool); // true
console.log(igrec()); // salut
console.log(valori); //[Array] [10,20]
```

Un alt caz interesant de destructurare este atunci când atribui unei structuri de identificare un întreg obiect. În acest caz, pentru a constitui identificatorul, trebuie introdusă în expresia de destructurare adresa întreagă către acel obiect.

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

Am stabilit deja faptul că atunci când ai nevoie să mergi la originile unui anumit obiect, adică să identifici cum a fost creat, în cazul celor care au fost instanțiate în baza unui constructor, vom testa acest lucru folosind operatorul `instanceof`. Acest operator va indica prin `true` sau `false`, dacă un obiect este de tipul unui anumit constructor. În cazul obiectelor care au fost create folosind o declarație literală sau folosind constructorul intern `Object`, relația va fi dezvăluită prin interogarea proprietății `.constructor.name`, care va indica `Object`, iar în cazul constructorilor numele funcției cu rol de constructor. Pentru că proprietatea `name` a proprietății `constructor` poate fi suprascrisă, buna practică spune ca testarea să se facă folosind operatorul `instanceof`.

### Testare cu operatorul `in`

Pentru a testa dacă o proprietate există se poate folosi operatorul `in`. Problema cu `in` este aceea că ia în calcul și ceea ce este în obiectul prototipal din care se moștenește.

```javascript
'altaProprietate' in obiect; // true
// din nefericire in se uită și în prototip
'toString' in obiect; // true -> e foarte rău
// pentru că se uită și în Object.prototype.
'proprietate' in obiect; // true
```

### Testare cu `Object.hasOwnProperty()`

Pentru a verifica dacă o proprietate aparține obiectului se va folosi `Object.hasOwnProperty()`:

```javascript
obiect.hasOwnProperty('altaProprietate'); // true
obiect.hasOwnProperty('proprietate'); // false
obiect.hasOwnProperty('toString'); // false
```

### Testare cu `getOwnPropertyNames`

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

### Testare cu `for...in`

Dacă folosești un `for...in` vei obține toate cheile, adică și pe cele din prototip. Deci, nu funcționează corect. De ce se întâmplă acest lucru? Pentru că sunt luate în considerare și proprietățile moștenite prin prototip, care sunt setate ca `enumerable`. Motivul pentru care proprietățile lui `Object` nu apar este că acestea nu sunt `enumerable`.

```javascript
for (key in obiect) console.log(key);
// altaProprietate
// proprietate
```

### Accesează și citește cheile

Pentru a avea acces la cheile unui obiect și numai la cheile pe care respectivul obiect le deține, se va folosi `Object.keys(obiect)`.

```javascript
Object.keys(obiect); // Array [ "altaProprietate" ]
```

#### Obținerea valorii unei proprietăți

Dacă vrei să obții numele tuturor proprietăților, se va folosi `Object.getOwnPropertyNames(obiect)`;

```javascript
obiect.artefact = ['vază', 'statuetă'];
Object.keys(obiect); // Array [ "altaProprietate", "artefact" ]
```

#### Obținerea numelor proprietăților

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

## Extinderea obiectelor

Obiectelor li se pot adăuga proprietăți și metode pentru a le extinde funcționalitatea. Extinderea unui obiect este simplă atunci când software-ul este scris de o singură persoană sau atunci când este singurul stăpân al codului. Lucrurile se complică atunci când trebuie să îmbogățești funcționalitățile unui obiect cu unele care au fost scrise deja și care au nevoie doar de o preluare în propriul obiect. De fapt, acesta este și scopul. Să preiei ceea ce a fost scris deja de alții pentru a realiza un compus software mult mai valoros.

### Ce este un mixin

Este un obiect care îmbogățește obiectul `this` cu funcții și obiecte aparținând altor obiecte. La final, rezultă un obiect nou care este o variantă *extinsă* a obiectului original. Atenție, obiectul rezultat va îngloba referințe, nu obiectele în sine, care vor continua să existe separat.

Pornești de la un obiect pe care vrei să-l *mixezi* cu un altul.

```javascript
const functiiCerc = {
  arie: function facAria () { return Math.PI * this.raza * this.raza },
  creste: function crescRaza () { this.raza++; },
  descreste: function descrRaza () { this.raza--; }
};
```

Pentru a simplifica adăugarea metodelor și proprietăților, se poate scrie o funcție specializată, care preia din primul argument obiectul cu a cărui proprietăți îl vom *îmbogăți* pe cel menționat la al doilea parametru. Sunt două cazuri aici. Primul în care dorim să preluăm și proprietățile moștenite din obiectul prototipal al obiectului cu care îl extindem pe cel dorit sau doar propriile proprietăți. Pentru primul caz nu vom verifica cu `hasOwnProperty`, precum în exemplu.

```javascript
function extinde (obi, obiSursa) {
  let x;
  for (x in obiSursa) {
    obi[x] = obiSursa[x];
  };
  return obi;
};
```

Pentru cel de-al doilea caz, vom verifica cu `hasOwnProperty` pentru a nu moșteni și proprietățile din obiectul prototipal.

```javascript
function extinde (obi, obiSursa) {
  let x;
  for (x in obiSursa) {
    // trebuie să testăm pentru a prelua doar proprietățile proprii
    if ( obiSursa.hasOwnProperty(x) ) {
      obi[x] = obiSursa[x];
    };
  };
  return obi;
};
```

Această funcție poate fi invocată pentru a extinde funcționalitatea prototipului unui alt obiect. O astfel de extindere ar fi:

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
  return obi;
};
```

În acest caz se creează un nou obiect cu `this` (de fapt, face o copie a lui însuși), la care bucla `for` adaugă proprietățile de la obiectul care se dorește a fi integrat. De fapt, din punct de vedere tehnic, se face o copie a referințelor către proprietățile obiectului de integrat. Astfel se face extinderea obiectului original.

Dacă funcțiile definite de un *mixin* sunt destinate a fi folosite de un alt obiect, se pune întrebarea dacă nu ar fi mai simplă apelarea mixin-ului într-un `call()`.

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
cerc1.arie();
```

### Fuzionarea obiectelor

Uneori vei fi împins(ă) de nevoie să fuzioneze elementele mai multor obiecte într-unul singur. Ai putea lua abordarea construirii unui obiect nou căruia să-i adaugi unul câte unul fiecare membru al tuturor obiectelor pe care dorești să le fuzionezi. Asta ar fi o abordare naivă consumatoare de timp. Ai putea folosi `Object.assign` în combinație cu operatorul spread pentru a fuziona obiectele și ar funcționa foarte bine.

```javascript
Object.assign({
  ...primulObiect,
  ...aldoileaObiect,
  ...altreileaObiect
});
```

Din fericire există o a treia cale prin care operatorul spread care oferă o rezolvare instantanee.

```javascript
const fuzionat = {
  ...primulObiect,
  ...aldoileaObiect,
  ...altreileaObiect
}
```

## Transformarea obiectelor

### Redenumirea unei chei și crearea unui obiect nou

Nu există o metodă prin care să modifici numele unei proprietăți al unui obiect existent fără să creezi un obiect nou. Următorul exemplu implică parcurgerea setului de chei al unui obiect. Pentru cheia dorită se face înlocuirea.

```javascript
const obiectNou = ({oldObj, oldKey, newKey}) => {
  const keys = Object.keys(oldObj);
  const newObj = keys.reduce((acc, val) => {
    if(val === oldKey){
        acc[newKey] = oldObj[oldKey];
    }
    else {
        acc[val] = oldObj[val];
    }
    return acc;
  }, {});

  return newObj;
};
```

Exemplul a fost preluat de la [JS rename an object key, while preserving its position in the object](https://stackoverflow.com/questions/48082071/js-rename-an-object-key-while-preserving-its-position-in-the-object).

O altă idee preluată de la [JavaScript: Object Rename Key](https://stackoverflow.com/questions/4647817/javascript-object-rename-key) implică crearea unei noi metode în obiectul prototip al obiectului intern `Object`, care să permită redenumirea unei proprietăți.

```javascript
Object.defineProperty(
    Object.prototype,
    'renameProperty',
    {
        writable : false, // Să nu poată fi modificată acestă proprietate
        enumerable : false, // Nu va apărea într-un for-in loop.
        configurable : false, // Nu poate fi ștearsă cu operatorul delete
        value : function (oldName, newName) {
            // Dacă identificatorii proprietății sunt aceiași, e noop
            if (oldName === newName) {
                return this;
            }
            // Verifică numele vechi al proprietății
            // pentru a evita o eroare ReferenceError în strict mode.
            if (this.hasOwnProperty(oldName)) {
                this[newName] = this[oldName];
                delete this[oldName];
            }
            return this;
        }
    }
);
```

O versiune mult simplificată ar fi cea prezentă în gist-ul [renameProperty.js](https://gist.github.com/TimLang/9636789)

```javascript
Object.prototype.renameProperty = function (oldName, newName) {
    if (this.hasOwnProperty(oldName)) {
        this[newName] = this[oldName];
        delete this[oldName];
    }
    return this;
};
```

O variantă pusă la dispoziție de [30secondsofcode](https://www.30secondsofcode.org/js/s/rename-keys/) extinde posibilitatea de a modifica numele mai multor proprietăți dacă acest lucru este necesar.

```javascript
const renameKeys = (keysMap, obj) =>
Object.keys(obj).reduce(
  (acc, key) => ({
    ...acc,
    ...{ [keysMap[key] || key]: obj[key] }
  }),
  {}
);
```

Funcția primește ca prim argument un obiect a cărui proprietăți sunt identificatorii vechi, iar valorile pentru fiecare sunt numele noilor proprietăți. Al doilea obiect este cel original. Funcția returnează un obiect nou.

## Resurse

- [Crockford on Javascript - Functions](https://www.youtube.com/watch?v=lVnnxfdLdlM)
- [A fresh look at JavaScript Mixins, de  Angus Croll](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/)
- [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
- [Object-oriented JavaScript: A Deep Dive into ES6 Classes](https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)
- [What is the definition of “interface” in object oriented programming](https://stackoverflow.com/questions/2866987/what-is-the-definition-of-interface-in-object-oriented-programming)
- [Classes, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Inside V8: weak collections, ephemerons, and private fields by Sigurd Schneider | JSCAMP 2019](https://www.youtube.com/watch?v=MQsUiqVCJMc&fbclid=IwAR3ybYMW2jDnNTA39t9qVph6HELfbguoynnLP9FOSnsDw5tTVHZ43pjC1Z8)
- [Public and private class fields](https://v8.dev/features/class-fields)
- [30 Seconds of Code: How to rename multiple object keys in JavaScript](https://medium.com/free-code-camp/30-seconds-of-code-rename-many-object-keys-in-javascript-268f279c7bfa)
- [Immutably Rename Object Keys in Javascript](https://medium.com/front-end-weekly/immutably-rename-object-keys-in-javascript-5f6353c7b6dd)
- [renameKeys | 30secondsofcode/js](https://www.30secondsofcode.org/js/s/rename-keys/)
- [Garbage collection | https://javascript.info/](https://javascript.info/garbage-collection)
- [The lazy-loading property pattern in JavaScript | Nicholas C. Zakas | humanwhocodes.com](https://humanwhocodes.com/blog/2021/04/lazy-loading-property-pattern-javascript/)
