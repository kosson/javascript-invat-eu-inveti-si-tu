Creează un obiect pentru o expresie regulată cu scopul de a realiza găsi o secvență de caractere.

Sintaxa: /pattern/flags

pattern: este textul expresiei regulate.
flags:
`g` - global match;
`i` - ignore case;
`m` - multiline - tratează caracterele ^ și $ ca și când ar lucra pe mai multe linii (adică potrivirea pe începutul și finalul fiecărei linii delimitate de \n și \r, nu numai la începutul și finalul întregului șir de caractere);
`u` - unicode - tratează secvența ca puncte de cod în unicode;
`y` - sticky face potrivirea numai după indexul indicat prin proprietatea `lastIndex` a expresiei regulate în șir.

Există două feluri prin care se poate crea un obiect RegExp: notația literală și prin constructor.
