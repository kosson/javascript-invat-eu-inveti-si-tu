# Promise.race(obiectIterabil)

Metoda returnează o promisiune care se rezolvă de îndată ce una din promisiunile din iterabil este rezolvată prin rezultat sau prin reject. Dacă iterabilul pasat este gol, va returna o promisiune care va fi mereu în pending.

Se aseamănă cu `Promise.all()`, rezolvând toate elementele (promisiunile) din obiectul iterabil. Deosebirea este că în cazul `race`, promisiunea va fi rezolvată când prima dintre promisiunile din iterabil este rezolvată. Considerând acest aspect, se aseamănă mai mult cu `Promise.any`.

Dacă iterabilul este gol sau dacă nu este încheiată una din promisiunile din iterabil, nici `race` nu va fi *încheiată* (**settled**).
Este așteptat ca obiectul `this` al lui `race` să ofere o metodă `resolve`.

Datorită modului de operare, această metodă se pretează unei posibile temporizări a aducerii rezultatelor. Putem imagina scenariul în care un API are un răspuns mult întârziat. În cazul în care o anumită perioadă trece fără rezultat, se poate proceda la un reject.

```javascript
// funcție de așteptare care returnează o promisiune ce intră în race cu alta
const wait = milliseconds => new Promise((_, reject) => setTimeout(reject, milliseconds));
// Faci `Promise.wait` între un `wait(nr_milisec)` și o promisiune pe care o pasezi mai departe funcției returnate
const promiseWithTimeout = milliseconds => promise => Promise.race([promise, wait(milliseconds)]);

// Creează o funcție specială pentru o anumită perioadă
const asteptDouaSecunde = promiseWithTimeout(2000); // va fi returnată o funcție (currying) care acceptă drept argument promisiunea a doua care intră în race

asteptDouaSecunde(fetch('https://undeva.ro/apiv1/10')).then();
```

## Cereri asincrone în eșaloane

Metoda `Promise.race` poate fi folosită și pentru segmentarea cererilor în eșaloane de anumite dimensiuni.

```javascript
const performRequestBatching = async batchOptions => {

    // construcția unei interogări. Poate fi MongoDB sau Elasticsearch
    const query = {
        offset: 0,
        limit: batchOptions.limit
    };

    let batch = [];
    let promises = [];
    
    do {
        batch = await model.findAll(query); // folosind un model de date `model`, adu toate înregistrările
        query.offset += batchOptions.limit; // setează limita de la care să fie aduse rezultatele (aici 100)

        // în cazul în care ai rezultate din bază
        if (batch.length) {
            const promise = performLongRequestForBatch(batch).then(() => {
                promises = promises.filter(p => p !== promise); // elimină promisiunea din lista promisiunilor după ce este rezolvată
            });
            promises.push(promise);
            // dacă lunginea array-ului promisiunilor este mai mare decât cea specificată de max concurrent batches
            if (promise.length >= batchOptions.concurrentBatches) {
                await Promise.race(promises); // așteaptă se se rezolve promisiunile
            }
        }
    } while (batch.length);

    return Promise.all(promises); // așteaptă ca ultimele eșaloane să fie terminate
};

batchRequest({
  limit: 100,
  concurrentBatches: 5,
});
```

## Resurse

- [Promise.race() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [Learning Javascript Promise Patterns | Altamash Ali | 9 iunie 2022](https://dev.to/altamashali/learning-javascript-promise-patterns-11ao)
