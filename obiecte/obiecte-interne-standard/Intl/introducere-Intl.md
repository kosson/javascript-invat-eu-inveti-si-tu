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

Secvențele care sunt extensii ale BCP 47 sunt gestionate de [Unicode CLDR Project](https://github.com/unicode-org/cldr/tree/main/common/bcp47) care este un registru specific.

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

Să ne uităm la următoarea explicație pentru language tag-urile necesare limbii greacă. Să presupunem că vrem să afișăm date calendaristice celor care navighează din Grecia pe o anumită pagină.

```javascript
let rtf = new Intl.RelativeTimeFormat('el-Grek-GR-polyton-u-nu-native');
```

După cum vedeți, sunt mai multe language-tag-uri care sunt înșiruite drept prim argument al metodei: `el-Grek-GR-polyton-u-nu-native`. Să vedem ce înseamnă fiecare.

- `el` marchează faptul că limba cu care vom lucra este greaca modernă. Codificarea este asigurată de convențiile ce stabilesc codul de limbă prin [ISO 639-1/639-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes);
- `Grek` marchează care este scrierea pentru care vor fi afișate caracterele. În cazul nostru este *Greek* conform standardului [ISO 15924](https://unicode.org/iso15924/iso15924-codes.html);
- `GR` este codificarea țării, care este Grecia conform [ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes);
- `polyton` este codificarea conform [IANA](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) care desemnează tipul `polytonic greek`;
- `u-nu-native` extensii Unicode pentru a afișa digiții cifrelor conform localizării de limbă aleasă (`u` Unicode Locale, `ca` este calendar, `nu` este number) conform [BCP 47 Extension U](https://www.rfc-editor.org/rfc/rfc6067).

## Metode statice

- `Intl.getCanonicalLocales()`,
- `Intl.supportedValuesOf()`.

## Resurse

- [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [The ECMAScript Internationalization API | Norbert Lindenberg | December 18, 2012](https://norbertlindenberg.com/2012/12/ecmascript-internationalization-api/index.html)
- [Choosing a Language Tag](https://www.w3.org/International/questions/qa-choosing-language-tags.en)
- [Tags for Identifying Languages](https://www.rfc-editor.org/rfc/rfc5646.html)
- [Picking the Right Language Identifier](https://cldr.unicode.org/index/cldr-spec/picking-the-right-language-code)
- [Unicode BCP47 Extensions | Mark Davis](https://www.w3.org/International/multilingualweb/dublin/slides/23b-davis.pdf)
