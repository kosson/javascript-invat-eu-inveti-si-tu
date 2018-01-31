# Enunțul `case..switch`

Dacă în cazul folosirii enunțului `if..else` aveai de ales între două opțiuni, în cazul lui `switch` lucrurile stau diferit, fiind permisă o ramificarea mult mai largă.

Pentru a înțelege mai bine `switch`-ul, poți să-ți imaginezi că te afli într-o mașină care rulând pe o autostradă se apropie de un nod care permite schimbarea destinației. Șoferul (expresia din switch) se uită cu atenție la toate indicațiile panourilor aflate deasupra fiecărei porți (porțile sunt case-urile). O poartă indică accesul către Pitești, o alta indică accesul către Câmpina iar alta indică accesul către Buzău și Brăila. Dacă nu se optează pentru o anume direcție, șoferul nostru poate continua drumul său tot înainte (`default`). Șoferul poate opta pentru una dintre porți (`case`-uri) sau să continue pe direcția sa (`default`). Odată ce a fost făcută o opțiune, parcursul se încheie prin ajungerea la destinație (`break`).

În cazul lui `switch` condiția este o expresie, care trebuie să fie evaluată la o valoare. De îndată ce evaluarea s-a încheiat, valoarea va avea un caz corespondent în opțiunile definite cu `case`. Mai simplu, pentru tot ce ar putea ieși ca valoare în urma evaluării, începe execuția unui set de expresii în primul `case` corespondent. Execuția expresiilor este încheiată printr-un `break`, un `return`, un `continue`, `throw` sau chiar prin încheierea lor fără să întâlnească comenzi de salt.

```javascript
var oValoare = ~~(Math.random() * 10);
switch (oValoare) {
  case 7 :
    console.log(`Am ${oValoare}`);
    break;
  case 8 :
  case 5 :
    console.log(`Am ${~~oValoare}`);
    break;
  default:
    console.log(`Alta: ${~~oValoare}`);
};
```
