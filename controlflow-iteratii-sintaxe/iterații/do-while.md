## Enunțul `do..while`

Acest enunț este străbunicul instrumentelor de prelucrare a datelor sofisticate de astăzi.

Spre deosebire de `while`, evaluarea expresiei care determină execuția codului se face la final, ceea ce permite ca măcar o singură dată codul să fie executat. Unele lucrări spune despre `do` că este *o structură repetitivă condiționată posterior* [1] spre deosebire de `while`, care este *o structură repetitivă condiționată anterior*.

```javascript
var oValoare = ~~(Math.random() * 10);
// așa îmi place sa generez numere aleatorii
do {
  console.log(oValoare);
} while (oValoare > 5); // 5
```

Priviți cu atenție și mult respect această expresie pentru că este unul din fundamentele prelucrării datelor, nivel la care dorim să ajungem. Începând cu `do..while`, vom jalona parcursul nostru învățând ce face `for () {}`, care enunțul de la baza prelucrării structurilor de date și apoi derivatele sale `for...in` și `for...of`, apoi `Array.prototype.forEach()`, ajungând apoi la cele mai rafinate instrumente oferite de `Array.prototype.map()`, `Array.prototype.reduce()` și `Array.prototype.filter()`.

Motivul pentru care s-a optat pentru `for` în practica zilnică este pentru că sintaxa facilitează lizibilitatea, indicând ceea ce se petrece mult mai bine. Amintiți-vă mereu de faptul că tot codul pe care îl **redactați** nu este destinat numai computerului, ci oamenilor. În cazul fericit al unei valori dovedite, oamenii vor fi cei care îl vor inspecta și citi mai târziu pentru a înțelege intenția de la început cu scopul de a-l îmbunătăți, optimiza, ș.a.m.d.

Redactarea codului este un act de maximă responsabilitate pentru că ceea ce realizezi este comunicarea cu un computer, dar mai mult, mult mai important de atât, este comunicarea cu alți oameni sau cu persoana ta din viitor. Gradul de lizibilitate, comentariile, documentarea codului, toate acestea vor fi apreciate în mod deosebit, dacă insiști pe redactarea plină de înțeles în serviciul celor care vor veni după tine.

Scenariul familiar pentru specialistul domeniului științelor informării se apropie de următorii pași pe care îi vom parcurge din nou și din nou, dar cu alte instrumente mereu mai evoluate, mai complexe. Chiar dacă încă nu ai ajuns la array-uri (putem traduce pentru moment array ca și înșiruire cu sensul de listă... în alte lucrări este numit și tablou sau vector), este îndeajuns să le privești precum un catalog tradițional de bibliotecă în care, fiecare sertar conține un element de array, adică datele care necesită prelucrarea.

- se dorește parcurgerea unei structuri de date, fie aceasta un document XML (eXtended Markup Language), JSON (JavaScript Object Notation) sau pur și simplu un CSV (Comma Separated Values). Motivul este efectuarea unei modificări pentru un anumit element de date;
- structura de date este *ciopârțită* în fragmentele ce vor fi supuse prelucrării, fie că acestea sunt elemente de pagină web, de document structurat XML sau rânduri dintr-un fișier de text, precum în cazul CSV-urilor. Adu-ți mereu aminte că la bază, toate datele sunt reprezentate de texte chioare, care prezintă marele avantaj al prelucrării textului înainte de orice;
- fiecare fragment va fi introdus ca element al unui array de suport cu scopul de a crea o structură dinamică menită să ofere cadrul de lucru la nivel atomic - elementele de date devin elemente de array.
- la momentul *ciopârțirii* sau după, depinde de necesități, poți aplica un set arbitrar de operațiuni pe fiecare fragment în parte.

Iată, enunțul `do..while` deschide seria de achiziții a unor instrumente de programare ce vor permite operațiuni din ce în ce mai complexe.

Hai să privim un astfel de scenariu la lucru chiar dacă nu tot ceea ce vei vedea este încă învățat și înțeles. Natura ta curioasă și intuiția îți vor fi ghid pentru a *gusta* puțin din ceea ce va urma.

```javascript
// mai întâi creăm containerele
var arrayCuFragmente, arrayCuRezultate = [], index = 0;
// apoi achiziționăm datele - eu voi folosi ceva fictiv scris de mână
var documentDePrelucrat = 'prima linie de text \na doua linie de text';
// \n indică locul unde s-a trecut cu Enter pe linia nouă
arrayCuFragmente = documentDePrelucrat.split('\n');
// acum arrayCuFragmente va fi încărcat cu:
// Array [ "prima linie de text ", "a doua linie de text" ]
do {
  arrayCuRezultate.push('#' + arrayCuFragmente[index]);
  ++index;
} while (index <= arrayCuFragmente.legth);
// Array [ "#prima linie de text ", "#a doua linie de text" ]
```

Privind codul scris dincolo de explicațiile oferite în comentarii, se observă în blocul de cod că am concatenat cu ajutorul operatorului plus caracterul diez pe care am dorit să-l atașăm fiecărui element din array. Fiecare element din array are o adresă de apel dacă vrei să numești așa sintaxa din cod `arrayCuFragmente[index]`. La index pornești de la 0 pentru că într-un array, primul element pornește de la adresa 0. Exact precum la catalog de la Clasa 0. După ce faci concatenarea, trebuie să avensezi la următorul index incrementând valoarea variabilei index. La `while` vei pune condiția necesară să fie calculată la ceva `truthy`. Dacă evaluarea e `truthy`, se mai execută codul din bloc pentru încă o dată.

## Referințe

[1] Miloșescu, Mariana. Informatică: profil real: matematică informatică, intensiv informatică: manualul pentru clasa a IX-a - Ed. a 12-a. - București: Editura Didactică și Pedagogică, 2016, 2016, pg. 47
