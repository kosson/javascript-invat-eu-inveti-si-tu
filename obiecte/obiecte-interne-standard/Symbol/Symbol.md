# `Symbol()`

Cel mai bine învățăm din povești iar trecutul limbajului de programare JavaScript oferă câteva interesante, care au orientat dezvoltarea limbajului către introducerea unui nou tip de valori primare așa cum sunt simbolurile. Legenda spune că de îndată ce JavaScript nu a mai fost tratat ca pe un mijloc de a dinamiza paginile web care erau statice prin interacțiune, programatorii au început dezvoltarea de biblioteci de cod. Aceste biblioteci de cod includeau propriile obiecte, care „se întâlneau” cu obiectele provenite din utilizarea altor biblioteci de cod. Inevitabil propritățile unui obiect intrau în coliziune cu proprietățile altor obiecte în cazul în care propritățile aveau același nume. Pentru a evita astfel de coliziuni, se apela la diverse mecanisme de protejare a propriilor obiecte pentru a fi sigure în utilizare. Dar odată cu apariția lui `Symbol` mare parte din aceste probleme vor dispărea.

`Symbol` este o proprietate a obiectului global. Nu trebuie folosit cu `new` pentru că nu este un constructor de obiecte. Pur și simplu nu permite sintaxa `new Symbol()`. Dacă i se pasează un argument care nu este undefined, acest argument va fi un șir de caractere care va avea rolul de descriptor pentru noul simbol creat.

`Symbol()` este o funcție care returnează o valoare de tipul symbol. Adu-ți aminte mereu faptul că un simbol este o valoare primară. A fost introdusă de ECMAScript 6. Pe scurt, un simbol este asociat cheii unei proprietăți a unui obiect. Evidența simbolurilor este ținută prin intermediul unui **registru global de simboluri**.

Symbol nu este chiar o creație ECMAScript, ci este un concept folosit și în alte limbaje de programare. Am aflat că în limbajul de programare Lisp, toți identificatorii sunt considetați a fi simboluri. Până la apariția simbolurilor, toți identificatorii din JavaScript erau exclusiv șiruri de caractere. Dacă ții morțiș, poți converti un simbol la un șir de caractere folosind metoda `toString`.

```javascript
var piatră = Symbol('onix');
typeof piatră; // "symbol"
typeof piatră.toString(); // "string"
```

Symbol are totuși o serie de proprietăți care oferă acces la membrii acestui obiect intern, are proprietăți statice, care îți permit să investighezi registrul global de simboluri, care este constituit înainte de a se începe evaluarea codului.

Standardul lămurește faptul că atunci când se constituie registrul simbolurilor, care este o listă de elemente, care fiecare, individual, este un „Record”, ceea ce decriptat înseamnă că avem de-a face cu un obiect (19.4.1 The Symbol Constructor). Da, fiecare simbol este, de fapt, câte un obiect care are două proprietăți:

- cheia pentru prima proprietate este `[[Key]]` și are drept valoare un șir de caractere necesar identificării la nivel global a simbolului respectiv și
- a doua proprietate care are drept cheie `[[Symbol]]`, care are drept valoare un **simbol** ce poate fi accesat din oricare tărâm.

Folosim simbolurile pentru a avea chei cu adevărat unice pentru proprietățile unui obiect și oriunde avem nevoie de identificatori unici. Simbolurile sunt ca niște fulgi de nea. Nu există asemănare a unuia cu altul.

Valorile de acest tip pot fi folosite pentru a face anumite proprietăți ale unui obiect să fie anonime. Astfel, se poate realiza trecerea unor proprietăți într-o zonă „privată”, care să fie disponibilă doar obiectului pentru care s-au creat aceste proprietăți. După cum am observat, există deja construite astfel de proprietăți în obiectele interne ale JavaScript.

Îndeajuns cu teoria. Cel mai rapid scenariu de utilizare este al unui simbol utilizat ca proprietate a unui obiect.

```javascript
var unSimbol = Symbol('oDescriere');
this[unSimbol] = function () {
  console.log('fac ceva');
};
```

Ceea ce tocmai s-a întâmplat este că s-a creat un simbol, care este o valoare ce va sta „ascunsă” și care poate fi referențiată doar prin identificatorul variabilei și prin apelarea metodei `getOwnPropertySymbols()`. Am spus că stă „ascunsă” pentru că este non-enumerabilă, ceea ce înseamnă că nu „iese la numărătoarea” cu `for...in`, prin sondarea cu `Object.getOwnPropertyNames(obiect)` sau prin interogarea obiectului cu `Object.keys(obiect)`.

Un detaliu foarte important este acela că proprietățile pentru care cheile sunt simboluri nu pot fi accesate decât prin folosirea sintaxei cu paranteze drepte.

```javascript
var obi = {},
    propPrivata = Symbol('stauPitita');

obi[propPrivata] = "ceva privat";
obi[propPrivata]; // "ceva privat"
console.log(Object.getOwnPropertyNames(obi)); //=> []
console.log(Object.getOwnPropertySymbols(obi)); // [Symbol(stauPitita)]
console.log(Reflect.ownKeys(obi)); // [Symbol(stauPitita)]
```

Se observă faptul că simbolurile ies la iveală prin interogarea cu `Object.getOwnPropertySymbols(obiect)`, fiind generat un array cu acestea, dar mai există o metodă a obiectului intern Reflect: `Reflect.ownKeys(obiect)`.

## Metode de acces la registrul simbolurilor

