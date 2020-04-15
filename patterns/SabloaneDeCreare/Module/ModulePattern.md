# Module pattern

Este o modalitate de a incapsula metode înrudite într-un singur container.
Original a fost creată pentru a oferi încapsulare privată și publică.

# Dependințe cognitive

- scope
- funcții, funcții anonime
- this
- clojures
- Immediately Invoked Function Expressions - IIFE

## Mantre

- nu necesită instanțiere cu `new`

## Ce este?

O cale simplă de a incapsula metode. Poate fi considerat o cutie cu scule. O colecție de metode înrudite.

## Ce face?

**Returnează un obiect**

Exemplu de sintaxa de object literal pentru un modul.

```javascript
var Modul = {

  // o proprietate simpla
  oProprietateSimpla = 'ceva',

  // un obiect de configurare
  obConfigurare: {
    frmSent: true,
    dimensiune: 'mediu'
  },

  // o metodă simplă
  oMetodaSimpla: function (){
    console.log('o actiune simpla');
  },

  // output pe baza obiectului de configurare
  oMetodaDeValorificare: function (){
    console.log('Formularul ' + (this.obConfigurare.frmSent) ? 'a fost trimis' : 'nu a fost trimis');
  }

  // suprascrierea obiectului de configurare
  metodaDeReconfigurare: function (configNoi){
    if(typeof configNoi === 'object'){
      this.obConfigurare = configNoi;
    }
  }
};

Modul.metodaDeReconfigurare({
  frmSent: false,
  dimensiune: 'mic'
});
```

## Constituirea unui modul

De fapt, folosim posibilitatea de a crea funcții autoexecutabile, care să expună anumite părți sub forma unui obiect returnat, dar părțile private să fie variabile ale mediului intern pe care se face closure.

```javascript
var modul01 = ((function(){
  var privata = 20;
  // returnarea metodelor de acces la variabilele private
  return {
    setPrivata: function (nouaVal) {
      privata = nouaVal;
    }
  }
})());
```
