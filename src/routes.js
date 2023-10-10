const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

// Rotas de contatos
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

// Rotas de categorias
router.post('/categories', CategoryController.store);
router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;

/*
    Nossas rotas são criadas em um arquivo separado chamado routes.js e é importada
    dentro de index para ser usada pelo nosso app

    Para utilizarmos nossas rotas, buscamos o metodo Router do express e instanciamos numa variável
    chamada router, agora a partir dessa variável podemos criar nossas rotas de get,post, put e
    delete
*/
