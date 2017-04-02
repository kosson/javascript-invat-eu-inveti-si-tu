# Promises

JavaScript implică și lucrul cu evenimente asincrone.
Pentru a rezolva elegant problema asincronicității, ES6 a introdus conceptul de promises (promisiuni).

## Mantre

- JavaScript este single-threaded! Asta înseamnă că nu poate rula două secvențe de cod în ***același timp***
- Ținta promisiunilor nu este să elimine callback-urile, ci să elimine callback-urile inutile. (*JavaScript Concurrency*, Adam Boduch)

O promisiune este ca un scaun ocupat, pe care pui o haină pentru a-l rezerva unui coleg, dar acesta nu știi când vine, dacă vine. Oricum, scaunul este ocupat.

Pentru a construi o promisune se va folosi constructorul Promise căruia îi pasăm o funcție cu rol de „executor”. Această funcție, la rândul ei primește două argumente: `resolve` și `reject`. Aceste două argumente sunt două funcții built-in.

La apelarea cu new, constructorul Promise creează un obiect care are o metodă `then`. Metoda `then` primește două funcții callback: `success` și `failure`. Callback-ul success este invocat dacă promisiunea se rezolvă cu succes, adică dacă funcția resolve este invocată pentru acea promisiune. În caz contrar, se invocă error.

```javascript
let promisiune = new Promise((resolve, reject) => {

  // scrii cod care face ceva și apoi condiționezi rezolvarea
  let conditie = true;

  if(conditie){
    resolve("Am rezolvat treburile!");
  }else{
    reject("Te refuz că treaba nu e făcută!");
  };
});

promisiune.then(
  promisiuneRezolvata => {
    console.log(`Ți-am promis ceva! Vezi? ${promisiuneRezolvata}`);
  }
).catch(refuzata => {
  console.log(`${refuzata}`);
});
```

Un exemplu de înlănțuire:

```javascript
let pasulUnu = () => {
  return new Promise(function(resolve, reject) {
    resolve("1. Am adus date de la un API. ");
  });
};

let pasulDoi = (mesaj) => {
  return new Promise(function(resolve, reject){
    resolve(mesaj + "2. Am făcut o transformare. ");
  });
};

let pasulTrei = (mesaj) => {
  return new Promise(function(resolve, reject){
    resolve(mesaj + "3. Am prelucrat datele");
  });
};

// secvențial
pasulUnu().then((rezultat) => pasulDoi(rezultat)).then((rezultat) => pasulTrei(rezultat)).then((rezultat) => {console.log("Am terminat iar etapele au fost: " + rezultat);});

// pararelizat
Promise.all([pasulUnu(), pasulDoi(), pasulTrei()]).then(() => {console.log("Am terminat!");});

// termină una din toate
Promise.race([pasulUnu(), pasulDoi(), pasulTrei()]).then(() => {console.log("Am terminat!");});
```

## Promise, o alternativă la callback-uri

```javascript
// varianta clasică cu callback
function incarcImagine(url, callback){
  let imagine = new Image();
   imagine.onload = function(){
     callback(null, image);
   };
   imagine.onerror = function(){
     let mesaj = "Încărcare eșuată de la " + url;
     callback(new Error(msg));
   };
   imagine.src = url;
};
export default incarcImagine;

/*În alt fișier*/
import incarcaImagine from './loader-imagine';

let adaugaImagine = (src) => {
  let elemImg = document.createElement('img');
  elemImg.src = img.src;
  document.body.appenChild(elemImg);
};

incarcaImagine('img/globul.jpeg', (error, img) => {
  if(error) throw error;
  adaugaImagine(img1.src);
  incarcaImagine('img/luna.jpeg', (error, img) => {
    if(error) throw error;
    adaugaImagine(img2.src);
  })
});
```

Și varianta cu Promise

```javascript
// varianta Promise
function incarcImagine(url){

  return new Promise((resolve, reject) => {
    let imagine = new Image();

    // SUCCES
    imagine.onload = function(){
     rezolve(image);  // apelezi resolve cu valoarea în caz de succes
    };

    // AI EȘUAT
    imagine.onerror = function(){
     let mesaj = "Încărcare eșuată de la " + url;
     reject(new Error(msg));
    };

    imagine.src = url;
  });
};
export default incarcImagine;

/*În alt fișier*/
import incarcaImagine from './loader-imagine';

let adaugaImagine = (src) => {
  let elemImg = document.createElement('img');
  elemImg.src = img.src;
  document.body.appenChild(elemImg);
};

Promise.all([
  incarcaImagine('img/globul.jpeg'),
  incarcaImagine('img/luna.jpeg'),
]).then((imaginile) => {
  imaginile.forEach(img => adaugaImagine(img.src));
}).catch((e) => {
  console.log(e);
});
```
