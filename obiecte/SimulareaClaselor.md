# Simularea claselor și introducerea lor ca paradigmă de programare în ES6

Chiar dacă JavaScript este un limbaj de programare bazat pe obiecte, nu și-a bazat niciodată crearea acestora în baza unei clase care să aibă rol de plan de construcție după toate rigorile pe care alte limbaje de programare le cereau. Istoric vorbind, JavaScript nu are clase, dar mulți programatori obișnuiți cu acest concept, au simțit nevoia să-și poată exprima rutinele de lucru forțând conceptul de clase.

Funcțiile prin modul lor de lucru au oferit calea către implementarea claselor.

## Modul de a crea o clasă - studiu

### Funcție simplă

Modelarea unei clase rudimentare se poate realiza prin introducerea de funcționalități și date în obiectul `this` al funcției.

```javascript
function VehiculSpatial(identificator){
  this.id = identificator;
  this.functie = '';
  this.an = '';
  this.prezentare = function(){
    return this.id + " " + this.an;
  };
};
var Santinel = new VehiculSpatial('Santinel');
Santinel.functie = 'satelit';
Santinel.an = 2015;
console.log(Santinel.prezentare());
// ca deficiență, funcția care joaca rol de metodă, este recreată
// ori de câte ori este creat un nou obiect prin new
```

Partea deficitară a unei astfel de soluții este că funcțiile care joacă rol de metode în obiectul `this` (obiectul context în care va rula funcția când va fi apelată cu new), vor fi recreate ori de câte ori este creat un nou obiect. Acces lucru conduce la probleme de performanță a codului poluându-se memoria cu aceeași funcție recreată ori de câte ori este instanțiat un nou obiect.

### Funcție simplă care are metode adăugate direct la prototip

Modelarea unei clase rudimentare se poate realiza și prin introducerea de funcționalități și date în obiectul prototip al funcției. Astfel, prin mecanismul de moștenire prototipală, toate obiectele instanțiate cu `new`, vor beneficia de acces direct la toți membrii obiectului prototip.

```javascript
function VehiculSpatial(identificator){
  this.id = identificator;
  this.functie = '';
  this.an = '';
};
VehiculSpatial.prototype.prezentare = function(){
  return this.id + " " + this.an;
};
var Santinel = new VehiculSpatial('Santinel');
Santinel.functie = 'satelit';
Santinel.an = 2015;
console.log(Santinel.prezentare());
```

Este rapid observabil faptul că simularea clasei s-a realizat prin introducerea de proprietăți și în `this`, dar și în `prototype`.

### Folosirea unui obiect literal - un Singleton

Așa cum ai intuit din denumire, un Singleton este un obiect care este instanțiat o singură dată pentru a servi diferitelor scopuri. Un astfel de obiect ar putea fi modelat având proprietăți ce vor aștepta să fie completate cu valori.

```javascript
var VehiculSpatial = {
  id: '',
  functie: '',
  an: '',
  prezentare: function(){
    return this.id + " " + this.an;
  }
};
VehiculSpatial.id = 'Santinel';
VehiculSpatial.functie = 'satelit';
VehiculSpatial.an = 2015;
console.log(VehiculSpatial.prezentare());
```

Comparația cu o clasă este ușor forțată în acest caz pentru că oricine, oricând poate suprascrie valorile obiectului ceea ce conduce la o serie de probleme.
