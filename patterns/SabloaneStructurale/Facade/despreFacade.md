# Șablonul Facade

Acest șablon oferă o interfață de nivel înalt la un corp mai mare de cod. Un șablon Facade ascunde complexitatea.

```js
var module = (function() {

  var privat = {
    i: 5,
    get: function(){
      console.log('valoarea curentă:' + this.i);
    },
    set: function(val){
      this.i = val;
    },
    actiune: function(){
      console.log( 'o functie care ruleaza' );
    },
    salt: function(){
      console.log( 'sar' );
    }
  };

  return {
    facade: function(args){
      privat.set(args.val);
      privat.get();
      if (args.actiune){
        privat.actiune();
      }
    }
  }

}());

module.facade({run: true, val:10});
//outputs current value: 10, running
```
