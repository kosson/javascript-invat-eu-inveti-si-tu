## Perspectivă peste tărâmul JavaScript

Atunci când am pornit la scrierea acestei cărți nu am avut nevoia să văd de pe orbită cum arată planeta JavaScript, dar pe măsură ce am avansat, am realizat că este nevoie să privești mai întâi din spațiu pentru a înțelege valoarea tuturor entităților și relațiilor pe care le stabilesc acestea la nivelul solului.

Am înțeles deslușind standardul că vorbim despre o adevărată lume, chiar despre un **tărâm** special.

Textul standardului ECMAScript oferă cea mai bună perspectivă atunci când vine vorba despre un program JavaScript care este privit la lucru. Voi parafraza și cita acolo unde este necesar textul standardului pentru a contura un cadru cât mai complet.

Urmând firul unei adevărate geneze, standardul menționează chiar termenul de „realm" - **tărâm**: „înainte de a fi evaluat, tot codul ECMAScript trebuie asociat unui tărâm”.

> Un tărâm constă dintr-un set de **obiecte interne** (în englezește li se spune ***built-in*** și mot-a-mot ar fi tradus *construite-intern*), un **mediu global** (***global environment***) și tot **codul ECMAScript** care este încărcat în cadrul «interiorul (pe englezește *scope*)» acelui mediu global, precum și alte stări și resurse asociate”.

Acesta este cel mai valoros citat al standardului pentru că este ca o fotografie a planetei JavaScript de pe orbită. Este fotografia `Tărâmului` nostru.

Am precizat câțiva termeni deja care fac parte dintr-un adevărat idiom pe care-l impune limbajul. Comunitatea de programatori în JS au propriul limbaj de comunicare, uneori un jargon din care se strecoară în uzul de zi cu zi câte un termen, de exemplu cum este „scope", care formal în ECMAScript se numește „lexical environment" - tradus în română: *mediu lexical*.

Pentru că deja am intrat într-o mini descriere a limbajului, voi continua adaugând faptul că de la JavaScript prin varietatea de stiluri dezvoltate în timp, s-au distins chiar dialecte așa cum este TypeScript sau CoffeeScript. Dar asta este o discuție lungă și nu mai zăbovim aici. Adaug doar că există aproape 300 de limbaje care sunt compilate la final în JavaScript.

**Termenii noi nu trebuie să te descurajeze**. Fac parte din efortul de a înțelege și chiar dacă apar de la început, vor fi descriși pe parcurs și vei înțelege ce se ascunde în spatele lor pe deplin. Înțelegerea unui limbaj de programare este ca un desen al unei rețele de noduri care comunică între ele. Am reflectat mult la balansul pe care trebuie să-l realizez în materialul pe care tocmai îl citești. Dacă aș fi urmat manualele clasice, acest desen complex (matematicieni îl numesc *graf*) ar fi trebuit pur și simplu să explodeze în fața ta deodată și cel mai dificil lucru mi-a fost să caut o cale prin care să te ghidez cât mai lin fără șocurile unei ascensiuni dificile ale unei curbe de învățare pe care eu însumi am urmat-o și tare mult am transpirat. Să revenim.

Am spus eu mai sus despre ***obiecte interne***.

Pentru moment înțelege că *obiectele sunt niște structuri de date* și dacă-ți vine mai la îndemână, poți asocia obiectele cu niște fructe de rodie. În interior sunt bobițele care pot fi considerate a fi proprietățile obiectului nostru. Hai să o iau ceva mai academic acum... Un obiect în JavaScript este o colecție de date și de acțiuni care pot fi invocate. Pentru că datele servesc acțiunilor și invers, această interacțiune trebuia să fie găzduită de un concept. Acesta este cel de obiect. De ce obiect? Pentru că noi oamenii avem nevoie să copiem realitatea naturală și să organizăm cunoașterea după tiparul material. Iar cel mai facil model la care ne putem referi este cel al obiectelor. Obiectele în natură au proprietăți și expun privirii noastre acțiuni (curg, emit sunete, apucă alte obiecte, etc.). Așa și în cazul obiectelor din domeniul programării: sunt colecții de proprietăți, fie că sunt date, fie că sunt acțiuni.

