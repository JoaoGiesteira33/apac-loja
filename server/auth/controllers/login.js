// Login API controller
//
var Login = require('../models/login')
var crypto = require('crypto')

let tempStorage = {};
let bruteForceProtection = {};

// ---------------------------------------------

module.exports.registar = async info => {

	const resposta = await Login.findOne({ email: info.email })
	if (resposta)
		throw { error: "Email already in use!" }
	
	return await Login.register(
		new Login({
			email: info.email,
			nivel: info.nivel,
			dataRegisto: info.dataRegisto,
			dataUltimoAcesso: info.dataUltimoAcesso
		}),
		info.password)

}

module.exports.list = async () => {
	try {
		return Login.find()
	} catch (erro) {
		return erro
	}
}

module.exports.existsEmail = async mail => {
	try{
		return await Login.findOne({ email: mail }) ? true : false;
	}
	catch(erro){
		return false;
	}
}

module.exports.login = async (email, password, data) => {
	try{
		await Login.authenticate()(email, password);
		return Login.updateOne({ email: email }, { "$set": { "dataUltimoAcesso": data } })
	}
	catch(erro){
		return erro;
	}
}

module.exports.getLogin = async mail => {
	try {
		return Login.findOne({ email: mail })
	} catch (erro) {
		return erro
	}
}

module.exports.updateLoginEmail = async (mail, newMail) => {
	try{
		const l = await Login.findOne({ email: newMail })
		if (l)
			return { error: "Email already in use!" }

		return Login.updateOne({ email: mail }, { "$set": { "email": newMail } })
	}
	catch(erro){
		return erro;
	}
}

module.exports.updateLoginPassword = async (mail, password) => {
	try {
		const l = await Login.findOne({ email: mail })
		await l.setPassword(password)
		return l.save()
	} catch (erro) {
		return erro
	}
}

module.exports.updateLoginNivel = async (mail, nivel) => {
	try {
		return Login.updateOne({ email: mail }, { "$set": { "nivel": nivel } })
	} catch (erro) {
		return erro
	}
}

module.exports.updateLoginUltimoAcesso = async (mail, data) => {
	try {
		return Login.updateOne({ email: mail }, { "$set": { "dataUltimoAcesso": data } })
	} catch (erro) {
		return erro
	}
}

module.exports.deleteLogin = async mail => {
	return Login.deleteOne({ email: mail })
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
	if(!brutedForce(userEmail)){

		const hashToCheck = crypto.createHmac('sha256', secrets.AUTH_KEY).update(submittedCode).digest('hex');
		
		const storedHash = getStoredHash(userEmail);
		
		const result = storedHash === hashToCheck;
		if (result) {
			//prevenir que através de sniffing de pacotes utilizar o mesmo código que já foi utilizado
			forceDeleteHash(userEmail);
		}
	}
	else
		return false; // ou throw error de tentativas excedidas ??????
}