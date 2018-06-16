## Perspectivă peste tărâmul JavaScript

Atunci când am pornit la scrierea acestei cărți nu am avut nevoia să văd de pe orbită cum arată planeta JavaScript, dar pe măsură ce am avansat, am realizat că este nevoie să privești mai întâi din spațiu pentru a înțelege valoarea tuturor entităților și relațiilor pe care le stabilesc acestea la nivelul solului.

Am înțeles deslușind standardul că vorbim despre o adevărată lume, chiar despre un **tărâm** special.

Textul standardului ECMAScript oferă cea mai bună perspectivă atunci când vine vorba despre un program JavaScript care este privit la lucru. Voi parafraza și cita acolo unde este necesar textul standardului pentru a contura un cadru cât mai complet.

Urmând firul unei adevărate geneze, standardul menționează chiar termenul de *realm* - **tărâm**:
*înainte de a fi evaluat, tot codul ECMAScript trebuie asociat unui tărâm*.

> Un tărâm constă dintr-un set de **obiecte interne**, un **mediu global** și tot **codul ECMAScript** care este încărcat în cadrul acelui mediu global, precum și alte stări și resurse asociate”.

Acesta este cel mai valoros citat al standardului pentru că este ca o fotografie a planetei JavaScript de pe orbită. Este fotografia `Tărâmului` nostru.

Am precizat câțiva termeni deja care fac parte dintr-un adevărat idiom pe care-l impune limbajul. Să-i lămurim pentru că vor constitui jargonul zilnic pe care va trebui să ți-l însușești:

-   obiecte interne: în limba engleză le veți găsi sub denumirea de *global objects*, *internal objects* sau *built-in*, care mot-a-mot ar fi tradus *construite-intern*. În această lucrare, ne vom referi la obiectele *built-in* ca obiecte interne.
-   mediul global: în limba engleză este *global environment*, fiind zona comună în care coexistă toate obiectele și variabilele din obiectul global. Este *mediul* în care ele există. Zona în care coexistă mai multe entități o veți mai auzi a fi numită *scope* în limba engleză.
-   lexical environment: tradus în română: *mediu lexical*, fiind zona din corpul unei funcții sau al unui bloc de cod delimitat de acolade, unde sunt declarate variabile și funcții.

**Termenii noi nu trebuie să te descurajeze**. Fac parte din efortul de a înțelege și chiar dacă apar de la început, vor fi explicați pe parcurs. Înțelegerea unui limbaj de programare este ca un desen al unei rețele de noduri care comunică între ele. Am reflectat mult la balansul pe care trebuie să-l realizez în materialul pe care tocmai îl citești. Dacă aș fi urmat manualele clasice, acest desen complex (matematicieni îl numesc *graf*) ar fi trebuit pur și simplu să explodeze în fața ta deodată și cel mai dificil lucru mi-a fost să caut o cale prin care să te ghidez cât mai lin fără șocurile unei ascensiuni dificile ale unei curbe de învățare pe care eu însumi am urmat-o.

Am menționat mai sus **obiectele interne**.

Pentru moment înțelege că *obiectele sunt niște structuri de date* și dacă-ți vine mai la îndemână, poți asocia obiectele cu niște fructe de rodie. În interior sunt bobițele care pot fi considerate a fi părții ale obiectului nostru. Hai să o iau ceva mai academic acum... Un obiect în JavaScript este o colecție de date și de acțiuni care pot fi invocate. Pentru că datele servesc acțiunilor și invers, această interacțiune trebuia să fie găzduită de un concept. Acesta este cel de obiect. De ce obiect? Pentru că noi oamenii avem nevoie să copiem realitatea naturală și să organizăm cunoașterea după tiparul material. Cel mai facil model la care ne putem referi este cel al obiectelor. În natură, obiectele au părți componente și sunt capabile de anumite acțiuni: emit sunete, apucă alte obiecte, etc. Așa și în cazul obiectelor din programare.

Obiectele acestea colecții de proprietăți pot fi considerate drept recipiente. Acestea conțin **valori** ***primitive***, **funcții** sau chiar alte **obiecte**. Dacă privim imaginea rodiei, proprietățile pot fi bobițele, care la rândul lor conțin sâmburele, fiind chiar valoarea.

Am mai introdus câteva cuvinte noi. Hai să le lămurim. Valorile primitive sunt ca niște blocuri elementare de lucru. Sunt chiar datele în forma primară de reprezentare a lor. Funcțiile sunt mini-programe în programul mare, dar care spre deosebire de programul mare care se execută deodată, acestea pot fi executate ori de câtre ori avem nevoie.

Obiectele în sine nu ar putea fi prea utile dacă sunt doar niște pomelnice de proprietăți, nu? Chestia super faină cu obiectele este că, urmând tiparul naturii, acestea pot moșteni de la părinți, adică obiectele în interiorul cărora au fost create, de fapt. Adu-ți mereu aminte că tot codul nostru rulează în interiorul **obiectului global**.  L-am reprezentat ca pe o sferă mare în care avem un ciorchine de entități - programul scris de noi, o bandă care se rotește mereu, fiind un gestionar al funcțiilor care se execută și niște faguri care sunt obiectele interne. Pe cale de consecință, toate entitățile create de noi, fie că sunt funcții, fie că sunt alte obiecte, vor moșteni automat metode și proprietăți de la obiectul global, dar și de la obiectele interne, care ne sunt create din oficiu.

**Moment ZEN**: Toate obiectele în JavaScript moștenesc de la părinți.

Forța acestui limbaj de programare rezidă tocmai din faptul că obiectele noastre pot moșteni. Acest lucru înseamnă că pot folosi acțiuni și date din obiectul global sau cel părinte. Să ne aplecăm asupra denumirilor membrilor unui obiect. Vom numi acțiunile *metode*, iar datele sunt proprietăți valorice pe care le introducem, modificăm și le transmitem unui alt obiect dacă e cazul. Metodele (adică acțiunile) sunt funcții, de fapt.

Acum că am lămurit în mare despre ce este vorba cu obiectele, avem nevoie să ne aplecăm asupra textului standardului pentru a înțelege ce se întâmplă la momentul în care codul sursă scris de noi ajunge în motorul JavaScript precum combustibilul într-un motor. De aici avem și denumirea de motor pentru software-ului care prelucrează codul scris de noi.

