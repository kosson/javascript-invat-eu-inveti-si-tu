# Data URL-uri

Sunt URL-uri prefixate cu `data:`. Această schemă permite incorporarea de fișiere în interiorul documentelor online.

## Sintaxa

În cazul URL-urilor de date, avem în componență patru părți dinstincte: `data:[<mediatype>][;base64],<data>`.

Mediatype este un șir de caractere ce indică ce tip de MIME este folosit (`image/jpeg`). Dacă este omisă precizarea MIME-ului, valoarea din oficiu este `text/plain;charset=US-ASCII`.

Exemple:

- `data:,Salutare%2C%20Lume!` pentru date text `text/data`;
- `data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D` folosind codare base64;
- `data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E` fragment de HTML;
- `data:text/html,<script>alert('hi');</script>`.

Base64 este o schemă de codate a datelor binare într-un format text constituit din echivalentul ASCII.

## Resurse

- [Data URLs, MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs),
- [Base64 encoding and decoding, MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)
