# `Array`

Este un obiect intern care are și rol de contructor.

Array-urile sunt o bornă centrală a programării indiferent de limbaj. Acestea permit stocarea temporară a unor valori într-o formă ușor accesibilă folosind indecși, dar cel mai important aspect este bogăția metodelor puse la dispoziție de obiectul intern Array pentru a prelucra, aranja, rearanja, filtra elementele conținute de array-uri.

Ori de câte ori veți lucra cu valori simple (scalare), veți folosi cu siguranță array-urile.

Array-urile mai pot fi folosite și ca structuri de „depozitare” a obiectelor. Spre exemplu, poți constitui un registru pentru elemente DOM cărora le asociezi câte un API.

## Mantre

- Atunci când Array este apelat ca funcție și nu ca un constructor, va creea și va inițializa un nou obiect Array.
- Are metodă internă `@@iterator`.

Crearea de array-uri de dimensiuni prestabilite:

```javascript
var presetat = Array(3); // [,,]
```

Are ca efect crearea unui array cu elemente goale.

![](operatiuniArrayuri.svg)

## Resurse
[MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray)
