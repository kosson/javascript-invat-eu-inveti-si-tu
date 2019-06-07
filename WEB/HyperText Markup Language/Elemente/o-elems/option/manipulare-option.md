# Manipularea elementului option

Standardul HTML oferă un constructor `Option`, care permite constituirea de elemente `<option>` într-o manieră dinamică.

```javascript
option = new Option(text, value, defaultSelected, selected);
```

Parametrul `text` este ceea ce va fi afișat utilizatorului ca opțiune, parametrul `value` va fi valoarea la momentul selectării elementului, dacă `defaultSelected` va fi setat la `true`, atunci elementul constituit va fi cel afișat din oficiu, fiindu-i adăugată opțiunea `selected` și ultimul parametru, care în cazul valorii `true`, va fi selectat.

```javascript
let option = new Option("Alabastru", "Cu3(CO3)2(OH)2", true, true);
// <option value="Cu3(CO3)2(OH)2">Alabastru</option>
```
