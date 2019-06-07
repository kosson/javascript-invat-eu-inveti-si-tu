# Codarea și decodarea base64

În JavaScript prelucrarea șirurilor codate base64 se bazează pe folosirea metodelor `atob()` și `btoa()`. Reține faptul că aceste două metode lucrează doar cu șiruri de caractere.

## Dimensiune

Fiecare digit Base64 reprezintă fix 6 biți de date. Trei bytes care fiecare au câte 8 biți (8x3=24), vor putea fi reprezentați de 4 digiți Base64 (4x6=24).

Acest lucru înseamnă că versiunea Base64 a unui fișier, va fi ca dimensiune cu 33% mai mare decât cel original.

## Cazul UTF-8

Apelarea metodei `btoa()` pe un string UTF8, va conduce la ridicarea unei erori `Character out of Range` dacă vreun caracter din string va avea mai mult de un byte. Pentru a rezolva aceste probleme, documentația Mozilla aduce câteva soluții.

1. Codarea UTF-16 direct în base64
2. Codare din UTF-16 în UTF-8 și apoi base64
3. Codarea UTF-ului 16 direct în base64 prin binary strings
4. Escape și codare imediată
5. Codare din UTF-16 în UTF-8 și apoi base64 folosind biblioteci de cod

Ce-a de-a treia este cea mai elegantă soluție.

```javascript
//  Author: madmurphy
"use strict";

function btoaUTF16 (sString) {
	var aUTF16CodeUnits = new Uint16Array(sString.length);
	Array.prototype.forEach.call(aUTF16CodeUnits, function (el, idx, arr) { arr[idx] = sString.charCodeAt(idx); });
	return btoa(String.fromCharCode.apply(null, new Uint8Array(aUTF16CodeUnits.buffer)));
}

function atobUTF16 (sBase64) {
	var sBinaryString = atob(sBase64), aBinaryView = new Uint8Array(sBinaryString.length);
	Array.prototype.forEach.call(aBinaryView, function (el, idx, arr) { arr[idx] = sBinaryString.charCodeAt(idx); });
	return String.fromCharCode.apply(null, new Uint16Array(aBinaryView.buffer));
}

var myString = "☸☹☺☻☼☾☿";

/* Part 1: Encode `myString` to base64 using native UTF-16 */
var sUTF16Base64 = btoaUTF16(myString);
/* Show output */
alert(sUTF16Base64); // "OCY5JjomOyY8Jj4mPyY="
/* Part 2: Decode `sUTF16Base64` to UTF-16 */
var sDecodedString = atobUTF16(sUTF16Base64);
/* Show output */
alert(sDecodedString); // "☸☹☺☻☼☾☿"
```

## Resurse

- [Base64 encoding and decoding, MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding),
- [Data URLs, MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs),
- [The "data" URL scheme, Request for Comments: 2397](https://tools.ietf.org/html/rfc2397),
- [The Base16, Base32, and Base64 Data Encodings, Request for Comments: 4648](https://tools.ietf.org/html/rfc4648)