![Tărâm](Realm.jpg)

### Tărâmul de sub lupă

Un **tărâm** este constituit din **obiectul global** pentru tărâmul la care ne referim, un set de **obiecte interne** și mediul lexical creat de însăși felul în care este redactat codul (în engleză, *lexical environment*). Toate tărâmurile care sunt create sunt evidențiate de o înregistrare specială numită de standard `Realm Record`. Reține faptul că JavaScript vine cu câteva obiectele interne din start, care împreună cu programul scris de tine construiesc „un tărâm” - Realm.

Spune standardul ECMAScript:

> Înainte să fie evaluat, tot codul ECMAScript trebuie asociat unui *tărâm*. (**8.2 Realms**)

Se înțelege clar faptul că pentru a evalua codul propriu mai întâi trebuie să fie creat un `Tărâm` asociat acestuia chiar la momentul în care debutează evaluarea.

Structura de suport pentru *consumarea codului* este constituită la deschiderea unei pagini de browser sau la apelarea `node nume_program.js`. Chiorchinii din zona centrală se constituie la momentul executării codului. După cum bine ai intuit, obiectul global formează contextul în care programul nostru este evaluat. Am spus *evaluat*! Repetă o mantră internă când te apuci de scris cod JavaScript: tot codul pe care-l scriu va fi evaluat ca un set de expresii.

#### Formarea tărâmului - Geneză à la carte

Recomand maximă atenție acestei secțiuni pentru că indiferent de complexitatea aparentă, are darul prin povestea sa să vă lămurească chiar de la bun început cum se formează întreg universul JavaScript, cum se compune un `Tărâm` JavaScript. Vei vedea cum se naște lanțul moștenirii folosind prototipurile, acestea fiind obiectele interne (așa-numitele `intrinsics`), cum apare *obiectul prototip* pentru toate obiectele subsecvente (chiar am putea să-l numim obiectul arhetip de la care toate moștenesc) și cum apar obiectele indispensabile pentru un mediul gata pregătit să execute propriul nostru cod.

Se pune întrebarea dacă avem un singur tărâm pentru codul nostru? Răspunsul este că pot exista mai multe tărâmuri care pot comunica date unul cu altul. Cel mai rapid exemplu ar fi cel al relației stabilite dintr-o pagină web și un *iframe*. Fiecare generează amândouă două tărâmuri separate cu propriul obiect global, cu seturile lor distincte de obiecte globale.

Pentru a înțelege geneza unui Tărâm în JavaScript, vom apela la textul standardului, care la punctul `8.2.1 Create Realm` spune că orice motor JavaScript, va rula o operațiune internă a cărei rezultat este apariția unui `Realm`. Pașii, adică algoritmul urmat pentru crearea unui `Realm` aduc informații foarte importante, care odată înțelese, va permite o asimilară rapidă a limbajului. Hai să enumerăm și noi pașii algoritmului `CreateRealm()`, pentru că este ca și cum am asista la geneza galaxiei JavaScript, adică a Tărâmului ECMAScript.

Cui nu-i place o poveste bună despre începuturi?. Vom ambala într-o poveste părțile algoritmice, care conduc la apariția unui `Tărâm` (`Realm`).

Povestea pornește când nimic nu exista. Familiar?. În cazul nostru, este `momentul` când încă nu am deschis browserul sau un tab nou. Odată deschis, procesul care controlează construcția tuturor mecanismelor necesarare executării codului sursă, inițiază geneza unui Tărâm. Pentru simplitate și de dragul poveștii, vom numi acest proces Demiurgul.

Dacă urmărești concomitent textul standardului, vei observa că folosește stilul de redactare **camelcase**. Îl vom folosi și noi și pe parcursul întregului material de învățare. S-ar putea să mai vedeți și formulări cu liniuță jos (în limba engleză se numește **underscore**). Veți vedea acest mod de a scrie mai multe cuvinte care denumesc o entitate: `acestaEsteUnIdentificator`. În limba română acest stil de scriere s-ar traduce **scriere cu cocoașe** și asta se observă din modul de scriere.

Fiecare cuvânt din interiorul sintagmei este alipit de cuvântul anterior, dar începe cu majuscula care joacă și rol de separator. Privind acest mod de scriere, fiecare majusculă produce o `cocoașă` și de aici ideea de a numi astfel de scriere **camelcase** - stilulCămilă. Trebuie să menționez că acest mod de redactare este la mare concurență cu scrierea cu liniuță jos (un_identificator).

![](Hieronymus_Bosch_-_The_Garden_of_Earthly_Delights_-_The_exterior_(shutters).jpg "Hieronymus Bosch - The Garden of Earthly Delights - The exterior. Resursă în Public Domain de la: https://en.wikipedia.org/wiki/The_Garden_of_Earthly_Delights#/media/File:Hieronymus_Bosch_-_The_Garden_of_Earthly_Delights_-_The_exterior_(shutters).jpg")

`CreateRealm()` !!! spuse Demiurgul. Demiurgul nostru vine dotat cu algoritmii interni și resursele necesare creării unui Tărâm.

1. Din *neant* se va face o nouă înregistrare prin care identificăm noului tărâm. Numele înregistrării este `realmRec`. Tipologic vorbind, `realmRec` este un nou `Realm Record`”. Un `Realm Record` trebuie înțeles ca o fișă descriptivă în care vom avea mai multe câmpuri ce descriu noul `Realm`. Abia s-a creat o înregistrare, o descriere, un plan constructiv pentru tărâm.

În acest context, Record, în traducere românească, ar fi *înregistrare* cu sensul de mijloc pentru ținerea unei evidențe. Standardul vine și ne lămurește la punctul 6.2.1 că un `Record` este un tip de valoare ce „constă dintr-unul sau mai multe câmpuri care poartă o denumire”. Și încă o mențiune foarte prețioasă oferită de standard pentru a înțelege notațiile folosite mai departe: „numele câmpurilor sunt întotdeauna încadrate între paranteze pătrate duble, de exemplu \[\[Value]]”.

