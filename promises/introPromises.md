# Promises

JavaScript implică și lucrul cu evenimente asincrone.
Pentru a rezolva elegant problema asincronicității, ES6 a introdus conceptul de promises (promisiuni).

O promisiune este ca un scaun ocupat, pe care pui o haină pentru a-l rezerva unui coleg, dar acesta nu știi când vine, dacă vine. Oricum, scaunul este ocupat.

Pentru a construi o promisune se va folosi constructorul Promise căruia îi pasăm o funcție cu rol de „executor”. Această funcție, la rândul ei primește două argumente: `reject` și `error`. Aceste două argumente sunt două funcții built-in.

La apelarea cu new, constructorul Promise creează un obiect care are o metodă `then`. Metoda `then` primește două funcții callback: `success` și `failure`. Callback-ul success este invocat dacă promisiunea se rezolvă cu succes, adică dacă funcția resolve este invocată pentru acea promisiune. În caz contrar, se invocă error.

```js
let promisiune = new Promise((resolve, reject) => {
  resolve("un măr");
  reject("nu am mere");
});

promisiune.then(
  promisiunea => {
    if(promisiunea === "un măr"){
      console.log(`Ți-am promis ceva! Ia ${promisiunea}`);
    };
  },
  err => {
    console.log(err);
  }
); // Ți-am promis ceva! Ia un măr; este ceea ce returnează resolve() și rezolvă ${promisiunea}
```

John Resig în „Secrets of the JavaScript Ninja” oferă un exemplu de implementare a promisiunilor pentru a aduce date în format JSON de la un server.

```js
function getJSON(url){
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();               // inițializarea obiectului XMLHttpRequest
    request.open("GET", url);                           // [request.open]   --> inițierea unui GET pe url primit ca argument
    request.onload = function(){                        // [request.onload] --> try-catch
      try{
        if(this.status === 200){                        // [this.status] dacă this.status este 200
          resolve(JSON.parse(this.response));           // [this.response] invocă resolve cu JSON.parse(this.response), daca raspunsul este parsabil
        }else{
          reject(this.status + " " + this.statusText);  // [this.status]; [this.statusText]
        }
      }catch(e){
        reject(e.message);
      }
    };
    request.onerror = function(){                       // [request.onerror]
      reject(this.status + " " + this.statusText);      // [this.status]; [this.statusText]
    };
    request.send();
  });
};
getJSON('http://validate.jsontest.com/?json={"key":"value"}').then((inregistrari) => {console.log(inregistrari);}).catch((err) => {console.log(err);});
```
