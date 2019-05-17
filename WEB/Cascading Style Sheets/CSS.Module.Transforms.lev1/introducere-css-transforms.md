# Introducere CSS Transforms

CSS transforms permite modificarea în plan bidimensional a elementelor stilizate cu CSS. Specificația este la convergența altor două documente:

- CSS 2D Transforms
- SVG transforms

## Terminologie

### user coordinate system

Mai este cunoscut și ca *local coordinate system*.
Sistemul de coordonate stabilește distanțele pe un canvas. *Current local coordinate system* este sistemul de coordonate care este activ și care este folosit pentru a se face calculele. Acest sistem de coordonate al utilizatorului își va avea originea în colțul stânga sus al **reference box** specificat prin proprietatea `transform-box`. Valorile procentuale sunt relative la dimensiunea patrulaterului (*box*) la care se face referința. O singură unitate este un pixel CSS.

### transformation matrix

Este o matrice care permite maparea dintr-o perspectivă matematică dintr-un sistem de coordinate în altul. Această matrice este calculată din valoarea proprietăților `transform` și `transform-origin`.

### current transformation matrix (CTM)

Este o matrice care definește maparea din **local coordinate system** în  **viewport coordinate system**.

### 2D matrix

Este o matrice de transformare 3X2 sau o matrice 4X4.

### identity transform function

O funcție de transformare este echivalentă unei matrici 4X4. 

Exemple:

- translate(0), translateX(0), translateY(0), scale(1), scaleX(1), scaleY(1), rotate(0), skew(0, 0), skewX(0), skewY(0)
- matrix(1,0,0,1,0,0)

## Randarea modelului de transformare

Coordinate space are două axe: X și Y.
Transformările sunt cumulative. Acest lucru înseamnă că, mai întâi de toate, elementele își stabilesc *local coordinate system* în interiorul sistemului de coordonate al părintelui. Din perspectiva utilizatorului, un element acumulează toate proprietățile `transform` ale părinților, precum și toate modificările *local transform* care le sunt aplicate. Acumularea acestor `transforms`, conduce la definirea unui `current transformation matrix` (CTM) pentru element.

Acest `current transformation matrix` este calculat prin înmulțirea tuturor matricilor de transformare pornind de la *viewport coordinate system* și finalizând cu `transformation matrix` a unui element. La final, valoarea matricei de transformare, va fi modificată de fiecare transformare suferită pornind cu părinții. Acest lucru este firesc pentru că orice element este afectat de transformările aplicate părinților.

## Referințe

- [CSS Transforms Module Level 1](https://drafts.csswg.org/css-transforms/)
- [Tutorial 3 : Matrices](https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/)
- [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
- [The CSS3 matrix() Transform for the Mathematically Challenged](http://www.useragentman.com/blog/2011/01/07/css3-matrix-transform-for-the-mathematically-challenged/)

## Dependințe cognitive

- [Spațiu vectorial](https://ro.wikipedia.org/wiki/Spa%C8%9Biu_vectorial)