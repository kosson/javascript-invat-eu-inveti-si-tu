# Interfața HTMLCollection

Un obiect `HTMLCollection` este o **colecție** de elemente. O colecție este un obiect care reprezintă o listă de noduri DOM. Recomandarea DOM 4 menționează faptul că mai bine se va folosi interfața `Elements`, `HTMLCollection` fiind o practică caducă.

O colecție este un obiect care reprezintă o listă de noduri DOM. O colecție este dinamică („live”) sau statică. Dacă nu este specificat, o colecție va fi întotdeauna dinamică.

La momentul creării unei colecții sunt asociate acesteia un filtru și o rădăcină. Astfel, o colecție va avea o rădăcină căreia îi este asociat un arbore care va conține doar nodurile specificate în filtru.

Colecțiile uzuale sunt `NodeList` și `HTMLCollection`.

## colecție`.length`

Returnează numărul de elemente existent în colecție.

## Accesarea elementelor individuale

Pentru a accesa un singur element poți folosi interșanjabil `element = collection.item(index)` sau `element = collection[index]`. Ce ar fi necesar de adăugat este faptul că nodurile sunt sortate după ordinea în care apar în arbore.

## Resurse

-   [W3C DOM4](https://www.w3.org/TR/domcore/#concept-collection)
-   [W3C DOM4](https://www.w3.org/TR/domcore/#interface-htmlcollection)
