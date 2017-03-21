# Operatori pe biți

Acești operatori vor fi folosiți pe valori care sunt numere întregi pe 32 de biți. De fapt la momentul când se folosesc acești operatori, se face o conversie la un număr pe 32 de biți și abia apoi se face operațiunea.

## Not `~`

Va nega toți biții care reprezintă un număr.

```javascript
~30; // -31
```

## And `&`

Operatorul va converti valorile în corespondentul binar și va returna un număr care va avea 1 la toate pozițiile corespondente la parcurgerea bit cu bit.

```javascript
10..toString(2); //  1010
parseInt('1010', 2); // 10
20..toString(2); // 10100
10 & 20; // 0
```

## Or `|`

Operatorul va converti valorile în corespondent binar și va returna un număr binar pentru care va lua pozitie cu poziție din fiecare binar al numerelor reprezentate și dacă una este 1, acesta va fi luat în considerare pentru a compune noul binar.

```javascript
10 | 20; // (11110) este returnat 30
//  1010
// 10100
```

## XOR (eXclusive OR)

Operatorul ia în calcul biții care sunt 1, dar nu și dacă există corespondent tot 1 în celălalt număr binar.

```javascript
10 ^ 15; // (0101) este returnat 5
// 1010
// 1111
1 ^ 0; // 1
true ^ true; // 0
```

## Operatori de shifting pe biți

Acești operatori vor muta spre stânga sau spre dreapta valorile biților în cuantumul unei valori specificate care va multiplica sau divide cu puteri ale lui doi.

```javascript
2 << 1; // echivalent 2 ori 2
4 >> 1; // echivalent cu 4 împărțit la 2
8 >> 4; // 0
16 >> 4; // 1
32 >> 4; // 2
```

## Egalități `==` și `===`

Uneori ai nevoie să verifici dacă valorile sunt identic la fel sau dacă verificarea este mai laxă.

O verificare ușoară poate fi făcută cu dublu egal. De exemplu:

```javscript
5 == '5'; //true
```

O verificare strictă se face cu triplu egal.

```javascript
5 === '5'; // false
```
