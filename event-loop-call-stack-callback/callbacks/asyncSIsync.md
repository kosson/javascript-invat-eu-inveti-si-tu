# Callback-uri sincrone și asincrone

## Callback-urile sincrone

Acestea sunt invocate înainte ca o funcție să returneze. Putem spune că aplicația care primește callback-ul va rămâne în stivă.

Calback-urile sincrone sunt invocate în firul de execuție originar.

Spre exemplu, la invocarea unui callback cu foreach, acesta va fi performat pentru fiecare dintre elementele listei.

## Callbackurile asincrone - deferred callback (invocare întârziată)

Callback-ul este invocat după ce o funcție a returnat deja sau a returnat într-un alt fir de execuție al stivei.

Callback-urile asincrone sunt folosite pe scară largă în API-urile legate de IO așa cum sunt socketurile, de exemplu (`socket.connet(callback)`). Ceea ce este de așteptat în cazul socket este ca atunci când connect returnează, callback-ul încă să nu fie invocat de vreme ce așteaptă să se facă conexiunea.

Pot fi invocate de un alt fir de execuție (în cazul mecanismelor de invocare întârziată «deferral» bazate pe firul de execuție). În acest caz, o aplicație ar trebui să sincronizeze orice resurse accesează callback-ul. Aici este ridicată o problemă care ține și de modificarea stării aplicației, mai exact trebuie luat în calcul faptul că alte fire de execuție deja au modificat starea aplicației.

„Amânarea” unui callback are ca efect „trecerea unei perioade” necesară stivei să ajungă înapoi la bucla centrală (event loop). Mai este un caz: cel al rulării într-un alt fir de execuție.

## Bună practică

Din capul locului menționează dacă o funcție este asincronă sau nu la momentul definirii.
Dacă un callback trebuie invocat cu întârziere, definește funcția să facă acest lucru.
