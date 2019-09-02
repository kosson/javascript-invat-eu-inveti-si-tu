# WeakSet

Acest obiect permite introducerea de obiecte într-o colecție.

Un obiect apare o singură dată într-un `WeakSet`. Toate obiectele din `WeakSet` sunt unice. Spre deosebire de colecțiile realizate cu `Set`, un `WeakSet` este o colecție care admite doar obiecte.

Atributul de slab vine din faptul că în cazul în care nu mai sunt referințe către obiectele din set, acestea vor fi colectate la gunoi. Acest lucru mai implică și faptul că nu există o listă a obiectelor aflate în colecție.

Fiți foarte atenți pentru că obiectele `WeakSet` nu sunt enumerabile.
