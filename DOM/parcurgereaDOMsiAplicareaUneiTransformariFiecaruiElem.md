# Walking the DOM - parcurgerea structurii DOM-ului

## Varianta clasică cu callback

```html
<section>
  <div id="fragment" class="speciale">
    <p>
      Acesta este un nod de text într-un paragraf
    </p>
    <a href="#">Acesta este un link</a>
    <table>
      <th>
        <tr>
          <td>ceva</td>
          <td>altceva</td>
        </tr>
      </th>
      <tbody>
        <tr>
          <td>0 <span>(zero)</span></td>
          <td>1 <span>(unu)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <script type="text/javascript">
    function parcurgDOM(element, aplic){
      aplic(element);
      element = element.firstElementChild;
      while(element){ // traversarea recursivă a nodurilor
        parcurgDOM(element, aplic);
        element = element.nextElementSibling;
      };
    };
    const elementDOM = document.getElementById("fragment");
    parcurgDOM(elementDOM, function(element){
      console.log(element);
    });
  </script>
</section>
```
TODO: Ilustrează!

## Parcurgerea DOM folosing o funcție generator.

```js
function* parcurgDOM(element){
  yield element;
  element = element.firstElementChild;
  while(element){
    yield* parcurgDOM(element);
    element = element.nextElementSibling;
  };
};
const elementDOM = document.getElementById("fragment");
for(let element of parcurgDOM(elementDOM)){
  console.log(element);
};
```
