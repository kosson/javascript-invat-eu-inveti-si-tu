# Relația între stivă, event loop și API-uri pentru a permite asincronicitatea

## Bucla evenimentelor

Programarea bazată pe evenimente este o paradigmă înscrisă practicii de zi cu zi legat de manipularea DOM-ului (Document Object Model). Modelul bazat pe evenimente mai este cunoscut și ca un model de gestionare a tuturor solicitărilor de preluare a controlului, în engleză numit *concurency model*. Chiar despre asta este și vorba: despre gestionarea intereselor concurente la momentul evaluării codului.
În acest sens, este nevoie de un mecanism de gestiune a evenimentelor care să fie capabil să pună ordine. Îți poți închipui povestea concurențială precum o busculadă care s-a creat la poarta unui magazin de Black Friday. Din fericire, există ofițeri de securitatea care ordonează accesul. Bucla evenimentelor împreună cu stiva pot fi considerați agenții noștri de securitate.

## Asincronicitate

Comportamentul asincron este permis de relația dintre runtime-ul JavaScript, stiva de apeluri și API-urile web. Fiecare dintre aceste componente reprezintă tot atâtea fire de execuție.

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
}; prelucrarePerElement (colectie, procesor);
function afisare (element) {
  console.log(`Am pe: ${element}`);
}; prelucrarePerElement (colectie, afisare);
```

Lucrurile se simplifică drastic dacă folosim utilitarul `forEach` pus la dispoziție de obiectul global `Array`. Nu mai trebuie să creăm noi funcția de `prelucrarePerElement`.

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

Și pentru că știu că-ți place eleganța, îți voi arăta o variantă și mai elegantă prin folosirea „arrow functions”.

```javascript
var colectie = ['unu', 'doi', 'trei'];
colectie.forEach( element => console.log(`Am pe: ${element}`));
```

Pentru că am văzut mecanismele simple care stau la baza lucrului asincron, vom simula asincronicitatea utilizând utilitarul `setTimeout`, care ia un callback și valoarea de timp exprimată în milisecunde.

```javascript
setTimeout (() => {
  console.log('Hop și eu mult după');
}, 5000);
console.log('Eu între timp m-am executat');
```

Pe scurt ceea ce se întâmplă este că log-ul intern din callback-ul lui setTimeout, a fost deferit spre execuție cinci secunde mai târziu unui API intern motorului JavaScript în vreme ce codul care urma a setTimeout-ului a fost evaluat fără a mai aștepta finalizarea celui anterior. Este un fel de „valoarea vine, când vine”.

Din nefericire, modelul asincronicității construit pe callback-uri conduce la un anumit fenomen de aglomerare în care vei folosi un callback în interiorul unui alt callback și așa mai departe pentru atingerea unui anumit model funcțional.

## Mediul de execuție - execution environment

DOM-ul (este în sine o microplatformă), interpretorul, componenta de networking și toate celelalte părți componente ale unui browser alcătuiesc mediul de execuție.

## Stiva apelurilor - CALLSTACK

Contextul de execuție este un mecanism pentru a ține evidența evaluării codului la momentul în care acesta este rulat.

Când arunci privirea la ceea ce se petrece atunci când este rulat codul, imaginea se numește „running execution context”, ceea ce am putea traduce în română ca fiind **contextul de execuție în efect**. Pe scurt, **ce rulează pe moment**.

Evaluarea codului care se face într-un „context de execuție” în plină desfășurare, care se poate suspenda în momentul în care o altă funcție este apelată în interiorul celei care este deja în execuție. În acest moment special de întrerupere un alt context de execuție devine „context de execuție în efect” și astfel va purcede la evaluarea propriului cod. Mai târziu, codul suspendat poate redeveni la rândul său „contextul de execuție în efect” pentru că ceea ce l-a întrerupt s-a încheiat și să reia evaluarea codului de la momentul de unde s-a oprit. Această succesiune a contextelor de execuție în efect este gestionată cu ajutorul unei structuri de date speciale.

Structura de date care ține evidența funcțiilor care sunt în execuție, se numește **stiva apelurilor** - **call stack**.

Funcțiile în JavaScript permit argumente care la rândul lor sunt funcții. Numim funcțiile care permit acest lucru funcții de ordin înalt (**higher order functions**). Unele funcții care intră ca argumente sunt gândite să aibe au un comportament special în sensul că așteaptă până la încheierea execuției funcției și din acel moment își încep execuția. Acestea se numesc callback-uri. Callback-urile au un caracter sincron (`[].foreach(callback`)) și la nevoie asincron (`websocket.connect(callback)`) în ceea ce privește execuția.

![Explicarea mecanismului de folosire a Event Loop în cazul apelurilor asincrone](asyncCuTimeOut.svg)

Pentru programarea execuției unui callback după ce întreg programul a fost executat și stiva este goală se poate forța cu un setTimeout având al doilea argument 0.

```javascript
setTimeout(function cb(){
  console.log('după');
}, 0);
```

# Referințe

Acest material a fost inspirat de prezetarea lui Philip Roberts: [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) de la JSConf EU 2014. Instrumentul de simulare „Loupe” este la [acest link](http://latentflip.com/loupe).

[Wikipedia Call stack](https://en.wikipedia.org/wiki/Call_stack)

[Concurrency model and Event Loop](https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop)

[Understanding the Node.js Event Loop](https://nodesource.com/blog/understanding-the-nodejs-event-loop/)

[Callback Hell](http://callbackhell.com/)
