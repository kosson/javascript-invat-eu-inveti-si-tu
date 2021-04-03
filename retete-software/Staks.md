# Staks

Sunt structuri de date LIFO (*Last In, First Out*). Stivele evită accesarea directă și se bazează pe funcționalitatea oferită de `WeakMap`, care este eficientă în ceea ce privește folosirea memoriei. De îndată ce nu mai este menținută o legată la o valoare, `WeakMap` permite colectarea la gunoi.

Structura va fi creată în baza unui constructor, în baza unei clase.

```javascript
let Stack = (() => {
  const sKey = {};
  const items = new WeakMap();

  class Stack {
    constructor () {
      items.set(skey, []);
    }
    push (element) {
      let stack = items.get(sKey);
      stack.push(element);
    }
    pop () {
      let stack = items.get(sKey);
      return stack.pop();
    }
    peek () {
      let stack = items.get(sKey);
      return stack[stack.length - 1];
    }
    clear () {
      items.set(sKey, []);
    }
    size () {
      return items.get(sKey).length;
    }
  }

  return Stack;
})()
```
