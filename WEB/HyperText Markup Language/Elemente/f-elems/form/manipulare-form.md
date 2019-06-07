# Manipularea unui form și a elementelor sale

Toate formularea dintr-un document sunt într-o colecție specială `document.forms`. Această colecție este ceea ce se cheamă un *named collection*. Elementele de formular care vor fi cuprinse în această colecție sunt: `<button>`,`<fieldset>`,`<input>`, `<object>`, `<output>`, `<select>`, `<textarea>`.

```html
<form id="primo">
  <input type="text" name="nume_input01" placeholder="ceva" value="test">
  <input type="radio" name="limita" value="1">
  <input type="radio" name="limita" value="2">
</form>
<form id="secundo">
  <input type="text" name="nume_input02" placeholder="altceva" value="10">
  <fieldset name="misc">
    <legend>Informație</legend>
    <input name="miscelanee" type="text">
  </fieldset>
</form>
```

Putem face selecție de formulare folosind colecțiile constituite automat.

```javascript
document.forms.primo;
document.forms[0];
```

Pentru fiecare form în parte, se formează o altă colecție `form.elements`.

```javascript
var primoF = document.forms.primo;
var element01 = primoF.elements.nume_input01;
console.log(element01.value); // test
```

Există și o formulă de acces prescurtată către un element al unui form. De exemplu, din `primoF.elements.nume_input01`, elimini `elements` și nu vor fi probleme în țintirea elementului dorit. Singurul lucru de care trebuie ținut cont este faptul că în cazul unei redenumiri a elementului `primoF.nume_input01.name = nume_input001`, va fi păstrată și referința anterioară către elementul cu numele vechi.

Atunci când ai de-a face cu mai multe elemente de tip `radio`, toate vor avea același nume. Ceea ce se întâmplă este constituirea unei noi colecții având `name` drept identificator.

```javascript
var primoF = document.forms.primo;
var colectieRadio = primoF.elements.limita;
console.log(colectieRadio[0].value); // 1
```

## Elemente de formular

### Fieldset

În cazul fieldset-urilor, acestea pot manipulate țintit, dar elementele lor, indiferent de nivelul de imbricare, vor putea fi accesate direct din colecția elements a `form`-ului, pentru că nivelul de imbricare prin `fieldset` este ignorat.

```javascript
var secundoF = document.forms.secundo;
var element02 = secundoF.elements.misc; // s-a creat un HTMLFieldSetElement
element02.elements.miscelanee == secundoF.elements.miscelanee; // true
```

### Elementele `input` și `textarea`

Valorile elementelor `input` și `textarea` pot fi accesate prin `refElement.value` sau `refElement.checked`.

### Elementele `select` și `option`

Elementele `<select>` au trei proprietăți importante.

- `select.options`, fiind colecția de elemente `<option>`;
- `select.value`, fiind valoarea lui `select`;
- `select.selectedIndex`, fiind numărul de index din colecția de elemente.

În cazul de mai jos, opțiunile de selectare a unei obțiuni, indiferent care ar fi, conduc la obținerea valorii pentru acel `option`.

```html
<select id="oLista">
  <option value="ceva">Ceva</option>
  <option value="altceva">Altceva</option>
  <option value="cineva">Cineva</option>
</select>

<script>
  oLista.options[2].selected = true;
  oLista.selectedIndex = 2;
  oLista.value = 'banana';
</script>
```

Căutarea unei opțiuni (`<option>`) și setarea acesteia la valoarea `true`: `option.selected = true` conduce la concluzia că valoarea acelei opțiuni a fost aleasă.

În cazul unei selecții multiple `<select multiple>`, trebuie ciclate valorile din `select.options` pentru a le obține pe cele care au `selected` prezent.

```html
<select id="oLista" multiple>
  <option value="ceva" selected>Ceva</option>
  <option value="altceva" selected>Altceva</option>
  <option value="cineva">Cineva</option>
</select>

<script>
  var celeSelectate = Array.from(oLista.options)
                           .filter(option => option.selected)
                           .map(option => option.value);
  console.log(celeSelectate);
</script>
```

## Referințe

- [HTMLForm​Element​.elements, MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements),
- [Form properties and methods, javascript.info](https://javascript.info/form-elements)
- [4.10.7 The select element, HTML Living Standard](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element)
