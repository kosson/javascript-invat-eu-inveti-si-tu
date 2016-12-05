# Obiecte interne standard

Obiectele interne (`built-in`) includ `global object`.

O structură a acestor obiecte este oferită chiar de standardul ECMAScript care le subîmparte pe următoarele linii de funcționalitate:

- obiecte care sunt esențiale pentru rularea programelor includ `Object`, `Function`, `Boolean`, `Symbol` și `Error`,
- obiectele care reprezintă și manipulează valorile numerice includ `Math`, `Number` și `Date`,
- obiectele care prelucrează șiruri de caractere includ `String` și `RegExp`,
- obiecte care sunt de fapt colecții indexate de valori care includ `Array`, colecții cheie-valoare precum `Map` și `Set`,
- obiecte care suprtă date structurate așa cum este obiectul `JSON`, `ArrayBuffer` și `DataView`,
- obiecte care oferă abstracțiuni de control așa cum sunt funcțiile generator și obiectele `Promise`,
- obiecte care oferă reflexie așa cum sunt `Proxy` și `Reflect`.

## Mantre

- Nu trebuie confundate cu obiectul global.
- Obiectele built-in includ și obiectul global.

## Obiecte de bază

Object
Function
Boolean
Symbol
Error

## Numere

Number
Math
Date

## Procesarea textului

String
RegExp

## Colecții indexate

Array

## Colecții indexate cu chei
Aceste colecții conțin elemente care sunt iterabile.

Map
Set
WeakMap
WeakSet

## Date structurate

ArrayBuffer
DataView
JSON

## Obiecte pentru controlul abstractizărilor

Promise
Generator
GeneratorFunction

Reflection

Reflect
Proxy

# Resurse

[ECMAScript® 2017 Language Specification](https://tc39.github.io/ecma262/)
[Global Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
