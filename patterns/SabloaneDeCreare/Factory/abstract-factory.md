# Abstract factory

Este un șablon folosit atunci când nu știi tipul obiectelor pe care le vei crea. Este folosit și pentru a creea obiecte fără a cunoaște ce fel de obiecte vor fi create. Propriu-zis ceea ce creezi este o interfață cu mediul extern al funcției pe care o folosești pentru a crea obiectele.

```javascript
// definesc primul tip de obiect pe care am să-l pot instanția
function SolidPoliedru () {
    this.tipul = `poliedru`;
};
SolidPoliedru.prototype.creează = function (fețe) {
    this.entitate = `Am creat un poliedru cu ${fețe}`;
    return this;
}
// creez cel de-al doilea tip de obiect pe care l-aș putea instanția
function SolidSferă () {
    this.tipul = `sferă`;
};
SolidSferă.prototype.creează = function (fețe) {
    this.entitate = `Am creat o sferă`;
    return this;
}
// definesc Abstract Factory-ul
function SolideFactory () {
    // un registru al posibilelor tipuri de obiecte pe care le pot instanția
    this.registrulObiectelorCreate = {};    
    // creez metoda prin care fac instanțierea obiectelor din registrul celor posibile
    this.creez = function (numărFațete) {
        return new this.registrulObiectelorCreate[numărFațete]().creează();
    };
    // metoda de introducere a obiectelor în registru verificând dacă au o anumită metodă în prototype.
    this.înregistrezObiecteDeCreat = function (fețe, obiectul) {
        // verifică dacă în prototype au o metodă creează. Dacă da, introdu un nou obiect în `registrulObiectelorCreate`. Verifici pur și simplu care este metoda de interfațare existentă. Atenție, JS nu are interfețe!!! În cazul nostru, dacă solidul are o metodă creează, este unul din obiectele pe care dorim să le creăm folosind aceast Factory.
        if (obiectul.prototype.creează) {
            this.registrulObiectelorCreate[fețe] = obiectul;
        }
    }
};

// Folosirea unui Singleton pentru instanțiere
function SolideGeneratorSingleton () {
    var instanță;

    function init () {
        var _totalSolideCreate = [],
            _SF = new SolideFactory(), // instanțiază Factory-ul
            _SF.înregistrezObiecteDeCreat(4, SolidPoliedru),
            _SF.înregistrezObiecteDeCreat(0, SolidSferă);
    }

    function creează (numarDeFațete) {
        var solid = _SF.creez(numărFațete)
    }

    if (!instanță) {
        instanță = init();
        return instanță;
    }
}