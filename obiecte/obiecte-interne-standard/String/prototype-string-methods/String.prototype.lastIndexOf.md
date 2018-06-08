# String.prototype.lastIndexOf()

Returnează indexul ultimei apariții a fragmentului pentru care se face căutarea. Dacă valoarea nu este găsită, este returnat -1.
Opțional se poate menționa de unde să se înceapă căutarea prin specificarea unui index de la care să se pornească. Valoarea din oficiu pentru parametru este `str.length - 1`.

## Mantre

-   Căutarea se face fix după caracterul sau fragmentul specificat. Atenție la caracterele mari, la spații și diacritice.
-   `lastIndexOf()` este case sensitive!
-   Căutările se fac în sens invers, de la dreapta spre stânga, având punctul de origine valoarea parametrului suplimentar iar atunci când acesta nu este specificat, cu valoarea de index a ultimului caracter din șir.
-   `'cevatext'.length` este echivalent cu `'cevatext'.lastIndexOf(''); // 8`

## Cazuistică lastIndexOf()

```javascript
// Caracterul sau fragmentul a fost identificat și se returnează valoarea de index al ultimei apariții în string
'cevatext'.lastIndexOf('e');       // 5

// Caracterul sau fragmentul nu a fost găsit
'cevatext'.lastIndexOf('x', 2);    // -1 : Căutarea s-a făcut de la caracterul v spre stânga

// Când cauți un caracter sau un fragment cu care începe șirul, dar nu este acela
'cevatext'.lastIndexOf('x', 0);    // -1 : x nu este primul caracter din string
'cevatext'.lastIndexOf('x', -1);   // -1 : x nu este primul caracter din string

// Când cauți un caracter sau un fragment cu care începe șirul și știi care este caracterul sau fragmentul
'cevatext'.lastIndexOf('cev', -1); // 0 : deci, șirul începe cu fragmentul căutat
'cevatext'.lastIndexOf('c', 0);    // 0 : deci, șirul începe cu fragmentul căutat

// Caracterul sau fragmentul nu există sau este eronat scris (conține litere mari, mai multe spații, etc).
'cevatext'.lastIndexOf('y');       // -1

// Returnarea dimensiunii șirului
'cevatext'.lastIndexOf('');        // 8 fiind echivalent cu 'cevatext'.length
```

## Combinația dintre `substr` și `lastIndexOf`.

```javascript
var fileName = window.location.href;
fileName = fileName.substr(fileName.lastIndexOf("/") + 1);
document.write("The file name of this page is " + fileName);
```
