# XMLHttpRequest API

XMLHttpRequest este o [interfață](https://xhr.spec.whatwg.org/#interface-xmlhttprequest).

XMLHttpRequest oferă tot ce este nevoie pentru a transfera date de la un server la un client.

Cel mai important lucru este faptul că XMLHttpRequest aduce datele fără a face un refresh la pagină.

XMLHttpRequest este baza pentru [AJAX](https://developer.mozilla.org/en-US/docs/AJAX) - Asynchronous JavaScript + XML. Chiar dacă acest model a fost gândit să folosească date în XML, în acest moment se folosește pe scară largă JSON, care preferat pentru apropierea de JavaScript printre motivele principale.

XMLHttpRequest este un standard în continuă dezvoltare și poate fi consultat la pagina dedicată a Web Hypertext Application Technology Working Group ([WHATWG](https://whatwg.org/)):  [https://xhr.spec.whatwg.org/](https://xhr.spec.whatwg.org/)

## Constructorul `XMLHttpRequest()`

```javascript
var client = new XMLHttpRequest();
```

Invocarea cu `new` a constructorului XMLHttpRequest are ca efect crearea unui obiect.

Obiectul XMLHttpRequest are un obiect asociat XMLHttpRequestUpload.
Obiectul XMLHttpRequest are asociată o stare - `state`, care poate fi oricare dintre `unsent`, `opened`, `headers received`, `loading` și `done`.
Un obiect XMLHttpRequest are un jalon (flag) `sent` și un jalon `stop timeout`.

## Event handlers

Următoarele constituie gestionarii de evenimente ai obiectului XMLHttpRequest:
- onloadstart
- onprogress
- onabort
- onerror
- onload
- ontimeout
- onloadend
- onreadystatechange
