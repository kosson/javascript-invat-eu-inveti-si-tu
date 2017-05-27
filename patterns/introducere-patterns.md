# Șabloane - patterns

Pentru a construi software, de cele mai multe ori este un exercițiu de compunere a unor părți funcționale mai mici cu altele urmând scopul pentru care se face acest lucru.

Vom explora o colecție de șabloane pentru a înțelege mai bine modalitățile de construcție a aplicațiilor. Îți reamintesc faptul că JavaScript este un limbaj de programare care lucrează cu obiecte iar modul în care aranjezi funcționalitățile, scenariul în care generezi un obiect și mai ales ce expune acesta, sunt tot atâtea provocări pe care diferitele șabloane vin să le rezolve.

Povestea spune că în 1994 o carte cu titlul în engleză *Design Patterns: Elements of Reusable Object-Oriented Software* scrisă de patru autori porecliți *Gang of Four* (Gașca celor patru), a fost un jalon important pentru felul în care blocurile funcționale ale unui program sunt organizate. Unul din punctele importante este pledoaria pentru practica compunerii opusă celei bazată pe mecanismele moștenirii. Povestea este și mai veche, de prin 1977, când a fost scrisă o carte (*A Pattern Language: Towns, Buildings, Construction, Oxford.*) dedicată design-ului urban care a inspirat GoF.

GoF au elaborat 23 de șabloane care să poată fi utilizate în programarea orientată pe obiecte. Acestea se subîmpart în trei mari grupuri: de creere, comportamentale și structurale.

În JavaScript pentru a realiza șabloane vei folosi moștenirea prototipală și lanțul prototipal. Vei introduce funcții în obiectul prototip care au avantajul că sunt create o singură dată ceea ce conduce la salvarea memoriei. Doar funcțiile sunt introduse în prototip.

```javascript
var Ceva = function (info) { this.info = info; };
Ceva.prototype.difuzor = function () { console.log(this.info); };
var instanta = new Ceva('Salve!');
instanta.difuzor(); // Salve
```

Odată cu evoluția standardului avem acces și la `Object.create`, cu ajutorul căreia putem evita instanțierea cu `new`.

```javascript
var Ceva = function (info) { this.info = info; };
Ceva.prototype.difuzor = function () { console.log(this.info); };
var instanta = Object.create(Ceva.prototype, {
  info: {
    value: 'Salut!',
    writable: false
  }
});
instanta.difuzor(); // Salut!
```

Favorizarea compunerii și nu a moștenirii bazate pe clase este ideea pe care este promovată și programarea funcțională.

Argumentul principal al programării funcționale este acela că instanțierea obiectelor în baza unei clase conduce la o dependință dictată de clasă, care impune o rigiditate ce trebuie respectată - ierarhie rigidă.

Există chiar și o paradigmă simpatică care spune că pentru a obține o banană, în lumea programării pe obiecte, va trebui să iei gorila care ține banana și întreaga junglă.

## Mantre

- Simplifică crearea de obiectele
- Creează diferite obiecte în funcție de cerințe și necesități

Pattern-uri pentru a crea obiecte:

1. Constructor
2. Module
3. Factory

## Resurse

[Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns)
