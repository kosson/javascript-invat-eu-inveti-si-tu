var Baza = require('./moduleBaza')();

var Operatiuni = function(date){
  this.mesaj = date.mesaj;
};

Operatiuni.prototype.save = function(){
  console.log('apelez funcție din modul specializat ' + this.nume);
  Baza.save(this); //
};

module.exports = Operatiuni;

/*
* #1 cere modulul Baza (Revealing Pattern Module) și execută-l pentru a returna obiectul pe care-l returnează Revealing Module Patternul
* * nu-ți fie teamă că s-ar dubla cu aceeași operațiune la invocările care se fac în app.js
* * oricum obiectul este cache-uit.
* #3 declari funcția care va deveni un Constructor.
* #7 adaugi o funcție în prototype care apelează o funcție expusă de modul
* * execuția funcției save din prototype invocă execuția unei alte funcții din moduleBaza, adică creează un call-site
* * funcției salveaza din moduleBaza îi este pasat obiectul this.
*/
