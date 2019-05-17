# Event listeners - receptorii

`EventListener` este o interfață care oferă un obiect capabil să gestioneze un eveniment emis de un obiect `EventTarget`. În acest moment, obiectul acceptă pentru a prelucra un callback din motive de compatibilitate, dar și obiecte destinate prelucrării.

```javascript
const buttonElement = document.getElementById('btn');
// versiunea folosind callback
buttonElement.addEventListener('click', function (event) {
  alert('Am fost declanșat de un callback');
});
// versiunea folosind obiect
buttonElement.addEventListener('click', {
  handleEvent: function (event) {
    alert('am fost declanșat de metoda handleEvent a obiectului!');
  }
});
```

## Spune standardul

> Un event listener poate fi utilizat pentru a observa un anumit eveniment (DOM living standard).

## Din ce-i constituit un event listener - un receptor

Un receptor are câteva câmpuri.

-   `type`, care este un string.
-   `callback`, care este elementul activ al receptorului; funcția apelată când apare evenimentul.
-   `capture`, un boolean care este inițial setat la `false`.
-   `passive`, un boolean care este inițial setat la `false`.
-   `once`, un boolean care este inițial setat la `false`.
-   `removed`, un boolean care este inițial setat la `false`.

Standardul aduce o notă importantă la care trebuie reflectat. Spune că deși, un receptor este o funcție callback, conceptual, acesta este ceva mult mai mult. Fiecare obiect țintă (element din HTML-ul paginii noastre) al unui eveniment, are asociat un algoritm care îl va expune pentru obiectul eveniment, care-l țintește.

## Adăugarea unui eveniment

Un receptor de evenimente (event listener) poate fi adăugat unei ținte (un obiect DOM).

Pentru a adăuga un receptor unei ținte, se va folosi metoda `ținta.addEventListener(type, callback[, opțiuni])`, care este disponibilă tuturor nodurilor DOM.

Ceea ce face această metodă este că atașează un receptor pentru un anumit tip de eveniment specificat cu un șir de caractere ca prim argument. Cel de-al doilea argument primit este callback-ul, o funcție ce va fi apelată atunci când evenimentul este receptat de țintă. Opțiunile introduse opțional după cel de-al doilea argument sunt specifice pentru tipul respectiv de eveniment.

Opusă setării de receptori, există și metoda prin care sunt eliminați: `ținta.removeEventListener(type, callback [, opțiuni])`.

Mai există o metodă prin care poate fi `emis` (dispatch) în mod artificial un eveniment: `ținta.dispatchEvent(event)`. Emiterea evenimentului către țintă returnează un boolean care este `true`, dacă atributul `cancelable` al evenimentului este `false` sau dacă metoda `preventDefault()` nu a fost invocată. False vice-versa.

## Mecanismul de trimitere (dispatch) al evenimentelor

Acest mecanism se referă la modul în care evenimentele se propagă prin arborele DOM. Aplicațiile pot emite evenimente folosind metoda `dispatchEvent()`.

Evenimentul se va propaga prin arborele DOM respectând modul în care se face propagarea. Înainte ca evenimentul să se propage, este construită o cale către elementul țintă: `propagation path`. **Calea de propagare** care în engleză este numită *event target chain* este setul ordonat de ținte pentru care este emis un eveniment și prin care acesta va trece în ordinea celor trei faze:

-   **captură** (*capture phase*),
-   **localizarea pe țintă** (*target phase*) și cea de
-   **bubbling** (*bubble phase*).

Pe măsură ce fiecare element, care are receptori pentru eveniment, este „atins” de acesta, rând pe rând devine `currentTarget` (ținta curentă). Ultimul atins din această cale este chiar ținta evenimentului (*event target*).

## Oprirea propagării unui eveniment.

După cum știm, un eveniment se propagă de la elementul rădăcină spre elementul căruia îi este adresat. Dacă pe drum există un *receptor* (event listener) și acest element, are un receptor potrivit, va reacționa și acesta.

Dacă putem ori comportamentul implicit al unui element, am putea foarte bine să oprim și modelul propagării. În acest sens, obiectul `Event` pune la dispoziție metoda `stopPropagation()`.

```javascript
function faCevaCuAcestClick (e) {
  e.stopPropagation();
  // prelucrează date
};
```

Ceea ce se întâmplă este că evenimentul se propagă până la elementul țintit, iar dacă acesta apelează metoda, nu se mai face și faza de bubbling.

Un exemplu mai apropiat:

```javascript
var element = document.querySelector("#unElemIntermediar");
element.addEventListener('click', opresteEvenimentul, true); // true înseamnă să capturezi evenimentul
function captureazaSiOpreste(e){
  e.stopPropagation();
};
```

## Sincronicitatea și asincronicitatea evenimentelor

Evenimentele sincrone sunt tratate ca și cum ar fi într-un șir organizat după modelul primul intrat, primul ieșit, care se construiește pe criteriul temporal. Fiecare eveniment din această listă este întârziat pănă când anteriorul își termină propagarea sau este anulat.

Evenimentele asincrone sunt emise ca rezultat al acțiunilor încheiate fără a stabili o legătură la alte evenimente, alte modificări ale DOM-ului sau ca urmare a interacțiunii utilizatorului.

## Evenimente de încredere și evenimente care nu sunt

Evenimentele care sunt generate de browser (user agent) sau ca rezultat al interacțiunii utilizatorului sau ca urmare a modificărilor suferite de DOM, sunt investite cu un nivel de încredere de către browser. Cele care nu sunt de încredere, de regulă provin din folosirea metodelor `createEvent()`, modificarea evenimentelor folosind `initEvent()` sau cele care au fost emise folosind metoda `dispatchEvent`. Pentru a marca încrederea, browserul setează proprietatea `isTrusted` cu valoarea `true`, celelalte având valoarea opusă. Evenimentele care nu sunt de încredere nu li se vor permite să-și facă *efectul implicit*, cu excepția evenimentului `click` (permis din motiv de compatibilitate istorică). Toate celelalte evenimente care nu sunt de încredere se vor comporta ca și când a fost invocată metoda `preventDefault()` pentru respectivul eveniment.

## Comportamente și declanșatori de activare

Unele ținte ale evenimentelor cum ar fi linkurile sau butoanele au un „comportament de activare” asociat (*activation behaviour*) cum ar fi rezolvarea unui link pe care browserul în rulează ca urmare a unui declanșator de activare (*activation trigger*) care este apăsarea pe link.

## Resurse

- [DOM: Living standard, 2.6. Interface EventTarget](https://dom.spec.whatwg.org/#concept-event-listener)
- [UI Events. 3.1. Event dispatch and DOM event flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)
