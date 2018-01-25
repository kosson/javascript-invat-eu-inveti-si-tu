# Relația între stivă, event loop și API-uri

Am amintit deja faptul că un programator se poate asemui unui pilot în carlingă, fiind cel responsabil de felul în care va fi executat planul de zbor. La momentul în care povesteam despre modul în care poți face salturi în cod după anumite condiții, spuneam că este necesară buna înțelegere a funcțiilor. Continuăm acum pentru că aceste cunoștințe le-ai dobândit. Există un concept fundamental pentru a înțelege în adâncime programarea în JavaScript și nu numai. Acesta este cel de **control**. Adeseori veți auzi, viziona sau citi despre faptul că o anumită funcție este executată de control sau acesta este redat unei funcții deja aflată în execuție.

Controlul, de fapt este firul de execuție care evaluează în succesiune fragmentele de cod.

Limbajul nostru de programare are un set foarte important de funcții gata pentru a fi utilizate și mulți programatori numesc aceste funcții părți ale API-ului JavaScript. Ce este API? Este acronimul de la Application Programming Interface (Interfață de programare pentru aplicații), care este un set de conectori/funcțioanlități ale unui software. Aceste funcționalități sunt puse la dispoziția unui programator pentru a folosi o aplicație ca parte dintr-o suită sau pur și simplu de a manipula date fără să fie nevoit să apeleze la vreo interfață. Poți asemui funcționalitățile expuse ale unui API precum manetele și butoanele unui cockpit. Nu trebuie să știi toate părțile componente ale avionului pentru a-l face să zboare. În plus, precum în cazul avioanelor, există un manual detaliat pentru fiecare intrument. Așa și JavaScript oferă câteva funcții. Una dintre ele am folosit-o deja pentru a sonda rezultatele execuției fragmentelor de cod: `console.log()`. Aceasta face parte din API-urile Web puse la dispoziție de fiecare browser. Pentru a vedea câte instrumente există, nu ar fi rău să aruncați o privire la documentația existentă pe Mozilla Developer Network, https://developer.mozilla.org/en-US/docs/Web/API.

O funcție poate fi pasată ca valoare a unui argument unei alteia pentru a fi executată de îndată ce a fost evaluat codul din corpul funcției care a primit-o.

Vom dedica timp separat pentru a înțelege callback-urile, dar acum ne vom focaliza atenția chiar pe conceptul de **timp**.
Controlul evaluării codului beneficiază de **un singur fir de execuție**. Indiferent cât de multe apeluri de funcție sunt făcute, doar una singură este în evaluare, iar restul așteaptă cuminți la rând într-o **stivă**. Privitor la firele de execuție, API-urile puse la dispoziție de browser au propriile fire  separate de cel principal.

Pentru a gestiona comportamentul complex al apelurilor și al timpilor de execuție, motorul de JavaScript are la dispoziție două mecanisme interne: **stiva de apeluri** (*callstack* în engleză) și **bucla de evenimente** (*event loop* în engleză). Coroborarea celor două mecanisme permite rularea codului complex al oricărei aplicații JavaScript. Din acest motiv este necesară înțelegerea în adâncime a felului în care funcționează.

Rularea unui program în firul de execuție, neutilizând API-urile browserului, este un program care va rula secvență cu secvență în ordinea intenționată de programator. Acest aspect descrie execuția ca fiind una **sincronă**. Aceste cazuri sunt rare, de cele mai multe ori se aplică framentelor de cod explicate într-un manual de programare.

Realitatea unor mari aplicații ține de gestionarea mai multor fire de execuție; a celui principal al programului și ale API-urilor puse la dispoziție de mediul creat de browser. Înțelegerea aspectelor complexe la rularea într-un astfel de model ține de caracterul **asincron** al execuției. Marea majoritate a software-ului JavaScript existent este scris pentru a rula asincron.

Îți voi da numai un singur exemplu elocvent. Gândește-te la faptul că vei dori manipularea unei pagini web, care, de fapt, este un arbore dinamic de noduri a ceea ce numim **Document Object Model**. La un moment dat, un utilizator, dă un click pe un element al paginii. Asociat elementului acționat prin click trebuie să ai un mecanism de ascultare și o funcție din program care să pornească execuția la momentul click-ului. Utilizatorului îi este returnat un rezultat la finalizarea execuției funcției acționate (în jargonul programării web se numește **event handler**). Toate acestea, fără să te simți copleșit se subscriu caracterului asincron al programelor JavaScript. Acest aspect este, de fapt, cel pentru care JavaScript are valoarea sa actuală.

