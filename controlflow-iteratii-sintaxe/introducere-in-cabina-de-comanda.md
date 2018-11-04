# Cabina de comandă și control

Tu ești cel care descrie procedurile de pilotare atunci când vine vorba despre software. De fapt, un programator este cel care-și imaginează toate procedurile, situațiile și opțiunile pentru un pilot (pentru moment vom numi momentul execuției codului *pilot*). Nu vreau să te dezamăgesc, dar pilotul adevărat va fi motorul de JavaScript. Acesta preia textul care reprezintă codul, îl compilează și apoi îl evaluează. I se mai spune și **control** pentru că este cel care preia controlul total atunci când ai solicitat executarea codului. Și încă un amănunt important: codul scris de tine se execută o singură dată.

Ca să-ți pun zâmbetul din nou pe buze, tu ești cea care a văzut și a prevăzut totul dinainte ca *pilotul*/*controlul* să preia execuția. Ești peste pilot. Ești creatorul tuturor acestor lucruri! Ești cel care a imaginat, raționat și prevăzut totul. Toată această magie este performată de tine în spațiul cel mai prețios din tot universul: imaginația și rațiunea ta. Te poftesc să pășești în cabina de comandă a JavaScript-ului.

Mai întâi avem declarațiile de variabile, funcții și obiecte. Ai un tablou de bord foarte bogat pentru **a aplica transformări datelor**... unii spun că este singurul lucru apropiat de magie.

## Control operațiuni

Pentru a dirija cursul acțiunilor unui program, avem nevoie de instrumentele care ne permit acest lucru. Vom porni chiar de la cadrul oferit de motorul JavaScript pentru a înșirui diferitele operațiuni. Cel mai simplu este o pereche de acolade. Am mai vorbit noi despre ele, dar este bine să ne reamintim că acestea stabilesc un cadru separat (un mediu lexical), în care putem rula codul.

Povestea celui care scrie codul este ca un film care debutează cu vocea povestitorului și încet, încet alunecă în acțiunea propriu-zisă.

Controlul operațiunilor oferă alternativele pe care le-ai configurat pentru anumite situații. De exemplu, pentru a lua o decizie în funcție de anumite valori computate, vei folosi un enunț `if...else`, care îți permite să iei o decizie, plus alternativele menționate prin `else`. Dar dacă te uiți la un set cunoscut de posibile decizii, ai putea folosi un `case...switch`.

Un alt instrument la îndemână este să oprești brusc execuția unei anumite activități folosind `break` (*oprește execuția*), dacă acest lucru este util. Dacă o anumită evaluare conduce la o posibilă oprire a vreunei operațiuni, se poate forța continuarea execuției folosind `continue`.

Poți seta mecanisme de prindere a erorilor sau pentru a semnala un rezultat nedorit folosind `throw`.

Pentru a introduce noi date, ai nevoie să le declari folosindu-te de `var` (valori care se pot modifica în timp), `let` (un soi de variabile, care sunt țintuite de mediul lexical în care au fost declarate) și `const` (legături constante la o valoare).

Uneori ai nevoie să verifici valoare cu valoare un set de date pentru a lua anumite decizii. Pentru aceasta ai nevoie să faci un set de operațiuni pentru fiecare valoare. Această repetiție a unui set de instrucțiuni verificând permanent o anumită valoare de adevăr se numește **iterare** și este foarte folositoare în programare pentru a prelucra seturi de date parcurgându-le element cu element. Instrumentarul iterării este compus din enunțurile `do...while`, `for...in`, `for...of`, `for` și `while`.

Astfel de structuri de iterare pot fi numite și **bucle**. De ce? Pentru că pur și simplu intră ca o placă de pickup într-o buclă care nu poate fi ruptă decât atunci când anumite condiții sunt întrunite.

Concluzionând, avem patru instrucțiuni care se comportă precum niște comenzi de salt cu care poți schimba în orice moment cursul acțiunilor:

-   `break`: conduce la ieșirea prematură dintr-o buclă;
-   `continue`: produce o săritură peste o iterație a unei bucle dacă o anumită condiție a fost împlinită;
-   `return`: iese imediat din execuția unei funcții;
-   `throw`: indică o excepție, care va fi capturată de un gestionar pentru astfel de evenimente nedorite.

Aceste instrucțiuni mai sunt numite **de salt** pentru că modifică sensul de execuție a codului; dintr-un punct al execuției se face un salt în altul.

Pentru că ne-am familiarizat deja cu mare parte din trusa oferită de limbaj, vom intra în câteva detalii importante pentru fiecare dintre acestea cu dorința de a le înțelege în profunzime.
