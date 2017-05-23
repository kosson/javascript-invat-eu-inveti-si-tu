# Cabina de comandă și control

Am știut dintotdeauna că am să ajung în cabina de comandă. Nu încă a unui avion, dar a unui limbaj de programare, da.

Un lucru trebuie să-ți spun din prima: tu ești cel care descrie tot procesul de pilotare atunci când vine vorba despre software. De fapt, un programator este cel care-și închipuie toate procedurile, situațiile și opțiunile pentru un pilot. Nu vreau să te dezamăgesc, dar pilotul adevărat va fi motorul de JavaScript. Ca să-ți pun zâmbetul din nou pe buze, tu ești cel care a văzut și a prevăzut totul dinainte. Ești peste pilot. Ești creatorul tuturor acestor lucruri!

Pentru a te bucura de rolul tău, te poftesc să pășești în cabina de comandă a JavaScript-ului.

Mai întâi avem declarațiile de variabile și funcții. Acestea trebuie privite ca pe o enumerare instrumentelor de măsură și control. Controlul operațiunilor pot fi foarte bine întreruptoarele iar iterațiile, toate procedurile repetate din timpul zborului. Pe scurt, ai un tablou de bord foarte bogat pentru a face transformări ale datelor... unii spun că este singurul lucru apropiat de magie.

Îți propun să studiem tabloul de bord pentru a vedea ce instrumente avem la dispoziție.

## Controlul operațiunilor

Pentru a dirija cursul acțiunilor unui program, avem nevoie de instrumentele care ne permit acest lucru. Vom porni chiar de la cadrul oferit de motorul JavaScript pentru a înșirui diferitele operațiuni. Cel mai simplu este o pereche de acolade. Am mai vorbit noi despre ele. Acestea stabilesc un cadru separat (un mediu lexical), în care putem rula codul.

Mă gândesc că pentru a înțelege în adâncime ce este softwareul pe care-l scrii, îl putem asemui unei povești. Că tot am comparat cu un cockpit al unui avion, softwareul este întreaga poveste a pilotului. De la momentul verificărilor de dinaintea decolării și până la cele de după aterizare.

Controlul operațiunilor oferă alternativele pe care le-ai pus în fața unor anumite situații. De exemplu, pentru că ești un creator precaut, îl vei pune pe comandantul pilot să facă un zbor de verificare în simulator oferindu-i un enunț `try...catch`. Programul se va desfășura ca și în realitate, cu diferența că poate captura erorile survenite în sesiunea de pilotaj.

Senzorii externi ai avionului oferă date privind temperatura și viteza. Pentru a lua o decizie în funcție de o anumită valoare, vei folosi un enunț `if...else`, care-ți permite evaluarea unei expresii pentru a lua o decizie și care sunt alternativele menționate prin `else`. O variantă la enunțul `if...else` ar fi `switch`, care permite prestabilirea unor cursuri de acțiune în cazul în care execuția oferă mai multe tipuri de rezultate.

Un alt instrument la îndemână este să oprești brusc execuția unei anumite activități folosind `break`, dacă acest lucru este util, iar dacă o anumită evaluare conduce la o posibilă oprire a vreunei operațiuni, se poate forța continuarea execuției folosind `continue`.

Poți preseta comportamente așa cum este `throw` pentru a emite o situație de eroare sau pentru a semnala un rezultat nedorit.
Ca să introduci în computerul de bord al aparatului nostru de zbor noi informații, ai nevoie să le declari folosindu-te de `var` (valori care se pot modifica în timp), `let` (un soi de variabile, care sunt țintuite de mediul lexical în care au fost declarate) și `const` (valori constante, bineînțeles).

Uneori ai nevoie să verifici valoare cu valoare un set de parametri obținut de la turboreactor pentru a lua anumite decizii. Pentru aceasta ai nevoie să faci un set de operațiuni pentru fiecare valoare indicată de un instrument de măsură.

Această repetiție a unui set de instrucțiuni verificând permanent o anumită valoare de adevăr se numește iterare și este foarte folositoare în programare pentru a prelucra seturi de date parcurgându-le element cu element. Instrumentarul iterării este compus din instrucțiunile `do...while`, `for...in`, `for...of`, `for` și `while`.

Astfel de structuri de iterare pot fi numite și bucle. De ce? Pentru că pur și simplu intră ca o placă de pickup stricată într-o buclă care nu poate fi ruptă decât atunci când anumite condiții sunt întrunite... bineînțeles că cineva trebuie să ridice acul pickup-ului căci altfel înnebunim aici cu toții.

Concluzionând, avem patru comenzi cu care poți schimba în orice moment cursul acțiunilor:
- `break`: conduce la ieșirea prematură dintr-o buclă
- `continue`: produce o săritură peste o iterație a unei bucle dacă o anumită condiție a fost împlinită
- `return`: iese imediat din execuția unei funcții
- `throw`: indică o excepție, care va fi capturată de un gestionar pentru astfel de evenimente nedorite.

Pentru că ne-am familiarizat deja cu mare parte din trusa oferită de limbaj, vom intra în câteva detalii importante pentru fiecare dintre acestea cu dorința de a le înțelege în profunzime.
