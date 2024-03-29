# Memoization

Memoizarea este o strategie de a folosi rezultate care deja au fost computate pentru a le returna în cazul în care funcția pe care o invoci face niște evaluări ce necesită multe resurse. Memoizarea este foarte utilă în cazul utilizării de funcții recursive. Modul de construcție a unei funcții memoizate se leagă de mecanismul de memorare pe care trebuie să-l implementeze. Mecanismul la care apelăm este avantajul pe care îl oferă funcțiile atunci când fac closure. Înțelegerea closure-urilor este esențială în acest moment. Memoizarea trebuie făcută folosind funcții pure.

Ori de câte ori o funcție ajunge la un rezultat îl introduce în argumente. Astfel, ori de câte ori apare o invocare cu un același set de argumente, se va returna rezultatul fără a se mai face computația. Mai jos este un exemplu care implementează *memorizarea* folosindu-se de faptul că o funcție este un obiect căruia îi poți adăuga proprietăți noi.

```javascript
function cautaCeva (valoare) {
  if (!cautaCeva.rezultate) {
    cautaCeva.rezultate = {}; // construiești o memorie a rezultatelor
  }
  if (cautaCeva.rezultate[valoare] !== undefined) {
    return cautaCeva.rezultate[valoare];
    // daca stringul căutat se află în memorie, va fi returnat
  }
  return cautaCeva.rezultate[valoare] = valoare;
};
cautaCeva("ceva");    // "ceva"
cautaCeva("altceva")  // "altceva"
cautaCeva.rezultate;  // Object { ceva: "ceva", altceva: "altceva" }
```

După cum vedem, poți introduce chiar un obiect.

Un alt exemplu adesea folosit este cel al funcțiilor care fac un closure pe mediul unei funcții gazdă. Astfel, vor avea o referință stabilă la mecanismul de stocare a datelor peste care s-a făcut closure. Este ca ți cum am construi un mic mecanism de *cache* - un spațiu în memorie care servește unui serviciu funcțional.

```javascript
const memoizarePatrat = () => {
    let cache = {};
    
    return (valoare) => {
      if (valoare in cache) {
        return cache[valoare]; // servește valoarea din cache
      } else {
        let rezultat = valoare * valoare; // calculează valoarea
        cache[valoare] = rezultat; // bagă valoarea în cache
        return rezultat;
      }
    }
  }
```

O altă metodă ar fi să creezi o funcție cu rol de *decorator* căreia să-i pasezi orice funcție. Funcția pasată va avea un mecanism de memorizare realizat prin closure. Spunem că o funcție care oferă o *memorie* pentru alta găzduită, care este returnată, dar care poate îmbunătăți sau modifica într-un anumit fel modul în care va funcționa accea, o funcție *decorator*. Decorează cu funcționalitate și memorie dedicată o funcție pe care o va returna.

Mai jos este un exemplu care va construi o zonă de cache care este un obiect a cărui chei vor fi reprezentările text ale unor array-uri de foarte mică dimensiune. Utilizarea modelului de mai jos în aplicații practice trebuie evitată.

```javascript
// funcția are rol de decorator
const memoizator = (fn) => {
  let cache = {};

  // returnezi o funcție care transformă argumentele pasate într-un array
  return (...argumente) => {
    if (JSON.stringify(argumente) in cache) {
      console.log(`Cache este `, cache);
      return cache[JSON.stringify(argumente)];
    }
    const rezultat = fn(...argumente); // calculează rezultatul în funcția pe care o pasezi
    cache[JSON.stringify(argumente)] = rezultat; // introdu în cache rezultatul
    return rezultat; // returnează rezultatul
  };
};

function adauga3 (a, b, c) {
  return a + b + c;
};

let adauga3memoizat = memoizator(adauga3);
adauga3memoizat(2, 3, 4, 1); // {[2,3,4,1]: 9}
```
