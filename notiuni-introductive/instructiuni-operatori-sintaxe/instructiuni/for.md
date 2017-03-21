# Declarația `for`

Această declarație (standardul o numește `IterationStatement`), creează o buclă care produce un set de rezultate sau parcurge o structură de date existentă.

Această buclă va fi creată ținându-se cont de câteva expresii opționale care se introduc între paranteze, așa-numitul bloc de inițializare, fiind urmate de un bloc de execuție care conține codul ce va fi executat pentru fiecare pas al buclei.

Oricare dintre expresiile opționale pot fi utilizate sau nu în blocul de inițializare.

```javascript
var x = 0;

for(; x < 5; x++){
  console.log(x);
};
```

Expresiile opționale conțin:
- un contor, care este o valoare ce va porni de la o anumită valoare prestabilită (standardul spune că este un LexicalDeclaration Expression).
- un comparator, care ia valoarea din contor și o compară cu o altă valoare, de regulă dimensiunea unui array adusă prin `array.length`.
- un incrementor/decrementor

De cele mai multe ori vei întâlni în cod că numele identificatorului pentru contor este `i`. Acesta vine ca prescurtare la index și este larg utilizat. Nu este necesar să se folosească `i`. Poți numi variabila cum dorești.

În cazul în care se decide omiterea comparatorului, se va crea o buclă infinită, care poate fi întreruptă folosind comanda `break`.

```javascript
for(var x = 0; ; x++){
  console.log(x);
  if (x > 5) break;
};
```

Pot fi omise toate cele trei expresii opționale, dar vor trebui tratate în blocul de execuție. Altfel, se face o buclă infinită.

```javascript
console.time("start");
var x = 0;

for(;;){
  console.log(x);
  if(x > 5) break;
  x++;
};
console.timeEnd("final");
```

Declararea unei variabile într-un `for`, are ca efect, declararea unei variabile în funcția în care rulează bucla.

Atenție, un `for` nu creează un scope, doar funcțiile creează unul.

## Sari peste o iterație - iterare cu verificare

În cazul în care este necesar, se poate face un `salt`, evitându-se execuția la unul din pașii buclei.

```javascript
for(var x = 0; x < 10; x++){
  if(x === 5) { // daca nu verifici și tipul, intri intr-o buclă infinită
    document.writeln(`am ajuns la ${x}`);
    continue;
  };
  console.log(x);
};
// am ajuns la 5 este afișat în browser
// consola sare peste afișarea lui 5
```

## for poate fi folosit și cu șiruri de caractere

```javascript
for (var i = "a"; i !="aaaaaaaa"; i += "a") {
    document.writeln("test");
}
```

## `for` cu DOM

### Introducerea de elemente în DOM

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Introducerea de elemente cu for</title>
  </head>
  <body>
    <h1>Introducere elemente în DOM folosind iterarea</h1>
    <div class="" id="carlig"></div>
  </body>
  <script>
  var x, y;
  console.time("start");
  for(x = 0; x < 20; x++){
    y = document.createElement('p');
    y.innerText = x;
    document.body.appentChils(y);
  };
  console.timeEnd("final");
  </script>
</html>
```
