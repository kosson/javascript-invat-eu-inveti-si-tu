# MouseEvent

Este o interfață care implementează interfața UIEvent.
Moștenește de la UIEvent și Event.

Această interfață oferă informații contextuale pentru evenimentele legate de interacțiunea cu ajutorul mouse-ului.

În cazul în care avem element DOM care sunt imbricate creând mai multe niveluri de adâncime, evenimentele legate de mouse vor avea drept țintă pe cel mai adânc dintre ele. Părinții acestuia pot obține notificări privind interacțiunea cu mouse-ul la faza de bubbling.

## Constructorul

`MouseEvent()` creează un obiect MouseEvent.

## Referințe

[4.3. Mouse Events](https://www.w3.org/TR/DOM-Level-3-Events/#events-mouseevents)
