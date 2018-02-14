# `Array.prototype.copyWithin()`

Este o metodă similară lui `Array.prototype.fill()`.

Această metodă copiază o secvență de elemente din array și le inserează în același array la o poziție specificată de primul parametru, fiind suprascrise valorile existente.

Obiectele vor fi copiate începând de la indexul specificat de al doilea parametru cu limita menționată de cel de-al treilea parametru (neinclusiv), fără valoarea acestuia.
Cel de-al treilea argument este opțional și în lipsa lui secvența de valori va lua toate valorile în continuare până la finalul array-ului. Aceste valori vor fi scrise la poziția specificată de primul parametru.

![Array.prototype.copyWithin() exemplificat](ArrayCopyWithin.svg)
