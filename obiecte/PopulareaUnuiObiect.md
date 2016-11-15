# Popularea obiectelor

Conținutul unui obiect constă din valori (de oricare tip) stocate într-o locație anume care poartă un nume și pe care le numim proprietăți.

Odată ce poți crea un obiect, ai nevoie să-l faci funcțional populându-l.

## Crearea obiectelor - alternative

Toate alternativele de mai jos au același efect: creează un obiect gol.

```js
var newObj = new Object();
var newObj = Object.create(null);
var newObj = {};
```

## Populare folosind notația cu punct - Dot notation

```js
var newObj = {};              // Creează obiectul
newObj.oCheie = 'Salutare';   // Scrie proprietăți
var cheie = newObj.oCheie;    // Accesează proprietățile
```

## Populare folosind sintaxa parantezelor drepte - Square bracket syntax

```js
var newObj = {};                // Creează obiectul
newObj['oCheie'] = 'Salutare';  // Scrie proprietăți
var cheie = newObj['oCheie'];   // Accesează proprietățile
```

## Populare folosind Object.defineProperty()

```js
var newObj = {};              // Creează obiectul

Object.defineProperty(newObj, 'numeCheieNoua', {
  value: 'Salutare',
  writable: true,
  enumerable: true,
  configurable: true
});
```

Exemplul de mai sus ar putea fi rescris astfel:

```js
var newObj = {};              // Creează obiectul

var defProp = function(obiect, cheie, valoare){
  config.value = valoare;
  Object.defineProperty(obiect, cheie, config);
};

defProp(newObj, 'oCheieNoua', 'Santinel');  // creează o proprietate
defProp(newObj, 'oAltaCheieNoua', 'an');    // mai adaugă o proprietate

```

## Populare folosind Object.defineProperties()

```js
Object.defineProperties(newObj, {
  'oCheie': {
    value: 'Salutare',
    writable: true
  },
  'oAltaCheie': {
    value: 'Ce mai faci?',
    writable: true
  }
});
```

ATENȚIE!
Folosirea unei funcții într-un obiect drept „metodă”, nu este decât apelarea unei funcții în cadrul obiectului. Nu se poate spune că obiectul „conține” funcția. Obiectul doar face o referință. Funcției cu rol de metodă i se pasează `this`, care este, de fapt obiectul în care este metodă.

```js
function actiune() {
	console.log( "actiune" );
}

var aceeasiActiune = actiune;	// variabila „conține” referința către `actiune`

var obiect = {
	acceasiActiune: actiune
};

actiune;				// function actiune(){..}
acceasiActiune;			// function actiune(){..}
obiect.acceasiActiune;	// function actiune(){..}
```

## Cum se șterge un membru al unui obiect

```js
var obi = {unu: 'ceva', doi: 'altceva', trei: 'diferit', patru: 'prop'};

delete obi.doi;

for(var i in obi){
  if(obi.hasOwnProperty(i)){
    console.log(i, ' '+obi[i]);
  };
};
```
