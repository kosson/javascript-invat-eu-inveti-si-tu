var Baza = function (){

  setariDB = {};

  var saveInfo = function saveInf(){
    console.log("Salvez informatii in baza de date");
  };

  var getFromDB = function getFrBb(id) {
    console.log("Obtin din baza de date informatii");
  };

  return {
    save: saveInfo,
    get: getFromDB
  }
};

module.exports = Baza;
