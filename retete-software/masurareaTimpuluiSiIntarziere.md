# Noțiuni legate de cronometrare și întârziere

În cazul în care codul pe care îl scrii are nevoie de mecanisme pentru a realiza întârzieri programate sau intervale de repetiție a unei operațiuni, motorul de JavaScript pune la dispoziție utilitare (API-uri) pentru a le realiza.

## Dependințe cognitive

- funcții
- mediu lexical
- closure-uri
- callback-uri

Atenție! Timerele/cronometrele lucrează și ele în același fir de execuție al JavaScript-ului.

```javascript
let identificator = setTimeout(funcțieCallback, 2000);
```

Utilitarul `setTimeout` inițiază un singur cronometru, care după ce intervalul s-a scurs, va invoca funcția. Utilitarul în sine returnează un identificator. Datorită identificatorului, vom putea întrerupe ciclul de măsurare a cronometrului.
Timpul se măsoară în milisecunde, astfel că 2000 de milisecunde = 2 secunde. Pentru a opri, se folosește `clearTimeout(identificator)`.

```javascript
let identificator = setInterval(funcțieCallback, 2000);
```

Diferența dintre `setTimeout` și `setInterval` este că `setInterval` apelează funcția la nesfârșit odată la intervalul de timp specificat, dacă nu este întreruptă execuția.
Pentru a opri, se folosește `clearInterval(identificator)`.

Pentru că JavaScript are un singur fir de execuție, intervalele de execuție constituire cu `setInterval`, de exemplu, nu pot fi garantate. De ce? Pentru că în call-stack se rezolvă sarcinile în funcție de rapiditatea cu care acestea își încheie activitatea. Un exemplu foarte simplu mai jos:

```html
<p id="a"></p>
<p id="b"></p>
<p id="c"></p>

<script>
  function mesaj(id, nr){
    var elem = document.getElementById(id);
    var contor = 0;
    var cateOri = nr;
    var temporizator = setInterval(function(){
      if (contor < nr) {
        var continut = document.createTextNode("Apar și dispar, haha ");
        elem.appendChild(continut);
        contor++;
      }else{
        clearInterval(temporizator);
      }
    }, 1000);
  };
  mesaj("a", 6);
  mesaj("b", 6);
  mesaj("c", 6);
</script>
```

Chiar dacă textul din cele trei paragrafe pare să apară simultan, de fapt stiva prelucrează fiecare apel imediat ce s-a eliberat de anteriorul.
În cazul de mai sus, de fiecare dată când intervalul presetat expiră, funcția care joacă rol de callback reactivează **lexical environment** - scope-ul de la momentul creării. Closure-ul pe care-l face fiecare callback ține evidența propriului set de variabile.
