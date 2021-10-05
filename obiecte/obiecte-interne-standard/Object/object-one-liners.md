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
