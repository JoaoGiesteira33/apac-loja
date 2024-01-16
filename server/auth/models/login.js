var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose')

/**
 * @typedef {Object} Login
 * @property {String} username - Username of the user, must be unique and required
 * @property {String} nivel - Nivel of the user, can be client, seller or admin and is required
 * @property {String} dataRegisto - Date of the register, is required
 * @property {String} dataUltimoAcesso - Date of the last access
 */
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
