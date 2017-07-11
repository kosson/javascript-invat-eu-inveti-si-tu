# Metoda `Console.group()`

Se folosește atunci când dorești să grupezi mai multe mesaje într-un set de mesaje distinct.

```javascript
console.group('numeGrup');
console.log('ceva');
console.log('altceva');
console.groupEnd();
```

Metoda `group` primește un argument care poate fi un șir de caractere care să identifice unic acel grup.

Ca să colapsezi vizual setul de mesaje, trebuie să folosești metoda `console.groupCollapsed`.

```javascript
console.groupCollapsed('nouGrup');
console.log('ceva');
console.log('altceva');
console.groupEnd();
```
