# Interfața IteratorResult

Acestă interfață este calapodul pe care sunt croite toate obiectele returnate de metoda `next()` aparținând interfeței `Iterator`.

Această interfață are proprietățile `done` și `value`. Proprietatea `done` poate avea valoarea `true` sau `false`. În cazul în care colecția de date a fost parcursă integral, valoarea lui `done` va fi `true`, în caz contrar, dacă mai sunt elemente în colecție, valoarea va fi `false`. În cazul în care proprietatea `done` nu există pentru că nu a fost moștenită sau nu a fost implementată, valoarea din oficiu va fi `false`.

Proprietatea `value` oferă o valoare doar dacă proprietatea `done` are valoarea `false`.
