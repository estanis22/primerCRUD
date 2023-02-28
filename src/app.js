// ************ Require's ************ // requiere las librerias que vamos a estar usando.
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // este es para mandar peticiones a traves de POST.
app.use(logger('dev')); // no hace falta.
app.use(express.json()); // para usar json
app.use(cookieParser()); // no se usa.
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs'); // motor de vistas
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas, no hace falta por la ubicacion en este caso, ya esta dentro de la carpeta views.



// ************ WRITE YOUR CODE FROM HERE ************ Esto ya es MVC.
// ************ Route System require and use() ************
const mainRouter = require('./routes/main'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products

// *********** El primer parametro es la ruta raiz o principal y el segundo es el archivo a usar para resolver esas rutas.
app.use('/', mainRouter);
// todo lo que arranque con /products lo resuelve con esto.
app.use('/products', productsRouter);



// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