Obiectele acestea ca niște colecții de proprietăți pot fi considerate drept recipiente care conțin la rândul lor **valori**, **funcții** sau chiar alte **obiecte**. Dacă urmăm imaginea rodiei, proprietățile pot fi bobițele, care la rândul lor conțin sâmburele, care este chiar valoarea.

Am mai introdus câteva cuvinte noi. Hai să le lămurim. Primitivele sunt ca niște blocuri elementare de lucru. Sunt chiar datele, forma primară de reprezentare a lor. Funcțiile sunt mini-programe în programul mare. Obiectele, am stabilit: rodii! :).

Obiectele în sine nu ar putea fi prea utile dacă sunt doar niște pomelnice de proprietăți, nu? Chestia superfaină cu obiectele este că urmând tiparul naturii, acestea pot moșteni de la părinți, adică obiectele în interiorul cărora au fost create. Adu-ți mereu aminte că tot codul nostru rulează în interiorul **obiectului global**. L-am reprezentat ca pe o sferă mare. Pe cale de consecință, toate entitățile create de noi, fie că sunt funcții, fie că sunt alte obiecte, vor moșteni automat metode și proprietăți de la obiectul global.

**Moment ZEN**: Toate obiectele în JavaScript moștenesc de la părinți.

Forța acestui limbaj de programare rezidă din faptul că obiectele noastre pot moșteni, adică pot folosi ca și cum ar fi ale lor acțiuni și date din obiectul global sau cel părinte. Hai să devenim mai atenți la cum denumim proprietățile din interiorul unui obiect și vom numi acțiunile *metode*, iar datele trebuie să le percepem ca valori pe care le introducem, modificăm și le transmitem unui alt obiect dacă e cazul. Metodele (adică acțiunile) sunt funcțiile în limbajul nostru de programare.

Acum că am lămurit în mare despre ce este vorba cu obiectele, avem nevoie să ne aplecăm asupra textului standardului pentru a înțelege ce se întâmplă la momentul în care începem să folosim codul JavaScript cu instrumentele care permit exploatare lui. În mare parte, în acest moment acestea sunt browserele noastre, dar ritmul de diversificare crește și apar și multe alte utilizări, în alte zone ale sferei programării JavaScript.

![Tărâm](Realm.jpg)

### Tărâmul de sub lupă

