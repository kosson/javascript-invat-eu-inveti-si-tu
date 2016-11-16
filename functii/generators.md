# Generators

Sunt un nou tip de funcții introduse în ECMAScript 2015.

Apelarea unui generator nu îl execută, ci doar este trimisă funcția în call-stack. Se creează și scope-ul aferent. Ca efect este creat și returnat un obiect iterator prin care putem cere valori din generator. Obiectul iterator ține o referință către contextul de execuție a generatorului care este în call-stack.
La apelarea funcției generatorului, acesta este scoasă din call-stack (nu este garbage collected), iar variabila care va identifica iteratorul, va ține o referință către funcția generatorului și astfel la contextul de execuție prin obiectul iterator care tocmai s-a creat. Mecanismul seamănă cu cel al closure-urilor.
Execuția metodei next() nu creează un nou execution context ca în cazul clasic, ci doar reactivează contextul de execuție a generatorului pe care-l împinge din nou în call-stack, funcția generatorului continuând execuția de unde a rămas. Dacă nu mai este niciun `yield`, funcția generator returnează.

La prima cerere prin `next()`, Generatorul produce o valoare (prin `yield`) și își suspendă execuția asteptând următoarea cerere prin (`next()`).

Este o funcție care generează o serie de valori dar nu toate odată, ci la cerere folosind `yield`. Funcția „de generare” va răspunde cu o valoare sau va notifica că nu mai are.
O astfel de funcție nu-și încheie execuția între cereri, doar o suspendă.

Sunt funcții din care poți ieși și apoi reintra mai târziu în funcționarea programului. Ceea ce le face importante este faptul că rețin valorile între diferitele accesări.

```js
function* generator(){
  yield true;
};
```

## Scoaterea datelor dintr-un generator

Un exemplu care implică un grad mai ridicat de utilitate:

```js
function* emiteFormule(){
  yield "Salutare!";
  yield "Hai noroc!";
  yield "Noapte bună";
};

for(let salutare of emiteFormule()){
  console.log(salutare);
};

/*
Salutare!
Hai noroc!
Noapte bună
 */
```

Se observă că o funcție generator se consumă cu o secvență `for...of`.

Funcționarea acestei funcții se bazează pe crearea unui obiect de tip `iterator`. De fapt, la apelarea funcției acest obiect se creează.
Dacă creem o referință la funcție, putem parcurge valorile obiectului creat de invocare (obiectul de tip `iterator`) folosing un cursor. Un cursor este o funcție care te ajută să parcurgi un șir de valori. Poți să-ți imaginezi cursorul ca pe un creion cu care urmărești textul atunci când citești o pagină a unei cărți.

Pentru exemplul de mai sus, să spunem că dorim să accesăm prima valoare. În acest caz, pur și simplu punem cursorul pe ea (o metodă oferită de iterator).

```js
function* emiteFormule(){
  yield "Salutare!";
  yield "Hai noroc!";
  yield "Noapte bună";
};

const refIterator = emiteFormule();  // în acest moment s-a creat un nou iterator

const primaValoare = refIterator.next();
console.log(typeof primaValoare);
console.log(primaValoare);  // Object { value: "Salutare!", done: false }

const aDouaValoare = refIterator.next();
console.log(aDouaValoare);  // Object { value: "Hai noroc!", done: false }

const aTreiaValoare = refIterator.next();
console.log(aTreiaValoare); // Object { value: "Noapte bună", done: false }

const aPatraValoare = refIterator.next();
refIterator.log(aPatraValoare); // Object { value: undefined, done: true }
```

Cursorul aduce valoarea iar funcția generator își suspendă execuția la momentul în care a adus valoarea cu `yield`.
Ceea ce trebuie înțeles este faptul că prin `yield` este adusă o valoare intermediară din generator, nu tot ceea ce poate oferi funcția generator.
Proprietatea done setată la false indică faptul că mai există valori care pot fi cerute.
Metoda done, așa cum se observă aduce un obiect care are drept proprietatea `value`, chiar valoarea evaluată prin primul `yield`.

