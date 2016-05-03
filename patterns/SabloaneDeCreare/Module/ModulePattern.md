# Module pattern

Original a fost creată pentru a oferi încapsulare privată și publică.

# Dependințe cognitive

- scope
- funcții, funcții anonime
- this
- Clojures
- Immediately Invoked Function Expressions - IIFE

## Mantre
- nu necesită instanțiere cu `new`

## Ce este?
O cale simplă de a incapsula metode. Poate fi considerat o cutie cu scule. O colecție de metode înrudite.

## Ce face?
**Returnează un obiect**

Exemplu de sintaxa de object literal pentru un modul.

```js
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
