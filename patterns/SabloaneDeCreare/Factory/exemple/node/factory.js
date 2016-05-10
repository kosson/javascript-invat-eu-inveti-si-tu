var Factory = function (){

  var repositories = this;

  var repos = [
    {name : "prelucrare", source : "./service1.js"},
    {name : "salvare", source : "./service2.js"}
  ];

  repos.forEach(
    function (repo) {
      repositories[repo.name] = require(repo.source)();
    }
  );

};

module.exports = new Factory;
