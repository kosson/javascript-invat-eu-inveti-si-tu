# Valorile primare în JavaScript

Valorile primare în JavaScript formează nucleul lucrului cu datele.
Valorile sunt expresii. De fapt, expresiile sunt o posibilă reprezentare a valorii.

Aceste valori sunt cele pe care diferitele structuri de prelucrare sau de stocare permanentă ori temporară, le vor organiza și manipula. Sunt baza structurilor de date, dacă vrei, atomii substanței cu care lucrăm în programare.

JavaScript are șase valori primare:

- `Boolean`,
- `Number`,
- `String`,
- `Null`,
- `Undefined` și
- `Symbol`

Atunci când nu ești sigur de valoarea reprezentată de un identificator, există un operator la îndemână care să te ajute să verifici ce este: `typeof`.

```javascript
typeof 10; // number
```

Atenție! `typeof null`, returnează `object`. Acest lucru se întâmplă pentru că standardul ECMAScript spune că `null` este un tip distinct în sine.

Valorile primitive și obiectele au proprietăți și metode. Primitivele beneficiază de acestea prin „împachetarea” valorii în obiectul corespondent pentru că pentru fiecare primitivă există un obiect intern. Împachetarea (wrapping-ul) se face fără știrea sau intervenția utilizatorului și astfel, pare că și primitivele au metode.

Poți verifica acest lucru prin accesarea uneia dintre cele mai utile proprietăți a unui șir de caractere: `length`.

```javascript
'ceva'.length; // 4
// sau
var x = 'ceva'; x['length']; // 4
```

Veți observa mai departe, când veți studia array-urile câteva similarități cu acestea pentru operațiunile pe care le puteți face pe șirurile de caractere.

## Mantre

- Obiectele wrapper corespondente nu au același comportament cu primara în sine atunci când se fac comparații.
- Setarea și apelarea proprietăților pentru o primară, are ca efect crearea obiectului wrapper.

## Împachetarea primarelor

Există și constructori care „împachetează” primarele în obiectul corespondent.

De exemplu:

```javascript
var sir = new String('ceva');
typeof sir;     // "object"
typeof 'ceva';  // "string"
```

Constructorii sunt utili pentru metodele tip utilitar pe care le pun la dispoziție.

```javascript
"ceva".toUpperCase(); // "CEVA"
```

Ceea ce s-a întâmplat este că `ceva` a fost „împachetat” în obiectul corespondent primarei. Acest obiect are în prototipul său metoda `toUpperCase()`.

## NaN - Not a Number

Dacă încerci o operațiune matematică cu două tipuri de date diferite dintre care una nu poate fi „convertită” la număr, va fi returnată valoarea de eroare NaN.

```javascript
3 * 'trei'; // NaN
```
