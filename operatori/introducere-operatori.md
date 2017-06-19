# Evaluarea

Am introdus capitolul care prezintă valorile de lucru pentru că aceste valori sunt de fapt, operanzii care întră în combinație cu operatorii. Aceste expresii exprimă dorința de a ajunge la un rezultat în urma evaluării expresiei. Când vrem să adunăm două valori, folosim caracterul plus pentru a indica evaluatorului (computerul) că dorim să ajungem la valoarea cumulată.

Insist asupra acestor detalii care par a fi lipsite de importanță prin evidența lor pentru că la un moment dat, se va dori rezultatul unor evaluări a unor expresii de o mare complexitate și dacă acum înțelegem cât de important este să privim expresiile prin lupa evaluării, multe asperități în înțelegerea codului scris de tine sau de alții vor dispărea.

## Ce sunt operanzii?
Sunt valorile care intră în evaluarea unei expresii.

## Ce sunt operatorii?
Sunt semne grafice care indică ce operațiune se va efectua la momentul evaluării. Aceste semne grafice sunt semnele operațiunilor matematice, cele care adună, scad, compară valori și așa mai departe.

Să ne amintim că expresiile sunt constituite din înșiruirea de operanzi și operatori.

**Moment ZEN**: Un program JavaScript este evaluarea unui set de expresii, care pentru a fi „rezolvate”, mai întâi trebuie să rezolvi din aproape în aproape toate celelalte expresii mai mici.

## Valorile truthy și falsy

Javascript operează cu diferite tipuri de valori, dar toate acestea sunt evaluate de către motorul JavaScript pentru a le reduce la un corespondent boolean, adică dacă pot fi reduse la `true` și sunt *truthy* (adevărate) sau la `false`, numite *falsy* (falsități).

Valorile pe care JavaScript le consideră a fi în categoria falsităților (*falsy*) sunt: `false`, `0`, `''` (un șir de caractere vid), `NaN` (Not-a-Number), `undefined` și `null`. Orice altceva este considerat a fi *truthy*.

## Resurse

http://www.jsfuck.com/
