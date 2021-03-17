# Obiectul intern Date

Obiectele `Date` măsoară timpul scurs de la 1 ianuarie 1970 UTC în milisecunde.

Apelarea ca funcție `Date()`, va returna un string cu valoarea timpului. Instanțierea cu `new`, va crea un obiect `Date` ale cărui proprietăți pot fi folosite.

## Mantre

-   Dacă `Date` nu are argumente, din poziția sa de constructor, va creea un obiect pentru data și ora curentă obținute de la sistem.
-   Dacă sunt introduse cel puțin două argumente, cele lipsă sunt setate la `1` (pentru zi) sau la `0` pentru restul argumentelor.
-   Limitele lui `Date` sunt între 100.000.000 zile și 100.000.000 zile cu 1 ian. 1970 la centru.
-   Numărul de argumente gestionate de constructor este 7 și poate fi aflat prin invocarea `Date.length`.

Când `Date` joacă rol de constructor, poate primi diferite valori ca argumente:

-   o **valoare**, numărul de milisecunde scurs de la 1 ianuarie 1970
-   un **șir** care reprezintă o dată. Acest șir de caractere trebuie să poată fi interpretat de `Date.parse()`, adică să fie conforme cu RFC 2822 sau ISO 8601
-   și opțional: an, lună, zi, oră, minut, secundă, milisecundă

Pentru an, valorile de la 0 la 99 se potrivește intervalului de ani de la 1900 la 1999.

Proprietăți:

-   `Date.prototype`
-   `Date.length`

## Copierea obiectului dată

Uneori ai nevoie să copiezi obiectul dată pentru a face calcule având drept referință o anumită dată calendaristică. Din nefericire, pentru a copia un obiect tip dată, nu funcționează `Object.assign` și nici spreading-ul.

```javascript
let stringToDate = (dateString) => {
    return new Date(dateString);
};

const dbOptions = {
    autoBackup: true,
    removeOldBackup: true,
    keepLastDaysBackup: 3,
    autoBackupPath: '/backup'
};


let beforeDate,
    date          = new Date(),
    currentDate   = stringToDate(date),
    newBackupDir  = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate(),
    newBackupPath = dbOptions.autoBackupPath + '-mongodump-' + newBackupDir;

console.log(date);
console.log(JSON.stringify(currentDate));

// Dacă ai activată opțiunea de ștergere a directorului vechi, creează toate coordonatele necesare
if (dbOptions.removeOldBackup == true) {
    beforeDate = new Date(+currentDate);
    // Scade numărul de zile menționat în `dbOptions` pentru a ține backup-ul nou și pentru a-l șterge pe cel vechi
    console.log(beforeDate); //?
    beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup);// setează data cu numărul de zile trecute
    oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
    // old backup(after keeping # of days)
    oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir;
}

console.log(beforeDate);
```

O soluție pe care am descoperit-o este folosirea operatorului unar plus, care are rolul de a converti operandul la un număr. În exemplul de mai sus, vedem cum a fost aplicat acest operator într-un exemplu de cod live folosit pentru a realiza [backup-ul unei baze de date](https://levelup.gitconnected.com/how-to-set-up-scheduled-mongodb-backups-with-a-bit-of-node-js-b81abebfa20). O versiune simplă ar fi următorul exemplu.

```javascript
var orig = new Date();
var copy = new Date(+orig);
```

## Resurse

- [Date Manipulation in JavaScript - A Complete Guide](https://livecodestream.dev/post/date-manipulation-in-javascript-a-complete-guide/)
- [Date | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [How to clone a Date object? | stack overflow](https://stackoverflow.com/questions/1090815/how-to-clone-a-date-object)
