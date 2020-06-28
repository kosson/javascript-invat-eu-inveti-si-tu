# Observable

Este posibil ca în aplicația pe care o dezvoltăm, să fie necesar ca atunci când un element a suferit o modificare, altele să fie alertare, ca la rândul lor să-și modifice starea. Obiectele care doresc să fie anunțate de modificarea stării, vor trebui să se înregistreze cu obiectul care asigură contextul de primire a mesajelor și distribuirea lor celor abonați.

Pornim de la un obiect numit **subiect**. Acest obiect menține în viață o listă de obiecte de care depinde. Acestea sunt numite **observatori**. Obiectul cu rol de subiect va alerta observatorii despre orice modificare a stării sale prin *difuzarea* (*broadcast*) unei notificări specifice fiecărui observator în parte. Când nu se mai dorește ca un observator să mai fie notificat cu privire la aspectul pentru care au fost înregistrat în *subiect*, acesta poate fi eliminat din lista celor abonați.

## Anatomie

Pentru a înțelege în adâncime acest șablon, vom face o implementare ES5, urmând să o transformăm într-o clasă folosind ES6. Am ales exemplul oferit de Addy Osmani, din lucrarea sa *Learning JavaScript Design Patterns* pentru claritatea și pătrunderea pe care le oferă. Trucul este să adaugi obiectelor care doresc să-și comunice starea, o metodă

Pentru a implementa acest model, mai întâi ai nevoie de un obiect care să poată gestiona o listă de observatori. Avem nevoie de o listă. Aceasta va fi un array. Odată cu lista creăm și constructorul în baza căruia vom instanția obiectul care gestionează observatorii.

```javascript
function ObserverList () {
  this.observerList = [];
}
```

Și mai avem nevoie de o metodă internă obiectului care va fi creat necesară actualizării stării tuturor celorlalte obiecte din listă

Modelarea listei observatorilor implică implementarea câtorva metode necesare:

- `adăugare` (*add*), cu care adaugi observatorii obiecte în array;
- `cuantificare` (*count*), care oferă numărul elementelor din array;
- `getter` (*get*), testează ca indexul primit să fie în limitele lungimii listei și returnează elementul de la indexul primit;
- `existăObiectul` (*indexOf*), testează dacă obiectul se află în listă. Dacă da, este returnat, dacă nu, este returnată valoarea `-1`;
- `ștergeObservator` (*removeAt*), care elimină un obiect observator din listă.

```javascript
ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};

ObserverList.prototype.count = function(){
  return this.observerList.length;
};

ObserverList.prototype.get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};

ObserverList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;

  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }

  return -1;
};

ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice( index, 1 );
};
```

Odată creat gestionarul de obiecte, să creăm obiectul la care obiectele observator din lista tocmai creată, să se poată *abona* pentru a putea primi *noutăți*. În aceast scop, vom crea un nou constructor în care vom instanția drept primă proprietate obiectul listă.

```javascript
function Subject () {
  this.observers = new ObserverList();
}
```

Apoi vom avea nevoie să implementăm următoarele metode:

