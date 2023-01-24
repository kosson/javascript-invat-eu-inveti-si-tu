# Revealing Module Pattern

Acest model de organizare a codului se numește *revealing* pentru că programatorul alege care părți vor fi expuse aplicației precum o interfață. Este o versiune îmbunătățită a lui Module.

## Dependințe cognitive

- closures
- Immediately Invoked Function Expressions - IIFE
- Șablonul Module - Module Pattern

## Crearea unui modul

Pe scurt, definești toate variabilele și funcțiile în scope privat și returnezi un obiect anonim la finalul modulului care conține legături către variabilele și metodele pe care dorești să le faci publice.

Avantajul este că sintaxa prezintă mult mai multă consistență, o mai bună izolare. Modelele pe care le vom explora mai jos sunt pentru a forma ochiul cu modalitățile în care funcțiile pot fi folosite pentru a izola funcționalități. Datorită capacității funcțiilor de a face closure-uri, cele care vor fi returnate într-un obiect ce constituie modulul nostru, vor putea accesa datele care existau la momentul contextului de execuție a funcției care a returnat obiectul.

Folosirea unei funcții permite declararea de *variabile private*.

```javascript
var Module = function () {
  var _privat = "Sunt variabilă privată"; // se noteză cu underscore ceea ce intenționăm să ținem privat
  return {
    metoda1: function(){/* prelucrez aici datele lui _privat*/},
    metoda2: function(){/* continui să fac ceva cu datele ascunse */}
  };
};
```

În exemplul de mai sus, soluția nu este cea mai bună pentru că de fiecare dată când am returna obiectul am crea tot atâtea metode care repetă codul absolut inutil. Alternativ, poți folosi acest șablon pentru a returna selectiv:

```javascript
var Module = function () {

  var _privat = "Sunt variabilă privată";

  var metoda1 = function(){/* prelucrez aici datele lui _privat*/};
  var metoda2 = function(){/* continui să fac ceva cu datele ascunse */};

  return {
    metoda1: metoda1,
    metoda2: metoda2
  }
};
```

## Modelul clasic cu IIFE

Introduci într-un IIFE toate funcționalitățile modulului. IIFE-ul va returna un obiect prin a cărui metode poți instrumenta datele din zona așa-zis privată.

```javascript
var modul = (function () {

  var obiectIntern = {prop: "ceva"};

  return {
    metodaApelabila: function(){
      console.log(obiectIntern.prop);
    }
  };
})();
modul.metodaApelabila(); // => ceva
```

Problemele apar atunci când aceste module reprezintă entitățile cu care o aplicație operează cum ar fi un utilizator sau un obiect cu care interacționezi într-un joc, de exemplu. În aceste cazuri, de fiecare dată când un anumit eveniment declanșează crearea unui astfel de modul ce reprezintă o entitate, întreaga funcționalitate se dublează, triplează... codul este copiat inutil.

## Analiză

### Cerințe pentru a avea modelul clasic

- o funcție container care să se execute. Nu este neapărat necesar să fie un IIFE.
- una sau mai multe funcții interne, care sunt returnate la apelarea acelei funcții și care realizează un clojure peste scope-ul intern al funcției container.

### Cum funcționează

A. O funcție anonimă împachetează mai multe funcții interne. Aceasta creează un scope distinct care izolează interiorul de global.
B. Funcția anonimă *conține* toate celelalte funcții, care, de fapt sunt funcționalitățile modulului.
C. Rezultatul execuției nu este stocat în variabilă pentru că funcția anonimă deja a fost executată.
D. În *interior* (scope) se construiește un obiect cu referințe către funcțiile care vor fi *publice*, adică vor putea fi invocate.
E. În *interior* (scope) pot exista și alte funcționalități auxiliare care să fie de ajutor.
F. Se construiește un obiect care *strânge* toate referințele către funcțiile din scope-ul funcției container.
G. Obiectul este returnat.
H. Variabila căreia îi este atribuit IFFE-ul, de fapt, menține o referință către obiectul returnat, care la rândul său este o colecție de referințe.

Astfel, pot fi ascunse toate detaliile de implementare și prin returnare (ca în cazul API-urilor), sunt expuse părțile care sunt necesare.

## Logica unui API

Folosind acest model poți să tratezi modulul ca o interfață prin care ai acces la funcționalități și date. Dacă dorești să lucrezi cu date externe, vei pasa referințele către acestea ca argumente date IIFE-ului.

```javascript
// exemplu oferit de Kyle Simpson
var foo = (function () {
  var publicAPI = {
    bar: function(){ publicAPI.baz(); },
    baz: function(){ console.log("baz"); }
  };
  return publicAPI;
})();
foo.bar(); // baz
```

La momentul rulării, acest model permite modificări. Modelul anterior, clasic, nu permite modificări. `foo` și `publicAPI` sunt referințe către același obiect, obiectul returnat. Există o diferență totuși: referința către obiectul din modul, nu poate fi utilizată în exteriorul modulului. Modulul care poate fi referit din exterior este numele variabilei, în cazul nostru `foo`. Aceasta este totuși aceeași slăbiciune precum în cazul lui *Module*: atribuirea modulului unei variabile din mediul global. Putem evita acest lucru prin utilizarea unei funcții anonime autoexecutabile care să includă în mediul lexical intern toate entitățile de lucru.

```javascript
(function (window, document, $) {
    // creez un IIFE care va face disponibile funcționalitățile printr-un obiect
    let unModul = (function () {

      function oMetodă () {
          return oValoare++;
      }

      return {
          oValoare: 0,
          oMetodă
      };
        
    })();

    $(document).ready(function () {
        unModul.oMetodă();
    });
    
})(window, document, jQuery);
```

Un modul poate avea puncte de legătură cu mediul înconjurător prin pasarea în IIFE a unor referințe către alte obiecte.

```javascript
(function($, Backbone){
  // codul modulului
}(jQuery, Backbone));
```

### Cum faci un mic plugin?

```javascript
var modul = (function () {
  var obiectDeReturnat = {
    membru: 'un membru public',
    faCeva: function (){
      console.log('ceva din interiorul modulului');
    }
  };
  return obiectDeReturnat;
}());

// în acest moment, modulul conservă și starea internă datorită closure-ului realizat.

var plugin = (function(modul){
  modul.membruDinPlugin = 'membru inserat în modul de plugin';
}(modul || {}));
```

Instantaneu ceea ce se întâmplă este că plugin introduce în obiectul modul un nou membru.

Dezavantajul major acestui șablon este acela că în cazul în care o funcție internă face o referință către o funcție publică, acea funcție publică nu poate fi suprascrisă dacă este nevoie de o corectură.

Un alt dezavantaj este acela că modulul trebuie să fie într-un singur fișier. Și încă un lucru foate important.
