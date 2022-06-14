const mongoose = require('mongoose');
//La base de datos tiene que ser inicializada
//en el cmd con el comand 'mongod --ipv6'

const { database } = require('./keys');

mongoose.connect(database.URI)
	.then((db) => {
		console.log('DB is connected')
	})
	.catch((err) => {
		console.log(err)
	});
