# Codarea caracterelor - Unicode

Computerele nu înțeleg cuvintele noastre, nici măcar caracterele pe care le folosim noi pentru a compune cuvintele. Ceea ce înțeleg mașinile noastre de calcul este o secvență de 0 și 1, dar ca să existe un nivel unde să ne putem întâlni cu ele pentru a stabili comunicarea, au fost create sisteme de reprezentare, de codare alfanumerică a caracterelor pentru ca acestea să aibe un echivalent numeric inteligibil pentru computere. Pentru a înțelege modul de reprezentare numeric al caracterelor din setul Unicode, este nevoie să fie înțeleasă reprezentare hexazecimală a numerelor. Pentru aceasta va trebui să facem o mică incursiune în felul în care „codăm” noi oamenii cantitățile. Este foarte important pentru aduce explicații despre cum este realizată puntea dintre un simbol, adică un caracter inteligibil pentru noi, cu o valoare pe care computerul o înțelege.

Câteva informații privind sintemele de numerație, care se vor dovedi foarte utile. Zi de zi lucrăm cu diferite cantități, cu seturi de obiecte, cu grămezi de obiecte și toate acestea au nevoie de o reprezentare. Pentru orice folosim sistemul zecimal de reprezentare, care are caractere ce codează cantitățile pornind de la 0, la 9. Noi le numim cifre. Pentru a reprezenta cantități mai mari de 9, se va folosi o combinație a cifrelor poziționându-le de la dreapta spre stânga poziționând câte o cifră în fiecare ordin: al `unităților`, `zecilor`, `sutelor`, ș.a.m.d. Și acum trebuie să realizăm că, de fapt, ordinele din reprezentarea unui număr natural, codează seturi de cantități, mai puțin unitățile care indică un singur set cuprizânt tot atâtea obiecte câte indică cifra.

|Numărul: 243|ordinul sutelor| ordinul zecilor| ordinul unităților|
|:--|:--|:---|:--|
||2|4|3|
|Explicație:|2 seturi a câte o sută de membri; mai scurt 2 X 100|4 seturi a câte zece membri; mai scurt 4 X 10|un singur set al unităților format din trei membri|
|Exponent:|10<sup>2</sup> X 2 (<code>10<sup>2</sup> = 10 X 10 = 100</code>)|10<sup>1</sup> X 4 (<code>10<sup>1</sup> = 10 X 1 = 10</code>)|10<sup>0</sup> X 3 (<code>10<sup>0</sup> = 10 X 0 = 1</code>)|

Dacă ai încerca să-i explici unui extraterestru cum codăm noi cantitățile, pe scurt, i-ai spune: dispunem câte un simbol, care codează o cantitate, de la dreapta spre stânga și pentru fiecare poziție pe care avansăm, simbolul este înmulțit cu 10 pentru că, de fapt printr-un singur simbol explicăm câte seturi sunt pentru acel ordin de magnitudine.

Putem spune că am folosit un sistem de codare al cantităților având baza de referință zece. Adică măsura după care se numără totul este valoarea 10.

Sistemul zecimal este ceea ce folosim noi oamenii pentru că dintre toate sistemele de numerație folosite de omenire de-a lungul timpului, acesta a fost ales și înțeles de foarte mulți membri ai speciei noastre. O incursiune în istoria sistemelor de numerație este o aventură fascinantă despre care nici nu vă imaginați că v-ar putea delecta și ului.

O combinație între sistemul binar închipuit de matematicianul Gottfried Leibnitz, și logica circuitului închis notat cu 1 și a celui deschis, notat cu 0, aplicat de Claude E. Shannon în domeniul electronicii, a condus la adoptarea sistemului binar (mai spunem că este în baza 2) pentru calculele făcute de computerele zilelor noastre. Acesta este nivelul cel mai de jos al reprezentării numerelor și nu îl folosim, noi oamenii în mod curent. Să urmărim un mic exemplu.

|Baza|2<sup>7</sup>|2<sup>6</sup>|2<sup>5</sup>|2<sup>4</sup>|2<sup>3</sup>|2<sup>2</sup>|2<sup>1</sup>|2<sup>0</sup>|
|:-|:-|:-|:-|:-|:-|:-|:-|:-|
|Valoarea|128|64|32|16|8|4|2|1|
|Număr: **243**|128|64|32|16|8|4|2|1|
|Descompus|**128**|**64**|**32**|**16**|0|0|**2**|**1**|
|Forma binară|1|1|1|1|0|0|1|1|

Forma binară a unui număr nu este ceea ce vom folosi în lucrul cu computerul. Trebuie găsit un nivel intermediar între computer și om, iar acest nivel intermediar este reprezentarea numerică în sistem hexazecimal.

Să pornim de la termenul hexazecimal. Acesta este o compunere între hexa, care înseamnă șase și zecimal. Șase cu zece egal 16, adică un sistem numeric care are baza 16. De exemplu, 16<sup>2</sup>. Folosirea acestui sistem de reprezentare a numerelor este folosit pentru că are capacitatea de a coda cu mai puține caractere numere întregi de dimensiuni foarte mari.

|Hexazecimal:|0|1|2|3|4|5|6|7|8|9|A|B|C|D|E|F|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
|Hexazecimal:|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|