Un **tărâm** este constituit din **obiectul global** pentru tărâmul la care ne referim, un set de **obiecte interne** și cadrul lexical creat de însăși felul în care este redactat codul („lexical environment"). Toate tărâmurile care sunt create sunt evidențiate de o înregistrare specială numită de standard `Realm Record`. Din toată această mică listă reține faptul că JavaScript vine cu câteva obiecte din start, care împreună cu programul scris de tine construiesc „un tărâm” - Realm.

> Înainte să fie evaluat, tot codul ECMAScript trebuie asociat unui *tărâm*. (**8.2 Realms**)

Se înțelege clar faptul că pentru a evalua codul propriu mai întâi trebuie să fie creat un `Tărâm`, care va fi asociat codului propriu la momentul în care debutează evaluarea.

Am ilustrat **obiectul global** JavaScript ca pe o sferă dinamică, în care găsești în zona centrală codul scris de programatori reprezentat de ciorchinii de obiecte și date ce stabilesc relații strânse (valori, obiecte și funcții).

Structura este deja gata de a fi utilizată fără a interveni mai mult decât deschiderea browserului. Chiorchinii din zona centrală se constituie la momentul executării codului. După cum bine ai intuit, obiectul global formează contextul în care codul nostru JavaScript, programul nostru este evaluat. Am spus *evaluat*! Reține mereu ca o mantră internă când te apuci de scris JavaScript: tot codul pe care-l scriu va fi evaluat ca un set de expresii, care va fi redus la valorile finale.

#### Cum se formează un `Realm`, tărâmul? Geneză à la carte

Recomand maximă atenție acestei secțiuni pentru că indiferent cât de complex pare ca informație, are darul prin povestea sa să vă lămurească chiar de la bun început cum se formează întreg universul JavaScript, cum se compune și din ce este constituit `Realm`-ul ECMAScript, adică `Tărâmul`. Vei vedea cum se naște lanțul moștenirii folosind prototipurile, care sunt obiectele interne (așa-numitele `intrinsics`), cum apare *obiectul prototip* pentru toate obiectele subsecvente (chiar am putea să-l numim obiectul arhetip de la care toate moștenesc) și cum apar obiectele care sunt indispensabile pentru a avea mediul gata pregătit pentru a rula propriul nostru cod. Mai este un aspect interesant privitor la tărâmuri. Se pune întrebarea dacă avem un singur tărâm pentru codul nostru? Răspunsul este că pot exista mai multe tărâmuri care să comunice date unul cu celălalt. Cel mai rapid exemplu ar fi cel al relației rezultate dintr-o pagină web și un *iframe*. Și pagina și iframe-ul generează amândouă două tărâmuri separate cu propriul obiect global, cu seturile lor distincte de obiecte globale.

Pentru a înțelege geneza unui Tărâm în JavaScript, vom apela la textul standardului, care la punctul `8.2.1 Create Realm` spune că orice motor JavaScript, va rula o operațiune internă a cărei rezultat este apariția unui `Realm`. Pașii, adică algoritmul urmat pentru crearea unui `Realm` aduc informații foarte importante, care o dată înțelese, mai departe va fi ușor de înțeles întreg limbajul. Hai să enumerăm și noi pașii algoritmului `CreateRealm()`, pentru că este ca și cum am asista la geneza universului JavaScript, aaadică, a `Tărâmului` JavaScript.

Și acum, povestea. Cui nu-i place o poveste bună despre începuturi? Universul, Soarele, planetele și tot ce mișcă în lumea materială. Vom ambala într-o poveste părțile algoritmice, care aplicate conduc la apariția unui `Tărâm` - `Realm`. Povestea pornește pe când nimic nu exista. Familiar? :). În cazul nostru, este `momentul` când încă nu am deschis browserul sau un tab nou :)... Odată deschis, **Demiurgul** inițiază geneza unui `Tărâm` în care codul nostru sau cel accesat de la un server poate să-și înceapă evaluarea. Textul standardului folosește stilul de redactare **camelcase** - denumirea în limba engleză. Îl vom folosi și noi și pe parcursul întregului material de învățare. S-ar putea să mai vedeți și formulări cu liniuță jos (în limba engleză se numește **underscore**). Veți vedea acest mod de a scrie mai multe cuvinte care denumesc o entitate: `acestaEsteUnIdentificator`. În limba română acest stil de scriere s-ar traduce **scriere cu cocoașe** și asta se observă din compunere pentru că fiecare cuvânt din interiorul sintagmei este alipit de cuvântul anterior, dar începe cu majusculă. Privind acest mod de scriere, fiecare majusculă produce o `cocoașă` și de aici ideea de a numi astfel de scriere **camelcase** - stilulCămilă :D. Trebuie să menționez că acest mod de redactare este la mare concurență cu scrierea cu liniuță jos (un_identificator).

![](Hieronymus_Bosch_-_The_Garden_of_Earthly_Delights_-_The_exterior_(shutters).jpg "Hieronymus Bosch - The Garden of Earthly Delights - The exterior. Resursă în Public Domain de la: https://en.wikipedia.org/wiki/The_Garden_of_Earthly_Delights#/media/File:Hieronymus_Bosch_-_The_Garden_of_Earthly_Delights_-_The_exterior_(shutters).jpg")

`CreateRealm()` !!! spuse **Demiurgul** și dictă materiei (motorul JavaScript):

<aside>Prima etapă: planul</aside>

1. Din *neant* va fi constituită o nouă înregistrare prin care să identificăm noului tărâm. Numele înregistrării este `realmRec`. Tipologic vorbind, `realmRec` este un nou `Realm Record`”. Un `Realm Record` trebuie înțeles ca o fișă descriptivă în care vom avea mai multe câmpuri ce descriu noul `Realm`.
În acest moment nu avem de-a face cu însăși creația, ci mai degrabă cu eșafodajul acesteia. După cum observi, s-a creat abia o înregistrare, o descriere, un plan contructiv, nu și tot ce va popula acest tărâm.
Record, în traducere românească ar fi o „înregistrare” cu sensul de mijloc pentru ținerea unei evidențe. Standardul vine și ne lămurește la 6.2.1 că un `Record` este un tip de valoare ce „constă dintr-unul sau mai multe câmpuri care poartă o denumire”. Și încă o mențiune foarte prețioasă oferită de standard pentru a înțelege notațiile folosite mai departe: „numele câmpurilor sunt întotdeauna încadrate între paranteze pătrate duble, de exemplu [\[Value]]”.
Prima etapă se încheie aici. Ce avem până acum? Doar un plan arhitectural având o înregistrare centrală intitulală „realmRec”. Înregistrarea nu este creația, este intenția Demiurgului.

