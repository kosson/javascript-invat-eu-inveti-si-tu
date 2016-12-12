var express = require('express'),
    app = express();

app.use(express.static('www'));

app.listen(3000, function(){
  'Server pe portul 3000.'
});
