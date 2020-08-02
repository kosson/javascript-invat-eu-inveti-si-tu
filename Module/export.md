# Expresia export

Expresia `export` permite realizarea unor legături *live* la funcții, obiecte sau la primitivele unui volum.
Obiecte, funcțiile și primitivele pentru care se face export nu mai pot fi modificate de codul care le importă. Totuși, valorile pot fi modificate în modulul exportat, ceea ce se reflectă direct în codul care importă.

Modulele care sunt exportate vor fi mereu în `strict mode` fie că scrii codul sub directivă, fie că nu.

Declarația de export nu poate fi introdusă în scripturile introduse în pagina web.

Există două tipuri de exporturi:

- cele care poartă nume (*named exports* ori simplu *named*), însemnând că vor fi zero sau mai multe exporturi per modul;
- exporturi implicite (*default exports* ori simplu *default*), însemnând că ai un singur export per modul.

## Export expresiilor și a declarațiilor la nivel individual folosind numele

În cazul în care ai un set mic de expresii și/sau declarații, poți face export individual precum în exemplul de mai jos.

```javascript
export let ceva, altceva, undeva;
//sau
export const ceva = {a: 1}, constanta = 9.8;
// declarații de funcții
export function numeFunctie () {};
// declarații de clase
export class Ceva {}
```

Poți exporta chiar liste de identificatori.

```javascript
export {ceva, altceva, undeva};
```

În cazul în care este nevoie, poți redenumi arbitrar identificatorii precum în exemplul următor.

```javascript
export {ceva as altceva, cineva as altcineva };
```

Poți exporta proprietăți ale unui obiect folosind destructurarea.

```javascript
export const {prop1, prop2: altNume} = obi;
```

Pentru că toate aceste exporturi folosesc numele identificatorilor, se numesc și *named exports* - exporturi care poartă nume.

## Exportul unei singure expresii folosind default

```javascript
export default nume_identificator_expresie;
// precum în următoarele:
export default function numeFunctie () {}; // declarație funcție cu nume
export default function* () {}; // declarație funcție
export default class Ceva {};
```