<aside>A doua etapă</aside>

Pentru că acum `Tărâmul` este gol, neîmplinindu-și menirea, **Demiurgul** spune: `CreateIntrinsics(realmRec)`!!! Porunca sa vine ca pas subsidiar al comenzii primare `CreateRealm()`. Această comandă de inițiere este întreruptă temporar pentru a obține un rezultat din invocarea `CreateIntrinsics(realmRec)`. Ține minte: `CreateRealm()` nu s-a încheiat.

Înainte de acest pas al doilea, care de fapt este o altă comandă, să lămurim nițel termenii. Standardul ne impune denumirea de `intrinsics` pentru toate entitățile care sunt create înainte de a rula propriul cod. În limba română traducerea termenului implică trei sinonime: intrinseci, interioare, proprii. Pentru că termenul de **intrinsec** este cel mai apropiat și ca fonetică, îl vom utiliza și noi în acest material. Acum îți revelez necesitatea asimilării procesului de naștere a tărâmului JavaScript. Codul propriu are nevoie de obiectele intrinseci pentru a putea fi evaluat. Cunoașterea modului în care au apărut aceste obiecte intrinseci și relațiile pe care le formează cu alte elemente din „Realm”, o consider indispensabilă pentru înțelegerea deplină a acestui limbaj de programare.„

<img src="realmRec.png">

2. Porunca Demiurgului `CreateIntrinsics` trimite planul abia creat procedurii numită «`CreateIntrinsics()`» pentru a avea baza: «`CreateIntrinsics(realmRec)`». Acest pas al genezei este cel mai important, pentru că, urmând firul algoritmului `CreateIntrinsics(realmRec)`, vom asista la maiestuoasa naștere a tuturor entităților ECMAScript relevante. Să urmărim pașii lui `CreateIntrinsics(realmRec)`:

2.1 „Fie «intrinsics» un `Record`”. În acest moment ne putem imagina `intrinsics` ca un raft gata să fie populat cu obiecte. Standardul le numește `entități`.

2.2 Câmpul `[\[Intrinsics]]` al înregistrării „realmRec” (realmRec.[\[Intrinsics]]) va fi setat cu înregistrarea identificată prin „intrinsics”. Ce s-a întâmplat este că planul nostru s-a îmbogățit cu o nouă înregistrare (Record). Sper că ai observat să am folosit un punct care indică adresa câmpului `[\[Intrinsics]]`. Poți citi „câmpul cutare a lui realmRec”. Așa se va face și adresarea proprietăților din obiecte.

2.3 Acum urmează un pas crucial. Ești pregătit? Algoritmul nostru va crea obiectului care va fi prototipul tuturor celorlalte care vor urma. Zice textul genezei: fie ca identificatorul `objProto` să aibă drept valoare un nou obiect ordinar. Pentru a construi obiectul ordinar de care avem nevoie, Demiurgul prunci: `ObjectCreate(null)`. Astfel, prin evaluarea tuturor pașilor procedurii `ObjectCreate(null)` va apărea un obiect ordinar, care va juca rolul de părinte al tuturor din perspectiva moștenirii (argumentul `null` indică acest fapt). Acest obiect va fi prototipul tuturor celorlalte, care vor fi generate prin evaluarea codului scris de tine. Concluzia simplă este că în acest moment s-a născut obiectul prototip zero, arhetipul tuturor celorlalte. Arhetipul este un obiect ordinar. Aici ar urma să inițiem o discuție care să lămurească ce-i cu moștenirea. Singurul aspect relevant pe moment este acela că atunci când lucrezi cu obiecte, inevitabil ai nevoie să „împrumuți” funcționalități ale altor obiecte evitând astfel necesitatea de a le crea de fiecare dată când ai nevoie de ele. Pe asta se și bazează modul în care funcționează întregul ecosistem JavaScript. Funcționalitățile necesare prelucrărilor de date sunt „împrumutate” de la obiectele intrinseci sau de la alte obiecte proprii. Deci, este necesar un mecanism care să permită moștenirea.