Metodele `Symbol.for()` și `Symbol.keyFor()` pot accesa valorile din registrul simbolurilor. După cum am văzut anterior, registrul simbolurilor este creat înainte de evaluarea codului JavaScript și este o listă de obiecte care există în motor și care nu poate fi accesată direct. Aceste două metode sunt singurii mediatori dintre procesul de rulare a codului (*runtime*) și registrul simbolurilor.

### `Symbol.for(cheieSimbol)`

Această metodă aduce un simbol din registrul simbolurilor.

Invocarea lui `Symbol.for("stringDeId")` introduce un simbol în registrul simbolurilor (comportament în Firefox). La o invocare ulterioară cu aceeași valoare string la argument, aduce același simbol setat prima dată.

```javascript
let primo = Symbol.for('unu');
let secundo = Symbol.for('unu');
primo == secundo;
```

### Symbol.keyFor()

## Well-Known Symbols - „simboluri binecunoscute”

Standardul indică o serie de simboluri pe care le atașează atributul de „binecunoscute”. În spatele fiecărui astfel de simbol „binecunoscut” se află algoritmi (acești algoritmi sunt interni motorului de JavaScript) care au anumite efecte. Am putea spune că, de fapt, aceste simboluri identifică proprietăți care oferă „funcționalități binecunoscute” pentru obiectele interne. Mai pe scurt, unele obiecte interne JavaScript, au niște proprietăți ale căror chei sunt simboluri. Ce se ascunde în spatele lor este un algoritm, care oferă o funcție sau un anume comportament la momentul când tu, ca programator, le invoci.

Un lucru foarte important pe care-l menționează standardul este acela că „valorile simbolurilor binecunoscute sunt comune tuturor tărâmurilor”.

Prin ce se disting *simbolurile binecunoscute* de celelalte? Prin faptul că sunt referențiate printr-o notație specială folosită doar în textul standardului. Acesta este formată din numele simbolului, care este stabilit de standard, precedat de o pereche de ampresand: `@@iterator`, de exemplu. Pentru cazul utilizării de zi cu zi, aceste simboluri binecunoscute sunt parte a obiectului cu rol de prototip pentru obiectele interne `Object`, `Array` și `String` cu excepția unuia singur care este operatorul `instanceof`.

### Symbol.hasInstance

Acesta este cazul operatorului `instanceof` prin care putem afla dacă un anumit obiect este o instanță a celui pentru care se face investigația.

### Symbol.isConcatSpreadable

Aceasta este o valoare boolean. Ceea ce indică ea este dacă un obiect poate fi transformat într-un array ce conține proprietățile sale atunci când se invocă `concat` pe un array existent. Adu-ți aminte că un array este la rândul său un obiect, de fapt. Acest simbol dă girul că obiectul poate fi tratat ca un array căruia urmează să i se adauge noi elemente.

### Symbol.iterator

Acest simbol este mijlocul prin care se aplează iteratorul pentru un anumit obiect. Este binecunoscută apelarea iteratorului atunci când se folosește `for...of`.

### Symbol.match

Este simbolul care pune în funcțiune algoritmii responsabili cu realizarea unei căutări într-un șir de caractere după un șablon. Este apelabil prin invocarea metodei `match()` pusă la dispoziție de obiectul intern RegExp.

### Symbol.replace

Este simbolul care pune în funcțiune algoritmii responsabili cu realizarea unei înlocuiri a unui fragment dintr-un șir care se potrivește cu un șablon. Este apelabil prin invocarea metodei `replace()` pe care obiectul intern RegExp o oferă.

### Symbol.search

Este mecanismul declanțat la căutarea într-un șir după un șablon atunci când este apelată metoda `search()` a lui RegExp.

### Symbol.species

Este o valoare implicată în crearea de obiecte derivate.

### Symbol.split

Este algoritmul care se pune în mișcare la apelarea metodei `split()` pe care obiectul intern String o pune la dispoziție.

### Symbol.toPrimitive

Un simbol utilizat pentru a converti un obiect la o primitivă. Standardul îl menționează, dar încă nu există aplicații practice.

### Symbol.toStringTag

Este algoritmul implicat de metoda `toString` a obiectului intern `Object`.

### Symbol.unscopables

Sunt proprietățile care sunt excluse de la folosirea lui `width`.

## Lucrul cu symbol-urile

Evaluarea funcției `Symbol()` este o valoare de tip `symbol`. Adu-ți aminte mereu faptul că simbolurile sunt tipuri de date primare.

```javascript
var unSimbol = Symbol('simbol01');
typeof unSimbol; // "symbol"
```

Spune standardul că valoarea pentru slotul intern [\[Prototype]] a lui Symbol este `funcția-obiect internă` a cărui slot intern [\[Prototype]] este obiectul prototype a lui Object.

Tot standardul aduce lămuriri în ceea ce privește câteva aspecte care țin de bucătăria motoarelor JavaScript, dar care ne vor face nouă o imagine a contextului. Motorul de căutare înainte de a porni evaluarea codului construiește în „culise” o listă goală dedicată tuturor simbolurilor care vor fi create. Lista aceasta poate fi înțeleasă ca un registru. Chiar se numește **GlobalSymbolRegistry** și este o listă disponibilă tuturor tărâmurilor care ar putea fi; e o listă globală.

Structura unei singure înregistrări din acest registru este cheie (un șir de caractere) - simbol (un simbol).

## De ce avem nevoie de Symbol?

Pentru că un simbol este unic și nu poate fi modificat.

```javascript
console.log(Symbol('ceva') === Symbol('ceva')); // false
```

## Simboluri interne folosite de JavaScript

Începând cu ECMAScript 5, motorul JavaScript folosește o suită de simboluri interne pe care standardul le numește „well-known” - bine cunoscute.

## Referințe

https://hacks.mozilla.org/2015/06/es6-in-depth-symbols/