## Asincronicitate în prelucrarea datelor

Comportamentul asincron este permis de relația dintre runtime-ul JavaScript, stiva de apeluri și API-urile web. Luate individual, aceste componente reprezintă tot atâtea fire de execuție generate de mediul browserului.
Să presupunem că avem o colecție de elemente pe care dorim să le iterăm și pentru fiecare element să-i aplicăm o funcție.

```javascript
var colectie = ['unu', 'doi', 'trei'];
function procesor (element) {
  console.log(element);
};
for (let x = 0; x < colectie.length; x++) {
  procesor(colectie[x]);
}; /* unu doi trei*/
```

În cazul în care pentru fiecare element ai dori să faci mult mai multe lucruri, poți apela la un callback, care va împlini toate sarcinile și abia la final va face procesarea elementului din colecție. În acest caz, vom construi o funcție specială care ia drept argumente colecția și drept callback, o altă funcție care trebuie să fie aplicată pe fiecare element al colecției. Ceea ce permite astfel de model de lucru este ca funcția callback să fie una diferită în funcție de necesități.

```javascript
var colectie = ['unu', 'doi', 'trei'];
function procesor (element) {
  console.log(element);
};
function prelucrarePerElement (arr, modificator) {
  for (let x = 0; x < arr.length; x++) {
    modificator(arr[x]);
  };
};
prelucrarePerElement (colectie, procesor);
```

Lucrurile se simplifică drastic dacă folosim utilitarul `forEach` pus la dispoziție de prototipul obiectului intern `Array`. Nu mai trebuie să creăm noi funcția de `prelucrarePerElement`.

```javascript
var colectie = ['unu', 'doi', 'trei'];
function procesor (element) {
  console.log(element);
};
colectie.forEach(procesor);
function afisare (element) {
  console.log(`Am pe: ${element}`);
};
colectie.forEach(afisare);
```

Simți să s-ar putea simplifica și mai mult? Da, ai dreptate, pur și simplu am putea folosi în locul callback-ului o funcție anonimă care să facă prelucrarea. Astfel, am putea renunța din verbozitatea codului prin declararea funcțiilor cu nume.

```javascript
var colectie = ['unu', 'doi', 'trei'];
colectie.forEach(function (element) {
  console.log(`Am pe: ${element}`);
});
```

Și pentru că unora le place eleganța, îți voi arăta o formă și mai prescurtată prin folosirea „arrow functions”.

```javascript
var colectie = ['unu', 'doi', 'trei'];
colectie.forEach( element => console.log(`Am pe: ${element}`));
```

Pentru că am văzut mecanismele simple care stau la baza lucrului asincron prin exemplele anterioare, vom simula asincronicitatea utilizând utilitarul `setTimeout` al browserului, care ia un callback și valoarea de timp exprimată în milisecunde cu care dorim să introducem o întârziere, o **amânare** (în engleză am zice că execuția funcției este *deferred* - amânată).

```javascript
setTimeout (() => {
  console.log('Hop și eu mult după');
}, 5000);
console.log('Eu între timp m-am executat');
```

Pe scurt, ceea ce se întâmplă este că apelarea lui `console.log` intern din callback-ul lui `setTimeout`, a fost *amânat* la execuție cinci secunde mai târziu unui API intern motorului JavaScript în vreme ce codul care urma a `setTimeout`-ului a fost evaluat fără a mai aștepta finalizarea celui anterior. Este un fel de „valoarea vine, când vine”.

Din nefericire, modelul asincronicității construit pe callback-uri conduce la un anumit fenomen de aglomerare în care vei folosi un callback în interiorul unui alt callback și așa mai departe pentru atingerea unui anumit model funcțional.

## Mediul de execuție - execution environment

**DOM**-ul (este în sine o microplatformă), interpretorul, componenta de networking și toate celelalte părți componente ale unui browser alcătuiesc mediul de execuție.

## Bucla evenimentelor - event loop

