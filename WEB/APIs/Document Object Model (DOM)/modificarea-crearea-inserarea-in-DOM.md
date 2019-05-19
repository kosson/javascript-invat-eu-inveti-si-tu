# Manipularea elementelor DOM

După ce ai selectat elementele sau unul singur, vei trece la prelucrarea acestora. Ceea ce se înțelege prin aceasta este o posibilă modificare și actualizare a conținutului unui nod sau chiar introducerea unuia nou nouț. Reține faptul că fiecare element este un obiect cu proprietățile sale. Cele mai întâlnite modificări aduse unui element se referă la actualizarea conținutului său, a datelor sale, care sunt text.

```javascript
let colecție = document.querySelectorAll('p');
for (let elem of colectie) {
  console.log(elem.textContent)
};
```

Exemplul oferit mizează pe faptul că toate browserele moderne atunci când deschizi un tab nou, oferă deja conținut. Fragmentul de cod rulat în consolă va aduce tot conținutul paragrafelor în prim plan. Am folosit pentru extragerea textului proprietatea `textContent`. Mai sunt câteva proprietăți care merg în vecinătatea elementului selecționat. Acestea sunt `innerHTML` și `outerHTML`.

Aceste proprietăți sunt oferite de interfața `Element`.

## Metoda `innerHTML`

```javascript
let identificat = document.getElementById( "identificator" );
identificat.innerHTML = "<div></div>";
```

Atenție! Provoacă reactualizarea DOM-ului dacă am modificat conținutul elementului (în limba engleză se numește *reflow*).

Când se face într-o buclă, performanța aplicației are de suferit. Tot o problemă de performanță o constituie faptul că browserul trebuie să parseze stringul. O soluție la problema performanțelor reduse de o buclă, ar fi clonarea elementului original.

## Crearea unui nod nou

Pentru a crea noi elemente în pagină, avem la dipoziție metoda `createElement()` pusă la dispoziție de interfața `Document`. Această metodă primește drept parametru numele tagului HTML pe care dorim să-l introducem. Mai înainte de a crea elementul nou, fixăm în arborele DOM locul în care facem inserția prin metodele care folosesc selectorii. Apoi introducem textul sau ceea ce considerăm a fi conținutul dorit și adăugăm elementul nou creat în arborele DOM folosind metoda `appendChild(obiectulNou)`.

```javascript
let identificat = document.getElementById( "identificator" ),
    div = document.createElement( "div" ),
    identificat.appendChild( div );
```

Vor fi multe situații când vei dori să introduci mai multe informații în pagină cum ar fi liste sau tabele. În acest sens, pentru fiecare fragment de date dintr-un obiect iterabil, va trebui să creezi câte un obiect `li` sau `tr`.

```javascript
let ancora = document.querySelector('#snippets');
let colecție = ['beletristică', 'memorialistică', 'science-fiction'];
for(let element of colecție) {
  let elemNou = document.createElement('p');
  elemNou.textContent = element;
  ancora.appendChild(elemNou);
};
```

În exemplul dat, m-am folosit de o clasă generată automat la deschiderea unui tab nou în Firefox pentru a nu pierde timpul și pentru a insera fragmentul de cod în consolă.

## Metoda inserării exacte cu `.insertBefore()`

## Eliminarea unui anumit element `removeChild`

Se face cu `removeChild(el)`. Pentru a șterge un element, mai întâi trebuie fixat părintele folosind proprietatea `parentNode`.

```javascript
let ancora = document.querySelector('#snippets');
let copii = ancora.children;
for(let element of copii) {
  element.parentNode.removeChild(element);
};
```

## Clonarea nodurilor în pagină

Pentru a face clonarea unui obiect în pagină se va apela metoda `cloneNode()` pe care interfața `Node` o pune la dispoziție. Când ne gândim la clonare trebuie analizat dacă dorim o clonare a elementului sau este nevoie de o clonare în adâncime. Dacă dorim să facem o clonare cu toată structura aferentă (copii), va trebui să trimitem ca argument `true`.

Dar mai întâi trebuie să selectăm elementul de la care pornește clonarea și elementul în care se va face inserția.

```javascript
let punctInsert = document.querySelector('.top-sites-list');
let fragment = document.querySelector('.section-body');
punctInsert.appendChild(fragment.cloneNode(true));
```

## Adăugarea de proprietăți CSS unui element

Uneori este necesară adăugarea dinamică a unei propietăți CSS unui element

```javascript
var elementTintit = document.getElementById('ținta'),
    obiectPentruStilizare = elementTintit.style;

obiectPentruStilizare.color = "red";
obiectPentruStilizare.width = "2em";
```
