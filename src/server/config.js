const path = require('path');
const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index.js');

module.exports = (app)=> {

	//Settings
	app.set('port', process.env.PORT || 3001);
	app.set('views', path.join(__dirname,'../views'));
	app.engine('.hbs', exphbs.engine({
		defaultLayout: 'main',
		partialsDir: path.join(app.get('views'), 'partials'),
		layoutsDir: path.join(app.get('views'), 'layouts'),
		extname: '.hbs',
		helpers: require('./helpers'),
		handlebars: allowInsecurePrototypeAccess(Handlebars)
	}));
	app.set('view engine', '.hbs');

	//middlewares
	app.use(morgan('dev'))
	app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
	app.use(express.urlencoded({extended: false}));
	app.use(express.json());

	//routers
	routes(app);

	//static files
	app.use('/public', express.static(path.join(__dirname, '../public')));

	//errorhandlers
	if ('development' === app.get('env')) {
		app.use(errorHandler);
	}

	return app;
}