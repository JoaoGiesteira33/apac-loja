var express = require('express');
var router = express.Router();

var passport = require('passport') // ver o que faz !!!
var jwt = require('jsonwebtoken')
var secrets = require('docker-secret').secrets;

const controllerLogin = require('../controllers/login');

// ---------------------------------------------

// GET Product Info

function getDateTime() {
	// timezone de portugal
	var tzoffset = (-1) * 60 * 60 * 1000; //offset in milliseconds
	var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().substring(0, 16)
	return localISOTime
}

function isAdmin(req, res, next) {
	var myToken = req.query.token || req.body.token || req.cookies.token
	if (myToken) {
		jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
			if (e) {
				res.status(401).render('error', { error: "Invalid Token!" })
			}
			else if (payload.level == "admin") {
				req.user = payload.username
				req.level = payload.level
				req.token = myToken
				next()
			}
			else {
				res.status(401).render('error', { error: "Access denied!" })
			}
		})
	}
	else {
		res.status(401).render('error', { error: "Token not found!" })
	}
}

function hasAccess(req, res, next) {
	var myToken = req.query.token || req.body.token || req.cookies.token
	if (myToken) {
		jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
			if (e) {
				res.status(401).render('error', { error: "Invalid Token!" })
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
				res.status(401).render('error', { error: "Invalid Token!" })
			}
			else if (payload.username == req.params.id) {
				req.user = payload.username
				req.level = payload.level
				req.token = myToken
				next()
			}
			else {
				res.status(401).render('error', { error: "Access denied!" })
			}
		})
	}
	else {
		res.status(401).render('error', { error: "Token not found!" })
	}
}

// GET login list
router.get('/admin/all', isAdmin, function (req, res) {
	controllerLogin.list()
		.then(users => {
			res.jsonp(users)
		})
		.catch(err => {
			res.jsonp({ error: err, message: "Erro na obtenção da lista de utilizadores" })
		})
});

// GET login from email
router.get('/admin/:email', isAdmin, function (req, res) {
	if(!req.body.userEmail){
		res.jsonp({error: "Email a modificar inexistente!"})
	}
	else{
		controllerLogin.getLogin(req.body.userEmail)
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na obtenção do utilizador: " + req.params.email })
		})
	}
});

// GET login from email
router.get('/:email', isMe, function (req, res) {
	controllerLogin.getLogin(req.params.email) // vem da barra de navegacao????
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na obtenção do utilizador " + req.params.email })
		})
});

// POST login admin
//router.post('/admin/register', isAdmin, function (req, res) {
// POST login
//router.post('/register', isMe, function (req, res) 
// fazer o resgitro de um utilizador

//UPDATE login info admin
router.update('/admin/:email', isAdmin, function (req, res) {
	if(req.body.userEmail && req.body.userPassword && req.body.userNivel){
		var info = {
			email: req.body.userEmail,
			password: req.body.userPassword,
			nivel: req.body.userNivel
		}

		controllerLogin.updateLogin(info)
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.email })
		})
	}
	else{
		res.jsonp({error: "Falta de parametros!"})
	}
});

// UPDATE login info
router.update('/:email', isMe, function (req, res) {
	var info = {
		email: req.params.email, // vem da barra de navegacao????
		password: req.params.password, // vem da barra de navegacao????
		nivel: req.level
	}

	controllerLogin.updateLogin(info)
	.then(u => {
		res.jsonp(u)
	})
	.catch(erro => {
		res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.email })
	})
});

// UPDATE login email Admin
router.update('/admin/email/:email', isAdmin, function (req, res) {
	if(req.body.userEmail && req.body.newEmail){
		controllerLogin.updateLoginEmail(req.body.userEmail, req.body.newEmail)
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.email })
		})
	}
	else{
		res.jsonp({error: "Falta de parametros!"})
	}
});

// UPDATE login email
router.update('/email/:email', isMe, function (req, res) {
	controllerLogin.updateLoginEmail(req.user, req.params.newEmail) // vem da barra de navegacao????
	.then(u => {
		res.jsonp(u)
	})
	.catch(erro => {
		res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.email })
	})
});

// UPDATE login password Admin
router.update('/admin/password/:email', isAdmin, function (req, res) {
	if(req.body.userEmail && req.body.userPassword){
		controllerLogin.updateLoginPassword(req.body.userEmail, req.body.userPassword)
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.email })
		})
	}
	else{
		res.jsonp({error: "Falta de parametros!"})
	}
});

// UPDATE login password
router.update('/password/:email', isMe, function (req, res) {
	controllerLogin.updateLoginPassword(req.user, req.params.newPassword) // vem da barra de navegacao????
	.then(u => {
		res.jsonp(u)
	})
	.catch(erro => {
		res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.email })
	})
});

// UPDATE login nivel Admin, apenas faz sentido os admins poderem alterar o nivel de acesso
router.update('/admin/nivel/:email', isAdmin, function (req, res) {
	if(req.body.userEmail && req.body.userNivel){
		controllerLogin.updateLoginNivel(req.body.userEmail, req.body.userNivel)
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.email })
		})
	}
	else{
		res.jsonp({error: "Falta de parametros!"})
	}
});


// DELETE login Admin
router.delete('/admin/:email', isAdmin, function (req, res) {
	if(!req.body.userEmail){
		controllerLogin.deleteLogin(req.body.userEmail)
		.then(u => {
			res.jsonp(u)
		})
		.catch(erro => {
			res.jsonp({ error: erro, message: "Erro na remoção do utilizador " + req.params.email })
		})
	}
	else{
		res.jsonp({error: "Falta de parametros!"})
	}
});

