# Var și let

Identificatorii declarați cu `var` beneficiază de mecanismul de hoisting prin care sunt aduși în *capul blocului* de cod și implicit al mediului lexical format. Acest lucru înseamnă că declarațiile `var` țin de funcția cea mai apropiată dacă o privim ca pe un container sau în obiectul global. Blocurile simple sunt complet ignorate.

Începând cu ES6 a fost adăugat `let`, care în comparație cu `var`, este legat la nivelul blocului de cod delimitat prin `{}`. Spunem că aceste variabile sunt block-scoped, fiind disponibile doar la nivelul blocului `{}`.

În cazul declarațiilor `let`, acestea nu sunt ridicate (hoisted) la vârful blocului. Din acest motiv, cel mai bine este ca declarațiile `let` să fie puse în capul blocului în mod voluntar pentru a fi disponibile în întreg blocul.

**Spune standardul**:

> Declarațiile let și const definesc variabile care sunt restricționate la scope-ul contextului de execuție în rulare a Mediului Lexical. Variabilele sunt create atunci când Mediul lor Lexical este instanțiat\[...].

Avem o explicație foarte bună pe care Kyle Simpson o face pentru a înțelege diferențele dintre cele două. În cazurile în care în codul sursă erau declarate variabile pentru a fi folosite în instrucțiuni precum `for` sau `if`, dar care nu se doresc a fi disponibile dincolo de aceste enunțuri, `let` este cea mai bună abordare pentru că domeniul său de vizibilitate este limitat la blocul de cod.

Dar dacă dorești ca o variabilă să fie cu adevărat disponibilă întregului cod, atunci continuă să folosești `var` pentru că va fi omniprezentă pentru acel program.

Partea neplăcută a lui `let` este că, atunci când nu este declarat chiar de la început, această variabilă nu va fi omniprezentă, ci doar la momentul la care se va ajunge cu execuția. Ce înseamnă acest lucru? Înseamnă că va fi distant în timp, va fi disponibil mai târziu, la momentul la care controlul programului ajunge la ea, nu de la bun început așa cum este cazul lui var. Chiar există și un termen pentru acest lucru în limba engleză menționat de standard: **Temporal Dead Zone** (*Zona de Timp Moartă* ar fi traducerea în lb. română), fiind perioada de timp cât nu este disponibilă.

Reține faptul că variabilele declarate cu `let` sunt *vizibile* doar la nivelul unei expresii și a unui bloc, precum și pentru toate blocurile imbricate. Atenție foarte mare la comportamentul lui `var` și `let` în contextul obiectului global. În vreme ce o declararea unei variabile folosind `var` are ca efect introducerea acelei variabile în obiectul global, declararea cu `let`, nu va avea acest efect și interogarea identificatorului va returna `undefined`.

```javascript
var ceva = 'ceva';
let altceva = 'altceva';

console.log(window.ceva); // ceva
console.log(window.altceva); // undefined
```

O atenție deosebită trebuie dată blocurilor de decizie sau cele de iterare a unor array-uri. Un exemplu foarte simplu pentru a face diferența dintre modul cum acționează `var` și cum acționează `let`.

```javascript
function teste(){
  var x = 1;
  if(x === 1){
    console.log(x);
    var x = 10;
    console.log(x);
  }
  console.log(x);
}; teste(); // 1 10 10
```
În cazul lui `let`, valorile vor fi disponibile la nivel de bloc:

```javascript
function teste(){
  let x = 1;
  if(x === 1){
    // console.log(x); // ReferenceError: can't access lexical declaration `x' before initialization
    let x = 10;
    console.log(x);
  }
  console.log(x);
}; teste(); // 10 1
```

## Erori la redeclarare

Dacă un identificator a fost definit deja în mediul lexical, la declararea unei variabile cu `let` folosindu-se același nume pentru identificator, va fi emisă o eroare.

## Bune practici

Folosește `const` pentru toate valorile pentru care nu se așteaptă nicio modificare de tip al valorii, știind că valoarea poartă și tipul în JavaScript și `let` în cazul în care știi clar că vor surveni modificări.

Folosește `var` când ai nevoie de mecanismul de hoisting (omniprezența în cod), dar și pentru momentele când ai nevoie să o redeclari. Cu alte cuvinte, folosește `var` atunci când ai nevoie de o valoare în mai multe medii lexicale diferite, care eventual sunt înlănțuite (*scope chaining*).

Declară toate variabilele necesare în capul codului / funcției în ordinea necesităților de accesare a valorilor. În cazul folosirii blocurilor de cod, care sunt permise odată cu ES6, pune toate declarațiile de variabile cu `let` chiar de la bun început pentru a evita **TDZ** - Temporal Dead Zone.

```javascript
function facCeva() {
  // cod util
  { let ceva = 10, altceva = ++ceva;
    // cod înscris unui
    // bloc dedicat
  }
};
```

În bucle folosește întotdeauna `let` ori `const` pentru a crea pentru fiecare iterație propria legătură **identificator - valoare**. În cazul lui `var`, vei avea acces mereu doar la ultima valoare dată de ultima iterare.
