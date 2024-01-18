var express = require('express');
var router = express.Router();

var passport = require('passport') // ver o que faz !!!
var jwt = require('jsonwebtoken')
var secrets = require('docker-secret').secrets;

const controllerLogin = require('../controllers/login');
const { sendEmail, getDateTime, isAdmin, hasAccess, isMe } = require('../utils/utils');

var axios = require('axios');

// URL do container user
const API_URL_USER = 'http://api/user';

// ---------------------------------------------

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


// ----------------------------------------------------

// POST -> [admin] fazer registo de um utilizador
router.post('/admin/registo', isAdmin, function (req, res) {
	if (req.body.email && req.body.password && req.body.nivel) {
		var info = {
			...req.body,
			dataRegisto: getDateTime()
		}

		controllerLogin.registar(info)
			.then(u => {
				data = {
					...info,
					_id: u._id,
					role: u.nivel
				}

				var configCookies = { headers: { Cookie: 'token=' + req.cookies.token } }
				axios.post(API_URL_USER, data, configCookies)
					.then(resp1 => {
						if (resp1 && resp1.status == 200 && resp1.data) {
							res.status(201).jsonp({ message: "OK" })
						}
						else {
							//apagar do login !!!
							controllerLogin.deleteLogin(u.username)
								.then(del => {
									if (del && del.acknowledged == true && del.deletedCount == 1) {
										res.status(400).jsonp({ error: "1. Erro na criação do utilizador: " + resp1.data })
									}
									else {
										console.log("Erro na criação do user: " + u._id + " error: " + resp1.data + " , BD corrompida, insucesso ao apagar login com _id: " + u._id)
										res.status(477).jsonp({ error: "1. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })
									}
								})
								.catch(error1 => {
									var errorString1 = error1
									console.log("Erro na criação do utilizador, BD corrompida, contacte admins! _id: " + u._id + "\nerror1: " + errorString1 + "\nerror2: " + resp1.data)
									res.status(477).jsonp({ error: "2. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })
								})
						}
					})
					.catch(error2 => {
						//apagar do login !!!
						var errorString2 = (error2 && error2.response && error2.response.data && error2.response.data.message) ? error2.response.data.message : "Erro desconhecido"
						controllerLogin.deleteLogin(u.username)
							.then(d => {
								if (d && d.acknowledged == true && d.deletedCount == 1) {
									res.status(400).jsonp({ error: "2. Erro na criação do utilizador: " + errorString2 })
								}
								else {
									console.log("Erro(" + errorString2 + ") na criação do user _id: " + u._id + ", BD corrompida, login _id: " + u._id + " não apagado")
									res.status(477).jsonp({ error: "3. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })
								}
							})
							.catch(error3 => {
								console.log("Erro(" + errorString2 + ") na criação do user _id: " + u._id + ", BD corrompida, login _id: " + u._id + " deu erro ao apagar: " + error3)
								res.status(477).jsonp({ error: "4. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })
							})
					})

			})
			.catch(erro => {
				res.status(400).jsonp({ error: "3. Erro na criação do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});
// POST -> fazer o registo de um utilizador
router.post('/registo', function (req, res) {
	if (req.body.email && req.body.password) {
		var info = {
			...req.body,
			nivel: "client",
			dataRegisto: getDateTime()
		}

		controllerLogin.registar(info)
			.then(u => {
				data = {
					...info,
					_id: u._id,
					role: u.nivel
				}

				axios.post(API_URL_USER + '/client', data)
					.then(resp1 => {
						if (resp1 && resp1.status && resp1.status == 200){
							res.status(200).jsonp({ message: "OK" })
						}
						else {
							//apagar do login !!!
							controllerLogin.deleteLogin(u.username)
								.then(del => {
									if (del && del.acknowledged == true && del.deletedCount == 1) {
										res.status(400).jsonp({ error: "1. Erro na criação do utilizador: " + resp1.data })
									}
									else {
										console.log("Erro na criação do user: " + u._id + " error: " + resp1.data + " , BD corrompida, insucesso ap apagar login com _id: " + u._id)
										res.status(477).jsonp({ error: "1. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })
									}
								})
								.catch(error1 => {
									var errorString1 = error1
									console.log("Erro na criação do utilizador, BD corrompida, contacte admins! _id: " + u._id + "\nerror1: " + errorString1 + "\nerror2: " + resp1.data)
									res.status(477).jsonp({ error: "2. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })
								})
						}
					})
					.catch(error2 => {
						var errorString2 = (error2 && error2.response && error2.response.data && error2.response.data.message) ? error2.response.data.message : "Erro desconhecido"
						//apagar do login !!!
						controllerLogin.deleteLogin(u.username)
							.then(d => {
								if (d && d.acknowledged == true && d.deletedCount == 1) {
									res.status(400).jsonp({ error: "2. Erro na criação do utilizador: " + errorString2 })
								}
								else {
									console.log("Erro(" + errorString2 + ") na criação do user _id: " + u._id + ", BD corrompida, login _id: " + u._id + " não apagado")
									res.status(477).jsonp({ error: "3. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })
								}
							})
							.catch(error3 => {
								console.log("Erro(" + errorString2 + ") na criação do user _id: " + u._id + ", BD corrompida, login _id: " + u._id + " deu erro ao apagar: " + error3)
								res.status(477).jsonp({ error: "4. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })
							})
					})

			})
			.catch(erro => {
				res.status(400).jsonp({ error: "3. Erro na criação do utilizador: " + erro })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});

// POST -> fazer login e obter token de acesso
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
							{ expiresIn: "24h" }, //mudar aqui para o tempo de login que for decidido
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

// GET -> [admin] obter informação de um utilizador através do email
router.get('/admin', isAdmin, function (req, res) {
	if (req.body.userEmail) {
		controllerLogin.getLogin(req.body.userEmail)
			.then(u => {
				if (u) {
					res.status(200).jsonp(u)
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

// UPDATE -> [admin] atualizar password de um utilizador através do email
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
// UPDATE -> atualizar email de um utilizador através do email
router.put('/password', isMe, passport.authenticate('local'), function (req, res) { // tem de ter o parametro "username", por causa do isMe, e o parametro password por causa do authenticate
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

// UPDATE -> [Admin] atualizar nivel de um utilizador através do email
router.put('/admin/nivel', isAdmin, function (req, res) {
	if (req.body.userEmail && req.body.userNivel) { // userEmail e userNivel tem de ser passados no body
		controllerLogin.updateLoginNivel(req.body.userEmail, req.body.userNivel)
			.then(u => {
				if (u && u.modifiedCount == 1) {
					// atualizar o nivel no user !?!?!?!? rever
					res.status(200).jsonp({ message: "OK" })
				}

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

// DELETE -> [Admin] apagar um utilizador através do email
router.delete('/admin', isAdmin, function (req, res) {
	if (req.body.email && controllerLogin.existsEmail()) {// email tem de ser passado no body
		controllerLogin.getLogin(req.body.email)
			.then(l => {
				if (l) {
					var configCookies = { headers: { Cookie: 'token=' + req.cookies.token } }
					axios.get(API_URL_USER + '/' + l._id, configCookies)
						.then(resp1 => {
							if (resp1 && resp1.status == 200 && resp1.data) {
								var u = resp1.data
								axios.delete(API_URL_USER + '/' + l._id, configCookies)
									.then(resp2 => {
										if (resp2 && resp2.status == 200) {
											if (resp2.data && resp2.data.acknowledged == true && resp2.data.deletedCount == 1) {
												controllerLogin.deleteLogin(req.body.email)
													.then(del => {
														if (del) {
															if (del && del.acknowledged == true && del.deletedCount == 1) {
																res.status(200).jsonp({ message: "OK" })
															}
															else {
																// adicionar o user de novo !!!!
																axios.post(API_URL_USER, u, configCookies)
																	.then(resp3 => {
																		if (resp3 && resp3.status == 200) {
																			res.status(401).jsonp({ error: "1. Erro ao processar o pedido" })
																		}
																		else {
																			console.log("Erro na criação do utilizador, BD corrompida, contacte admins! _id: " + u._id + "\nerror: " + resp3.data)
																			res.status(477).jsonp({ error: "1. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })

																		}
																	})
																	.catch(error1 => {
																		var errorString1 = (error1 && error1.response && error1.response.data && error1.response.data.message) ? error1.response.data.message : "Erro desconhecido"
																		console.log("Erro na criação do utilizador, BD corrompida, contacte admins! _id: " + u._id + " , error: " + errorString1)
																		res.status(477).jsonp({ error: "2. Erro ao processar o pedido" })
																	})
															}
														}
														else {
															res.status(500).jsonp({ error: "Erro na comunicação dos containers" })
														}
													})
													.catch(error2 => {
														res.status(401).jsonp({ error: "1. Erro na remoção do utilizador: " + error2 })
													})
											}
											else {
												res.status(401).jsonp({ error: "Erro ao processar o pedido, nao apagou" })
											}
										}
										else {
											res.status(401).jsonp({ error: "Erro ao processar o pedido. Erro: " + resp2.data })
										}
									})
									.catch(error3 => {
										var errorString2 = (error3 && error3.response && error3.response.data && error3.response.data.message) ? error3.response.data.message : "Erro desconhecido"
										res.status(401).jsonp({ error: "2. Erro na remoção do utilizador: " + errorString2 })
									})
							}
							else {
								res.status(500).jsonp({ error: "Erro na comunicação de containers" })
							}
						})
						.catch(error4 => {
							var errorString3 = (error4 &&error4.response && error4.response.data && error4.response.data.message) ? error4.response.data.message : "Erro desconhecido"
							res.status(401).jsonp({ error: "Erro na obtenção do user: " + errorString3 })
						})
				}
				else {
					res.status(401).jsonp({ error: "Utilizador não encontrado" })
				}
			})
			.catch(error5 => {
				res.status(401).jsonp({ error: "Erro na obtenção do login: " + error5 })
			})
	}
	else {
		res.status(400).jsonp({ error: "Falta de parametros" })
	}
});
// DELETE -> enviar email com código de verificação para apagar a conta de um utilizador
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
// DELETE -> apagar a conta de um utilizador após verificar o código fornecido	
router.post('/apagar-verificar', isMe, function (req, res) { // tem de ter o parametro "username", por causa do isMe
	controllerLogin.verifyRecoveryCode(req.user, req.body.code) // code tem de ser passado no body
		.then(b => {
			if (b) {
				controllerLogin.getLogin(req.user)
					.then(l => {
						if (l) {
							if (l.nivel == "client") {
								var configCookies = { headers: { Cookie: 'token=' + req.cookies.token } }
								axios.get(API_URL_USER + '/client/' + l._id, configCookies)
									.then(resp1 => {
										if (resp1 && resp1.status == 200 && resp1.data) {
											var u = resp1.data

											jwt.sign({
												level: 'auth'
											},
												secrets.AUTH_KEY,
												{ expiresIn: "5min" }, //1 minuto
												function (e, tokenAUTH) {
													if (e) {
														res.status(500).jsonp({ error: "Erro na geração do tokenAUTH: " + e })
													}
													else {
														var AUTHcookies = { headers: { Cookie: 'token=' + tokenAUTH } }
														axios.delete(API_URL_USER + '/client/' + l._id, AUTHcookies)
															.then(resp2 => {
																if (resp2 && resp2.status == 200) {
																	if (resp2.data && resp2.data.acknowledged == true && resp2.data.deletedCount == 1) {
																		controllerLogin.deleteLogin(req.body.email)
																			.then(del => {
																				if (del) {
																					if (del && del.acknowledged == true && del.deletedCount == 1) {
																						res.status(200).jsonp({ message: "OK" })
																					}
																					else {
																						// adicionar o user de novo !!!!
																						axios.post(API_URL_USER + '/client', u, AUTHcookies)
																							.then(resp3 => {
																								if (resp3 && resp3.status == 200) {
																									res.status(401).jsonp({ error: "1. Erro ao processar o pedido" })
																								}
																								else {
																									console.log("Erro na criação do utilizador, BD corrompida, contacte admins! _id: " + u._id + "\nerror: " + resp3.data)
																									res.status(477).jsonp({ error: "1. Erros críticos na criação do utilizador, BD corrompida, contacte admins!" })

																								}
																							})
																							.catch(error1 => {
																								var errorString1 = (error1 && error1.data && error1.data.message) ? error1.data.message : "Erro desconhecido"
																								console.log("Erro na criação do utilizador, BD corrompida, contacte admins! _id: " + u._id + " , error: " + errorString1)
																								res.status(477).jsonp({ error: "2. Erro ao processar o pedido" })
																							})
																					}
																				}
																				else {
																					res.status(500).jsonp({ error: "Erro na comunicação dos containers" })
																				}
																			})
																			.catch(error2 => {
																				res.status(401).jsonp({ error: "1. Erro na remoção do utilizador: " + error2 })
																			})
																	}
																	else {
																		res.status(401).jsonp({ error: "Erro ao processar o pedido, nao apagou" })
																	}
																}
																else {
																	res.status(401).jsonp({ error: "Erro ao processar o pedido. Erro: " + resp2.data })
																}
															})
															.catch(error3 => {
																var errorString2 = (error3 && error3.data && error3.data.message) ? error3.data.message : "Erro desconhecido"
																res.status(401).jsonp({ error: "2. Erro na remoção do utilizador: " + errorString2 })
															})
													}
												});
										}
										else {
											res.status(500).jsonp({ error: "Erro na comunicação de containers" })
										}
									})
									.catch(error4 => {
										var errorString3 = (error4 && error4.data && error4.data.message) ? error4.data.message : "Erro desconhecido"
										res.status(401).jsonp({ error: "Erro na obtenção do user: " + errorString3 })
									})
							}
							else {
								res.status(401).jsonp({ error: "O sua role não é legível para apagar a conta, contacte admins" })
							}
						}
						else {
							res.status(401).jsonp({ error: "Utilizador não encontrado" })
						}
					})
					.catch(error5 => {
						res.status(401).jsonp({ error: "Erro na obtenção do login: " + error5 })
					})
			} else {
				res.status(401).jsonp({ error: "Invalid code!" })
			}
		})
		.catch(error6 => {
			res.status(403).jsonp({ error: "Erro na verificação do código: " + error6 })
		})
});

// POST -> enviar email com código de verificação para alterar a password
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
// POST -> alterar a password de um utilizador após verificar o código fornecido
router.post('/esqueci-verificar', passport.authenticate('local'), function (req, res) {
	controllerLogin.verifyRecoveryCode(req.body.email, req.body.code)// email e code tem de ser passados no body
		.then(b => {
			if (b) {
				controllerLogin.updateLoginPassword(req.body.email, req.body.password) // newPassword tem de ser passado no body
					.then(u => {
						if (u && u.modifiedCount == 1)
							res.status(200).jsonp({ message: "OK" })
						else
							res.status(401).jsonp({ error: "Erro ao processar o pedido" })
					})
					.catch(erro => {
						res.status(507).jsonp({ error: "Erro na alteração do utilizador: " + erro })
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