Baza numerică este 16 iar valorile cele mai uzitate sunt cele până la 16^4.

|Baza|16<sup>4</sup>|16<sup>3</sup>|16<sup>2</sup>|16<sup>1</sup>|16<sup>0</sup>|
|:-|:-|:-|:-|:-|:-|
|Baza|65536|4096|256|16|1|

Că tot am lucrat cu valoarea 243 în zecimal, cum arată transformată în hexa și care ar fi avantajul. Cum ajungi la valoarea hexazecimală? Privim atent valoarea zecimală și observăm că s-ar situa între valoarea exprimată de 16<sup>1</sup> (16) și 16<sup>2</sup> (256). Următorul pas ar fi să împărțim 243 la 16 și obținem valoarea de 15,18. Deci, 243 ar fi 16 x 15,18. Privim la 15 și vedem că se codează cu litera F. 15 X 16 este 240, care scăzut din 243 oferă valoarea 3. În hexa, 3 se codează chiar 3. Deci valoarea noastră în hexa este `F3`. Ca să verificăm, ne uităm la valoarea pe care o codează `F` și aceasta este 15, dar poziția lui F este asociată lui 16<sup>1</sup> care este 16. Deci vom obține valoarea 240 din 15 X 16. Apoi mai avem valoarea 3, care este pe poziția lui 16<sup>0</sup> care este egal cu 1. Deci avem 240 + 3 X 1 = 243. După tot acest parcurs, mai subliniez înainte de a continua, avantajul major al utilizării codării numerelor folosind notația hexazecimală: posibilitatea de a reprezenta cu mai puține cifre valori foarte mari. De exemplu, un număr zecimal ai mare: 19425 are reprezentarea hexazecimală `4BE1`.

Te vei întreba pe bună dreptate care este legătura cu programarea și cu demersul nostru de a învăța JavaScript? Răspunsul este unul cum nu se poate mai simplu: orice caracter introdus în editorul de text, trebuie interpretat de computer pentru a stabili legătura cu forma sa codată numeric. În ajutorul acestei etape, există un tabel de corespondență constituit la nivel global și tot acest efort de a aloca o reprezentare cifrică fiecărui caracter a tuturor limbilor de pe mapamond se numește Unicode Standard.

Și acum vestea pentru care ne-am pregătit privind la sistemele de numerație: codurile numerice care stau în spatele fiecărui caracter codat Unicode este un număr hexazecimal.

Da, vorbim de un efort de standardizare la nivel global strâns sub marca înregistrată Unicode. Standardul Unicode se definește ca un „sistem de codare a caracterelor proiectat să suporte schimbul la nivel global, procesarea și afișarea textelor scrise ale diferitelor limbi și a disciplinelor tehnice ale lumii moderne”.

Standardul Unicode este format din **specificațiile nucleu**, **Hărțile de coduri**, **Anexele Standardului Unicode** și **Baza de date a caracterelor Unicode**. Unicode respectă punct cu punct, de fapt se identifică cu standardul ISO/IEC 10646:2012 - Universal Coded Character Set (UCS).

Pentru a înțelege dimensiunea setului pe care Unicode îl acoperă, la data 20 iunie, 2017, versiunea 10.0.0 a standardului oferea mijloace de codare pentru peste un milion de caractere.

Standardul Unicode este utilizat pentru redactarea resuselor HTML și XML. În introducerea textului standardului este menționat un fapt foarte important: „Unicode este baza software-ului care trebuie să funcționeze în întreaga lume”.
Istoric vorbind, Unicode a pornit de la setul ASCII, care l-a precedat.

Ce oferă standardul Unicode? Pentru fiecare caracter este specificată o valoare numerică numită de standard `code point` și un nume unic.
Unicode formatează reprezentarea numerică ca numere pe 32 de biți (UTF-32), pe 16 biți (UTF-16) și pe 8 biți (UTF-8). Versiunea pe 8 biți este utilizată pe scară largă pentru a realiza compatibilitatea cu standardul vechi ASCII.

JavaScript folosește caracterele codate UTF-16.

Te vei întreba de ce studiem noi acum Unicode-ul? Răspunsul este pentru că programele tale sunt coduri sursă, care este text simplu. Standardul aduce lămuriri asupra ceea ce este textul simplu: „o secvență pură de coduri de caractere”.

Am menționat deja faptul că toate caracterele sunt codate numeric. Standardul aduce o precizare importantă și anume că domeniul de numere întregi folosite pentru a coda caracterele limbilor lumii se numește „codespace”. Un singur număr întreg al acestui set se numește „code point”. Un caracter care este reprezentat printr-un număr întreg din „codespace” spunem despre el că este „encoded character”, adică un caracter codat. În acest moment putem afirma că o mașină de calcul, adică un computer poate procesa simboluri.

Cum se scriu aceste „code points”? Practica este de a le scrie astfel: „U+” care este urmat de o secvență hexazedimală care reprezintă valoarea numerică.

## Resurse

http://www.unicode.org/standard/standard.html
[Unicode® 10.0.0](http://www.unicode.org/versions/Unicode10.0.0/UnicodeStandard-10.0.pdf)
