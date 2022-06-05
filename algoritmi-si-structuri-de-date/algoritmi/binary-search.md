# Binary search

Inputul pentru un astfel de algoritm este o listă sortată - un array.
În cazul în care elementul este în listă, algoritmul va returna poziția sa. În caz contrar, va returna `null`.

Algoritmul se bazează pe lista ordonată pentru a construi etapele de căutare prin divizarea listei repetat pentru a se „apropia” cât mai mult de valoarea căutată. Propriu-zis cauți valoarea de la mijlocul listei, o compari cu cea țintită și renunți la jumătate celor care nu corespund, fie că sunt mai mici sau prea mari. În limbaj matematic am putea spune că numărul de pași necesari pentru a ajunge la valoarea căutată este logaritm în baza 2 de n pași.

Adu-ți mereu aminte faptul că logaritmii sunt inversarea puterilor. Dacă în cazul puterilor spunem, de exemplu, că 10 la a treia este 1000, logaritmul este log în baza 10 de 1000, ceea ce este egal cu 3.
