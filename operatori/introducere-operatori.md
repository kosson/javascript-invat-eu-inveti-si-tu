# Evaluarea

Am introdus capitolul care prezintă valorile de lucru pentru că aceste valori sunt de fapt, operanzii care întră în combinație cu operatorii. Aceste expresii exprimă dorința de a ajunge la un rezultat în urma evaluării expresiei. Când vrem să adunăm două valori, folosim caracterul plus pentru a indica evaluatorului (computerul) că dorim să ajungem la valoarea cumulată.

Insist asupra acestor detalii care par a fi lipsite de importanță prin evidența lor pentru că la un moment dat, se va dori rezultatul unor evaluări a unor expresii de o mare complexitate și dacă acum înțelegem cât de important este să privim expresiile prin lupa evaluării, multe asperități în înțelegerea codului scris de tine sau de alții vor dispărea.

## Ce sunt operanzii?
Sunt expresii.

## Ce sunt operatorii?
Sunt semne grafice care indică ce operațiune se va efectua la momentul evaluării. Aceste semne grafice sunt semnele operațiunilor matematice, cele care adună, scad, compară valori și așa mai departe.

Să ne amintim că expresiile pot fi constituite la rândul lor din înșiruirea de operanzi și operatori. În unele lucrări dedicate în general programării veți mai întâlni opinia că pot fi văzuți precum un substantiv iar operatorii ca adevărate verbe.

**Moment ZEN**: Un program JavaScript este evaluarea unui set de expresii, care pentru a fi „rezolvate”, mai întâi trebuie să rezolvi din aproape în aproape toate celelalte expresii mai mici.

## Valorile truthy și falsy

Javascript operează cu diferite tipuri de valori, dar toate acestea sunt evaluate de către motorul JavaScript pentru a le reduce la un corespondent boolean, adică dacă pot fi reduse la `true` și sunt *truthy* (adevărate) sau la `false`, numite *falsy* (falsități).

Valorile pe care JavaScript le consideră a fi în categoria falsităților (*falsy*) sunt: `false`, `0`, `''` (un șir de caractere vid), `NaN` (Not-a-Number), `undefined` și `null`. Orice altceva este considerat a fi *truthy*.

Funcțional vorbind, operatorii se pot împărți în două categorii: operatorii unari în sensul că-și produc efectele asupra unui singur operand și cei binari care-și produc efectele la momentul evaluării asupra a doi operanzi. În afara acestei categorisiri mai sunt și alți operatori care ar putea fi grupați după sarcina pe care o au și așa mai departe.

Pentru a înțelege pe deplin operatorii, trebuie să ne întoarcem la ceea ce înseamnă expresiile și cum arată acestea. Ceea ce este util să ne aducem aminte este faptul că într-un enunț format dintr-o singură expresie sau în cazul unei expresii, care face parte dintr-un enunț format din mai multe, avem două zone importante:

- partea din stânga a operatorului (în engleză Left Hand Side - LHS) și
- partea din dreapta a operatorului (în engleză Right Hand Side - RHS).

Fixează faptul că operatorii stabilesc o relație între operandul (o expresie) din stânga sa cu operandul (o expresie) din dreapta sa. Operandul poate opera asupra valorilor pentru a le transforma în ceea ce are nevoie, dacă îi este oferită o valoare cu care nu obișnuiește să lucreze.

Această operațiune se numește în engleză „coercion”, care l-am putea traduce în contextul nostru ca și „constrângere”. În fapt, se reduce la încercarea de a transforma o valoare de un anumit tip într-un tip ce ar permite o evaluare a expresiei ce folosește un anumit operator.

## Resurse

http://www.jsfuck.com/
