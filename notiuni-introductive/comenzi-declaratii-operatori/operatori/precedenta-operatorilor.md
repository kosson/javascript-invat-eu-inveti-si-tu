# Precedența operatorilor

Ca și în cazul matematicii, operatorii au o anumită ordine, o anumită întâietate la evaluare a unora față de alții. Ne aducem aminte de la aritmetică că înmulțirea se face înaintea adunării și a scăderii.

Și în cazul limbajelor de programare avem de-a face cu operatori care vor determina cum ca fi evaluat codul din stanga operatorului cu cel din dreapta operatorului.

## Asociativitatea

Este o proprietate care indică ordinea în care sunt procesați operatorii de același rang.

```javascript
1 + 2 + 3
```

Asociativitate stângă este atunci când grupezi termenii din partea stângă:

```javascript
(1 + 2) + 3
```

iar asociativitatea dreaptă este atunci când poți grupa termenii de la dreapta:

```javascript
1 + (2 + 3)
```

Asociativitatea dreaptă funcționează și pentru următorul exemplu:

```javascript
x = y = 1;
```

Ceea ce se petrece este asignarea valorii 1 lui y, iar y este asignat lui x.

Modul în care se face evaluarea codului depinde în mod direct de precedența operatorilor și a felului cum aceștia decid, de fapt, valoarea finală.

În ordinea importanței avem primii trei:

- virgula [comma]
- spread
- yield și yield*
