# Cartografierea surselor - source maps

Codul sursă JavaScript atunci când este folosit în producție poate suferi modificări care țintesc eficiența. Codul sursă poate fi redus ca dimensiuni (*minification*) sau codul este compilat din alte dialecte ECMAScript precum CoffeeScript sau TypeScript în JavaScript. Problema apare atunci când codul rezultat din transformări trebuie depanat. Dacă anterior nu a fost *cartografiat* pentru a fi constituită o adevărată *hartă* a sa, nu mai ai referințele originale, iar depanarea este extrem de dificilă.

Pentru a folosi un fișier hartă a codului sursă, în cel care a for modificat trebuie să existe o referință către hartă. Să presupunem că avem o versiune minificată a lui `bootstrap` care se numește `bootstrap.bundle.min.js.map.js`. În acest fișier minificat trebuie să existe un comentariu `//# sourceMappingURL=bootstrap.bundle.min.js.map` care indică locația fișierului hartă. De regulă, acest fișier cu extensia `.map` se află în aceeași rădăcină cu cel rezultat din prelucrare/compilare.

## Resurse

- [Use a source map | MDN](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map)
- [Source map errors | MDN](https://developer.mozilla.org/en-US/docs/Tools/Debugger/Source_map_errors)
- [Introduction to JavaScript Source Maps | Ryan Seddon | html5rocks.com](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
