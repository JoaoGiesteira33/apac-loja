var express = require('express');
var router = express.Router();

var passport = require('passport') // ver o que faz !!!
var jwt = require('jsonwebtoken')
var secrets = require('docker-secret').secrets;

const controllerLogin = require('../controllers/login');
//const sendEmail = require('../../chat_v2/utils').send_email;

// ---------------------------------------------

// GET Product Info

function getDateTime() {
	const date = new Date();
	const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

	// var timeOffset = 0;
	// var PortugalTime = new Date(utcTime + (3600000 * timeOffset));

	// time offset for Portugal is 0, so:
	var PortugalTime = new Date(utcTime)

	return PortugalTime.toISOString().substring(0, 16)
}

function isAdmin(req, res, next) {
	var myToken = req.query.token || req.body.token || req.cookies.token
	if (myToken) {
		jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
			if (e) {
				res.status(401).jsonp({ error: "Invalid Token!" })
			}
			else if (payload.level == "admin") {
				req.user = payload.username
				req.level = payload.level
				req.token = myToken
				next()
			}
			else {
				res.status(401).render({ error: "Access denied!" })
			}
		})
	}
	else {
		res.status(401).jsonp({ error: "Token not found!" })
	}
}

function hasAccess(req, res, next) {
	var myToken = req.query.token || req.body.token || req.cookies.token
	if (myToken) {
		jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
			if (e) {
				res.status(401).jsonp({ error: "Invalid Token!" })
			}
			else {
				req.user = payload.username
				req.level = payload.level
				req.token = myToken
				next()
			}
		})
	}
}

function isMe(req, res, next) {
	var myToken = req.query.token || req.body.token || req.cookies.token
	if (myToken) {
		jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
			if (e) {
				res.status(401).jsonp({ error: "Invalid Token!" })
			}
			else if (payload.username == req.params.id) {
				req.user = payload.username
				req.level = payload.level
				req.token = myToken
				next()
			}
			else {
				res.status(401).jsonp({ error: "Access denied!" })
			}
		})
	}
	else {
		res.status(401).jsonp({ error: "Token not found!" })
	}
}

// GET verifica se é admin
router.get('/admin/verificar', isAdmin, function (req, res) {
	res.status(200).jsonp({ message: "OK" })
});
// GET verifica se é seller
router.get('/seller/verificar', hasAccess, function (req, res) {
	if (req.level == "seller") {
		res.status(200).jsonp({ message: "OK" })
	}
	else {
		res.status(401).jsonp({ error: "Access denied!" })
	}
});
// GET verifica se o token é valido
router.get('/verificar', hasAccess, function (req, res) {
	res.status(200).jsonp({ message: "OK" })
});


// GET login list
router.get('/admin/all', isAdmin, function (req, res) {
	controllerLogin.list()
		.then(users => {
			res.jsonp(users)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na obtenção da lista de utilizadores" })
		})
});

// GET login from email admin
router.get('/admin', isAdmin, function (req, res) {
	controllerLogin.getLogin(req.body.userEmail)
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na obtenção do utilizador: " + req.body.userEmail })
		})

});
// GET login from email
router.get('/', isMe, function (req, res) {
	controllerLogin.getLogin(req.user)
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na obtenção do utilizador " + req.user })
		})
});

// POST login admin
router.post('/admin/registo', isAdmin, function (req, res) {
	if (req.body.userEmail && req.body.userPassword && req.body.userNivel) {
		var info = {
			email: req.body.userEmail,
			password: req.body.userPassword,
			nivel: req.body.userNivel,
			dataRegisto: getDateTime(),
			dataUltimoAcesso: ""
		}

		controllerLogin.registar(info)
			.then(u => {
				res.jsonp(u)
			})
			.catch(erro => {
				res.jsonp({ error: erro, message: "Erro na criação do utilizador " + req.body.userEmail })
			})
	}
	else {
		res.jsonp({ error: "Falta de parametros!" })
	}
});
// POST login
router.post('/registo', function (req, res) { // usar um chapta para verificar se é humano e não encher a base de dados com muitos registos de utilizadores !!!!!!
	if (req.body.userEmail && req.body.userPassword) {
		var info = {
			email: req.body.userEmail,
			password: req.body.userPassword,
			nivel: "client",
			dataRegisto: getDateTime(),
			dataUltimoAcesso: ""
		}

		controllerLogin.registar(info)
			.then(u => {
				res.jsonp(u)
			})
			.catch(erro => {
				console.log(erro)
				res.jsonp({ error: erro, message: "Erro na criação do utilizador " + req.body.userEmail })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros!" })
	}
});

// ver mensagem de erros !!!!!!!!!!!!!!!!!!!!


// POST fazer login
router.post('/login', passport.authenticate('local'), function (req, res) {
	controllerLogin.login(req.body.username, getDateTime())
		.then(u => {
			if (u) {
				if(u.modifiedCount == 1){
					controllerLogin.getLogin(req.body.username)
						.then(l => {
							console.log("L: ", l);
							jwt.sign({
								username: l.username,
								level: l.nivel
							},
								secrets.AUTH_KEY, // rever !!!!
								{ expiresIn: "1h" }, //mudar aqui para o tempo de login que for decidido
								function (e, token) {
									if (e)
										res.status(500).jsonp({ error: "Erro na geração do token: " + e })
									else
										{
											console.log("Login do utilizador ", token)
											console.log(jwt.decode(token))
											res.status(201).jsonp({ token: token })
										}
									});
						})
						.catch(erro => {
							res.jsonp({ error: erro, message: "Erro na obtenção do utilizador " + req.body.username })
						})
				}
			}
			else {
				res.status(401).jsonp({ error: "Invalid credentials!" })
			}
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro no login do utilizador " + req.body.username })
		})
});

// UPDATE login email Admin
router.put('/admin/email', isAdmin, function (req, res) {
	if (req.body.userEmail && req.body.newEmail) {
		controllerLogin.updateLoginEmail(req.body.userEmail, req.body.newEmail)
			.then(u => {
				res.jsonp(u)
			})
			.catch(erro => {
				res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.body.userEmail })
			})
	}
	else {
		res.jsonp({ error: "Falta de parametros!" })
	}
});
// UPDATE login email
router.put('/email', isMe, function (req, res) {
	controllerLogin.updateLoginEmail(req.user, req.body.newEmail) // newEmail tem de ser passado no body
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.user })
		})
});

