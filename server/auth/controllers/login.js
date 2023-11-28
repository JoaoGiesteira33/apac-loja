var jwt = require('jsonwebtoken');
var secrets = require('docker-secret').secrets;

function isAdmin(req, res, next) {
    var myToken = req.query.token || req.body.token || req.cookies.token
    if (myToken) {
        jwt.verify(myToken, secrets.auth_key, function (e, payload) { // esconder a chave ???????
            if (e) {
                res.status(401).render('error', { error: "Access denied!" })
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
        jwt.verify(myToken, secrets.auth_key, function (e, payload) { // esconder a chave ???????
            if (e) {
                res.status(401).render('error', { error: "Access denied!" })
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

function isMe(req, res, next){
    if(req.params.id == req.user){
        next()
    }
    else{
        res.status(401).render('error', { error: "Access denied!" })
    }
}