Programarea bazată pe evenimente este o paradigmă înscrisă practicii de zi cu zi tradițional legată de manipularea **DOM**-ului (*Document Object Model*). Modelul bazat pe *evenimente* mai este cunoscut și ca un model de gestiune a tuturor solicitărilor de preluare a controlului, în engleză numit *concurency model*. Chiar despre asta este și vorba: despre gestionarea intereselor concurente la momentul evaluării codului.
În acest sens, este nevoie de un mecanism de gestiune a evenimentelor care să fie capabil să pună ordine. Îți poți închipui povestea concurențială precum o busculadă care s-a creat la poarta unui magazin de Black Friday. Din fericire, există ofițeri de securitatea care ordonează accesul. Bucla evenimentelor împreună cu stiva pot fi considerați agenții noștri de securitate.
Sunt necesare câteva lămuriri importante. Evaluarea codului din corpul unei funcții începe la momentul apelării. Atunci când o funcție este apelată, aceasta creează un *eveniment*.

Bucla evenimentelor are caracteristica unui tub cu jetoane. Fiecare jeton reprezintă o un eveniment care are o întindere în timp. Această stivă de apeluri funcționează pe principiul primul intrat este și primul ieșit. Ce se întâmplă când acțiunea unui jeton nu s-a încheiat încă, dar între timp un alt apel s-a făcut? Pur și simplu jetonul este împins mai jos în stivă pentru a-i face loc celui nou. Dacă cel nou are și el un timp de execuție, primul jeton va aștepta până când ultimul a terminat treaba și a fost scos.

Pentru a ține ordinea execuției funcțiilor, este necesar un mecanism special în acest sens. Numim acest mecanism *stiva apelurilor*.

## Stiva apelurilor - callstack

Când arunci privirea la ceea ce se petrece atunci când este rulat codul, imaginea poartă numele de **running execution context**, ceea ce am putea traduce în română ca fiind **contextul de execuție în efect**. Pe scurt, **ce rulează pe moment**.

Evaluarea codului care se face într-un „context de execuție” în plină desfășurare, care se poate suspenda în momentul în care o altă funcție este apelată în interiorul celei care este deja în execuție. În acest moment special de întrerupere un alt context de execuție devine „context de execuție în efect” și astfel va purcede la evaluarea propriului cod. Mai târziu, codul suspendat poate redeveni la rândul său „contextul de execuție în efect” pentru că ceea ce l-a întrerupt s-a încheiat și să reia evaluarea codului de la momentul de unde s-a oprit. Această succesiune a contextelor de execuție în efect este gestionată cu ajutorul unei structuri de date speciale.

Structura de date care ține evidența funcțiilor care sunt în execuție, se numește **stiva apelurilor** - **call stack**. Să analizăm următoarea secvență de cod foarte simplă:

```javascript
function faOri (x, y) {
  return x * y;
};
function oriDoi (nr) {
  var rez = faOri(nr, nr);
  console.log(rez);
};
oriDoi(10);
```

![](CallStack.png)

Funcțiile în JavaScript permit argumente care la rândul lor sunt funcții. Numim funcțiile care permit acest lucru funcții de ordin înalt (**higher order functions**). Unele funcții care intră ca argumente sunt gândite să aibe au un comportament special în sensul că așteaptă până la încheierea execuției funcției și din acel moment își încep execuția. Acestea se numesc callback-uri. Callback-urile au un caracter sincron (`[].foreach(callback`)) și la nevoie asincron (`websocket.connect(callback)`) în ceea ce privește execuția.

![Explicarea mecanismului de folosire a Event Loop în cazul apelurilor asincrone](asyncCuTimeOut.svg)

Pentru programarea execuției unui callback după ce întreg programul a fost executat și stiva este goală se poate forța cu un setTimeout având al doilea argument 0.

```javascript
setTimeout(function cb(){
  console.log('după');
}, 0);
```

# Referințe

1. Acest material a fost inspirat de prezetarea lui Philip Roberts: [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) de la JSConf EU 2014. Instrumentul de simulare „Loupe” este la [acest link](http://latentflip.com/loupe).
2. [Wikipedia Call stack](https://en.wikipedia.org/wiki/Call_stack)
3. [Concurrency model and Event Loop](https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop)
4. [Understanding the Node.js Event Loop](https://nodesource.com/blog/understanding-the-nodejs-event-loop/)
5. [Callback Hell](http://callbackhell.com/)
