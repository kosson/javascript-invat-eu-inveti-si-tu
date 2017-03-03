# Atribuirea de valori în funcție de anumite condiții

Uneori ai nevoie să atribui valori unei variabile, dacă anumite condiții sunt îndeplinite. În acest caz se pot foloi blocurile decizionale cu `if`, dar există formule rapide, pe care le vom inventaria. Aceste formule rapide sunt tot atâtea scurtături pentru a scrie cod mai concis, mai elegant.

## O funcție primește un obiect prin argumente sau nu.

```javascript
function faCeva(obi){
  obiect = obi === undefine ? {} : obiect;
};
```

În interiorul funcției avem nevoie de un obiect de lucru, dar nu știm sigur dacă acesta va sosi au ba. Pentru a ne asigura că avem un obiect totuși îl vom crea în funcție de primirea sau nu a celui „extern”. Pentru a evita `if`-ul, vom folosi sintaxa mai elegantă a ternarului.
