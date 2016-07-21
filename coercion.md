# Introducere

Tipuri în JavaScript

- undefined,
- string,
- number,
- boolean,
- object,

și mai sunt:

**function** și **null**

## Cum verifici pentru a afla ce este ceva în JS?

R: folosind typeof

```js
typeof ceva;          // "undefined"
typeof "ceva";        // "string"
typeof 123;           // "number"
typeof true;          // "boolean"
typeof {x: 1};        // "object"
typeof function(){};  // "function"
typeof null;          // "object" ESTE UN BUG! NU ESTE UN OBIECT
```

Function este un fel de subtip al lui object, de fapt o funcție este un „obiect callable”.


## Operațiuni abstracte

## ToString

- null      => "null"
- undefined => "undefined"
- true      => "true"
- false     => "false"
- 3.14159   => "3.14159"
- 0         => "0"
- -0        => "0"

## Egalități cu ==

Reprezentarea a fost reprodusă după materialul de la http://dorey.github.io/JavaScript-Equality-Table/


|           |`true`|`false`|`1`| `0` | `-1` |`"true"`|`"false"`|`"1"`|`"0"`|`"-1"`|`""`|`null`|`undefined`|`Infinity`|`-Infinity`|`[]`|`{}`|`[[]]`|`[0]`|`[1]`|`NaN`|
|:--------- |:---- |:----- |:- |:--- |:---- |:------ |:------- |:--- |:--- |:---- |:-- |:---- |:--------- |:-------- |:--------- |:-- |:-- |:---- |:--- |:--- |:--- |
|`true`     |  X   |       | X |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |  X  |     |
|`false`    |      |   X   |   |  X  |      |        |         |     |  X  |      | X  |      |           |          |           | X  |    |  X   |  X  |     |     |
|  `1`      |  X   |       | X |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |  X  |     |
|  `0`      |      |   X   |   |  X  |      |        |         |     |  X  |      | X  |      |           |          |           | X  |    |  X   |  X  |     |     |
|  `-1`     |      |       |   |     |   X  |        |         |     |     |  X   |    |      |           |          |           |    |    |      |     |     |     |
|`"true"`   |      |       |   |     |      |    X   |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"false"`  |      |       |   |     |      |        |    X    |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"1"`      |  X   |       | X |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |  X  |     |
|`"0"`      |      |   X   |   |  X  |      |        |         |     |  X  |      |    |      |           |          |           |    |    |      |  X  |     |     |
|`"-1"`     |      |       |   |     |  X   |        |         |     |     |  X   |    |      |           |          |           |    |    |      |     |     |     |
|`""`       |      |   X   |   |  X  |      |        |         |     |     |      | X  |      |           |          |           |  X |    |  X   |     |     |     |
|`null`     |      |       |   |     |      |        |         |     |     |      |    |   X  |    X      |          |           |    |    |      |     |     |     |
|`undefined`|      |       |   |     |      |        |         |     |     |      |    |   X  |    X      |          |           |    |    |      |     |     |     |
|`Infinity` |      |       |   |     |      |        |         |     |     |      |    |      |           |     X    |           |    |    |      |     |     |     |
|`-Infinity`|      |       |   |     |      |        |         |     |     |      |    |      |           |          |     X     |    |    |      |     |     |     |
|`[]`       |      |   X   |   |  X  |      |        |         |     |     |      |  X |      |           |          |           |    |    |      |     |     |     |
|`{}`       |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`[[]]`     |      |   X   |   |  X  |      |        |         |     |     |      |  X |      |           |          |           |    |    |      |     |     |     |
|`[0]`      |      |   X   |   |  X  |      |        |         |     |  X  |      |    |      |           |          |           |    |    |      |     |     |     |
|`[1]`      |  X   |       | X |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`NaN`      |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |

## Egalități cu ===

Reproducere a materialului de la http://dorey.github.io/JavaScript-Equality-Table/

|           |`true`|`false`|`1`| `0` | `-1` |`"true"`|`"false"`|`"1"`|`"0"`|`"-1"`|`""`|`null`|`undefined`|`Infinity`|`-Infinity`|`[]`|`{}`|`[[]]`|`[0]`|`[1]`|`NaN`|
|:--------- |:---- |:----- |:- |:--- |:---- |:------ |:------- |:--- |:--- |:---- |:-- |:---- |:--------- |:-------- |:--------- |:-- |:-- |:---- |:--- |:--- |:--- |
|`true`     |  X   |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`false`    |      |   X   |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|  `1`      |      |       | X |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|  `0`      |      |       |   |  X  |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|  `-1`     |      |       |   |     |   X  |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"true"`   |      |       |   |     |      |    X   |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"false"`  |      |       |   |     |      |        |    X    |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"1"`      |      |       |   |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"0"`      |      |       |   |     |      |        |         |     |  X  |      |    |      |           |          |           |    |    |      |     |     |     |
|`"-1"`     |      |       |   |     |      |        |         |     |     |  X   |    |      |           |          |           |    |    |      |     |     |     |
|`""`       |      |       |   |     |      |        |         |     |     |      | X  |      |           |          |           |    |    |      |     |     |     |
|`null`     |      |       |   |     |      |        |         |     |     |      |    |   X  |           |          |           |    |    |      |     |     |     |
|`undefined`|      |       |   |     |      |        |         |     |     |      |    |      |    X      |          |           |    |    |      |     |     |     |
|`Infinity` |      |       |   |     |      |        |         |     |     |      |    |      |           |     X    |           |    |    |      |     |     |     |
|`-Infinity`|      |       |   |     |      |        |         |     |     |      |    |      |           |          |     X     |    |    |      |     |     |     |
|`[]`       |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`{}`       |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`[[]]`     |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`[0]`      |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`[1]`      |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`NaN`      |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |

## Evaluarea condiției if

Reproducere după materialul de la http://dorey.github.io/JavaScript-Equality-Table/

|           |`true`/`false`|                                           |
|:--------- |:------------ |:----------------------------------------- |
|`true`     |      X       |`if (true) { /* executes */ }`             |
|`false`    |              |`if (false) { /* does not execute */ }`    |
|  `1`      |      X       |`if (1) { /* executes */ }`                |
|  `0`      |              |`if (0) { /* does not execute */ }`        |
|  `-1`     |      X       |`if (-1) { /* executes */ }`               |
|`"true"`   |      X       |`if (-1) { /* executes */ }`               |
|`"false"`  |      X       |`if ("false") { /* executes */ }`          |
|`"1"`      |      X       |`if ("1") { /* executes */ }`              |
|`"0"`      |      X       |`if ("0") { /* executes */ }`              |
|`"-1"`     |      X       |`if ("-1") { /* executes */ }`             |
|`""`       |              |`if ("") { /* does not execute */ }`       |
|`null`     |              |`if (null) { /* does not execute */ }`     |
|`undefined`|              |`if (undefined) { /* does not execute */ }`|
|`Infinity` |      X       |`if (Infinity) { /* executes */ }`         |
|`-Infinity`|      X       |`if (-Infinity) { /* executes */ }`        |
|`[]`       |      X       |`if ([]) { /* executes */ }`               |
|`{}`       |      X       |`if ({}) { /* executes */ }`               |
|`[[]]`     |      X       |`if ([[]]) { /* executes */ }`             |
|`[0]`      |      X       |`if ([0]) { /* executes */ }`              |
|`[1]`      |      X       |`if ([1]) { /* executes */ }`              |
|`NaN`      |              |`if (NaN) { /* does not execute */ }`      |
