# Metode Element

`Element` moștenește metode de la părintele `Node` și implicit de la părintele acestuia `EventTarget`.
Metodele sale vor fi moștenite de `ParentNode`, `ChildNode`, `NonDocumentTypeChildNode` și `Animatable`.

## `EventTarget.addEventListener()`

Atașează o funcție de răspuns (un listener sau receptor, dacă vrei) unui eveniment specific, care apare în acționarea unui element.

## `Element.attachShadow()`

Atașează un shadow DOM tree elementului specificat și returnează o referință pentru `ShadowRoot`.

## `EventTarget.dispatchEvent()`

Metoda delegă un eveniment nodului pentru care se invocă și este returnat un `Boolean` care indică dacă cumva vreo funcție handler a anulat evenimentul.

## `Element.getAttribute()`

Aduce valoarea unui atribut specificat din nodul curent. Valoarea este adusă ca un `Object`.

## `Element.getAttributeNames()`

Returnează un array de atribute ale elementului curent.

## `Element.getAttributeNS()`

Returnează valoarea unui atribut și namespace-ul specificat din nodul curent. Valoarea este returnată ca `Object`.

## `Element.getBoundingClientRect()`

Returnează dimensiunea unui element și poziția sa relativă față de viewport.

## `Element.getClientRects()`

Returnează o colecție de dreptunghiuri care indică dreptunghiurile învecinate pentru fiecare linie de text din client.

## `Element.getElementsByClassName()`

Returnează o colecție `HTMLCollection` dinamică (live), care conține toți descendenții elementului curent care posedă lista claselor pasate drept parametru.

## `Element.getElementsByTagName()`

Returnează o colecție `HTMLCollection` dinamică (live), care conține toate elementele descendent pentru un anumit tag din elementul curent pentru care se face interogarea.

## `Element.getElementsByTagNameNS()`

Returnează o colecție `HTMLCollection` dinamică (live), care conține toate elementele descendent pentru un anumit tag și namespace din elementul curent pentru care se face interogarea.

## `Element.hasAttribute()`

Returnează un `Boolean` care indică dacă elementul are atributul specificat sau nu.

## `Element.hasAttributeNS()`

Returnează un `Boolean` care indică dacă elementul are atributul specificat în namespace-ul specificat.

## `Element.hasAttributes()`

Returnează un `Boolean` care indică dacă elementul are unul sau mai multe atribute.

## `Element.setPointerCapture()`

Desemnează un anumit element ca fiind ținta de captură pentru viitoarele evenimente pointer.

## `Element.hasPointerCapture()`

Indică dacă elementul pe care este invocat are un pointer capture pentru pointerul identificat printr-un pointer ID dat.

## `Element.insertAdjacentElement()`

Metoda inserează un anumit nod al unui element la poziția relativă specificată în funcție de elementul pentru care a fost invocată.

## `Element.insertAdjacentHTML()`

Parsează textul ca HTML sau XML și inserează nodurile rezultate în arbore la poziția specificată.

## `Element.insertAdjacentText()`

Inserează un nod text într-o poziție relativă față de elementul pentru care a fost invocată.

## `Element.querySelector()`

Returnează primul `Node` care se potrivește cu selectorul specificat ca string în parametru.

## `Element.querySelectorAll()`

Returnează un `NodeList` de noduri care se potrivește cu selectorul specificat ca string în parametru.

## `Element.releasePointerCapture()`

Eliberează pointerul (îl oprește) care a fost setat anterior pentru un anumit eveniment de pointer.

## `Element.setAttribute()`

Setează un atribut unui element pentru care se face apelul metodei.

## `Element.setAttributeNS()`

Setează un atribut unui element și pentru un anumit namespace pentru care se face apelul metodei.

## `Element.removeAttribute()`

Elimină atributul menționat de pe elementul curent.

## `Element.removeAttributeNS()`

Elimină atributul menționat de pe elementul și namespace-ul curent.

## `Element.toggleAttribute()`

Modifică un atribut eliminând-ul, dacă există și adăugându-l dacă nu există pentru elementul specificat.

## `EventTarget.removeEventListener()`

Șterge referința către o funcție receptor atașată elementului pe care se aplică metoda.

## `Element.scroll()`

Face scroll către un anumit set de coordonate în interiorul unui element.

## `Element.scrollBy()`

Face scroll pe un element pentru o anumită valoare menționată.

## `Element.scrollTo()`

Face **scroll** către un anumit set de coordonate în interiorul unui element.
