# Intl

Acest obiect a fost introdus ca urmare a aplicării standardului [ECMA 402 - Internationalization API specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/). Poate fi considerat obiectul care implementează ECMAScript Internationalization API. Oferă posibilitatea de a compara în funcție de rigorile unei anumite limbi diferite șiruri de caractere, formatări de numere, precum și a datelor calendaristice.

Argumentul `locales` indică prin elementele redactate conform etichetelor de limbă (BCP 47) ce localizări ar fi necesare pentru a rezolva o anumită operațiune. Ceea ce se petrece este că runtime-ul va prelua lista localizărilor necesare, se va uita (folosind un algoritm precizat ca opțiune a cheii `localeMatcher`) la cele care sunt disponibile pe sistemul pe care rulează și va returna o listă cu cele pentru care poate onora localizarea. Valorile pe care argumentul `locales` le poate avea sunt:

- `undefined` sau poate fi omis cu totul;
- un string sau poate fi și o instanță de `Intl.Locale` care face *wrapping* unui identificator al unei valori de localizare;
- un array de string-uri cu tag-uri de limbă.

Un identificator de limbă poate fi construit din următoarele elemente care sunt despărțite prin caracterul minus (*hyphen*):

- un subtag al limbii,
- (opțional) un subtag care specifică scrierea (de ex.: chirilică `Cyrl` sau latin `Latn`);
- (opțional) un subtag care indică regiunea unei țări în care se vorbește limba;
- (opțional) una sau mai multe subtag-uri, care fiecare trebuie să fie unic (să nu se repete);
- (opțional) una sau mai multe secvențe de extensii precizate de BCP 47;
- (opțional) o secvență a unei extensii folosită privat.

Fiecare dintre identificatori ai localizărilor sunt caractere case-insensitive ASCII. Totuși în redactarea subtagurilor se întâlnesc majuscule: `"ro-RO"` sau `"zh-Hans-CN"`. Subtag-urile pentru limbi, scrieri, regiuni și uneori variante ale acestora sunt păstrate într-un registru care se actualizează continuu numit [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). Pentru limba română există o secțiune care are următoarele precizări.

```text
%%
Type: language
Subtag: ro
Description: Romanian
Description: Moldavian
Description: Moldovan
Added: 2005-10-16
Suppress-Script: Latn
%%
```

Secvențele care sunt extensii ale BCP 47 sunt gestionate de [ Unicode CLDR Project](https://github.com/unicode-org/cldr/tree/main/common/bcp47) care este un registru specific.

Extensia "u" (Unicode) poate fi folosită pentru a merge în mai mare adâncime cu necesitatea de a configura localizarea obiectelor `Intl.Collator`, `Intl.NumebrFormat` ori `Intl.DateTimeFormat`. Două exemple pe care le oferă MDN-ul sunt:

- "ja-JP-u-ca-japanese": Utilizarea calendarului japonez pentru fomatarea datei și a orei astfel încât 2013 este exprimat ca anul 25 al perioadei Heisei period, adică 平成 25;
- "en-GB-u-ca-islamic": folosește engleza britanică dar pe calendar Islamic (Hijri), unde data Gregoriană de 14 october, 2017 este data Hijri 24 Muharram, 1439.

Extensia "t" indică faptul că avem de-a face cu un conținut transformat.

Acest obiect are drept proprietăți următorii constructori:

- `Intl.Collator()`,
- `Intl.DateTimeFormat()`,
- `Intl.DisplayNames()`,
- `Intl.ListFormat()`,
- `Intl.Locale()`,
- `Intl.NumberFormat()`,
- `Intl.PluralRules()`,
- `Intl.RelativeTimeFormat()`,
- `Intl.Segmenter()`.

## Metode statice

- `Intl.getCanonicalLocales()`,
- `Intl.supportedValuesOf()`.

## Referințe

- [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [The ECMAScript Internationalization API | Norbert Lindenberg | December 18, 2012](https://norbertlindenberg.com/2012/12/ecmascript-internationalization-api/index.html)
