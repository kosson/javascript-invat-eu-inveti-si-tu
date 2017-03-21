# Instrumente de ciclare

Partea cea mai valoroasă a programării este aceea că poate prelua un set de date pe care le poate parcurge element cu element, aplicând transformări sau căutări după anumite criterii, cu scopul de a obține un anumit rezultat dorit.

## Bucle

Buclele sunt cel mai la îndemână instrument de a parcurge un set de date.
Folosirea buclelor presupune utilizarea repetată a unei secvențe de instrucțiuni. Îi mai spunem ciclare sau iterare. În fapt, ceea ce se întâmplă este repetarea ritmică a unui set de instrucțiuni iar fiecare rezultat al fiecărei iterații este supus unui control.

## Recursivitate

Alternativa la procesele repetitive este recursivitatea. Recursivitatea nu implică conceptul de ciclu.

Capacitatea unei funcții de a se apela pe sine însăși conduce la efecte interesante atunci când vorbim despre parcurgerea unor calupuri de date. În cel mai simplu scenariu vorbim de faptul că funcția va executa același set de instrucțiuni până la epuizarea unei condiții setată în apel.

O posibilă reprezentare mentală ar fi un olar zăpăcit care se pune la roată să facă un vas. Începe să rotească roata, începe modelatul lutului, dar ajunge la concluzia că nu poate termina pentru că nu mai are lut. În acest moment, se ridică de la roată, dă o fugă la magazie, mai ia un căuș de lut și se întoarce. Se pune la roată din nou, adaugă lutul adus peste cel existent și pornește din nou modelarea. Ajunge din nou în situația să mai aducă lut pentru a termina. Se ridică de la roată, merge la magazie, aduce lutul pentru a completa și așezându-se la roată, după o nouă sesiune de modelare, ajunge la rezultatul final.
Să-i spunem olarului nostru Ilieș. Dacă lui Ilieș îi place să vorbească cu sine atunci când lucrează, fie în gând, fie cu glas tare, cu siguranță am remarca că atunci când constata lipsa lutului, își spunea sie: „Ilieș, ia de te scoală și mergi la cămară de mai adu lut”.
Cam așa e și cu recursivitatea. E ca Ilieș care se apelează singur să facă ceva.

Ține minte că în cazul recursivității, fiecare operațiune, adică fiecare nouă apelare este **subordonată** pasului anterior.
