# Event handlers - gestionari de evenimente

## Spune standardul

Unele obiecte pot primi „semnale” (`events`), care trebuie gestionate intern de acestea. Aceste „semnale” (`events`) sunt „ascultate” de „receptorii de evenimente” (`event listeners`), fără ca aceste evenimente (semnale), să fie capturate/reținute de obiectele cărora le sunt destinate.

Un „gestionar de evenimente” (`event handler`) are un nume ușor de deosebit pentru că începe cu `on`, fiind urmat de numele explicit al evenimentului. Un „gestionar de evenimente” are o valoare care este fie `null`, fie este un obiect callback sau poate fi chiar o secvență de cod brută, necompilată.

Gestionarii de evenimente sunt „expuși” în două moduri:
- un mod comun tuturor gestionarilor (event handlers) este ca atribut IDL al event handler-ului. Numele atributului IDL este chiar numele evenimentului (`onclick`, `onclose`).
- ca atribut de conținut al gestionarului de evenimente; de fapt numele unei funcții JavaScript.

## Resurse

[Event handlers](https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers)