Ce avem până acum? Doar un plan arhitectural având o înregistrare centrală intitulală „`realmRec`”. Înregistrarea indică faptul că mai întâi se constituie un plan arhitectural pe care motorul, pardon, Demiurgul îl va folosi pentru a împlini geneza.

Pentru că acum `Tărâmul` nu are încă substanță, **Demiurgul** inițiază operațiunea `CreateIntrinsics(realmRec)` ca pas algoritmic în interiorul execuției `CreateRealm()`.

Înainte de acest pas al doilea, care de fapt este o altă comandă, să lămurim termenii. Standardul ne impune denumirea de `intrinsics` pentru toate entitățile care sunt create înainte de a rula propriul cod. În limba română traducerea termenului implică trei posibilități: intrinseci, interioare, proprii. Pentru că termenul de **intrinsec** este cel mai apropiat chiar și fonetic, îl vom utiliza și noi în acest material.

Acum se dezvăluie necesitatea de a înțelege formarea tărâmului JavaScript. Codul propriu are nevoie de obiectele intrinseci pentru a putea fi evaluat. Cunoașterea modului în care au apărut aceste obiecte intrinseci și relațiile pe care le formează cu alte elemente din „Realm”, o consider indispensabilă pentru înțelegerea deplină a acestui limbaj de programare.

<img src="realmRec.png">

2. O nouă fază debutează cu invocarea `CreateIntrinsics` având drept efect trimiterea planului abia creat procedurii numită `CreateIntrinsics()`. Acest pas al genezei este cel mai important, pentru că, urmând firul algoritmului `CreateIntrinsics(realmRec)`, vom asista la maiestuoasa naștere a tuturor entităților ECMAScript relevante. Să urmărim pașii:

2.1 „Fie «intrinsics» un `Record`”. În acest moment ne putem imagina `intrinsics` ca un raft să primească diferite obiecte. Standardul le numește `entități`. Numele folosite pentru a denumi entitățile de lucru se numesc identificatori.

2.2 Câmpul `[\[Intrinsics]]` al înregistrării *realmRec* realmRec.\[\[Intrinsics]] va fi adăugată. Planul nostru s-a îmbogățit cu o nouă înregistrare. Ai observat să am folosit un punct care indică adresa câmpului `[\[Intrinsics]]`. Poți citi așa: „câmpul intrinsics a lui realmRec”. Reține modul acesta de referențiere pentru că așa se va face și adresarea proprietăților din obiecte.

##### Nașterea obiectului prototipal

2.3 Acum urmează un pas crucial. Ești pregătit?

Algoritmul nostru va crea obiectul care va fi prototipul tuturor celorlalte. Zice textul genezei: fie ca identificatorul `objProto` să aibă drept valoare un nou obiect ordinar. Pentru a construi obiectul ordinar de care avem nevoie, Demiurgul inițiază un nou algoritm: `ObjectCreate(null)`.

Astfel, prin evaluarea tuturor pașilor procedurii `ObjectCreate(null)` va apărea un obiect ordinar, care va juca rolul de părinte al tuturor din perspectiva moștenirii (argumentul `null` indică acest fapt).

Acest obiect va fi prototipul tuturor celorlalte, care vor fi create prin evaluarea codului scris de tine. Concluzia simplă este că în acest moment s-a născut obiectul prototip zero, arhetipul tuturor celorlalte. Arhetipul este un obiect ordinar. Aici ar urma să inițiem o discuție care să lămurească ce-i cu moștenirea. Singurul aspect relevant pe moment este acela că atunci când lucrezi cu obiecte, inevitabil ai nevoie să „împrumuți” funcționalități ale altor obiecte evitând astfel necesitatea de a le crea de fiecare dată când ai nevoie de ele. Pe asta se bazează modul în care funcționează întregul ecosistem JavaScript. Funcționalitățile necesare prelucrărilor de date sunt *împrumutate* de la obiectele interne sau de la obiectele create de noi. Deci, este necesar un mecanism care să permită moștenirea. Fiind creat obiectul prototipal 0, tocmai a fost introdus și mecanismul prin care va fi permisă moștenirea.

2.4 Obiectul prototip abia creat devine proprietatea obiectului `intrinsics`, fiind identificat prin `intrinsics.[[%ObjectPrototype%]]`. Acesta este un moment aniversar. Tocmai s-a născut primul obiect. Obiectul simplu cu rol de prototip pentru toate celelalte.

##### Semnalizarea erorilor - I

2.5 Am avansat îndeajuns de mult cu geneza pentru a constitui un prim mecanism de raportare a erorilor. Zis și făcut. Pentru a realiza acest instrument, avem nevoie de ceva care să reacționeze la o stare de eroare, semnalând-o. Instrumentul care este cel mai potrivit este funcția. O funcție, cam în orice limbaj de programare este ca un mic progrămel apelabil. În acest moment, avem nevoie să creăm o funcție care să fie disponibilă oricând pentru semnalarea erorilor. Spuneam că în JavaScript totul este obiect. Funcțiile nu sunt o excepție și din acest motiv sunt numite funcții obiect.
Pentru a raporta erori avem nevoie de o funcție specializată care este definită o singură dată pentru un `Realm`. Toate instrucțiunile care vor testa o stare de excepție poartă identificatorul %ThrowTypeError%, dar pentru acest moment al genezei, toți pașii pe care îi va face %ThrowTypeError% vor fi atribuiți identificatorul `throwerSteps`.

2.6 Demiurgul a privit și a înțeles că nu este îndeajuns să *captureze* algoritmul prin care se `aruncă` (în engleză: `throw`) erorile... de fapt în limbajul de programare se referă la excepții. De ce excepții? Pentru că semantic chiar asta înseamnă: a apărut o excepție de la regulile limbajului. Adu-ți mereu aminte că un limbaj de programare este asemenea gramaticii, un set de reguli prin care urmărim, în cazul nostru, o bună comunicare cu mașina.

