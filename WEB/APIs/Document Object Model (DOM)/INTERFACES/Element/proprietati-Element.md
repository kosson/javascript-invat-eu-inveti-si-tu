# Proprietăți Element

## Element.attributes

Returnează un obiect `NamedNodemap` care conține atributele elementului HTML corespondent

## Element.classList

Returnează un `DOMTokenList` care conține o listă de atribute clasă.

## Element.className

Este un `DOMString` care reprezintă clasa elementului.

## Element.clientHeight

Returnează un `Number` care reprezintă înălțimea elementului.

## Element.clientLeft

Returnează un `Number` care reprezintă lungimea left border a elementului.

## Element.clientTop

Returnează un `Number` care reprezintă lungimea top border a elementului.

## Element.clientWidth

Returnează un `Number` care reprezintă lungimea elementului.

## Element.computedName

Returnează un `DOMString` care conține eticheta expusă accesibilității.

## Element.computedRole

Returnează `DOMString` cconținând ARIA role, ce a fost aplicată unui anume element.

## Element.id

Este un `DOMString` care reprezintă id-ul unui element.

## Element.innerHTML

Este un `DOMString` care reprezintă chiar markup-ul intern acelui element.

## Element.localName

Este un `DOMString` care reprezintă partea locală a numelui calificat care denumește elementul.

## Element.namespaceURI

Este un URI către namespace-ul elementului și are valoarea `null`, dacă nu este adresat vreunul (vezi cazul XHTML-ului).

## Element.outerHTML

Este un `DOMString` care reprezintă markup-ul elementului plus cel al elementelor pe care le conține. Atunci când este folosit drept setter, înlocuiește elementul cu noduri provenind din string-ul oferit.

## Element.prefix

Este un `DOMString` care reprezintă prefixul namespace-ului elementului, dar poate avea valoarea `null`, dacă nu este specificat niciunul.

## Element.scrollHeight

Returnează un `Number` care reprezintă înălțimea parcursă prin scrolling.

## Element.scrollLeft

Este un `Number` care reprezintă distanța pe orizontală parcursă prin scrolling.

## Element.scrollTop

Este un `Number` reprezentând un număr de pixeli parcurși în partea superioară (top) la momentul scrolării.

## Element.scrollWidth

Returnează un `Number` care reprezintă distanța în pixeli parcursă pe orizontal când se face scroll orizontal pe un element.

## Element.shadowRoot

Returnează un open shadow root care este găzduit de element sau `null` dacă nu este prezent niciun open shadow root.

## Element.tagName

Returnează un `String` care este numele tag-ului unui anumit element.

## NonDocumentTypeChildNode.nextElementSibling

Este un `Element` imediat după elementul investigat sau `null`, dacă nu există unul.

## NonDocumentTypeChildNode.previousElementSibling

Este elementul care-l precedă pe cel investigat sau `null`, dacă nu avem unul.

## Proprietăți de la `Slotable`

Interfața `Element` include următoarea proprietate definită în mixin-ul `Slotable`.

### Slotable.assignedSlot

Returnează un `HTMLSlotElement` care reprezintă slotul (`<slot>`) în care este introdus nodul.

## Event handlere

### Element.onfullscreenchange

Evenimentul `onfullscreenchange` poate apărea atunci când elementul intră sau iese din modul full screen. Poate fi folosit evenimentul pentru a ține evidența unei tranziții reușite sau pentru a sesiza când o aplicație a fost trimisă în background atunci când vorbim de o aplicație.

### Element.onfullscreenerror

Acest eveniment apare atunci când schimbarea în full screen eșuează.