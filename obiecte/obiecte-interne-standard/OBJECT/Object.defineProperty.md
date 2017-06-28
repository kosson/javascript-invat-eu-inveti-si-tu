# Object.defineProperty()

Este o metodă prin care poți introduce o proprietate într-un obiect.

Acum ai putea face un salt rapid la `Object.create` pentru a remarca faptul că poți configura cheile unei proprietăți pentru ca aceasta să fie luată în considerare la enumerarea cu `for...in`, de exemplu.

Un aspect important pentru a înțelege și mai bine avantajele oferite de această metodă este acela că o proprietate va fi configurată cu ajutorul unui obiect pe care metoda `Object.defineProperty` și care este denumit generic „descriptor”.

Metoda primește trei argumente: identificatorul obiectului, numele identificatorului viitoarei proprietăți și descrierea sa prin binecunoscuți: `writable`, `enumerable`, `configurable`.

La momentul execuției metodei, obiectul primit ca prim parametru este returnat dar îmbogățit cu noua proprietate setată.

Ce o face specială pe această metodă este faptul că poți seta atributele proprietății sau la nevoie poți face o proprietate accesibilă prin setteri și getteri. Aici vine și diferența față de atribuirea directă a valorilor la momentul creării noii proprietăți: `var obi = {}; obi.ceva = 'txt';`.
Proprietățile introduce într-un obiect prin atribuire vor apărea în prelucrările cu `for...in` sau la numărarea cheilor cu `Object.keys`.

`Object.defineProperty` aduce ceva foarte util: granularitate la introducerea unei noi proprietăți. Din start orice valoare introdusă prin definirea unei proprietăți cu ajutorul lui `Object.defineProperty`, nu poate fi modificată în contrast cu cele introduse prin asignare.
