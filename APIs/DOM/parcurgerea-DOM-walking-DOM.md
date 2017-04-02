# Walking the DOM - parcurgerea structurii DOM-ului

## Traversarea recursivă

```javascript
/* VARIANTA CU RECURSIVITATE - while*/
// funcția aplicată recursiv
function parcurgDOM(element, aplic){
  aplic(element); // aplică callback-ul pe element
  element = element.firstElementChild;
  while(element){ // traversarea recursivă a nodurilor
    parcurgDOM(element, aplic);
    element = element.nextElementSibling;
  };
};

// cârlig în DOM
const elementDOM = document.getElementById("fragment");

// traversarea DOM-ului
parcurgDOM(elementDOM, function(element){
  console.log(element);
});
```

### Exemplificare

```html
<section>
  <div id="fragment" class="speciale">
    <h1>Hei, cineva lucrează aici!</h1>
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
    /* VARIANTA CU RECURSIVITATE - while*/
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

## Traversare recursivă - model alternativ

```javascript
/* VARIANTĂ CU RECURSIVITATE - for*/
const elementDOM = document.getElementById("textPara");

function parcurgeDOM(nodParinte, callback){
  // setează contextul corect
  callback.call(nodParinte);
  // testează dacă „cârligul” are noduri copii
  if(nodParinte.hasChildNodes()){
    for(var nodIntern = nodParinte.firstChild; nodParinte; nodParinte = nodParinte.nextSibling){
      parcurgeDOM(nodIntern, callback);
    };
  };
};

// operaționalizarea utilitarului parcurgeDOM
function afiseazaContinut () {
  if (this.textContent) {
    console.log(this.textContent);
  };
}

onload = function () {
  parcurgeDOM(elementDOM, afiseazaContinut);
};
```

## Parcurgerea DOM folosing o funcție generator.

```javascript
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
