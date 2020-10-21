# Nullish coalescing operator (`??`)

Acesta este un operator logic care returnează valoarea din partea dreaptă dacă cel din partea stângă are valoarea `null` sau `undefined`. Dacă operatorul din partea stângă nu este `null` sau `undefined` va fi returnat.

```javascript
const ceva = null ?? 'din oficiu';
console.log(ceva);
// rezultatul este valoarea "din oficiu"

const altceva = 0 ?? 42;
console.log(altceva); // este returnată valoarea 0
```

Acest operator vine ca un contrabalans la practica folosirii operatorului `||` care lucrează cu valori `falsy`, ceea ce conduce la probleme în cazul folosirii un șir de caractere vid sau chiar a lui `0`, care sunt valori.

## Logical nullish assignment (`??=`)

Atribuie valoarea din partea dreaptă doar dacă valoarea care era atribuită în dreapta este `null` sau `undefined`.

```javascript
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration);
// rezultat: 50

a.speed ??= 25;
console.log(a.speed);
// rezultat: 25
```

## Resurse

- [Nullish coalescing operator (??) | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
