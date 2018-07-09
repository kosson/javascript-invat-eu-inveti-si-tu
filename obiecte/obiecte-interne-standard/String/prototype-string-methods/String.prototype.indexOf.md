# String.prototype.indexOf()

Este o metodă care returnează indexul unde apare pentru prima dată un fragment de text.

Este returnat `-1` dacă fragmentul nu este găsit. Atenție, dacă o parte a fragmentului este corectă și s-a greșit, fie și numai un caracter, nu se face identificarea și este returnat `-1`.

Metoda este case sensitive!: `'Ceva Mare'.indexOf('mare'); // -1`

## Cazuistică indexOf()

```javascript
// Caracterul sau fragmentul a fost identificat și se returnează valoarea de index al primei apariții în string
'cevatext'.indexOf('x'); // 6

// Caracterul sau fragmentul nu a fost identificat, căutare începută de la indexul specificat
'cevatext'.indexOf('x', 7); // -1

// Caracterul sau fragmentul nu a fost identificat
'cevatext'.indexOf('y'); // -1

// Returnarea numărului total de caractere
'cevatext'.indexOf('', 20); // 7 returnează numărul de caractere. Parametrul trebuie să fie cu mult peste lungimea șirului
```

### Testarea după primul caracter întâlnit

```javascript
var colectie = 'Acesta este un șir de test';
if(colectie.indexOf('ș') !== 0){
  console.log(`caracter găsit la index: ${colectie.indexOf('ș')}`);
}
```

### Căutarea substringului

Poți verifica rapid dacă o secvență de text există într-un șir:

```javascript
'Rosinante era o mârțoagă, dar și identificatorul emis de un transponder'.indexOf('era o ') !== -1; // true
```
