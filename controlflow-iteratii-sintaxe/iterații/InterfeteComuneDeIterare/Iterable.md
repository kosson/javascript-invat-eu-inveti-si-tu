## Interfața `Iterable`

O interfață `Iterable` este cea care are o proprietate `@@iterator`. De fapt, ceea ce vrea această interfață este ca toate obiectele care o implementează să aibă proprietatea `@@iterator`. În fond, asta dorește orice interfață.

Valoarea acesteia este o funcție care returnează un obiect `Iterator`. Acest obiect returnat trebuie să fie conform interfeței `Iterator`.

Pentru a fi iterabil, un obiect trebuie să aibă implementată la nivelul obiectului intern de la care moștenește metoda `@@iterator`. Bucla `for...of` poate itera prin următoarele obiecte care respectă **protocolul iterator**: `Array`, `Map`, `Set`, `String`, `TypedArray` și `arguments`.

Aceste interfețe implementate cu ajutorul simbolurilor, permit parcurgerea și prelucrarea datelor care au fost introduse în valori ce moștenesc automat de la tipurile de obiecte interne corespondente. Acest lucru înseamnă că obiectul (sau unul din obiectele din lanțul prototipal), trebuie să aibă o proprietate cu o cheie `[Symbol.iterator]`. La ce mă refer este faptul că indiferent de natura datelor, text sau un array, ori un obiect *dicționar*, vor fi *ambalate* automat în obiectul intern corespondent. Acesta este și motivul pentru care poți aplica metode ale obiectelor interne direct pe valoarea identificată de o variabilă.

Valoarea lui `[Symbol.iterator]` este o funcție fără argumente ce returnează un obiect. Acest obiect returnat se conformează protocolului de interare (**iterator protocol**), ceea ce îl face pretabil unei prelucrări cu `for...of`, de exemplu.

```javascript
const ObiectIterabilNou = {
    // îl facem iterabil prin introducerea metodei specifice
    [Symbol.iterator] () {
        return Iterator;
    }
}
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

Odată cu ECMAScript 2015, beneficiem de enunțul `for...of`, care va face exact ce am realizat mai sus generând obiectul iterator. Array-urile sunt obiecte care implementează protocolul de iterare.

```javascript
for (let x of [1, 2, 3]) {
  console.log(x);
};
```

Parcurgerea se face automat, rezultatele fiind oferite la încheierea iterării. Ce te faci în momentul în care dorești să ai acces secvențial la valorile unei colecții? În acest caz, vom apela la funcțiile generator.
