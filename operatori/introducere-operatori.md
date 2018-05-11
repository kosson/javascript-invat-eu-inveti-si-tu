# Evaluarea

Am introdus capitolul care prezintă valorile de lucru pentru că aceste valori sunt de fapt, operanzii care intră în combinație cu operatorii. Aceste expresii exprimă dorința de a ajunge la un rezultat în urma evaluării expresiei. Sunt precum verbele: *cinci* **adună-l** *cu doi*. Când vrem să adunăm două valori, folosim caracterul plus pentru a indica evaluatorului (motorul limbajului), că dorim să ajungem la valoarea cumulată.

Insist asupra acestor detalii, care par a fi lipsite de importanță prin evidența lor, pentru că la un moment dat, se va dori rezultatul evaluărilor unor expresii de o mare complexitate. Dacă acum înțelegem că este crucial  să privim expresiile prin lupa evaluării, multe asperități în înțelegerea codului scris de tine sau de alții, pur și simplu vor dispărea. Ochiul antrenat, va detecta expresiile și le va parcurge mental înțelegând ce fac toți operatorii angrenați.

## Ce sunt operanzii?

Sunt expresii.

## Ce sunt operatorii?

Sunt **semne grafice** sau **cuvinte cheie** care indică ce operațiune se va efectua la momentul evaluării expresiei. Aceste semne grafice sunt semnele operațiunilor matematice, adunare, scădere, compararea valorilor și așa mai departe.

Să ne amintim că expresiile pot fi constituite pur și simplu din declararea unei valori sau a unei variabile, dar și din înșiruirea de operanzi și operatori. În unele lucrări dedicate în general programării veți mai întâlni opinia că operanzii pot fi percepuți precum substantive, iar operatorii ca adevărate verbe.

**Moment ZEN**: Un program JavaScript este evaluarea unui set de expresii, care pentru a fi „rezolvate”, mai întâi trebuie să rezolvi din aproape în aproape toate celelalte expresii mai mici.

## Valorile truthy și falsey

Javascript operează cu diferite tipuri de valori, dar toate acestea sunt evaluate de către motorul JavaScript pentru a le reduce la un corespondent boolean, adică dacă pot fi reduse la `true` și sunt *truthy* (adevărate) sau la `false`, numite *falsey* (falsități).

Valorile pe care JavaScript le consideră a fi în categoria falsităților (*falsey*) sunt: `false`, `0`, `''` (un șir de caractere vid), `NaN` (Not-a-Number), `undefined` și `null`. Orice altceva este considerat a fi *truthy*. Pe parcursul acestei lucrări vom folosi denumirile în limba engleză.

Funcțional vorbind, operatorii se pot împărți în două categorii: operatorii unari în sensul că-și produc efectele asupra unui singur operand și cei binari care-și produc efectele la momentul evaluării asupra a doi operanzi. În afara acestei categorisiri mai sunt și alți operatori care ar putea fi grupați după sarcina pe care o au și așa mai departe.

Pentru a înțelege pe deplin operatorii, trebuie să ne întoarcem la ceea ce înseamnă expresiile și cum arată acestea. Ceea ce este util să ne aducem aminte este faptul că într-un enunț format dintr-o singură expresie sau în cazul unei expresii, care face parte dintr-un enunț format din mai multe, avem două zone importante:

-   partea din stânga a operatorului (în engleză *Left Hand Side* - LHS) și
-   partea din dreapta a operatorului (în engleză *Right Hand Side* - RHS).

Adu-ți mereu aminte că operatorii stabilesc o relație între operandul (o expresie) din stânga sa cu operandul (o expresie) din dreapta sa. La momentul evaluării, operandul mai întâi încearcă să **transforme** valorile în tipul de care are nevoie, dacă în expresie sunt prezente alte valori decât cele așteptate.

Această operațiune se numește în engleză **coercion**, care l-am putea traduce în contextul nostru ca și „constrângere”. În fapt, se reduce la încercarea de a transforma o valoare de un anumit tip într-un tip ce ar permite o evaluare a expresiei în care este prezent un anumit operator.

## Resurse

[JSFuck](http://www.jsfuck.com/)