Să revenim la momentul când Demiurgul va lua pașii algoritmici capturați prin identificatorul `throwerSteps` și îi va folosi inițializând algoritmul: `CreateBuiltinFunction(realmRec, throwerSteps, null)`. Avem trei argumente: înregistrarea de tărâm, care în cazul nostru este referențiată prin identificatorul `realmRec`, pașii algoritmici, care în cazul nostru au fost plasați sub identificatorul `throwerSteps` și obiectul prototip, care în cazul nostru nu este necesar, fiind setat la `null`. Ceea ce oferă înapoi pe baza acestor ingrediente, este un obiect-funcție intern (în engleză `built-in function object`).

Încă nu ai realizat ce minune s-a întâmplat? Tocmai s-a creat o primă funcție în micul nostru univers, pardon, `Tărâm`. Această funcție când va fi apelată, va urma pașii algoritmului atribuit mai sus lui `throwerSteps`. Ceea ce mai trebuie observat este faptul că această funcție obiect internă spre deosebire de altele, fiind prima, nu are prototip... al treilea argument după cum bine observi este `null`.

Pentru că a fost creată această primă funcție obiect internă, va trebui să fie atribuită unui identificator pentru a o apela când avem nevoie. În acest sens, standardul o atribuie identificatorul `thrower`. Funcția internă anonimă care face parte din elementele intrinseci este o funcție obiect care este definită o singură dată pentru un tărâm.

2.7 Funcția de verificare identificată prin thrower va fi de acum înainte valoarea lui intrinsics.\[\[%ThrowTypeError%]].

2.8 Mai sus, a fost pus un identificator pe un algoritm. Acum se va pune un identificator pe un algoritm care nu are niciun pas. Esența sa este să nu facă ceva. Identificatorul acestuia este `noSteps`. Acesta este necesar momentelor când motorul să poată opta să nu facă nimic în anumite condiții.

##### Nașterea obiectului prototip al funcțiilor

Avem nevoie să dotăm funcțiile cu un obiect prototip propriu pentru că acestea sunt și ele obiecte la rândul lor. Orice obiect, după cum am aflat anterior, moștenește de la un altul și în cazul funcțiilor, trebuie să permitem obiectelor să moștenească de la ele proprietăți.

2.9 Este creat identificatorul `funcProto`. Acesta va face referință la obiectul rezultat din operațiunea abstractă  `CreateBuiltinFunction(realmRec, noSteps, objProto)`. Am văzut la lucru această operațiune mai sus când a fost constituit un mecanism de verificare și cel `noSteps`.

Pașii pentru crearea obiectului prototip al funcțiilor:

-   înregistrarea `realmRec` este trimisă ca prim argument,
-   o secvență algoritmică vidă (`noSteps`) constituie al doilea, argument. Este și logic ca obiectul funcție returnat să facă nimic, deci nu va fi apelat,
-   referința către obiectul prototip zero `objProto`.

Este returnată funcția obiect internă ca rezultat al executării algoritmului `CreateBuiltinFunction`. Dacă am face o disecție acestui obiect funcție care tocmai a devenit prototipul oricărei funcții care va fi creată de acum încolo, vom găsi următoarele:

-   are o înregistrare care ține minte cărui *Tărâm* aparține,
-   are referința către obiectul prototip universal creat anterior identificat prin `objProto`,
-   are o mențiune ce indică că acest obiect funcție este extensibil, adică i se pot adăuga proprietăți noi,
-   are un câmp comun care indică dacă este un `Script` sau `Module`, dar este setat la `null` pentru că nu este cazul,
-   și o listă de proprietăți setate la `undefined` pentru că acelea aparțin altor funcții obiect ce vor apărea în viitor.

În acest moment s-a constituit obiectul prototip al tuturor funcțiilor. Acesta nu mai este un obiect ordinar, ci este un obiect funcție. Reține faptul că acest obiect funcție intern este unul extensibil. Acum, dacă avem prototipul, îl vom referenția mereu cu identificatorul creat la început: `funcProto`.

2.10 Obiectul funcție intern cu rol de obiect prototip pentru toate funcțiile care tocmai a fost creat va fi identificat din acest moment ca `intrinsics.[[%FunctionPrototype%]]`.

##### Semnalizarea erorilor - II

2.11  Pentru că există acum prototipul pentru toate funcțiile, Demiurgul va încheia construcția funcției de afișare a erorilor dotând-o cu obiectul prototip prin setarea legăturii la identificatorul `objProto`.

##### Finalizarea construcției obiectului prototip

2.12 Crearea prototipului funcțiilor obiect nu s-a încheiat. Te vei întreba de ce. Răspunsul este că în forma sa actuală, nu-și atinge scopul. Te vei întreba care-i scopul unei funcții? Simplu. Acela de a fi apelată, adică de a fi chemată pentru a-i fi evaluat codul pe care-l poartă și care-i dau unicitatea și funcționalitatea. Deci, trebuie să facem funcția noastră apelabilă.

Algoritmul abstract `AddRestrictedFunctionProperties(funcProto, realmRec)` adaugă două proprietăți obiectului funcție tocmai creat:

-   `caller` ce oferă mecanismul ce permite invocarea și
-   `arguments`, care este o colecție a tuturor argumentelor pe care o funcție le poate primi.

Pe scurt, proprietatea care face funcțiile apelabile și cea care le face capabile de a ține evidența argumentelor primite sunt adăugate prototipului.

<img src="intrinsics.png">

În acest moment, ceea ce s-a realizat este remarcabil: primul obiect cu un prototip care va permite celorlalte obiecte să moștenească și prima funcție cu un prototip care va permite celorlalte funcții și obiecte să moștenească. Dar încă că Tărâmul este nepopulat. Avem un fel de Grădină în care avem doar un Adam (obiectul primordial) și o Evă (prima funcție). Restul bestiarului este inexistent. Toate cele necesare unei lumi, unui Tărâm viu sunt adăugate în această fază, fiind asimilate drept intrinsics.

2.13 Înregistrării `intrinsics` i se adaugă restul de proprietăți care sunt obiecte și obiecte-funcție intrinseci:

