// Login API controller
//
var Login = require('../models/login')
var crypto = require('crypto')

let tempStorage = {};
let bruteForceProtection = {};

// ---------------------------------------------

module.exports.registar = async info => {
	return await Login.register(
		new Login({
			username: info.email,
			nivel: info.nivel,
			dataRegisto: info.dataRegisto,
			dataUltimoAcesso: info.dataUltimoAcesso
		}),
		info.password)
}

module.exports.login = async (email, data) => {
	return Login.updateOne({ username: email }, { "$set": { "dataUltimoAcesso": data } })
}

module.exports.existsEmail = async mail => {
	try {
		return await Login.findOne({ username: mail }) ? true : false;
	}
	catch (erro) {
		return false;
	}
}

module.exports.getLogin = async mail => {
	return Login.findOne({ username: mail })
}

module.exports.updateLoginEmail = async (oldEmail, newMail) => {
	const l = await Login.findOne({ username: newMail })
	if (l)
		throw new Error("Email already in use!")

	return Login.updateOne({ username: oldEmail }, { "$set": { "username": newMail } })
}

module.exports.updateLoginPassword = async (mail, password) => {
	const l = await Login.findOne({ username: mail })
	if (!l)
		throw new Error("User not found!")
	await l.setPassword(password)
	await l.save()
	return l
}

module.exports.updateLoginNivel = async (mail, nivel) => {
	return Login.updateOne({ username: mail }, { "$set": { "nivel": nivel } })
}

module.exports.deleteLogin = async mail => {
	return Login.deleteOne({ username: mail })
}

function forceDeleteHash(userEmail) {
	delete tempStorage[userEmail];
	delete bruteForceProtection[userEmail];
}

function storeHashTemporarily(userEmail, hash) {
	tempStorage[userEmail] = hash;
	bruteForceProtection[userEmail] = 3;

	// Delete the hash after 5 minutes (300000ms)
	setTimeout(() => {
		forceDeleteHash(userEmail);
	}, 300000);
}

function brutedForce(userEmail) {
	bruteForceProtection[userEmail] -= 1;

	return bruteForceProtection[userEmail] < 0;
}

function getStoredHash(userEmail) {
	return tempStorage[userEmail];
}

module.exports.generateRecoveryCode = async userEmail => {
	const existsMail = Login.existsEmail(userEmail);
	if (!existsMail)
		return null;

	const recoveryCode = crypto.randomBytes(7).toString('hex').toUpperCase();

	const hash = crypto.createHmac('sha256', secrets.AUTH_KEY).update(recoveryCode).digest('hex');

	storeHashTemporarily(userEmail, hash);

	return recoveryCode;
}

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