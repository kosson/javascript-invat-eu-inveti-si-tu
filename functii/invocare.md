# Invocarea funcțiilor

La momentul începerii execuției codului, toate funcțiile declarate cu `function` există deja în mediul lexical (vezi etapa de compilare) și sunt atribuite identificatorilor ca valori. Acest lucru este valabil doar pentru declarațiile de funcții (**function declaration**), nu și pentru **expresiile de funcții**. Expresiile de funcții și **arrow functions** nu fac parte din această secvență, fiind create la momentul în care **execuția** ajunge unde sunt declarate și le evaluează pentru a atribui o valoare identificatorului din stânga egalului. Invocarea funcțiilor se face prin operatorul `()`. La invocare se creează un nou context de execuție, care ajunge în stiva apelurilor (*call-stack*).

**Spune standardul**:

> Atunci când se stabilește un context de execuție pentru a evalua o funcție ECMAScript, este creat un nou Environment Record, precum și legăturile pentru fiecare parametru formal din acel Environment Record. Fiecare declarație din corpul funcției este instanțiată și ea. Dacă parametrii formali ai funcției nu includ niciun inițializator pentru valori implicite, atunci corpul declarațiilor sunt instanțiate în același Environment Record ca și parametrii. Dacă aceștia există, este creat un al doilea Environment Record pentru declarațiile din corp. Parametrii formali și funcțiile sunt inițializate ca parte a FunctionDeclarationInstantiation. Restul celorlalte legături sunt inițializate în timpul evaluării corpului funcției.

[9.2.12 FunctionDeclarationInstantiation ( func, argumentsList ). Nota 1](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-functiondeclarationinstantiation)

## Ce se întâmplă

Înainte de a radiografia efectele apelului de funcție, ne vom uita în standard la algoritmul intern motorului `FunctionInitialize(F, kind, ParameterList, Body, Scope )`. Argumentele acestui algoritm intern sunt o funcție obiect `F`, mențiunea `kind` care indică ce tip de funcție este (*Normală*, *Metodă*, *Arrow*), o listă cu toți parametrii, un corp care cuprinde codul ce urmează să fie evaluat și un *Mediu Lexical* care este identificat ca scope. Alcătuind acest context să vedem în ce constă execuția unei funcții.

 #1 Locul în care se întâmplă acest lucru se numește **call-site**.
 #2 Se creează un nou **execution context** - context de execuție care este introdus în stivă. Vorbim de context de execuție global (obiectul **window**), când funcția este invocată ca funcție, nu ca metodă sau callback.

Contextul de execuție este o sumă de informații (*activation record*) privind:

    1. **unde** a fost apelată funcția (în call-stack);
    2. ce parametri au fost pasați, etc.;
    3. referința `this` care va fi folosită pe durata execuției funcției.

 #3 Se face legătura la contextul lexical asociat acelei funcții (scope-ul). Pentru scope-ul extern, funcția va pune drept referință valoarea proprietății interne a funcției numită `[[Environment]]`.
 #4 Se generează un obiect căruia îi sunt pasate automat argumentele într-o colecție asemănătoare unui array și se constituie legătura **this**.

Obiectul **arguments** este o colecție (seamănă dar nu este un array) a tuturor argumentelor pasate funcției și are proprietatea `length` pentru a afla numărul argumentelor pasate. Valorile pot fi obținute prin `arguments[index]`.

## Invocarea funcțiilor - cazuri

1.  ca funcții;
2.  ca metode;
3.  ca arrow functions;
4.  constructori cu `new`;
5.  indirect prin apelarea într-un context de execuție diferit folosind `call()` și `apply()` (vezi binding explicit la `this`).

În toate aceste cazuri funcția generează obiectul `this` în mod diferit.

1.  la obiectul global rulând sub `"strict mode";` este `undefined`,
2.  la obiectul a cărui metodă este,
3.  la obiectul care tocmai a fost returnat,
4.  la obiectul precizat ca prim argument.

## Cazurile de invocare

### Funcție invocată

Această invocare se întâmplă atunci când este folosit operatorul `()`.

### Invocarea ca metodă

Când invoci funcția ca metodă a unui obiect, acel obiect devine **contextul** funcției, devenind accesibil funcției prin intermediul legăturii `this`. Acesta este mecanismul de acces la membrii obiectului.

### Invocarea în rol de constructor

Scopul unui constructor este acela de a crea un obiect, care este valoarea returnată prin execuția funcției cu operatorul `new`.

1.  Se creează un obiect nou.
2.  Se creează o legătură la obiectul prototype al funcției folosite cu `new`. Se creează legătura prototipală.
3.  Obiectul generat automat este pasat funcției cu rol de constructor ca fiind parametrul `this` și astfel, devine contextul de execuție a funcției constructor invocate (`this` este pasat ca parametru împreună cu `arguments`).
4.  Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul (`}`), `this` va fi returnat automat.

Există o mică discuție aici referitoare la invocarea unei funcții care este proiectată a fi constructor, dar care este utilizată în afara acestui scop. O funcție constructor poate returna o valoare, dacă este apelată fără operatorul `new`.

```javascript
function Ceva () {
  this.a = 10;
  return 100;
};
Ceva(); // 100
let instanta = new Ceva();
```

