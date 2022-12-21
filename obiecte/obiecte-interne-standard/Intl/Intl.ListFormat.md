# Intl.ListFormat

Permite formatarea de liste în baza termenilor din care aceasta este alcătuită. Instanțierea unui obiect `Intl.ListFormat` oferă posibilitatea de a folosi metodele disponibile.
Un exemplu care folosește metoda `format()` pentru limba engleză așa cum este acesta prezent la pagina MDN aferentă.

```javascript
const vehicles = ['Motorcycle', 'Bus', 'Car'];

const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
console.log(formatter.format(vehicles));
// expected output: "Motorcycle, Bus, and Car"

const formatter2 = new Intl.ListFormat('de', { style: 'short', type: 'disjunction' });
console.log(formatter2.format(vehicles));
// expected output: "Motorcycle, Bus oder Car"

const formatter3 = new Intl.ListFormat('en', { style: 'narrow', type: 'unit' });
console.log(formatter3.format(vehicles));
// expected output: "Motorcycle Bus Car"
```

## Metode statice

### Intl.ListFormat.supportedLocalesOf()

Acestă metodă returnează un Array cu toate localizările posibile conform (BCP 47 - vezi RFC 4647) în afară de cea din oficiu (*default locale*).
Metoda poate avea două argumente: `locales` care este un string sau un array de string-uri. Al doilea argument, care este opțional poate fi un obiect în care sunt precizate câteva opțiuni.

Stringul sau elementele unui array care este precizat în `locales` sunt înțelese de software drept cereri specifice ale unei aplicații. Runtime-ul le va compara cu localele pe care le are la dispoziție și le alege pe cele mai bune. Pentru a face această comparație, va folosi doi algoritmi posibili: *lookup*, care respectă indicațiile BCP 47 și *best fit* care oferă un rezultat posibil mult mai bun decât cel returnat de *lookup*. Dacă runtime-ul nu găsește nimic apropriat, va fi folosită localizarea din oficiu.

Obiectul opțiunilor poate avea o proprietate `localeMatcher` a căror posibile valori sunt `lookup` ori `best fit`. Valoarea din oficiu care este setată este `best fit`.

Valoarea returnată este un array de șiruri de caractere care reprezintă un subset de taguri ce reprezintă tot atâtea posibile localizări în format *list formatting* ce sunt posibile fără a folosi valoarea din oficiu a runtime-ului.

```javascript
Intl.ListFormat.supportedLocalesOf(['ro-RO', 'es', 'mon'], {localeMatcher: 'lookup'});
// ['ro-RO', 'es']
```

În exemplul dat, vom verifica suportul pentru localizarea limbii române, spaniole și mongolă. Runtime-ul va indica faptul că are suport doar pentru română și spaniolă (`['ro-RO', 'es']`). Pentru mongolă am folosit codul ISO 639-2.

## Resurse

- [Intl | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)