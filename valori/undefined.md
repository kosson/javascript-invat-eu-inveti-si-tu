# Valoarea undefined

Această valoare semnalează lipsa uneia. Pur și simplu este ca un steguleț pe care scrie: *aici încă nu-i nimic*. Standardul marchează `undefined` ca o valoare în sine, dar care nu este purtătoare de informație. Unul din motivele pentru care `undefined` există este acela că o mulțime de operațiuni pe care le faci, nu returnează vreo valoare computată în urma evaluării, dar trebuie să întoarcă un rezultat totuși.

De exemplu, această valoare va fi alocată imediat ce a fost declarată o variabilă, dar care nu a fost inițializată cu o valoare. De îndată ce în consolă vei da enter după declarare, va fi returnat `undefined` ca rezultat direct al acestei operațiuni.

Aceeași valoare este returnată atunci când ceri o proprietate a unui obiect, dar aceasta nu există și în general când este cerută o valoare printr-un identificator care nu există, care nu are atribuită una.

Cazurile în care este returnat `undefined`:

-   la declararea unei variabile cu sau fără atribuirea valorii. Dacă este atribuită o valoare la declarare, abia la prima utilizare a variabilei se va face conectarea valorii;
-   dacă într-o funcție ai menționat `return`, dar nicio expresie după;
-   primim `undefined` atunci când o funcție nu returnează în mod explicit ceva. Motorul JavaScript este constrâns să returneze ceva și această valoare este `undefined`;
-   când căutăm o proprietate într-un obiect, dar aceasta nu există;
-   dacă funcția așteaptă ca toți parametrii să aibă valori, dar sunt pasate mai puține argumente: `function g (a, b) { a + b }; g(2);`;
-   orice expresie cu `void` returnează `undefined`;
-   la invocarea proprietății `undefined` a obiectului global.

Când vine vorba de mecanismul de transformare (*coercion*), `undefined` va fi redus la `NaN` într-o evaluare la o adunare cu un număr, de exemplu.

```javascript
undefined + 1; // NaN
```

Undefined este un răspuns automat a motorului JavaScript. Dacă programatorul dorește folosirea înadins a unei *non-valori*, va folosi întotdeauna `null`.

În JavaScript, variabilele declarate și neinițializate cu valori sunt setate implicit la `undefined`, iar obiectele la `null`.

Evaluarea lui undefined în decizii va fi mereu o valoare `false`.

```javascript
undefined ? 1 : 0; // 0
```
