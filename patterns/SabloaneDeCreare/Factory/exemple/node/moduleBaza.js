var Baza = function (){

  setariDB = {};

  var salveaza = function saveInf(data){
    console.log("Salvez informatii in baza de date");
    return {
      mesaj: 'Am salvat in baza de date'
    }
  };

  var getDinBaza = function getFrBb(id) {
    console.log("Obtin din baza de date informatii");
    return {
      mesaj: 'Am adus din baza datele pentru id-ul primit'
    }
  };

  return {
    save: salveaza,
    get: getDinBaza
  }
};

module.exports = Baza;
