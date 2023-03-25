# JSON.parse()

Aceasta este o metodă statică utilă în cazul parcurgerii unui șir de caractere ce reprezintă un obiect JavaScript. În cazul în care se dorește transformarea valorii obiectului rezultat, opțional, i se poate pasa un al doilea parametru care va aplica transformările dorite înainte ca obiectul să fie returnat.

## Parametrii

Primul parametru este un șir de caractere care reprezintă un obiect în format JSON.

Al doilea parametru este opțional, fiind o funcție cu ajutorul căreia poți transforma valoarea returnată de `JSON.parse`. Această funcție callback are doi parametri: `key` și `value` a căror valori este exact ce spune identificatorul.

Indiferent de adâncimea valorilor din structura JSON, toate sunt trecute prin această funcție înainte să fie returnate. Valoarea la care se realizează legătura `this` a funcției este obiectul a cărui proprietate este prelucrată. Dacă execuția funcției se soldează cu o stare de eroare, proprietatea este eliminată din structura obiectului returnat.

## Resurse

- [JSON.parse() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)