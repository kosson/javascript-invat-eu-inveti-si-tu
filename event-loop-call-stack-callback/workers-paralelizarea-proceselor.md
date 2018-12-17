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



## Utilitate

În web workers poți încărca scripturi care sunt utilitare necesare aplicației principale sau poți încărca biblioteci de cod.

## Resurse

https://html.spec.whatwg.org/multipage/workers.html#workers