2.4 Obiectul prototip abia creat devine proprietate a obiectului `intrinsics`, fiind identificat prin `intrinsics.[[%ObjectPrototype%]]`.

2.5 Am avansat îndeajuns de mult cu geneza pentru a constitui un prim mecanism de raportare a erorilor. Zis și făcut. În acest moment, avem nevoie de o funcție care să existe deja pentru a verifica mai târziu erorile în folosirea tipurilor de date. Acest mecanism se bazează pe executarea unei funcții obiect anonime din familia entităților `intrinsics` și care este definită o singură dată pentru un `Realm`. Toate instrucțiunile care vor testa o stare de excepție poartă identificatorul %ThrowTypeError%, dar pentru acest moment al genezei, toți pașii pe care îi va face %ThrowTypeError% vor fi atribuiți identificatorul `throwerSteps`. Pe scurt, avem un identificator pe numele său `throwerSteps`, care trimite la pașii pe care-i urmează `%ThrowTypeError%` atunci când este apelată.

2.6 Demiurgul a privit și a înțeles că nu este îndeajuns să „captureze” algoritmul prin care se `aruncă` (în engleză: `throw`) erorile... de fapt în limbajul de programare se referă la excepții. De ce excepții? Pentru că semantic chiar asta înseamnă, că a apărut o excepție de la regulile limbajului. Adu-ți mereu aminte că un limbaj de programare este ca și gramatica un set de reguli prin care urmărim, în cazul nostru, o bună comunicare cu mașina. Să revenim la momentul când Demiurgul va lua pașii algoritmici capturați prin identificatorul `throwerSteps` și îi va folosi dictând o nouă poruncă: `CreateBuiltinFunction(realmRec, throwerSteps, null)`. Această poruncă, de fapt o operațiune abstractă ia trei argumente: înregistrarea de tărâm, care în cazul nostru este referențiată prin identificatorul `realmRec`, pașii algoritmici, care în cazul nostru au fost plasați sub identificatorul `throwerSteps` și obiectul prototip, care în cazul nostru nu este necesar, fiind setat la `null`. Ceea ce oferă înapoi pe baza acestor ingrediente, este un obiect-funcție intern (în engleză `built-in function object`). Încă nu ai realizat ce minune s-a întâmplat? Tocmai s-a creat o primă funcție în micul nostru univers, pardon, `Tărâm`. Această funcție când va fi apelată, va urma pașii algoritmului atribuit mai sus lui `throwerSteps`. Ceea ce mai trebuie observat este faptul că această funcție-internă spre deosebire de altele, fiind prima, nu are prototip... al treilea argument după cum bine observi este `null`. Pentru că am creat această primă funcție-internă, va trebui să o atribuim unui identificator pentru a o putea referenția. În acest sens, standardul numește identificatorul `thrower`. Funcția internă anonimă care face parte din elemetele intrinseci este o funcție-obiect care este definită o singură dată pentru câte un tărâm.

2.7 Introducem funcția de verificare identificată prin `thrower` ca valoare a slotului containerului `intrinsics` la `intrinsics.[[%ThrowTypeError%]]`.

2.8 Mai sus am pus un identificator pe un algoritm, acum vom pune un identificator pe un algoritm care nu are niciun pas, în esență care nu face nimic. Identificatorul acestuia este `noSteps`.

2.9 Este creat identificatorul `funcProto` pentru a-i atribui obiectul rezultat din evaluarea lui `CreateBuiltinFunction(realmRec, noSteps, objProto)`. Ce se întâmplă este că obiectul `realmRec` atât cât este el în acest moment, este trimis împreună cu o secvență algoritmică vidă și cu obiectul prototip zero - arhetipul pentru a se crea modelul arhetipal al obiectului care va juca rolul de prototip pentru funcții. De fapt, acest obiect este un obiect-funcție intern, dar care nu se execută pentru că nu există specificat niciun pas prin `noSteps`. Dacă am face o disecție acestui obiect-funcție care tocmai a devenit obiectul prototip al oricărei funcții, vom găsi că ține minte cărui `Tărâm` aparține, are un obiect prototip, care este obiectul ordinar creat mai sus și identificat prin `objProto` și că acest obiect-funcție cu rol de prototip este extensibil.

