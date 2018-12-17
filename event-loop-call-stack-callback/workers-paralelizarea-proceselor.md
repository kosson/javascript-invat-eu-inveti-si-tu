# Paralelism

Acest principiu al prelucrării în paralel este pus în practică prin [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). Web workers sunt fire de execuție ale sistemului de operare cărora le putem delega executarea codului JavaScript asociat într-o manieră cu adevărat paralelă.

Am putea enunța că delegăm sistemul de operare să gestioneze execuția de cod JavaScript. Web workers folosesc interfața `EventTarget` a browserului. Acest lucru implică faptul că mecanismul de comunicare a datelor cu firul principal de execuție este asigurat prin evenimente. Trimiterea datelor către web workeri se face prin simplul apel de metodă ceea ce declanșează un eveniment al cărui cod asociat se execută în firul worker-ului.

Atunci când o pagină de browser creează un worker, acesta este specific acelei pagini. Când pagina se închide, vor dispărea și workerii. Workerii creează un obiect global diferit de `window`.

Din workeri nu poți manipula direct DOM-ul și nici nu poți apela unele metode și proprietăți pe care `window` îi pune la dispoziție. Poți folosi totuși [o parte](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers) din ceea ce oferă `window`, cum ar fi `WebSockets` și `IndexedDB`.

Datele sunt vehiculate între firul principal de execuție și worker printr-un sistem de mesaje folosind metoda `postMessage()`. Mesajele sunt semnalate firelor de execuție prin apariția de evenimente `onmessage`. Pentru a comunica cu resursele web, worker-ii folosesc  `XMLHttpRequest` (atributele `responseXML` și `channel`).

## Alte tipuri de workeri

**Sub-workers**

Acești workeri sunt creați de workeri în cazul în care trebuie să rezolve sarcini care ar beneficia de paralelism. Sub-workerii nu comunică direct cu firul principal de execuție.

**Workeri partajați**

Acești workeri sunt cei care sunt partajați între mai multe pagini sau mai multe scripturi. Pot fi văzute ca obiecte tip Singleton care pot păstra o stare între diferite contexte de navigare. Folosirea unui worker partajat evită descărcarea acelorași resurse în mai multe pagini web ale aceleiași aplicații.

Cele două tipuri de workeri creează obiecte globale separate:

- `DedicatedWorkerGlobalScope` - un obiect global specific unui worker și
- `SharedWorkerGlobalScope` - obiectul global al unui worker partajat.

## Crearea unui worker

Inițierea unui worker se face folosind un constructor căruia îi pasezi scriptul pe care dorești să-l execuți folosind acest context separat.

```javascript
var work = new Worker('numeScript.js');
worker.onmessage = function (event) {
  document.getElementById('result').textContent = event.data;
};
```

## Ștergerea unui worker

Pentru a elimina un worker, apelezi metoda `terminate()` pe identificatorul său.

```javascript
work.terminate();
```

## Comunicarea cu workerul

Pentru a pasa date webworker-ului vom folosi metoda `postMessage()`. Pentru a avea un răspuns, worker-ul trebuie să aibă un *event handler* pentru evenimentul apărut.

```javascript
// lansează un nou worker
var worker = new Worker('worker.js');
// trimiterea unui mesaj
worker.postMessage('Salut, fir principal!');
```

Datele care pleacă din firul principal către worker trebuie mai întâi să fie serializate, iar la momentul în care ajung în firul de execuție a worker-ului, acestea sunt deserializate și sunt folosite ca primitive JavaScript. Acest lucru înseamnă că putem trimite obiecte JSON, dar nu putem trimite o funcție sau o clasă. Conținutul fișierului worker.js trebuie să cuprindă un *event handler*.

```javascript
addEventListener('message', (event) => {
  console.log(event.type, `"${event.data}"`);
});
```

Ca să trimiți un mesaj în firul principal, din worker pur și simplu apelezi de-a dreptul metoda `postMessage('Mesaj')`. Putem investiga ceea ce se poate trimite din și în worker.

```javascript
worker.postMessage({ceva: 'un obiect'});
worker.postMessage([2,4,6]);
```

## Partajarea stării aplicației

Pentru a trimite date către *shared workers*, este nevoie de a folosi porturi. Dacă am avea un *shared worker* care este folosit de trei taburi ale browserului, toate acestea trebuie să deschidă porturi care să asigure comunicarea cu acesta.

```javascript
/*Pagina web*/
var worker = new SharedWorker('scriptWorker.js');
worker.port.addEventListener('message', (event) => {
  console.log('M-am legat la ', event.data);
});
worker.port.start();
```

Evenimentul *connect* este declanșat la momentul când o pagină se conectează la worker-ul partajat. Proprietatea `source` este de fapt portul, obiectul port care va fi deschis. Metoda `start()` spune *shared worker*-ului că este deschisă comunicarea (similar unui handshake de conexiune TCP). Portul este folosit pentru a ține minte care pagină a deschis conexiunea.

```javascript
/*scriptWorker.js*/
var conexiuni = 0;
addEventListener('connect', (event) => {
  event.source.start();
  event.source.postMessage(++conexiuni);
});
```

## Utilitate

În web workers poți încărca scripturi care sunt utilitare necesare aplicației principale sau poți încărca biblioteci de cod.

## Resurse

https://html.spec.whatwg.org/multipage/workers.html#workers
