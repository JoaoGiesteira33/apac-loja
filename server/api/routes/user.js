var express = require('express');
var router = express.Router();

var controllerUser = require('../controllers/user');
var controllerAuth = require('../../auth/controllers/auth');

// ---------------------------------------------


// GET User Info
router.get('/user/:id', controllerAuth.hasAccess, controllerAuth.isMe, function (req, res, next) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST User Info
router.post('/user', controllerAuth.hasAccess, function (req, res, next) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE User Info
router.put('/user/:id', function (req, res, next) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE User Info
router.delete('/user/:id', function (req, res, next) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});


// ---------------------------------------------


// GET Artist Info
router.get('/artist/:id', function (req, res, next) {
    controllerUser.getArtistInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST Artist Info
router.post('/artist', function (req, res, next) {
    controllerUser.createArtist(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE Artist Info
router.put('/artist/:id', function (req, res, next) {
    controllerUser.updateArtistInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE Artist Info
router.delete('/artist/:id', function (req, res, next) {
    controllerUser.deleteArtist(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});


// ---------------------------------------------