// UPDATE login password Admin
router.put('/admin/password', isAdmin, function (req, res) {
	if (req.body.userEmail && req.body.userPassword) {
		controllerLogin.updateLoginPassword(req.body.userEmail, req.body.userPassword) // userEmail e userPassword tem de ser passados no body
			.then(u => {
				res.jsonp(u)
			})
			.catch(erro => {
				res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.body.userEmail })
			})
	}
	else {
		res.jsonp({ error: "Falta de parametros!" })
	}
});
// UPDATE login password
router.put('/password', isMe, function (req, res) {
	controllerLogin.updateLoginPassword(req.user, req.body.newPassword) // newPassword tem de ser passado no body
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.user })
		})
});

// UPDATE login nivel Admin, apenas faz sentido os admins poderem alterar o nivel de acesso
router.put('/admin/nivel', isAdmin, function (req, res) {
	if (req.body.userEmail && req.body.userNivel) { // userEmail e userNivel tem de ser passados no body
		controllerLogin.updateLoginNivel(req.body.userEmail, req.body.userNivel)
			.then(u => {
				res.jsonp(u)
			})
			.catch(erro => {
				res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.body.userEmail })
			})
	}
	else {
		res.jsonp({ error: "Falta de parametros!" })
	}
});

// DELETE login Admin
router.delete('/admin', isAdmin, function (req, res) {
	if (req.body.userEmail) { // userEmail tem de ser passado no body
		controllerLogin.deleteLogin(req.body.userEmail)
			.then(u => {
				res.jsonp(u)
			})
			.catch(erro => {
				res.jsonp({ error: erro, message: "Erro na remoção do utilizador " + req.body.userEmail })
			})
	}
	else {
		res.jsonp({ error: "Falta de parametros!" })
	}
});

// DELETE login
router.delete('/apagar', isMe, async function (req, res) { // tirar o isMe e meter a enviar um email, criar funcao separada para verificar delete a receber o codigo
	if (controllerLogin.existsEmail(req.user)) {
		const code = controllerLogin.generateRecoveryCode(req.user);

		try {
			const message = `Foi efetuado um pedido de remoção da sua conta.\n\n
			O código para remover a conta é:  ${code}`;

			//await sendEmail(req.user, message); // fazer a funcao de enviar email !!!!!!!
			res.status(200).jsonp({ message: "OK" })
		}
		catch (erro) {
			console.log(erro)
			res.status(500).jsonp({ error: "Falha ao enviar email!" })
		}
	}
});

// DELETE login
router.delete('/apagar-verificar', isMe, function (req, res) {
	if (controllerLogin.checkRecoveryCode(req.user, req.body.code)) { // code tem de ser passado no body
		controllerLogin.deleteLogin(req.user)
			.then(u => {
				res.status(200).jsonp({ message: "OK" })
			})
			.catch(erro => {
				res.status(507).jsonp({ error: erro, message: "Erro na remoção do utilizador " + req.user })
			})
	}
	else {
		res.status(401).jsonp({ error: "Invalid code!" })
	}
});

router.get('/admin/esqueci', isAdmin, function (req, res) { // admin mudar a palavra pass de um utilizador sem precisar do recovery code
	if (controllerLogin.existsEmail(req.body.email)) { // email tem de ser passado no body
		controllerLogin.updateLoginPassword(req.body.email, req.body.password) // newPassword tem de ser passado no body
			.then(u => {
				res.status(200).jsonp({ message: "OK" })
			})
			.catch(erro => {
				res.status(507).jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.body.email })
			})
	}
	else {
		res.status(401).jsonp({ error: "Email not found!" })
	}
});
router.get('/esqueci', async function (req, res) {
	if (controllerLogin.existsEmail(req.body.email)) { // email tem de ser passado no body
		const code = controllerLogin.generateRecoveryCode(req.body.email);

		try {
			const message = `Foi efetuado um pedido de alteração da password da sua conta.\n\n
			O código para recuperar a password é:  ${code}`;

			//await sendEmail(req.body.email, message); // fazer a funcao de enviar email !!!!!!!
			res.status(200).jsonp({ message: "OK" })
		}
		catch (erro) {
			console.log(erro)
			res.status(500).jsonp({ error: "Falha ao enviar email!" })
		}
	}
	else {
		res.status(401).jsonp({ error: "Email not found!" })
	}

});
router.post('/esqueci-verificar', function (req, res) {
	if (controllerLogin.checkRecoveryCode(req.body.email, req.body.code)) { // email e code tem de ser passados no body
		//change password
		controllerLogin.updateLoginPassword(req.body.email, req.body.password) // newPassword tem de ser passado no body
			.then(u => {
				res.status(200).jsonp({ message: "OK" })
			})
			.catch(erro => {
				res.status(507).jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.body.email })
			})
	}
	else {
		res.status(401).jsonp({ error: "Invalid code!" })
	}
});

module.exports = router;
