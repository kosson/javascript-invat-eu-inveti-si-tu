var Factory = function (){

  var repos = [
    {name : "prelucrare", source : "./modulePrelucrare.js"},
    {name : "baza", source : "./moduleBaza.js"}
  ];

  repos.forEach(
    function (repo) {
      this[repo.name] = require(repo.source)();
    }, this
  );

  // în acest moment „this” se va încărca cu referințele către obiectele generate de servicii (Revealing Modules)
};

module.exports = new Factory;
