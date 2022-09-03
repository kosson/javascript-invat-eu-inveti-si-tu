# Intl.DisplayNames

Acest constructor creează obiecte ce permit crearea de traduceri fidele a limbilor și a graiurilor regionale.

```javascript
const dn = new Intl.DisplayNames('pt', {type: 'dateTimeField'});
console.log(dn.of('era')); // logs 'era'
console.log(dn.of('year')); // logs 'ano'
console.log(dn.of('month')); // logs 'mês'
```