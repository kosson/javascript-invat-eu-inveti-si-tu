# Cabina de comandă și control

Am știut dintotdeauna că am să ajung în cabina de comandă. Nu încă a unui avion, dar a unui limbaj de programare, da.

Un lucru trebuie să-ți spun din prima: tu ești cel care descrie tot procesul de pilotare atunci când vine vorba despre software. De fapt, un programator este cel care-și închipuie toate procedurile, situațiile și opțiunile pentru un pilot (pentru moment vom numi momentul execuției codului *pilot*). Nu vreau să te dezamăgesc, dar pilotul adevărat va fi motorul de JavaScript. Acesta preia textul care reprezintă codul, îl compilează și apoi îl evaluează. I se mai spune și **control** pentru că este cel care preia controlul total atunci când ai solicitat executarea codului. Și încă un amănunt important: codul scris de tine se execută o singură dată.

Ca să-ți pun zâmbetul din nou pe buze, tu ești cea care a văzut și a prevăzut totul dinainte ca *pilotul*/*controlul* să preia execuția. Ești peste pilot. Ești creatorul tuturor acestor lucruri! Ești cel care a imaginat, raționat și prevăzut totul. Toată această magie este performată de tine în spațiul cel mai prețios din tot universul: imaginația și rațiunea ta.

Pentru a te bucura de rolul tău conștientizat, te poftesc să pășești în cabina de comandă a JavaScript-ului.

Mai întâi avem declarațiile de variabile, funcții și obiecte. Acestea trebuie privite ca pe o enumerare a instrumentelor de măsură și control. Controlul operațiunilor pot fi foarte bine întreruptoarele, iar iterațiile sau buclele, dacă vrei să le numești așa, toate procedurile repetate din timpul zborului, verificări, calcule de traseu, etc. Pe scurt, ai un tablou de bord foarte bogat pentru **a aplica transformări datelor**... unii spun că este singurul lucru apropiat de magie.

Îți propun să studiem tabloul de bord pentru a vedea ce instrumente avem la dispoziție.

## Controlul operațiunilor

Pentru a dirija cursul acțiunilor unui program, avem nevoie de instrumentele care ne permit acest lucru. Vom porni chiar de la cadrul oferit de motorul JavaScript pentru a înșirui diferitele operațiuni. Cel mai simplu este o pereche de acolade. Am mai vorbit noi despre ele, dar este bine să ne reamintim că acestea stabilesc un cadru separat (un mediu lexical), în care putem rula codul.

Mă gândesc că pentru a înțelege în adâncime ce este softwareul pe care-l scrii, îl putem asemui unei povești. Că tot am comparat cu un cockpit de avion, software-ul este întreaga poveste a pilotului. De la momentul verificărilor de dinaintea decolării și până la cele de după aterizare, când toată lumea este fericită, povestea este una plină de setări, de evenimente, de verificări inițiale și continui, de punere în aplicare a unor decizii ș.a.m.d. Fix așa este și povestea celui care scrie codul. Este ca un film care debutează cu vocea povestitorului, care alunecă în acțiunea propriu-zisă.

Controlul operațiunilor oferă alternativele pe care le-ai pus în fața unor anumite situații. De exemplu, pentru că ești un creator precaut, îl vei pune pe comandantul pilot să facă un zbor de verificare în simulator oferindu-i un enunț `try...catch` (pe românește înseamnă *încearcă* evaluarea următorului(relor) enunț(uri) și *prinde* erorile dacă acestea apar). Programul se va desfășura ca și în realitate, cu diferența că poate captura erorile survenite în sesiunea de pilotaj.

Senzorii externi ai avionului oferă date privind temperatura și viteza. Pentru a lua o decizie în funcție de anumite valoari computate, vei folosi un enunț `if...else`, care îți permite evaluarea unei expresii pentru a lua o decizie și care sunt alternativele menționate prin `else`. Dar dacă te uiți fix doar la valorile unui singur instrument, care îți oferă o singură valoare concretă, ai putea să iei decizii folosind un `case...switch`.

Un alt instrument la îndemână este să oprești brusc execuția unei anumite activități folosind `break` (*oprește execuția*), dacă acest lucru este util, iar dacă o anumită evaluare conduce la o posibilă oprire a vreunei operațiuni, se poate forța continuarea execuției folosind `continue`.

Poți preseta comportamente așa cum este `throw` pentru a *emite* o situație de eroare sau pentru a semnala un rezultat nedorit.

Ca să introduci în computerul de bord al aparatului nostru de zbor noi informații, ai nevoie să le declari folosindu-te de `var` (valori care se pot modifica în timp), `let` (un soi de variabile, care sunt țintuite de mediul lexical în care au fost declarate) și `const` (legături constante la o valoare).

Uneori ai nevoie să verifici valoare cu valoare un set de parametri obținut de la turboreactor pentru a lua anumite decizii. Pentru aceasta ai nevoie să faci un set de operațiuni pentru fiecare valoare indicată de un instrument de măsură. Această repetiție a unui set de instrucțiuni verificând permanent o anumită valoare de adevăr se numește **iterare** și este foarte folositoare în programare pentru a prelucra seturi de date parcurgându-le element cu element. Instrumentarul iterării este compus din instrumentarul oferit de enunțurile `do...while`, `for...in`, `for...of`, `for` și `while`.

Astfel de structuri de iterare pot fi numite și **bucle**. De ce? Pentru că pur și simplu intră ca o placă de pickup într-o buclă care nu poate fi ruptă decât atunci când anumite condiții sunt întrunite... bineînțeles că cineva trebuie să ridice acul pickup-ului, altfel înnebunim aici cu toții.

Concluzionând, avem patru enunțuri care se comportă precum niște comenzi de salt cu care poți schimba în orice moment cursul acțiunilor:

-   `break`: conduce la ieșirea prematură dintr-o buclă
-   `continue`: produce o săritură peste o iterație a unei bucle dacă o anumită condiție a fost împlinită
-   `return`: iese imediat din execuția unei funcții
-   `throw`: indică o excepție, care va fi capturată de un gestionar pentru astfel de evenimente nedorite.

Aceste enunțuri mai sunt numite **de salt** pentru că modifică sensul de execuție a codului; dintr-un punct al execuției se face un salt în altul.

Pentru că ne-am familiarizat deja cu mare parte din trusa oferită de limbaj, vom intra în câteva detalii importante pentru fiecare dintre acestea cu dorința de a le înțelege în profunzime.
