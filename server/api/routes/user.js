const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/user');
const { isAdmin, isMeOrAdmin } = require('../../utils/utils');

const middleware = require('./myMiddleware')

// ---------------------CLIENT------------------------

//Basic Methods

// GET Client Info
router.get('/client/:id', isMeOrAdmin, middleware.extractFilters, middleware.fieldSelector, function (req, res) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.jsonp(info); 
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST Client Info
router.post('/client', isMeOrAdmin, function (req, res) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE Client Info
router.put('/client/:id', isMeOrAdmin, function (req, res) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE Client Info
router.delete('/client/:id', isMeOrAdmin, function (req, res) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});


//GET Clients
router.get('/clients', isAdmin, middleware.extractFilters, middleware.fieldSelector, function (req, res) {
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
router.get('/artist/:id', isMeOrAdmin, middleware.fieldSelector, function (req, res) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST Artist Info
router.post('/artist', isMeOrAdmin, function (req, res) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE Artist Info
router.put('/artist/:id', isMeOrAdmin, function (req, res) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE Artist Info
router.delete('/artist/:id', isMeOrAdmin, function (req, res) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

//GET Artists
router.get('/artists', isAdmin, middleware.extractFilters, middleware.fieldSelector, function (req, res) {
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
