# HTMLElement

Această interfață este oferită spre exploatare de fiecare element HTML. Unele elemente implementează direct această interfață, iar altele o implementează prin intermediul unei interfețe care moștenește de la aceasta.

Interfața `HTMLElement` moștenește de la părintele său care este `Element`, care moștenește din `Node`, care moștenește din `EventTarget`.
Interfața `HTMLElement` mai implementează și proprietățile de la `GlobalEventHandlers` și `TouchEventHandlers`.

## Proprietăți

### HTMLElement.accessKey

### HTMLElement.accessKeyLabel

### HTMLElement.contentEditable

### HTMLElement.isContentEditable

### HTMLElement.contextMenu

### HTMLElement.dataset

Returnează un `DOMStringMap` cu ajutorul căruia un script poate citi sau poate scrie atribute proprii introduse de programator (`data-*`).

### HTMLElement.dir

### HTMLElement.draggable

### HTMLElement.dropzone

### HTMLElement.hidden

### HTMLElement.inert

### HTMLElement.innerText

### HTMLElement.lang

### HTMLElement.noModule

### HTMLElement.nonce

### HTMLElement.spellcheck

### HTMLElement.style

### HTMLElement.tabIndex

### HTMLElement.title

## Metode

Moștenește și metodele de la părintele `Element`.

### HTMLElement.blur()

Elimină focus-ul de pe elementul curent.

### HTMLElement.click()

Trimite un eveniment corespondent unui click de mouse.

### HTMLElement.focus()

Pune focus-ul pe elementul curent acționat cu tastatura.

## Evenimente

### Evenimente de animație

#### animationcancel

#### animationend

#### animationiteration

#### animationstart

### Evenimente pointer

#### gotpointercapture

#### lostpointercapture

#### pointercancel

#### pointerdown

#### pointerenter

#### pointerleave

#### pointermove

#### pointerout

#### pointerover

#### pointerup

### Evenimente transition

#### transitioncancel

#### transitionend

#### transitionrun

#### transitionstart

## Resurse

- [HTMLElement | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
- [7. Extensions to the HTMLElement Interface | CSSOM View Module](https://drafts.csswg.org/cssom-view/#extensions-to-the-htmlelement-interface)
- [interface HTMLElement | HTML Living Standard](https://html.spec.whatwg.org/multipage/dom.html#htmlelement)
- [interface HTMLElement | HTML5 A vocabulary and associated APIs for HTML and XHTML](https://www.w3.org/TR/html50/dom.html#htmlelement)
