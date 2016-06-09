Este un constructor pentru funcții.

Metode:

- Function.prototype.apply()
- Function.prototype.bind()
- Function.prototype.call()
- Function.prototype.toString()

## Function.prototype.apply()

Apelează o funcție căreia îi setează bindingul pentru `this` la valoarea care a fost introdusă. Argumentele pot fi pasate ca obiect Array.

Primește două argumente:
- o referință către un obiect, care devine și `this` pentru funcția apelată cu apply().
- o listă de argumente organizată ca array sau ceva ce seamănă cu un array (`array-like`).

Dacă nu este invocat `strict mode` (`"use strict";`), `null` și `undefined` în cazul primului argument, vor fi înlocuite cu obiectul global iar primitivele vor fi „învelite” în obiectul corespunzător (`boxing`).

Pentru parametrul listei de argumente se poate folosi și array-like-ul `arguments`, care este o variabilă locală a unei funcții. Astfel, poți pasa toate argumentele în obiectul apelat, care trebuie să gestioneze aceste argumente.

### Mecanism oferit de apply()

Obiectul pasat ca și context, în fapt cel care este și `this`, este, de fapt apelantul funcției. Ceea ce permite acest mecanism, de fapt este posibilitatea de a scrie o funcție cu rol de metodă, care să poată fi folosită în alt obiect fără a fi necesară rescrierea metodei pentru un nou obiect.

Începând cu ECMAScript 5, array-ul argumentelor pasate poate fi și un obiect care are caracteristicile unui array.

### Mecanism de operare a funcțiilor interne limbajului

Ține minte că și funcțiile interne (metode ale obiectelor interne), se pot bucura de avantajele folosirii lui apply().

```js
var numere = [12, 43, 32, 3];

var max = Math.max.apply(null, numere); // 43
// null setează la global scope this.
var min = Math.min.apply(null, numere); // 3
```

## Function.prototype.bind()

Creează o funcție nouă a cărui `this` este setat la valoarea oferită. Secvența de argumente introdusă are precedență asupra celor existente la momentul apelării funcției.

## Function.prototype.call()

Apelează (call) o funcție. Setează `this` la obiectul pasat și argumentele pot fi pasate așa cum sunt.

## Function.prototype.toString()

Returnează un șir de caractere, care, de fapt este chiar codul sursă al acelei funcții.

Un exemplu simplu ar fi:

```js
var adunare = new Function("primulNr", "alDoileaNr", "return primulNr + alDoileaNr");
adunare(1, 2); // 3
```
