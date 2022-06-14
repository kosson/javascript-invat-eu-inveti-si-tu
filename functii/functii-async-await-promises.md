# Async/await și promisiunile

Funcțiile async-await nu sunt un înlocuitor pentru promisiuni, ci un model mai eficient de gestionare a acestora. De exemplu, pentru a rezolva în paralel promisiuni apelam `Promise.all()`, dar rezultatul poate fi tratat cu un `async`. O posibilă semnătură de cod care semnalează o astfel de opțiune este fragmentul de mai jos.

```javascript
const [val1, val2, val3] = await Promise.all(promise1(), promise2(), promise3());
```

Un posibil exemplu ar fi citirea mai multor fișiere în paralel. Pentru a rula acest exemplu, vom folosi Node.js. Mai întâi vom apela pachetele `fs` și `util` după care vom transforma metoda `readFile` într-una promisificată. Acest exemplu a precedat apariția metodelor promisificate din `fsPromises`.

```javascript
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const fișiere = ['./primul.txt'. './alDoilea.txt'];
(async () => {
  let promisiuni = fișiere.map((nume) => readFile(nume, "utf8"));
  let valori = await Promise.all(promisiuni); // citește fișierele în paralel.
  console.log(valori);
})();
```

Folosirea utilitarului deja promisificat.

```javascript
const fs = require('fs/promises');
const fișiere = ['./primul.txt'. './alDoilea.txt'];
(async () => {
    try {
        let promisiuni = fișiere.map((nume) => fs.readFile(nume, { encoding: 'utf8' }));
        let valori = await Promise.all(promisiuni); // citește fișierele în paralel.
        return valori;
    } catch (err) {
        const.log(err);
    }
})();
```

O mențiune care ar trebui făcută, este că metoda `readFile` citește conținutul fișierelor în memorie, fapt care va conduce la afectarea resurselor computerului. După cum se observă, rutina de lucru ar fi constituirea unui array, de fapt a unui iterabil cu promisiuni pe care mai apoi îl rezolvăm folosind `Promise.all`, care la rândul său produce o promisiune ce poate fi rezolvată printr-un `await`. Rezultatul poate fi returnat.

```javascript
        let promisiuni = fișiere.map((nume) => fs.readFile(nume, { encoding: 'utf8' }));
        let valori = await Promise.all(promisiuni); // citește fișierele în paralel.
        return valori;
```

Problema acestui model de rezolvare este aceea că în cazul în care o promisiune eșuează printr-un `reject`, metoda `Promise.all` va eșua și ea la rândul său la prima. În cazul în care sarcinile din iterabil nu sunt într-un lanț condițional, se poate folosi `Promise.allSettle` pentru a urmări mai bine ce s-a petrecut cu fiecare element al iterabilului.

## Legătura cu promisiunile

Această secțiune rulează codul în Node.js.

```javascript
new Promise((resolve, reject) => {
  // Acest cod este rulat imediat ce promisiunea este creată
  setTimeout(resolve, 100);
}).then(() => {
  // codul care va rula aici este **programat** să ruleze după timeout
  // adică imediat ce lista de asteptare (queue) a microtask-urilor este epuizată
}).catch();
```

Și versiunea *async* folosind pachetul *promisify*.

```javascript
const intarziere = promisify(setTimeout);

async function ceva () {
  // fragmentul de aici va fi rulat imediat ce această funcție este apelată.
  await intarziere(2000);
  // codul de aici este *programat* să ruleze după timeout,
  // adică imediat ce lista de asteptare (queue) a microtask-urilor este epuizată
  // echivalent rulării într-un then
}
```

Tot codul care există după un *await*, este echivalentul rulării într-un `then`.

## Modele de lucru

Ken Snyder introduce un model de lucru interesant pornind de la practica curentă existentă în lucrul cu funcțiile asincrone. Acesta pornește de la modelul pe care majoritatea programatorilor îl folosesc în combinație cu un router pentru a gestiona rezultatul unei căi.