Observăm că funcția noastră va avea un comportament *normal* și va returna evaluarea oricăror expresii din corp. Astfel se explică de ce o parte din constructorii obiectelor interne pot fi apelați drept funcții, unii fiind folosiți pentru a face *casting* unor valori pentru care dorim un tip fix. Atenție, dacă se va apela cu `new`, valoarea returnată va fi complet ignorată și se va crea un obiect nou.

Mai există o situație interesantă legată de pierderea capacității de a genera un nou obiect a unui constructor creat de noi. Dacă funcția constructor va returna un obiect, atunci la invocarea cu `new`, nu va crea un obiect nou, ci îl va returna pe cel specificat.

```javascript
const obi = {a: 1};
function Ceva () {
  this.a = 10;
  return obi;
};
let obi2 = new Ceva();
```

Ca regulă de bună practică, constructorii îi denumim cu substantive și cu literă mare spre deosebire de funcții și metode pe care le denumim cu verbe și cu literă mică.

În cazul constructorilor se mai ridică o problemă interesantă. Toate variabile declarate în funcția constructor vor fi accesibile metodelor obiectului nou creat prin closure. Se poate realiza astfel o ascundere a unor valori care pot fi manipulate prin accesori. Acest lucru se petrece pentru că oricare funcție ține minte mediul în care au fost create prin slotul intern \[\[Environment]].

```javascript
function Manipulare () {
  let ascunsă = 10;
  // creezi un getter
  this.getAscunsă = function () {
    return ascunsă;
  };
  // creezi un seter
  this.setAscunsă = function (valoare) {
    ascunsă = valoare;
  };
};
var obi = new Manipulare();
obi.getAscunsă();
obi.setAscunsă(20);
```

Indiferent cât de multe obiecte ar fi instanțiate, se creează un closure pe mediul funcției care joacă rolul de constructor la momentul instanțierii. Obiectele generate sunt diferite, fiecare pornind de la valorile existente în funcția constructor la momentul invocării. Ceea ce am realizat cu această tehnică este să *ascundem* variabile și să le manipulăm prin efectul de closure realizat de metodele care le țin în viață - un joc între contextele de execuție și mediul lexical.

Din nefericire dacă creăm un alt obiect și îi facem un identificator căruia îi atribuim metoda de acces către valoarea așa-zis **privată**, o vom putea accesa cu ușurință pentru că până la urmă, o metodă este o funcție, care este o valoare. Acesta este motivul pentru care în JavaScript nu există posibilitatea de a avea variabile private cu adevărat.

### Invocarea funcțiilor prin call și apply()

Cele două funcții realizează un binding explicit a funcției cu un nou context de execuție. Se face *un împrumut* al mecanismelor și proceselor interne ale funcției în contextul de lucru oferit de un anume obiect.

## Invocare condițională

Poți invoca rapid prin evaluarea `truthy` sau `falsey` a unei expresii.

```javascript
var testVal = 200;
testVal >= 150 && console.log("Acest mesaj va apărea dacă evaluarea lui testVal este truthy");            // Acest mesaj va apărea dacă evaluarea lui testVal este truthy
testVal >= 150 || console.log("Acest mesaj va apărea doar dacă evaluarea din left-hand-side este true");  // true
```

În caz de valoare **truthy**, pentru `&&` se va afișa mesajul, dacă `false`, va returna `false` expresia.
În caz de valoare **truthy**, pentru `||` se va returna `true`. Pentru `false`, se va afișa mesajul.

Un alt caz este apelarea unui callback:

```javascript
function tester(callback){
  callback && callback();
};
```

## Invocare tail call

Un *tail call* este invocarea unei funcții atunci când o funcție este invocată ca ultimă evaluare a unei funcții gazde.

```javascript
function gazda () {
  return faCeva();
};
```

## Mantre

-   A invoca înseamnă aplicarea funcției pe zero sau mai multe argumente.
-   Funcțiile sunt invocate într-un loc care determină rezultatul, adică într-un anumit *context*.
-   La invocarea funcțiilor pe lângă argumente sunt constituite tacit legătura `this` și obiectul `arguments`.
-   Când invoci funcția ca metodă a unui obiect, acel obiect devine **contextul** funcției și acesta devine disponibil în funcție prin intermediul parametrului `this`.
-   `this` este un obiect-context: pentru funcții simple este `window` (nu și sub regula use strict), pentru metode este obiectul în care se execută, iar pentru noile obiecte create este chiar noul obiect generat.
-   în `"strict mode";`, la invocarea directă în global execution context `this` este `undefined`.
-   există patru cazuri în care o funcție este invocată: (1) ca funcție invocată în mod direct; (2) ca metodă, fapt care leagă invocarea de un obiect; (3) drept constructor prin care un nou obiect este generat; (4) prin folosirea lui `call()` și `apply()`.
-   La evaluarea funcției toate declarațiile dintre `{}` vor genera un `Environment Record`. Invocarea unei funcții creează un scope nou.
-   Contextul de execuție al unei funcții se modifică după „locul” în care a fost invocată.
-   Ori de câte ori o funcție este invocată se creează un nou context de execuție care este introdus în call-stack.
-   O funcție are acces și poate performa operațiuni asupra obiectului în interiorul căruia a fost invocată.
-   O funcție care returnează, fie `true`, fie `false` se numește funcție *predicat*.
