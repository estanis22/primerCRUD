// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const mainController = require('../controllers/mainController');

// llamo al metodo que corresponda, el primer parametro es la segunda parte de la ruta y el segundo parametro es que va a hacer cuando entre a la ruta.
// aplica el metodo index de mainController.
// lo exporto como controller en el otro archivo pero aca lo requiero como mainController.
// vienen por get porque quiero obtener algo.
router.get('/', mainController.index); 
router.get('/search', mainController.search); 

module.exports = router;
