# Publish / Subscribe

Acesta este un pattern înrudit cu Observer, care împrumută caracteristici ale modelelor de abonament  Publish/Subscribe (Pub/Sub) - Publică/Abonează.

Permite unui obiect (cunoscut și sub numele de abonat) să „observe” alt obiect (cel care publica). Un Observable poate fi și o colecție care vine într-o perioadă de timp.

## Metoda push

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
