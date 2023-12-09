// Login API controller
//
var Login = require('../models/login')

// ---------------------------------------------

module.exports.register = login => {
	return Login.findOne({ email: login.email })
		.then(resposta => {
			if (resposta) {
				return { error: "Email already in use!" }
			}
			else {
				return Login.create(login)
					.then(resposta => {
						return resposta
					})
					.catch(erro => {
						return erro
					})
			}
		})
		.catch(erro => {
			return erro
		})
}

module.exports.list = () => {
	return Login
		.find()
		.then(resposta => {
			return resposta
		})
		.catch(erro => {
			return erro
		})
}

module.exports.getLogin = mail => {
	return Login.findOne({ email: mail })
		.then(resposta => {
			return resposta
		})
		.catch(erro => {
			return erro
		})
}

module.exports.updateLogin = info => {
	return Login.findOne({ email: info.email }).
		then(resposta => {
			if (resposta) {
				return { error: "Email already in use!" }
			}
			else {
				return Login.updateOne({ email: info.email }, info)
					.then(resposta => {
						return resposta
					})
					.catch(erro => {
						return erro
					})
			}
		})
		.catch(erro => {
			return erro
		})
}

module.exports.updateLoginEmail = (mail, newMail) => {
	return Login.findOne({ email: newMail }).
		then(resposta => {
			if (resposta) {
				return { error: "Email already in use!" }
			}
			else {
				return Login.updateOne({ email: mail }, { "$set": { "email": newMail } })
					.then(resposta => {
						return resposta
					})
					.catch(erro => {
						return erro
					})
			}
		})
		.catch(erro => {
			return erro
		})
}

module.exports.updateLoginPassword = (mail, password) => {
	return Login.updateOne({ email: mail }, { "$set": { "password": password } })
		.then(resposta => {
			return resposta
		})
		.catch(erro => {
			return erro
		})
}

module.exports.updateLoginNivel = (mail, nivel) => {
	return Login.updateOne({ email: mail }, { "$set": { "nivel": nivel } })
		.then(resposta => {
			return resposta
		})
		.catch(erro => {
			return erro
		})
}

module.exports.deleteLogin = mail => {
	return Login.deleteOne({ email: mail })
		.then(resposta => {
			return resposta
		})
		.catch(erro => {
			return erro
		})
}