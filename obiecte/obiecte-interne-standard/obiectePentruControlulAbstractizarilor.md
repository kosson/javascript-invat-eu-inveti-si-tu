# Control Abstraction Objects

Noile variante ale standardului aduc lămuriri suplimentare asupra obiectelor care se creează în cazul folosirii funcțiilor generator, a celor async și a promisiunilor.

Urmând litera standardului vom lămuri concepe de bază pentru înțelegerea în adâncime a unor mecanisme.

## Interfețe de iterare

Să ne imaginăm că avem un obiect care poate fi deschis simplu de următoarea listă de proprietăți: culoare: roșie, gust: acrișor, formă: rotundă, areCodiță: true. Dacă am avea în față coșuri cu fructe, folosind acest model mental, am putea foarte ușor sorta doar merele pentru că acestea îndeplinesc toate criteriile. Folosind analogia, o interfață pentru motorul JavaScript este un set de proprietăți a căror valori se potrivesc unei anumite specificații a limbajului nostru de programare. Toate obiectele care au proprietățile ce descriu o anumită interfață, spunem că sunt **conforme** acelei interfețe. Proprietățile unei interfețe nu constituie un obiect în sine, ci sunt o listă pe care o regăsim la obiectele **conforme**. Un obiect poate să aibă proprietăți care să-l facă *conform* cu mai multe interfețe.

### Interfața Iterable

Interfața `Iterable` are o singură proprietate: `@@iterator`. Valoarea acestei proprietăți este o funcție care returnează un obiect *Iterator* care este *conform* interfeței `Iterator`.

### Interfața Iterator

Interfața `Iterator` trebuie să aibă următoarele proprietăți:

-   `next()` - o funcție care returnează un obiect *conform* interfeței `IteratorResult`.
-   `return` - o funcție care returnează un obiect `IteratorResult`. Semnalează obiectului iterator că nu se va mai face un apel `next()`.
-   `throw` - o funcție care returnează un obiect `IteratorResult`. Semnalează obiectului iterator că a fost detectată o condiție de eroare.

### Interfața IteratorResult

Această interfață trebuie să aibă următoarele proprietăți:

-   `done`, care este, fie `true`, fie `false`. Această proprietate indică starea parcugerii cu `next()` a obiectului interator. Dacă a fost atins finalul parcurgerii obiectului iterator, această proprietate este setată la `true`.
-   `value` fiind orice valoare JavaScript acceptă. În cazul în care `done` are valoarea `false`, `value` reprezintă valoarea de etapă pentru că obiectul iterator nu a fost parcurs complet. Dacă valoarea lui `done` este `true`, atunci `value` este ceea ce returnează final iteratorul. Dacă iteratorul nu are o valoare, va fi returnat `undefined`.

## Prototipul unui obiect iterator

Prototipul unui iterator este prototipul lui `Object`, fiind un obiect ordinar. Poți extinde protitipul pentru că slotul intern `[[Extensible]]` este setat la `true`. Toate obiectele care implementează interfața `Iterator`, moștenesc automat și din obiectul prototip al obiectului iterator.

```javascript
const colectie = [1,3,5];
let prima = colectie[Symbol.iterator]();
Object.getPrototypeOf(x);
// object Array Iterator
```
