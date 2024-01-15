var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose')

var Login = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	nivel:
	{ // admin, client, seller
		type: String,
		required: true,
		enum: ['client', 'seller', 'admin']
	},
	dataRegisto: {
		type: String,
		required: true
	},
	dataUltimoAcesso: {
		type: String,
		default: ''
	}
})

Login.plugin(passportLocalMongoose )


module.exports = mongoose.model('login', Login, "logins")