- `adaugăUnObservator` (*addObserver*), care primește drept argument obiectul care dorește să fie abonat și va folosi metoda `add` a obiectului listă `this.observers` pentru a-l adăuga;
- `eliminăObservator` (*removeObserver*), care va folosi metoda `removeAt` obiectului care gestionează lista pentru a șterge/*dezabona* un observator primit ca argument.
- `notificare` (*notify*), care va actualiza starea tuturor observatorilor din listă.

```javascript
Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i = 0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};
```

Acum că am terminat lista care se va instanția în subiect, avem nevoie de un constructor care să creeze obiectele `Observer`.

```javascript
function Observer () {
  this.update = function () {
    // este o valoare care va fi suprascrisă la momentul creării unui nou observator
  }
}
```

Pentru proprietatea `update`, am atribuit o funcție, dar această valoare poate și va fi rescrisă la momentul în care se va instanția obiectul Observer. Chiar în acel moment, această proprietate `update` va fi introdusă în obiectul care se dorește a fi extins și astfel, se va putea modifica din acel obiect extins. Ca o concluzie, obiectele observer pot implementa logică total diferite pentru metoda `update`, dar trebuie să o aibă.

Obiectele care vor dori să se *aboneze*, nu au metodele necesare notificării celorlate din listă că starea lor s-a modificat. Din acest motiv, avem nevoie de o funcție cu ajutorul căreia să *extindem* obiectul observator cu metodele necesare.

```javascript
function extend (observator, subiect) {
  var i;
  for (i in subiect) {
    observator[i] = subiect[i];
  }
  return observator;
};
```

Să presupunem că avem următoarele elemente DOM:

```html
<button id="addNewObserver">Adaugă un checkbox</button>
<input id="mainCheckbox" type="checkbox"/>
<div id="observersContainer"></div>
```

Pentru care facem referințele către obiectele de tip `Element` din DOM.

```javascript
var controlCheckbox = document.getElementById( "mainCheckbox" ),
    addBtn = document.getElementById( "addNewObserver" ),
    container = document.getElementById( "observersContainer" );
```

Vom extinde obiectul `controlCheckbox` cu metodele subiectului.

```javascript
extend(controlCheckbox, new Subject());
```

În acest moment, dacă adăugăm un *listener* pe checkbox, acesta va putea emite notificări către toți ceilalți observatori din listă.

```javascript
controlCheckbox.onclick = function () {
  controlCheckbox.notify(controlCheckbox.checked);
};
```

Pentru a *abona* un nou observator, vom crea un nou checkbox, adică un obiect. Observabil este că ceea ce se introduce în array-ul observatorilor sunt obiectele cărora li se adaugă un comportament, adică câte o metodă.

```javascript
addBtn.onclick = addNewObserver;

function addNewObserver(){

  // Creează un checkbox nou
  var check = document.createElement( "input" );
  check.type = "checkbox";

  // Extinde checkbox-ul cu proprietățile lui Observer
  extend( check, new Observer() );

  // Aici faci înlocuirea comportamentului original cu cel particularizat dorit
  check.update = function( value ){
    this.checked = value;
  };

  // Adaugă observatorul în lista lor
  controlCheckbox.addObserver( check );

  // Adaugă elementul nou creat
  container.appendChild( check );
}
```

În cazul de mai sus, de fiecare dată când se dă click pe buton, se creează câte un obiect input check, care este extins cu obiectul `Observer`. Acesta are o singură metodă, care este rescrisă imediat cu un comportament dorit. În cazul nostru metoda `update`, va pasa o valoare tuturor celor care există deja în listă. În cazul ales, dacă input-check-ul de control este bifat, toate celelalte checkbox-uri vor fi bifate la rândul lor.

## Model folosind ES6

Odată cu posibilitatea de scrie direct clase, putem modela mai ușor.

```javascript
class Subject {
  constructor () {
    this.observers = new Set();
  }

  // mecanismul de abonare
  subscribe (obs) {
    this.observers.add(obs);
  }

  // mecanismul de dezabonare
  unsubscribe (obs) {
    this.observers.delete(obs);
  }

  // notificarea celorlalți observatori
  notify (data) {
    this.observers.forEach(obs => obs(data));
  }
}

class Observable {
  constructor () {}
  update () {}
}
```

Vom urmări același exemplu elaborat în ES5 mai sus.

```javascript
const Subiect = new Observable();
```


## Detalii

Acest model/pattern are capacitatea de a modela codul necesar gestiunii relațiilor dintre un eveniment, cererile async către un server apărute în urma acelui eveniment și posibilele animații.

## Resurse

- [The Observer Pattern | Learning JavaScript Design Patterns | Addy Osmani ](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)
- [The Observer Pattern in JavaScript explained | pawelgrzybek.com](https://pawelgrzybek.com/the-observer-pattern-in-javascript-explained/)
- [The Power of the Observer Pattern in JavaScript | jsmanifest.com](https://jsmanifest.com/observer-pattern-in-javascript/)
- [How to Use the Observable Pattern in JavaScript | Eric Fuller | https://webdevstudios.com](https://webdevstudios.com/2019/02/19/observable-pattern-in-javascript/)
- [JavaScript Design Patterns: The Observer Pattern | Camilo Reyes | sitepoint.com]()
