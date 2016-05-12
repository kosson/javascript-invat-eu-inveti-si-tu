# Ce sunt callback-urile?

Este o funcție care este executată ca răspuns la un eveniment.

Funcțiile care acceptă alte funcții drept argumente sau care returnează funcții se numesc „funcții de ordin superior” - „higher-order function”.

În programare, un callback este o secvență de cod executabilă care este pasată ca argument unei funcții. Aceasta este „apelată” - „called back” de către funcție la un moment ulterior.

Cel mai simplu exemplu este oferit de execuția la un anumit moment în timp.

```js
function arataMesajul(mesaj){
  setTimeout(function(){
    alert(mesaj);
  }, 3000);
}

arataMesajul('funcția internă este chemată după trei secunde');
```

## Mantre
- Funcțiile sunt obiecte first-class
- Funcțiile pot fi pasate ca argumente alor funcții și pot fi returnate din funcții.
- Atunci când funcția este un callback, ține minte că tot o referință către funcție este (implicit assignment), nu este valoarea sa.

## Folosire

Sunt folosite în bibliotecile de cod pentru că oferă reutilizare. Permite ca metodele bibliotecii să fie ușor de configurat și de extins.
