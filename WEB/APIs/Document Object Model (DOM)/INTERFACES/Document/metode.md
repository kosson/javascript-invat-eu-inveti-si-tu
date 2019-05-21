# Metodele Interfeței `Document`

## `createElement(numeTag, [opțiuni])`

Creează un element pentru care este specificat tipul. Instanța returnată la momentul creării implementează și interfața `Element` (adică este returnat un obiect ca `new` Element), ceea ce permite specificarea oricăror atribute direct folosind obiectul returnat.

Ca parametru introduci numele tag-ului. Vezi că în cazul XML-ului, numele este sensibil la majuscule (case-sensitive).

## `createDocumentFragment()`

Creează un obiect `DocumentFragment` gol. Este returnat un `new DocumentFragment`.

## `createTextNode()`

Creează un nod de `Text` având conținutul specificat printr-un șir de caractere.
Ca parametru primește șirul de caractere.

## `createComment()`

Creează un node de `Comment` prin returnarea unui nou obiect de tip `Comment`.

## `createCDATASection()`

Creează un nod `CDATASection` care va avea valoarea specificată în parametru.

## `createProcessingInstruction()`

Pentru a crea un astfel de nod trebuie să specifici prin parametri `target`-ul, adică unde vrei să se aplice, și intrucțiunile în sine.

## `createAttribute()`

Creează un atribut de un anume tip specificat prin parametru. După creare, poate fi atașat la un element existent folosind metoda `setAttribute`.

## `createEntityReference()`

Creează un obiect `EntityReference` și primește un parametru care va indica numele acestui `EntityReference`.

## `getElementsByTagName()`

Returnează un `NodeList` al tuturor `Elements` care au un anume nume de tag. Drept parametru, primește numele tagului după care să genereze colecția de `NodeList`. Dacă-i pasezi ca argument caracterul `*`, atunci va genera o colecție cu toate tagurile existente în document.
