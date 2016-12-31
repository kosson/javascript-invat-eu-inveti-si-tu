# Pentru voi!

Dedic acest efort copiilor mei, copiilor tuturor celor care vor citi materialele și vouă, celor care veți citi, veți învăța și veți înțelege.

Speranța mea se îndreaptă către cei care vor reuși să stăpânească limbajul într-atât de bine încât să intre în etapa creativă fără întârziere.

## O resursă cu ceva explicații pentru a înțelege JavaScript

Aceasta este o colecție de subiecte care privesc JavaScript-ul. Învăț mai bine dacă scriu lucrurile pe care vreau să le înțeleg iar această carte mă va ajuta să înțeleg mai bine și să pot explica mai bine.
Ținta este realizarea unui material de învățare pentru JavaScript care să fie eficient în înțelegerea aspectelor celor mai dificile. Și acestea nu sunt puține.

Conține experiențe și note strânse după ce am citit și văzut multe alte lucrări dedicate acestui limbaj de programare pe diferite subiecte.

Este posibil ca multe dintre interpretările mele sau felul în care explic să nu fie cel canonic, cel predat la facultate sau în mediile academice dedicate. Limbajul adoptat este unul dedicat celui care dorește să înțeleagă fenomenul și să ajungă la contextualizare rapidă a anumitor concepte sensibile.

Materialele pot servi și ca date prelucrabile pentru un posibil sistem de învățare dinamic și adaptat pe subiect. În acest sens, unele materiale includ secțiuni intitulare „dependințe cognitive” sau „alonje”. Mai toate subiectele tratate conțin o secțiune intitulată „mantre”, care au scopul de a realiza liste de „atribute” care descriu aspectele cele mai importante.

## Anti-introducere

JavaScript este motorul dinamicii paginilor web și nu numai. Avantajele folosirii JS pornesc de la server (NodeJs), până la aplicațiile rulate în pagina web a utilizatorului.
Când vorbim de JavaScript, de fapt vorbim despre o implementare, adică de respectarea tuturor regulilor pe care le impune standardul ECMAScript.

Moment ZEN: ECMAScript este bazat pe obiecte.

## Perspectivă peste un tărâm

Textul standardului oferă cea mai bună perspectivă atunci când vine vorba despre un program JavaScript care este privit la lucru. Voi parafraza și cita acolo unde este necesar standardul pentru a contura un cadru cât mai complet.

Mai întâi este util să spun că standardul menționează chiar termenul de „realm” - **tărâm**: „înainte de a fi evaluat, tot codul ECMAScript trebuie asociat unui tărâm. Conceptual, un tărâm constă dintr-un set de obiecte intrinseci, un mediu global și tot codul ECMAScript care este încărcat în cadrul «scope-ul» acelui mediu global, precum și alte stări și resurse asociate”. Atenție, pentru fiecare „context de execuție în efect”, adică bucata de cod care este evaluată la momentul în care bagi capul în „căpița de cod care se execută”, se creează câte o nouă înregistrare pentru cum arată tărâmul.

Un tărâm este constituit dintr-un set de obiecte interne, obiectul global pentru tărâmul la care ne referim, cadrul lexical creat de însăși felul în care este redactat codul („lexical environment”) și elemente care au capacitatea de a crea șabloane. Toate tărâmurile care sunt create sunt evidențiate de o înregistrare specială numită de standard `Realm Record`. Din toată această mică listă reține faptul că JavaScript vine cu câteva lucruri din start care împreună cu programul scris de tine construiesc un tărâm.

Un program JavaScript este de fapt un grup de obiecte care comunică între ele. Obiectele acestea sunt niște colecții de proprietăți iar pentru fiecare dintre proprietăți există atribute care determină cum se pot folosi acestea. Proprietățile pot fi considerate ca niște cutii care conțin la rândul lor **obiecte**, **valori primitive** sau **funcții**.

Simplu, avem șase primitive în acest moment: Boolean, Null, Undefined, String, Number și Symbol.
Obiectele sunt de fapt membri ai tipului de obiect intern limbajului numit `Object`. Funcțiile sunt un tip de obiecte pe care în jargonul limbajului le înțelegem a fi de tip `callable` iar funcțiile care sunt identificate printr-o proprietate a unui obiect sunt metode ale acestuia.

Mai adăugăm că ECMAScript, adică JavaScript are niște obiecte cu care vine el din start (`built-in objects`).

Aceasta este cadrul foarte general.

## Mică anatomie a limbajului

Caracterele folosite pentru a scrie cod respectă standardul de codare Unicode. Toate elementele lexicografice care constituie codul în sine, cu excepția spațiului și a comentariilor, se numesc `token-uri`, adică `atomi lexicali`. Acești atomi lexicali, token-ii, sunt rezultatul parcurgerii unui fragment de cod (codul sursă) asupra căruia se aplică regulile lexicale specifice gramaticii pe care o impune standardul ECMAScript.
De fapt, spune standardul că mai întâi textul codului este parcurs pentru a-l „converti într-o succesiune de elemente de input” folosindu-se regulile lexicale. Imediat după această fază, acestă succesiune de elemente de input mai este parcursă încă o dată aplicându-se regulile gramaticale pentru a identifica ce este ce în text, care sunt identificatori, cuvintele rezervate limbajului, etc.

# Resurse

[ECMAScript® 2017 Language Specification](https://tc39.github.io/ecma262/)

Simpson Kyle, [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

Haverbeke Marijn, [Eloquent JavaScript](http://eloquentjavascript.net/)
