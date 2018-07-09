# String.prototype.substr()

Metoda returnează un subșir de caractere începând cu locația specificată de un număr ce reprezintă indexul. Se poate introduce cel de-al doilea argument, care setează limita până la care se vor extrage caractere. Atenție, această limită nu presupune că va fi luat în subșir și caracterul care se află la acest index.

```javascript
var sir = 'A fost odată ca niciodată.';
sir.substr(2, 4); // fost
```

Dacă alegi un index de start negativ, atunci se va calcula indexul scăzând din coadă câte poziții de index este specificat prin numărul negativ și se vor extrage atâtea caractere cât este specificat prin al doilea argument de la stânga spre dreapta, adică spre coadă.

```javascript
sir.substr(-4, 3); // ată
```

Dacă specifici doar un argument și acela este negativ, se vor extrage valorile calculând din coadă spre start atâtea poziții de index și apoi extrage tot până la coadă.

```javascript
sir.substr(-5); // dată
```

Câteva exemple:


```javascript
var str = "teste de stringuri";

str.substr(11, 3); // => "rin"
str.substring(11, 14); // => "rin"
str.slice(11, 14); // => "rin"
str.substring(11, 3); // => "te de st"
```

Dacă al doilea argument nu este menționat, se va extrage tot restul șirului începând cu poziția specificată de primul argument.
