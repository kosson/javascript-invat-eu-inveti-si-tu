# Variabile

## Introducere

O variabilă este ceea ce spune însăși cuvântul: o zonă rezervată de care este nevoie pentru a „memora” o valoare. Această valoare poate să se modifice pe măsură ce codul se execută și de aici și denumirea de variabilă. Pentru a înțelege cât mai bine variabilele, amintiți-vă de identificatori și rolul acestora în „spațiul” creat de mediul lexical. După cum bine v-ați amintit, identificatorii sunt etichetele necesare variabilelor pentru a identifica „zona rezervată”. E ca o tăbliță cu numele stației de autobuz. Știm că stația se numește „Laborator” și identifică un spațiu în care va intra autobuzul din când în când.

## Declararea variabilelor

Pentru a declara o variabilă se va scrie `var variabila = 'ceva';`. În cazul în care sunt declarate mai multe variabile, se vor înșirui folosindu-se virgula, fără a mai specifica cuvântul cheie rezervat limbajului.

```javascript
var a, b = 'ceva', c = true; // declararea una după alta
var $ceva = 'Hanna',
    _altceva = 10,
    un_nume = 'George'; // DA, poți face asta! :D
let asteptValoarea01 = 100;
const ᚠ = 'o rună'; // se poate pentru că folosim UTF16
const 𓄿 = 'Horus'; // UTF16 din nou
```

Magia atribuirii valorii identificatorului o face operatorul `=`. Ceea ce se întâmplă dincolo de cortină este că se alocă un spațiu în memoria computerului pentru a „reține" valoarea asignată. Asignarea valorii se poate face dintr-un singur pas (`var x = 1;`), declarând și atribuind imediat, sau mai întâi poți declara numele variabilei și abia la momentul oportun vei face atribuirea valorii. Atribuirea, când spunem acest cuvânt ar trebui să ne gândim la realizarea „legăturii” dintre identificator și valoarea pe care o individualizează.

```javascript
var x; // în acest moment are valoarea undefined
x = 10; // poți verifica dacă s-a făcut atribuirea:
x; // este returnat 10
```

În JavaScript, la momentul constituirii mediului lexical, se fac și legăturile dintre numele identificatorilor și valorile lor. Atunci când sunt folosite numele identificatorilor ca și expresii, acestea sunt evaluate prin returnarea valorii lor.

```javascript
var a = {0: 10},
    b = a;
a === b; // true
```

De fapt, ceea ce am realizat este o copiere a variabilei `a` prin referință. Spunem că noua variabilă `b` face o trimitere către variabila deja existentă `a` care este legată la o valoare. În cazul nostru vorbim despre un obiect. Da, structura `{0: 10}` este un obiect foarte, foarte simplu.

Aceeași demonstație se poate realiza prin pasarea valorii ca argument al unei funcții. Pentru exemplificare vom folosi un șablon des întâlnit în JavaScript care se aplică pentru a executa imediat o funcție fără a o apela după identificatorul său. Deci, îmbrăcăm funcția în `()();`, ceea ce va avea drept efect direct evaluarea funcției instant. În limbaj tehnic, aceast șablon de lucru se numește IIFE (Imediately Invoked Function Expression) - expresie de funcție invocabilă imediat. Și mai folosim ceva foarte util: metoda `log` a obiectului `Console`. Dar mai întâi, vă invit să priviți la exemplu pentru a crea ceva context și cu siguranță nedumerire.

```javascript
(function () {
  var x = 10;
})(); console.log(x); // ReferenceError
```

Poți trage cu ochiul repede la funcții să afli mai multe, dar pentru moment este îndeajuns cât să ne putem descurca.
Știu că pe moment e cam multișor de înghițit, dar am pus astfel baze importante pentru viitor.

## Izolarea variabilelor în propriul lor mediu lexical - scope

Folosim funcțiile aici pentru că acestea au o proprietate extraordinară care face ca aceste exemple să funcționeze: creează propriul mediu lexical. Supertare! Bine, începând cu ES6, simpla declarare a blocului de cod prin acolade `{}` creează un mediu lexical (scope). E foarte importantă această caracteristică pentru că de ea ține felul în care izolăm, combinăm și punem execuția unei funcții într-un anumit context.

```javascript
var a = {0: 10};
(function (b) {
  console.log(b === a);
})(a); // true
```

JavaScript permite modificarea valorii preexistente a unei varibile. Această posibilitate se numește „umbrire” (shadowing).

```javascript
var valoare = 10;
valoare = 15; console.log(valoare); // 15
```

Ceea ce se întâmplă este o refacere a unei legături la o altă valoare în mediul lexical. Merită investigat ceea ce se întâmplă și în cazul mediilor lexicale generate de funcții.

```javascript
(function x () {
  var ceva = 10;
  (function y () {
    var ceva = 15;  // declarare
  })();
  return ceva;
})(); // 10
```

