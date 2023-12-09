var mongoose = require('mongoose')

var Login = new mongoose.Schema({
	email: String, // é unico
	password: String, // password encriptada aparece como "hash" na bd
	nivel: { // admin, client, seller
		type: String,
		enum: ['client', 'seller', 'admin']
	}
}, { _id: false })


module.exports = mongoose.model('loginModel', Login, "logins")
