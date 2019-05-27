# Proprietăți ale interfeței `Document`

Pe lângă proprietățile proprii, moștenește și pe cele ale lui `Node` și `EventTarget` prin moștenirea de la acestea.

Această interfață moștenește și proprietățile interfeței `HTMLDocument`.

## `Document.all` - read-only

Returnează un `HTMLAllCollection` ceea ce este în fapt întregul document.

## `Document.anchors` - read-only

Returnează o listă cu toate ancorele documentului.

## `Document.body` - read-only

Returnează, fie nodul lui `<body>`, fie nodul `<frameset>` al documentului curent.

## `Document.characterSet` - read-only

Proprietatea returnează schema de codare a caracterelor pentru documentul încărcat.

```javascript
console.log(document.characterSet);
```

## `Document.cookie`

Returnează o listă a cookie-urilor separate prin punct și virgulă. Acestea sunt cookie-urile documentului. Folosind această proprietate se poate seta un cookie, dacă acest lucru este necesar.

## `Document.defaultView`

Returnează o legătură la obiectul `window`.

## `Document.designMode`

Folosind proprietatea poți seta sau obține posibilitatea de a edita un întreg document.

## `Document.dir`

Folosind proprietatea poți seta sau obține direcția de scriere/citire a textului.

## `Document.doctype` - read-only

Proprietatea returnează DTD-ul (Document Type Declaration) asociat cu documentul curent.

```javascript
var dtdul = document.doctype;
console.log(dtdul);
```

## `Document.domain`

Folosind proprietatea poți seta sau obține domeniul documentului curent.

## `Document.documentElement` - read-only

Este o proprietate, care în cazul documentelor HTML, va returna primul element copil, care este `<html>`. Fii foarte atentă pentru că în cazul documentelor XML, pot exista mai mulți copii rădăcină.

Folosește această metodă pentru a ținti nodul `html` și nu utiliza `document.firstChild`.

```javascript
var radacina = document.documentElement;
var copiiLuiHtml = radacina.childNodes;
// În acest moment ai toate nodurile documentului
```

## `Document.documentURI` - read-only

Returnează locația documentului sub formă de string.

## `Document.embeds` - read-only

Returnează o listă de elemente `<embeds>` ale documentului curent.

## `Document.fonts`

Returnează o legătură la interfața `FontFaceSet` a documentului curent.

## `Document.forms` - read-only

Returnează o listă de elemente `<form>` existente în documentul curent de lucru.

## `Document.head` - read-only

Returnează elementul `<head>` pentru elementul curent de lucru.

## `Document.hidden` - read-only

## `Document.images` - read-only

Returnează o listă de imagini existente în documentul curent de lucru.

## `Document.implementation` - read-only

Returnează implementarea la nivel DOM pentru documentul curent.

## `Document.lastStyleSheetSet` - read-only

Returnează numele setului de stylesheet-uri activat ultimul. Va fi returnată valoarea `null` până când se produc modificări în stylesheet prin setarea valorii lui `selectedStyleSheetSet`.

## `Document.links` - read-only

Este returnată o listă de linkuri din document.

## `Document.lastModified`

Returnează data la care s-a făcut ultima modificare asupra documentului.

## `Document.location`

Returnează URI-ul documentului de lucru.

## `Document.plugins` - read-only

Returnează o listă de plugin-uri disponibile.

## `Document.preferredStyleSheetSet` - read-only

Returnează stylesheet-ul care este preferat de autor.

## `Document.readyState`

Returnează starea documentului privind încărcarea sa.

## `Document.referrer`

Returnează URI-ul paginii care s-a legat la această pagină.

## `Document.title`

Setează sau obține titlul documentului curent.

## `Document.URL`

Returnează locația documentului sub formă de string.

## `Document.scripts` - read-only

Returnează toate elementele `<script>` care există în document.

## `Document.selectedStyleSheetSet`

Returnează stylesheet-ul care este folosit curent.

## `Document.styleSheetSets` - read-only

Returnează o listă de seturi de stylesheet-uri disponibile în document.

## `Document.timeline` - read-only

## `Document.visibilityState` - read-only

Returnează un `string` care indică dacă un document este vizibil sau nu. Posibilele valori sunt:

- `visible`,
- `hidden`,
- `prerender` și
- `unloaded`.
