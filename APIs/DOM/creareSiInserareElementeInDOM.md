# Metoda innerHTML

```javascript
var identificat = document.getElementById( "identificator" );
identificat.innerHTML = "<div></div>";
```

Atenție! Provoacă DOM reflow!

Când se face într-o buclă, performanța aplicației are de suferit. Tot o problemă de performanță o constituie faptul că browserul trebuie să parseze stringul.

O soluție la problema performanțelor reduse de o buclă, ar fi folosirea clonării elementului creat original.

# Metoda creării unui nod

```javascript
var identificat = document.getElementById( "identificator" ),
    div = document.createElement( "div" ),
    identificat.appendChild( div );
```

## Metoda inserării exacte cu .insertBefore()

## Eliminarea unui anumit element

Se face cu `removeChild(el)`
