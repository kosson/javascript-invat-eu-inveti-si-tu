var domeniulMeu = domeniulMeu || {};
domeniulMeu.Date = domeniulMeu.Data || {};
domeniulMeu.Date.evenimente = ['ceva important', 'mondenități', 'eveniment politic', 'va fan...'];

domeniulMeu.Broadcaster = function (){
  this.version = '1.0';
  this.id = document.getElementById('carlig');
};

domeniulMeu.Broadcaster.prototype.afiseaza = function (){
  let kontor = domeniulMeu.Date.evenimente.length; // console.log(kontor);
  let elems = [];
  for(elemidx in domeniulMeu.Date.evenimente){
    var pel = document.createElement("p");
    var pelcont = document.createTextNode(domeniulMeu.Date.evenimente[elemidx]);
    pel.appendChild(pelcont);
    elems.push(pel);
  };


};

function onReady(){
  console.log('Totul s-a încărcat');
  let primo = new domeniulMeu.Broadcaster;
  primo.afiseaza();
  // console.log(primo.__proto__.constructor); // function domeniulMeu.Broadcaster()
}

window.onload = onReady;
