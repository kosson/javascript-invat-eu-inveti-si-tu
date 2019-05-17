# DOMPoint

Este un punct într-un spațiu bidimensional sau tridimensional. Acest punct este definit de trei valori care-l poziționează în spațiul tridimensional plus o alta care indică perspectiva.

O valoare pozitivă pentru `x` înseamnă o poziționare către dreapta originii.
O valoare pozitivă pentru `y` înseamnă o poziționare către marginea de jos a ecranului începând de la origine.
O valoare pozitivă pentru `z` înseamnă o poziționare în spațiu dinpre ecran către utilizator.

Dacă matricea este 2D, coordonata z poate fi 0 sau -0, iar pespectiva este 1. În caz contrar vorbim despre o transfromare 3D.

## Constructor

DOMPoint(x, y, z, w) este constructorul care creează și returnează un DOMPoint.

