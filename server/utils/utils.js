const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var secrets = require('docker-secret').secrets;

async function send_email(email, subject, text, self = false) {
    const transporter = nodemailer.createTransport({
        host: secrets.EMAIL,
        service: secrets.SERVICE,
        port: secrets.EMAIL_PORT,
        secure: secrets.SECURE,
        auth: {
            user: secrets.USER_EMAIL,
            pass: secrets.USER_PASS,
        },
    });
    await transporter.sendMail({
        from: secrets.USER_EMAIL,
        to: self ? secrets.USER_EMAIL : email,
        subject: subject,
        text: text,
    });
}

function getDateTime() {
    const date = new Date();
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

    // var timeOffset = 0;
    // var PortugalTime = new Date(utcTime + (3600000 * timeOffset));

    // time offset for Portugal is 0, so:
    var PortugalTime = new Date(utcTime);

    return PortugalTime.toISOString().substring(0, 19);
}

function isAdmin(req, res, next) {
    var myToken = req.query.token || req.cookies.token;
    if (myToken) {
        jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
            if (e) {
                res.status(403).jsonp({ error: 'Invalid Token!' });
            } else if (payload.level == 'admin') {
                req.user = payload.username;
                req._id = payload._id;
                req.level = payload.level;
                req.token = myToken;
                next();
            } else {
                res.status(401).jsonp({ error: 'Access denied!' });
            }
        });
    } else {
        res.status(400).jsonp({ error: 'Token not found!' });
    }
}

function hasAccess(req, res, next) {
    var myToken = req.query.token || req.cookies.token;
    if (myToken) {
        jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
            if (e) {
                res.status(403).jsonp({ error: 'Invalid Token!' });
            } else {
                req.user = payload.username;
                req.level = payload.level;
                req._id = payload._id;
                req.token = myToken;
                next();
            }
        });
    } else {
        res.status(400).jsonp({ error: 'Token not found!' });
    }
}

function isMe(req, res, next) {
    var myToken = req.query.token || req.cookies.token;
    if (myToken) {
        jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
            me = req.params.username || req.body.username;
            if (e) {
                res.status(403).jsonp({ error: 'Invalid Token!' });
            } else if (me && payload.username == me) {
                req.user = payload.username;
                req.level = payload.level;
                req._id = payload._id;
                req.token = myToken;
                next();
            } else {
                res.status(401).jsonp({ error: 'Access denied!' });
            }
        });
    } else {
        res.status(400).jsonp({ error: 'Token not found!' });
    }
}

function isMeOrAdmin(req, res, next) {
    var myToken = req.query.token || req.cookies.token;
    if (myToken) {
        jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
            var me = req.params.id;
            if (e) {
                res.status(403).jsonp({ error: 'Invalid Token!' });
            } else if (payload.level == 'admin' || (me && payload._id == me)) {
                req.user = payload.username;
                req._id = payload._id;
                req.level = payload.level;
                req.token = myToken;
                next();
            } else {
                res.status(401).jsonp({ error: 'Access denied!' });
            }
        });
    } else {
        res.status(400).jsonp({ error: 'Token not found!' });
    }
}

function isAdminOrAUTH(req, res, next) {
    var myToken = req.query.token || req.cookies.token;
    if (myToken) {
        jwt.verify(myToken, secrets.AUTH_KEY, function (e, payload) {
            if (e) {
                res.status(403).jsonp({ error: 'Invalid Token!' });
            } else if (payload.level == 'admin') {
                req.user = payload.username;
                req._id = payload._id;
                req.level = payload.level;
                req.token = myToken;
                next();
            } else if (payload.level == 'auth') {
                req.user = payload.username;
                req._id = payload._id;
                req.level = payload.level;
                req.token = myToken;
                next();
            } else {
                res.status(401).jsonp({ error: 'Access denied!' });
            }
        });
    } else {
        res.status(400).jsonp({ error: 'Token not found!' });
    }
}

module.exports = {
    send_email,
    getDateTime,
    isAdmin,
    hasAccess,
    isMe,
    isMeOrAdmin,
    isAdminOrAUTH,
};
