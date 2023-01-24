# Module pattern

Este o modalitate de a incapsula metode înrudite într-un singur container.
Original a fost creată pentru a oferi încapsulare privată și publică.

O primă formă de a izola funcționalități înrudite pentru a le face disponibile ar fi crearea unui obiect literal folosit pe post de dicționar (cheie - valoare). Este o cale simplă de a incapsula metode/funcționalități. Poate fi considerat o cutie cu scule. O colecție de metode înrudite.

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

Problemele apar atunci când această parte a codului este folosită într-o aplicație mai mare, unde, un alt programator a denumit propriul modul cu același nume. În acest caz, vom avea de gestionat un conflict. Din acest motiv, se va apela la capacitatea unei funcții de a crea propriul mediu de execuție de unde returnezi un obiect al cărui metode vor face closure pe mediul de execuție al funcției.

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

O altă problemă imensă este duplicarea funcționalităților de fiecare dată când modulul este instanțiat. Funcțiile care joacă rolul metodelor vor avea codul duplicat inutil, ceea ce constituie o risipă de resurse, fiind catalogată a fi o practică care trebuie evitată.

Modelul care creează module pe care l-am explorat aici, are deficiențe pe care un alt model de organizare a codului le adresează. Acesta este `Revealing Module Pattern`.

## Dependințe cognitive

- scope
- funcții, funcții anonime
- this
- clojures
- Immediately Invoked Function Expressions - IIFE

## Mantre

- nu necesită instanțiere cu `new`
