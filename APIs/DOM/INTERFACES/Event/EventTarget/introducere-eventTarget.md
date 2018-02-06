# EventTargets

Este o interfață pe care o implementează obiectele pretabile la evenimente și care pot crea listeners („receptori”), care să execute cod la momentul în care a fost declanșat un eveniment.

Cel mai des țintite de evenimente sunt: `Element`, `document`, `window` dar și alte API-uri precum `XMLHttpRequest`.

## Spune [standardul](https://dom.spec.whatwg.org/#introduction-to-dom-events)

Evenimentele țintesc obiecte pentru a semnala că ceva s-a întâmplat, precum activitate nouă pe rețea sau o interacțiune din partea utilizatorului. Aceste obiecte implementează interfața `EventTarget`. Evenimentele la rândul lor sunt obiecte care implementează interfața `Event`.

```javascript
obiect.addEventListener("aparDate", prelucreazaDatele);
prelucreazaDatele(eveniment){
  // ceva cod
};
```

Cel mai ades vei vedea în cod evenimentele sub forma exemplul de mai jos:

```javascript
obiect.addEventListener("aparDate", function(date){ /*prelucrează date */ });
```

Pentru a crea un eveniment folosești metoda `dispatchEvent`. Pentru asta, mai întâi creezi un eveniment, care este un obiect, ține minte, și apoi îl „expediezi” (în engleză i se spune `dispatch`).

```javascript
var evenimentSpecial = new EvenimentSpecial("urlet", {"animal": "gorilă"});
obiect.dispatchEvent(evenimentSpecial);
```

Atunci când obiectelor DOM li se trimit evenimente, acel eveniment poate să ajungă și la „receptorii” (listeners) obiectelor părinte ale respectivului element pentru care este obiectul DOM țintit. Toți receptorii din părinți ai căror variabilă `capture` este setată la `true`, vor fi invocați în ordinea ierarhiei părinților. Atenție, dacă atributul `bubbles` al evenimentului rămâne la valoarea `true`, receptorii părinților vor fi invocați din nou, dar în acest caz în ordine inversă.
