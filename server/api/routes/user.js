const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/user');
//const controllerAuth = require('../controllers/accessLevel');

const middleware = require('./myMiddleware')

// ---------------------CLIENT------------------------

//Basic Methods

// GET Client Info
router.get('/client/:id', middleware.extractFilters, middleware.fieldSelector, /*controllerAuth.hasAccess, controllerAuth.isMeOrAdmin,*/ function (req, res, next) {
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


//GET Clients
router.get('/clients', middleware.extractFilters, middleware.fieldSelector, /*controllerAuth.hasAccess, controllerAuth.hasLevelAdmin,*/ function (req, res, next) {
    controllerUser.getClients(req.filters, req.fields, req.query.page || 0)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro)
        });
});


// ---------------------------------------------


// GET Artist Info
router.get('/artist/:id', middleware.fieldSelector, /*controllerAuth.hasAccess, controllerAuth.isMeOrAdmin,*/ function (req, res, next) {
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

//GET Artists
router.get('/artists', middleware.extractFilters, middleware.fieldSelector, /*controllerAuth.hasAccess, controllerAuth.hasLevelAdmin,*/ function (req, res, next) {
    controllerUser.getArtists(req.filters, req.fields, req.query.page || 0)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro)
        });
});


// ----------------------TEST-----------------------



module.exports = router;
