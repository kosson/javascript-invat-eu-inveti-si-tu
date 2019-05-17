# Obiectul global

Obiectul global există înainte ca motorul să intre în vreun context de execuție.

Obiectul global nu poate fi constructor pentru că motorul JavaScript nu-l dotează cu un slot `[[Construct]]` și nici `[[Call]]`, care să-l transforme într-o funcție apelabilă.

Obiectul global are un slot intern `[[Prototype]]`, dar obiectul `prototype` este constituit diferit de fiecare motor.

Standardul spune că suplimentar proprietăților definite de specificații, pot fi câteva adăugate de producători:

> Acestea pot să includă o proprietate a cărei valoare este chiar obiectul global în sine; de exemplu, în *document object model* al documentului HTML, proprietatea `window` a obiectului global este chiar însuși obiectul global”.

Obiectul global face parte din mediului lexical al programului care se execută.

## Proprietăți ale obiectului global

Obiectul global are din start trei proprietăți valorice a căror atribute `writable`, `enumerable`, și `configurable` au valoarea `false`. Acestea sunt `Infinity` cu valoarea `+∞`, `NaN` cu valoarea `NaN` și `undefined` cu valoarea `undefined`.

## Metode ale obiectului global - function properties

### Funcția eval()

Aceasta permite executarea de cod JavaScript, care este pasat ca string.

```javascript
eval('console.log("ceva")'); // ceva
```

În ceea ce privește folosirea acestei funcții, comunitatea recomandă limitarea utilizării din motive evidente de securitate și din motive de viteză. Există o mantră care spune că **eval is evil** - eval este rău.

### Funcția parseInt()

Este o funcție care primește ca argument un șir de caractere pe care încearcă să-l transforme într-un număr întreg.

```javascript
typeof parseInt('20'); // 20 "number"
typeof parseInt('1ab'); // 1
typeof parseInt('a1b'); // NaN
```

Funcția acceptă și un al doilea parametru, care indică rădăcina, adică sistemul de numerație. Dacă al doilea parametru este omis, motorul presupune că baza va fi 10.

```javascript
parseInt('234', 10); // 234
parseInt('101', 2);  // 5
parseInt('FF0', 16); // 4080
parseInt('FF0', 10); // NaN
```

### Funcția parseFloat()

Este o funcție care se aseamănă cu `parseInt()`, cu diferența că va căuta să returneze zecimalele dacă acestea pot fi extrapolate din șirul de caractere pasat.

```javascript
parseFloat('20'); // 20
parseFloat('20.2'); // 20.2
parseFloat('ce12va'); // NaN
parseFloat('ce12.2va'); // NaN
parseFloat('12.2va'); // 12.2
parseFloat('122e-2'); // 1.22
parseFloat('12e5'); // 1200000
```

Spre deosebire de `parseInt()`, `parseFloat()` înțelege și exponenții.

### Funcția isNaN()

Verifică dacă o valoare este `NaN` (*not a number*).

```javascript
console.log(parseInt('ades23')); // NaN
```

### Funcția isFinite()

Este o funcție care permite verificarea unei valori din două puncte de vedere. Să nu fie `Infinity` sau `NaN`. În cazul celor două, returnează `false`. Nu uita că pentru JavaScript cel mai mare număr este `1.7976931348623157e+308`. Orice trece peste este considerat `Infinity`.

```javascript
isFinite(1e309); // false
```

### Codarea și decodarea URI-urilor

Atunci când navigați pe Internet, în bara de adrese introduceți un șir de caractere care, din punct de vedere tehnic se numește Uniform Resource Locator, adică o cale către o anumită resursă de la un domeniu de pe net. URI-urile, adică Uniform Resource Identifiers, sunt normativul după care se poate scrie linkul pe care-l introduci în bara de adrese. Reține doar că un URL este un URI.

Avem la dispoziție o funcție numită `encodeUri()` și una `encodeUriComponent()`. Prima oferă URL-ul nostru într-o formă care poate fi utilizată pe net, fiecare caracter special cum ar fi spațiul fiind codat prin caracterul echivalent dat necesar pentru a folosi șirul ca pe un URL. Pentru operația inversă avem la dispoziție `decodeUri()` și `decodeUriComponent()`.

### Funcții interne responsabile cu gestionarea URI-urilor

Aceste funcții sunt puse la dispoziție cu scopul limitat de a coda și decoda Uniform Resource Identifiers.
URI-urile nu sunt decât șiruri de caractere care identifică o resursă, precum și protocolul folosit pentru a avea acces la ele prin intermediul internetului.
Un URI este compus din componente separate prin câteva caractere cu rol de separatori. Forma generală este `protocol://domeniu/rădăcinaCăii/resursă;altăResursă?încăUna`. Separatorii sunt `:`,`;`,`/`,`?`,`@`,`&`,`=`,`+`,`$`.
Pentru codarea și decodarea URI-urilor avem funcțiile `encodeURI()` și corespondentul `decodeURI()`, care lucrează cu URI-uri complete. Funcțiile `encodeURIComponent()` și `dencodeURIComponent()` lucrează cu părți ale URI-ului.
Standardul menționează faptul că aceste funcții se pot aplica pe URI-uri care respectă sintaxa conform RFC 2396. Nu se aplică URI-urilor conforme cu RFC 3986.
