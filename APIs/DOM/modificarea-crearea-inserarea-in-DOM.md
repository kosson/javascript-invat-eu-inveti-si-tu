# Manipularea elementelor DOM

După ce ai selectat elementele sau unul singur, vei trece la prelucrarea acestora. Ceea ce se înțelege prin aceasta este o posibilă modificare și actualizare a conținutului unui nod sau chiar introducerea unuia nou nouț. Reține faptul că fiecare element este un obiect cu proprietățile sale. Cele mai întâlnite modificări aduse unui element se referă la actualizarea conținutului său, a datelor sale care sunt text.

```javascript
let colecție = document.querySelectorAll('p');
for (let elem of colectie) {
  console.log(elem.textContent)
};
```

Exemplul oferit mizează pe faptul că toate browserele moderne atunci când deschizi un tab nou, oferă deja conținut. Fragmentul de cod rulat în consolă va aduce tot conținutul paragrafelor în prim plan. Am folosit pentru extragerea textului proprietatea `textContent`. Mai sunt câteva proprietăți care merg în vecinătatea elementului selecționat. Acestea sunt `innerHTML` și `outerHTML`.

Aceste proprietăți sunt oferite de interfața `Element`.

## Metoda innerHTML

```javascript
var identificat = document.getElementById( "identificator" );
identificat.innerHTML = "<div></div>";
```

Atenție! Provoacă reactualizarea DOM-ului dacă am modificat conținutul elementului (în limba engleză se numește *reflow*).

Când se face într-o buclă, performanța aplicației are de suferit. Tot o problemă de performanță o constituie faptul că browserul trebuie să parseze stringul. O soluție la problema performanțelor reduse de o buclă, ar fi clonarea elementului original.

## Metoda creării unui nod createElement

```javascript
var identificat = document.getElementById( "identificator" ),
    div = document.createElement( "div" ),
    identificat.appendChild( div );
```

## Metoda inserării exacte cu .insertBefore()

## Eliminarea unui anumit element removeChild

Se face cu `removeChild(el)`

## Adăugarea de proprietăți CSS unui element

Uneori este necesară adăugarea dinamică a unei propietăți CSS unui element

```javascript
var elementTintit = document.getElementById('ținta'),
    obiectPentruStilizare = elementTintit.style;

obiectPentruStilizare.color = "red";
obiectPentruStilizare.width = "2em";
```