// DELETE login
router.delete('/:email', isMe, function (req, res) {
	controllerLogin.deleteLogin(req.user)
	.then(u => {
		res.jsonp(u)
	})
	.catch(erro => {
		res.jsonp({ error: erro, message: "Erro na remoção do utilizador " + req.params.email })
	})
});



// // Send OTP to user
// router.get('/otp/:id', function (req, res) {
// 	User.getUser(req.params.id)
// 		.then(u => {
// 			if (u == null) {
// 				res.status(203).send("Utilizador inexistente!")
// 			}
// 			telegram.send_otp(u.idTelegram).
// 				then(otp => {
// 					var otp = otp.data.result.text.split(":")[1].trim()
// 					console.log(otp)
// 					User.updateUserOTP(req.params.id, otp).
// 						then(u => {
// 							res.status(200).send("OTP criado com sucesso!")
// 						}).
// 						catch(err => {
// 							console.log(err)
// 							res.status(201).send("Erro na atualização do OTP!")
// 						})
// 				}).
// 				catch(err => {
// 					console.log(err)
// 					res.status(202).send("Erro no envio do OTP!")
// 				})
// 		})
// 		.catch(erro => {
// 			console.dir(erro)
// 			res.status(204)
// 		})
// })

// // GET user from id
// router.get('/:id', verificaAcesso, function (req, res) {
// 	User.getUser(req.params.id)
// 		.then(u => {
// 			res.jsonp(u)
// 		})
// 		.catch(erro => {
// 			res.jsonp({ error: erro, message: "Erro na obtenção do utilizador " + req.params.id })
// 		})
// });

// router.post('/registar', function (req, res) {
// 	var data = getDateTime()
// 	userModel.register(
// 		new userModel({
// 			_id: req.body.username,
// 			username: req.body.username,
// 			idTelegram: req.body.idTelegram,
// 			nivel: req.body.nivel,
// 			filiacao: req.body.filiacao,
// 			ativo: false,
// 			dataRegisto: data,
// 			dataUltimoAcesso: ""
// 		}),
// 		req.body.password,
// 		function (err, user) {
// 			if (err)
// 				res.status(520).jsonp({ error: err, message: "Register error: " + err })
// 			else
// 				res.status(201).jsonp('OK')
// 		})
// })

// router.post('/login', passport.authenticate('local'), function (req, res) {
// 	jwt.sign({
// 		username: req.user.username,
// 		nivel: req.user.nivel,
// 		sub: 'Acordaos'
// 	},
// 		"acordaos-secret-key",
// 		{ expiresIn: "1h" },
// 		function (e, token) {
// 			if (e) res.status(500).jsonp({ error: "Erro na geração do token: " + e })
// 			else res.status(201).jsonp({ token: token })
// 		});

// })

// router.post('/verificar', function (req, res) {
// 	jwt.verify(req.body.token, "acordaos-secret-key", function (e, payload) {
// 		if (e) {
// 			res.status(401).jsonp({ error: e })
// 		}
// 		else {
// 			res.status(200).jsonp(payload)
// 		}
// 	})
// })

// // check if otp sent is equal to user otp
// router.post('/esqueci', function (req, res) {
// 	User.getUser(req.body.username)
// 		.then(u => {
// 			if (u.otp == req.body.otp) {
// 				User.updateUserPassword(u._id, req.body.password).
// 					then(u => {
// 						res.status(200).jsonp({ message: "OK" })
// 					}).
// 					catch(err => {
// 						res.status(500).jsonp({ error: err })
// 					})
// 			}
// 			else {
// 				res.status(401).jsonp({ error: "OTP inválido!" })
// 			}
// 		})
// 		.catch(erro => {
// 			res.status(401).jsonp({ error: erro })
// 		})
// })

// router.put("/editar", function (req, res) {
// 	var atualizacao = req.body.dados
// 	User.updateUser(req.body.username, atualizacao).
// 		then(u => {
// 			res.status(200).jsonp({ message: "OK" })
// 		}).
// 		catch(err => {
// 			res.status(500).jsonp({ error: err })
// 		})
// })

// router.put('/:id', verificaAcesso, function (req, res) {
// 	User.updateUser(req.params.id, req.body)
// 		.then(u => {
// 			res.jsonp(u)
// 		})
// 		.catch(erro => {
// 			res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.id })
// 		})
// })

// // ativa o utilizador e atualiza a data do ultimo acesso
// router.put('/:id/ativar', verificaAcesso, function (req, res) {
// 	User.updateUserStatus(req.params.id, true, getDateTime())
// 		.then(u => {
// 			res.jsonp(u)
// 		})
// 		.catch(erro => {
// 			res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.id })
// 		})
// })

// router.put('/:id/desativar', function (req, res) {
// 	User.updateUserStatus(req.params.id, false, getDateTime())
// 		.then(u => {
// 			console.dir(u)
// 			res.jsonp(u)
// 		})
// 		.catch(erro => {
// 			res.jsonp({ error: erro, message: "Erro na alteração do utilizador " + req.params.id })
// 		})
// })

// router.delete('/:id', verificaAcesso, function (req, res) {
// 	User.deleteUser(req.params.id)
// 		.then(u => {
// 			res.jsonp(u)
// 		})
// 		.catch(erro => {
// 			res.jsonp({ error: erro, message: "Erro na remoção do utilizador " + req.params.id })
// 		})
// })

module.exports = router;
