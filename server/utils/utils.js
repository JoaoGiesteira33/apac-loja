const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken')
var secrets = require('docker-secret').secrets;

async function send_email(email, subject, text) {
    try{
        console.log("Email:",process.env.EMAIL);
        console.log("Service:",process.env.SERVICE);
        console.log("Port:",process.env.EMAIL_PORT);
        console.log("Secure:",process.env.SECURE);
        console.log("User:",process.env.USER_EMAIL);
        console.log("Pass:",process.env.USER_PASS);

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            }
        });
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: subject,
            text: text
        });
        
        console.log("Email sent successfuly");
    } catch(error){
        console.log("Email not sent", error);
    }
}

function getDateTime() {
	const date = new Date();
	const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

	// var timeOffset = 0;
	// var PortugalTime = new Date(utcTime + (3600000 * timeOffset));

	// time offset for Portugal is 0, so:
	var PortugalTime = new Date(utcTime)

	return PortugalTime.toISOString().substring(0, 19)
}

function isAdmin(req, res, next) {
	var myToken = req.query.token || req.body.token || req.cookies.token
	if (myToken) {
		jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
			if (e) {
				res.status(403).jsonp({ error: "Invalid Token!" })
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
		res.status(400).jsonp({ error: "Token not found!" })
	}
}

function hasAccess(req, res, next) {
	var myToken = req.query.token || req.body.token || req.cookies.token
	if (myToken) {
		jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
			if (e) {
				res.status(403).jsonp({ error: "Invalid Token!" })
			}
			else {
				req.user = payload.username
				req.level = payload.level
				req.token = myToken
				next()
			}
		})
	}
	else {
		res.status(400).jsonp({ error: "Token not found!" })
	}
}

function isMe(req, res, next) {
	var myToken = req.query.token || req.body.token || req.cookies.token
	if (myToken) {
			jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
				me = req.params.username || req.body.username
				if (e) {
					res.status(403).jsonp({ error: "Invalid Token!" })
				}
				else if (me && payload.username == me) {
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
		res.status(400).jsonp({ error: "Token not found!" })
	}
}

function isMeOrAdmin(req, res, next){
	var myToken = req.query.token  || req.body.token || req.cookies.token

	if (myToken) {
		jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
			var me = req.params.id
			if (e) {
				res.status(403).jsonp({ error: "Invalid Token!" })
			}
			else if (payload.level == "admin" || (me && (payload._id == me)) ) {
				req.user = payload.username
				req._id = payload._id
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
		res.status(400).jsonp({ error: "Token not found!" })
	}
}

module.exports = {
    send_email,
    getDateTime,
    isAdmin,
    hasAccess,
    isMe,
	isMeOrAdmin
}
