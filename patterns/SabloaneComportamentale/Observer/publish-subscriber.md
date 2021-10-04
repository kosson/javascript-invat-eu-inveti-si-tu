# Publish / Subscribe

Acesta este un pattern înrudit cu Observer, care împrumută caracteristici ale modelelor de abonament  Publish/Subscribe (Pub/Sub) - Publică/Abonează.

Permite unui obiect (cunoscut și sub numele de abonat) să „observe” alt obiect (cel care publica). Un Observable poate fi și o colecție care vine într-o perioadă de timp.

## Model ES5

```javascript
var Observable = function (){
    this.subscribers = [];
}

Observable.prototype = {
  subscribe: function(callback){
    this.subscribers.push(callback);  // mai intai ar trebui verificat daca nu cumva exista în array.
  },
  unsubscribe: function (callback){
    var i = 0;
    var len = this.subscribers.length;
    // daca gasesti callback-ul in lista, scoate-l
    for(; i<len; len++){
      if(this.subscribers[i] === callback){
        this.subscribers.splice(i, 1);
        // imediat ce l-ai găsit, nu mai continua
        return;
      }
    };
  },
  publish: function(data){
    var i = 0;
    var len = this.subscribers.length;
    // itereaza array-ul celor care s-au inscris și invocă fiecare callback-ul
    for(; i<len; i++){
      this.subscribers[i](data);
    };
  }
};

var Observer = function(data){
  console.log(data);
};

var observable = new Observable();
observable.subscribe(Observer);
observable.publish('We published!');
```

## Implementare ES6 folosind clase

```javascript
class Observer {
  constructor(){
    this.subscribers = [];
  }

  subscribe(subscriber){
    this.subscribers.push(subscriber);
  }

  publish(event, data){
    this.subscribers
        .filter(subscriber => subscriber.event === event)
        .forEach(subscriber => subscriber.action(data));
  }
}

const primulObserver = new Observer();

// primul eveniment al primului observer
primulObserver.subscribe({
  event: "alerg",
  action: (data) => {
    console.log('Am primit pe „alerg”', data);
    document.querySelector('#data').innerHTML = data;
  }
});

// al doilea eveniment al primului observer
primulObserver.subscribe({
  event: "citesc",
  action: (data) => {
    console.log('Am primit pe „citesc”', data);
  }
});

setTimeout(() => {
  primulObserver.publish('alerg', 'Un calup de date care ajunge în observator');
}, 1500);

setTimeout(() => {
  primulObserver.publish('citesc', 'Datele pe al doilea eveniment');
}, 3500);
```

## Crearea unui hub de evenimente

Acest exemplu este oferit de *30 seconds of code* și creează un adevărat hub dedicat gestionării evenimentelor. Metodele oferite sunt `emit`, `on` și `off`.

(1) Folosește `Object.create(null)` pentru a crea un obiect cu moștenirea tăiată de la `Object.prototype`;
(2) Pentru primirea unui eveniment (*on*) vezi dacă există în obiectul cu rol de hashmap. Dacă nu există, adaugă-l ca array ce va primi handlere asociate, dacă există, adaugă-i handler-ul.
(3) Pentru evenimentul *off*, caută indexul handler-ului în array-ul asociat și elimină-l cu `splice`.

```javascript
const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
    if (this.hub[event].length === 0) delete this.hub[event];
  }
});
const handler = data => console.log(data);
const hub = createEventHub();
let increment = 0;

// Subscribe: ascultă după diferitele tipuri de evenimente
hub.on('message', handler);
hub.on('message', () => console.log('Message event fired'));
hub.on('increment', () => increment++);

// Publish: emite evenimente pentru a invoca toți handlerii abonați la acesta pasându-le datele ca argument
hub.emit('message', 'hello world'); // afișează 'hello world' și 'Message event fired'
hub.emit('message', { hello: 'world' }); // afișează obiectul și 'Message event fired'
hub.emit('increment'); // variabila `increment` acum este  1

// Unsubscribe: oprește un anumit handler să mai asculte evenimentul event
hub.off('message', handler);
```

## Resurse

- [The Observer Pattern | Learning JavaScript Design Patterns by Addy Osmani | O'Reilly](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s05.html)
- [Observer pattern in vanilla JavaScript | Nevyan Neykov | youtube.com | Dec 7, 2019](https://www.youtube.com/watch?v=GNAXaqFQEqc)
- [createEventHub | 30secondsofcode.org/js](https://www.30secondsofcode.org/js/s/create-event-hub)