-   Obiecte fundamentale pentru rularea codului: `Object`, `Function`, `Boolean`, `Symbol` și `Error`;
-   Obiecte pentru procesarea textelor: `String`, `RegExp`;
-   Obiecte pentru reprezentarea și manipularea numerelor și datelor calendaristice: `Math`, `Number`, `Date`;
-   Obiecte pentru manipularea datelor structurate: `DataView`, `JSON`, `ArrayBuffer`;
-   Obiecte pentru manipularea colecțiilor indexate automat: `Array` și familia sa;
-   Obiecte pentru manipularea colecțiilor indexate cu ajutorul cheilor: `Map`, `WeakMap`, `Set` și `WeakSet`;
-   Obiecte pentru controlul operațiilor abstracte: `funcțiile generator` și `Promise`;
-   Obiectele cu reflexie: `Proxy` și `Reflect`.

Revelator este faptul că toate, dar toate aceste entități sunt create folosind aceeași comandă abstractă, pe care, Demiurgul a folosit-o de două ori până acum: CreateBuiltinFunction(realmRec, <steps>, <prototype>, <slots>);

![](ObiecteFundamentale.png)

2.14 Odată cu adăugarea tuturor celor menționate mai sus, înregistrarea `intrinsics` este deplin formată și a fost deja returnată ca ultim pas al comenzii abstracte `CreateIntrinsics (realmRec)`.

În acest moment, toate entitățile lui `intrinsics` sunt pregătite pentru a contribui la evaluarea codul sursă scris de noi de îndată ce motorul îl va executa.

**Nu am terminat.**

Abia suntem la pasul 2 al Genezei noastre. Odată create obiectele intrinseci, vom continua cu întregirea și finalizarea obiectului `realmRec`.

3. Este setată proprietatea `realmRec.[[GlobalObject]]`, care inițial are valoarea `undefined`.
4. Este setată proprietatea `realmRec.[[GlobalEnv]]`, care inițial are valoarea `undefined`.
5. Proprietatea `realmRec.[[TemplateMap]]` este setată ca o listă goală.
6. Este încheiată geneza `Tărâmului` prin returnarea obiectului `realmRec`.

Acum, Geneza unui `Tărâm` s-a încheiat. Demiurgul se odihnește nu înainte de a ne pasa responsabilitatea de a gestiona propriile programe. Obiectul global este locul în care va sta codul nostru pentru a fi rulat și evaluat. Poți să-ți imaginezi `obiectul global` în acest moment, precum *Grădina deliciilor pământene* a lui Hieronymus Bosch, dar fără bestiar și oameni.

#### Obiectul global

Acest obiect generic - obiectul global este pus la dispoziție din start fără niciun apel sau vreo declarație specifică. Doar deschizi browserul și el deja există. Ai să mă întrebi curios: când se formează obiectul global, dacă spui că el există deja? Aici lămurirea vine de la textul standardului, care spune cristal că obiectul global „este creat înainte de intrarea controlului în orice context de execuție”. Concluzionând, el preexistă momentului de debut a evaluării codului nostru.

Știu, te-am intrigat... hai să-ți mai zic așa o chestie să se uite mâțu'n leuștean: însuși obiectul global, care oferă funcționalități codului scris de noi, are nevoie de un mâner, de o etichetă, de propriul său identificator prin care să-l putem referenția și să accesăm proprietățile sale.

În cazul browserelor, dacă deschizi consola (aici ai să lucrezi cel mai mult timp, iar în următorul capitol, chiar te pun să te distrezi nițel acolo), și scrii `window`, care este identificatorul obiectului global, și: BUM! Apare ca din senin o listă parcă nesfârșită de funcționalități gata să le folosești în codul tău. Curioasă rău!? Bine. Sunt peste 900 de elemente gata de a fi folosite. Nu te speria, nu trebuie să le memorezi, să le știi pe toate... totul va veni natural pe măsură ce nevoia te împinge de la spate.

**Geneza Obiectului Global**

După ce un `Tărâm` s-a format, următorul în linia creației este obiectul global. Acesta la momentul creării unui `Realm` are asociată valoarea `undefined`, dar imediat ce sunt atașate proprietățile `[[GlobalEnv]]` și `[[TemplateMap]]` la `realmRec`, debutează în forță crearea obiectului global.

Urmărirea pașilor de formare a **Obiectului Global** aduce multiple lămuriri asupra mecanismelor de constituire a legăturii `this` și multe clarificări privind moștenirea. Pentru a înțelege pașii acestui algoritm, trebuie să fi trecut prin pașii de formare a unui `Tărâm`. Altfel, nu vei înțelege de unde vin anumiți identificatori și proprietăți ale obiectului `intrinsics` sau cine este `realmRec`.

După odihna binemeritată, Demiurgul inițiază algoritmii pentru crearea obiectului global urmând pașii  lui `SetRealmGlobalObject (realmRec, globalObj, thisValue)`.

1. Verifică dacă identificatorul `globalObj` este setat la valoarea `undefined`. Obiectul global chiar este setat în acest moment la valoarea `undefined`. Dacă te uiți la ultimii pași ai creării Tărâmului, vei vedea că unul din pași, chiar asta face.  Dacă iar dacă da, urmează următoarea secvență:
  a. atribuie unui nou identificator `intrinsics` valoarea lui `realmRec.[[intrinsics]]`, care este chiar înregistrarea `intrinsics` constituită la crearea Tărâmului. Asta ce înseamnă? Că toate obiectele interne JavaScript vor intra în etapa de creare a obiectului global.
  b. atribuie identificatorului `globalObj` rezultatul operațiunii `ObjectCreate` căreia îi trimitem drept prim parametru `intrinsics.[[%ObjectPrototype%]]`. Acesta, dacă-ți mai aduci aminte este un obiect ordinar, care stă la baza construcției tuturor obiectelor prototip. Am văzut deja cum s-a construit obiectul prototip al funcțiilor. Acesta va deveni valoarea lui `globalObj`. Ceea ce tocmai s-a întâmplat este că obiectul care joacă rolul de obiect prototip al obiectului global va moșteni toate proprietățile obiectului ordinar creat la formarea Tărâmului (pentru detalii vezi 9.1 Ordinary Object Internal Methods and Internal Slots, ECMAScript® 2018 Language Specification).
2. Este verificat dacă valoarea lui `globalObj` chiar este un obiect.
3. Acest pas este foarte important prin precizările pe care le aduce. Pur și simplu,  se va constitui o referință numită `this` care va trimite la valoarea lui `globalObj`. Dar hai să o luăm cu începutul. Mai întâi de toate este verificată valoarea identificatorului `thisValue`, iar dacă aceasta este `undefined`, se va face legătura între `thisValue` și valoarea lui `globalObj`.

