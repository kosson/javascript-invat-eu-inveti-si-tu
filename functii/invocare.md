## Ce se întâmplă când o funcție este invocată?

1. se aplează funcția iar locul în care se întâmplă acest lucru se numește **call-site**
- Se stabilește **execution context** - contextul de execuție
  1. vorbim de context de execuție global (obiectul **window**) când funcția este invocată ca funcție, nu ca metodă sau callback
  2. contextul de execuție este o sumă de informații (activation record) privind
    1. **unde** a fost apelată funcția (în callstack)
    2. ce parametri au fost pasați, etc,
    3. referința `this` care va fi folosită pe durata execuției funcției.

2. Se generează un obiect căruia îi sunt pasate automat ARGUMENTELE și **this**.

**arguments** este o colecție (seamănă dar NU ESTE UN ARRAY) a tuturor argumentelor pasate funcției și are proprietatea length pentru a afla numărul argumentelor pasate. Valorile pot fi obținute prin indecși arguments[i].

Invocarea funcțiilor se poate face în patru cazuri:

1. ca funcții
2. ca metode
3. ca și constructori cu `new`
4. indirect prin apelarea într-un context de execuție diferit folosind call() și apply() (vezi binding explicit la `this`)

## Invocare condițională

Poți invoca rapid prin evaluarea Truthy sau Falsy a unei expresii

```js
var testVal = 200;
testVal >= 150 && console.log("Acest mesaj va apărea dacă evaluarea lui testVal este truthy");            // Acest mesaj va apărea dacă evaluarea lui testVal este truthy
testVal >= 150 || console.log("Acest mesaj va apărea doar dacă evaluarea din left-hand-side este true");  // true
```

În caz de valoare truthy, pentru && se va afișa mesajul, dacă false, va returna false expresia.
În caz de valoare truthy, pentru || se va returna `true`. Pentru false, se va afișa mesajul.

Un alt caz este apelarea unui callback:

```js
function tester(callback){
  callback && callback();
};
```
