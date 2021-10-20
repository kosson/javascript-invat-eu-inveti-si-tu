# Expresii eficiente pe o singură linie pentru obiecte

## Verifică dacă mai multe obiecte au aceeași structură

```javascript
const isEqual = (...objects) => objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

isEqual({ foo: 'bar' }, { foo: 'bar' }); // true
isEqual({ foo: 'bar' }, { bar: 'foo' }); // false
```

## Extrage valorile unei proprietăți dintr-un array de obiecte

```javascript
const pluck = (objs, property) => objs.map((obj) => obj[property]);

pluck([
{ name: 'John', age: 20 },
{ name: 'Smith', age: 25 },
{ name: 'Peter', age: 30 },
],
'name');
// ['John', 'Smith', 'Peter']
```

## Inversează cheile cu valorile

```javascript
const invert = (obj) => Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {});
// Sau
const invert = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
// Exemplu
invert({ a: '1', b: '2', c: '3' }); // { 1: 'a', 2: 'b', 3: 'c' }
```

## Elimină proprietățile care sunt null sau undefined

```javascript
const removeNullUndefined = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});

// Sau
const removeNullUndefined = (obj) => Object.entries(obj)
  .filter(([_, v]) => v != null)
  .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

// Sau
const removeNullUndefined = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

// Exemplu
removeNullUndefined({
  foo: null,
  bar: undefined,
  fuzz: 42
});
// { fuzz: 42 }
```

Aceste exemple funcționează pe structuri simple de obiecte. O soluție care să funcționeze și pentru valori presetate, care se doresc a fi eleiminate, precum și pentru valori `Date`.

```javascript
const cleanEmpty = function(obj, defaults = [undefined, null, NaN, '']) {
  if (!defaults.length) return obj
  if (defaults.includes(obj)) return

  if (Array.isArray(obj))
    return obj
      .map(v => v && typeof v === 'object' ? cleanEmpty(v, defaults) : v)
      .filter(v => !defaults.includes(v))

  return Object.entries(obj).length
    ? Object.entries(obj)
        .map(([k, v]) => ([k, v && typeof v === 'object' ? cleanEmpty(v, defaults) : v]))
        .reduce((a, [k, v]) => (defaults.includes(v) ? a : { ...a, [k]: v}), {})
    : obj
}


// testing

console.log('testing: undefined \n', cleanEmpty(undefined))
console.log('testing: null \n',cleanEmpty(null))
console.log('testing: NaN \n',cleanEmpty(NaN))
console.log('testing: empty string \n',cleanEmpty(''))
console.log('testing: empty array \n',cleanEmpty([]))
console.log('testing: date object \n',cleanEmpty(new Date(1589339052 * 1000)))
console.log('testing: nested empty arr \n',cleanEmpty({ 1: { 2 :null, 3: [] }}))
console.log('testing: comprehensive obj \n', cleanEmpty({
  a: 5,
  b: 0,
  c: undefined,
  d: {
    e: null,
    f: [{
      a: undefined,
      b: new Date(),
      c: ''
    }]
  },
  g: NaN,
  h: null
}))
console.log('testing: different defaults \n', cleanEmpty({
  a: 5,
  b: 0,
  c: undefined,
  d: {
    e: null,
    f: [{
      a: undefined,
      b: '',
      c: new Date()
    }]
  },
  g: [0, 1, 2, 3, 4],
  h: '',
}, [undefined, null]))
```

Sursa este un post Stackoverflow: https://stackoverflow.com/a/61768333/1271340.

## Sortarea unui obiect după proprietățile sale

```javascript
const sort = (obj) => Object.keys(obj)
  .sort()
  .reduce((p, c) => ((p[c] = obj[c]), p), {});

// Exemplu
const colors = {
  white: '#ffffff',
  black: '#000000',
  red: '#ff0000',
  green: '#008000',
  blue: '#0000ff',
};
sort(colors);

/*
{
  black: '#000000',
  blue: '#0000ff',
  green: '#008000',
  red: '#ff0000',
  white: '#ffffff',
}
*/
```

## Verifică dacă un obiect este un Promise

```javascript
const isPromise = (obj) => !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
```

## Verifică dacă un obiect este un array

```javascript
const isArray = (obj) => Array.isArray(obj);
```