2.10 Ca parte o obiectului `intrinsics` intră obiectul-funcție cu rol de prototip pentru funcții identificat ca `intrinsics.[[%FunctionPrototype%]]`.

2.11 Demiurgul face o verificare pentru `objProto` folosind obiectul-funcție de verificare creat la pasul 2.5 și adaugă rezultatul evaluării ca proprietate chiar la obiectul-funcție creat la 2.5.

2.12 Acest pas este dictat de rezultatul împlinirii comenzii `AddRestrictedFunctionProperties(funcProto, realmRec)`, care are drept scop adăugarea unor proprietăți fundamentale obiectelor-funcție prin adăugarea a două proprietăți în obiectul-funcție cu rol de prototip al tuturor funcțiilor: posibilitatea de a fi invocate (`caller`) și `arguments`, care este o colecție a tuturor argumentelor pe care o funcție le poate primi. Pe scurt, proprietatea care face funcțiile apelabile și cea care le face capabile de a ține evidența argumentelor primite sunt adăugate în obiectul-funcție cu rol de prototip.

  <img src="intrinsics.png">

2.13 Obiectului `intrinsics` i se adaugă restul de proprietăți care sunt obiecte și obiecte-funcție intrinseci:

    - Obiecte fundamentale pentru rularea codului: `Object`, `Function`, `Boolean`, `Symbol` și `Error`;
    - Obiecte pentru procesarea textelor: `String`, `RegExp`;
    - Obiecte pentru reprezentarea și manipularea numerelor și datelor calendaristice: `Math`, `Number`, `Date`;
    - Obiecte pentru manipularea datelor structurate: `DataView`, `JSON`, `ArrayBuffer`;
    - Obiecte pentru manipularea colecțiilor indexate automat: `Array` și familia sa;
    - Obiecte pentru manipularea colecțiilor indexate cu ajutorul cheilor: `Map`, `Set`;
    - Obiecte pentru controlul operațiilor abstracte: `funcțiile generator` și `Promise`;
    - Obiectele cu reflexie: `Proxy` și `Reflect`.

![](ObiecteFundamentale.png)

2.14 Obiectul `intrinsics` este creat pe deplin și gata de a primi viață prin aportul adus de codul propriu.

În acest moment, obiectul `intrinsics` este întregit și pregătit pentru a prelua creația noastră - codul sursă scris de noi pe care-l vom evalua. Dar nu am terminat. Abia suntem la pasul 2 al Genezei noastre. Odată create obiectele intrinseci, vom continua cu întregirea și finalizarea obiectului `realmRec`.

3. Este setată proprietatea `realmRec.[[GlobalObject]]`, care inițial are valorea `undefined`.
4. Este setată proprietatea `realmRec.[[GlobalEnv]]`, care inițial are valoarea `undefined`.
5. Proprietatea `realmRec.[[TemplateMap]]` este setată ca o listă goală.
6. Este încheiată geneza `Tărâmului` prin returnarea obiectului `realmRec`.

Acum Geneza unui `Tărâm` s-a încheiat. Demiurgul se odihnește pentru că mai are să creeze întreaga natură a tărâmului nostru. În cazul nostru „natura” se numește `obiectul global` și este locul în care va sta codul nostru pentru a fi rulat și evaluat.
Poți să-ți imaginezi `obiectul global` în acest moment precum „Grădina deliciilor pământene” a lui Hyeronimous Bosch, dar fără bestiar și oameni.

Spre deosebire de orice alt mit al Genezei așa cum le cunoști, tot bestiarul care va popula `obiectul global` (natura) va fi creat de noi, semizeii :D.

#### Obiectul global

