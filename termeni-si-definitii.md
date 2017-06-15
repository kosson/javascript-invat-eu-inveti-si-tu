# Termeni și definiții

Această anexă este dedicată construirii unui mic ghid de orientare în terminologia limbajului.

## type - tip

Este un set de valori de date. Un program manipulează valori, fiecare asociate unui anumit tip. Tipurile se subîmpart în **tipuri ale limbajului** și **tipuri specifice unei implementări**.
Tipurile limbajului ECMAScript sunt valorile care pot fi manipulate direct de un programator. Aceste tipuri sunt: `Undefined`, `Null`, `Boolean`, `String`, `Number` și `Object`.

Tipul `Undefined` are fix o singură valoare: `undefined`.
Tipul `Null` are fix o singură valoare: `null`.
Tipul `Boolean` are două valori: `true` și `false`.
Tipul `String` este setul tuturor valorilor ca serii de 0 și 1 ($2^{53} - 1$ elemente). Fiecare element este o valoare pentru codarea unui caracter în baza schemei UTF-16. Aceste valori sunt indexate începând cu 0.

## primitive value - valoare primară

Valorile primare uneori prin calchiere și neglijență „botezate” și „primitive”, sunt una dintre cele 6 tipuri posibile: Boolean, Null, Undefined, String, Number, Symbol

O valoare primară este una care poate fi redată direct.

## object - obiect

Un obiect este un membru al tipului `Obiect` și este o colecție de proprietăți care are un singur obiect prototip.

## constructor

Este un obiect funcție care creează și inițializează obiecte.
Valoarea proprietății `prototype` este un obiect prototype care este folosit pentru a implementa propriu-zis mecanismul de moștenire și pentru a accesa proprietățile.

## prototype - prototip

Este un obiect care oferă proprietăți ce pot fi împărtășite cu alte obiecte.

Atunci când constructorul creează un obiect, acel obiect referențiază direct proprietatea `prototype` a constructorului pentru a rezolva cererile care vin din referențierea diferitelor proprietăți.
Atenție, se poate contrui un obiect nou pentru care să specifici care va fi prototipul folosindu-ne de funcția internă `Object.create()`.

## ordinary object - obiect ordinar

Este un obiect care are un comportament comun pentru metodele sale interne și care trebuie să fie suportat de toate obiectele.

## exotic object - obiect exotic

Este un obiect care nu are un comportament comun pentru una sau mai multe dintre metodele sale interne.

## built-in object - obiect intern

Este un obiect care este specificat și oferit de orice implementare a ECMAScript. Unele obiecte built-in pot fi constructori.

## undefined value - valoare nedefinită - valoare undefined

Este o valoare primară care este folosită atunci când încă nu a fost atribuită o valoare unei variabile.

## Undefined type - tipul Undefined

Un tip al cărui valoare exprimată nu poate fi decât `undefined`.

## null value - valoare null

Este o valoare primară care reprezintă lipsa intenționată a unui obiect cu rol de valoare.

## Null type - tip Null

Este un tip a cărui valoare exprimată nu poate fi decât `null`.

## Boolean value - valoare boolean

Este membru al tipului Boolean. Sunt doar două valori Boolean: `true` și `false`.

## Boolean object - obiectul boolean

Este un membru al tipului Object, care este o instanță a constructorului obiectului intern standard `Boolean`.
Un obiect Boolean este crea folosind constructorul Boolean prin evaluarea unei expresii cu `new` prin care este introdusă o valoare Boolean ca argument. Obiectul rezultat are un zlot intern a cărui valoare este o valoare Boolean. Un obiect Boolean poate fi transformat într-o valoare Boolean.

## Valoare String

Este o valoare primitivă care este o secvență ordonată și finită de zero sau mai multe valori întregi de 16 biți fără semn.