Valorile pot fi iterate și printr-un `while` pentru a scoate valoarea din obiectul returnat de cursor. Pentru fiecare iterație testezi dacă done este true, adică dacă nu mai sunt obiecte de returnat. Aceasta va fi limita la care se va opri ciclarea.
Formularea condiției: `!(let element = refIterator.next()).done`.
Explicație:
- creezi o referință către obiectul adus de fiecre yield: `let obi;`
- `obi = refIterator.next()` aduce obiectul.
- pui expresia între paranteze pentru a o evalua. Evaluarea este obiectul adus de cursor: `(obi = refIterator.next())`
- Valoarea lui `done` o negi pentru toate obiectele returnate care au proprietate `value`, adică false va deveni true pentru ca bucla while să poată avansa.

Vom continua completând exemplul de mai sus.

```js
let obi;
while( !(obi = refIterator.next()).done ){
  console.log(obi.value);
};
// =>
/*
Salutare!
Hai noroc!
Noapte bună
 */
```

Modalitatea de a pargurge un generator cu o buclă `while` este mai greoaie față de ceea ce oferă `for...of`.

```js
function* emiteFormule(){
  yield "Salutare!";
  yield "Hai noroc!";
  yield "Noapte bună";
};
for(let obi of emiteFormule()){
  console.log(obi);
}
// =>
/*
Salutare!
Hai noroc!
Noapte bună
 */
```

Dintr-un generator poți apela alte generatoare.

```js
function* traduceri(){
  yield 'Salut!';
  yield 'Holla!';
  yield 'Ciao!';
  yield 'Konnichiwa!';
  yield 'Hello!';
}

function* emiteFormule(){
  yield 'Formule de salut in mai multe limbi';
  yield* traduceri();
};

for(let obi of emiteFormule()){
  console.log(obi);
};

// =>
/*
Formule de salut in mai multe limbi
Salut!
Holla!
Ciao!
Konnichiwa!
Hello!
 */
```

O chestie foarte faină care ține de felul în care funcționează generatoarele, este că se pot construi bucle infinite fără a avea temerea că se va returna erori de către mediul în care programul rulează. Acest lucrue este pentru că indiferent de faptul că limita este la infinit, generarea valorilor este controlată prin `yield`. Se poate ușor închipui o listă cu bilete de ordine sau orice necesită o listă care să se prelungească la infinit.

### Parcurgerea DOM folosing o funcție generator.

```js
function* parcurgDOM(element){
  yield element;
  element = element.firstElementChild;
  while(element){
    yield* parcurgDOM(element);
    element = element.nextElementSibling;
  };
};
const elementDOM = document.getElementById("fragment");
for(let element of parcurgDOM(elementDOM)){
  console.log(element);
};
```

## Introducerea și modificarea datelor dintr-un generator

Reține faptul că funcțiile generator pot primi date și după ce au pornit execuția.

### Prin intermediul argumentelor la momentul invocării

Prima metodă de a trimite date în generator este prin intermediul argumentelor la invocare.

```js
function* faCeva(ceva){
  yield ("Cineva a primit " + ceva);
};

let obiIterator = faCeva("o dudă");

// console.log(obiIterator.next());  // Object { value: "Cineva a primit o dudă", done: false }
let afirm = obiIterator.next();
console.log(afirm.value); // Cineva a primit o dudă
```

### Prin pasarea de argumente în metoda `next()`

Nu pot fi pasate valori la prima apelare a lui next() pentru că metoda next(), de fpat primite o valoare unui yield care așteaptă. Dacă nu există vreun yield care să aștept, nici valoare nu are cui să-i fie pasată.
Valoarea pasată este folosită de generator ca valoare a întregii expresii yield în care a fost înghețat generatorul.

```js
function* faCeva(ceva){
  let intern = yield ("Cineva a primit " + ceva);
  yield ("Altcineva a primit " + ceva +  "\nValoarea lui next anterior este " + intern);
};

let obiIterator = faCeva("o dudă");

let primulObi = obiIterator.next();
let primaVal = primulObi.value;
console.log(primaVal);  // Cineva a primit o dudă

let alDoileaObi = obiIterator.next("altceva");
let aDouaVal = alDoileaObi.value;
console.log(aDouaVal);
/*
Altcineva a primit o dudă
Valoarea lui next anterior este altceva
 */
```
