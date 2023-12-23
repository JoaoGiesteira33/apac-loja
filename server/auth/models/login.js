var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose')

var Login = new mongoose.Schema({
	username: String, // é unico
	password: String, // password encriptada aparece como "hash" na bd
	nivel:
	{ // admin, client, seller
		type: String,
		enum: ['client', 'seller', 'admin']
	},
	dataRegisto: String,
	dataUltimoAcesso: String
})

Login.plugin(passportLocalMongoose )


module.exports = mongoose.model('login', Login, "logins")
