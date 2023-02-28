// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Proceso para manejar archivos ************
// creo el storage donde se va a guardar la info.
const storage = multer.diskStorage({
    // Ubicacion
    destination: (req, file, cb) => {
      cb(null, "./public/images/productImages");
    },
    // Nombre
    filename: (req, file, cb) => {
      // numero unico con el Date.now, un _img y la extension del archivo original.
      let fileName = Date.now() + "_img" + path.extname(file.originalname);
      cb(null, fileName);
    },
  });

  // Constatnte donde genero el metodo a usar para manejar archivos
const uploadFile = multer({ storage });

/*** GET ALL PRODUCTS ***/ 
// antes de la barra hay un /products. Todas las rutas aca tienen previamente un /products.
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
// aca lo mando a /products, como es la unica ruta por post, se puede.
router.post('/', uploadFile.single("image"), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
// va por put porque es para actualizar algo.
router.put('/:id', uploadFile.single("image"), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