Funcția `x` creează un mediul lexical (un scope) în care se va afla valoarea `10` legată de numele `x`. În interiorul funcției x, este evaluată funcția y care creează propriul mediu lexical în care este declarată o variabilă proprie cu numele `ceva`. Pentru că se face o declarare în sine, chiar dacă variabila poartă același nume cu variabila din mediul lexical (scope) extern la care funcția internă are acces, variabila din mediul intern, nu o va „umbri” (suprascrie) pe cea din mediul lexical extern. Situația se va schimba dacă nu se face declarare, ci asignare a unei valori.

```javascript
(function x () {
  var ceva = 10;
  (function y () {
    ceva = 15;  // asignare
  })();
  return ceva;
})(); // 15
```

**Moment ZEN**: Variabilele sunt legături ale identificatorilor la valorile lor.

Nu folosiți niciodată cuvintele rezervate ale limbajului drept nume pentru variabile. Se va solda cu apariția unei erori.

Reține și faptul că JavaScript face diferența dintre majuscule și minuscule. Astfel, `oVariabila` nu este echivalentul lui `ovariabila`. Sunt două variabile diferite din punctul de vedere al JavaScript.

Javascript folosește trei cuvinte cheie specifice limbajului: `var`, `let` și `const`. `let` și `const` au fost adăugate în ES6 și sunt legate strict de blocul de cod delimitat prin acolade.

Cele trei moduri de a declara variabile au efect și asupra scope-ului.

## Folosirea lui `var`

Prin folosirea lui `var`, declararea variabilei se face în global scope sau în cea mai apropiată funcție. Nu este localizată la nivel de bloc de cod `{}`. De exemplu, pentru o ciclare cu for, variabila definită ca și condiție și poate o variabilă în blocul său, de fapt sunt „înregistrate" în scope-ul funcției care găzduiește `for` și nu în cel al lui `for`. Din nevoia de a localiza la nivel de bloc variabilele, au fost introduce de ES6 `let` și `const`.

O declarație `var` în cadrul unei funcții urmează două ipostaze:

- partea declarativă este supusă `hoisting-ului` ajungând automat în `capul funcției`, având valoarea `undefined`, iar
- inițializarea se face acolo unde există în cod și unde se face și asignarea valorii.

```javascript
function ex(){
  var x = undefined; // nu se vede, lucrează hoistingul.
  //...
  x = 10;
};
```

Buna practică spune ca atunci când folosești var pentru a declara variabile, pune-le pe toate imediat ce ai deschis blocul de cod. Astfel, le vei face omniprezente pentru acea zonă de cod și va fi mai ușor de operat cu ele. Un alt sfat foarte bun spune că cel mai decent pentru a ușura comunicarea cu ceilalți programatori care vor inspecta codul tău mai târziu este să faci declararea variabilelor cât mai aproape de locul în care vor fi utilizate. Alt sfat important este ca variabilele în cazul unei secvențe mari de cod să fie redeclarate mai jos în cazul în care vor fi folosite iar în loc de a folosi referința deja creată. De ce? Pentru a nu-l fugări pe colegul tău pe tot codul înapoi și să facă muncă de detective pentru a afla unde a fost declarată. Bineînțeles că vei face și un mic comentariu în care explici de ce ai ales redeclararea. Atenție, acest lucru nu este pobil atunci când folosești `let`. Aceste sfaturi de la Kyle Simpson vin, din experiența sa de zi cu zi și bazat pe aceasta, mai oferă un motiv pentru care ar trebui apreciat `var` în contrast cu `let`. Acest exemplu este inițializarea condițională a unui set de variabile, care în funcție de test se vor reinițializa la valorile corespondente bateriei respective de teste. Acest lucru nu este permis în cazul lui `let` pentru că `let` permite declararea o singură dată.

```javascript
function facCeva() {
  if ( // condiție ) {
    var a = 0;
    var b = true;
  } else if ( // altă cond.) {
    var a = 10;
    var b = false;
  }
};
```

### Standardul spune

Un enunț `var` declară variabile care sunt în *aria de efect* al contextului de execuție curent. Variabilele `var` sunt create atunci când este instanțiat mediul lexical care le conține, dar la momentul în care sunt create, li se asignează valoarea `undefined`. Asignarea valorii se face la momentul execuției, nu la momentul creării. Valoarea este asignată la momentul execuției codului, nu la momentul declarării.

## `let` și `const`

Numele de `let` vine din matematică însemnând: `fie`: fie x un număr cu valoarea 1. Definesc variabile în cel mai apropiat „mediu lexical" (scope), care poate fi global scope, un block `{}` sau o buclă precum `for`. Rolul lor este de a localiza la nivel de înregistrare în scope la nivel de `global`, `function` și block `{}`.

### Standardul spune

Declarațiile `let` și `const` definesc variabilele care aparțin mediului lexical al contextului de execuție curent. Variabilele sunt create atunci când mediul lexical este instanțiat, dar nu vor fi accesate nicicum până când nu sunt evaluate legăturile la valori (**lexical binding**). Valoarea este asignată atunci când este evaluat acest **lexical binding**, nu la momentul declarării lor. Dacă o declarație cu `let` nu are o valoare de inițializare, este asignat `undefined` la momentul în care este evaluat, adică la momentul când se face `lexical binding` și se completează așa-numitul „Registru de mediu".

