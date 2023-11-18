var express = require('express');
var router = express.Router();

var controllerUser = require('../controllers/user');
var controllerAuth = require('../controllers/accessLevel');

// ---------------------------------------------


// GET Client Info
router.get('/client/:id', /*controllerAuth.hasAccess, controllerAuth.isMeOrAdmin,*/ function (req, res, next) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST Client Info
router.post('/client', /*controllerAuth.hasAccess, controllerAuth.hasLevelAdmin,*/ function (req, res, next) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE Client Info
router.put('/client/:id', /*controllerAuth.hasAccess, controllerAuth.isMeOrAdmin,*/ function (req, res, next) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE Client Info
router.delete('/client/:id', /*controllerAuth.hasAccess, controllerAuth.isMeOrAdmin,*/ function (req, res, next) {
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
router.get('/artist/:id', /*controllerAuth.hasAccess, controllerAuth.isMeOrAdmin,*/ function (req, res, next) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST Artist Info
router.post('/artist', /*controllerAuth.hasAccess, controllerAuth.hasLevelAdmin,*/ function (req, res, next) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE Artist Info
router.put('/artist/:id', /*controllerAuth.hasAccess, controllerAuth.isMeOrAdmin,*/ function (req, res, next) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE Artist Info
router.delete('/artist/:id', /*controllerAuth.hasAccess, controllerAuth.isMeOrAdmin,*/ function (req, res, next) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});


// ----------------------TEST-----------------------

router.get('/client', /*controllerAuth.hasAccess, controllerAuth.hasLevelAdmin,*/ function (req, res, next) {
    controllerUser.getAllUsers()
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});


module.exports = router;
