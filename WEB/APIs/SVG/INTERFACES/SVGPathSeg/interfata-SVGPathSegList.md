# SVGPathSegList

Această interfață definește o listă  de obiecte `SVGPathSeg`. Această interfață va fi înlocuită de interfața `SVGPathData`.

## Atribute

### `numberOfItems`

Returnează numărul de elemente din listă.

## Operațiuni

### `clear()`

Șterge toate elementele din listă și returnează o listă goală.

### `initialize()`

Șterge toate elementele curente din listă și o reinițializează cu atâtea elemente câte sunt specificate prin parametru. Dacă elementul inserat în listă există deja într-o listă, este șters din lista în care era și apoi introdus în lista care-l specifică drept parametru. Concluzia simplă este că va fi introdus elementul, nu o copie.

Parametrul specificat la parametru este unicul element care intră în listă, acesta fiind și ceea ce returnează metoda.

### `getItem(number)`

Metoda returnează câte elemente sunt în listă. Primul număr este `0`.

### `insertItemBefore(element, număr)`

Introduce un element în listă înainte de cel specificat prin parametru. Numărătoarea începe cu `0`. Dacă elementul există în altă listă, va fi scos de acolo și va fi introdus în prezenta. Elementul este introdus la indexul de dinaintea celui specificat prin parametru. Dacă indexul menționat este mai mare decât valoarea returnată prin `numberOFItems`, atunci noul element este introdus la finalul listei. Paramentrii sunt obiectul și indexul.

Metoda returnează elementul introdus.

### `replaceItem(element, număr)`

înlocuiește un element existent cu unul nou. Dacă elementul cel nou există deja într-o altă listă, acesta este scos de acolo și introdus în prezenta. Nu este introdusă o copie, ci elementul în sine. Dacă elementul deja există în listă, atunci indexul elementului care va trebui înlocuit trebuie să fie înaintea celui cu care-l înlocuiești.

Paramentrii sunt obiectul și indexul.

Metoda returnează elementul introdus.

### `removeItem(număr)`

Șterge elementul menționat din listă. Returnează elementul șters.

### `appendItem(element)`

Inserează un nou element la capătul listei. Returnează elementul inserat.