var domeniulMeu = domeniulMeu || {};
domeniulMeu.Date = domeniulMeu.Data || {};
domeniulMeu.Date.evenimente = ['ceva important', 'mondenități', 'eveniment politic', 'va fan...'];

domeniulMeu.Broadcaster = function (){
  this.version = '1.0';
  this.id = document.getElementById('carlig');
};

domeniulMeu.Broadcaster.prototype.elemgen = function elemgen (e){
  var pel = document.createElement("p");
  var pelcont = document.createTextNode(e);
  pel.appendChild(pelcont);
  this.id.appendChild(pel);
};

domeniulMeu.Broadcaster.prototype.afiseaza = function afiseaza(){
  domeniulMeu.Date.evenimente.forEach(this.elemgen, this);
  // let self = this;
  // domeniulMeu.Date.evenimente.map(
  //   function(el){
  //     self.elemgen(el);
  //   }
  //   // el => this.elemgen(el)
  // );
};

function onReady(){
  console.log('Totul s-a încărcat');
  let primo = new domeniulMeu.Broadcaster;
  primo.name = 'Eu sunt Primo';
  primo.afiseaza();
  // console.log(primo.__proto__.constructor); // function domeniulMeu.Broadcaster()
}

window.onload = onReady;
