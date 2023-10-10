const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('⚡ served started at http://localhost:3000'));

/*
  Primeira coisa é dentro de index.js buscar o express
  do pacote do express e instanciar numa variável chamada app

  Após essa variável estar instanciada podemos utilizar métodos como o use para usarmos nossas rotas
  e listen para iniciarmos nosso servidor

*/
