# Temporizări în cod

În diferite scenarii de lucru este nevoie să temporizezi execuția codului. Acest lucru este posibil prin API-urile specializate oferite de browser.

Știm deja de la studiul funcțiilor că acestea sunt rulate o singură dată la executarea programului. Dar ceea ce mai știm este că funcțiile sunt valori, care la nevoie pot fi rulate din nou și din nou ori de câte ori. Având aceste repere reîmprospătate, ne putem gândi la cazurile în care avem nevoie să apelăm o funcție după un anumit timp sau să apelăm o funcție la un anumit interval specificat.

Motorul JavaScript pune la dispoziție două metode pentru temporizare:

-   `setTimeout(funcție, interval)` și clearTimeout(id),
-   `setInterval(funcție, interval) și clearInterval(id).`

Trebuie menționat un lucru foarte important. Aceste instrumente rulează în propriile fire de execuție, nu în cel al programului nostru. Ambele instrumente, la momentul lansării în execuție returnează un număr care este un identificator util pentru întreruperea rulării temporizatorului. Este id-ul pe care îl pasăm lui `clearTimeout(id)` și `clearInterval(id)`.

Încă un detaliu foarte important. Timpul menționat în cele două timere este un timp minim garantat, nu timpul real. Ce înseamnă minim garantat? Faptul că ți se garantează că cel puțin acel timp menționat de tine, va fi respectat. Mă vei întreba pe bună dreptate dacă este posibil ca timpii să depășească ceea ce am menționat noi.

## Resurse

-   [How JavaScript Timers Work. John Resig](https://johnresig.com/blog/how-javascript-timers-work/)
