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

Un exemplu de utilizare este cel al aducerii unor date dintr-un API la distanță. Pentru acest exemplu vom folosi API-ul pus la dispoziție de Europeana.

```javascript
var adresa = "https://www.europeana.eu/api/v2/search.json?wskey=XXXXXXXXX&query=The%20Fraternity%20between%20Romanian%20and%20French%20Army";

// înlocuiește cheia API din link, cu una personală
// wskey=XXXXXXXXX
// dacă nu introduci cheia personală vei avea o eroare
// Cross-Origin Request Blocked

var xhr = new XMLHttpRequest();
xhr.open('GET', adresa);
xhr.responseType = 'json';

xhr.onload = function () {
  console.log(xhr.response);
};

xhr.onerror = function () {
  console.log("A apărut o eroare");
};

xhr.send();
```

## Mantre

- Obiectul XMLHttpRequest are un obiect asociat XMLHttpRequestUpload.
- Obiectul XMLHttpRequest are asociată o stare - `state`, care poate fi oricare dintre `unsent`, `opened`, `headers received`, `loading` și `done`.
- Un obiect XMLHttpRequest are un jalon (flag) `sent()` și un jalon `stop timeout`.
- Invocarea constructorului XMLHttpRequest trebuie să returneze un obiect `XMLHttpRequest`.
- Headerul autorului este o listă care inițial este goală.
- Valoarea lui `body` este `null` la început.
- Din start următoarele fanioane nu sunt setate: `synchronous`, `upload complete` și `upload listener`.

## Event handlers - manageri de evenimente

Următoarele constituie gestionarii de evenimente ai obiectului XMLHttpRequest:
- onloadstart
- onprogress
- onabort
- onerror
- onload
- ontimeout
- onloadend
- onreadystatechange

## Stările indicate de atributul `readyState`

Obiectul XMLHttpRequest returnat de invocarea constructorului XMLHttpRequest cu `new` are un atribut `readyState` (un getter), care returnează valori în funcție de starea în care se află tranzacția.

```javascript
var client = new XMLHttpRequest();
client.readyState;
```

|valoarea lui `readyState`|explicație|
|:-|:-|
|**unsent**|returnarea acestei valori indică faptul că obiectul a fost contruit|
|**opened**|Metoda `open()` a fost invocată cu succes. În acest moment po fi setate headerele cererii (`request headers`), folosindu-se `setRequestHeader()` și se poate iniția aducerea datelor invocând metoda `send()`|
|**headers received**|Dacă există redirectări, s-au urmat căile acestora și toate headerele HTTP ale răspunsului au fost primite.|
|**loading**|Corpul răspunsului tocmai este primit|
|**done**|Transferul datelor s-a încheiat sau ceva rău s-a întâmplat în timpul transferului|

## Metoda `open()`

Această metodă setează metoda prin care se face cererea, url-ul de la care se aduc datele, și fanionul `synchronous`.

```javascript
open(method, url, async, username, password);
```

## Metoda `setRequestHeader()`

Este modul de a introduce date în headerul trimis către server.

```javascript
var client = new XMLHttpRequest();
client.open('GET', 'http://localhost:3000/test.json');
client.setRequestHeader('X-Content', 'html');
client.setRequestHeader('X-Ceva', 'ceva');
client.send();
```

## Atributul `timeout`

Este un atribut al clientului și se calculează în milisecunde.
Dacă cererea nu a fost rezolvată în timpul specificat, iar fanionul care indică `synchronous` nu este setat, va fi emis un eveniment de tip timeout sau o excepție TimeoutError va fi trimisă metodei `send()`.

Valoarea inițială este `0`.

Valoarea se poate seta chiar în timp ce se face cererea.

## Atributul `withCredentials`

Valoarea sa inițială este `false`.

Valoarea devine `true` atunci când sunt incluse credențiale într-o cerere cross-origin. Valoarea `false` spune că nu sunt incluse credențiale într-o cerere cross-origin și când cookie-urile vor fi ignorate în răspuns.

## Atributul `upload`

Acest atribut returnează obiectul asociat XMLHttpRequestUpload. Acesta poate fi folosit pentru a strânge informații care se trimit serverului.

## Metoda `send()`

Acestă metodă inițiază cererea. Argumentul opțional oferă „corpul cererii”. Argumentul este ignorat dacă metodele sunt `GET` sau `HEAD`.

Metoda trebuie să treacă prin următorii pași:

Dacă `state` nu are valoarea `opened` emite o eroare InvalidStateError.
Dacă deja este setat fanionul `send()`, emite o eroare InvalidStateError.
Dacă metoda aleasă este fie `GET`, fie `HEAD`, setează body la `null`.
Dacă body este `null` sari la următorul pas în cod.
Dacă există body, afunci vom avea inițial valori nule pentru `encoding` și pentru `Content-Type`. Acestea se vor modifica astfel: `encoding` va fi setat automat cu valoarea `UTF-8` iar dacă body este un document HTML, `Content-Type` va fi setat la `text/html`. Dacă `body` nu este html, se va seta automat `Content-Type` la `application/xml` și se va adăuga și `;charset=UTF-8` la `Content-Type`. În acest moment `request body` a fi setat la body care va fi serializat și dacă totul merge bine, se va ridica fanionul `well-formed`, se va converti totul la Unicode după o schemă de codare utf8. Dacă body nu poate fi serializat, se va emite o eroare `InvalidStateError`.
Dacă body este un string, setează codarea la `UTF-8`.
Dacă obiectul XMLHttpRequestUpload are atașate mai multe receptoare de evenimente (event listeners), este setat un fanion `upload listener`.
În acest moment `req` devine o nouă cerere


```javascript

```


## Resurse

-   [XMLHttpRequest. Living Standard](https://xhr.spec.whatwg.org/),
-   [Gestionarea răspunsurilor XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Handling_responses)
-   [Standardul fetch](https://fetch.spec.whatwg.org/)
-   [Cross-Origin Resource Sharing](https://www.w3.org/TR/cors/)
-   [W3 XMLHttpRequest](https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html)
