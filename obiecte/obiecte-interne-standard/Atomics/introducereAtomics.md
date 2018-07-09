# Atomics

Este un obiect care stabilește un domeniu de valori - namespace object.
Se folosește în combinație cu obiecte `SharedArrayBuffer`.
Nu poate fi constructor. Toate proprietățile și metodele lui Atomics sunt statice.

Rolul acestui obiect este să asigure un nivel de consistență a scrierii și citirii acelorași date în memorie cu scopul de a avea predictibilitate și pentru a avea o succesiune a scrierilor și citirilor fără ca aceste operațiuni să fie întrerupte.
