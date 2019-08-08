# MVC - Module, View, Controller

Este un model de structurare a codului astfel încât cele trei paradigme să gestioneze fluxul de lucru cu datele separând cât mai bine responsabilitățile.

În cazul acestui model de lucru, *Model*-ul reprezintă structura datelor, *View*-ul oferă o reprezentare a datelor ușor de înțeles pentru un client, iar *Controller*-ul
are rolul de a face liantul algoritmic în prelucrarea datelor penru a fi afișate.

```javascript
class Model {
  constructor() {}
  // metodele aplicabile modelului de date
}

class View {
  constructor() {}
  // metodele necesare manipulării DOM-ului
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
}

const aplicatieDemo = new Controller(new Model(), new View());
```

## *Model*-ul

Este partea care are grijă de date în sensul că descrie, organizează structura și le prelucrează.

```javascript
class Model {
  constructor(){
    this.carti = [
      {id:1, nume: "De veghe în lanul de secară",    împrumutată: true},
      {id:2, nume: "Cel mai iubit dintre pământeni", împrumutată: false}
    ];
  }
  adaugăTitlu(titlul){
    let carte = {
      id: this.carti.length > 0 ? this.carti[this.carti.length - 1].id + 1 : 1,
      nume: titlul,
      împrumutată: false
    };
    this.carti.push(carte);
  }
  editeazăTitlu(id, numeNou){
    this.carti = this.carti.map(exemplar => exemplar.id === id ? {id: exemplar.id, nume: numeNou, împrumutată: titlu.împrumutată} : exemplar);
  }
  stergeTitlu(id){
    this.carti = this.carti.filter(exemplar => exemplar.id !== id);
  }
  modificaStarea(id){
    this.carti = this.carti.map(exemplar => exemplar.id === id ? {id: exemplar.id, nume: exemplar.nume, împrumutată: !exemplar.împrumutată} : exemplar);
  }
}
```

În exemplul nostru, putem opera cu datele din constructorul modelului apelând metodele create pe obiectul instanțiat în controler, când însuși controler-ul este instanțiat - `aplicatieDemo.model.modificaStarea(2)`.

## *View*-ul

Acest obiect va avea metodele necesare gestionării unui obiect DOM, fie că acesta trebuie creat, fie că va fi modificat.

```javascript
class View {
  constructor(){
    // elementul container
    this.app = this.getElement('#carti');

    // Titlul aplicației
    this.nume = this.creeazăElement('h1');
    this.nume.textContent = 'O listă demonstrativă de cărți';

    // formular de adăugat cărți în listă
    this.form = this.creeazăElement('form');
    this.input = this.creeazăElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'adaugă o carte în listă';
    this.input.name = 'carte';
    this.submitBtn = this.creeazăElement('button');
    this.submitBtn.textContent = 'Adaugă';

    // creează zona în care vor fi afișate cărțile
    this.listaCarti = this.creeazăElement('ul', 'lista');

    // construiește formularul adăugându-i componentele
    this.form.append(this.input, this.submitBtn);

    // adaugă toate elementele constitutive la app
    this.app.append(this.nume, this.form, this.lista);
  }
  // crearea unui element care are o clasă CSS opțională
  creeazăElement(tag, numeClasa){
    const element = document.createElement(tag);
    if (numeClasa) element.classList.add(numeClasa);
    return element;
  }
  getElement(selector){
    const element = document.querySelector(selector);
    return element;
  }
  get _textulIntrodus(){
    return this.input.value;
  }
  _reseteazaCampul(){
    this.input.value = '';
  }
}
```

## Referințe

- [Writing a Simple MVC App in Plain JavaScript, Tania Rascia, July 30th, 2019](https://www.taniarascia.com/javascript-mvc-todo-app/)