## Mantre

- Valorile primitive și obiectele au proprietăți și metode. Primitivele beneficiază de acestea prin „împachetarea" valorii în obiectul corespondent.
- La momentul evaluării, variabilele sunt create când se constituie `lexical environment`-ul (scope), dar nu poate fi accesată până când nu se face legătura la valoare. La momentul creării, variabile declarate cu `var`, vor fi inițializate automat cu valoarea `undefined`.
- Variabilele și funcțiile beneficiază de un proces al motorului JavaScript numit **_identifier lookup_**. Este necesar pentru a discrimina între variabilele din local scope dintr-o funcție și una din global scope.
- La executarea codului JavaScript este nevoie de un loc unde să fie stocate variabilele locale. Acest loc este **obiectul scope** cunoscut și sub numele de **lexical environment**. Se poate percepe ca un obiect la a cărui membri ai acces, dar nu poți referenția obiectul în sine.
- Dacă declari o variabilă în corpul unei declarații if, această variabilă va fi disponibilă și în afara blocului funcțional, fie că blocul a fost executat sau nu. Se întâmplă pentru că se face hoisting. Folosirea cuvântului cheie `let` atașează variabila de blocul funcțional.
- Scope-ul unei variabile poate fi înțeles setul de linii de cod sursă pentru care este definit un identificator.
- Variabilele locale sunt disponibile numai funcției în care au fost declarate și tuturor funcțiilor interne. Nu se pot vedea din afară.
- Variabilele locale sunt reatribuite cu valori de fiecare dată când o funcție este invocată.
- Parametrii unei funcții sunt la rândul lor variabile locale.
- Declarațiile de variabile se află în scope de la momentul în care au fost declarate, până la închiderea blocului funcției în care au fost declarate indiferent de imbricarea altor blocuri `{}`.

## Evaluarea unei expresii care conține valori delimitate prin virgulă

```javascript
var x = 1;
var y = 2;
var z = x + y; // 3

console.log( y = (x = y,z) ); // evaluează la 3
```

// x va fi 2 pentru că va primi valoarea pe care o are y // y va fi 3 pentru că evaluarea unei înșiruiri delimitate de virgulă returnează ultima valoare din înșiruire.

Am menționat faptul că variabilele locale sunt stocate în scope, care poate fi perceput ca un obiect la al cărui membri ai access. Atunci când în execuție interpretorul caută o proprietate în obiectul scope curent. Dacă nu o găsește, atunci interpretorul va văuta mai sus în obiectul scope părinte și tot așa până când nu mai există un alt obiect părinte. Această secvență de obiecte scope se numește **scope chain**. Atenție, scope-ul se formează la momentul declarări, nu la momentul execuției.

## Destructurarea obiectelor sau destructuring assignment

ES6 introduce posibilitatea de a transfera valorile cheilor unor variabile care trebuie să respecte o singură cerință: numele identificatorilor să fie aceleași cu cele ale proprietăților. Dacă vrem să privim obiectele ca pe niște depozite de valori identificate prin numele cheilor, atunci cu siguranță că asignarea prin destructurare va fi o binecuvântare.

```javascript
var obi = {a: 4, b: true, c: function y(){return 'salut'}};
var {b, c} = obi;
console.log(a); // undefined
console.log(b); // true
console.log(c()); // salut
```

La fel de bine ar merge și asignarea directă cu singura condiție ca expresia să fie în interiorul unui operator de grupare.

```javascript
({a,b,c} = obi);
```

Dacă nu este introdus între paranteze rotunde, motorul JavaScript va considera acoladele ca un bloc de cod distinct.
Destructurarea funcționează foarte bine și în cazul array-urilor. În acest caz nu mai este necesară respectarea parității numelor ientificatorilor cu cea a cheilor pentru că nu mai avem chei. Potrivirea se va face în ordinea elementelor din array.

```javascript
var arr = [1, true, function y () {return 'salut'}, 10, 20];
var [nr, bool, igrec, ...valori] = arr;
console.log(nr); // 1
console.log(bool); // true
console.log(igrec()); // salut
console.log(valori); //[Array] [10,20]
```

Folosind operatorul spread (...), putem introduce restul valorilor din array într-un array cu identificator prestabilit.

## Stări confuze

Se poate întâmpla ca la momentul în care citești codul scris de altcineva sau codul scris de tine în trecut să nu mai poți aprecia cu claritate ce este disponibil, cui. Reține faptul că variabile pot fi pasate ca argumente.

Când există o stare de confuzie, cel mai bine este să arunci o privire unde este definită funcția (nu unde este apelată) și identifică acolo ce este vizibil.

## Resurse

[Wikipedia, Name binding](https://en.wikipedia.org/wiki/Name_binding)
