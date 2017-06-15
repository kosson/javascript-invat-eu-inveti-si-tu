# Obiectul global

Obiectul global există înainte ca motorul să intre în vreun context de execuție.

Obiectul global nu poate fi constructor pentru că motorul JavaScript nu-l dotează cu o metodă [\[Construct]] care să-i dea această putere. Tot la capitolul lipsuri întemeiate, mai adăugăm faptul că obiectul global nu are o metodă internă [\[Call]] care să-l transforme într-o funcție ce poate fi apelată.

Obiectul global are un slot intern [\[Prototype]], dar obiectul `prototype` este diferit pentru fiecare implementator.

Standardul spune că suplimentar proprietăților definite de specificații, mai sunt o serie în plus, care sunt definite de cei care implementează motorul JavaScript, cazul de zi cu zi fiind diferitele browsere. „Acestea pot să includă o proprietate a cărei valoare este chiar obiectul global în sine; de exemplu, în document object model al documentului HTML, proprietatea window a obiectului global este chiar însuși obiectul global”.

Obiectul global este parte a mediului lexical a programului care se execută.

## Proprietăți ale obiectului global

Obiectul global are din start trei proprietăți valorice a căror atribute writable, enumerable, configurable au valoarea `false`. Acestea sunt `Infinity` cu valoarea +∞, NaN cu valoarea NaN și undefined cu valoarea `undefined`.

## Metode ale obiectului global - function properties

- eval()
- isFinite()
- isNaN()
- parseFloat()
- parseInt()

### Funcții interne responsabile cu gestionarea URI-urilor

Aceste funcții sunt puse la dispoziție cu scopul limitat de a coda și decoda Uniform Resource Identifiers.
URI-urile nu sunt decât șiruri de caractere care identifică o resursă, precum și protocolul folosit pentru a avea acces la ele prin intermediul internetului.
Un URI este compus din componente separate prin câteva caractere cu rol de separatori. Forma generală este `protocol://domeniu/rădăcinaCăii/resursă;altăResursă?încăUna`. Separatorii sunt `:`,`;`,`/`,`?`,`@`,`&`,`=`,`+`,`$`.
Pentru codarea și decodarea URI-urilor avem funcțiile `encodeURI` și corespondentul `decodeURI`, care lucrează cu URI-uri complete. Funcțiile `encodeURIComponent` și `dencodeURIComponent` lucrează cu părți ale URI-ului.
Standardul menționează faptul că aceste funcții se pot aplica pe URI-uri care respectă sintaxa conform RFC 2396. Nu se aplică URI-urilor conforme cu RFC 3986.

### Proprietăți cu rol de constructori ale obiectului global

#### `Array()`

TODO: Completează!