```javascript
router.get('/users/:id', async (req, res) => {
  const client = new Client();
  let user;
  try {
    await client.connect();
    user = await client.find('users').where('id', req.path.id);
  } catch(error) {
    res.status(500);
    user = { error };
  } finally {
    await client.close();
  }
  res.json(user);
});
```

După cum se observă, pentru a gestiona erorile se folosește o construcție `try...catch`. Alternativa ar fi construcția unei funcții care să abstractizeze toate operațiunile.

```javascript
router.get('/users/:id', async (req, res) => {
  const { result: user, error } = await withDbClient(client => {
    return client.find('users').where('id', req.path.id);
  });
  if (error) {
    res.status(500);
  }
  res.json({ user, error });
});
```

Se observă o funcție cu rol de gestionar care returnează callback-ului rezultatele necesare trimiterii unui răspuns clientului. În plus, erorile vor fi ridicate la nivelul gestionarului și se asigură că nu vor fi excepții care să nu fie tratate. Un posibil model de implementare ar fi următorul.

```javascript
async function withDbClient(handler) {
  const client = new DbClient();
  let result = null;
  let error = null;
  try {
    await client.connect();
    result = await handler(client);
  } catch (e) {
    error = e;
  } finally {
    await client.close();
  }
  return { result, error };
}
```

Domnul Ken Snyder numește acest model Result-Error Pattern pentru că la nivelul callback-ului sunt *extrase* rezultatele. Ne este oferit și un model de lucru pentru `fetch`: `const { data, error, response } = await fetchJson('/users/123');`.

```javascript
async function fetchJson(...args) {
  let data = null;
  let error = null;
  let response = null;
  try {
    const response = await fetch(...args);
    if (response.ok) {
      try {
        data = await response.json();
      } catch (e) {
        // not json
      }
    } else {
      // note that statusText is always "" in HTTP2
      error = `${response.status} ${response.statusText}`;
    }
  } catch(e) {
    error = e;
  }
  return { data, error, response };
}
```

Exemplele continuă și cu o aplicație practică în cazul lucrului cu Elasticsearch: `const { result, error, details } = await findPosts(query);`. În cazul lucrului cu Elastisearch este foarte adevărat că răspunsurile au un grad înalt de imbricare. Obiectul rezultate conține:

- `records` - este un array de documente;
- `total` - este numărul total de documente în cazul în care nu a fost aplicată nicio limită;
- `aggregations` - informație fațetată conform criteriilor de căutare.

```javascript
// aduce date de la un anumit index în baza unui query specificat
async function query (index, query) {
  // Result-Error Pattern la un nivel ceva mai jos
  const { result, error } = await withEsClient(client => {
    return client.search({
      index,
      body: query.getQuery(),
    });
  });
  // Returnează un obiect similar cu result-error
  return {
    result: formatRecords(result),
    error,
    details: result || error?.meta,
  };
}

// Extrage înregistrările din răspunsuri
function formatRecords(result) {
  // Observă cât de adânc este nivelul de date în care se află rezultatele
  if (result?.body?.hits?.hits) {
    const records = [];
    for (const hit of result.body.hits.hits) {
      records.push(hit._source);
    }
    return {
      records,
      total: result.body.hits.total?.value || 0,
      aggregations: result.aggregations,
    };
  } else {
    return { records: [], total: null, aggregations: null };
  }
}
```

În final, funcția `findPosts` se poate transforma într-un *ambalaj* pentru `query()`.

```javascript
function findPosts(query) {
  return query('posts', query);
}
```

## Legătura cu generatoarele

*Funcțiile async sunt o glazură peste generatoare* spun producătorii motorului V8 în articolul [High-performance ES2015 and beyond](https://v8.dev/blog/high-performance-es2015). Pasul logic ar fi studiul generatoarelor și generatoarelor asincrone.