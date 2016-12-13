var jsonServer = require('json-server'),
    server = jsonServer.create(),
    router = jsonServer.router('db.json'),
    middlewares = jsonServer.defaults(),
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    server.use(middlewares);
    server.use(router);

server.listen(3000, function () {
  console.log('Serverul JSON ruleaza pe 3000');
});
