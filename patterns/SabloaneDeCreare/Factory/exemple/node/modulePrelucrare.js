var Prelucrare = function (){

  var getInfo = function(ceva){
    console.log("Scot din serviciu niste date");
    return ceva;
  };

  var setData = function(){
    console.log("Introduce date");
  };

  return {
    get: getInfo,
    set: setData
  }
};

module.exports = Prelucrare;
