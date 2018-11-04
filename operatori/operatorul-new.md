# Operatorul new

Are rolul de a crea o instanță a unui obiect definit de programator.

Pentru a crea un obiect este necesară o funcție care să joace rol de șablon și apoi instanțierea unui obiect prin apelarea funcției cu `new`.

Dacă ești un programator începător și ai ajuns în acest punct, nu te descumpăni. Acest operator este folosit împreună cu un apel la o funcție pentru a genera un nou obiect. Acest lucru este permis funcțiilor, fiind una din metodele de a crea obiecte printr-o parametrizare anterioară.

La instanțierea cu `new` sunt urmați următorii pași:
-   motorul inițiază un obiect nou;
-   obiectul nou va moșteni tot ce există în obiectul `prototype` al funcției;
-   `this` este setat la noul obiect creat;
-   rezultatul evaluării funcției cu `new` se încheie prin returnarea automată a obiectului nou construit de la bun început. Se poate returna explicit, dacă se dorește suprascrierea comportamentului natural.

```javascript
function VehiculSpatial (masa, motoare, program) {
  this.masa = masa;
  this.motoare = motoare;
  this.program = program;
};
function ProgramSpatial (nume, durata) {
  this.nume = nume;
  this.durata = durata;
};
var naveta = new ProgramSpatial('Soiuz', 25);
var vehicul = new VehiculSpatial(13000, 12, naveta);

console.log(vehicul); // Object { masa: 13000, motoare: 12, program: Object }
console.log(vehicul.program); // Object { nume: "Soiuz", durata: 25 }
```

Funcțiile declarate `this.functie = function(valoare){ // fa ceva };` fac un closure pe mediul lexical al funcției gazdă.
