# Instrucțiunea switch..case

Dacă în cazul folosirii instrucțiunii `if...else` ai de ales între două sau mai multe opțiuni folosind `else if`, în cazul lui `switch` lucrurile stau diferit, fiind permisă o ramificarea mult mai largă. Dar există o limitare. În cazul instrucțiunii `case`, evaluarea se va face pentru o valoare clară.

Pentru a înțelege mai bine `switch`-ul, poți să-ți imaginezi că te afli într-o mașină care rulând pe o autostradă se apropie de un nod care permite schimbarea destinației. Șoferul (expresia din switch) se uită cu atenție la toate indicațiile panourilor aflate deasupra fiecărei porți (porțile sunt case-urile). O poartă indică accesul către Pitești, o alta indică accesul către Câmpina, iar alta indică accesul către Buzău și Brăila. Dacă nu se optează pentru o anume direcție, șoferul nostru poate continua drumul său tot înainte (`default`). Șoferul poate opta pentru una dintre porți (`case`-uri) sau să continue pe direcția sa (`default`). Este cazul în care valoarea primită de `switch` nu se potrivește cu nicio variantă posibilă. Opțiunea `default` este opțională. Odată ce a fost făcută o opțiune, parcursul se încheie prin atingerea destinației (`break`).

În cazul lui `switch` condiția este o expresie, care trebuie să fie evaluată obținându-se o valoare. De îndată ce evaluarea s-a încheiat, valoarea va avea un caz corespondent în opțiunile definite prin `case`. Mai simplu, pentru tot ce ar putea ieși ca valoare în urma evaluării din `switch`, începe execuția unui set de expresii în primul `case` corespondent. Atenție, `case` nu poate evalua o expresie, ci doar o valoare. Execuția expresiilor este încheiată printr-un `break`, un `return`, un `continue`, `throw` sau chiar prin încheierea lor fără să întâlnească comenzi de salt.

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
