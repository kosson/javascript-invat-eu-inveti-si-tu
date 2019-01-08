# Hypertext Transfer Protocol -- HTTP 1.1

Protocolul pentru transferul hypertext-ului este un protocol la nivel de aplicație pentru sisteme hypermedia de informații distribuite și colaborative.

## Terminologie

**conexiune**: un circuit virtual pentru nivelul de transport stabilit între două programe în scopul comunicării.

**mesaj**: unitatea de bază pentru comunicarea HTTP care constă dintr-o secvență structurată de octeți conform sintaxei definite în secțiunea 4 (HTTP Message), care este transmisă folosind conexiunea. Secțiunea 4: Mesajele HTTP constau din cereri de la client către server și răspunsurile de la server către client.

**cerere**: un mesaj de cerere așa cum este definit în Secțiunea 5: un mesaj de solicitare de la un client către un server include în prima linie a acelui mesaj metoda care trebuie aplicată resursei, identificatorul acesteia și versiunea protocolului în uz.

**răspuns**: un mesaj de răspuns așa cum este definit în Secțiunea 6: după primirea și interpretarea unui mesaj cerere, serverul răspunde cu un mesaj de răspuns HTTP.

**resursă**: un obiect de date de rețea sau un serviciu care poate fi identificat de un URI așa cum este definită în secțiunea 3.2: Uniform Resource Identifiers au fost cunoscute cu mai multe nume: adrese WWW, Universal Document Identifiers, Universal Resource Identifiers și în final combinația dintre Uniform Resource Locators (URL) și Names (URN). În ceea ce privește HTTP-ul, Uniform Resource Identifiers sunt simple șiruri de caractere care identifică - prin nume, locație sau oricare alte caracteristici - o resursă.

**entitate**: informația transferată ca payload (corp al mesajului) al unei cereri sau al unui răspuns. O entitate constă din metainformații în forma unor câmpuri ale unei entității-header și conținutul în forma unei entități-corp așa cum este descris în secțiunea 7: mesajele cererii și răspunsului poate transfera o entitate dacă nu este restricționat acest lucru de metoda cererii sau codul de stare a răspunsului. O entitate constă din câmpurile entității-header și o entitate-corp chiar dacă unele răspunsuri vor include doar entitățile-header.

**reprezentare**: o entitate inclusă cu un răspuns care este subiect al negocierii conținutului așa cum este descris în secțiunea 12: majoritatea răspunsurilor HTTP includ o entitate care conține informații pentru interpretarea de un utilizator uman. În mod natural, este de dorit să fie oferit utilizatorului cele «mai bune» entități disponibile care corespund cererii. Din nefericire pentru servere și mecanisme de cache, nu toți utilizatorii au aceleași preferințe pentru ceea ce este «cel mai bun» și nu toți agenții utilizatorului sunt capabili fără diferență să afișeze toate tipurile de entități. Din acest motiv, HTTP are prevederi pentru mecanismele destinate «negocierii conținutului» - procesul de selectare a celei mai bune reprezentări pentru un anume răspuns de selectare a celei mai bune reprezentări pentru un răspuns anume atunci când sunt disponibile mai multe reprezentări.

**variantă**: o resursă poate avea una sau mai mult de o reprezentare asociată în oricare dintre posibilele instanțe. Fiecare dintre aceste reprezentări sunt intitulate „varriant”. Utilizarea acestui termen nu implică și faptul că resursa este supusă negocierii conținutului.

**client**: un program care realizează conexiuni cu scopul de a trimite cereri.

**user agent**: este un client care inițiază o cerere. Aceste sunt cel mai adesea browserele, editoarele, spiders (roboții care indexează internetul) sau oricare alte instrumente end user.

**server**: un program aplicație care acceptă conexiuni pentru a gestiona cereri prin trimiterea de răspunsuri.

**origin server**: serverul pe care rezidă o anumită resursă sau unde este creată.

