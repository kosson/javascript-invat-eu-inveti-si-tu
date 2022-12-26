# Intl.DateTimeFormat

Permite manipularea datelor calendaristice în funcție de formatul datei și/sau a orei în contextul localizării dorite. Constructorul `Intl.DateTimeFormat` creează un obiect `DateTimeFormat`. Majoritate operațiunilor pe care le vei face folosind acest obiect, vor implica utilizarea constructorului `Date`.

## Constructorul Intl.DateTimeFormat()

Constructorul `Intl.DateTimeFormat()` poate fi apelat folosind `new` sau nu. Poate primi doi parametri: `locales` și `options`.

### Parametrii

Pentru parametrul `locales` sunt permise valori *language tags* sau un array al acestora. Sunt permise adăugarea următoarelor extensii caracteristice Unicode:

#### nu - numbering system

Această extensie va preciza sistemul de numărare specific unei localizări cu care se dorește să se lucreze. Posibilele valori sunt: "arab", "arabext", "bali", "beng", "deva", "fullwide", "gujr", "guru", "hanidec", "khmr", "knda", "laoo", "latn", "limb", "mlym", "mong", "mymr", "orya", "tamldec", "telu", "thai", "tibt".

#### ca - formatarea datei calendaristice

Posibilele valori sunt: "buddhist", "chinese", "coptic", "dangi", "ethioaa", "ethiopic", "gregory", "hebrew", "indian", "islamic", "islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa", "iso8601", "japanese", "persian", "roc", "islamicc". Privitor la `islamicc`, acesta este abandonat în favoarea valorii `islamic-civil`.

#### hc - hour cycle

Valorile posibile sunt: "h11", "h12", "h23", "h24".

Pentru obiectul de parametrizare `options` poți avea următoarele proprietăți:

#### dateStyle

Aceasta este proprietatea a cărui valoare va fi folosită pentru modificarea stilului în care se va face formatarea atunci când va fi apelată metoda `format()`. Posibilele valori sunt: "full", "long", "medium" și "short".

#### timeStyle

Este similar proprietății `dateStyle`. Posibilele valori sunt: "full", "long", "medium" și "short".

#### calendar

Precizezi care tip de calendar dorești să fie folosit pentru a formata data calendaristică. Valorile posibile sunt "buddhist", "chinese", "coptic", "dangi", "ethioaa", "ethiopic", "gregory", "hebrew", "indian", "islamic", "islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa", "iso8601", "japanese", "persian", "roc", "islamicc". Privitor la `islamicc`, acesta este abandonat în favoarea valorii `islamic-civil`.

#### dayPeriod

Această setare permite afișarea informației privind în care moment al zilei a apărut evenimentul pentru care dorești formatarea. Valorile posibile sunt "narrow", "short", "long". Opțiunea produce efecte doar dacă este folosit ceasul cu împărțire la 12 ore.

#### numberingSystem

Precizează sistemul de numerație folosit: "arab", "arabext", "bali", "beng", "deva", "fullwide", " gujr", "guru", "hanidec", "khmr", " knda", "laoo", "latn", "limb", "mlym", "mong", "mymr", "orya", "tamldec", "telu", "thai", "tibt".

#### localeMatcher

Precizează algoritmul după care se face căutarea localizărilor disponibile. Posibilele valori sunt "lookup" și "best fit" (valoare din oficiu).

#### timeZone

Precizezi care fus orar/zonă/regiune va fi folosită pentru formatarea datei. IANA oferă o listă a acestora care poate fi accesată de la <https://www.iana.org/time-zones>. De exemplu: "Europe/Bucharest", "Asia/Shanghai", "Asia/Kolkata", "America/New_York".

#### hour12

Vrin posibilele valori `true` sau `false` precizezi care este formatul de timp pentru împărțirea zilei. Această opțiune va suprascrie ce specifică hanguage tag-ul `hc` și/sau `hourCycle` dacă ambele valori sunt precizate.

#### hourCycle

Valorile posibile sunt "h11", "h12", "h23" și "h24". Această opțiune va suprascrie ce specifică hanguage tag-ul `hc` dacă amândouă au valori (`hc` și `hourCycle`) cu specificația că valoarea `hour12` va avea întâietate.

#### formatMatcher

Este formatul algoritmului de căutare care trebuie folosit. Valorile posibile sunt "basic" sau "best fit" (din oficiu).

### Intl.DateTimeFormat.prototype.format()

Această metodă formatează o dată calendaristică după localizarea care este disponibilă, rezultatul fiind modelat conform opțiunilor de formatare pe care obiectul `Intl.DateTimeFormat` le precizează.

### Secvențele de formatare

Următoarele proprietăți descriu componentele dată-oră care vor constitui blocurile constructive ale rezultatului afișat în reprezentarea care este dorită:

- weekday, year, month, day, hour, minute, second
- weekday, year, month, day
- year, month, day
- year, month
- month, day
- hour, minute, second
- hour, minute

## Exemple

Atunci când nu este specificată o anumită localizare `DateTimeFormat` folosește localizarea din oficiu, precum și valorile din oficiu pentru obiectul `options`.

```javascript
let date1 = "2022-07-03T09:16:52.030+00:00";
let date1ob = Date.parse(date1);
let timestamp1 = 1656839812028;
let date2ob = new Date(timestamp1);

console.log(date2ob.toISOString()); // 2022-07-03T09:16:52.028Z


console.log(new Intl.DateTimeFormat('ro-RO').format(date1ob)); // 03.07.2022
console.log(new Intl.DateTimeFormat('ro-RO', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Bucharest' }).format(date2ob)); // duminică, 3 iulie 2022, 12:16:52 EEST

// conjugat cu RelativeTimeFormat:

const rtf = new Intl.RelativeTimeFormat("ro-RO", {
    localeMatcher: "best fit", // other values: "lookup"
    numeric: "always", // other values: "auto"
    style: "long", // other values: "short" or "narrow"
  });

let minusValue = Math.floor((Date.now() - new Date(date2ob)) / (1000 * 60 * 60 * 24)); // 86400000
rtf.format(-minusValue, "day"); // acum 173 de zile
```

## Resurse

- [Intl.DateTimeFormat() constructor | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)
