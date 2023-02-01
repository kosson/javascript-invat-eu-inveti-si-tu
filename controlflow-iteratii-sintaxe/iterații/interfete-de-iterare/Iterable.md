# Interfața Iterable

Un iterabil este o structură de date care permite accesul la elementele sale. Accesul este permis câte un element odată și în plus, un obiect iterabil ține minte poziția în care a ajuns. De exemplu, șirurile de caractere, array-urile, map-urile și set-urile.

Un obiect iterabile este acela care implementează o interfață *Iterable*. Aceasta are o proprietate `@@iterator`. Interfața aceasta este considerat un adevărat protocol care are această metodă internă. Misiunea acesteia este să returneze un obiect *Iterator*, ce permite operațiunile specifice, fiind asigurată **conformitatea** cu interfața. Privind mai atent la `@@iterator`, observăm faptul că este un `Symbol`. Pentru a face distincția rapidă între **iterator** și **iterabil**, reține că iteratorul oferă metoda `next()` pentru a parcurge datele, iar iterabilul este obiectul care implementează protocolul, fapt care permite parcurgerea folosind sintaxa `for...of`.

Din perspectivă practică, `for...of` poate itera următoarele obiecte care respectă **protocolul Iterator**: `Array`, `Map`, `Set`, `String`, `TypedArray` și `arguments`.

Aceste interfețe implementate cu ajutorul simbolurilor, permit parcurgerea și prelucrarea datelor care au fost introduse în valori ce moștenesc automat de la tipurile de obiecte interne corespondente.

```javascript
let ceva = 'cineva';
console.log(typeof(ceva[Symbol.iterator])); // function
```

Dacă obiectul intern implementează interfața *Iterable*, orice obiect care moștenește de la acesta, va fi la rândul său iterabil. Acest lucru înseamnă că obiectul (sau unul din obiectele din lanțul prototipal), trebuie să aibă o proprietate cu o cheie `[Symbol.iterator]`. Indiferent de natura datelor, `String` sau un `Array`, la momentul aplicării vreunei metode specifice obiectului intern corespondent, vor fi *ambalate* automat în obiectul intern corespondent. Acesta este și motivul pentru care poți aplica metode ale obiectelor interne direct pe valoarea identificată de o variabilă, chiar dacă inițial aceasta este o valoare primară.

Valoarea lui `[Symbol.iterator]` este o funcție fără argumente ce returnează un obiect. Acest obiect returnat se conformează protocolului de interare (**iterator protocol**), ceea ce îl face pretabil unei prelucrări cu `for...of`, de exemplu.

```javascript
// implementare iterable
function cronometruInvers (pornire) {
  let următoareaValoare = pornire;
  return {
    [Symbol.iterator]: () => ({
      // implementare iterator
      next () {
        if (următoareaValoare < 0) {
          return { done: true };
        }

        return {
          done: false,
          value: următoareaValoare--
        };
      }
    })
  };
};
const timpRămas = cronometruInvers(3);
let valoare;
for (valoare of timpRămas) {
  console.log(valoare);
}
```

Folosind sintaxa spread (`...numeGenerator`) poți aplica fiecare element al iterabilului într-un anumit anumit context. Acest lucru înseamnă că poți *extrage* valorile direct într-un array, de exemplu.

```javascript
let listaCompletată = [10, 20, ...timpRămas]; // [10, 20, 3, 2, 1 0]
```

Să luăm un exemplu care se bazează pe moștenirea de la obiectul intern `String` prin ambalare. Acest obiect intern este un exemplu de obiect iterabil construit în limbaj.

```javascript
let unSir = "un sir de caractere";
typeof unSir[Symbol.iterator]; // "function"
```

De fapt, această metodă este o fabrică (un șablon de programare numit în domeniu: **factory**) pentru iteratori. Ori de câte ori un obiect trebuie să fie iterat, este invocată metoda `@@iterator` fără nici un argument. Este creat și returnat un obiect iterabil. Folosind metoda `next()` obții un obiect care are propritățile `value` și `done`. Cheia `value` are valoarea elementului la care a ajuns *cursorul* în parcurgerea obiectului iterabil, iar `done` prin valoarea boolean confirmă parcurgerea integrală a obiectului iterabil.

```javascript
let iterator = [1, 2, 3][Symbol.iterator](),
    element;
while( !(element = iterator.next()).done ) {
  console.log(element.value);
};
```

**Moment Zen**: Șirurile de caractere și seturile de valori sunt structuri iterabile.

Odată cu ECMAScript 2015, beneficiem de enunțul `for...of`, care va face exact ce am realizat mai sus generând obiectul iterator. Array-urile sunt obiecte care implementează protocolul de iterare. Pentru a verifica, dacă vom da repede `console.log(Array.prototype);` și observăm că este disponibilă o funcție `Symbol(Symbol.iterator)`. Dacă am executa această funcție, am obține un obiect iterator: `let iterator = nume_array[Symbol.iterator]()`.

```javascript
for (let x of [1, 2, 3]) {
  console.log(x);
};
```

Parcurgerea se face automat, rezultatele fiind oferite la încheierea iterării. Ce te faci în momentul în care dorești să ai acces secvențial la valorile unei colecții? În acest caz, vom apela la funcțiile generator.
