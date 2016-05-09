var dbOps = require('./databasesim');

var Ctrl = function (date){
  this.nume = date.nume;
  this.tip = date.tip;
};

Ctrl.prototype.getInfo = function (){
  console.log('Numele entitatii este ' + this.nume + ' și este ' + this.tip);
  dbOps.getEntitate(1);
};

Ctrl.prototype.saveInfo = function (){
  dbOps.saveEntitate(JSON.stringify(this)); // {nume: this.nume, tip: this.tip}
};

module.exports = Ctrl;
