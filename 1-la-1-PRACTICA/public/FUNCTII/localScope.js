/**
 * ACCESAREA VARIABILELOR DINTR-O ALTĂ FUNCȚIE REZULTĂ ÎN
 * ReferenceError
 */
var zero = 'zero';

function primo(){
  var x = 'sunt x';
  console.log(zero);
};

function secundo(){
  var zero = 0;
  console.log(zero);
  primo();
  console.log(x);
  // ReferenceError: x is not defined
};

secundo();


/**
 * ACCESAREA VARIABILELOR DINTR-O FUNCȚIE GAZDA ESTE POSIBILĂ
 */
var unu = 'unu';

function gazda(){
  var unu = 1;
  function oaspete(){
    console.log(unu);
  };
  oaspete();
};

gazda();
