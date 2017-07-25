# Typed arrays

Sunt un tip special de array-uri menite să lucreze doar cu array-uri numerice.

Își are originile în necesitatea de a avea o structură de date care să poată fi computată rapid. A venit ca o solicitare a WebGL, o adaptare pentru reprezentări 3D într-un element `canvas`.

A fost gândit ca o depășire a limitărilor pe care le impune reprezentarea numerelor pe 64 de biți în JavaScript. Pentru calculele rapide de care are nevoie mediul 3D, era nevoie de o înbunătățire a calculelor algebrice și cea mai rapidă este cea pe biți direct: *bitwise*. Conceptul este simplu: un număr poate fi reprezentat ca un array de biți cu posibilitatea de a folosi metodele aferente oricărui array.

Typed arrays permit stocarea și manipularea mai multor tipuri numerice:

- număr întreg pe 8 biți cu semn (**int8**),
- număr întreg pe 8 biți fără semn (**uint8**),
- număr pe 16 biți cu semn (**int16**),
- număr pe 16 biți fără semn (**uint16**),
- număr pe 32 de biți cu semn (**int32**),
- număr pe 32 de biți fără semn (**uint32**),
- număr cu virgulă mobilă pe 32 de biți (**float32**),
- număr cu virgulă mobilă pe 64 de biți (**float64**)

Logica este următoarea. Știm că orice număr în JavaScript are o reprezentare pe 64 de biți. În cazul în care avem un număr de doar 8 biți, restul de 56 ar sta inocupați și astfel, o mare risipă.
Typed arrays sunt instrumentul care adresează această problemă.
