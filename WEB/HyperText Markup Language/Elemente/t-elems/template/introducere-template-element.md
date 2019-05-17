# Elementul template

Acest element oferă o modalitate de a include taguri html care nu vor fi afișate imediat la momentul în care pagina s-a încărcat. Aceste fragmente de html vor putea fi inserate în DOM la un moment dat ca răspuns al unui eveniment.

Conținutul elementelor `<template>` vor fi parcurse de motorul browerului, dar nu vor fi afișate.

## Părinți admiși

- `body`,
- `frameset`
- `head`
- `dl`
- `colgroup`

## DOM

Interfața DOM răspunzătoare pentru acest element este `HTMLTemplate​Element`.

Fragmentele pot fi clonate și inserate în document folosindu-se JavaScript.

```html
<template id="fisa-biblio">
  <ul id="unitate">
    <li class="titlu"></li>
    <li class="autor"></li>
    <li class="editura"></li>
  </ul>
</template>

<section id="ubeuri"></section>
```

Template-ul va fi gestionat de JavaScript.

```javascript
// datele
let date = [
  {titlu: 'Amurgul cailor', autor: 'Emil Vinicius', editura: 'Ace'},
  {titlu: 'Când pleacă vacile', autor: 'Paris Maglavit', editura: 'Saniti'},
  {titlu: 'Vin crocodili', autor: 'Magdalena Ifrim', editura: 'Panika'}
];

// selectăm template-ul
let template = document.querySelector('#fisa-biblio').content;
// selectăm inserția
let ins = document.querySelector(`#ubeuri`);

// populare template
for (let ub of date) {
  // clonezi întreaga structură
  let fișa = template.cloneNode(true);

  fișa.querySelector(`.titlu`).textContent = ub.titlu;
  fișa.querySelector(`.autor`).textContent = ub.autor;
  fișa.querySelector(`.editura`).textContent = ub.editura;

  ins.appendChild(fișa);
}
```

## Resurse

-   [W3 HTML5 - A vocabulary and associated APIs for HTML and XHTML](https://www.w3.org/TR/html5/)
-   [HTML. Living Standard. 9 aprilie, 2018](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
