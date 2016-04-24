// ((
//   'use strict'
//
//   var x = 1;
//
//   var opCtrl = require('./controller');
//   var opDatabase = require('./databasesim');
//
//   opCtrl.getInfo('Dolly', 'caine');
//   opCtrl.saveEntitate({nume: 'Dolly', tip: 'caine'});
// )());

var opCtrl = require('./controller');


var ISS = new opCtrl({nume: 'ISS', tip: 'statie'});

ISS.getInfo();
ISS.saveInfo();
