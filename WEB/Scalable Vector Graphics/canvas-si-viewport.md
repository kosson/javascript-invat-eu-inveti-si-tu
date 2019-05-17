# Canvas și viewport

## Canvas

Acesta este spațiul infinit în care un SVG poate fi desenat, dar ceea ce este vizibil este definit de `viewport`.

## Viewport

Este zona de ecran prin care poate fi privit SVG-ul. Este ca o fereastră prin care poți privi SVG-ul. Zonele care nu intră în viewport sunt tăiate, deci invizibile.
Un element SVG poate avea dimensiuni mult mai mari devcât viewport-ul, dar numai o porțiune este vizibilă la un moment dat.
Pentru a putea vedea SVG-ul, trebuie luată în considerare dimensiunea canvas-ului, precum și valoarea atributului `preserveAspectRatio`.

Viewport-ul este definit prin atributele `width` și `height` pentru elementul `<svg>`.

```svg
<svg width="600" height="600">

</svg>
```

Dacă nu este specificat tipul de unitate, se consideră că unitășile sunt în `userspace`, fiind folosite așa-zisele `user units`, de regulă pixeli.

## Sistem de coordonate

Se numește `viewport coordinate system` și pornește din colțul stânga sus, fiind punctul `0`, `0`. Acesta este sistemul de coordonate al ferestrei prin care privim svg-ul. Acesta intră într-o relație cu sistemul de coordonate al canvas-ului, care este cel al spațiului browserului. Se numește `user coordinate system`. Inițial cele două sunt identice, dar din momentul în care începe un element svg să se transforme, coordonatele viewportului se vor modifica, onorând transformările. Spațiul canvas-ului, adica **user coordinate system** poate fi definit explicit folosindu-se atributul `viewBox`. Spațiul definit prin atributul `viewBox` se numește *current coordinate system* sau *userspace in use*.

Atunci când folosești atributul `transform` pe un element container sau pe elementul grafic acționat, se va crea de fiecare dată un nou `user space in use`.

Din momentul în care atribui dimensiuni elementului `svg`, prin atributele `width` și `height`, se va crea automat și sistemul de coordonate al userului (`current coordinate system`).

Reține că aplicarea oricărei transformări asupra unui element svg, conduce la crearea unui sistem de coordonate local pentru elementul transformat.

Toate transformările aplicate unui element svg, de fapt se aplică sistemului de coordonate locale ale elementului.

## `viewBox`

Definește un sistem de coordonate necesar desenării SVG-ului în canvas. Acest sistem poate fi mai mare sau mai mic decât `viewport`-ul  și poate fi vizibil în viewport sau poți vedea doar fragmente.

Folosind atributul `viewBox`, poți specifica propriul sistem de coordonate. Dacă are aceleași dimensiuni cu cele ale viewport-ului, se va întinde pentru a acoperi aria acestuia. Dacă sistemul de coordonate nu are acelai aspect cu cel al viewport-ului, se poate folosi atributul `preserveAspectRatio` pentru a specifica dacă întregul sistem va fi vizibil în viewport sau nu. Se poate specifica și cum să fie poziționat în interiorul vewport-ului.

```svg
viewBox = min-x min-y width height
```

Min-x și min-y sunt valorile colțului stânga sus. Height și width vor specifica dimensiunea cutiei prin care se poate vedea elementul `svg`. În cazul dimensiunilor nu sunt acceptate valori negative, iar o valoare `0` se va solda cu ascunderea elementului.

Dimensiunea `width` poate fi setată folosindu-se și CSS-ul și suportă și procente. De exemplu, o setare de 100%, va face viewport-ul svg-ului fluid. Indiferent de valoarea pe care o primește un subelement svg, aceasta va fi calculată mereu în raport cu elementul svg extern dafinit prin propriul width și height.

```svg
<svg width="800" height="600" viewbox="0 0 400 300">
</svg>
```

În cazul nostru, setarea viewbox-ului, va tăia o mască de 400 / 300 din viewport prin care se poate privi desenul.

Ceea ce se petrece în spate este că svg-ul este pur și simplu tăiat la dimensiunea specificată de viewbox, dar este mărit până la umplerea viewport-ului care este 800. Este ca un efect de zoom. Cele 400 de unități intră într-un raport cu cele 800 (800/400=2). Ceea ce rezultă este că fiecare unitate din viewbox este unitate de viewport x 2.

Dacă vei specifica valori și pentru `min-x` și `min-y`, se va petrece același efect de mărire. Ceea ce se petrece, este o translare la coordonatele specificate din elementul căruia i se aplică min-x și y-ul. Deci, de la colțul stânga sus al elementului, se va căuta punctul definit de valorile specificate și acesta va deveni noul punct de origine poziționând ceea ce se vede din desen la colțul stânga sus. Viewbox-ul nu poate avea valori negative.

## `transform`

Atributul `transform` stabilește un nou sistem de coordonate pentru toate celelalte atribute și pentru tote elementele descendente.

## preserveAspectRatio

Acest atribut este folosit pentru a forța un scalling cu scopul de a menține un aspect proporțional pentru desenul svg.

În cazul în care ai defi un sistem de coordonate al user-ului, care are un aspect diferit de cel setat în viewport, browserul va *întinde* viewbox-ul pentru a cuprinde întregul desen în viewport. Acest lucru va conduce la deformarea desenului.

Opțiunea `defer` se referă la imagini. Parametrul `align` indică forțarea unei măriri uniforme, iar `meet` și `slice` sunt opționale. Din oficiu, este activată opțiunea `meet` ceea ce instruiește browserul să afișeze întregul viewbox în viewport.