var Ops = require('./operatiune');
var repos = require('./factory');

// #1. Cere blocul operațional - un Constructor
// #2. Cere factory-ul, care returnează un obiect contruit cu new.

var operatiunea1 = new Ops(repos.baza.get(1001));

console.log(operatiunea1);

/*
* fac un nou obiect Ops cu identificator operatiunea1.
* * este returnat astfel un obiect
* funcția Ops așteaptă param `data`
* data este un obiect returnat de repoFactory la apelarea cu new
* data, de fapt este un obiect returnat de Modului pentru care factory a făcut request
* Modelul, așa cum este task, pune la dispoziție funcții așa cum este get()
* get() acceptă un parametru cu care să opereze
* get() returnează un obiect { name: 'new task from db', completed: false }
* name: 'new task from db' vine din obiectul returnat de get() in contextul lui taskRepository
* la care se adaugă completed: false care deja exista în obiectul Ops la instanțierea cu new
 */
