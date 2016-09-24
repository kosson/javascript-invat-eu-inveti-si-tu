# Obiectul intern String

Este un constructor pentru string-uri.

JavaScript nu face diferență între string-urile între ghilimele și cele duble.

## Mantre
- Pentru a concatena se folosește operatorul `+`.
- JavaScript face o diferență foarte clară între obiectul String și primitiva șir. Același lucru se aplică și în cazul obiectelor Boolean și Number cu ale lor corespondențe la primitive.
- JavaScript face automat conversia de la primitiva șir la obiectul String. Astfel este posibilă aplicarea metodelor obiectului.

Caracterele speciale vor putea fi menționate în string-uri folosindu-se notația escape:

| NULL | ghilimele simple | ghilimele duble | backslash | linie nouă | carriage return | tab vertical | tab | backspace | form feed | Unicode | Latin-1 |
|: ----|:-----------------|: ---------------|: ---------|: ----------|: ---------------|: ------------|: ---|: ---------|: ---------|: -------|: -------|
|  \0  |         \'       |         \"      |     \\    |     \n     |        \r       |      \v      |  \t |     \b    |     \f    |  \uXXXX |   \xXX  |
