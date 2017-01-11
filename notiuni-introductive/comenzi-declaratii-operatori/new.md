# Operatorul new

Are rolul de a crea o instanță a unui obiect definit de programator.

Pentru a crea un obiect este necesară o funcție care să joace rol de șablon și apoi de realizarea unei instanțe prin apelarea funcției cu `new`.

La instanțierea cu new sunt urmați următorii pași:
- se creează un obiect nou
- obiectul va moșteni tot ce există în obiectul `prototype` al funcției din care a fost generat.
- `this` este setat la noul obiect creat.
- rezultatul evaluării funcției cu new se încheie prin returnarea automată a obiectului nou construit de la bun început. Se poate returna explicit, dacă se dorește suprascrierea comportamentului de creare.

```javascript
function VehiculSpatial(masa, motoare, program){
  this.masa = masa;
  this.motoare = motoare;
  this.program = program;
};

function ProgramSpatial(nume, durata){
  this.nume = nume;
  this.durata = durata;
};

var naveta = new ProgramSpatial('Soiuz', 25);

var vehicul = new VehiculSpatial(13000, 12, naveta);

console.log(vehicul); // Object { masa: 13000, motoare: 12, program: Object }
console.log(vehicul.program); // Object { nume: "Soiuz", durata: 25 }
```

Funcțiile declarate `this.functie = function(valoare){ // fa ceva };` fac un closure pe mediul lexical al funcției gazdă.
