# Aplicarea funcțiilor

Este procedura de ***aplicare*** a unei funcții argumentelor sale pentru a produce o valoare care să fie returnată.

Profesorul Christopher Strachey spune:

> Aplicarea unei funcții argumentelor sale implică evaluarea expresiei care o definește după ce au fost date valori variabilelor conectate la acestea din lista argumentelor.
Astfel, valoarea-R a funcției conține două părți: o regulă pentru evaluarea expresiei și un mediu care să-i ofere variabilele libere.

## Aplicare parțială

Aplicarea parțială este procesul de aplicare a unei funcții unei părți a argumentelor. Funcția este returnată pentru a fi folosită ulterior. Pe scurt, o funcție ia o funcție cu parametri multipli și returnează o funcție cu mai puțini parametri.

```javascript
const prima = (functie, arg) => function (...set) {
  return functie.call(this, arg, ...set);
};
const combinaArgs = (a, b) => `am combinat ${a} cu ${b}`;
const finalizare = prima(combinaArgs, ['ping', 'echo']);
finalizare('pong'); // "am combinat ping,echo cu pong"
```

În exemplu avem `prima` care este o funcție ***fat arrow***.

Această funcție primește două argumente:
- o altă funcție și
- un argument
- returnează o funcție

Funcția returnată primește un set pe care-l **desface** - spread.

La rândul ei, această funcție returnată va returna rezultatul aplicării funcției trimisă ca argument funcției gazdă în contextul ei (`this`), pe al doilea argument trimis funcției gazdă și mai multe argumente trimise funcției găzduite.
