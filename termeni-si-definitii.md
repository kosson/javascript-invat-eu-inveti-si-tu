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
