# Object.defineProperties

Această metodă modifică direct proprietățile unui obiect și apoi îl returnează.

Primește două argumente:

- obiectul asupra căruia faci modificările
- proprietățile descrise prin intermediul unui obiect dedicat.

Particularitatea acestei metode este că poți descrie mai multe proprietăți deodată.

```javascript
var obi = {};
Object.defineProperties(obi, {
  'prima': {
    value: 1,
    writable: true
  },
  'aDoua'; {
    value: 'a doua valoare',
    witable: true
  }
});
```
