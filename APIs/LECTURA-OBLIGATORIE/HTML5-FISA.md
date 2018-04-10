# HTML5

## HTML templates

Elementul `template` este utilizat pentru a declara fragmente de HTML care pot fi clonate și inserate în document folosindu-se JavaScript.

```html
<template id="fisa-biblio">
  <ul id="unitate">
    <li class="titlu"></li>
    <li class="autor"></li>
    <li class="editura"></li>
  </ul>
</template>

<section id="ubeuri"></section>

<script type="text/javascript">

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
</script>
```

## Resurse

-   [W3 HTML5 - A vocabulary and associated APIs for HTML and XHTML](https://www.w3.org/TR/html5/)
-   [HTML. Living Standard. 9 aprilie, 2018](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