Ceea ce tocmai s-a petrecut este că obiectul prototip al obiectului global a devenit valoarea referită prin this. Reformulând, se poate spune că obiectul prototip al obiectului global poate fi referit și cu this.

4. Se va seta ca valoarea identificatorului `realmRec.[[GlobalObject]]` să fie valoarea identificată de `globalObj`.
5. Este pasul la care este creat mediul lexical propriu pentru *obiectul global*. Acesta este identificat prin `newGlobalEnv` și este rezultatul operațiunii `NewGlobalEnvironment(globalObj, thisValue)`. Reținem din pașii operațiunii `NewGlobalEnvironment` faptul că mediul lexical extern al obiectului global este setat la `null`, adică nu mai există altul mai sus. Obiectul pasat va fi considerat obiectul care va constitui registrul mediului lexical format, adică locul unde vor fi introduse legăturile dintre identificatori și valorile lor.
6. Identificatorul `realmRec.[[GlobalEnv]]` primește drept valoare obiectul lui `newGlobalEnv`. Și în acest chip, se vor fi completat și proprietățile obiectului `intrinsics` schimbându-și valoarea de la `undefined` la cele desemnate aici.
7. Înregistrarea `realmRec`  este returnată cu aceste completări importante.

Trebuie precizat un detaliu crucial. Fiecare dezvoltator de motor JavaScript alege care va fi obiectul prototip al obiectului global.

**Moment ZEN**: Toate obiectele și funcțiile unui program sunt membri ai obiectului global dacă nu vor fi izolate cu intenție.

Crearea obiectului global s-a încheiat, dar mai este necesar să fie făcut un pas: stabilirea de identificatori pentru toate proprietățile obiectului global. Acest pas este făcut prin rularea comenzii abstracte `SetDefaultGlobalBindings (realmRec)`. Cine sunt proprietățile obiectului global? Acestea sunt precizate de standard și vom preciza și noi câteva:

- Proprietăți valorice:
  - `Infinity`,
  - `NaN`,
  - `undefined`

- Funcții:
  - `eval(cevaCod)`,
  - `isFinite(număr)`,
  - `isNan(număr)`,
  - `parseFloat(cifre)`,
  - `parseInt(cifre, rădăcină)`,
  - funcții de gestionare a URI-urilor,
  - funcții cu rol de constructori (`Array()`, `Boolean()`, etc.).

- Alte proprietăți:
  - `Atomics`,
  - `JSON`,
  - `Math`,
  - `Reflect`.

Pe suprafața sferei obiectului global sunt dispuse spre a rezolva diferite cerințe proprietățile obiectului global pe care JavaScript le pune la dispoziție din start fiind reprezentate ca structuri hexagonale în imaginea creată. Cele care sunt *obiectele interne* sunt asociate celui global. Acest lucru este corect pentru că *obiectele interne* nu aparțin obiectului global. Standardul spune foarte clar că „ECMAScript definește o colecție de obiecte interne care întregesc definiția de «entități ECMAScript»” (4.2 ECMAScript Overview).

### JavaScript este de un grup de obiecte care comunică între ele.

Toate eforturile acestui capitol au fost îndreptate pentru a susține această afirmație foarte importantă pentru înțelegerea modului de lucru în JavaScript. Am văzut cum s-au constituit obiectele interne, am văzut cum s-a constituit însuși mecanismul de moștenire și cum a apărut obiectul `this`, precum și mediul lexical inițial. De fapt este întreaga țesătură nevăzută, care poate fi sondată pentru ca obiectele, funcțiile și valorile codului propriu să poată fi evaluate.

Obiectele interne oferă funcționalități și date funcțiilor și obiectelor introduse de noi prin codul sursă, la momentul evaluării codului sursă. La execuția codului unele dintre datele și funcționalitățile obiectului global pot fi modificate. Asta uneori creează neplăceri pentru că în cadrul aceluiași obiect global este posibil să rulezi codurile sursă a mai multor programatori și fiecare dintre acestea să se aștepte ca proprietățile native ale obiectului global să fie nemodificate.

### În execuție (runtime), beneficiem de o buclă a evenimentelor (event loop) și o stivă pentru apeluri (callstack)

JavaScript este un limbaj de programare bazat pe evenimente (***event driven***). De aici natura dinamică și originile sale privind dinamicitatea paginilor web. De exemplu, când dai click pe un buton, acest eveniment determină un anumit comportament. Programele JavaScript care rulează pot iniția anumite acțiuni, pot aduce date externe, pot împinge date către anumite servicii web, pot prelucra streamuri de date, etc.

Pentru ca toate acestea să se poată întâmpla, trebuie să existe un mecanism de gestiune a timpilor în care se întâmplă tot acest val de acțiuni.

Acest mecanism existent la momentul execuției se numește *bucla evenimentelor* sau *event loop* în limba engleză. Bucla evenimentelor este cu atât mai necesară cu cât ne acomodăm cu ideea că JavaScript are un singur fir de execuție. Ce înseamnă acest lucru? Dacă îți închipui toată activitatea codului ca pe un fir care leagă momentul începerii execuției, de cel al finalizării, pe acest fir se înșiră toate evaluările tuturor expresiilor, toate funcțiile executate, generarea obiectelor și și dispariția lor. Într-un cuvânt tot ce face programul se înșiră precum mărgelele într-un șirag. Nu există posibilitatea de a rula în paralel nimic. Totul trebuie să găsească momentul oportun să se execute în limitele acestui fir. Momentul rulării întregului cod se numește runtime.

Existența acestui fir unic de execuție implică necesitatea unui mecanism suplimentar care să fie capabil să țină evidența cui se execută, cine așteaptă terminarea altei execuții de care depinde și cine își reia execuția după ce a primit ce avea necesar să-și termine propria execuție. Vorbim aici de o adevărată stivă pentru apeluri, care se numește în engleză callstack. Acesta este un fel de registru de intrări - ieșiri.

