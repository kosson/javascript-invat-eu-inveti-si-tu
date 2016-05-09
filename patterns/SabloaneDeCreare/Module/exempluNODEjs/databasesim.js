var dbLucru = function (){

  var getEntitate = function (identificator){
    console.log('Aduc din baza entitatea folosind identificatorul ' + identificator);
  };

  var saveEntitate = function (obiect){
    console.log('Salvez în baza urmatoarele date: ' + obiect);
  };

  return {
    getEntitate: getEntitate,
    saveEntitate: saveEntitate
  };

};

module.exports = dbLucru(); // executand functia ai acces direct la obiect.
