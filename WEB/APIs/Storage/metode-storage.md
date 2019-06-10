# Metode storage

## Storage​.key(număr)

Invocarea cu un număr, returnează numele cheii de la indexul menționat. Dacă indexul nu există, va fi returnată valoarea `null`.

```javascript
for(var i =0; i < localStorage.length; i++){
  console.log(localStorage.getItem(localStorage.key(i)));
}
```

## `Storage​.get​Item(numeCheie)`

Va returna valoarea pentru numele cheii pasate sau `null` dacă aceasta nu există.

## `Storage​.set​Item(numeCheie, valoarea)`

Metoda acceptă doi parametri:
- numele cheii și
- valoarea.

Dacă mecanismul de stocare este încărcat la limită, metoda `setItem` va ridica o excepție. Atenție, Safari în private mode nu alocă spațiu. Asigură mereu un mecanism de prindere a erorilor.

## `Storage​.remove​Item(numeCheie)`

Dacă există cheia a cărui nume a fost pasat metodei, aceasta va fi eliminată.

## `Storage​.clear()`

Metoda șterge toate cheile din obiectul `Storage`.
