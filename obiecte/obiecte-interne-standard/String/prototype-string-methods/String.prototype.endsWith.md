# String.prototype.endsWith()

Această metodă este folosită pentru a verifica dacă un șir de caractere se termină cu un subșir menționat. Metoda returnează `true` dacă este adevărat, `false` în caz contrar. Căutarea este case-sensitive.

```javascript
let fragmentText = 'Cerul era roz cu limbi de sidef.';
console.log(fragmentText.endsWith('sidef.')); // true
```

## Parametrii

Metoda poate primi doi parametri.

### Șirul căutat

Este șirul de caractere căutat în coada unui fragment mai mare.

### lungimea

Este un parametru opțional, care în cazul în care este introdus, reprezintă lungimea șirului de caractere în care se va face căutarea din întregul fragment de text. Se comportă ca o limită închisă la numărul caracterelor care sunt luate în calcul la căutare.

```javascript
let fragmentText = 'Cerul era roz cu limbi de sidef.';
console.log(fragmentText.endsWith('roz', 13)); // true
```

Valoarea din oficiu este lungimea calculată automat a subșirului (`subșir.length`), adică întreaga lungime a fragmentului în care se face căutarea.

## Resurse

- [String.prototype.endsWith() | Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
