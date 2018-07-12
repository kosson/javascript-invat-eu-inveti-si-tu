# Object.entries()

Este o metodă introdusă de ECMAScript 2017.

Returnează un array de array-uri având drept valori numele tuturor proprietăților unui obiect sub formă de perechi în câte un array dedicat. Proprietățile trebuie să fie enumerabile și să aparțină obiectului respectiv.

```javascript
let obi =  {
  a: 10,
  b: true,
  c: function () {
    return 'ceva';
  }
};
let colectie = Object.entries(obi);
console.log(colectie);
// [["a",10],["b",true],["c",null]]
```

După cum se observă, această metodă este folositoare câtă vreme obiectul nostru este un set de date, de fapt. În cazul metodelor, valorile lor vor fi reduse la `null`. Trebuie să fii avertizat de faptul că toate cheile simbol, dacă există vor fi ignorate neapărând în array-ul rezultat.

Un posibil scenariu de lucru ar fi combinarea cu metoda `map` pentru a transforma array-ul de date dându-i o nouă formă.

```javascript
let colectie = {
    Bacău: 'BC',
    Timișoara: 'TM'
  };
var rezultat =  Object.entries(colectie).map(
    ([oras, indicativ]) => `${oras}: ${indicativ}`
);
console.log(rezultat); // ['Bacău: BC', 'Timișoara: TM']
```

Un alt posibil scenariu de lucru cu datele este să transformi datele unui obiect într-un `Map`.

```javascript
let colectie = {
    Bacău: 'BC',
    Timișoara: 'TM'
  };

let structurate = new Map(Object.entries(colectie));
console.log(structurate);
// ​​​​​Map { 'Bacău' => 'BC', 'Timișoara' => 'TM' }​​​​​
```

## Referințe

-   [JavaScript ES8 Object.entries/values. Dale Jefferson. Published 10 Jun 2017](https://www.dalejefferson.com/es8-object-entries-values/)