**proxy**: un program intermediar care se comportă ca un server dar și ca un client cu scopul de a face cereri din partea clienților. Cererile sunt gestionate intern sau sunt pasat cu o posibilă traducere către alte servere. Un proxy TREBUIE să implementeze cerințele client și server ale acestei specificații. Un „proxy transparent” este un proxy care nu modifică cererea sau răspunsul mai mult decât ceea ce este necesar pentru autentificarea și identificarea pe proxy. Un „proxy netransparent” este un proxy care modifică cererea și răspunsul pentru a oferi servicii suplimentare agentului utilizatorului cum ar fi servicii de notificare a unui grup, transformări ale tipurilor de media, reduceri ale protocolului sau filtrare pentru anonimizare. Cu excepția cazului în care este menționat explicit un comportament transparent sau non-transparent, cererile HTTP adresate proxy-ului se vor aplica ambelor tipuri de proxi-uri.

**gateway**: este un server care se comportă ca un intermediar pentru alte servere. Spre deosebire de un proxy, un gateway primește cereri ca și cum ar fi un server de origine pentru resursa solicitată; clientul care face solicitarea poate să nu realizeze că realizează o comunicare cu un gateway.

**tunnel**: un program intermediar care acționează ca un releu orb între două conexiuni. Când este activ, un tunel nu este considerat un participant la comunicarea HTTP chiar dacă a fost inițializat un tunel de o cerere HTTP. Tunelul își încheie existența când ambele capete ale conexiunii mediate sunt închise.

**cache**: este punctul local de stocare al mesajelor de răspuns și subsistemul care controlează stocarea, regăsirea și ștergerea mesajului. Un cache stochează mesaje care pot fi introduse în cache pentru a reduce timpul de răspuns și consumul de bandă al rețelei în cazul acelorași cereri. Orice client sau server poate să includă un cache chiar dacă un cache nu poate fi folosit drept server cu rol de tunel.

**cacheable**: un răspuns este cacheable dacă unui cache i se permite stocarea unei copii a mesajului răspunsului pentru a fi utilizat pentru a răspunde unor cereri ulterioare.

**first-hand**: un răspuns este de primă mână dacă vine direct fără întârziere de la un server de origine, poate traversând unul sau mai multe proxi-uri. Un răspuns este de primă mână dacă validitatea sa a fost verificată direct cu serverul original.

**explicit expiration time**: timpul în care serverul original are în intenție ca o entitate să nu mai fie returnată de un cache fără a fi validată mai întâi.

**heuristic expiration time**: timpul atribuit de un cache unei entități până la expirare atunci când nu este disponibil un timp de expirare explicit.

**age**: vârsta unui răspuns este timpul de când a fost trimisă sau a fost validată cu succes pe serverul de origine.

**freshness lifetime**: perioada de timp între generarea unui răspuns și timpul de expirare.

**fresh**: un răspuns este fresh dacă vârsta sa nu a depășit propriul *freshness lifetime*.

**stale**: un răspunse este stale dacă vârsta sa a depășit propriul *freshness lifetime*.

**semantically transparent**: un cache se comportă într-o manieră *semantic transparentă* în raport cu un anume răspuns, atunci când utilizarea sa nu afectează nici clientul care face cererea și nici serverul de origine cu excepția îmbunătățirii performanței. Atunci când un cache este transparent semantic, clientul primește exact același răspuns (cu excepția header-elor hop-by-hop) care ar fi fost primite dacă cererea ar fi fost gestionată direct de serverul de origine.

**validator**: un element de protocol care este folosit pentru a căuta dacă o intrare din cache este o copie echivalentă sau o entitate.

**upstream/downstream**: Upstream și downstream descriu parcursul unui mesaj. Toate mesajele vin dinspre upstream spre downstream.

**inbound/outbound**: se referă la căile cerere și răspuns pentru mesajele: *inbound* înseamnă *traseul către serverul de origine*, iar *outbound* înseamnă *traseul către user agent*.


## Referințe

[RFC 2616 - HTTP 1.1](https://tools.ietf.org/html/rfc2616)
[HTTP headers (MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
[HTTP Header Field Registrations](https://tools.ietf.org/html/rfc4229)
