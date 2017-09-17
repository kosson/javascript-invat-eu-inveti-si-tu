# Promises

Rularea codului JavaScript introduce conceptul de concurență. La ce se reduce acest lucru? La prioritizarea execuției diverselor părți ale codului. Reiterăm faptul că JavaScript are un singur fir de execuție care implică o anumită secvențialitate, dar ce te faci când în lucrul curent cu evenimente, multiple funcții pot să-și înceapă evaluarea, unele au nevoie de valorile returnate de altele ș.a.m.d. În acest mediu înalt concurențial, avem cele două mecanisme care reglează controlul programului: stiva apelărilor și bucla evenimentelor.
Pentru a negocia acest mediu concurențial s-a introdus paradigma de lucru asincronă.
Pentru a rezolva mai elegant problema asincronicității dincolo de ce pot oferi callback-urile, ES6 a introdus oficial conceptul de promises (promisiuni) în standard.

**Standardul spune**:
> *O promisiune este un obiect care este folosit ca locțiitor pentru rezultatele care ar putea apărea în urma unei computații întârziate (posibil asincronă)* ([25.4Promise Objects](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-promise-objects)).

Am tradus termenul din limba engleză „deferred” cu „amânat” în limba română.

## Mantre

- JavaScript este single-threaded! Asta înseamnă că nu poate rula două secvențe de cod în ***același timp***
- Ținta promisiunilor nu este să elimine callback-urile, ci să elimine callback-urile inutile. (*JavaScript Concurrency*, Adam Boduch)
- O promisiune este un obiect „care este utilizat ca o promisiune” și care reprezintă o valoare potențială apărută ca rezultat al unei operațiuni asincrone.
- `resolve` și `reject` sunt două funcții obiect.

## Lămuriri

O promisiune este ca un scaun ocupat. Vine un coleg, care ocupă un scaun punând o haină pe spătar. Apoi pleacă pentru că are ceva de făcut. Nu știi când vine, dacă vine. Oricum, scaunul este ocupat. La un moment vine și spune: am rezolvat treaba. Dacă nu, zice: am făcut un spanac.

**Standardul spune**:
> Oricare obiect Promise este în una din cele trei stări posibile: `fulfilled`, `rejected` și `pending`.

Să lămurim termenii. În limba română `fulfilled`, în contextul nostru o traducem cu *îndeplinită*; `rejected` este *refuzul* îndeplinirii unei promisiuni pentru un anumit motiv, iar `pending` este tradus prin *în așteptare*.

Starea `pending` - *în așteptare* indică faptul că o promisiune nu a fost *îndeplinită* și nici nu a fost *respinsă*. Încă așteaptă ca procesul computațional pentru care a fost creată promisiunea, să-și termine evaluarea.

Când un obiect promisiune stă o lungă perioadă de timp în starea `pending`, spunem despre acea promisiune că este *nerezolvată* - `unresolved`.
Opus, este o promisiune care a fost *încheiată* - `settled`. O promisiune este rezolvată atunci când, fie a fost refuzată, fie a fost rezolvată.

O promisiune este *rezolvată* dacă a fost *încheiată* sau dacă va servi drept stare altei promisiune, care aștepta această rezolvare.

## Construcția unei promisiuni

Pentru a construi o promisune se va folosi constructorul `Promise` căruia îi pasăm un singur argument. Acesta este o funcție cu rol de „executor”, spune standardul. Această funcție, la rândul ei primește două argumente: `resolve` și `reject`. Aceste două argumente sunt două funcții puse la dispoziție deja de către motor cu scopul de a-ți semnala succesul sau eșecul.

Să revenim la funcția obiect *executor*. Aceasta este apelată pentru a iniția și pentru a avea un răspuns la sarcina pentru care construim promisiunea. Dacă ne lovim de un eșec, putem apela funcția reject, iar în caz de rezolvare, este disponibilă funcția resolve care primește un singur argument care reprezintă chiar valoarea returnată ca încheiere a sarcinii. Această valoare disponibilă ca argument al lui resolve poate fi chiar o valoare în sine sau un alt obiect Promise care la rândul său va avea drept sarcină returnarea unei valori.
Funcția reject este și ea pasată executorului și la rândul său primește un argument, care, de regulă este un obiect `Error`.

La apelarea cu new, constructorul Promise creează un obiect care pune la dispoziție o metodă `then`. Metoda `then` primește două funcții callback: `success` și `failure`. Callback-ul success este invocat dacă promisiunea se rezolvă cu succes, adică dacă funcția resolve este invocată pentru acea promisiune. În caz contrar, se invocă error.

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

## Proprietățile constructorului Promise

### Promise.prototype

Este obiectul prototip al lui `Object`.

### Promise.all(obiectIterabil)

Returnează o nouă promisiune care cuprinde un array plin ochi de promisiuni rezolvate pentru promisiunile pasate. Este posibil să și refuze oferind primul refuz a primei promisiuni care refuză din colecția de promisiuni. Pe scurt, ai mai multe promisiuni și încerci să le rezolvi pe toate odată. Dacă una din promisiuni este refuzată, refuzul acesteia va fi returnat.
Valoarea lui `this` este o funcție constructor, care trebuie să respecte regulile constructorului `Promise` în ceea ce privește parametrii (câți și ce funcții au).

### Promise.race(obiectIterabil)

Se aseamănă cu `Promise.all` rezolvând toate elementele (promisiunile) din obiectul iterabil. Dacă iterabilul este gol sau dacă nu este încheiată una din promisiunile din iterabil, nici `race` nu va fi *încheiată*.
Este așteptat ca obiectul `this` al lui race să ofere o metodă `resolve`.

### Promise.reject(r)

Funcția `reject` returnează o nouă promisiune care a fost respinsă cu argumentul care i-a fost pasat.

### Promise.resolve(x)

Fie returnează o nouă promisiune care a fost rezolvată cu argumentul pasat, fie însuși argumentul, dacă acesta este o promisiune generată de constructor.

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

## Resurse

https://en.wikipedia.org/wiki/Futures_and_promises
http://www.ecma-international.org/ecma-262/7.0/index.html#sec-promise-objects
