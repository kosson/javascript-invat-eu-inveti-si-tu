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

## Resurse

- [The Observer Pattern | Learning JavaScript Design Patterns by Addy Osmani | O'Reilly](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s05.html)
- [Observer pattern in vanilla JavaScript | Nevyan Neykov | youtube.com | Dec 7, 2019](https://www.youtube.com/watch?v=GNAXaqFQEqc)
