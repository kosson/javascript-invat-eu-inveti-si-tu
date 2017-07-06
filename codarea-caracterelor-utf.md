# Codarea caracterelor - Unicode

Computerele nu înțeleg cuvintele noastre, nici măcar caracterele pe care le folosim noi pentru a compune cuvintele. Ceea ce înțeleg mașinile noastre de calcul este o secvență de 0 și 1, dar ca să existe un nivel unde să ne putem întâlni cu ele pentru a stabili comunicarea, au fost create sisteme de reprezentare, de codare alfanumerică a caracterelor pentru ca acestea să aibe un echivalent numeric inteligibil pentru computere.

Te vei întreba pe bună dreptate care este legătura cu programarea și cu demersul nostru de a învăța JavaScript? Răspunsul este unul cum nu se poate mai simplu: orice caracter introdus în editorul de text, trebuie interpretat de computer pentru a stabili legătura cu forma sa codată numeric. În ajutorul acestei etape, există un tabel de corespondență constituit la nivel global și tot acest efort de a aloca o reprezentare cifrică fiecărui caracter a tuturor limbilor de pe mapamond se numește Unicode Standard.
Da, vorbim de un efort de standardizare la nivel global strâns sub marca înregistrată Unicode. Standardul Unicode se definește ca un „sistem de codare a caracterelor proiectat să suporte schimbul la nivel global, procesarea și afișarea textelor scrise ale diferitelor limbi și a disciplinelor tehnice ale lumii moderne”.

Standardul Unicode este format din **specificațiile nucleu**, **Hărțile de coduri**, **Anexele Standardului Unicode** și **Baza de date a caracterelor Unicode**. Unicode respectă punct cu punct, de fapt se identifică cu standardul ISO/IEC 10646:2012 - Universal Coded Character Set (UCS).

Pentru a înțelege dimensiunea setului pe care Unicode îl acoperă, la data 20 iunie, 2017, versiunea 10.0.0 a standardului oferea mijloace de codare pentru 136690 de caractere.

Standardul Unicode este utilizat pentru redactarea resuselor HTML și XML. În introducerea textului standardului este menționat un fapt foarte important: „Unicode este baza software-ului care trebuie să funcționeze în întreaga lume”.
Istoric vorbind, Unicode a pornit de la setul ASCII, care l-a precedat.

Ce oferă standardul Unicode? Pentru fiecare caracter este specificată o valoare numerică numită de standard `code point` și un nume unic.
Unicode formatează reprezentarea numerică ca numere pe 32 de biți (UTF-32), pe 16 biți (UTF-16) și pe 8 biți (UTF-8). Versiunea pe 8 biți este utilizată pe scară largă pentru a realiza compatibilitatea cu standardul vechi ASCII.
JavaScript folosește caracterele codate UTF-16.

## Resurse

http://www.unicode.org/standard/standard.html
[Unicode® 10.0.0](http://www.unicode.org/versions/Unicode10.0.0/UnicodeStandard-10.0.pdf)
