# Evenimente

„Programarea dictată de evenimente se întâmplă atunci când un sistem este interesat de un set de evenimente, oferă o cale de a fi anunțat atunci când evenimentele se întâmplă și răspunde la acestea folosind callback-uri”. (*Beautiful Javascript*, Jonathan Barronville).

## Mantre

- HTML nu este DOM.
- callback-ul este un closure a cărui funcție va fi invocată atunci când un anumit eveniment se întâmplă.
- un eveniment este de fapt modificarea la un moment dat a stării unui sistem.
- Evenimentele nu pornesc de la elementul care este cauza evenimentului (apăsarea unui buton), ci de la elementul rădăcină, de la `window` în cazul browserului și va merge din ramură în ramură până la elementul căruia îi este destinat. În drumul său, fiecare element din cale va „ști” despre acest eveniment. Acestă primă fază se numește `capturing phase`.
- După ce evenimentul a ajuns la elementul țintit, acesta va porni înapoi către elementul rădăcină `window` alertând toate elementele din cale. Această fază se numește `bubbling phase` sau faza a doua.

## Anatomie

Cel mai simplu exemplu ar fi cel al unui buton.

```javascript
var butonApasat = document.querySelector("#unButon");
butonApasat.addEventListener("click", faCeva, true);
```

Cel de-al treilea argument (`true`) specifică faptul că evenimentul va fi capturat. O valoare `false` înseamnă `bubble`.

Browserul pentru a răspunde unui eveniment, mai întâi trebuie să „captureze” evenimentul iar această etapă se numește „înregistrarea evenimentului” - `event registration`. Mecanismul prin care se face acest lucru este acela al event handlers.

Cel mai simplu event handler este cel pe care-l oferă un atribut pus direct în codul HTML.

```html
<html>
  <head>
    <title>Atașare event handler</title>
  </head>
  <body>
    <div>
      <p onclick="alert('un eveniment')">Acesta este un paragraf!</p>
    </div>
  </body>
</html>
```

Această modalitate trebuie evitată în practica de zi cu zi. Ceea ce vei ajunge să faci este folosirea unei metode de selectare a unui element DOM `getElementById` sau `querySelector` și apoi vei atașa evenimentul.

```javascript
var x = document.getElementById('identificator');
x.onclick = function () {
  alert('am fost apasat');
};
```
