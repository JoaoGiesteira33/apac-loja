var express = require('express');
var router = express.Router();

var passport = require('passport') // ver o que faz !!!
var jwt = require('jsonwebtoken')
var secrets = require('docker-secret').secrets;

const controllerLogin = require('../controllers/login');
const { sendEmail, getDateTime, isAdmin, hasAccess, isMe } = require('../utils/utils');

var axios = require('axios');

// GET -> nao tem body o get
// POST -> adicionar algo
// PUT -> alterar algo
// DELETE -> remover algo

const API_URL_USER = 'http://api/user';

// ---------------------------------------------

// GET verifica se é admin
router.get('/admin/verificar', isAdmin, function (req, res) {
	res.status(200).jsonp({ message: "OK" })
});
// GET verifica se é artist
router.get('/artist/verificar', hasAccess, function (req, res) {
	if (req.level == "artist") {
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

// POST admin fazer um registo
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
				res.status(201).jsonp({ message: "OK" })
			})
			.catch(erro => {
				res.status(400).jsonp({ error: "Erro na criação do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});
// POST fazer um registo
router.post('/registo', function (req, res) { // usar um chapta para verificar se é humano e não encher a base de dados com muitos registos de utilizadores !!!!!!
	if (req.body.email && req.body.password) {
		var info = {
			email: req.body.email,
			password: req.body.password,
			nivel: "client",
			dataRegisto: getDateTime(),
			dataUltimoAcesso: ""
		}

		controllerLogin.registar(info)
			.then(u => {
				console.log("U:", u)
				data = {
					...req.body,
					_id: u._id,
					role: u.nivel
				}
				
				// fazer o registo na outra DB
				axios.post(API_URL_USER + '/client', data)
					.then(response => {
						res.status(200).jsonp({ message: "OK" })
					})
					.catch(error => {
						res.status(400).jsonp({ error: "Erro na criação do utilizador: " + error })
					})

			})
			.catch(erro => {
				res.status(400).jsonp({ error: "Erro na criação do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});

// POST fazer login
router.post('/login', passport.authenticate('local'), function (req, res) {
	controllerLogin.login(req.body.username, getDateTime())
		.then(m => {
			if (m && m.modifiedCount == 1) {
				controllerLogin.getLogin(req.body.username)
					.then(l => {
						jwt.sign({
							username: l.username,
							level: l.nivel,
							_id: l._id
						},
							secrets.AUTH_KEY, // rever !!!!
							{ expiresIn: "1h" }, //mudar aqui para o tempo de login que for decidido
							function (e, token) {
								if (e)
									res.status(500).jsonp({ error: "Erro na geração do token: " + e })
								else {
									res.status(200).jsonp({ token: token })
								}
							});
					})
					.catch(erro => {
						res.status(401).jsonp({ error: erro, message: "Erro na obtenção do utilizador: " + erro })
					})
			}
			else {
				res.status(401).jsonp({ error: "Erro ao processar o pedido" })
			}
		})
		.catch(erro => {
			res.status(401).jsonp({ error: erro, message: "Erro no login do utilizador: " + erro })
		})
});

// GET login information from email admin
router.get('/admin', isAdmin, function (req, res) {
	if (req.body.userEmail) {
		controllerLogin.getLogin(req.body.userEmail)
			.then(u => {
				if (u) {
					info = {
						username: u.username,
						nivel: u.nivel,
						dataRegisto: u.dataRegisto,
						dataUltimoAcesso: u.dataUltimoAcesso
					}
					res.status(200).jsonp(info)
				}
				else
					res.status(401).jsonp({ error: "Utilizador não encontrado" })
			})
			.catch(erro => {
				res.status(401).jsonp({ error: "Erro na obtenção do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});
// GET login from email
router.get('/', isMe, function (req, res) { // tem de ter o parametro "username", por causa do isMe
	controllerLogin.getLogin(req.user)
		.then(u => {
			if (u) {
				info = {
					username: u.username,
					nivel: u.nivel,
					dataRegisto: u.dataRegisto,
					dataUltimoAcesso: u.dataUltimoAcesso
				}
				res.status(200).jsonp(info)
			}
			else
				res.status(401).jsonp({ error: "Utilizador não encontrado" })
		})
		.catch(erro => {
			res.status(401).jsonp({ error: "Erro na obtenção do utilizador: " + erro })
		})
});

// UPDATE login email Admin
router.put('/admin/email', isAdmin, function (req, res) {
	if (req.body.oldEmail && req.body.newEmail) {
		controllerLogin.updateLoginEmail(req.body.oldEmail, req.body.newEmail)
			.then(u => {
				if (u && u.modifiedCount == 1)
					res.status(200).jsonp({ message: "OK" })
				else
					res.status(401).jsonp({ error: "Erro ao processar o pedido" })
			})
			.catch(erro => {
				res.status(401).jsonp({ error: "Erro na alteração do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});

// UPDATE password Admin
router.put('/admin/password', isAdmin, function (req, res) {
	if (req.body.userEmail && req.body.userPassword) {
		controllerLogin.updateLoginPassword(req.body.userEmail, req.body.userPassword) // userEmail e userPassword tem de ser passados no body
			.then(u => {
				if (u)
					res.status(200).jsonp({ message: "OK" })
				else
					res.status(401).jsonp({ error: "Erro ao processar o pedido" })
			})
			.catch(erro => {
				res.status(401).jsonp({ error: "Erro na alteração do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});
// UPDATE password
router.put('/password', isMe, function (req, res) { // tem de ter o parametro "username", por causa do isMe
	if (req.body.newPassword) {
		//inserir aqui a verificação da password antiga !!!!
		controllerLogin.updateLoginPassword(req.user, req.body.newPassword) // newPassword tem de ser passado no body
			.then(u => {
				if (u)
					res.status(200).jsonp({ message: "OK" })
				else
					res.status(401).jsonp({ error: "Erro ao processar o pedido" })
			})
			.catch(erro => {
				res.status(401).jsonp({ error: "Erro na alteração do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});

// UPDATE login nivel Admin, apenas faz sentido os admins poderem alterar o nivel de acesso
router.put('/admin/nivel', isAdmin, function (req, res) {
	if (req.body.userEmail && req.body.userNivel) { // userEmail e userNivel tem de ser passados no body
		controllerLogin.updateLoginNivel(req.body.userEmail, req.body.userNivel)
			.then(u => {
				if (u && u.modifiedCount == 1)
					res.status(200).jsonp({ message: "OK" })
				else
					res.status(401).jsonp({ error: "Erro ao processar o pedido" })
			})
			.catch(erro => {
				res.status(401).jsonp({ error: "Erro na alteração do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});

// DELETE login Admin
router.delete('/admin', isAdmin, function (req, res) {
	if (req.body.userEmail) { // userEmail tem de ser passado no body
		controllerLogin.deleteLogin(req.body.userEmail)
			.then(u => {
				if (u && u.ok == 1 && u.deletedCount == 1)
					res.status(200).jsonp({ message: "OK" })
				else
					res.status(401).jsonp({ error: "Erro ao processar o pedido" })
			})
			.catch(erro => {
				res.status(401).jsonp({ error: "Erro na remoção do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});
// DELETE login, send email to confirm
router.delete('/apagar', isMe, async function (req, res) { // tem de ter o parametro "username", por causa do isMe
	if (controllerLogin.existsEmail(req.user)) {
		const code = controllerLogin.generateRecoveryCode(req.user);

		try {
			const message = `Foi efetuado um pedido de remoção da sua conta.\n\n
			O código para remover a conta é:  ${code}`;

			await sendEmail(req.user, "Remoção de conta", message); //rever funcao implementada !!!!!

			res.status(200).jsonp({ message: "OK" })
		}
		catch (erro) {
			console.log(erro)
			res.status(500).jsonp({ error: "Falha ao enviar email!" })
		}
	}
	else {
		res.status(401).jsonp({ error: "Utilizador não encontrado" })
	}
});
// DELETE login, verify code and delete
router.post('/apagar-verificar', isMe, function (req, res) { // tem de ter o parametro "username", por causa do isMe
	controllerLogin.verifyRecoveryCode(req.user, req.body.code)
		.then(b => {
			if (b) { // code tem de ser passado no body
				controllerLogin.deleteLogin(req.user)
					.then(u => {
						if (u && u.ok == 1 && u.deletedCount == 1)
							res.status(200).jsonp({ message: "OK" })
						else
							res.status(401).jsonp({ error: "Erro ao processar o pedido" })
					})
					.catch(erro => {
						res.status(401).jsonp({ error: "Erro na remoção do utilizador: " + erro })
					})
			}
			else {
				res.status(401).jsonp({ error: "Invalid code!" })
			}
		})
		.catch(erro => {
			res.status(403).jsonp({ error: "Erro na verificação do código: " + erro })
		})
});

// POST esqueci-me da password, send email to confirm
router.post('/esqueci', async function (req, res) {
	if (controllerLogin.existsEmail(req.body.email)) { // email tem de ser passado no body
		const code = controllerLogin.generateRecoveryCode(req.body.email);

		try {
			const message = `Foi efetuado um pedido de alteração da password da sua conta.\n\n
			O código para recuperar a password é:  ${code}`;

			await sendEmail(req.body.email, message); // rever funcao implementada !!!!!!

			res.status(200).jsonp({ message: "OK" })
		}
		catch (erro) {
			console.log(erro)
			res.status(500).jsonp({ error: "Falha ao enviar email!" })
		}
	}
	else {
		res.status(401).jsonp({ error: "Utilizador não encontrado" })
	}

});
// POST esqueci-me da password, verify code and change password
router.post('/esqueci-verificar', function (req, res) {
	controllerLogin.verifyRecoveryCode(req.body.email, req.body.code)
		.then(b => {
			if (b) { // email e code tem de ser passados no body
				controllerLogin.updateLoginPassword(req.body.email, req.body.password) // newPassword tem de ser passado no body
					.then(u => {
						if (u && u.modifiedCount == 1)
							res.status(200).jsonp({ message: "OK" })
						else
							res.status(401).jsonp({ error: "Erro ao processar o pedido" })
					})
					.catch(erro => {
						res.status(507).jsonp({ error: erro, message: "Erro na alteração do utilizador: " + erro })
					})
			}
			else {
				res.status(401).jsonp({ error: "Invalid code!" })
			}
		})
		.catch(erro => {
			res.status(403).jsonp({ error: "Erro na verificação do código: " + erro })
		})
});

module.exports = router;
