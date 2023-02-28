const fs = require('fs');
const path = require('path');


// le indico el camino al archivo
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// lo guardo en un array de objetos.
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsController = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", { 
				products : products
			})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
	// le mando con el .find el producto encontrado con ese id
		res.render("detail", { products : products.find(product => product.id == req.params.id)})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
	// Creo la variable nuevo producto, es importante que id sea unico e irrepetible.
		let newProduct = {
			id: Date.now(),
			name : req.body.name,
			price: Number(req.body.price),
			discount: Number(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: req.body.image
		}
	// Pusheo en el array products
		products.push(newProduct)
	// Lo guardo en productsFilePath es la ruta que puse mas arriba, lo convierto en string para poder guardar en el json, eso hace el stringify
	// Le mando products, que es lo que quiero escribir en el archivio productsFilePath, el null y el " " son para orden, salto de linea o algo asi.
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
	// vulevo a /products
		res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productToEdit = products.find((product) => product.id == req.params.id)
		res.render("product-edit-form", { productToEdit })
	},
	// Update - Method to update
	update: function (req, res) {
		products.forEach((product) => {
			if (product.id == req.params.id){
				product.name = req.body.name
				product.price = req.body.price
				product.discount = req.body.discount
				product.description = req.body.description
			}
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		res.render("products", { products : products } );
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = req.params.id
		let newProductList = products.filter((product) => product.id != id)
		fs.writeFileSync(productsFilePath, JSON.stringify(newProductList, null, " "))
		res.redirect("/products");
	}

};


module.exports = productsController;

