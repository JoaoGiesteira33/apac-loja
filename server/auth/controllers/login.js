// Login API controller
//
var Login = require('../models/login')
var crypto = require('crypto')

let tempStorage = {};
let bruteForceProtection = {};

// ---------------------------------------------

/**
 * Regista um novo utilizador
 * @param {Object} info - Informação do utilizador
 * @param {String} info.email - Email do utilizador
 * @param {String} info.nivel - Nivel do utilizador
 * @param {String} info.dataRegisto - Data de registo do utilizador
 * @returns {Promise<Login>} - Promise com o utilizador criado
 */

module.exports.registar = async info => {
	return await Login.register(
		new Login({
			username: info.email,
			nivel: info.nivel,
			dataRegisto: info.dataRegisto
		}),
		info.password)
}

/**
 * Atualiza a data do ultimo acesso do utilizador
 * @param {String} email - Email do utilizador
 * @param {String} data - Data do ultimo acesso
 * @returns {Object} - Objeto com o resultado da operação
 * @returns {Number} Object.matchedCount - Número de documentos compatíveis
 * @returns {Number} Object.modifiedCount - Número de documentos modificados
 * @returns {Number} Object.upsertedCount - _id do documento inserido
 * @returns {Boolean} Object.acknowledged - Operação bem sucedida ou não
 */

module.exports.login = async (email, data) => {
	return Login.updateOne({ username: email }, { "$set": { "dataUltimoAcesso": data } })
}

/**
 * Verifica se um utilizador existe através do seu email
 * @param {String} mail - Email do utilizador
 * @returns {Boolean} - True se existir, false se não existir
 */

module.exports.existsEmail = async mail => {
	try {
		return await Login.findOne({ username: mail }) ? true : false;
	}
	catch (erro) {
		return false;
	}
}

/**
 * Verifica se um utilizador existe através do seu email
 * @param {String} mail - Email do utilizador
 * @returns {Login} - Utilizador encontrado
 */

module.exports.getLogin = async mail => {
	return Login.findOne({ username: mail })
}

/**
 * Atualiza o email de um utilizador
 * @param {String} oldEmail - Email antigo do utilizador
 * @param {String} newMail - Novo email pretendido para o utilizador
 * @returns {Object} - Objeto com o resultado da operação
 * @returns {Number} Object.matchedCount - Número de documentos compatíveis
 * @returns {Number} Object.modifiedCount - Número de documentos modificados
 * @returns {Number} Object.upsertedCount - _id do documento inserido
 * @returns {Boolean} Object.acknowledged - Operação bem sucedida ou não
 * @throws {Error} - Erro se o novo email pretendido já estiver em uso
 */

module.exports.updateLoginEmail = async (oldEmail, newMail) => {
	const l = await Login.findOne({ username: newMail })
	if (l)
		throw new Error("Email already in use!")

	return Login.updateOne({ username: oldEmail }, { "$set": { "username": newMail } })
}

/**
 * Atualiza a password de um utilizador
 * @param {String} mail - Email do utilizador
 * @param {String} password - Nova password pretendida para o utilizador
 * @returns {Login} - Utilizador atualizado
 * @throws {Error} - Erro se o utilizador não existir
 */

module.exports.updateLoginPassword = async (mail, password) => {
	const l = await Login.findOne({ username: mail })
	if (!l)
		throw new Error("User not found!")
	await l.setPassword(password)
	await l.save()
	return l
}

/**
 * Atualiza o nivel de um utilizador
 * @param {String} mail - Email do utilizador
 * @param {String} nivel - Novo nivel pretendido para o utilizador
 * @returns {Object} - Objeto com o resultado da operação
 * @returns {Number} Object.matchedCount - Número de documentos compatíveis
 * @returns {Number} Object.modifiedCount - Número de documentos modificados
 * @returns {Number} Object.upsertedCount - _id do documento inserido
 * @returns {Boolean} Object.acknowledged - Operação bem sucedida ou não
 */

module.exports.updateLoginNivel = async (mail, nivel) => {
	return Login.updateOne({ username: mail }, { "$set": { "nivel": nivel } })
}

/**
 * Apaga um utilizador
 * @param {String} mail - Email do utilizador
 * @returns {Object} - Objeto com o resultado da operação
 * @returns {Boolean} Object.acknowledged - Operação bem sucedida ou não
 * @returns {Number} Object.deletedCount - Número de documentos eliminados
 */

module.exports.deleteLogin = async mail => {
	return Login.deleteOne({ username: mail })
}

/**
 * Apaga informações auxiliares para o processo de verificação de códigos
 * @param {String} userEmail - Email do utilizador
 */
function forceDeleteHash(userEmail) {
	delete tempStorage[userEmail];
	delete bruteForceProtection[userEmail];
}

/**
 * Armazena temporariamente um hash para um utilizador
 * @param {String} userEmail - Email do utilizador
 * @param {String} hash - Hash a armazenar
 */

function storeHashTemporarily(userEmail, hash) {
	tempStorage[userEmail] = hash;
	bruteForceProtection[userEmail] = 3; // 3 attempts

	// Delete the hash after 5 minutes (300000ms)
	setTimeout(() => {
		forceDeleteHash(userEmail);
	}, 300000);
}

/**
 * Verifica se o utilizador já tentou utilizar o código mais do que as vezes permitidas
 * @param {String} userEmail - Email do utilizador
 * @returns {Boolean} - True se já tiver tentado mais do que as vezes permitidas, false se ainda não tiver tentado
 */

function brutedForce(userEmail) {
	bruteForceProtection[userEmail] -= 1;

	return bruteForceProtection[userEmail] < 0;
}

/**
 * Retorna o hash armazenado para um utilizador
 * @param {String} userEmail - Email do utilizador
 * @returns {String} - Hash armazenado
 */

function getStoredHash(userEmail) {
	return tempStorage[userEmail];
}

/**
 * Gera um código de para ação numa conta
 * @param {String} userEmail - Email do utilizador
 * @returns {String} - Código de recuperação de conta
 */

module.exports.generateRecoveryCode = async userEmail => {
	const existsMail = Login.existsEmail(userEmail);
	if (!existsMail)
		return null;

	const recoveryCode = crypto.randomBytes(7).toString('hex').toUpperCase();

	const hash = crypto.createHmac('sha256', secrets.AUTH_KEY).update(recoveryCode).digest('hex');

	storeHashTemporarily(userEmail, hash);

	return recoveryCode;
}

/**
 * Verifica se um código fornecido é válido
 * @param {String} userEmail - Email do utilizador
 * @param {String} submittedCode - Código fornecido
 * @returns {Boolean} - True se o código for válido, false se não for válido
 * @throws {Error} - Erro se o utilizador já tiver tentado utilizar o código mais do que as vezes permitidas
 */
module.exports.verifyRecoveryCode = async (userEmail, submittedCode) => {
	if (!brutedForce(userEmail)) {

		const hashToCheck = crypto.createHmac('sha256', secrets.AUTH_KEY).update(submittedCode).digest('hex');

		const storedHash = getStoredHash(userEmail);

		const result = storedHash === hashToCheck;
		if (result) {
			//prevenir que através de sniffing de pacotes utilizar o mesmo código que já foi utilizado
			forceDeleteHash(userEmail);
		}
	}
	else
		throw new Error("Too many attempts!");
}