O valoare String este un membru al tipului String. Fiecare valoare întreagă dintr-o secvență, reprezintă o singură unitate de 16 biți a unui text codat UTF-16. Totuși, ECMAScript nu pune nicio restricție sau cerință privind valorile cu excepția faptului că trebuie să fie numere întregi pe 16 biți fără semn.

## Tipul String

Este setul tuturor valorilor String posibile.

## Obiectul String

Obiectul String este un membru al tipului `Object` și este o instanță a constructorului obiectului intern standard String.

Un obiect `String` este creat folosindu-se constructorul `String` prin evaluarea unei expresii cu `new`, fiind introdusă o valoare `String` ca argument. Obiectul care rezultă are un zlot intern a cărui valoare este valoarea `String`. Un obiect `String` poate fi transformat într-o valoare `String` prin apelarea constructorului `String` pur și simplu ca funcție.

## Valoarea Number

Este o valoare primitivă corspunzătoare unui format de valoare binară cu precizie dublă conform IEEE 754-2008.
O valoare Number este un membru al tipului Number și este o reprezentare directă a unui număr.

## Tipul Number

Reprezintă setul tuturor valorilor Number posibile incluzând și valoarea specială „Not-A-Number” (NaN). Setul include și infinitate pozitivă și infinitate negativă.

## Obiectul Number

Obiectul `Number` este un tip al lui `Object`, care este o instanță a constructorului obiectului intern standard `Number`.
Un obiect `Number` este creat folosindu-se constructorul `Number` prin evaluarea unei expresii cu `new`, fiind introdusă o valoare number ca argument. Obiectul rezultat are un slot intern a cărui valoare este o valoare număr. Un obiect Number poate fi transformat într-o valoare numerică prin apelarea constructorului Number pur și simplu ca funcție.

## Infinity - infinitatea

Este o valoare numerică care este o valoare pozitivă.

## NaN

Este o valoare numerică care este o valoare „Not-A-Number” conform standardului IEEE 754-2008.

## Valoarea `Symbol`

Este o valoare primitivă care reprezintă o cheie unică pentru o proprietate a unui obiect, dar care nu este un String.

## Tipul `Symbol`

Reprezintă setul tuturor valorilor posibile ce pot fi un `Symbol`.

## Obiectul `Symbol`

Este un membru al tipului `Object`, care este o instanță a constructorului pentru obiectul intern standard `Symbol`.

## function - funcția

Este membru al tipului `Obiect` care poate fi invocat ca subrutină.
Suplimentar proprietăților sale, o funcție mai conține cod executabil și starea care determină cum se va comporta atunci când este invocată. Codul unei funcții poate sau nu poate fi scris în ECMAScript.

## built-in function - funcție internă

Este un obiect intern care este o funcție.
Exemplele de funcții interne includ `parseInt` și `Math.exp`. O implementare poate să ofere funcții interne care să fie independente de implementare și care nu sunt descrise în această specificație.

## property - proprietate

Este o parte a unui obiect care asociază o chei, fie aceasta o valoare String sau o valoare Symbol, cu o valoare.

În funcție de forma proprietății, valoarea poate să fie reprezentată, fie direct ca date (valoarea unei primitive, un obiect sau a o funcție-obiect) sau indirect ca pereche de funcții accesor.

## method - metodă

O funcție care este valoarea unei proprietăți.
Atunci când o funcție este apelată ca metodă a unui obiect, obiectul este pasat funcției ca valoare a lui `this`.

## built-in method - metodă internă

Este o metodă care este o funcție internă.
Metodele interne standard sunt definite în specificație, iar o implementare ECMAScript poate specifica și oferi și alte metode interne suplimentare.

## attribute - atribut

Este o valoare internă care definește unele caracteristici ale unei proprietăți.

## own property - proprietate proprie

Este o proprietate care aparține în mod direct obiectului său.

## inherited property - proprietate moștenită

Este o proprietate a unui obiect care nu este proprietate proprie, ci este una moștenită din prototipul obiectului.

## 
