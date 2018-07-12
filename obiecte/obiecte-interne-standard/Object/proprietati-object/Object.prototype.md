# `Object.prototype`

Pentru o analiză așa cum se cuvine a obiectelor interne, de fiecare dată vom porni prin a vedea care sunt proprietățile obiectului prototip al acestora. Obiectul prototip este cel care înzestrează toate obiectele create de noi în mod automat fără intervenție explicită cu proprietăți și metode pe care le poți folosi în mod direct fără a fi necesar să le creezi sau să le imporți dintr-o altă bibliotecă de cod. Pur și simplu sunt acolo puse la dispoziție prin stabilirea moștenirii prototipale.

Object.prototype este un obiect care joacă rolul de prototip pentru toate obiectele din JavaScript. Toate metodele existente în acest obiect, vor fi moștenite de toate celelalte obiecte în JavaScript în mod automat. Doar obiectele care sunt construite cu `Object.create(null)` nu vor putea avea acces la acestea pentru că moștenirea lor este „tăiată”. Pentru a le accesa din propriile obiecte, nu trebuie făcut vreun efort special. Pur și simplu ele există și le poți considera ale obiectului tău. Obiectul intern `Object` mai are un set de metode proprii, care nu sunt moștenite automat de obiectele tale, dar care pot fi accesate prin invocarea mijlocită de sintaxa cu punct. Poți să te gândești la aceste metode ca la niște utilitare, ca la instrumente software foarte specializate accesibile din obiectul `Object`.

Poți să-l investighezi simplu prin crearea unui obiect simplu, printr-o expresie literală:

```javascript
var object = {a: true};
object.__proto__;
```

Ceea ce se observă în consolă este faptul că pe lângă proprietatea `a`, deodată mai pot fi accesate o sumedenie de alte metode. Acestea sunt cele moștenite din obiectul prototip, care este `Object.prototype`. Pentru a accesa doar proprietățile din obiectul prototip, se va folosi `__proto__`, care este legătura la obiectul prototip.

Pentru a ajunge la obiectul prototip, poți folosi și `Object.getPrototypeOf(object);`. Poți modifica acest comportament prin anularea moștenirii sau prin redirectarea moștenirii către alt obiect pe care-l desemnezi a fi prototipul. Pasarea valorii `null` metodei `Object.create()` va întrerupe moștenirea.

```javascript
var obi = Object.create(null);
```

Astfel, vei obține un obiect care nu va face o legătură către `Object.prototype`. În practica curentă, proprietățile lui `Object.prototype` sunt apelate direct pe obiectele JavaScript fără a mai fi nevoie să menționezi rădăcina. Pur și simplu le apelezi ca și cum ar fi ale obiectului pe care l-ai creat tu. 

## `Object.prototype.constructor`

Returnează funcția care a creat obiectul. De fapt, este returnată chiar acea funcție ca valoare. Ca demonstrație, ai putea referenția funcția cu rol de constructor și apoi ai putea construi cu ea un obiect.

```javascript
var Constr = Object.prototype.constructor; // Object()
var obi = new Constr({a: 10});
console.log(obi); // { a: 10 }
```

Toate obiectele au o proprietate constructor.

## `Object.prototype.__proto__`

Dunder - dunder proto: `__proto__` este un accesor de proprietăți pe care-l găsești ca implementare în motoare, dar care nu este menționat în standard. Cu ajutorul acestuia poți obține și seta valori din obiectul `prototype` al unui obiect.