Apariția unui eveniment declanșează executarea unor fragmente de cod rulate în funcție de evenimentul declanșator. Vom vedea ulterior cât de utilă este acestă „buclă a evenimentelor”.

John Resig (creatorul bibliotecii de cod JQuery) spune că JavaScript este o relație între funcții, closure-uri și obiecte, care conduce la înțelegerea cu adevărat a acestui limbaj de programare dinamic. Programatorii numesc o colecție de surse de cod o bibliotecă.

Motoarele JavaScript au o structură ceva mai complexă. Au o stivă de apeluri cu tot atâtea contexte de execuție (când rulezi o funcție, de exemplu, se creează un context în care aceasta este apelată), au un event loop - o buclă care capturează evenimente și mai au și o coadă de așteptare a callback-urilor (funcții care se execută când funcția gazdă și-a încheiat execuția), plus API-urile web.

Am menționat faptul că JavaScript nu poate face decât un singur lucru la un moment dat, dar pentru că runtime-ul JS nu este singur, ci mai avem și bucla, dar și [API-urile web](https://www.w3.org/TR/html5/webappapis.html#webappapis) puse la dispoziție de browsere, se poate rula cod asincron, ceea ce înseamnă că un eveniment, nu va bloca firul de execuție pentru că nu și-a terminat treaba. Toate aceste lucruri suplimentare care există în browser, de fapt înseamnă tot atâtea fire de execuție și asta înseamnă că poți să te apropii de ceea ce ar fi un mediu care execută mai multe treburi deodată fără să se creeze blocaje. Poate părea în contradicție cu ceea ce am spus la început, dar nu este. Realitatea rulării codului JavaScript este cea a unui mediu oferit de un anumit browser, iar acest mediu este foarte, foarte complex, dar care compensează prin adevărata magie care poate rezulta din manipularea informației.

### Tipurile de date - *language types*

În JavaScript valorile sunt de două feluri: **primitive** și **obiecte**.

Valorile primitive nu pot fi transformate în sensul că o valoare numerică 3 va fi întotdeauna 3. În plus, o *primitivă* nu are metode atașate. Pur și simplu nu pot avea și pe cale de consecință nici nu pot fi modificate, nu suferă mutații

**Moment ZEN**: Primitivele permit accesarea directă a valorilor, iar obiectele pot fi accesate printr-o referință.

Dar să vedem toate valori le cu care putem opera. Spune standardul că aceste tipuri ale limbajului (referindu-se la valori) sunt direct manipulabile de către programator.

- `undefined`. „Nedefinit” este o valoare în sine chiar dacă pare foarte straniu; „orice variabilă care nu are o valoare asignată are valoarea `undefined`” (ECMA-262). De fapt exprimă starea de dinaintea legării identificatorului la o valoare (las că-ți explic povestea asta mai încolo).
- `null`. Da, o valoare nulă este considerată o valoare și este utilă când vrei să pornești de la zero barat. Chiar asta e: zero barat... ce să mai, o nulitate.
- `boolean`. Este denumită după cercetătorul Boole și are două stări: `true`  adevărat sau `false` - fals,
- `string`. „Șir de caractere” este succesiunea de caractere care formează un text,
- `number`. „Număr” reprezintă valori reprezentate pe 64 de biți în virgulă mobilă (format al standardului IEEE 754‐2008),
- `Object`. „Obiect” este o colecție de proprietăți; o proprietate are o cheie de acces către valoarea sa care poate fi o valoare de tip string sau Symbol. Ține minte că un șir gol este o cheie validă. „Numele unei proprietăți” este cheiea unei proprietăți care este o valoare string.
- `Symbol`. Este o valoare care nu este string dar care poate fi utilizată drept cheie a unui Obiect. Este foarte utilă atunci când dorești să treci de barierele cheilor convenționale ale obiectelor, care te forțează să folosești un șir de caractere.

După cum se observă, fiecare tip este expresia a două elemente: sintaxa și semantica. Sintaxa implică „codarea" printr-un cuvânt din limbajul natural, care în cazul JavaScript este limba engleză, iar semantica indică conceptul reprezentat.

**Spune standardul**: „O valoare a limbajului ECMAScript este o valoare caracterizată de un tip al limbajului ECMAScript”.

În ceea ce privește numerele, la un moment dat, te vei lovi de apariția unei valori ciudate numite `NaN` (este prescurtarea de la **Not a Number**) și este reprezentarea unui număr în virgulă mobilă mai special. JavaScript îl folosește mai mult pentru a indica o stare a unui calcul care avea intenția să ajungă la un număr, dar din diverse motive, nu s-a finalizat corespunzător. Rezultatul este ceva non-numeric.

Mai avem introdus de curând (noul standard), numărul special `Infinity` și infinitate negativă `-Infinity`.

#### Valorile literale

Am vorbit mai devreme despre aceste valori. Valorile literale sunt de fapt exprimarea în scris a datelor cu care lucrează ECMAScript. Literalele sunt tipurile de date cu care lucrăm. Se numesc literale pentru fără a folosi caractere nu am putea spune computerului ce vrem să folosim. Păi dacă nu scrii `3`, cum altfel să știe compul că vrei să-i dai ca operand valoarea trei? Logic!

<img src="LiteralValue.png" width="350px">

Valorile literale sunt tipuri de date care pot fi definite fără să fie ceva instanțiat în mod special sau să creezi vreun obiect special pentru a lucra cu ele.

Haideți să le trecem în revistă tipurile de literale sau cum scriem valorile:

-   **String**: `'ceva';` (cu ghilimele simple) și `"altceva";` (cu ghilimele duble),
-   **Boolean**: `true;` sau `false;`,
-   **Număr**: `3;`, `3.1415;`, un binar `0b1101;`, un hexazecimal `0x00F`, un octal `0o324`,
-   **Array**: `[];`; iată un array care include două literale de tip număr: `[2,7];` sau care include un literal string și unul număr `['ceva', 2];`,
-   **Obiect**: `{};` - obiect literal gol sau obiect literal care are un literal string și unui număr numite `primo` și `secundo`: `{primo: 'ceva', secundo: 3};`,
-   **Regular Expression**: `/ceva/;`,
-   **Funcție**: `function () {};`,
-   **Funcție cu nume**: `function faCeva () {};`,
-   **Null**: `null;`,
-   **Undefined**: `undefined;`
-   **template string**: <code>&#96;</code>`un text ${variabila}`<code>&#96;</code>. Observă că pentru a construi un template string am pus tot textul nostru între două <code>&#96;</code>, care este caracterul pentru reprezentarea accentului grav (grave accent, în engleză).

Pentru cei foarte curioși vom explora nițel și diferența dintre valorile literale declarate simplu și cele instanțiate folosind constructorul corespondent lor.

Vom prezenta doar cazul șirurilor. Pentru a vedea și diferențele vom „stoca” în variabile rezultatele evaluărilor.

```javascript
var a = 'ceva'; // string literal identificat prin a
var b = new String('ceva'); // string creat cu ajutorul constructorului
typeof a; // "string"
typeof b; // "object"
```

La suprafață `a` și `b` conțin același lucru, dar în adâncime sunt două tipuri diferite pentru motivul că s-au „născut” altfel.

Toate aceste valori literale le putem identifica prin „introducerea” lor într-o variabilă, rețetă folosită și de noi.

### Variabile pe scurt

Care este funcția variabilelor în economia unui program? Acesta este întrebarea care intuiește un răspuns. Ca și oamenii care au nevoie să-și aducă aminte lucruri, la fel și software-ul are nevoie de o „memorie” proprie pe care să o folosească pentru a ține pentru propriul uz diferite valori sau stări.

```javascript
var x = 1;
```

**Moment ZEN**: JavaScript este un limbaj redactat dinamic (*dynamically typed language*), ceea ce înseamnă că nu trebuie să specifici tipul de valoare al variabilei așa cum în alte limbaje este cerut: `int x = 1`.

Variabilele sunt mai ales necesare pentru „a prinde” valorile returnate din anumite procesări sau evaluări ale expresiilor.

```javascript
var identificValoarea = 2 + 1;
```

JavaScript folosește trei cuvinte cheie pentru acest scop: `var`, `let` și `const`. Pot părea cam multe la prima vedere pentru o aceeași funcționalitate, dar fiecare are specializarea sa. Până la actualizarea recentă de standard a existat doar `var`. Unii spun că în curând nu va mai fi nevoie să mai folosim `var`.

Ceea ce observăm atunci când am definit o variabilă este că am folosit un cuvânt cheie `var` urmat de un nume care va identifica unic „legătura” către o valoare. După atribuirea valorii, însăși numele acelei variabile devine o expresie care poate fi folosită apoi în operațiuni diverse.

```javascript
var ceva = 10;
ceva * 2; // 20
```

Ai observat? `ceva` are capacitatea de a fi operand.

În plus, poți folosi o singură dată cuvântul cheie și apoi să declari câte variabile vrei separate prin virgulă. Chiar este practica cea mai eficientă.

```javascript
var a = 10, b = true, x, y, z;
```

Pentru a citi repede codul, practica pune fiecare declarație pe o linie separată.

```javascript
var a = 10,
    b = true,
    x, y, z;
```

Închei cu o precizare. Chiar dacă vei întâlni adesea comparația unei variabile cu o cutie sau cu un vas care „găzduiește” o valoare, aceasta este doar o convenție. Cel mai de folos ar fi să-ți imaginezi o variabilă ca pe o legătură dintre o etichetă (identificator) și un obiect de care este atașată (valoarea). Îți mai amintești imaginea cu fanioanele?

Atunci când definești o variabilă care nu trimite la nicio valoare, îi va fi legată automat una și aceasta este `undefined`.

### Funcțiile pe scurt

Funcțiile sunt bucăți de program „ambalate” ca valori. Au și ele un nume ca și variabilele și pot evaluate în expresii. Te poți gândi la ele ca la programe mai mici în programul mare.

```javascript
function faCeva () { return 'Salve!' };
```

Funcțiile sunt un ***tip de obiecte***. Deci, tot niște rodii. Ha ha! În JS acestea sunt de tip `callable` (în rom. *apelabile*), adică niște rodii pentru care se poate iniția un apel pentru a executa bucata de program conținută. Reține faptul că termenii „a apela”, „a invoca”, „a invoca” și „a rula” o funcție sunt interșanjabili și înseamnă același lucru: execută codul din funcție. Ce le face deosebite față de celelalte obiecte este că au două proprietăți specifice: `constructor` și `call`.

**Moment ZEN**: formula de apelare a unei funcții este o expresie, care după cum bine știm, va fi evaluată, adică codul din funcție va fi executat.

Ce înseamnă a le executa? Pur și simplu motorul se va uita între acolade, va compila codul, va face recensământul identificatorilor și îl va evalua returnând un rezultat.

Pentru că lucrurile simple sunt plicticoase, mai completăm cu faptul că funcțiile care sunt proprietăți ale unui obiect, sunt numite **metode** ale acestuia. Nu te lăsa intimidat de noua etichetă: *metodă*. Funcția rămâne funcție fără a fi atinsă în niciun fel de faptul că „face parte” a unui obiect. Poți să-ți închipui funcția ca fiind separată de obiect, dar execuția ei va fi legată de contextul acelui obiect.

Mai adăugăm că ECMAScript, adică JavaScript are niște obiecte cu care vine el din start (`built-in objects`). Deci, din start, browserul ca și instrument care aplică standardul ECMAScript, vine cu propria lădiță de rodii.

### Cum se rulează software-ul scris în JavaScript?

Ce înseamnă că un software scris în JavaScript se execută?
Codul sursă JS este procesat de fiecare dată când este rulat. Acest lucru înseamnă că sursa este citită de sus în jos enunț cu enunț, iar pentru fiecare dintre aceste linii se face o „interpretare” a ceea ce înseamnă.
Pentru JavaScript se întâmplă că sursa este parcursă înainte de a fi rulată pentru a fi „compilată”, asta însemnând că motorul JavaScript va seta cadrul în care va rula codul... va constitui mediile lexicale, le va popula cu identificatori și așa mai departe.

## Resurse

[ECMAScript® 2017 Language Specification](https://tc39.github.io/ecma262/)
[Standard ECMA-262 ECMAScript® 2016 Language Specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