Acest obiect generic - obiectul global este pus la dispoziție din start fără niciun apel sau vreo declarație specifică. Doar deschizi browserul și el deja există. Ai să mă întrebi curios: când se formează obiectul global, dacă spui matale că el există deja. Aici lămurirea vine de la textul standardului, care spune cristal că obiectul global „este creat înainte de intrarea controlului în orice context de execuție”. Concluzionând, el preexistă momentului de debut al evaluării codului nostru. Știu te-am făcut foarte curioasă... hai să-ți mai zic așa o chestie să se uite mâțu'n leuștean: însuși obiectul global care oferă funcționalități codului scris de noi, are nevoie de un mâner, de o etichetă, de propriul său identificator prin care să putem face referință la el însuși și la proprietățile sale. În cazul browserelor, dacă deschizi consola (aici ai să lucrezi cel mai mult timp, iar în următorul capitol, chiar te pun să te distrezi nițel acolo), și scrii `window`, care este identificatorul obiectului global, și: BUM! Apare ca din senin o listă parcă nesfârșită de funcționalități gata să le folosești în codul tău. Curioasă rău!? Bine. Sunt peste 900 de elemente gata de a fi folosite.
Nu te speria, nu trebuie să le memorezi, să le știi pe toate... totul va veni natural pe măsură ce nevoia te împinge de la spate.

**Geneza Obiectului Global**

După ce un `Tărâm` s-a format, următorul în linia creației este obiectul global. Acesta la momentul creării unui `Realm` are asociată valoarea `undefined`, dar imediat ce sunt atașate proprietățile `[[GlobalEnv]]` și `[[TemplateMap]]` la `realmRec`, debutează în forță crearea obiectului global prin rularea unui algoritm abstract intitulat: `SetRealmGlobalObject ( realmRec, globalObj, thisValue )`.

Urmărirea pașilor de formare a **Obiectului Global** aduce multiple lămuriri asupra mecanismelor de formare a lui `this` și multe clarificări privind moștenirea. Pentru a înțelege pașii acestui algoritm, trebuie să fi trecut prin pașii de formare a unui `Tărâm`. Altfel, nu vei înțelege de unde vin anumiți identificatori și proprietăți ale obiectului `intrinsics` sau cine este `realmRec`.

**Demiurgul** tună: `SetRealmGlobalObject ( realmRec, globalObj, thisValue )` !!!.

1. Verifică dacă identificatorul `globalObj` este setat la valoarea `undefined`, iar dacă da, urmează următoarea secvență:
  a. atribuie identificatorului `intrinsics`, valoarea lui `realmRec.[[intrinsics]]`.
  b. atribuie identificatorului `globalObj` rezultatul operațiunii `ObjectCreate` căreia îi trimitem drept prim parametru `intrinsics.[[%ObjectPrototype%]]`. Acesta, dacă-ți mai aduci aminte este un obiect ordinar, care este arhetipul prototipului tuturor obiectelor (prototype este setat la null). Acesta va deveni valoarea lui `globalObj`.
2. Este verificat dacă valoarea lui `globalObj` chiar este un obiect.
3. Aceste pas este foarte important prin precizările pe care le aduce. Pur și simplu, pe scurt valoarea lui `this` va fi setată la valoarea lui `globalObj`. Dar hai să o luăm cu începutul. Mai întâi de toate este verificată valoarea identificatorului `thisValue`, iar dacă aceasta este `undefined`, se va face legătura între `thisValue` și valoarea lui `globalObj`.
4. Se va seta ca valoarea identificatorului `realmRec.[[GlobalObject]]` să fie valoarea identificată de `globalObj`.
5. Este pasul la care este creat mediul lexical propriu pentru *obiectul global*. Acesta este identificat prin `newGlobalEnv` și este rezultatul operațiunii `NewGlobalEnvironment(globalObj, thisValue)`. Reținem din pașii operațiunii `NewGlobalEnvironment` faptul că mediul lexical extern al obiectului global este setat la `null`, adică nu mai există altul mai sus. Obiectul pasat va fi considerat obiectul care va constitui registrul mediului lexical format, adică locul unde vor fi introduse legăturile dintre identificatori și valorile lor.
6. Identificatorul `realmRec.[[GlobalEnv]]` primește drept valoare obiectul lui `newGlobalEnv`. Și în acest chip, se vor fi completat și proprietățile obiectului `intrinsics` schimbându-și valoarea de la `undefined` la cele desemnate aici.
7. Obiectul `realmRec` este returnat cu aceste îmbogățiri.

Trebuie precizat un detaliu foarte important. Fiecare dezvoltator de motor  JavaScript alege care va fi obiectul prototip al obiectului global.

**Moment ZEN**: Toate obiectele și funcțiile unui program sunt membri ai obiectului global.

