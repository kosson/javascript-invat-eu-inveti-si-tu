# Interfețe

Interfețele sunt niște colecții de metode necesare gestionării documentelor XML și HTML. Mai exact, aceste seturi de metode sunt utilizate pentru a accesa și manipula o reprezentare internă a unui document.

Manipularea unui arbore Document Object Model se bazează pe evenimente care apar în noduri. Pentru a gestiona evenimentele, producătorii de browsere trebuie să implementeze interfața `EventTarget`. Acestă interfață este părintele altor interfețe care moștenesc metodele sale. Ca importanță, urmează interfața `Node`, care oferă metodele de manipulare a componentelor DOM-ului numite noduri, urmează interfațele `Element`, `Document` și `Attr`.

## Resurse

-   [DOM Living Standard, 9 aprilie, 2018](https://dom.spec.whatwg.org/)
-   [What is the Document Object Model?](https://www.w3.org/TR/REC-DOM-Level-1/introduction.html)
-   [Document Object Model (Core) Level 1. Fundamental Interfaces](https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html)
