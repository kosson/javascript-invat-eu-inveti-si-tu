# Argumentele funcțiilor

Pe scurt, este ceea ce pasezi funcțiilor. Numărul de argumente pasate unei funcții se numește „arity”.
Fiecare parametru trebuie pasat funcției în ordinea corectă.

## Mantre

- argumentele pasate funcțiilor pot avea echivalență în numărul parametrilor declarați sau nu
- o funcție are o proprietate `length`, care nu trebuie confundată cu propritatea cu același nume a parametrului `arguments`. nume_funcție.length returnează câți parametri care au un nume au fost declarați.
- pentru o funcție poți vedea câți parametri au fost declarați (`nume_functie.length`) și câte argumente i-au fost pasate (`arguments.length`).

## Numărul argumentelor la invocare față de numărul parametrilor la declarare

Argumentele pasate unei funcții la momentul invocării trebuie să se potrivească numărului de parametri specificați în declarația funcției și în acceași ordine. Dar sunt cazuri în care numărul argumentelor este mai mare decât cel al parametrilor, precum și cazuri în care numărul argumentelor este mai mic decât cel al parametrilor. Trebuie reținut faptul că JavaScript nu va da vreo eroare atunci când sunt diferențe.

### Numărul argumentelor este mai mare decât al parametrilor

Valorile „în plus” nu vor fi atribuite numelor parametrilor.

### Numărul argumentelor este mai mic decât al parametrilor

Valorile corespondente vor fi atribuite iar parametrii care nu au valori, vor fi setați la `undefined`.

## Setarea unei valori implicite pentru un argument

```js
var test = function(ceva){
  return ceva || 'Valoare implicită';
};

console.log(test('CEVA')); // CEVA
console.log(test());       // Valoare implicită
```

Acesta este un șablon de lucru foarte important care permite utilizarea de valori prestabilite atunci când nimic nu este pasat funcției.

Acest mic șablon se va schimba odată cu folosirea ECMAScript6, când se va putea seta valoarea implicită chiar la pasarea argumentelor:

```js
var test = function(ceva = "Valoare implicită"){
  return ceva;
};
```

## Parametrii arguments și this

La invocarea tuturor funcțiilor suplimentar argumentelor sunt pasați și alți doi parametri automat: `arguments` și `this`. Aceste argumente pasate se vor afla în scope-ul funcției și pot fi referențiate în interiorul funcției precum ceilalți parametri.

### Parametrul `arguments`

Este o colecție a tuturor argumentelor pasate funcției.
Această colecție care pare un array are o proprietate `length`, iar valorile pot fi obținute ca dintr-un array `arguments[0]` și se poate chiar itera cu o ciclare for.

### Parametrul `this`

Acest parametru se referă la obiectul asociat invocării funcții și este cunoscut ca și `contextul funcției` (function context).