Pe suprafața sferei obiectului global sunt dispuse spre a rezolva diferite cerințe „obiectele interne” asociate obiectului global pe care JavaScript le pune la dispoziție din start și care sunt reprezentate ca structuri hexagonale în imaginea creată. Am spus aici că *obiectele interne* sunt asociate celui global. Acest lucru este corect pentru că *obiectele interne* nu aparțin obiectului global. Standardul spune foarte clar că „ECMAScript definește o colecție de obiecte interne care întregesc definiția de «entități ECMAScript»” (4.2 ECMAScript Overview).

### JavaScript este de un grup de obiecte care comunică între ele.

Toate eforturile acestui capitol au fost îndreptate către a susține această afirmație foarte importantă pentru înțelegerea modului de lucru în JavaScrip. Am văzut cum s-au constituit obiectele interne, am văzut chiar cum s-a constituit însuși mecanismul de moștenire și cum a apărut obiectul `this`, precum și mediul lexical inițial. În fapt este întreaga țesătură nevăzută, dar care poate fi sondată pentru ca obiectele, funcțiile și valorile codului propriu să poată fi evaluate.

Obiectele interne oferă funcționalități și date funcțiilor și obiectelor introduse de noi prin codul sursă, la momentul evaluării codului sursă. La execuția codului unele dintre datele și funcționalitățile obiectului global pot fi modificate. Asta uneori creează neplăceri pentru că în cadrul aceluiași obiect global este posibil să rulezi codurile sursă a mai multor programatori și fiecare dintre acestea să se aștepte ca proprietățile native ale obiectului global să fie nemodificate.

### În execuție (runtime), beneficiem de o buclă a evenimentelor (event loop) și o stivă pentru apeluri (callstack)

JavaScript este un limbaj de programare bazat pe evenimente (***event driven***). De aici natura dinamică și originile sale privind dinamicitatea paginilor web. De exemplu, când dai click pe un buton, acest eveniment determină un anumit comportament. Programele JavaScript care rulează pot iniția anumite acțiuni, pot aduce date externe, pot împinge date către anumite servicii web, pot prelucra streamuri de date, etc.

Pentru ca toate acestea să se poată întâmpla, trebuie să existe un mecanism de gestiune a timpilor în care se întâmplă toat acest val de acțiuni.

Acest mecanism existent la momentul execuției care se numește *bucla evenimentelor* sau *event loop* în limba engleză. Bucla evenimentelor este cu atât mai neceară cu cât ne acomodăm cu ideea că JavaScript are un singur fir de execuție. Ce înseamnă acest lucru? Dacă îți închipui toată activitatea codului ca pe un fir care leagă momentul începerii execuției, de cel al finalizării, pe acest fir se înșiră toate evaluările tuturor expresiilor, toate funcțiile executate, generarea obiectelor și și dispariția lor. Într-un cuvânt tot ce face programul se înșiră precum mărgelele într-un șirag. Nu există poasibilitatea de a rula în paralel nimic. Totul trebuie să găsească momentul oportun să se execute în limitele acestui fir. Momentul rulării întregului cod se numește runtime.

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

- **String**: `'ceva';` (cu ghilimele simple) și `"altceva";` (cu ghilimele duble),
- **Boolean**: `true;` sau `false;`,
- **Număr**: `3;`, `3.1415;`, un binar `0b1101;`, un hexazecimal `0x00F`, un octal `0o324`,
- **Array**: `[];`; iată un array care include două literale de tip număr: `[2,7];` sau care include un literal string și unul număr `['ceva', 2];`,
- **Obiect**: `{};` - obiect literal gol sau obiect literal care are un literal string și unui număr numite `primo` și `secundo`: `{primo: 'ceva', secundo: 3};`,
- **Regular Expression**: `/ceva/;`,
- **Funcție**: `function () {};`,
- **Funcție cu nume**: `function faCeva () {};`,
- **Null**: `null;`,
- **Undefined**: `undefined;`
- **template string**: <code>&#96;</code>`un text ${variabila}`<code>&#96;</code>. Observă că pentru a construi un template string am pus tot textul nostru între două <code>&#96;</code>, care este caracterul pentru reprezentarea accentului grav (grave accent, în engleză).

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
