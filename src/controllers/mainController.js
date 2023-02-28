// libreria de node para leer y obtener archivos.
const fs = require('fs');
// libreria para concatenar y obtener rutas.
const path = require('path');


// indico la ruta de mi archivo .json, la abosulta.
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// primero lee el archivo mencionado en la linea de arriba y la guardo en un array. Guardo en un array los productos del .json.
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// esto es como para formatear numeros, relacionado con las comas y puntos. Opcional.
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// se pone solo el index porque la carpeta views ya la mencionamos. 
		res.render("index", { 
		// le mando la variable creada mas arriba, para que tenga los productos. Si se llama igual puedo poner un solo products.
			products : products
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
